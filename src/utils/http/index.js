import { BizAxios } from './axios';
import { useUserStoreWithOut } from '@/store/modules/user';
import { CONTENT_TYPE } from './constant';
import { notification } from 'ant-design-vue';

const customOptions = {
  requestInterceptors: (config) => {
    const userStore = useUserStoreWithOut();

    // 设置token
    if (config.withToken) {
      const token = userStore.token;
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  responseInterceptors: (res) => {
    return res;
  },
  transformResponse: (res) => {
    const { data } = res;
    return data;
  },
  handleError: (err) => {
    // TODO 401 处理

    // 其他错误处理
    notification.error({
      message: '服务器错误',
      description: err?.response?.data?.message || err?.response?.statusText,
    });
  },
  withToken: true,
};

const axiosConfig = {
  timeout: 10 * 1000,
  headers: { 'Content-Type': CONTENT_TYPE.JSON },
};

const createAxios = (axiosConfig, customOptions) => {
  return new BizAxios(axiosConfig, customOptions);
};

const http = createAxios(axiosConfig, customOptions);

export { http };
