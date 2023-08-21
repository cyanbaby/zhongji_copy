<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>count:&nbsp;&nbsp;</b>
          <span>{{ count }}</span>
        </p>
        <p>
          <b>num:&nbsp;&nbsp;</b>
          <span>{{ num }}</span>
        </p>
        <p>
          <b>other:&nbsp;&nbsp;</b>
          <span>{{ other }}</span>
        </p>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeCount"> changeCount </button>&nbsp;&nbsp;
        <button @click="changeNum"> changeNum </button>&nbsp;&nbsp;
        <button @click="changeOther"> changeOther </button>&nbsp;&nbsp;
      </dd>
    </dl>

    <Child :count="count" :num="num" :other="other" />
  </div>
</template>  

<script lang="ts" setup>
import {
  watch,
  ref
} from "vue";

import Child from './child/child.vue'

const count = ref(0)
const num = ref(100)
const other = ref(1000)

const changeCount = () => {
  count.value += 1
}
const changeNum = () => {
  num.value += 1
}
const changeOther = () => {
  other.value += 1
}

// 默认不会会执行一次， 加 ,{immediate:true}
watch([count, num, other], (newValue, oldValue) => {
  console.group('watch 回调：')
  console.log(newValue)
  console.log(oldValue)
  console.groupEnd()
})

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>