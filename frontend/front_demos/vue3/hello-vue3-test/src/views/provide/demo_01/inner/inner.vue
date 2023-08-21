<template>
  <div class="inner">
    <h4> Inner 孙子组件</h4>

    inject(根组件 reactive对象 | 普通对象) => userinfo: {{ userinfo }}
    <br>

    inject(根组件 reactive对象 | 普通对象) => userinfo.username: {{ userinfo.username }}
    <br>

    ref(inject 的 reactive对象 | 普通对象 的 username属性 ) => username: {{ username }}
    <br>

    toRefs(inject 的 reactive对象 | 普通对象)=> toRefsUserInfo: {{ toRefsUserInfo.username }}
    <br>

    <br>
    <button @click="sayHello">sayHello</button>
    &nbsp;&nbsp;
    <button @click="changeUserInfo">change inject tuserinfo</button>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, toRefs } from 'vue'

const userinfo = inject('userinfo');



let username = ref(userinfo.username)

let toRefsUserInfo = toRefs(userinfo)

const changeUserInfo = () => {
  // 根组件 注入的 普通对象  & 根组件 注入的 响应对象  区别
  userinfo.username = '大聪明'
}

const emit = defineEmits(['sayHello'])

const sayHello = () => {
  // console.log('inner.vue sayHello')
  emit("sayHello");
};


setTimeout(() => {
  console.log(userinfo)
}, 3000);

</script>

<style scoped>
.inner {
  background-color: #f4606c;
  padding: 20px;
}
</style>