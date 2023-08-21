<template>
  <div class="outer">
    <h2 class="test-01" :class="classStr">根组件</h2>
    
    <Child />
  </div>
</template>  

<script lang="ts" setup>

import Child from './child/child.vue'
const classStr = 'test-02'
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>