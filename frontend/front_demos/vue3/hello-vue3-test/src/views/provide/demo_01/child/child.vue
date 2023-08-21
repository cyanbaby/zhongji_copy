<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    
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
import { defineEmits } from 'vue'

const emit = defineEmits(['sayHello'])

const sayHello = () => {
  // console.log('child.vue sayHello')
  emit("sayHello");
};


</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>