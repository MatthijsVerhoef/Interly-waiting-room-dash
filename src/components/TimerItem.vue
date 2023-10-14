<template>
  <TimerCircle
    v-bind:meetings="meetings"
    v-bind:isAvailable="isAvailable"
    @update-next-meeting="updateNextMeeting"
    @update-minutes-till-meeting="updateMinutesTillMeeting"
    @update-isAvailable="updateIsAvailable"
  />
  <div
    class="timer-item w-50 h-50 rounded-circle p-4 d-flex flex-column justify-content-center"
    :class="{ 'is-available': isAvailable }"
  >
    <span class="text-light h5 mb-auto">0</span>
    <span class="quarter text-light h5 position-absolute">15</span>
    <span class="quarter second text-light h5 position-absolute">30</span>
    <span class="quarter triple text-light h5 position-absolute">45</span>
    <div
      class="inner-content d-flex flex-column my-auto pb-5 justify-content-center"
      :class="{ 'is-available': isAvailable }"
    >
      <p
        v-if="
          isAvailable &&
          minutesTillMeeting > 0 &&
          minutesTillMeeting <= 60 &&
          minutesTillMeeting !== null
        "
        class="text-light mb-2 mt-5"
      >
        Beschikbaar voor
        {{ minutesTillMeeting }}
        {{ minutesTillMeeting === 1 ? "minuut" : "minuten" }}
      </p>
      <p
        v-if="minutesTillMeeting > 60 && isAvailable"
        class="text-light mb-2 mt-5"
      >
        Volgende meeting om {{ formattedTime(nextMeeting) }}
      </p>
      <p
        v-if="(!minutesTillMeeting || minutesTillMeeting < 0) && isAvailable"
        class="text-light mb-2 mt-5"
      >
        Geen reserveringen gepland
      </p>
      <h2 v-if="isAvailable" class="text-light mt-1 mb-0">Beschikbaar</h2>
      <p v-if="!isAvailable" class="not-available-text text-light mb-2">
        {{ nextMeeting.subject }}
      </p>
      <h2 v-if="!isAvailable" class="text-light mt-1 mb-0">Gereserveerd</h2>
      <span v-if="!isAvailable" class="meeting-time text-light mt-3">{{
        formattedStartEndTimes(nextMeeting)
      }}</span>
      <button
        @click="$emit('toggle-visibility')"
        class="new-reservation px-5 py-2 mt-5 d-flex align-items-center justify-content-center py-3"
        :class="{ 'outlined-variant rounded-circle': !isAvailable }"
      >
        <IconPlus v-if="!isAvailable" />
        <p v-if="isAvailable">Reserveren</p>
      </button>
    </div>
  </div>
</template>

<script>
import TimerCircle from "./TimerCircle.vue";
import { IconPlus } from "@tabler/icons-vue";

export default {
  name: "TimerItem",
  components: { TimerCircle, IconPlus },
  data() {
    return {
      currentDate: new Date(),
      nextMeeting: null,
      minutesTillMeeting: null,
    };
  },
  props: {
    isAvailable: {
      type: Boolean,
      required: false,
      default: true,
    },
    meetings: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    formattedDate() {
      return new Intl.DateTimeFormat("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(this.currentDate);
    },
  },
  methods: {
    updateNextMeeting(value) {
      this.nextMeeting = value;
    },
    updateMinutesTillMeeting(value) {
      this.minutesTillMeeting = value;
    },
    formattedTime(nextMeeting) {
      // eslint-disable-next-line no-unused-vars
      const [_, time] = nextMeeting?.reservationDate?.split(" ");
      return time;
    },
    formattedStartEndTimes(nextMeeting) {
      if (nextMeeting) {
        // eslint-disable-next-line no-unused-vars
        const [_, time] = nextMeeting?.reservationDate?.split(" ");
        const meetingStartTime = time;
        const [hours, minutes] = meetingStartTime.split(":").map(Number);

        const startTime = new Date();
        startTime.setHours(hours);
        startTime.setMinutes(minutes);

        const endTime = new Date(
          startTime.getTime() + this.nextMeeting.reservationLength * 60000
        );

        const formattedEndTime = `${String(endTime.getHours()).padStart(
          2,
          "0"
        )}:${String(endTime.getMinutes()).padStart(2, "0")}`;

        return meetingStartTime + " - " + formattedEndTime;
      }
    },
    updateIsAvailable(value) {
      this.$emit("update-isAvailable", value);
    },
  },
  mounted() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-reservation {
  width: fit-content;
  height: fit-content;
  border: 1px solid #5bc2a1;
  background-color: #5bc2a1;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
  z-index: 99;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  transition: 0.6s ease-in-out;
}

.new-reservation > p {
  margin-bottom: 0px;
}

.new-reservation.outlined-variant {
  background-color: rgba(0, 0, 0, 0.8);
  border: 1.5px solid #d84545;
  width: 100px !important;
  height: 100px !important;
  max-width: 100px !important;
  max-height: 100px !important;
  min-width: 100px !important;
  min-height: 100px !important;
  position: absolute;
  bottom: -82px;
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: blur(3px);
}

.new-reservation.outlined-variant > svg {
  min-width: 36px;
  min-height: 36px;
  font-size: 28px;
}

.timer-item {
  width: 480px;
  min-width: 480px;
  height: 480px;
  min-height: 480px;
  max-height: 480px;
  max-width: 480px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #d84545;
  box-shadow: inset 0 0 50px #d84545;
  transition: 0.6s ease-in-out;
}

.timer-item.is-available {
  border: 2px solid #5bc2a1 !important;
  box-shadow: inset 0 0 50px #5bc2a1 !important;
}

.quarter {
  transform: translateX(-50%);
  right: 25px;
}

.quarter.second {
  right: 0px;
  left: 50%;
  top: 88%;
}

.inner-content > p {
  font-size: 18px;
  font-weight: 500;
}

.inner-content > h2 {
  font-weight: 600;
  font-size: 44px;
}

.quarter.triple {
  left: 35px;
}

.not-available-text {
  margin-top: -86px;
}

.meeting-time {
  font-size: 18px !important;
}
</style>
