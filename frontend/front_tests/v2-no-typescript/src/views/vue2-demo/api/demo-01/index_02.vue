<!-- 如果宿主组件没有 template 就会显示 extends 组件的 template -->
<template>
  <div class="">
    这是宿主组件
    {{ message }}
    <button @click="showMessage">点击</button>
  </div>
</template>

<script>
import Parent from './components/parent.vue'

export default {
  name: 'Vue2DemoApiExtends01View',

  extends: Parent,

  data() {
    return {
      // sayHello: 'Child say hello' // => 如何没有sayHello就会输出 extends的sayHello
    }
  },
  created() {
    console.log('宿主 created') // => 输出顺序: extends的created  > 当前 createds
  }
}
</script>
