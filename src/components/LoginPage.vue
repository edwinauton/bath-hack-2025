<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import router from "../utils/router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const email = ref("");
const password = ref("");

async function login() {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email.value, password.value);
    await router.push({ name: "profile" });
  } catch (error) {
    console.error(error.message);
  }
}
</script>

<template>
  <div id="login">
    <img class="logo" src="/images/textLogo.png" alt="" draggable="false" />
    <div class="login-container">
      <div class="input-container">
        <input class="input-field" v-model="email" placeholder="" required />
        <label class="input-placeholder">{{
          t("login.input.placeholder.email")
        }}</label>
      </div>

      <div class="input-container">
        <input
          class="input-field"
          v-model="password"
          type="password"
          placeholder=""
          required
        />
        <label class="input-placeholder">{{
          t("login.input.placeholder.password")
        }}</label>
      </div>

      <button
        @click="login"
        class="login-button"
        :disabled="!email.trim() || !password.trim()"
      >
        {{ t("login.button") }}
      </button>

      <button @click="router.push({ name: 'register' })" class="login-button">
        {{ t("register.button") }}
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
  background-color: #c0d7ff;
}

.login-button:disabled {
  color: #555;
  cursor: not-allowed;
}
</style>
