# 07 配置基础 uno 与 less

## 配置 unocss

1. 安装依赖

```shell
pnpm add -D unocss
```

2. 配置 uno.config.js
   > 根目录下配置 uno.config.js 文件

```js
import { defineConfig, presetTypography, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetTypography()],
});
```

3. 配置 vite.config.js
   > 配置 vite 插件 UnoCSS()

```js
import UnoCSS from "unocss/vite";

export default defineConfig({
  // ...
  plugins: [vue(), UnoCSS()],
});
```

4. 配置 全局虚拟样
   > 在入口文件中引入 virtual:uno.css

```js
import "virtual:uno.css";
```

## 配置 less

> vite 项目中使用 less 只需要安装 less 依赖即可

1. 安装依赖

```shell
pnpm add -D less
```

## `import "virtual.css"` 和 `import 'uno.css'` 有什么区别

`import "virtual:uno.css";` 和 `import 'uno.css';` 在前端开发中具有不同的含义和用途，主要区别在于它们的来源和处理方式。以下是对这两个导入语句的详细解释：

### 1. `import 'uno.css';`

#### 解释

- **传统导入**: 这种形式是标准的 ES6 模块导入语法，用于导入位于项目文件系统中的 CSS 文件。
- **文件位置**: `uno.css` 文件应该位于项目的某个目录中，例如 `src`、`assets` 或 `public` 目录中。
- **用途**: 直接将 CSS 文件引入到 JavaScript 模块中，通常用于应用全局样式或特定组件的样式。

#### 示例

假设 `uno.css` 位于 `src/styles/uno.css`：

```javascript
import "./styles/uno.css"; // 确保路径正确
```

此导入方式将使 Webpack（或其他构建工具）在构建过程中处理 `uno.css` 文件，并将其包含在最终的捆绑包中。

### 2. `import "virtual:uno.css";`

#### 解释

- **虚拟模块**: 这种形式通常用于导入虚拟模块，虚拟模块是由构建工具（如 Vite、Webpack、Rollup 等）或插件动态生成的，而不是实际存在于文件系统中的文件。
- **用途**: 用于按需生成或注入 CSS，例如在开发时根据配置或运行时情况动态生成的样式。它常见于使用工具如 UnoCSS、WindiCSS 等的项目中，这些工具可以根据使用的类名动态生成 CSS。
- **特定插件支持**: `virtual:` 前缀是由特定的插件或构建工具扩展提供支持的，需要相应的插件来解释和处理这个导入语句。

#### 示例

如果你在使用 UnoCSS 并配置了相应的 Vite 插件，可以这样使用：

```javascript
import "virtual:uno.css";
```

这个语句将由 UnoCSS 插件处理，生成并注入相应的 CSS 样式。Vite 或 UnoCSS 插件会拦截 `virtual:uno.css` 导入并生成对应的 CSS。

### 实际用途对比

1. **静态导入 (`import 'uno.css';`)**

   - 用于引入静态的、预定义的 CSS 文件。
   - 适合于传统的 CSS 文件管理和使用。

2. **虚拟导入 (`import "virtual:uno.css";`)**
   - 用于引入动态生成的 CSS 文件，依赖于构建工具和插件的处理。
   - 适合于现代的按需 CSS 生成工具，如 UnoCSS、WindiCSS 等，能够根据实际使用的类名生成最小化的 CSS 文件。

### 总结

- **`import 'uno.css';`** 是用于引入项目文件系统中实际存在的 CSS 文件，适合于传统的静态 CSS 文件导入。
- **`import "virtual:uno.css";`** 是用于引入由构建工具或插件动态生成的虚拟 CSS 文件，适合于使用现代 CSS 按需生成工具的项目。

根据项目需求和使用的构建工具选择合适的导入方式。

## 什么是虚拟导入

虚拟导入（Virtual Imports）是现代前端构建工具（如 Vite、Webpack、Rollup 等）的一种功能，允许开发者导入在文件系统中实际不存在的模块。这些模块通常是由插件或构建工具在构建时动态生成的。这种机制非常有用，特别是在构建优化、按需生成内容和增强开发体验方面。下面将深入介绍虚拟导入的概念、用途、实现方式以及一些实际应用示例。

### 1. 什么是虚拟导入？

虚拟导入指的是通过构建工具或插件动态生成的模块或文件，而这些模块或文件在实际的文件系统中并不存在。导入虚拟模块时，构建工具会拦截这些导入请求并生成相应的内容。

### 2. 为什么使用虚拟导入？

- **按需生成**: 可以根据实际需要生成内容，而不是预先定义所有内容。例如，按需生成 CSS 样式或 JavaScript 模块。
- **优化构建**: 减少不必要的文件生成和加载，提高构建和运行时性能。
- **增强开发体验**: 通过虚拟模块可以提供更丰富的开发功能，如动态配置、实时更新等。

### 3. 实现方式

虚拟导入通常由构建工具插件实现，这些插件拦截特定的导入请求，生成相应的内容并返回。

#### 3.1. Vite 实现虚拟导入

Vite 是一个现代的前端构建工具，原生支持虚拟模块。以下是如何在 Vite 中实现虚拟导入的示例。

```javascript
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "virtual-module",
      resolveId(id) {
        if (id === "virtual:example") {
          return id; // 返回 id，表示该模块由此插件处理
        }
      },
      load(id) {
        if (id === "virtual:example") {
          return 'export default "This is a virtual module!";'; // 返回模块内容
        }
      },
    },
  ],
});
```

#### 3.2. 使用虚拟模块

```javascript
// main.js
import message from "virtual:example";
console.log(message); // 输出: This is a virtual module!
```

### 4. 实际应用

#### 4.1. UnoCSS

UnoCSS 是一个按需生成 CSS 的工具，可以通过虚拟导入方式引入生成的 CSS。

```javascript
// vite.config.js
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [UnoCSS()],
});
```

```javascript
// main.js
import "virtual:uno.css"; // 引入由 UnoCSS 生成的 CSS
```

#### 4.2. 动态配置

通过虚拟导入实现动态配置。

```javascript
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "dynamic-config",
      resolveId(id) {
        if (id === "virtual:config") {
          return id;
        }
      },
      load(id) {
        if (id === "virtual:config") {
          const config = { apiEndpoint: "https://api.example.com" };
          return `export default ${JSON.stringify(config)};`;
        }
      },
    },
  ],
});
```

```javascript
// main.js
import config from "virtual:config";
console.log(config.apiEndpoint); // 输出: https://api.example.com
```

### 总结

虚拟导入是一种强大的工具，可以提高前端开发的灵活性和效率。通过构建工具和插件的支持，开发者可以按需生成模块、优化构建过程和增强开发体验。掌握虚拟导入的概念和应用，可以帮助你在现代前端开发中更好地管理和优化项目。
