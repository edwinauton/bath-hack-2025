import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "../components/ProfilePage.vue";
import RequestsPage from "../components/RequestsPage.vue";

const routes = [
  { path: "/profile", name: "profile", component: ProfilePage },
  { path: "/requests", name: "requests", component: RequestsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
