<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>user:&nbsp;&nbsp;</b>
          <span>{{ user }}</span>
        </p>
      </dd>
    </dl>
    <Child 
      v-model:child="user.child" 
    />
  </div>
</template>  

<script lang="ts" setup>

import { ref } from 'vue'
import Child from './child/child.vue'

const user = ref({
  name: '张三啊',
  age: 18,
  child: {
    name: '小三子',
    age: 8,
    sunzi: {
      name: '孙子',
      age: 3
    }
  }
})
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>