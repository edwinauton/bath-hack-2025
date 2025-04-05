<script setup>
import { onMounted, ref } from "vue";
import { get, ref as dbRef } from "firebase/database";
import { db } from "../utils/firebase";
import { getAuth } from "firebase/auth";

async function getLast100Days() {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 100; i++) {
    let date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    days.push(formattedDate);
  }

  return days;
}

async function getStarsForDays(days, userID) {
  const values = {};

  for (const date of days) {
    const dateRef = dbRef(db, `users/${userID}/stars/${date}`);
    const snapshot = await get(dateRef);
    values[date] = snapshot.exists() ? snapshot.val() : 0; // stars = 0 if not present
  }

  return values;
}

const heatmap = ref([]);
const endDate = new Date();
const startDate = new Date(endDate);
startDate.setDate(endDate.getDate() - 99);

function getColor(date) {
  if (!date.count) return "#f4f4f4"; // No activity
  if (date.count <= 1) return "#d0f0c0"; // Light activity
  if (date.count <= 2) return "#8bc34a"; // Medium activity
  return "#4caf50"; // High activity
}

async function generateHeatmap() {
  const auth = getAuth();
  const userID = auth.currentUser.uid;

  // Get the last 100 days
  const days = await getLast100Days();

  // Get the star counts for these days
  const values = await getStarsForDays(days, userID);

  const rows = [];
  let currentRow = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    const squareData = {
      date: new Date(currentDate),
      count: values[formattedDate] || 0, // count = 0 if not present
    };

    currentRow.push(squareData);

    if (currentRow.length === 5) {
      rows.push(currentRow);
      currentRow = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  heatmap.value = rows;
}

onMounted(() => {
  generateHeatmap();
});
</script>

<template>
  <h2>Heatmap</h2>
  <div id="heatmap-container">
    <div id="heatmap">
      <div v-for="(column, index) in heatmap" :key="index" class="column">
        <div
          v-for="(square, index) in column"
          :key="index"
          class="square"
          :style="{
            backgroundColor: getColor(square),
          }"
        >
          <span class="tooltip">{{ `${square.count} Stars` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#heatmap-container {
  padding: 10px;
  text-align: center;
}

#heatmap {
  display: flex;
  justify-content: center;
}

.column {
  display: flex;
  flex-direction: column;
}

.square {
  width: 30px;
  height: 30px;
  border: 1px solid #e0e0e0;
  margin: 1px;
  border-radius: 4px;
  position: relative;
}

h2 {
  text-align: center;
  margin: 20px 0 0 0;
  user-select: none;
}

.tooltip {
  position: absolute;
  left: 50%;
  top: 110%;
  transform: translateX(-50%);
  background: #c0d7ff;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  z-index: 9999;
  user-select: none;
  font-size: 10px;
}

.square:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
</style>
