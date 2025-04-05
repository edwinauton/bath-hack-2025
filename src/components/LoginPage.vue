<script setup>
import { ref } from "vue";
import router from "../utils/router";

const email = ref("");
const password = ref("");
const hasLoggedIn = ref(false);

async function login() {
  hasLoggedIn.value = true;
  // TODO: Implement login logic
}
</script>

<template>
  <div id="login">
    <img class="logo" src="/images/textLogo.png" alt="" />
    <div class="login-container">
      <div class="input-container">
        <input class="input-field" v-model="email" placeholder="" required />
        <label class="input-placeholder">Email</label>
      </div>

      <div class="input-container">
        <input
          class="input-field"
          v-model="password"
          type="password"
          placeholder=""
          required
        />
        <label class="input-placeholder">Password</label>
      </div>

      <button @click="router.push({ name: 'profile' })" class="login-button">
        Login
      </button>
    </div>
  </div>
</template>

<style scoped>
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo {
  width: 300px;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
}

.input-container {
  margin-top: 1.5em;
  width: 100%;
}

.login-button {
  all: unset;
  padding: 5px 0 5px 0;
  border: 3px solid black;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-weight: bold;
  margin-top: 1.5em;
  width: 100%;
  text-align: center;
}

.login-button:hover {
  background-color: #a2bffe;
}
</style>
