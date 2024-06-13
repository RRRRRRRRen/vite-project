# 04 配置 store

## 基本配置

**简介**

在 Vue 3 中使用 Pinia 的过程中，`defineStore` 函数用于定义一个新的 store，而这个 store 会自动与之前通过 `createPinia()` 创建的 Pinia 实例绑定起来。以下是 `defineStore` 和 Pinia 实例绑定的详细过程和实现原理。

**安装依赖**
```shell
pnpm add pinia
```

**基本示例**

```js
import { createPinia } from "pinia";

const store = createPinia();

const setupStore = (app) => {
  app.use(store);
};

export { store, setupStore };
```

### 1. `createPinia()`

首先，我们通过调用 `createPinia()` 创建一个 Pinia 实例。这个实例是整个应用的状态管理中心。

```javascript
import { createPinia } from "pinia";

const pinia = createPinia();
```

### 2. `app.use(pinia)`

然后，我们将这个 Pinia 实例注入到 Vue 应用中。

```javascript
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.use(pinia);
app.mount("#app");
```

### 3. `defineStore`

`defineStore` 是用于定义 store 的核心函数。每次调用 `defineStore` 会创建一个新的 store，包含状态（state）、getter 和 action，并将其注册到当前的 Pinia 实例中。

**示例代码**

```javascript
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```



## `defineStore` 和 Pinia 实例绑定的原理

### 定义步骤

#### 1. **Store 定义**

当调用 `defineStore` 时，Pinia 会创建一个包含状态、getter 和 action 的 store 定义对象。

#### 2. **获取当前 Pinia 实例**

在 `defineStore` 函数内部，会自动获取当前的 Pinia 实例。这是通过 Vue 的依赖注入系统实现的。具体来说，Pinia 在被注册为 Vue 插件时，会将自己注入到 Vue 的上下文中，使得所有组件和插件都可以访问到这个 Pinia 实例。

#### 3. **注册 Store**

一旦创建了 store 定义对象，Pinia 会将这个 store 注册到当前的 Pinia 实例中。这意味着，每个 store 都会成为 Pinia 状态树的一部分。

### 内部机制

以下是 `defineStore` 和 Pinia 实例绑定的具体内部机制：

1. **创建 Store 定义**:

   - `defineStore` 接受 store 的名称和定义对象（包含 `state`、`getters` 和 `actions`）。
   - 创建一个包含这些定义的 store 对象。

2. **获取当前 Pinia 实例**:

   - 在 `defineStore` 内部，通过 Vue 的 `inject` 方法获取当前的 Pinia 实例。如果当前上下文中没有 Pinia 实例，会抛出错误提示需要将 Pinia 实例注入到 Vue 应用中。

3. **注册 Store 到 Pinia 实例**:

   - 将创建的 store 对象注册到当前 Pinia 实例的状态树中。Pinia 实例维护了一个存储所有 store 的集合，每个 store 都是这个集合的一部分。

4. **返回 Store 使用函数**:
   - `defineStore` 返回一个函数，这个函数可以在组件中调用，用于获取和使用这个 store。

**示例**

```javascript
import { inject, reactive } from "vue";

// 模拟 createPinia 和 app.use
function createPinia() {
  const stores = {};
  return {
    install(app) {
      app.provide("pinia", this);
    },
    stores,
  };
}

// 模拟 defineStore
function defineStore(id, storeDefinition) {
  return function useStore() {
    const pinia = inject("pinia");
    if (!pinia) {
      throw new Error(
        "Pinia instance not found. Please install Pinia using app.use(pinia)."
      );
    }
    if (!pinia.stores[id]) {
      const store = {
        state: reactive(storeDefinition.state()),
        ...storeDefinition.actions,
      };
      pinia.stores[id] = store;
    }
    return pinia.stores[id];
  };
}

// 使用示例
const pinia = createPinia();

const app = {
  use(plugin) {
    plugin.install(this);
  },
  provide(key, value) {
    this[key] = value;
  },
};

app.use(pinia);

const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    },
  },
});

const counterStore = useCounterStore();
counterStore.increment();
console.log(counterStore.count); // 输出: 1
```

### 总结

`defineStore` 通过 Vue 的依赖注入系统与当前的 Pinia 实例绑定。Pinia 实例在被注入到 Vue 应用中时，会成为全局状态管理的中心。`defineStore` 定义的 store 会自动注册到这个 Pinia 实例中，从而实现全局共享和管理状态。这种设计使得 Pinia 的使用更加简洁和高效，适合现代 Vue 3 应用。
