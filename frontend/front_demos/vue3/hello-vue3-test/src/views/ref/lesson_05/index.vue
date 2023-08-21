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
          <b>sourceUser:&nbsp;&nbsp;</b>
          <span>{{ sourceUser }}</span>
        </p>

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


        <button @click="changeSourceUser">btn1 改变 souceUser </button>&nbsp;&nbsp;
        <button @click="changeStatefoo">btn2 改变 state.foo </button>&nbsp;&nbsp;
        <button @click="changeStateAsRefs">btn3 改变 stateAsRefs</button>&nbsp;&nbsp;
      </dd>
    </dl>

    <dl>
      <dt>现象:&nbsp;&nbsp;</dt>
      <dd>点击 btn2,btn3 state state.foo stateAsRefs 视图更新</dd>
      <br>
      <dd>点击 btn2,btn3 之后 sourceUser 数据会改变，但是视图不会更新</dd>
      <br>
      <dd>点击 btn1 之后 sourceUser数据会改变，sourceUser视图不会更新，</dd>
      <dd>但是之后继续点击 btn2或者btn3后 【state state.foo stateAsRefs】视图会直接更新成 sourceUser 的数据</dd>
    </dl>

    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

// import Child from './child/child.vue'

import { reactive, toRefs } from 'vue'

const sourceUser = {
  foo: 1,
  bar: 2
}
const state = reactive(sourceUser)

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

function changeSourceUser() {
  sourceUser.foo++
}
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