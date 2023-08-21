<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>refUser:&nbsp;&nbsp;</b>
          <span>{{ JSON.stringify(refUser, null, 4) }}</span>
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
    <Child :refUser="refUser" />
  </div>
</template>  

<script lang="ts" setup>

import Child from './child/child.vue'
import { ref } from 'vue'

let user = {
  name: '张三',
  age: 18,
  info: {
    Height: 170,
    Weight: 60
  }
}

let refUser = ref(user)

function changeUserName() {
  refUser.value.name = '李四'
}
function changeUserInfo() {
  refUser.value.info = {
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