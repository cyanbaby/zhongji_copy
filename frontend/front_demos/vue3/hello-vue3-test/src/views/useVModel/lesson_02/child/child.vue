<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    测试 useVModel 对转接的对象的影响
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>sunzi:&nbsp;&nbsp;</b>
          <span>{{ sunzi }}</span>
        </p>
      </dd>
    </dl>
    <button @click="handleTest">测试</button>
    <Inner />
  </div>
</template>

<script lang="ts" setup>
import Inner from '../inner/inner.vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  child: any
}>()
const child = useVModel(props, 'child')

const sunzi = child.value.sunzi

console.log(sunzi)

function handleTest() {
  // child.value.sunzi.name = '哈哈哈'  // 影响
   child.value.sunzi = {
    name: '陈独秀',
    age: 18
   }
}

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>