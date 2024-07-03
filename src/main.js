import './style.css';
import 'ant-design-vue/dist/reset.css';
import 'virtual:uno.css';

import { createApp } from 'vue';

import { setupStore } from '@/store';

import App from './App.vue';
import { router, setupRouter } from './router';
import { setupRouterGuard } from './router/guard';

const app = createApp(App);

setupStore(app);
setupRouter(app);
setupRouterGuard(router);

console.log('before app.mount');
app.mount('#app');
