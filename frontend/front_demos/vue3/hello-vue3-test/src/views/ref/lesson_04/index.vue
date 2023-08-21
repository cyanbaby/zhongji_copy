<template>
  <div class="outer">

    <h2>根组件</h2>
    <dl>
      <dt>toRefs:&nbsp;&nbsp;</dt>
      <dd>将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref。</dd>
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
          <b>stateAsRefs.foo:&nbsp;&nbsp;</b>
          <span>{{ stateAsRefs.foo }}</span>
        </p>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeStatefoo">btn1 改变 state.foo </button>&nbsp;&nbsp;
        <button @click="changeStateAsRefs">btn2 改变 stateAsRefs</button>&nbsp;&nbsp;
      </dd>
    </dl>



    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

// import Child from './child/child.vue'

import { reactive, toRefs } from 'vue'

const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// ref 和原始 property 已经“链接”起来了
function changeStatefoo() {
  state.foo++
}

function changeStateAsRefs() {
stateAsRefs.foo.value++
}

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>