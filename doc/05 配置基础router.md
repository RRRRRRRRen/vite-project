# 05 配置基础 router

## 实例配置

**安装依赖**

```shell
pnpm add vue-router
```

**基本示例**

```js
import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes } from './route';

const router = createRouter({
  history: createWebHistory('/'),
  routes: basicRoutes,
  strict: true,
});

const setupRouter = (app) => {
  app.use(router);
};

export { router, setupRouter };
```

### 1. 导入模块

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes } from './route';
```

- `createRouter`: 从 `vue-router` 导入的函数，用于创建路由实例。
- `createWebHistory`: 从 `vue-router` 导入的函数，用于创建 HTML5 历史记录模式的路由历史对象。
- `basicRoutes`: 从本地文件 `./route` 导入的路由配置数组，定义了应用的基本路由。

### 2. 创建路由器实例

```javascript
const router = createRouter({
  history: createWebHistory('/'),
  routes: basicRoutes,
  strict: true,
});
```

- `history: createWebHistory("/")`: 使用 `createWebHistory` 函数创建路由历史对象，基路径为 `/`，这意味着路由将使用浏览器的历史记录 API（例如 `pushState`）并且不会带有哈希符号（#）。
- `routes: basicRoutes`: 使用从 `./route` 导入的 `basicRoutes` 数组作为路由配置。这些路由定义了应用中的不同路径及其对应的组件。
- `strict: true`: 启用严格模式，这意味着路径末尾的斜杠严格区分。如果路径中有末尾斜杠的路由，将不会匹配没有末尾斜杠的请求，反之亦然。

### 3. 创建 `setupRouter` 函数

```javascript
const setupRouter = (app) => {
  app.use(router);
};
```

- `setupRouter`: 一个函数，接受 Vue 应用实例 `app` 作为参数。
- `app.use(router)`: 将创建的路由器实例 `router` 安装到 Vue 应用中。这样，Vue 应用就能够使用配置好的路由。

### 4. 导出 `router` 和 `setupRouter`

```javascript
export { router, setupRouter };
```

- 导出 `router` 和 `setupRouter`，以便在其他模块中可以导入和使用它们。
  - `router`: 导出的路由器实例，可以在需要直接访问路由器的地方使用，比如在导航守卫或路由跳转中。
  - `setupRouter`: 导出的函数，用于在应用初始化时安装路由器。

### 总结

这段代码的主要目的是：

1. 创建一个 `vue-router` 路由器实例，配置路由历史模式和路由表。
2. 定义一个 `setupRouter` 函数，用于将路由器实例安装到 Vue 应用实例中。
3. 导出 `router` 和 `setupRouter` 以便在其他地方使用。

通过这种方式，可以在项目的入口文件或初始化逻辑中，使用 `setupRouter` 函数将路由器集成到 Vue 应用中。例如，可以在 `main.ts` 中使用如下代码：

```javascript
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';

const app = createApp(App);

setupRouter(app);

app.mount('#app');
```

这样，就能在 Vue 应用中使用配置好的路由系统。

## 配置基础路由

### 1. 定义根路由 (`RootRoute`)

```javascript
const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: 'Root',
  },
};
```

- `path: "/"`: 根路径，当用户访问 `/` 时，将会触发此路由。
- `name: "Root"`: 路由的名称，用于在编程导航时参考。
- `redirect: "/home"`: 访问根路径时，自动重定向到 `/home` 路径。
- `meta: { title: "Root" }`: 元信息，用于存储一些额外信息，在这个例子中是路由的标题 "Root"。

### 2. 定义主页路由 (`HomeRoute`)

```javascript
const HomeRoute = {
  path: '/home',
  name: 'Home',
  component: () => import('@/views/Home.vue'),
  meta: {
    title: 'Home',
  },
};
```

- `path: "/home"`: 当用户访问 `/home` 路径时，将会触发此路由。
- `name: "Home"`: 路由的名称，用于在编程导航时参考。
- `component: () => import("@/views/Home.vue")`: 动态导入 `Home.vue` 组件。当路由被访问时，才会加载该组件，利用懒加载优化性能。
- `meta: { title: "Home" }`: 元信息，用于存储一些额外信息，在这个例子中是路由的标题 "Home"。

### 3. 定义登录路由 (`LoginRoute`)

```javascript
const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
  meta: {
    title: '登陆',
  },
};
```

- `path: "/login"`: 当用户访问 `/login` 路径时，将会触发此路由。
- `name: "Login"`: 路由的名称，用于在编程导航时参考。
- `component: () => import("@/views/Login.vue")`: 动态导入 `Login.vue` 组件。当路由被访问时，才会加载该组件，利用懒加载优化性能。
- `meta: { title: "登陆" }`: 元信息，用于存储一些额外信息，在这个例子中是路由的标题 "登陆"。

### 4. 导出基本路由数组 (`basicRoutes`)

```javascript
const basicRoutes = [RootRoute, HomeRoute, LoginRoute];

export { basicRoutes };
```

- 定义了一个包含所有基本路由配置的数组 `basicRoutes`。
- 导出 `basicRoutes`，以便在其他模块中使用，比如在路由器配置文件中。

### 总结

这段代码的主要目的是定义并导出基本的路由配置，包括根路由、主页路由和登录路由。每个路由都包含路径、名称、组件以及元信息。导出的 `basicRoutes` 数组可以在其他地方（如路由器实例配置中）使用，以便将这些路由集成到 Vue 应用中。

例如，在路由器配置文件中（如 `src/router/index.ts`），可以这样使用：

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes } from './route';

const router = createRouter({
  history: createWebHistory('/'),
  routes: basicRoutes,
  strict: true,
});

const setupRouter = (app) => {
  app.use(router);
};

export { router, setupRouter };
```

通过这种方式，定义的基本路由会被集成到 Vue 应用的路由系统中。

## createWebHistory和createWebHashHistory的区别

> `createWebHistory` 和 `createWebHashHistory` 是 Vue Router 中用于创建路由历史对象的两种不同方法，它们在管理 URL 和浏览器历史记录方面有一些显著区别。

### 1. `createWebHistory`

#### 特点

- 使用 HTML5 History API (`pushState`, `replaceState`)。
- URL 结构更干净，没有 `#` 号。
- 适用于现代浏览器，不适用于不支持 HTML5 History API 的旧浏览器。

#### 优点

- URL 结构更简洁和美观，例如 `https://example.com/home`。
- 可以更好地与服务器端渲染（SSR）集成。

#### 缺点

- 需要服务器配置支持，以确保在刷新页面或直接访问嵌套 URL 时，服务器能够正确处理请求。例如，如果用户直接访问 `https://example.com/home`，服务器需要返回 `index.html` 文件而不是 404 错误。

#### 使用示例

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Your route definitions
  ],
});
```

### 2. `createWebHashHistory`

#### 特点

- 使用 URL 哈希 (`#`) 部分进行路由管理。
- URL 中包含 `#` 号，例如 `https://example.com/#/home`。
- 不需要服务器配置支持，所有路由都由前端处理。

#### 优点

- 不需要服务器配置支持，适用于所有支持 JavaScript 的浏览器。
- 适合静态网站部署或不需要服务器端渲染的项目。

#### 缺点

- URL 结构不够简洁和美观。
- 在某些情况下，哈希路由可能对 SEO（搜索引擎优化）不利。

#### 使用示例

```javascript
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // Your route definitions
  ],
});
```

### 选择使用哪种历史模式

#### 使用 `createWebHistory`

- 项目需要干净的 URL 且服务器支持相应的配置。
- 项目使用现代浏览器，且可能需要与服务器端渲染集成。
- 项目需要更好的 SEO 支持。

#### 使用 `createWebHashHistory`

- 项目部署在不支持 HTML5 History API 的环境中。
- 项目不需要服务器端渲染。
- 需要简单快速地设置路由，而不需要服务器配置。

### 总结

- `createWebHistory`: 适用于需要干净 URL 和服务器配置支持的现代应用，适合 SEO 和 SSR 场景。
- `createWebHashHistory`: 适用于不需要服务器配置支持的项目，适合静态网站和快速开发场景。
