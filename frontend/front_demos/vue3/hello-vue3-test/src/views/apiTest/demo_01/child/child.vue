<template>
  <div class="middle">
    <h3 :class="props.containerClassNames"> Child 子组件</h3>

    <Inner/>
  </div>
</template>

<script lang="ts" setup>
import Inner from '../inner/inner.vue'


const props = withDefaults(
  defineProps<{
    containerClassNames?: string[]
  }>(),
  {
    containerClassNames: () => ['p-12px']
  }
)

console.log(props.containerClassNames)

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>