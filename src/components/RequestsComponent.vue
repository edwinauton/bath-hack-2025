<script setup>
import { reactive } from "vue";

const requests = reactive([
  {
    id: 1,
    title: "Request 1",
    date: "2023-10-01",
    description: "Description of request 1",
    contact: "07412345678",
    isExpanded: false,
  },
  {
    id: 2,
    title: "Request 2",
    date: "2023-10-02",
    description: "Description of request 2",
    contact: "07412345678",
    isExpanded: false,
  },
  {
    id: 3,
    title: "Request 3",
    date: "2023-10-03",
    description: "Description of request 3",
    contact: "07412345678",
    isExpanded: false,
  },
  {
    id: 4,
    title: "Request 4",
    date: "2023-10-04",
    description: "Description of request 4",
    contact: "07412345678",
    isExpanded: false,
  },
  {
    id: 5,
    title: "Request 5",
    date: "2023-10-05",
    description: "Description of request 5",
    contact: "07412345678",
    isExpanded: false,
  },
]);

function handleRequest(requestId) {
  console.log(`Handling request with ID: ${requestId}`);
}
</script>

<template>
  <div id="requests-container">
    <h2>Ongoing Requests</h2>
    <div id="requests">
      <ul id="request-list">
        <li v-for="request in requests" :key="request.id" class="request-item">
          <div
            class="request-content"
            @click="request.isExpanded = !request.isExpanded"
          >
            <div class="request-header">
              <h2>{{ request.title }}</h2>
              <p>Submitted {{ request.date }}</p>
            </div>

            <div v-if="request.isExpanded" class="request-body">
              <p>{{ request.description }}</p>
              <p>Contact: {{ request.contact }}</p>
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
}

#requests {
  border: 3px solid black;
  border-radius: 10px;
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
  cursor: pointer;
}

#request-list button {
  all: unset;
  padding: 10px;
  border: 3px solid black;
  border-radius: 10px;
  transition: all 0.3s ease;
}

#request-list button:hover {
  background-color: white;
}

.request-item {
  display: flex;
  align-items: center;
}

.request-content {
  flex-grow: 1; /* Expand to fill div */
}

.request-header {
  font-weight: bold;
}
</style>
