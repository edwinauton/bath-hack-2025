<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref as dbRef, set } from "firebase/database";
import router from "../utils/router";
import { db } from "../utils/firebase";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");

async function register() {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value,
    );
    const user = userCredential.user;
    const userRef = dbRef(db, `users/${user.uid}`);
    await set(userRef, {
      first_name: firstName.value,
      last_name: lastName.value,
      username: username.value,
    });
    await router.push({ name: "login" });
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
        <input
          class="input-field"
          v-model="firstName"
          placeholder=""
          required
        />
        <label class="input-placeholder">{{
          t("register.input.placeholder.firstName")
        }}</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="lastName" placeholder="" required />
        <label class="input-placeholder">{{
          t("register.input.placeholder.lastName")
        }}</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="username" placeholder="" required />
        <label class="input-placeholder">{{
          t("register.input.placeholder.username")
        }}</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="email" placeholder="" required />
        <label class="input-placeholder">{{
          t("register.input.placeholder.email")
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
          t("register.input.placeholder.password")
        }}</label>
      </div>

      <button
        @click="register"
        class="login-button"
        :disabled="!email.trim() || !username.trim() || !password.trim()"
      >
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
  border: 2px solid black;
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
