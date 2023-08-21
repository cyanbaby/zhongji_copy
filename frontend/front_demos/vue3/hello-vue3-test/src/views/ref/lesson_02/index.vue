<template>
  <div class="outer">

    <h2>根组件</h2>
    <dl>
      <dt>toRef:&nbsp;&nbsp;</dt>
      <dd>可以用来为源响应式对象上的某个 property 新创建一个 ref。</dd>
      <dd>然后，ref 可以被传递，它会保持对其源 property 的响应式连接。</dd>
    </dl>

    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>state:&nbsp;&nbsp;</b>
          <span>{{ state }}</span>
        </p>

        <p>
          <b>state.foo:&nbsp;&nbsp;</b>
          <span>{{ state.foo }}</span>
        </p>

        <p>
          <b>fooRef:&nbsp;&nbsp;</b>
          <span>{{ fooRef }}</span>
        </p>

      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeStatefoo">changeStatefoo</button>&nbsp;&nbsp;
        <button @click="changeFooref">changeFooref</button>&nbsp;&nbsp;
      </dd>
    </dl>

    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

// import Child from './child/child.vue'

import { reactive, toRef } from 'vue'

const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

function changeStatefoo() {
  state.foo++
}

function changeFooref() {
  fooRef.value++
}

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>