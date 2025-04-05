import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "../components/ProfilePage.vue";
import RequestsPage from "../components/RequestsPage.vue";
import MainPage from "../components/MainPage.vue";
import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";

const routes = [
  { path: "/", name: "login", component: LoginPage },
  { path: "/", name: "register", component: RegisterPage },
  {
    path: "/",
    component: MainPage,
    children: [
      { path: "profile", name: "profile", component: ProfilePage },
      { path: "requests", name: "requests", component: RequestsPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
