<template>
  <Form
    class="p-4 login-form"
    :model="formData"
    ref="formRef"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        placeholder="userName"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="password"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            rememberMe
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem class="text-right">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="handleForgetPassword">
            forgetPassword
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button
        type="primary"
        size="large"
        block
        @click="handleLogin"
        :loading="loading"
      >
        loginButton
      </Button>
    </FormItem>
  </Form>
</template>

<script setup>
console.log("start Login script");

import { reactive, ref, unref, computed } from "vue";

import {
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider,
} from "ant-design-vue";
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled,
} from "@ant-design/icons-vue";

const ACol = Col;
const ARow = Row;
const FormItem = Form.Item;
const InputPassword = Input.Password;

const rememberMe = ref(false);
const loading = ref(false);

const formData = reactive({
  account: "vben",
  password: "123456",
});

const handleLogin = async () => {
  console.log("handleLogin");
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
const handleForgetPassword = () => {
  console.log("handleForgetPassword");
};
</script>

<style lang="less" scoped>
.login-form {
  background-color: #ccc;
}
</style>
