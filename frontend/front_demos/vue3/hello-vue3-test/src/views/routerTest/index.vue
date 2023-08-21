<template>
  <div>组件和全局 执行顺序</div>
</template>

<script lang="ts">
export default {
  async beforeRouteEnter(to: any, from: any, next: any) {
    console.group('beforeRouteEnter')
    console.log(to)
    console.log(from)
    console.groupEnd()
    next()
  },
  async beforeRouteUpdate(to: any) {
    // 对beforeRouteUpdate的理解: https://blog.csdn.net/lin13958756858/article/details/112944436
    console.group('beforeRouteUpdate')
    console.log(to)
    console.groupEnd()
  }
}
</script>

<script lang="ts" setup>
// setup语法糖： https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95

import { useRoute } from 'vue-router'
const route = useRoute()  // useRouter（跳转）, useRoute（获取路由参数）
console.log(route)

</script>