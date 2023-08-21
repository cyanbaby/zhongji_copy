<template>
  <div>
    <h3>watchEffect使用</h3>
    count: {{ data.count }}
    <br>
    num: {{ data.num }}
    <br>
    other: {{ data.other }}


  </div>
</template>


<script lang="ts" setup>
import {
  watchEffect,
  reactive
} from "vue";


let data = reactive({
  count: 0,
  num: 100,
  other: 1000
})

// 默认会执行一次，因为里面的 reactive变量.count 在上面就被赋值了
watchEffect(() => {
  console.group('watchEffect 回调：')
  console.log(`count=${data.count}`)
  console.groupEnd()
})

// 然后每次改变 watchEffect 回调中使用的数据改变都会触发
setTimeout(() => {
  data.count++
}, 1000)

// 同一个reactive对象, watchEffect 回调中未使用数据改变，不会触发
setTimeout(() => {
  data.num++
}, 2000)

// 同一个reactive对象, watchEffect 回调中未使用数据改变，不会触发
setTimeout(() => {
  data.other++
}, 3000)

</script>