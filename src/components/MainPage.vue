<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import router from "../utils/router";

const isMenuVisible = ref(false);

function handleMouseMove(event) {
  isMenuVisible.value = event.clientY <= 50;
}

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
});

function logout() {
  router.push({ name: "root" });
  isMenuVisible.value = false;
}
</script>

<template>
  <div id="menu" :class="{ visible: isMenuVisible }">
    <button
      class="menu-button profile"
      @click="router.push({ name: 'profile' })"
    >
      <i class="fa-solid fa-user"></i>
      <span class="tooltip">Profile</span>
    </button>

    <button
      class="menu-button requests"
      @click="router.push({ name: 'requests' })"
    >
      <i class="fa-solid fa-sign-hanging"></i>
      <span class="tooltip">Requests</span>
    </button>

    <button class="menu-button sign-out" @click="logout">
      <i class="fa-solid fa-right-from-bracket"></i>
      <span class="tooltip">Sign Out</span>
    </button>
  </div>

  <router-view></router-view>
</template>

<style scoped>
#menu {
  display: flex;
  background-color: #c0d7ff;
  position: fixed;
  top: -60px;
  left: 0;
  width: 100%;
  height: 50px;
  transition: top 0.3s ease-in-out;
  justify-content: space-between;
  z-index: 999;
}

#menu.visible {
  top: 0;
}

.menu-button {
  position: relative;
  background-color: transparent;
  padding: 10px;
  width: 35%;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 20px;
}

.menu-button:hover {
  background-color: #a2bffe;
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
}

.menu-button:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
</style>
