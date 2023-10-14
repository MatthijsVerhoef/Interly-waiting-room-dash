<template>
  <div class="outer-availability-wrapper position-fixed z-n1">
    <div
      class="outer-availability left"
      :class="{ 'is-available': isAvailable }"
    />
    <div
      class="outer-availability right"
      :class="{ 'is-available': isAvailable }"
    />
  </div>
</template>

<script>
export default {
  name: "OuterAvailability",
  props: {
    isAvailable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer-availability-wrapper {
  width: 100vw;
  top: 0px;
  left: 0px;
  height: 100vh;
}

.outer-availability {
  position: absolute;
  height: 750px;
  width: 1.5px;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.6s ease-in-out;
}

.outer-availability.left {
  left: 0px;
  background-color: #d84545;
  box-shadow: 0 0 50px 15px #d84545;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  left: -2px;
}

.outer-availability.right {
  right: 0px;
  background-color: #d84545;
  box-shadow: 0 0 50px 15px #d84545;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  right: -2px;
}

.outer-availability.is-available {
  box-shadow: 0 0 50px 15px #5bc2a1 !important;
  background-color: #5bc2a1 !important;
}
</style>
