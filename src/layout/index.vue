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

<script setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { Layout, Menu } from 'ant-design-vue';
import { ref } from 'vue';

const { Header, Sider, Content } = Layout;
const { Item } = Menu;

const selectedKeys = ref(['1']);
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
}

.header {
  background-color: #fff;
}
</style>
