<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <input type="text" v-model="newData" style="margin: 10px"/>

    <Inner v-model="newData" />
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import Inner from '../inner/inner.vue'

const props = defineProps({
  modelValue: String
})

// const emit = defineEmits(['update:data'])
// const newData = useVModel(props, 'data', emit)

const newData = useVModel(props, 'modelValue')


</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>