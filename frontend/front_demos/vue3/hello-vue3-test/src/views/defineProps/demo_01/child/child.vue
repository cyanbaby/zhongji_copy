<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    userinfo: {{ userinfo }}
    <br>
    
    <br>
    <button @click="changeUserInfo">change userinfo</button>
    &nbsp;&nbsp;
    <button @click="sayHello">sayHello</button>
    <br>
    <br>

    <Inner @sayHello="sayHello"/>
    <br>
    <br>
  </div>
</template>

<script lang="ts" setup>
import Inner from '../inner/inner.vue'

// defineEmits 不需要单独引入
// import { defineProps } from 'vue'

const emit = defineEmits(['sayHello'])

const sayHello = () => {
  // console.log('child.vue sayHello')
  emit("sayHello");
};

// 声明 props
const props = defineProps({
    userinfo: {
        type: Object,
        default: () => ({})
    }
})

const changeUserInfo = () => {
  // userinfo.username = '张三 变 李四'
  console.log(props)
}


</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>