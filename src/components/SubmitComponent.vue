<script setup>
import { ref } from "vue";
const title = ref("");
const description = ref("");
const contact = ref("");
const tags = ref("");

const collapsed = ref(true);
const confirmed = ref(false);

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
        <input
          class="input-field"
          v-model="description"
          placeholder=""
          required
        />
        <label class="input-placeholder">Request Description</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="contact" placeholder="" required />
        <label class="input-placeholder">Contact</label>
      </div>

      <div class="input-container">
        <input class="input-field" v-model="tags" placeholder="" required />
        <label class="input-placeholder">Tags</label>
      </div>

      <button @click="submit" class="submit-button">Submit</button>
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
  margin-right: 10px;
}

.submit-header {
  display: flex;
  align-items: center;
}

.submit-header button {
  all: unset;
  font-size: 30px;
  font-weight: bold;
  padding-left: 20px;
}

.submit-button {
  all: unset;
  padding: 10px;
  border: 3px solid black;
  border-radius: 10px;
  transition: all 0.3s ease;
  text-align: center;
}

.submit-button:hover {
  background-color: white;
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
</style>
