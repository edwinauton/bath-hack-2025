<script setup>
import { onMounted, ref } from "vue";

const inputData = [
  { date: "2025-04-05", count: 2 },
  { date: "2025-04-04", count: 3 },
  { date: "2025-04-03", count: 1 },
  { date: "2025-04-02", count: 0 },
  { date: "2025-04-01", count: 3 },
  { date: "2025-03-31", count: 1 },
  { date: "2025-03-30", count: 0 },
  { date: "2025-03-29", count: 0 },
  { date: "2025-03-28", count: 3 },
  { date: "2025-03-27", count: 3 },
  { date: "2025-03-26", count: 0 },
  { date: "2025-03-25", count: 2 },
  { date: "2025-03-24", count: 1 },
  { date: "2025-03-23", count: 3 },
  { date: "2025-03-22", count: 0 },
  { date: "2025-03-21", count: 2 },
  { date: "2025-03-20", count: 1 },
  { date: "2025-03-19", count: 3 },
  { date: "2025-03-18", count: 0 },
  { date: "2025-03-17", count: 2 },
];

const heatmap = ref([]);

const endDate = new Date();
const startDate = new Date(endDate);
startDate.setDate(endDate.getDate() - 100);

function getColor(date) {
  if (!date.count) return "#f4f4f4"; // No activity
  if (date.count <= 1) return "#d0f0c0"; // Light activity
  if (date.count <= 2) return "#8bc34a"; // Medium activity
  return "#4caf50"; // High activity
}

function generateHeatmap() {
  const rows = [];
  let currentRow = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const squareData = {
      date: new Date(currentDate),
      count:
        inputData.find(
          (item) => item.date === currentDate.toISOString().split("T")[0],
        )?.count || 0,
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
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
}

.square:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
</style>
