<template>
  <div>
    <h3>computed使用，同目录切换文件体验 : )</h3>
    张三: {{ zhangsan }}
    <br>
    李四: {{ lisi }}
    <br>
    兄弟两: {{ count }}
    <br>
    <button @click="changePrice">涨薪</button>


  </div>
</template>


<script lang="ts" setup>
import {
  // watch,
  computed,
  ref
} from "vue";


const zhangsan: any = ref(3000)
const lisi: any = ref(2800)

let count = computed(() => {
  return zhangsan.value + lisi.value + '元'
})

// todo ref 怎么声明ts类型
// https://www.csdn.net/tags/MtTaMg4sNTQwMzQ4LWJsb2cO0O0O.html

const changePrice = () => {
  lisi.value = 3000
}

</script>