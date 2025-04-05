<script setup>
import { ref } from "vue";

const name = ref("Bob Minion");
const user = ref("KingBob");
</script>

<template>
  <div class="info">
    <img src="/images/blank.png" alt="" draggable="false" />
    <h1>{{ name }}</h1>
    <h3>{{ user }}</h3>
  </div>
</template>

<style scoped>
.info {
  padding: 50px 20px 20px 20px;
  text-align: center;
  user-select: none;
}

.info img {
  width: 150px;
  height: 150px;
  border: 3px solid #000;
  border-radius: 100%;
}

.info h1 {
  margin: 10px 0 0 0;
}

.info h3 {
  margin: 0;
  font-weight: normal;
}
</style>
