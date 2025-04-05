<script setup>
import { ref } from "vue";
import router from "../utils/router";

const email = ref("");
const password = ref("");
const hasLoggedIn = ref(false);

async function login() {
  hasLoggedIn.value = true;
  // TODO: Implement login logic
  await router.push({ name: "profile" });
}
</script>

<template>
  <div id="login">
    <img class="logo" src="/images/textLogo.png" alt="" draggable="false"/>
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

      <button
        @click="login"
        class="login-button"
        :disabled="!email.trim() || !password.trim() || hasLoggedIn"
      >
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
  user-select: none;
  -webkit-user-drag: none;
}

.logo {
  width: 350px;
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
  cursor: pointer;
}

.login-button:hover {
  background-color: #a2bffe;
}

.login-button:disabled {
  color: #555;
  cursor: not-allowed;
}
</style>
