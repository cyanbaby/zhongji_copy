<!--
 * @Author: your name
 * @Date: 2021-04-14 12:37:05
 * @LastEditTime: 2021-06-07 12:49:45
 * @LastEditors: 姚文彬
 * @Description: In User Settings Edit
 * @FilePath: \组织\src\views\user-center\reset.vue
-->
<template>
  <el-card
    shadow="never"
    style="margin-top: -10px;"
    :body-style="{ padding: '20px' }"
  >
    <div slot="header">
      <span class="page-title">
        修改密码
      </span>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      style="width:400px"
    >
      <el-form-item
        label="旧密码"
        prop="oldPassword"
      >
        <el-input
          v-model="form.oldPassword"
          type="password"
          auto-complete="on"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="password"
      >
        <el-input
          v-model="form.password"
          type="password"
          auto-complete="on"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="rePassword"
      >
        <el-input
          v-model="form.rePassword"
          type="password"
          auto-complete="on"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="doSubmit"
        >
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    const rePassword = (rule, value, callback) => {
      if (value) {
        if (this.form.password !== value) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请再次输入密码'))
      }
    }
    return {
      loading: false,
      dialog: false,
      title: '修改密码',
      form: { oldPassword: '', password: '', rePassword: '' },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 8,
            max: 20,
            message: '长度在 8 到 20 个字符',
            trigger: 'blur'
          }
        ],
        rePassword: [{ required: true, validator: rePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('d2admin/account', ['logout']),
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$api.SYS_USER_UPDATEPASS({
            ...this.form
          }).then(() => {
            this.$notify({
              title: '提示',
              message: '更新密码成功，请重新登录!',
              type: 'success',
              duration: 5000
            })
            // 登出
            this.logout({
              confirm: false
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = { oldPassword: '', password: '', rePassword: '' }
    }
  }
}
</script>
