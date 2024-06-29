import './style.css';
import 'ant-design-vue/dist/reset.css';
import 'virtual:uno.css';

import { createApp } from 'vue';

import { setupStore } from '@/store';

import App from './App.vue';
import { setupRouter } from './router';

const app = createApp(App);
setupStore(app);
setupRouter(app);

console.log('before app.mount');
app.mount('#app');
