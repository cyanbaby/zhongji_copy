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
      {{ time }}
    </div>
    <div class="animate__animated animate__bounceInDown page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div class="page-login--content-header">
          <img class="page-login--logo" src="./image/login-code.png"/>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:left main:center cross:center"
        >
          <img
            src="@/assets/images/rigister_left_login.png"
            width="271"
            height="397"
          />
          <!-- form -->
          <div class="page-login--form">
            <h1 class="system-title">
              二次验证
            </h1>
            <el-form
              ref="recheckForm"
              label-position="top"
              :rules="rules"
              :model="recheckInfo"
              size="default"
            >
              <el-form-item prop="mobile" style="height: 0px;">
                <el-input
                  v-model="recheckInfo.mobile"
                  type="hidden"
                  readonly
                  placeholder="手机号"
                >
                </el-input>
              </el-form-item>
             <el-form-item prop="code">
              <el-input
                v-model="recheckInfo.code"
                placeholder="请输入6位验证码"
              >
                <el-button
                  slot="suffix"
                  type="text"
                  :disabled="loading"
                  :loading="loading"
                  @click.stop="!loading ? getCode(recheckInfo) : ''"
                >
                  <template v-if="loading">
                    {{ count }} s
                  </template>
                  <template v-else>
                   发送短信到：{{recheckInfo.mobile}}
                  </template>
                </el-button>
              </el-input>
            </el-form-item>
              <el-button
                size="default"
                type="primary"
                class="button-login"
                @click="submit"
              >
                提交
              </el-button>
            </el-form>
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
import dayjs from 'dayjs'
import { mapState, mapActions } from 'vuex'
import util from '@/libs/util.js'
import router from '@/router'

export default {
  data () {
    return {
      logoConfig: util.cookies.get('logoConfig'),
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      loading: false,
      // logoConfig: util.cookies.get('logoConfig'),
      // 表单
      recheckInfo: {
        mobile: this.$route.query.mobile,
        code: ''
        // code: "v9am"
      },
      // 表单校验
      rules: {
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
  mounted () {
    // 定时刷新canvas背景
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', ['secondCheckMobile']),
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
      const mobile = this.recheckInfo.mobile
      const code = this.recheckInfo.code
      const token = this.$route.query.token
      this.$refs.recheckForm.validate(valid => {
        if (valid) {
          this.secondCheckMobile({
            mobile: mobile,
            code: code,
            token: token
          }).then(async data => {
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            // 如有必要 token 需要定时更新，默认保存一天
            util.cookies.set('uuid', data.data.nickname)
            util.cookies.set('token', data.data.token)

            // 登录后后端直接返回了部分用户信息，直接缓存起来
            await this.$store.dispatch('d2admin/user/set', data.data, { root: true })

            // 存储当前使用的应用Id作为公共参数
            // util.cookies.set('opAppId', data.data.appId)

            // 用户登录后从持久化数据加载一系列的设置
            await this.$store.dispatch('load')

            router.push({ path: '/user-center' })
          })
        }
      })
    },
    getCode (row) {
      const { mobile } = row

      if (!mobile) {
        this.$notify({
          title: '提示',
          message: '请先填写手机号！',
          type: 'warning'
        })
      } else {
        const TIME_COUNT = 60

        if (!this.timer) {
          this.$api.sendCodeForRecheck({
            mobileNo: mobile,
            type: '4'
          }, this.$route.query.token, process.env.NODE_ENV === 'development'
            ? process.env.VUE_APP_API_HEADER_OPDMAIN
            : location.host).then(() => {
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
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    width: 100%;
    height: 78px !important;
    background: #fff;
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
    height: 32px;
    max-width: 600px;
    margin-left: 360px;
    margin-top: 23px;
  }
  // 登录表单
  .page-login--form {
    width: 520px;
    height: 397px;
    background: #fff;
    padding: 0 70px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    .el-form {
      margin-top: 30px;
    }
    // 登录按钮
    .button-login {
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
    margin-top: 30px;
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
}
</style>
