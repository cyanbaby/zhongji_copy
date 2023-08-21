<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>user:&nbsp;&nbsp;</b>
          <span>{{ JSON.stringify(user, null, 4) }}</span>
        </p>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeUserName">btn1 change user name</button>&nbsp;&nbsp;
        <button @click="changeUserInfo">btn2 change user info</button>&nbsp;&nbsp;
      </dd>
    </dl>
    <Child :user="user" />
  </div>
</template>  

<script lang="ts" setup>

import Child from './child/child.vue'

let user = {
  name: '张三',
  age: 18,
  info: {
    Height: 170,
    Weight: 60
  }
}
function changeUserName() {
  user.name = '李四'
}
function changeUserInfo() {
  user.info = {
    Height: 180,
    Weight: 70
  }
}
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>