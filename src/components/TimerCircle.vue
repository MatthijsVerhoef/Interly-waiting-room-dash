<template>
  <div class="outer-ring position-fixed">
    <svg width="600" height="600">
      <!-- Background Circle -->
      <circle
        cx="300"
        cy="300"
        r="270"
        stroke="grey"
        stroke-width="20"
        fill="none"
      />
      <!-- Countdown Circle -->
      <circle
        cx="300"
        cy="300"
        r="270"
        :stroke="isAvailable ? '#5bc2a1' : '#D84545'"
        stroke-width="20"
        fill="none"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 300 300)"
      />
      <!-- Dividers -->
      <line
        v-for="divider in dividers"
        :key="divider"
        :x1="300 + 260 * Math.cos(divider)"
        :y1="300 + 260 * Math.sin(divider)"
        :x2="300 + 280 * Math.cos(divider)"
        :y2="300 + 280 * Math.sin(divider)"
        stroke="black"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<script>
import { computed, ref, watchEffect, onUnmounted, watch } from "vue";

export default {
  setup(props, { emit }) {
    const nextMeeting = computed(() => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todaysMeetings = props.meetings.filter((meeting) => {
        const [date] = meeting.reservationDate.split(" ");
        const [day, month, year] = date.split("-");
        const meetingDate = new Date(year, month - 1, day);
        return meetingDate.toDateString() === today.toDateString();
      });

      const sortedMeetings = [...todaysMeetings].sort((a, b) => {
        const dateA = new Date(a.reservationDate);
        const dateB = new Date(b.reservationDate);
        return dateA - dateB;
      });

      return sortedMeetings.find((meeting) => {
        const [date, time] = meeting.reservationDate.split(" ");
        const [day, month, year] = date.split("-");
        const [hours, minutes] = time.split(":");
        const meetingStartTime = new Date(year, month - 1, day, hours, minutes);
        const meetingEndTime = new Date(
          meetingStartTime.getTime() + meeting.reservationLength * 60 * 1000
        );

        return meetingEndTime > now;
      });
    });

    const minutesTillMeeting = computed(() => {
      if (nextMeeting.value) {
        const now = new Date();
        const [date, time] = nextMeeting.value.reservationDate.split(" ");
        const [day, month, year] = date.split("-");
        const [hours, minutes] = time.split(":");
        const meetingStartTime = new Date(year, month - 1, day, hours, minutes);
        const timeDifference = meetingStartTime - now;
        return Math.ceil(timeDifference / (1000 * 60));
      } else {
        return null;
      }
    });

    const totalTime = 60 * 60;
    const remainingTime = ref(totalTime);
    let intervalId = null;
    let availabilityIntervalId = null;

    const dashArray = computed(() => {
      return 2 * Math.PI * 270;
    });

    const dashOffset = computed(() => {
      return ((totalTime - remainingTime.value) / totalTime) * dashArray.value;
    });

    const startTimer = () => {
      if (intervalId) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(() => {
        if (remainingTime.value > 0) {
          remainingTime.value -= 1;
        } else {
          clearInterval(intervalId);
          remainingTime.value = 60 * 60;
        }
      }, 1000);
    };

    const checkRoomAvailability = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const todaysMeetings = props.meetings.filter((meeting) => {
        const [date] = meeting.reservationDate.split(" ");
        const [day, month, year] = date.split("-");
        const meetingDate = new Date(year, month - 1, day);
        return meetingDate.toDateString() === today.toDateString();
      });

      const activeMeeting = todaysMeetings.find((meeting) => {
        const [date, time] = meeting.reservationDate.split(" ");
        const [day, month, year] = date.split("-");
        const [hours, minutes] = time.split(":");
        const meetingStartTime = new Date(year, month - 1, day, hours, minutes);
        const meetingEndTime = new Date(
          meetingStartTime.getTime() + meeting.reservationLength * 60 * 1000
        );

        return meetingStartTime <= now && meetingEndTime >= now;
      });

      if (activeMeeting) {
        const [date, time] = activeMeeting.reservationDate.split(" ");
        const [day, month, year] = date.split("-");
        const [hours, minutes] = time.split(":");
        const meetingEndTime = new Date(year, month - 1, day, hours, minutes);
        meetingEndTime.setMinutes(
          meetingEndTime.getMinutes() + activeMeeting.reservationLength
        );

        const timeLeft = Math.ceil((meetingEndTime - now) / 1000);
        remainingTime.value = timeLeft;
        startTimer();
      }

      const isRoomAvailable = !activeMeeting;

      emit("update-isAvailable", isRoomAvailable);
    };

    // Check room availability every second
    availabilityIntervalId = setInterval(checkRoomAvailability, 1000);

    // Clear intervals when component is unmounted
    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (availabilityIntervalId) {
        clearInterval(availabilityIntervalId);
      }
    });

    watchEffect(() => {
      if (minutesTillMeeting.value !== null && minutesTillMeeting.value <= 60) {
        remainingTime.value = minutesTillMeeting.value * 60;
        startTimer();
      } else if (nextMeeting.value) {
        const now = new Date();
        const [date, time] = nextMeeting.value.reservationDate.split(" ");
        const [day, month, year] = date.split("-");
        const [hours, minutes] = time.split(":");
        const meetingStartTime = new Date(year, month - 1, day, hours, minutes);
        const meetingEndTime = new Date(
          meetingStartTime.getTime() +
            nextMeeting.value.reservationLength * 60 * 1000
        );
        const timeDifference = meetingEndTime - now;
        const minutesTillMeetingEnd = Math.ceil(timeDifference / (1000 * 60));

        if (minutesTillMeetingEnd <= 60) {
          remainingTime.value = minutesTillMeetingEnd * 60;
          startTimer();
        } else {
          remainingTime.value = 60 * 60;
        }
      } else {
        remainingTime.value = 60 * 60;
      }
    });

    watch(nextMeeting, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("update-next-meeting", newVal);
      }
    });

    watch(minutesTillMeeting, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        console.log("Emitting update-minutes-till-meeting with value:", newVal);
        emit("update-minutes-till-meeting", newVal);
      }
    });

    watchEffect(() => {
      emit("update-next-meeting", nextMeeting);
      emit("update-minutes-till-meeting", minutesTillMeeting);
    });

    const dividers = computed(() => {
      const totalBlocks = totalTime / (7.5 * 60);
      const angles = [];
      for (let i = 0; i < totalBlocks; i++) {
        const angle = (i * 2 * Math.PI) / totalBlocks - Math.PI / 2;
        angles.push(angle);
      }
      return angles;
    });

    return {
      minutesTillMeeting,
      dashArray,
      dashOffset,
      dividers,
      startTimer,
    };
  },
  props: {
    meetings: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAvailable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style scoped>
.outer-ring {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s ease-in-out;
}
</style>
