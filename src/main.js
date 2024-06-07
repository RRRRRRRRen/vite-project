// 核心
import { createApp } from "vue";
// 样式
import "./style.css";
// 组件
import App from "./App.vue";
// 插件
import { setupStore } from "@/store";

const app = createApp(App);
setupStore(app);

console.log("before app.mount");
app.mount("#app");
