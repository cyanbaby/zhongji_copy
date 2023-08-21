<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>dataVal:&nbsp;&nbsp;</b>
          <span>{{ dataVal }}</span>
        </p>
        <p>
          <b>dataVal2:&nbsp;&nbsp;</b>
          <span>{{ dataVal2 }}</span>
        </p>
        <p>
          <b>user:&nbsp;&nbsp;</b>
          <span>{{ user }}</span>
        </p>        
      </dd>
    </dl>
    
    <Child 
      v-model:data="dataVal" 
      v-model:data-test="dataVal2" 
      v-model:user="user" 
    />
  </div>
</template>  

<script lang="ts" setup>

import { ref } from 'vue'

import Child from './child/child.vue'

const dataVal = ref('张三')
const dataVal2 = ref('李四')
const user = ref({
  name: '张三啊',
  age: 18,
  child: {
    name: '小三子',
    age: 8
  }
})


</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>