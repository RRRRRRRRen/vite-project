const RootRoute = {
  path: '/',
  name: 'Root',
  component: () => import('@/layout/index.vue'),
  redirect: '/child',
  meta: {
    title: 'Root',
  },
  children: [
    {
      path: 'child',
      name: 'Child',
      component: () => import('@/views/Child.vue'),
      meta: {
        title: 'Child',
      },
    },
  ],
};

const HomeRoute = {
  path: '/home',
  name: 'Home',
  component: () => import('@/views/Home.vue'),
  meta: {
    title: 'Home',
  },
};

const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
  meta: {
    title: '登陆',
  },
};

const basicRoutes = [RootRoute, HomeRoute, LoginRoute];

export { basicRoutes };
