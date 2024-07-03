import { useUserStoreWithOut } from '@/store/modules/user';

const createPermissionGuard = (router) => {
  const userStore = useUserStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken;
    const userInfo = userStore.getUserInfo;

    if (to.path !== '/login' && token && !userInfo) {
      await userStore.afterLoginAction();
    }

    next();
  });
};

export { createPermissionGuard };
