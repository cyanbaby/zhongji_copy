<template>
  <div>
    <h3>Location组件</h3>
    <br>
    {{ title }}
    <br>
    <!-- 也是双向影响的 -->
    <!-- <input type="text" v-model="title"> -->

    <br>
    <br>
    username:{{ userinfo.username }}
    <br>
    年龄 age :{{ userinfo.age }}

    <p>
      provider inject实现父子组件传值的时候，
      子组件改变数据也会影响父组件
    </p>

    <input type="text" v-model="userinfo.username">

  </div>
</template>

<script>
import {
  inject
} from "vue"
export default {
  setup() {
    let title = inject('title');
    let userinfo = inject("userinfo")
    return {
      title,
      userinfo
    }
  }
}
</script>

<style lang="scss">
h2 {
  text-align: center;
}
</style>
