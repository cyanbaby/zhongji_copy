<template>
  <div>
    <h3>watch使用，同目录切换文件体验 : )</h3>
    姓名: {{ student.name }}
    <br>
    年龄: {{ student.age }}
    <br>
    薪水: {{ student.a.b.salary }}

    <br>
    <button @click="changeName">changeName</button>
    &nbsp;
    &nbsp;
    <button @click="changeAge">changeAge</button>
    &nbsp;
    &nbsp;
    <button @click="changeSalary">changeSalary</button>
  </div>
</template>


<script lang="ts" setup>
// 监听reactive管理的对象的变化
import {
  watch,
  reactive
} from "vue";

const student = reactive({
  name: '张三',
  age: 20,
  a: {
    b: {
      salary: 3000
    }
  }
})
function changeName() {
  student.name = student.name + '@'
}
function changeAge() {
  student.age++
}
function changeSalary() {
  student.a.b.salary += 1000
}
// 默认不会会执行一次， 加 ,{immediate:true}
const stopWatchSdt = watch(student, (newV, oldV) => {
  console.group('watch student 回调：')
  console.log(newV.a.b.salary);
  console.log(oldV.a.b.salary)
  console.groupEnd()

  if(newV.a.b.salary > 5000) {
    stopWatchSdt()
  }
})


</script>