import { createPermissionGuard } from './permissionGuard';

const setupRouterGuard = (router) => {
  createPermissionGuard(router);
};

export { setupRouterGuard };
