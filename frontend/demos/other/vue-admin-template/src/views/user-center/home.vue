<!--
 * @Author: your name
 * @Date: 2021-04-14 11:35:38
 * @LastEditTime: 2021-06-03 16:47:59
 * @LastEditors: 姚文彬
 * @Description: In User Settings Edit
 * @FilePath: \d2-crud-plus-with-d2admin-starter\src\views\user-center\home.vue
-->

<template>
  <d2-container>
    <el-card
      shadow="never"
      style="border:none;margin-top: -10px;"
      :body-style="{ padding: '0' }"
    >
      <div slot="header">
        <span class="page-title">
          首页
        </span>
      </div>
      <div class="d2-container-full__welcome">
        <div class="d2-container-full__title">欢迎进入{{orgFullName}}后台管理系统</div>
        <img
          src="/image/theme/blue/home-empty.png"
          alt=""
          class="d2-container-full_img"
        >
      </div>
    </el-card>
  </d2-container>
</template>
<script>

import util from '@/libs/util.js'
export default {
  data () {
    return {}
  },
  computed: {
    orgFullName () {
      return util.cookies.get('orgFullName')
    }
  }
}
</script>
<style lang="scss">
  .main{
    border: 1px solid #CFD7E5;
    padding-top:10px ;
    background: white;
    margin: 0 10px 20px 10px;
  }
  .container-component {
    // [组件]
    // d2-container-full 填充型
    .d2-container-full {
      .d2-container-full__body {
        .d2-container-full__welcome{
          font-size: 36px;
          position: relative;
          color: #444444;
          text-align:center;
          height: calc(100vh - 110px);
          .d2-container-full__title{
            font-weight: bold;
            position: absolute;
            top: 15vh;
            left: 0;
            right: 0;
            margin: 0 auto;
          }
          .d2-container-full_img{
            width:100%;
            height: calc(100vh - 110px);
          }
        }
      }
    }
  }
</style>
