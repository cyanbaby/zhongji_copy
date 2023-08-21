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

    <Child :user="user" />
  </div>
</template>  

<script lang="ts" setup>

import Child from './child/child.vue'
import { ref } from 'vue'

const user = ref({
  name: '张三',
  age: 18
})

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>