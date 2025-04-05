import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "../components/ProfilePage.vue";
import RequestsPage from "../components/RequestsPage.vue";
import MainPage from "../components/MainPage.vue";
import LoginPage from "../components/LoginPage.vue";
import RandomPage from "../components/RandomPage.vue";

const routes = [
  { path: "/", name: "root", component: LoginPage },
  {
    path: "/",
    component: MainPage,
    children: [
      { path: "profile", name: "profile", component: ProfilePage },
      { path: "requests", name: "requests", component: RequestsPage },
      { path: "random", name: "random", component: RandomPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
