// 核心
import { createApp } from "vue";
// 样式
import "./style.css";
import "ant-design-vue/dist/reset.css";
// 组件
import App from "./App.vue";
// 插件
import { setupStore } from "@/store";
import { setupRouter } from "./router";

const app = createApp(App);
setupStore(app);
setupRouter(app);

console.log("before app.mount");
app.mount("#app");
