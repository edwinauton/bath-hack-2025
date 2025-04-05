import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "../components/ProfilePage.vue";

const routes = [{ path: "/profile", name: "profile", component: ProfilePage }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
