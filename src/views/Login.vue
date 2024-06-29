<template>
  <Form
    ref="formRef"
    class="p-4 login-form"
    :model="formData"
    :rules="formRules"
    @keypress.enter="handleLogin"
  >
    <FormItem name="username" class="enter-x">
      <Input
        v-model:value="formData.username"
        size="large"
        placeholder="userName"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        v-model:value="formData.password"
        size="large"
        visibility-toggle
        placeholder="password"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small"> rememberMe </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem class="text-right">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="handleForgetPassword"> forgetPassword </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block :loading="loading" @click="handleLogin">
        loginButton
      </Button>
    </FormItem>
  </Form>
</template>

<script setup>
import {
  AlipayCircleFilled,
  GithubFilled,
  GoogleCircleFilled,
  TwitterCircleFilled,
  WechatFilled,
} from '@ant-design/icons-vue';
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'ant-design-vue';
import { computed, onMounted, reactive, ref, unref } from 'vue';

import { useUserStore } from '@/store/modules/user';

console.log('start Login script');

const ACol = Col;
const ARow = Row;
const FormItem = Form.Item;
const InputPassword = Input.Password;

const userStore = useUserStore();

const rememberMe = ref(false);
const loading = ref(false);
const formRef = ref();

const formRules = {
  username: [
    {
      required: true,
      message: 'Please enter the user name',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please enter the password',
      trigger: 'blur',
    },
  ],
};

const formData = reactive({
  username: 'administrator',
  password: '123456',
});

const handleValidForm = () => {
  return new Promise((res, rej) => {
    formRef.value
      .validate()
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        res(false);
      });
  });
};

const handleLogin = async () => {
  loading.value = true;
  try {
    const data = await handleValidForm();
    if (data) {
      userStore.login(data);
    }
  } catch (error) {
    console.log('error', error);
  } finally {
    loading.value = false;
  }
};
const handleForgetPassword = () => {
  console.log('handleForgetPassword');
};
</script>

<style lang="less" scoped>
.login-form {
  background-color: #ccc;
}
</style>
