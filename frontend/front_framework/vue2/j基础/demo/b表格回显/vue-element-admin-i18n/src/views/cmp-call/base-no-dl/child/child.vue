<template>
  <div class="middle">
    <h3> Child 子组件</h3>

    <Inner />
  </div>
</template>

<script lang="ts" setup>
import Inner from '../inner/inner.vue'

export default {
  components: {
    Inner
  }
}
</script>

<style>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>
