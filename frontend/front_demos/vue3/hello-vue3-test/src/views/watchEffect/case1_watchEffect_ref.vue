<template>
  <div>
    <h3>watchEffect使用</h3>
    count: {{ count }}
    <br>
    num: {{ num }}
    <br>
    other: {{ other }}


  </div>
</template>


<script lang="ts" setup>
import {
  watchEffect,
  ref
} from "vue";


const count = ref(0)
const num = ref(100)
const other = ref(1000)

// 默认会执行一次，因为里面的 ref变量.value 在上面就被赋值了
watchEffect(() => {
  console.group('watchEffect 回调：')
  console.log(`count=${count.value}`)
  console.log(`num=${num.value}`)
  console.groupEnd()
})

// 然后每次改变 watchEffect 回调中使用的数据改变都会触发
setTimeout(() => {
  num.value++
}, 1000)
setTimeout(() => {
  num.value++
}, 2000)

// 改变 watchEffect 回调中未使用数据不会触发
setTimeout(() => {
  other.value++
}, 3000)

</script>