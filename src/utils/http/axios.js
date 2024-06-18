import axios from "axios";
import { isFunction } from "lodash-es";

class BizAxios {
  constructor(axiosConfig, customOptions) {
    this.customOptions = customOptions;
    this.axiosConfig = axiosConfig;
    this.axiosInstance = axios.create(axiosConfig);
    this.setupInterceptors();
  }

  // 设置拦截器
  setupInterceptors() {
    const { requestInterceptors, responseInterceptors } = this.customOptions;
    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }
      return config;
    });
    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    });
  }

  get(config, options) {
    return this.request({ ...config, method: "GET" }, options);
  }

  post(config, options) {
    return this.request({ ...config, method: "POST" }, options);
  }

  put(config, options) {
    return this.request({ ...config, method: "PUT" }, options);
  }

  delete(config, options) {
    return this.request({ ...config, method: "DELETE" }, options);
  }

  request(config, options) {
    const { transformResponse, handleError } = this.customOptions;
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request({
          ...config,
          ...options,
        })
        .then((res) => {
          const newRes = transformResponse(res);
          resolve(newRes);
        })
        .catch((err) => {
          handleError(err);
          reject(err);
        });
    });
  }
}

export { BizAxios };
