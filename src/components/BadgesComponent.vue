<script setup>
import { reactive, ref } from "vue";
import { getAuth } from "firebase/auth";
import { get, ref as dbRef } from "firebase/database";
import { db } from "../utils/firebase";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const badges = reactive([
  {
    name: "badge.gemini.name",
    description: "badge.gemini.description",
    requirement: 2,
    source: "/images/gemini.png",
  },
  {
    name: "badge.cassiopeia.name",
    description: "badge.cassiopeia.description",
    requirement: 5,
    source: "/images/cassiopeia.png",
  },
  {
    name: "badge.lyra.name",
    description: "badge.lyra.description",
    requirement: 6,
    source: "/images/lyra.png",
  },
  {
    name: "badge.cygnus.name",
    description: "badge.cygnus.description",
    requirement: 7,
    source: "/images/cygnus.png",
  },
  {
    name: "badge.andromeda.name",
    description: "badge.andromeda.description",
    requirement: 9,
    source: "/images/andromeda.png",
  },
  {
    name: "badge.leo.name",
    description: "badge.leo.description",
    requirement: 10,
    source: "/images/leo.png",
  },
  {
    name: "badge.aquarius.name",
    description: "badge.aquarius.description",
    requirement: 11,
    source: "/images/aquarius.png",
  },
  {
    name: "badge.hydra.name",
    description: "badge.hydra.description",
    requirement: 12,
    source: "/images/hydra.png",
  },
  {
    name: "badge.scorpius.name",
    description: "badge.scorpius.description",
    requirement: 13,
    source: "/images/scorpius.png",
  },
  {
    name: "badge.pegasus.name",
    description: "badge.pegasus.description",
    requirement: 14,
    source: "/images/pegasus.png",
  },
  {
    name: "badge.orion.name",
    description: "badge.orion.description",
    requirement: 15,
    source: "/images/orion.png",
  },
]);

const userStars = ref(0);
const auth = getAuth();
const userID = auth.currentUser.uid;
await getUserStars(userID);

async function getUserStars(userID) {
  const userStarsRef = dbRef(db, `users/${userID}/stars/total`);
  const snapshot = await get(userStarsRef);
  userStars.value = snapshot.val();
}
</script>

<template>
  <h2>Badges</h2>
  <div id="badges-container">
    <div
      v-for="badge in badges.filter((b) => b.requirement <= userStars)"
      :key="badge.name"
      class="badge"
    >
      <div class="badge-inner">
        <div class="badge-front">
          <img :src="badge.source" alt="" draggable="false" />
        </div>
        <div class="badge-back">
          <h3>{{ t(badge.name) }}</h3>
          <p>{{ t(badge.description) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#badges-container {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.badge {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
  min-width: 200px;
  height: 200px;
}

.badge-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.badge:hover .badge-inner {
  transform: rotateY(180deg);
}

.badge-front,
.badge-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
}

.badge-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge-back {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}

h2 {
  text-align: center;
  margin: 20px 0 0 0;
  user-select: none;
}
</style>
