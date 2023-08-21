<template>
  <div class="inner">
    <h4> Inner 孙子组件</h4>
    {{ newData }}
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeChildAge"> 改变 childAge</button>&nbsp;&nbsp;
      </dd>
    </dl>    
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
const props = defineProps<{
  childAge: number
}>()



const newData = useVModel(props, 'childAge')
const changeChildAge = () => {
  newData.value = 28
}
</script>

<style scoped>
.inner {
  background-color: #f4606c;
  padding: 20px;
}
</style>