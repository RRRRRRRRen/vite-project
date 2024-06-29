# 06 集成 antdv 及页面基础布局

## 集成组件及样式

**集成 antd icon**

```shell
pnpm add @ant-design/icons-vue
```

**集成 antdv 组件库**

```shell
pnpm add ant-design-vue
```

**基础样式调整**

```js
// main.js
import 'ant-design-vue/dist/reset.css';
```

**全局样式调整**

```css
html,
body {
  position: relative;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}
```

**搭建基础布局** Layout.vue

```vue
<template>
  <Layout class="layout">
    <Sider>
      <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <Item key="1">
          <MenuUnfoldOutlined />
          <span>nav 1</span>
        </Item>
        <Item key="2">
          <MenuUnfoldOutlined />
          <span>nav 2</span>
        </Item>
      </Menu>
    </Sider>
    <Layout>
      <Header class="header">
        <div>Header</div>
      </Header>
      <Content>
        <RouterView />
      </Content>
    </Layout>
  </Layout>
</template>
```

App.vue

```vue
<template>
  <RouterView />
</template>

<script setup>
console.log('start App script');
</script>

<style scoped></style>
```

## 路由层级

App中包裹一级别路由，表示所有页面都需要被路由进行管理Layout中包裹二级路由

## ant-design-vue/dist/reset.css的作用

在 Vue 项目中使用 `import "ant-design-vue/dist/reset.css";` 的作用是引入 `ant-design-vue` 提供的重置样式表。这段代码具体执行了以下几个功能：

### 1. 重置浏览器默认样式

浏览器默认样式（user agent stylesheet）可能会在不同浏览器之间存在差异，导致在不同浏览器中渲染的效果不一致。重置样式（reset CSS）通过统一各个浏览器的基础样式，确保样式在所有浏览器中一致。

### 2. 保持与 Ant Design 的样式一致

`ant-design-vue` 是一个基于 Ant Design 设计体系的 Vue 组件库。Ant Design 的样式是基于统一的设计规范制定的，重置样式可以确保所有组件的样式从一个一致的基础开始，避免浏览器默认样式带来的干扰，确保 Ant Design 组件在各种环境下表现一致。

### 3. 引入规范的基础样式

重置样式表通常包括设置所有 HTML 元素的边距、内边距、边框、字体大小、行高等为统一的基础值。这为后续的样式自定义提供了一个干净的起点，减少了需要处理的浏览器默认样式的不确定性。

### 总结

通过引入 `import "ant-design-vue/dist/reset.css";`，可以确保 `ant-design-vue` 组件在应用中表现一致，消除浏览器默认样式带来的不一致性问题，并为后续样式的编写提供一个统一的基础。
