import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { getGlobalConfigApi, getMenuApi, getUserInfoApi, loginApi } from '@/api/modules/user';
import { router } from '@/router';
import { store } from '@/store';
import { flatToTree, treeToMenu, treeToRoute } from '@/utils/format.js';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: null,
      roleList: [],
      menuList: [],
      routeList: [],
      globalConfig: null,
    };
  },
  getters: {
    getToken: (state) => state.token || localStorage.getItem('token'),
    getUserInfo: (state) => state.userInfo,
    getRoleList: (state) => state.roleList,
    getMenuList: (state) => state.menuList,
    getRouteList: (state) => state.routeList,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setRoleList(roleList) {
      this.roleList = roleList;
    },
    setMenuList(menuList) {
      this.menuList = menuList;
    },
    setRouteList(menuList) {
      this.routeList = menuList;
    },
    setGlobalConfig(globalConfig) {
      this.globalConfig = globalConfig;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.menuList = [];
      this.globalConfig = null;
    },
    async loginAction(params) {
      const res = await loginApi({
        get: params,
        post: params,
        options: {
          withToken: false,
        },
      });
      if (res.code === 1) {
        this.setToken(res.data);
        await this.afterLoginAction();
        router.replace('/child');
      } else {
        notification.error({
          message: '服务器错误',
          description: res.message,
        });
      }
    },
    async afterLoginAction() {
      return Promise.all([
        this.getUserInfoAction(),
        this.getGlobalConfigAction(),
        this.getMenuAction(),
      ]);
    },
    async getUserInfoAction() {
      const res = await getUserInfoApi({});
      if (res.code === 1) {
        const userInfos = res.list.map((key) => res.detail[key]);
        this.setUserInfo(userInfos[0]);
        this.setRoleList(userInfos[0].sysGroups);
      }
    },
    async getGlobalConfigAction() {
      const res = await getGlobalConfigApi({
        get: {
          skey: 'base_config',
        },
      });
      if (res.code === 1) {
        const globalConfigs = res.list.map((key) => res.detail[key]);
        this.setGlobalConfig(globalConfigs);
      }
    },
    async getMenuAction() {
      const res = await getMenuApi({
        post: {
          systemCode: 'construction',
        },
      });
      if (res.code === 1) {
        const dataSource = res.list.map((key) => res.detail[key]);
        const treeDataSource = flatToTree(dataSource);
        // 生成routes
        const routes = treeToRoute(treeDataSource);
        // 生成menu
        const menus = treeToMenu(treeDataSource);
        this.setMenuList(menus);
        this.setRouteList(routes);
      }
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
