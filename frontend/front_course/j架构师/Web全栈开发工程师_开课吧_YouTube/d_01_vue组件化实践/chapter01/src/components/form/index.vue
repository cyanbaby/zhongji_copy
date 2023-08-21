<template>
  <div>
    <!-- <KInput v-model="userInfo.username" /> -->
    <!-- 查看双向绑定，用户在视图上改变input： {{ userInfo.username }} -->
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <KFormItem :label="'用户名称'" prop="username">
        <KInput v-model="userInfo.username" placeholder="请输入用户名"/>
      </KFormItem>
      <KFormItem :label="'密码'" prop="password">
        <KInput type="password" v-model="userInfo.password" />
      </KFormItem>
     <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KInput from "./KInput";
import KFormItem from "./KFormItem";
import KForm from './KForm'

export default {
  components: {
    KInput,
    KFormItem,
    KForm
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate(valid => {
        if(valid) {
          alert('submit')
        }else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
};
</script>

<style>
</style>