<script setup>
    import { reactive } from 'vue';

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
        }
    ]);
</script>

<template>
    <h2>Badges</h2>
    <div id="badges-container">
        <div v-for="badge in badges" :key="badge.name" class="badge">
            <div class="badge-front">
                <img :src="/textLogo.jpeg" alt="Logo"/>
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
  height: 150px;
}
</style>