<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>ref:&nbsp;&nbsp;</dt>
      <dd>
        <div ref="eleDom">ref dom 测试</div>
      </dd>
    </dl>
  </div>
</template>  

<script lang="ts" setup>
import { ref, onMounted } from 'vue'


// 定义的ref变量名必须要和模板中ref中的值一致,如代码中的eleDom
const eleDom = ref<any>(null)

onMounted(() => {
  console.log(eleDom.value.innerHTML) // ref-dom-test
  console.log(eleDom)
})
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>