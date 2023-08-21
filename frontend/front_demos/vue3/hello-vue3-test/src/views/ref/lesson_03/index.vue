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
          <b>fooRef:&nbsp;&nbsp;</b>
          <span>{{ fooRef }}</span>
        </p>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeSourceUser">btn1 改变 sourceUser </button>&nbsp;&nbsp;
        <button @click="changeStatefoo">btn2  改变 state.foo </button>&nbsp;&nbsp;
        <button @click="changeFooref">btn3 改变 fooRef</button>&nbsp;&nbsp;
      </dd>
    </dl>

    <dl>
      <dt>现象:&nbsp;&nbsp;</dt>
      <dd>点击 btn2,btn3 state state.foo fooRef 视图更新</dd>
      <br>
      <dd>点击 btn2,btn3 之后 sourceUser 数据会改变，但是视图不会更新</dd>
      <br>
      <dd>点击 btn1 之后 sourceUser数据会改变，sourceUser视图不会更新，</dd>
      <dd>但是之后继续点击 btn2或者btn3后 【state state.foo fooRef】视图会直接更新成 sourceUser 的数据</dd>

      <dd></dd>
    </dl>

    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

// import Child from './child/child.vue'

import { reactive, toRef } from 'vue'

const sourceUser = {
  foo: 1,
  bar: 2
}

const state = reactive(sourceUser)

const fooRef = toRef(state, 'foo')

function changeSourceUser() {
  sourceUser.foo++
  console.group('change state.foo')
  console.log(sourceUser)
  console.groupEnd()
}

function changeStatefoo() {
  state.foo++
  console.group('change state.foo')
  console.log(sourceUser)
  console.groupEnd()
}

function changeFooref() {
  fooRef.value++
  console.group('change fooRef.value')
  console.log(sourceUser)
  console.groupEnd()
}

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>