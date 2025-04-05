<script setup>
import { onMounted, ref } from "vue";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "../utils/firebase";

const requests = ref([]);

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

function handleRequest(requestId) {
  console.log(`Handling request with ID: ${requestId}`);
}
</script>

<template>
  <div id="requests-container">
    <h2>Ongoing Requests</h2>
    <div id="requests">
      <ul id="request-list">
        <li
          v-for="request in requests"
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
                Submitted {{ request.date }}

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
              <p class="contact">Contact: {{ request.contact }}</p>
            </div>
          </div>

          <div class="request-button">
            <button @click="handleRequest(request.id)">Accept</button>
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
  background-color: #a2bffe;
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
</style>
