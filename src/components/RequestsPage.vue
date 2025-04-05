<script setup>
import Requests from "./Requests.vue";
import Submit from "./Submit.vue";
</script>

<template>
  <div id="request-page">
    <Submit />
    <Requests />
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
