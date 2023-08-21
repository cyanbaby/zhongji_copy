<template>
  <div class="outer">
    <h2>根组件</h2>

    <div style="display: flex;">
      <div style="flex: 8">


        <dl>
          <dt>非响应式数据 源:&nbsp;&nbsp;</dt>
          <dd>

            <p>
              <b>updateTextRef:&nbsp;&nbsp;</b>
              <span>{{ updateTextRef }}</span>
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
            <button @click="updateParentView">btn1 updateParentView</button>&nbsp;&nbsp;
            <button @click="changeUser">btn2 change user</button>&nbsp;&nbsp;
          </dd>
        </dl>
      </div>
      <div style="flex: 12">
        <dl>
          <dt>现象:&nbsp;&nbsp;</dt>
          <dd>
            <dl>
              <dt>点击 btn2 数次，子组件5秒后输出的数据：</dt>
              <dd style="margin-bottom: 8px;">计算属性 【childUser_object childUser_object.name 和 user】 数据都发生了变化【因为计算的 props.user 是个对象】，视图没变</dd>
              <dd style="margin-bottom: 8px;">计算属性 【childUser_prop 和 childUser_prop.name】 数据和视图都没变 【因为虽然计算的 props.user.name 返回的新对象 {}】</dd>
              <dd style="margin-bottom: 8px;">但是点击 btn1 父子组件都会更新视图【父组件user】, 子组件 【props.user childUser_object相关】</dd>
              <dd style="margin-bottom: 8px;">父子组件更新的前提父组件传递了是接收了 btn1改变的ref数据 updateTextRef </dd>
              <dd style="margin-bottom: 8px;">父子组件视图有没有用到 updateTextRef 不会影响重新渲染条件(视图更新条件)</dd>
              <dd style="margin-bottom: 8px;">子组件不用defineProps(显示接收?) updateTextRef也没关系，父组件传递即可</dd>

            </dl>
          </dd>
        </dl>
      </div>
    </div>
    
    <Child :user="user" :updateTextRef="updateTextRef" />
  </div>
</template>  

<script lang="ts" setup>

import Child from './child/child.vue'

import { ref, reactive } from 'vue'

let updateTextRef = ref(0)

function updateParentView() {
  updateTextRef.value += 1
}

let user = {
  name: '张三',
  age: 18
}


function changeUser() {
  user.age += 100
  user.name = '张三' + user.age
  console.group('change num')
  console.log(user)
  console.groupEnd()
}
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>