<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>userName:&nbsp;&nbsp;</b>
          <span>{{ userName }}</span>
        </p>
      </dd>
    </dl>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="change">切换数据</button>&nbsp;&nbsp;
      </dd>
    </dl>
    <Inner />
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import Inner from '../inner/inner.vue'

const props = defineProps<{
  userName?: string
}>()

const userName = useVModel(props, 'userName')

const change = () => {
  userName.value = '李四'
  console.log(userName.value)
}

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>