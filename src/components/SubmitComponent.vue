<script setup>
import { ref } from "vue";
import { ref as dbRef, push, set } from "firebase/database";
import { db } from "../utils/firebase";

const selectedTags = ref([]);
const title = ref("");
const description = ref("");
const contact = ref("");
const tags = ref("");

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
}

function removeTag(tag) {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
function submit() {
  collapsed.value = !collapsed.value;
  confirmed.value = true;
  console.log(title.value, description.value, contact.value, tags.value);
}
</script>

<template>
  <div id="submit-container">
    <div class="submit-header">
      <h2>Submit a Request</h2>
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
        <input class="input-field" v-model="title" placeholder="" required />
        <label class="input-placeholder">Request Title</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="description" placeholder="" />
        <label class="input-placeholder">Request Description</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="contact" placeholder="" required />
        <label class="input-placeholder">Contact</label>
      </div>

      <div class="input-container">
        <input
          class="input-field"
          v-model="tag"
          placeholder=""
          @keydown.enter="addNewTag(tag)"
        />
        <label class="input-placeholder">Tags</label>
      </div>

      <div class="tag-container">
        <span v-for="(tag, index) in selectedTags" :key="index" class="tag">
          {{ tag }}
          <button @click="removeTag(tag)">x</button>
        </span>
      </div>

      <button
        @click="submit"
        class="submit-button"
        :disabled="!title.trim() || !description.trim() || !selectedTags.length"
      >
        Submit
      </button>
    </div>

    <div class="submit-confirmation" v-if="confirmed && collapsed">
      <p>Request submitted successfully!</p>
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
  width: 90%;
}

.submit-header {
  display: flex;
  align-items: center;
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
  cursor: pointer;
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
</style>
