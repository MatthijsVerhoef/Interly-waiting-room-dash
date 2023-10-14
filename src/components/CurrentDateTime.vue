<template>
  <div class="date-time-container position-fixed mr-4 mt-4 d-flex flex-column">
    <h1 class="text-light text-left d-flex mb-2">
      {{ formattedTime }}
    </h1>
    <h3 class="text-light">{{ formattedDate }}</h3>
  </div>
</template>

<script>
export default {
  name: "CurrentDateTime",
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    formattedDate() {
      return new Intl.DateTimeFormat("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(this.currentDate);
    },

    formattedTime() {
      const hours = this.currentDate.getHours().toString().padStart(2, "0");
      const minutes = this.currentDate.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  },
  mounted() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.date-time-container {
  left: 70px;
  bottom: 70px;
}

.date-time-container h1 {
  font-size: 42px;
  font-weight: 600;
}
</style>
