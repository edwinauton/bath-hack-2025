<script setup>
import { onMounted, ref, watch } from "vue";
import { ref as dbRef, onValue, get, set, remove } from "firebase/database";
import { db } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const search = ref("");
const requests = ref([]);
const matchingTags = ref([]);
const selectedTags = ref([]);

onMounted(() => {
  const requestsRef = dbRef(db, "requests");

  onValue(requestsRef, (snapshot) => {
    requests.value = []; // Clear array

    snapshot.forEach((child) => {
      const data = child.val();

      requests.value.push({
        id: child.key, // Use the key as the ID
        title: data.title,
        description: data.description,
        contact: data.contact,
        date: data.date,
        tags: data.tags || [],
        isExpanded: false, // Add attribute
      });
    });
  });
});

async function handleRequest(requestId) {
  // Remove the request from the database
  const removeRef = dbRef(db, `requests/${requestId}`);
  await remove(removeRef);

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  await updateDayStars(userID);
  await updateTotalStars(userID);
}

// +1 to user's daily stars
async function updateDayStars(userID) {
  const formattedDate = new Date().toISOString().split("T")[0];
  const incrementDayRef = dbRef(db, `users/${userID}/stars/${formattedDate}`);
  const snapshot = await get(incrementDayRef);
  let stars = snapshot.exists() ? snapshot.val() : 0; // stars = 0 if key doesn't exist
  await set(incrementDayRef, stars + 1);
}

// +1 to user's total stars
async function updateTotalStars(userID) {
  const incrementTotalRef = dbRef(db, `users/${userID}/stars/total`);
  const snapshot = await get(incrementTotalRef);
  let stars = snapshot.exists() ? snapshot.val() : 0; // stars = 0 if key doesn't exist
  await set(incrementTotalRef, stars + 1);
}

function addNewTag(name) {
  const trimmedName = name.trim();
  if (!selectedTags.value.includes(trimmedName)) {
    selectedTags.value.push(trimmedName);
  }
  search.value = "";
  matchingTags.value = [];
}

function filterRequestsByTags() {
  if (!selectedTags.value.length) {
    return requests.value;
  } else {
    return requests.value.filter((request) =>
      selectedTags.value.every((tag) => request.tags.includes(tag)),
    );
  }
}

function removeTag(tag) {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
}

async function updateMatchingTags(search) {
  if (search.trim().length) {
    const tagsRef = dbRef(db, "tags");
    const snapshot = await get(tagsRef);
    if (snapshot.exists()) {
      matchingTags.value = Object.keys(snapshot.val()).filter((tag) =>
        tag.includes(search),
      );
    }
  } else {
    matchingTags.value = [];
  }
}

watch(search, (newSearch) => {
  updateMatchingTags(newSearch);
});
</script>

<template>
  <div id="requests-container">
    <h2>{{ t("requests.title") }}</h2>
    <div class="input-container">
      <input class="input-field" v-model="search" placeholder="" />
      <label class="input-placeholder">{{
        t("requests.input.placeholder.searchTags")
      }}</label>
    </div>

    <div v-if="matchingTags.length" class="dropdown">
      <div
        v-for="tag in matchingTags"
        :key="tag"
        @click="addNewTag(tag)"
        class="dropdown-item"
      >
        {{ tag }}
      </div>
    </div>

    <div class="search-container">
      <span v-for="(tag, index) in selectedTags" :key="index" class="tag">
        {{ tag }}
        <button @click="removeTag(tag)">x</button>
      </span>
    </div>

    <div id="requests">
      <ul id="request-list">
        <li
          v-for="request in filterRequestsByTags()"
          :key="request.id"
          class="request-item"
          :class="{
            collapsed: !request.isExpanded,
            expanded: request.isExpanded,
          }"
        >
          <div
            class="request-content"
            @click="request.isExpanded = !request.isExpanded"
          >
            <div class="request-header">
              <h2>{{ request.title }}</h2>
              <p>
                {{
                  t("requests.label.date", {
                    date: request.date,
                  })
                }}

                <span v-if="request.tags.length" class="tag-container">
                  <span
                    v-for="(tag, index) in request.tags"
                    :key="index"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </span>
              </p>
            </div>

            <div v-if="request.isExpanded" class="request-body">
              <p>{{ request.description }}</p>
              <p class="contact">
                {{
                  t("requests.label.contact", {
                    contact: request.contact,
                  })
                }}
              </p>
            </div>
          </div>

          <div class="request-button">
            <button @click="handleRequest(request.id)">
              {{ t("requests.button.accept") }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#requests-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  user-select: none;
}

#requests {
  padding: 20px;
}

#request-list {
  all: unset;
}

#request-list li {
  list-style-type: none;
  border: 5px solid black;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
}

#request-list li.expanded {
  cursor: url("/cursors/shrink.png"), auto;
}

#request-list li.collapsed {
  cursor: url("/cursors/expand.png"), auto;
}

#request-list button {
  all: unset;
  padding: 10px;
  border: 3px solid black;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-weight: bold;
  cursor: pointer;
}

#request-list button:hover {
  background-color: #c0d7ff;
}

.request-item {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
}

.request-content {
  flex-grow: 1;
}

.request-header {
  font-weight: bold;
}

.tag {
  background-color: #c5a3ff;
  padding: 5px;
  border-radius: 15px;
  font-weight: normal;
}

.tag-container {
  display: inline-flex;
  margin-left: 10px;
  gap: 10px;
}

.contact {
  font-style: italic;
}

.tag {
  display: flex;
  background-color: #c5a3ff;
  padding: 5px;
  border-radius: 15px;
}

.search-container {
  display: flex;
  padding: 10px;
  gap: 10px;
}

.tag button {
  all: unset;
  font-size: 10px;
  margin-left: 5px;
  cursor: pointer;
  font-weight: bold;
}

.dropdown {
  position: absolute;
  top: 290px;
}

.dropdown-item {
  background-color: #c0d7ff;
  padding: 5px 15px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #a2bffe;
}
</style>
