<script setup>
import { reactive, ref } from "vue";
import { getAuth } from "firebase/auth";
import { get, ref as dbRef } from "firebase/database";
import { db } from "../utils/firebase";

const badges = reactive([
  {
    name: "Gemini",
    description:
      "Twins unite! You’ve earned the two brightest stars of Gemini.",
    requirement: 2,
    source: "/images/gemini.png",
  },
  {
    name: "Cassiopeia",
    description: "The five stars of the Queen’s throne are now yours!",
    requirement: 5,
    source: "/images/cassiopeia.png",
  },
  {
    name: "Lyra",
    description:
      "You’ve strummed the strings of the Lyre, earning its six stars!",
    requirement: 6,
    source: "/images/lyra.png",
  },
  {
    name: "Cygnus",
    description: "You’ve soared through the Swan and earned its seven stars!",
    requirement: 7,
    source: "/images/cygnus.png",
  },
  {
    name: "Andromeda",
    description: "The chained princess offers you her nine shining stars.",
    requirement: 9,
    source: "/images/andromeda.png",
  },
  {
    name: "Leo",
    description: "The Lion roars with its ten stars in your grasp!",
    requirement: 10,
    source: "/images/leo.png",
  },
  {
    name: "Aquarius",
    description:
      "The Water Bearer flows with eleven stars into your collection.",
    requirement: 11,
    source: "/images/aquarius.png",
  },
  {
    name: "Hydra",
    description: "The serpent’s head has gifted you its twelve stars!",
    requirement: 12,
    source: "/images/hydra.png",
  },
  {
    name: "Scorpius",
    description: "You’ve captured the thirteen stars of the Scorpion!",
    requirement: 13,
    source: "/images/scorpius.png",
  },
  {
    name: "Pegasus",
    description:
      "You’ve galloped across the sky with Pegasus’s fourteen stars!",
    requirement: 14,
    source: "/images/pegasus.png",
  },
  {
    name: "Orion",
    description:
      "You’ve earned the bright stars of the Hunter’s Belt and Sword!",
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
          <h3>{{ badge.name }}</h3>
          <p>{{ badge.description }}</p>
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
  width: 95%;
  height: 95%;
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
