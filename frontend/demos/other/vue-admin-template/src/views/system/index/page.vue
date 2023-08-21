<!--
 * @Author: your name
 * @Date: 2021-02-28 19:49:11
 * @LastEditTime: 2021-06-03 12:29:25
 * @LastEditors: 姚文彬
 * @Description: In User Settings Edit
 * @FilePath: \d2-crud-plus-with-d2admin-starter\src\views\system\index\page.vue
-->
<template>
    <div class="d2-container-full__welcome">
      <div class="d2-container-full__title">欢迎进入{{orgFullName}}后台管理系统</div>
      <img
        src="/image/theme/blue/home-empty.png"
        alt=""
        class="d2-container-full_img"
      >
    </div>
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
