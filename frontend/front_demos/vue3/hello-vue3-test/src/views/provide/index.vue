<template>
  <div class="outer">
    <h2>provide 根组件</h2>

    userinfo: {{ userinfo }}
    <br>
    <br>
    
    <Child @sayHello="sayHello"/>
  </div>
</template>  

<script lang="ts" setup>

// demo_01
//    根组件注入 普通对象，初始显示视图，1.5秒后 孙子组件 视图不响应， 3秒后 能输出根组件变更后的数据
//    根组件注入 响应对象，初始显示视图，1.5秒后 孙子组件 视图响应，   3秒后 能输出根组件变更后的数据

//    根组件注入 普通对象， 孙子组件直接修改 userinfo，直接改了根组件的数据，根组件 视图不会改变
//    根组件注入 响应对象， 孙子组件直接修改 userinfo，直接改了根组件的数据，根组件 视图改变

//    .. 

// todo 普通类型数据
import Child from './demo_01/child/child.vue'


import { provide, reactive } from 'vue'

// 注入普通对象
/*
const userinfo = {
  username: "张三",
  age: 20
}
provide('userinfo', userinfo)

setTimeout(() => {
  userinfo.username = '张3333'
  userinfo.age = 200
}, 1500)
//*/

// 注入响应式对象
//*
const userinfo = reactive({
  username: "张三",
  age: 20
})

provide('userinfo', userinfo)

setTimeout(() => {
  userinfo.username = '张3333'
  userinfo.age = 200
}, 1500)
//*/


const sayHello = () => {
  // console.log('index.vue sayHello')
  // console.log('Hello World')

  console.log(userinfo)
}

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>