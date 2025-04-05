<script setup>
import RequestsComponent from "./RequestsComponent.vue";
import SubmitComponent from "./SubmitComponent.vue";
</script>

<template>
  <div id="request-page">
    <SubmitComponent />
    <RequestsComponent />
  </div>
</template>

<style scoped>
#request-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
}
</style>
