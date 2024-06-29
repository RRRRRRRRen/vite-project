import { createRouter, createWebHistory } from 'vue-router';

import { basicRoutes } from './route';

const router = createRouter({
  history: createWebHistory('/'),
  routes: basicRoutes,
  strict: true,
});

const setupRouter = (app) => {
  app.use(router);
};

export { router, setupRouter };
