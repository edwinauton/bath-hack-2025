<script setup>
import { ref } from "vue";

const name = ref("Bob Minion");
const user = ref("KingBob");
</script>

<template>
  <div class="info">
    <img src="/images/textLogo.png" alt="Logo" />
    <h1>{{ name }}</h1>
    <h3>{{ user }}</h3>
  </div>
</template>

<style scoped>

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

.info img {
  width: 150px;
  height: 150px;
}
</style>
