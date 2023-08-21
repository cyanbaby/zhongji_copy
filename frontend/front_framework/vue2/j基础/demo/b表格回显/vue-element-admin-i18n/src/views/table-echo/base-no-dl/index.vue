<template>
  <div class="outer">
    <h2>根组件</h2>

    <Child />
  </div>
</template>

<script>

import Child from './child/child.vue'
export default {
  components: {
    Child
  }
}
</script>

<style>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>
