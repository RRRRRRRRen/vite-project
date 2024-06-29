import { notification } from 'ant-design-vue';
import { without } from 'lodash-es';
import { defineStore } from 'pinia';

import { loginApi, testAuth, testNoAuth } from '@/api/modules/user';
import { router } from '@/router';
import { store } from '@/store';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: null,
      token: undefined,
    };
  },
  getters: {
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    async login(params) {
      const res = await loginApi({
        get: params,
        post: params,
        options: {
          withToken: false,
        },
      });
      if (res.code === 1) {
        this.setToken(res.data);
        this.afterLoginAction();
      } else {
        notification.error({
          message: '服务器错误',
          description: res.message,
        });
      }
    },
    async afterLoginAction() {
      console.log('this.token', this.token);
      // 获取用户信息

      // 获取全局配置

      // 获取菜单

      // 获取角色

      // 获取权限

      // 跳转路由
    },
    async getUserInfo() {},
    async getGlobalConfig() {},
    async getRole() {},
    async getPermission() {},
    async getMenu() {},
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
