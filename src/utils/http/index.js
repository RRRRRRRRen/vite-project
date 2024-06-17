import { BizAxios } from "./axios";
import { useUserStoreWithOut } from "@/store/modules/user";

const defaultOptions = {
  requestInterceptors: (config) => {
    const userStore = useUserStoreWithOut();
    // const token = userStore.token;
    // config.headers.Authorization = "Bearer " + token;
    return config;
  },
  responseInterceptors: (res) => {
    return res;
  },
};

const createAxios = (customsOptions) => {
  return new BizAxios(customsOptions);
};

const http = createAxios(defaultOptions);

export { http };
