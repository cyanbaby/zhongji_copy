<template>
  <div class="outer">
    <h2>根组件</h2>

    <div style="display: flex;">
      <div style="flex: 10">
        <dl>
          <dt>defineProps 和 defineEmits 基本使用:&nbsp;&nbsp;</dt>
          <dd>父子组件传值</dd>
          <dd>追踪不同组件的数据和视图的变化</dd>
        </dl>

        <dl>
          <dt>非响应式数据 源:&nbsp;&nbsp;</dt>
          <dd>

            <p>
              <b>num:&nbsp;&nbsp;</b>
              <span>{{ num }}</span>
            </p>

            <p>
              <b>user:&nbsp;&nbsp;</b>
              <span>{{ user }}</span>
            </p>

          </dd>
        </dl>

        <dl>
          <dt>操作:&nbsp;&nbsp;</dt>
          <dd>
            <button @click="changeNum">btn1 change num</button>&nbsp;&nbsp;
            <button @click="changeUser">btn2 change user</button>&nbsp;&nbsp;
          </dd>
        </dl>


        <dl>
          <dt>响应式数据:&nbsp;&nbsp;</dt>
          <dd>

            <p>
              <b>numRef:&nbsp;&nbsp;</b>
              <span>{{ numRef }}</span>
            </p>

            <p>
              <b>userState:&nbsp;&nbsp;</b>
              <span>{{ userState }}</span>
            </p>

          </dd>
        </dl>

        <dl>
          <dt>操作:&nbsp;&nbsp;</dt>
          <dd>
            <button @click="changeNumRef">btn3 change numRef</button>&nbsp;&nbsp;
            <button @click="changeUserState">btn4 change userState</button>&nbsp;&nbsp;
          </dd>
        </dl>

      </div>
      <div style="flex: 12">
        <dl>
          <dt>根组件现象:&nbsp;&nbsp;</dt>
          <dd>点击 btn1,num数据更新了， 视图不会更新</dd>

          <dd style="margin-top: 8px;">点击 btn2,user数据更新了， 视图不会更新， 但是数据已经更改了，</dd>
          <dd style="margin-bottom: 8px;">再次点击 btn3或btn4 是操作更改后的数据，并且会更新 user和userState的视图</dd>

          <dd>点击 btn3, 数据视图都更新了，不会影响 num</dd>
          <dd>点击 btn4, userState数据视图都更新了，会同步更新user的数据和视图</dd>
        </dl>

        <dl>
          <dt>Child 子组件现象:&nbsp;&nbsp;</dt>
          <dd>点击 btn1,同根组件现象一样</dd>
          <dd>点击 btn2,同根组件现象一样</dd>
          <dd>点击 btn3,同根组件现象一样</dd>
          <dd>点击 btn4,同根组件现象一样</dd>
        </dl>
      </div>
    </div>




    <Child :userState="userState" :numRef="numRef" :user="user" :num="num" />
  </div>
</template>  

<script lang="ts" setup>

import Child from './child/child.vue'

import { ref, reactive } from 'vue'

let user = {
  name: '张三',
  age: 18
}

let num = 0;

function changeNum() {
  num += 1
  console.group('change num')
  console.log(num)
  console.groupEnd()
}

function changeUser() {
  user.age += 100
  user.name = '张三' + user.age
  console.group('change num')
  console.log(user)
  console.groupEnd()
}


let numRef = ref(num)

let userState = reactive(user)



function changeNumRef() {
  numRef.value += 1
}

function changeUserState() {
  userState.age += 1
  userState.name = '张三' + userState.age
}


</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>