import { defineStore } from "pinia";
import { store } from "@/store";
import { loginApi, testGet } from "@/api/modules/user";
import { without } from "lodash-es";

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
      console.log("params", params);
      try {
        const res = await loginApi({
          get: params,
          post: params,
          options: {
            needToken: false,
          },
        });
        console.log("res", res);
        const data = {
          token: "dfadsafds",
        };
        const { token } = data;
        this.setToken(token);
        return this.afterLoginAction();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(params) {
      console.log("params", params);
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
