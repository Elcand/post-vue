import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./route/Index";

createApp(App).use(router).mount("#app");
