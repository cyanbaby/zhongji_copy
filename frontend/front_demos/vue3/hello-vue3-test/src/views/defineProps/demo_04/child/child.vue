<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    {{ user }}
    <Inner/>
  </div>
</template>

<script lang="ts" setup>
import Inner from '../inner/inner.vue'

const props = defineProps<{
  user: any
}>()

console.log(props.user.name)
console.log(props.user.age)

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>