<script setup>
import { onMounted, ref } from "vue";
import { getAuth } from "firebase/auth";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../utils/firebase";

const user = ref({
  first_name: "",
  last_name: "",
  username: "",
});

onMounted(async () => {
  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const userRef = dbRef(db, `users/${userID}`);

  try {
    const snapshot = await get(userRef);
    user.value = snapshot.val();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
</script>

<template>
  <div class="info">
    <img src="/images/blank.png" alt="" draggable="false" />
    <h1>{{ user.first_name }} {{ user.last_name }}</h1>
    <h3>{{ user.username }}</h3>
  </div>
</template>

<style scoped>
.info {
  padding: 50px 20px 20px 20px;
  text-align: center;
  user-select: none;
}

.info img {
  width: 150px;
  height: 150px;
  border: 3px solid #000;
  border-radius: 100%;
}

.info h1 {
  margin: 10px 0 0 0;
}

.info h3 {
  margin: 0;
  font-weight: normal;
}
</style>
