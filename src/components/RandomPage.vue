<script setup>
import { onMounted, ref } from "vue";

const canvas = ref(null);
const hiddenText = ref(
  "Leave a book in a public place for someone else to find.",
);

let isScratching = false;
let ctx = null;

onMounted(() => {
  const canvasEl = canvas.value;
  canvasEl.width = canvasEl.offsetWidth;
  canvasEl.height = canvasEl.offsetHeight;
  ctx = canvasEl.getContext("2d");

  ctx.fillStyle = "#ebebeb";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

  chatGPT();
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
}

function stopScratch() {
  isScratching = false;
}

function scratch(e) {
  if (!isScratching || !ctx) return;

  const { x, y } = getPos(e);
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fill();
}

async function chatGPT() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and thoughtful and extra wholesome AI that suggests kind things people can do in their local area or community. Give creative and heartwarming ideas for simple, everyday actions that can brighten someone's day — like helping a neighbor, supporting a small business, or showing appreciation to local workers. Keep the tone warm, encouraging, and community-focused. Keep your response to 1-2 sentences with a single focus.",
        },
        {
          role: "user",
          content:
            "What are some nice things I can do for others around my neighborhood?",
        },
      ],
      max_tokens: 50,
    }),
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
  hiddenText.value = data.choices[0].message.content;
}
</script>

<template>
  <div id="random-page">
    <h2>Daily Random Act of Kindness</h2>
    <p>Scratch to reveal the message!</p>

    <div class="scratch-container">
      <div class="hidden-message">
        <p>{{ hiddenText }}</p>
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
  </div>
</template>

<style scoped>
#random-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#random-page h2 {
  margin-top: 50px;
}

#random-page p {
  margin: 0;
}

canvas {
  touch-action: none;
  border-radius: 20px;
}

.scratch-container {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin-top: 100px;
}

.hidden-message {
  position: absolute;
  width: 60%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  z-index: 0;
  user-select: none;
  padding: 40px;
  border-radius: 20px;
}

.hidden-message p {
  font-size: 24px;
}

.scratch-canvas {
  position: absolute;
  width: 60%;
  height: 50%;
  z-index: 10;
  touch-action: none;
}

h2,
p {
  text-align: center;
}
</style>
