# 08 基础 axios 封装

## axios 基础配置

安装

```shell
pnpm add axios
```

原始配置

```js
const axiosConfig = {
  timeout: 10 * 1000,
  headers: { 'Content-Type': CONTENT_TYPE.JSON },
};
```

额外配置

```js
const customOptions = {
  requestInterceptors: () => {},
  responseInterceptors: () => {},
  transformResponse: () => {},
  handleError: () => {},
  withToken: true,
};
```

## 请求拦截器

```js
{
  requestInterceptors: (config) => {
    const userStore = useUserStoreWithOut();

    // 设置token
    if (config.withToken) {
      const token = userStore.token;
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
}
```

## 响应拦截器

## 错误处理

```js
{
    handleError: (err) => {
    // TODO 401 处理

    // 其他错误处理
    notification.error({
      message: "服务器错误",
      description: err?.response?.data?.message || err?.response?.statusText,
    });
  },
}
```

## 响应数据处理

```js
{
  transformResponse: (res) => {
    const { data } = res;
    return data;
  };
}
```

## 基础方法

```js
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
```

# 封装思路

封装一个好用的 axios 实例可以大大简化 HTTP 请求的使用，同时提高代码的可维护性和一致性。以下是封装 axios 的主要步骤和需要注意的地方：

### 1. 创建 Axios 实例

首先，创建一个 axios 实例并配置默认选项，如基础 URL、超时时间、请求头等。

```typescript
// src/utils/http/axios.ts
import axios, { AxiosInstance } from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export default service;
```

### 2. 请求拦截器

请求拦截器可以在请求发送前对请求进行处理，例如在请求头中添加 token。

```typescript
// src/utils/http/axios.ts
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
```

### 3. 响应拦截器

响应拦截器可以在响应到达客户端之前对响应数据进行处理，例如统一处理错误，或者对响应数据进行预处理。

```typescript
// src/utils/http/axios.ts
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      // 这里可以进行错误处理，例如提示错误信息
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  },
);
```

### 4. 封装 API 请求

为了更方便地调用 API，可以将 API 请求封装为具体的函数。这些函数通常位于 `src/api` 目录下。

```typescript
// src/api/user.ts
import service from '@/utils/http/axios';
import { AxiosPromise } from 'axios';

export function login(data: { username: string; password: string }): AxiosPromise<any> {
  return service({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function getUserInfo(): AxiosPromise<any> {
  return service({
    url: '/user/info',
    method: 'get',
  });
}
```

### 5. 错误处理

在请求拦截器和响应拦截器中处理错误。可以使用全局错误处理机制，例如显示错误通知。

```typescript
import { notification } from 'ant-design-vue';

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 服务器返回的错误
      notification.error({
        message: 'Error',
        description: error.response.data.message || 'An error occurred',
      });
    } else {
      // 请求错误
      notification.error({
        message: 'Error',
        description: error.message || 'An error occurred',
      });
    }
    return Promise.reject(error);
  },
);
```

### 6. 配置多环境支持

通过环境变量配置不同的基础 URL 和其他设置。

```typescript
// .env.development
VUE_APP_BASE_API=http://localhost:3000/api

// .env.production
VUE_APP_BASE_API=https://api.example.com
```

### 7. 使用 TypeScript 类型定义

为请求和响应定义类型，以获得更好的类型检查和自动完成支持。

```typescript
// src/api/user.ts
interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

export function login(data: { username: string; password: string }): AxiosPromise<LoginResponse> {
  return service({
    url: '/user/login',
    method: 'post',
    data,
  });
}
```

### 8. 示例项目结构

```plaintext
src/
├── api/
│   └── user.ts
├── utils/
│   └── http/
│       └── axios.ts
├── main.ts
└── .env.development
```

### 总结

封装一个好用的 axios 主要包括以下步骤：

1. 创建 axios 实例并配置默认选项。
2. 添加请求拦截器，用于请求前的处理，如添加 token。
3. 添加响应拦截器，用于统一处理响应数据和错误。
4. 封装具体的 API 请求函数。
5. 处理错误，提供统一的错误处理机制。
6. 配置多环境支持，通过环境变量配置不同的基础 URL。
7. 使用 TypeScript 定义请求和响应的类型。

通过这些步骤，你可以创建一个功能强大、可维护性高的 axios 封装，在项目中方便地进行 HTTP 请求处理。
