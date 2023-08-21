<template>
  <div class="outer">
    <h2>根组件</h2>

    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>userRef:&nbsp;&nbsp;</b>
          <span>{{ userRef }}</span>
        </p>
        <dl>
          <dt>
            <b>listRef:&nbsp;&nbsp;</b>

          </dt>
          <dd>
            <el-table :data="listRef" border style="width: 100%">
              <el-table-column prop="date" label="Date" width="180" />
              <el-table-column prop="name" label="Name" width="180" />
              <el-table-column prop="address" label="Address" />
            </el-table>
          </dd>
        </dl>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeUserRef"> changeUserRef </button>&nbsp;&nbsp;
        <button @click="changeListRef"> changeListRef </button>&nbsp;&nbsp;
      </dd>
    </dl>

    <dl>
      <dt>现象:&nbsp;&nbsp;</dt>
      <dd>zzz</dd>

    </dl>

    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

import { ref } from 'vue'

let user = {
  name: '张三',
  age: 18
}

let list = [{
  date: '2016-05-01',
  name: '王小虎1',
  address: '上海市普陀区金沙江路 1511 弄'
}, {
  date: '2016-05-02',
  name: '王小虎2',
  address: '上海市普陀区金沙江路 1512 弄'
}, {
  date: '2016-05-03',
  name: '王小虎3',
  address: '上海市普陀区金沙江路 1513 弄'
}, {
  date: '2016-05-04',
  name: '王小虎4',
  address: '上海市普陀区金沙江路 1514 弄'
}]

let userRef = ref(user)
let listRef = ref(list)

function changeUserRef() {
  userRef.value = {
    name: '李四',
    age: 24
  }
}
function changeListRef() {
  listRef.value.push({
  date: '2016-05-05',
  name: '王小虎5',
  address: '上海市普陀区金沙江路 1515 弄'
})
}

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>