<template>
  <div class="bottom-left-container d-flex flex-column position-fixed w-25">
    <div class="tag p-2 border text-light px-4">Next</div>
    <div class="d-flex align-items-center mt-5">
      <h1 class="font-weight-bold text-light">13:00</h1>
      <h2 class="font-weight-bold text-secondary">14:30</h2>
    </div>
    <h1 class="text-light d-flex mt-2">Lorem ipsum dolor</h1>
  </div>
</template>

<script>
export default {
  name: "NextUp",
};
</script>

<style scoped>
.bottom-left-container {
  bottom: 80px;
  left: 60px;
}

.tag {
  border-radius: 100px;
  max-width: fit-content;
}
</style>
