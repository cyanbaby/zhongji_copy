<!--
 * @Author: your name
 * @Date: 2021-04-14 12:39:48
 * @LastEditTime: 2021-06-07 09:55:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \d2-crud-plus-with-d2admin-starter\src\views\user-center\phone.vue
-->
<template>
  <el-card
    shadow="never"
    style="margin-top: -10px;"
    :body-style="{ padding: '20px' }"
  >
    <div slot="header">
      <span class="page-title">
        修改手机号
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
        label="新手机号"
        prop="reUsername"
      >
        <el-input
          v-model="form.reUsername"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="code"
      >
        <el-input
          v-model="form.code"
          placeholder="请输入6位验证码"
        >
          <el-button
            slot="suffix"
            type="text"
            :disabled="loading"
            :loading="loading"
            @click.stop="!loading ? getCode(form) : ''"
          >
            <template v-if="loading">
              {{ count }} s
            </template>
            <template v-else>
              发送短信
            </template>
          </el-button>
        </el-input>
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
    return {
      count: '',
      loading: false,
      form: { password: '', reUsername: '', againPassword: '', scene: 'CONSOLE' },
      rules: {
        reUsername: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
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
          this.$api.SYS_USER_UPDATENAME({
            ...this.form
          }).then(() => {
            this.$notify({
              title: '提示',
              message: '更新手机号成功，请重新登录!',
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
    getCode (row) {
      const { reUsername } = row

      if (!reUsername) {
        this.$notify({
          title: '提示',
          message: '请先填写手机号！',
          type: 'warning'
        })
      } else {
        const TIME_COUNT = 60

        if (!this.timer) {
          this.$api.SENDCODE({
            mobileNo: reUsername,
            type: '3'
          }).then(() => {
            this.count = TIME_COUNT
            this.loading = true
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.loading = false
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
            // 自动销毁定时器
            this.$once('hook:beforeDestroy', () => {
              clearInterval(this.timer)
              this.timer = null
            })
          })
        }
      }
    },
    resetForm () {
      this.$refs.form.resetFields()
      this.form = { reUsername: '', code: '' }
    }
  }
}
</script>
