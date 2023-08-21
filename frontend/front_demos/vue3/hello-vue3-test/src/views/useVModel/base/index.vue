<template>
  <div class="outer">
    <h2>根组件</h2>
    
    <Child />
  </div>
</template>  

<script lang="ts" setup>

import Child from './child/child.vue'

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>