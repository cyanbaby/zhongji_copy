<!--
 * @Author: your name
 * @Date: 2021-04-12 11:13:33
 * @LastEditTime: 2021-07-09 15:00:56
 * @LastEditors: Please set LastEditors
 * @Description: 注册页
 * @FilePath: \组织\src\views\system\register\index.vue
-->
<template>
  <div class="register-box">
    <img
      class="big_background"
      src="@/assets/images/big_background.png"
    />
    <div class="animate__animated animate__bounceInDown" flex="dir:left main:center cross:center">
      <img
        class="left_background"
        src="@/assets/images/left_background.png"
      />
      <div class="register-box_inner">
        <div style="width: 520px">
          <h1 class="system-title">
            注册账号
          </h1>

          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="0px"
            class="register-box_right"
          >
            <el-form-item prop="username" style="margin-bottom:32px;">
              <el-input
                v-model="form.username"
                placeholder="请填写手机号"
              />
            </el-form-item>
            <el-form-item prop="code" style="margin-bottom:32px;">
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
            <el-form-item prop="password" style="margin-bottom:32px;">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                auto-complete="new-password"
              />
            </el-form-item>
            <el-form-item prop="rePassword" style="margin-bottom:32px;">
              <el-input
                v-model="form.rePassword"
                type="password"
                placeholder="请再次输入密码"
                auto-complete="new-password"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                round
                style="width: 320px; margin: 0 auto"
                type="primary"
                @click="handleSubmit"
              >
                开通
              </el-button>
            </el-form-item>
          </el-form>

          <p class="system-desc">
            <router-link to="/login">
              <el-button type="text">
                返回登录页
              </el-button>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data () {
    const rePassword = (rule, value, callback) => {
      if (value) {
        if (this.form.password !== value) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请再次输入密码'))
      }
    }
    return {
      form: {
        username: '',
        rePassword: '',
        password: '',
        code: ''
      },
      rules: {
        username: { required: true, message: '请填写手机号' },
        rePassword: [{ required: true, validator: rePassword, trigger: 'blur' }],
        password: { required: true, pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,18}$/, message: '密码必须是大写字母、小写字母、数字、特殊字符中任意三种的组合，并且不少于8位。', trigger: ['blur', 'change'] },
        code: { required: true, message: '请填写手机验证码' }
      },
      loading: false,
      timer: null,
      count: 0
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$api.SYS_USER_REGISTER({
            ...this.form
          }).then(res => {
            if (res.code == 1) {
              this.$notify({
                title: '提示',
                message: '注册成功',
                type: 'success',
                duration: 5000
              })
              this.$router.push({ path: '/login' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    getCode (row) {
      const { username } = row

      if (!username) {
        this.$notify({
          title: '提示',
          message: '请先填写手机号！',
          type: 'warning'
        })
      } else {
        const TIME_COUNT = 60

        if (!this.timer) {
          this.$api.SENDCODE({
            mobileNo: username,
            type: '1'
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
    }
  }
}
</script>

<style lang="scss" scoped>
.register-box {
  background-image: url("~@/assets/images/register_bg.png");
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &_inner {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    height: 500px;
  }

  .register-box_right {
    width: 320px;
    margin: 30px auto;
  }

  .system-title {
    color: #222222;
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    margin-top: 30px;
  }
  .system-desc {
    color: #666666;
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
  }
  .big_background{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .left_background{
    z-index: 9;
    width: 483px;
    height: 460px;
  }
}
</style>
