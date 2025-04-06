<script setup>
import { ref, watch } from "vue";
import { ref as dbRef, push, set, get } from "firebase/database";
import { db } from "../utils/firebase";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const title = ref("");
const description = ref("");
const contact = ref("");
const tag = ref("");

const selectedTags = ref([]);
const matchingTags = ref([]);

const collapsed = ref(true);
const confirmed = ref(false);

async function submit() {
  collapsed.value = !collapsed.value;
  confirmed.value = true;

  const formattedDate = new Date().toISOString().split("T")[0];

  const requestRef = dbRef(db, "requests");
  const newRequestRef = push(requestRef);
  await set(newRequestRef, {
    title: title.value,
    description: description.value,
    contact: contact.value,
    date: formattedDate,
    tags: selectedTags.value,
  });

  await createTags();

  title.value = "";
  description.value = "";
  contact.value = "";
  tag.value = "";
  selectedTags.value = [];
}

function addNewTag(name) {
  const trimmedName = name.trim();
  if (trimmedName && !selectedTags.value.includes(trimmedName)) {
    selectedTags.value.push(trimmedName);
  }
  tag.value = "";
  matchingTags.value = [];
}

function removeTag(tag) {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
}

async function createTags() {
  const existingTagsRef = dbRef(db, "tags");
  let existingTags = await get(existingTagsRef);
  existingTags = existingTags.exists() ? existingTags.val() : [];

  for (const tag of selectedTags.value) {
    if (!existingTags.includes(tag)) {
      await set(dbRef(db, `tags/${tag}`), true);
    }
  }
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
  }
}

watch(tag, (newTag) => {
  updateMatchingTags(newTag);
});
</script>

<template>
  <div id="submit-container">
    <div class="submit-header">
      <h2>{{ t("submit.title") }}</h2>
      <button>
        <i
          class="fa-solid fa-arrow-right collapse-button"
          :class="{ collapsed: !collapsed }"
          @click="collapsed = !collapsed"
        ></i>
      </button>
    </div>

    <div id="submit" v-if="!collapsed">
      <div class="input-container">
        <input class="input-field" v-model="title" placeholder="" />
        <label class="input-placeholder">{{
          t("submit.input.placeholder.title")
        }}</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="description" placeholder="" />
        <label class="input-placeholder">{{
          t("submit.input.placeholder.description")
        }}</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="contact" placeholder="" />
        <label class="input-placeholder">{{
          t("submit.input.placeholder.contact")
        }}</label>
      </div>

      <div class="input-container">
        <input
          class="input-field"
          v-model="tag"
          placeholder=""
          @keydown.enter="addNewTag(tag)"
        />
        <label class="input-placeholder">{{
          t("submit.input.placeholder.tags")
        }}</label>
      </div>

      <div class="tag-container">
        <span v-for="(tag, index) in selectedTags" :key="index" class="tag">
          {{ tag }}
          <button @click="removeTag(tag)">x</button>
        </span>
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

      <button
        @click="submit"
        class="submit-button"
        :disabled="!title.trim() || !description.trim() || !selectedTags.length"
      >
        {{ t("submit.button") }}
      </button>
    </div>

    <div class="submit-confirmation" v-if="confirmed && collapsed">
      <p>{{ t("submit.label.confirmation") }}</p>
      <button class="close-button" @click="confirmed = false">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
#submit-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 30px;
  user-select: none;
}

.submit-header {
  display: flex;
  align-items: center;
  width: 100%;
}

.submit-header button {
  all: unset;
  font-size: 30px;
  padding-left: 20px;
}

.submit-button {
  all: unset;
  padding: 10px;
  border: 3px solid black;
  border-radius: 10px;
  transition: all 0.3s ease;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #a2bffe;
}

.submit-button:disabled {
  color: #555;
  cursor: not-allowed;
}

.submit-confirmation {
  display: flex;
}

#submit {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 3px solid black;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
}

.collapse-button {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.collapse-button.collapsed {
  transform: rotate(-90deg);
}

.close-button {
  all: unset;
  padding: 10px;
  cursor: pointer;
}

.tag {
  display: flex;
  background-color: #c5a3ff;
  padding: 5px;
  border-radius: 15px;
}

.tag-container {
  display: flex;
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
  top: 370px;
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
