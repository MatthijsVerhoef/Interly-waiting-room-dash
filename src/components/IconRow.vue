<template>
  <div class="icon-row d-flex position-fixed align-items-center">
    <div class="mr-4 border rounded-circle p-3">
      <IconCast color="white" :size="30" stroke-width="1" />
    </div>
    <div class="mr-4 border rounded-circle p-3">
      <IconPresentationAnalytics color="white" :size="30" stroke-width="1" />
    </div>
    <div class="mr-4 border rounded-circle p-3">
      <IconSnowflake color="white" :size="30" stroke-width="1" />
    </div>
    <div class="d-flex text-light align-items-center">
      <IconUsers class="mr-1" color="white" :size="30" stroke-width="1" />
      <p style="font-size: 20px">8</p>
    </div>
  </div>
</template>

<script>
import {
  IconCast,
  IconSnowflake,
  IconPresentationAnalytics,
  IconUsers,
} from "@tabler/icons-vue";

export default {
  name: "IconRow",
  components: {
    IconCast,
    IconSnowflake,
    IconPresentationAnalytics,
    IconUsers,
  },
};
</script>

<style scoped>
.icon-row {
  bottom: 70px;
  right: 70px;
}

.icon-row > div {
  margin-right: 18px;
}
</style>
