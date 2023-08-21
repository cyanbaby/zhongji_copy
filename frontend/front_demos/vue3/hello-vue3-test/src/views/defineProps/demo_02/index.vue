<template>
  <div class="outer">
    <h2>根组件</h2>
    useVModel 基本类型，基本使用，嵌套使用
    <br />还可以这样使用： v-model:data， 请参考 /useVModel/lesson_01
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>dataVal:&nbsp;&nbsp;</b>
          <span>{{ dataVal }}</span>
        </p>

      </dd>
    </dl>
    
    <Child v-model="dataVal" />
  </div>
</template>  

<script lang="ts" setup>

import { ref } from 'vue'

import Child from './child/child.vue'

const dataVal = ref('张三')

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>