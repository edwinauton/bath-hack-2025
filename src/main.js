import { createApp } from "vue";
import App from "./App.vue";
import router from "./utils/router";
import "./assets/styles/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);

app.provide("router", router);
app.use(router);

app.mount("#app");
