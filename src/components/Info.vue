<script setup>
import { ref } from "vue";

const name = ref("Bob Minion");
const user = ref("KingBob");
</script>

<template>
  <div class="info">
    <h2>{{ name }}</h2>
    <h3>{{ user }}</h3>
  </div>
</template>

<style scoped>
.info h2, h3{
  text-align: center;
}
</style>
