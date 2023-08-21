<template>
  <div>
    <h3>watchEffect使用</h3>
  </div>
</template>


<script lang="ts" setup>
import { watchEffect } from 'vue'

// 回调中未使用任何数据(ref数据 和 reactive数据)，默认也会执行一次
watchEffect(() => {
  console.group('watchEffect 回调：')
  console.log(1)
  console.groupEnd()
})

</script>