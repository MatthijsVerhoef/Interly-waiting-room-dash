<template>
  <div class="w-100 h-100 position-fixed">
    <div class="blur w-100 h-100" @click="$emit('toggle-visibility')" />
    <div
      class="sidebar-container h-100 w-25 position-fixed z-2 py-5 px-4 d-flex flex-column"
    >
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="text-light">Reserveer deze ruimte</h5>
        <button
          class="close-sidebar rounded-circle bg-transparent border-0"
          @click="$emit('toggle-visibility')"
        >
          <IconX color="white" :size="26" stroke-width="1.5" />
        </button>
      </div>
      <div class="d-flex flex-column align-items-start mt-5">
        <b class="text-light">Email adres</b>
        <input
          placeholder="Geef je email adres op"
          class="border-light mt-3 px-3 text-light"
          v-model="email"
        />
        <span class="text-light mt-2"
          >We sturen een email om je reservering te bevestigen.</span
        >
      </div>
      <div class="d-flex flex-column align-items-start mt-4">
        <b class="text-light">Evenement onderwerp</b>
        <input
          placeholder="Geef een naam op voor jouw reservering"
          class="border-light mt-3 text-light px-3"
          v-model="subject"
        />
        <span class="text-left text-light mt-2">
          Dit wordt de titel van jouw evenement, deze verschijnt ook in Outlook.
        </span>
      </div>
      <div class="d-flex flex-column align-items-start mt-4">
        <b class="text-light">Start tijd evenement</b>
        <div class="select-wrapper date-picker px-2 mt-3">
          <VueDatePicker
            class="date-picker text-light"
            minutes-grid-increment="0"
            v-model="date"
            locale="nl"
            :format-locale="ja"
            format="dd-MM-yyyy HH:mm"
          />
        </div>
        <span class="text-light mt-2"
          >Selecteer een start tijd en datum voor jouw evenement.</span
        >
      </div>
      <div class="d-flex flex-column align-items-start mt-4">
        <b class="text-light">Duur evenement (minuten)</b>
        <div class="select-wrapper px-3 mt-3 py-0">
          <select
            class="text-light w-100 bg-transparent border-0"
            v-model="length"
          >
            <option disabled value="">Selecteer evenementsduur</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="60">60 min</option>
            <option value="75">75 min</option>
            <option value="90">90 min</option>
            <option value="105">105 min</option>
            <option value="120">120 min</option>
            <option value="135">135 min</option>
            <option value="150">150 min</option>
            <option value="165">165 min</option>
            <option value="180">180 min</option>
          </select>
        </div>
        <span class="text-light mt-2">
          Voer de duur in minuten in voor je reservering.</span
        >
      </div>
      <button class="cta-reserve py-3 w-100 btn btn-primary mt-auto">
        Ruimte reserveren
      </button>
    </div>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import { IconX } from "@tabler/icons-vue";
import axios from "axios";

export default {
  name: "ReserveRoom",
  components: {
    VueDatePicker,
    IconX,
  },
  data() {
    return {
      email: "",
      subject: "",
      date: new Date(),
      length: "",
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get(
          `https://outlook.office.com/api/v2.0/users/{userName}/calendars/{sharedCalendarId}/calendarView`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken.accessToken}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async bookRoom() {
      const event = {
        subject: this.subject,
        start: {
          dateTime: this.startDate,
          timeZone: "UTC",
        },
        end: {
          dateTime: new Date(
            new Date(this.startDate).getTime() + this.duration * 60000
          ).toISOString(),
          timeZone: "UTC",
        },
      };

      try {
        await axios.post(
          `https://graph.microsoft.com/v1.0/users/${this.email}/calendars/SHARED_CALENDAR_ID/events`,
          event,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Room booked successfully!");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.blur {
  background-color: rgba(0, 0, 0, 0.5);
  animation: appear 0.4s ease;
}

.sidebar-container {
  right: 0px;
  top: 0px;
  animation: slide_in_right 0.4s ease;
  backdrop-filter: blur(8px);
  background-color: rgba(180, 180, 180, 0.3);
}

.sidebar-container input,
.sidebar-container .select-wrapper {
  border-radius: 14px;
  background-color: transparent;
  width: 100%;
  border: 1px solid #fff;
  padding-top: 14px;
  padding-bottom: 14px;
  outline: none;
  margin-bottom: 0px;
}

.sidebar-container .select-wrapper,
.sidebar-container .select-wrapper select {
  cursor: pointer;
}

.sidebar-container .select-wrapper select {
  padding-top: 14px;
  padding-bottom: 14px;
}

.sidebar-container .select-wrapper.date-picker {
  padding-top: 0px;
  padding-bottom: 0px;
}

.sidebar-container .select-wrapper.date-picker input {
  padding-left: 40px !important;
  color: #fff;
  font-size: 16px;
}

.sidebar-container input:focus {
  border: 1px solid #5bc2a1 !important;
}

.sidebar-container span {
  font-size: 14.5px;
  text-align: start;
}

.cta-reserve {
  background-color: #5bc2a1 !important;
  border: 1px solid #5bc2a1 !important;
  border-radius: 14px !important;
  margin-top: 100px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
}

.close-sidebar {
  padding-top: 4px;
  padding-bottom: 4px;
}

.close-sidebar:hover {
  background-color: rgba(0, 0, 0, 0.3) !important;
  padding-top: 4px;
  padding-bottom: 4px;
}

.dp__input {
  background-color: transparent;
  border-radius: 14px;
  padding: 0px !important;
  padding-top: 14px !important;
  padding-bottom: 14px !important;
  border: none !important;
}

@keyframes slide_in_right {
  0% {
    right: -40%;
  }
  100% {
    right: 0px;
  }
}

@keyframes appear {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
