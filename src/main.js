import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./utils/i18n";
import router from "./utils/router";
import "./assets/styles/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);

app.provide("router", router);

app.use(i18n);
app.use(router);

app.mount("#app");
