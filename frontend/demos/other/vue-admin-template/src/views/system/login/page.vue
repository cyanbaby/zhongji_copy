<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n" />
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center"
    >

    </div>
    <div class="animate__animated animate__bounceInDown page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div class="page-login--content-header">
          <img class="page-login--logo" :src="logoConfig"/>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:left main:center cross:center"
        >
          <img
          class="big_background"
            src="@/assets/images/big_background.png"
          />
          <img
          class="left_background"
            src="@/assets/images/left_background.png"
          />
          <!-- form -->
          <div class="page-login--form">
            <h1 class="system-title">
              {{terminalName}}
            </h1>
            <el-form
              ref="loginForm"
              label-position="top"
              :rules="rules"
              :model="formLogin"
              size="default"
            >
              <el-form-item prop="username">
                <el-input
                  v-model.trim="formLogin.username"
                  type="text"
                  placeholder="用户名"
                >
                  <i slot="prepend" class="fa fa-user-circle-o" />
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model.trim="formLogin.password"
                  type="password"
                  placeholder="密码"
                >
                  <i slot="prepend" class="fa fa-keyboard-o" />
                </el-input>
              </el-form-item>

              <el-button
                size="default"
                type="primary"
                class="button-login"
                @click="submit"
                @keyup.enter="enterLogin"
              >
                登录
              </el-button>
            </el-form>
            <p class="page-login--options" flex="main:justify cross:center">
              <span @click="$router.push({ path: '/remember' })"
                ><d2-icon name="question-circle" /> 忘记密码</span
              >
              <span @click="$router.push({ path: '/register' })">注册用户</span>
            </p>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-copyright">
           <!-- Copyright 外层框架别删 用来填充样式
            <d2-icon name="copyright" />
            继教云提供技术支持 -->
            <a href="https://github.com/FairyEver"></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
import dayjs from 'dayjs'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      terminalName: util.cookies.get('terminalName'),
      logoConfig: util.cookies.get('logoConfig'),
      timeInterval: null,
      // logoConfig: util.cookies.get('logoConfig'),
      time: dayjs().format('HH:mm:ss'),
      // 表单
      formLogin: {
        username: '',
        password: ''
        // code: "v9am"
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('d2admin/menu', ['header']),
    ...mapState('d2admin/user', ['config'])
  },
  created () {
    this.enterLogin()
  },
  mounted () {

    // 定时刷新canvas背景
    // this.timeInterval = setInterval(() => {
    //   this.refreshTime()
    // }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    enterLogin () {
      document.onkeydown = e => {
        // 13表示回车键
        if (e.keyCode === 13) {
          // 回车后执行搜索方法
          this.submit()
        }
      }
    },
    ...mapActions('d2admin/account', ['login']),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick (user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password,
            liveLink: this.$route.query.liveLink,
            liveChannelId: this.$route.query.liveChannelId
          }).then(() => {
            console.log('登录成功')
            // hack: 用于清除上一个用户的功能树
            this.$store.commit('d2admin/menu/asideSet', [])
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    width: 100%;
    height: 100%;
    min-height: 500px;
    // background-image: url('../../../assets/images/big_background.png');
  }
  // header
  .page-login--content-header {
    width: 100%;
    // height: 78px !important;
    z-index: 9;
    // background: #fff;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    height: 36px;
    max-width: 600px;
    margin-left: 360px;
    margin-top: 14px;
  }
  // 登录表单
  .page-login--form {
    width: 450px;
    height: 460px;
    background: #fff;
    padding: 0 70px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    z-index: 9;
    .el-form {
      margin-top: 30px;
    }
    // 登录按钮
    .button-login {
      background: #2373F8;
      width: 100%;
      height: 50px;
      border-radius: 50px;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 30px 0;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
      color: #2373F8;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  .system-title {
    color: #222222;
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    margin-top: 85px;
  }
  .system-desc {
    color: #666666;
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    z-index: 9;

    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
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
