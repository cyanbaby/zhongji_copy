<template>
  <div class="outer">
    <h2>根组件</h2>

    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>state:&nbsp;&nbsp;</b>
          <span>{{ state }}</span>
        </p>
        <p>
          <b>x:&nbsp;&nbsp;</b>
          <span>{{ x }}</span>
        </p>
        <p>
          <b>y:&nbsp;&nbsp;</b>
          <span>{{ y }}</span>
        </p>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <!-- <button @click="count++">+ 1</button> -->
        <button @click="changeX"> x +1</button>&nbsp;&nbsp;
        <button @click="changeY"> y +1</button>&nbsp;&nbsp;
      </dd>
    </dl>

    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

import { reactive, toRefs } from 'vue'

const state = reactive({
  x: 1,
  y: 2
})
const { x, y } = toRefs(state)

function changeX() {
  x.value += 1
}
function changeY() {
  y.value += 1
}
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>