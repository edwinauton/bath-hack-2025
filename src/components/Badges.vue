<script setup>
import { reactive } from "vue";

const badges = reactive([
  {
    name: "First Star",
    description: "Congratulations! You have earned your first star.",
  },
  {
    name: "Orion's Belt",
    description: "Well done on completing 3 star tasks!",
  },
  {
    name: "Aries",
    description: "Great job on completing 5 star tasks!",
  },
]);
</script>

<template>
  <h2>Badges</h2>
  <div id="badges-container">
    <div v-for="badge in badges" :key="badge.name" class="badge">
      <div class="badge-front">
        <img src="/images/textLogo.png" alt="Logo" />
      </div>
      <div class="badge-back">
        <h3>{{ badge.name }}</h3>
        <p>{{ badge.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#badges-container {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
}

.badge {
  background-color: #f9f9f9; 
  border-radius: 10px;
  padding: 10px;
  width: 300px;
  height: 200px;
}

.badge-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.badge:hover .badge-inner{
  transform: rotateY(180deg);
}

.badge-front,
.badge-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
}

.badge-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge-back {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px
}

h2 {
  text-align: center;
}
</style>
