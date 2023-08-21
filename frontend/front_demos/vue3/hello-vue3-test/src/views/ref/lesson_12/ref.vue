<template>

  <h3>ref使用，同目录切换文件体验 : )</h3>
  <div ref="eleDom">ref-dom-test</div>


</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue'


// 定义的ref变量名必须要和模板中ref中的值一致,如代码中的eleDom
const eleDom = ref<any>(null)

onMounted(() => {
  console.log(eleDom.value.innerHTML) // ref-dom-test
})

</script>