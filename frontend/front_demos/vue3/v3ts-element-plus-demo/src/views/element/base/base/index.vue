<template>
  <div>
    <div class="outer">
      <h2>根组件</h2>
      <Child />
    </div>
  </div>
</template>  

<script lang="ts" setup>

import Child from './child/child.vue'

</script>

<style scoped>
.outer {
  /* background-color: #f5f5f5; */
  background-color: var(--el-menu-hover-bg-color);
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
}
</style>