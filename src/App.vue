<template>
  <img
    class="background-image position-fixed top-0 start-0 w-100 z-n1"
    alt="interly"
    src="./assets/interly.webp"
  />
  <div class="image-overlay z-0" />
  <RoomDash msg="Meeting room" />
</template>

<script>
import RoomDash from "./components/RoomDash.vue";

export default {
  name: "App",
  components: {
    RoomDash,
  },
  data() {
    return {
      isAvailable: true,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.image-overlay {
  width: 100vw;
  height: 100vh;
  background-color: #091c2d;
  position: fixed;
  z-index: 99;
  top: 0px;
  left: 0px;
  opacity: 0.9;
}

.background-image {
  object-fit: cover;
}
</style>
