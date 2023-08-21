<template>
  <div>
    <h3>watch使用，同目录切换文件体验 : )</h3>
    count: {{ count }}
    <br>
    num: {{ num }}
    <br>
    other: {{ other }}
    <br>
    <button @click="changeCunout">changeCunout</button>

  </div>
</template>


<script lang="ts" setup>
import {
  watch,
  watchEffect,
  ref
} from "vue";


const count = ref(0)
const num = ref(100)
const other = ref(1000)

// 默认会执行一次，因为里面的 ref变量.value 在上面就被赋值了
const stopWatchCount = watchEffect(() => {
  console.group('watchEffect 回调：')
  console.log(`count=${count.value}`)
  console.groupEnd()

  if (count.value > 5) {
    stopWatchCount()
  }
})

// 然后每次改变 watchEffect 回调中使用的数据改变都会触发
setTimeout(() => {
  count.value++
}, 1000)

setTimeout(() => {
  count.value++
}, 2000)


const changeCunout = () => {
  count.value++
}
</script>