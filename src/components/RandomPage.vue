<script setup>
import { onMounted, ref } from "vue";
import RandomTitle from "./RandomTitle.vue";

const canvas = ref(null);
const hiddenText = ref(
  "Leave a book in a public place for someone else to find.",
);

let isScratching = false;
let ctx = null;
let scratchAudio = null;

onMounted(() => {
  const canvasEl = canvas.value;
  canvasEl.width = canvasEl.offsetWidth;
  canvasEl.height = canvasEl.offsetHeight;
  ctx = canvasEl.getContext("2d");

  ctx.fillStyle = "#aaa";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

  scratchAudio = new Audio("./scratch.mp3");
  scratchAudio.loop = true;
  scratchAudio.volume = 0.5;

  window.addEventListener('mouseup', stopScratch);
  window.addEventListener('touchend', stopScratch);
});

function getPos(e) {
  const rect = canvas.value.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

function startScratch(e) {
    isScratching = true;
    scratch(e);

    if (scratchAudio) {
        scratchAudio.currentTime = 0;
        scratchAudio.play();
    }
}

function stopScratch() {
    isScratching = false;

    if (scratchAudio) {
        scratchAudio.pause();
    }
}

function scratch(e) {
  if (!isScratching || !ctx) return;

  const { x, y } = getPos(e);
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fill();
}
</script>

<template>
    <RandomTitle />

    <div class="scratch-container">
        <div class="hidden-message">
            <h3>{{ hiddenText }}</h3>
        </div>

        <canvas 
            ref="canvas"
            class="scratch-canvas"
            @mousedown="startScratch"
            @mousemove="scratch"
            @touchstart.prevent="startScratch"
            @touchmove.prevent="scratch"
        ></canvas>
    </div>

    <canvas
      ref="canvas"
      class="scratch-canvas"
      @mousedown="startScratch"
      @mouseUp="stopScratch"
      @mousemove="scratch"
      @touchstart.prevent="startScratch"
      @touchend.prevent="stopScratch"
      @touchmove.prevent="scratch"
    ></canvas>
  </div>
</template>

<style scoped>
canvas {
  touch-action: none;
}

.scratch-container {
    display: flex;
    margin-top: 100px;
    justify-content: center;
    width : 100vw;
    height: 100vh;
}

.hidden-message {
  position: absolute;
  width: 40%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  z-index: 0;
}

.scratch-canvas {
  position: absolute;
  width: 40%;
  height: 40%;
  z-index: 10;
  touch-action: none;
}

h2, h3 {
    text-align: center;
}
</style>
