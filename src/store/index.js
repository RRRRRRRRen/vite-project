import { createPinia } from 'pinia';

const store = createPinia();

const setupStore = (app) => {
  app.use(store);
};

export { setupStore, store };
