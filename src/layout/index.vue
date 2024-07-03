<template>
  <Layout class="layout">
    <Sider>
      <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :items="menuList" />
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
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

import { useUserStore } from '@/store/modules/user';

const { Header, Sider, Content } = Layout;

const userStore = useUserStore();

const selectedKeys = ref(['1']);

const menuList = computed(() => userStore.getMenuList); // ✅

// const menuList = computed(() => userStore.menuList); // ✅

// const { menuList } = storeToRefs(userStore); // ✅

// const menuList = userStore.getMenuList; // ❌

// const menuList = userStore.menuList; // ❌

console.log('menuList', menuList);
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
