const RootRoute = {
  path: "/",
  name: "Root",
  redirect: "/home",
  meta: {
    title: "Root",
  },
};

const HomeRoute = {
  path: "/home",
  name: "Home",
  component: () => import("@/views/Home.vue"),
  meta: {
    title: "Home",
  },
};

const LoginRoute = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/Login.vue"),
  meta: {
    title: "登陆",
  },
};

const basicRoutes = [RootRoute, HomeRoute, LoginRoute];

export { basicRoutes };
