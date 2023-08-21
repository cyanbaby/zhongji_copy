<template>
  <div class="inner">
    <h4> Inner 孙子组件</h4>
    <input type="text" v-model="newData" style="margin: 10px" />
  </div>
</template>

<script lang="ts" setup>

import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: String
})

const newData = useVModel(props, 'modelValue')

</script>

<style scoped>
.inner {
  background-color: #f4606c;
  padding: 20px;
}
</style>