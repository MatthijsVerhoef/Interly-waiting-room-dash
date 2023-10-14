<template>
  <div class="interly-dashboard-wrapper z-5">
    <TimerItem
      @toggle-visibility="toggleVisibility"
      v-bind:isAvailable="isAvailable"
      v-bind:meetings="meetings"
      @update-isAvailable="updateIsAvailable"
    />
    <OuterAvailability v-bind:isAvailable="isAvailable" />
    <CurrentDateTime />
    <IconRow />
    <RoomName v-bind:isAvailable="isAvailable" />
    <img
      class="logo-container position-fixed background-image position-fixed top-0 start-0"
      alt="logo"
      src="../assets/interly-logo.svg"
    />
    <ReserveRoom @toggle-visibility="toggleVisibility" v-if="isVisible" />
  </div>
</template>

<script>
import TimerItem from "./TimerItem.vue";
import OuterAvailability from "./OuterAvailability.vue";
import IconRow from "./IconRow.vue";
import CurrentDateTime from "./CurrentDateTime.vue";
import RoomName from "./RoomName.vue";
import "@vuepic/vue-datepicker/dist/main.css";
import ReserveRoom from "./ReserveRoom.vue";

export default {
  components: {
    TimerItem,
    OuterAvailability,
    CurrentDateTime,
    IconRow,
    RoomName,
    ReserveRoom,
  },
  name: "RoomDash",
  data() {
    return {
      date: null,
      isVisible: false,
      name: "",
      email: "",
      subject: "",
      isAvailable: true,
      events: [],
      meetings: [
        {
          id: 1,
          subject: "Kela meeting",
          reservationLength: 5,
          reservationDate: "18-09-2023 10:31",
        },
        {
          id: 2,
          subject: "Vleugelvloeren",
          reservationLength: 60,
          reservationDate: "18-09-2023 16:50",
        },
      ],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    updateIsAvailable(value) {
      this.isAvailable = value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.interly-dashboard-wrapper {
  position: relative;
  z-index: 99;
}

.logo-container {
  top: 60px !important;
  right: 60px !important;
  left: auto !important;
  max-width: 50px !important;
}

h2 {
  font-size: 86px;
  font-weight: 500;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

async getCalendarEvents() { try { console.log("starting"); const response =
await login(); console.log(response); const accessToken = response?.accessToken;
if (accessToken) { const events = await fetchCalendarEvents(accessToken);
console.log(events); } else { console.log("No access token received"); } } catch
(error) { console.error("An error occurred:", error); } }, }, async mounted() {
// Step 1: Get Access Token const tokenResponse = await axios.post(
"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token", { client_id:
"048cb25c-67f2-4df2-89e0-dbeb2988b1d2", scope:
"https://graph.microsoft.com/.default", client_secret: "YOUR_CLIENT_SECRET",
grant_type: "client_credentials", } ); const accessToken =
tokenResponse.data.access_token; // Step 2: Fetch Calendar Events const
eventsResponse = await axios.get(
"https://graph.microsoft.com/v1.0/me/calendars/{calendar_id}/events", { headers:
{ Authorization: `Bearer ${accessToken}`, }, } ); this.events =
eventsResponse.data.value;
