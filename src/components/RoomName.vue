<template>
  <div
    class="room-indicator-container d-flex align-items-center position-fixed"
  >
    <div class="room-indicator" :class="{ 'room-busy': !isAvailable }" />
    <h1 class="text-light">Meeting room</h1>
  </div>
</template>

<script>
export default {
  name: "RoomName",
  props: {
    isAvailable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style scoped>
.room-indicator-container {
  top: 70px;
  left: 70px;
}

.room-indicator {
  width: 5px;
  height: 60px;
  border-radius: 1px;
  background-color: #72f3c9;
}

.room-indicator.room-busy {
  background-color: #d84545;
}

.room-indicator-container h1 {
  margin-left: 25px;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: 600;
  font-size: 42px;
}
</style>
