import { defineStore } from "pinia";
import { store } from "@/store";
import { loginApi, testAuth, testNoAuth } from "@/api/modules/user";
import { notification } from "ant-design-vue";
import { without } from "lodash-es";
import { router } from "@/router";

export const useUserStore = defineStore("user", {
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
      try {
        const res = await loginApi({
          get: params,
          post: params,
          options: {
            withToken: false,
          },
        });
        if (res.code === 1) {
          this.setToken(res.data);
          return this.afterLoginAction(true);
        } else {
          notification.error({
            message: "服务器错误",
            description: res.message,
          });
          return this.afterLoginAction(false);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(result) {
      if (result) {
        router.replace({ path: "/child" });
      }
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
