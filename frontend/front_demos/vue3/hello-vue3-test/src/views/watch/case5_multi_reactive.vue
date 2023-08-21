<template>
  <div>
    <h3>watch使用，同目录切换文件体验 : )</h3>
    姓名: {{ student.name }}
    <br>
    年龄: {{ student.age }}
    <br>
    薪水: {{ student.a.b.salary }}
    <br>
    list: {{ student.a.b.list }}
    <br>
    <button @click="changeName">changeName</button>
    &nbsp;
    &nbsp;
    <button @click="changeAge">changeAge</button>
    &nbsp;
    &nbsp;
    <button @click="changeSalary">changeSalary</button>
    &nbsp;
    &nbsp;
    <button @click="changeList">changeList curd</button>    
    &nbsp;
    &nbsp;
    <button @click="changeListOb">changeList 替换</button>
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
      salary: 3000,
      list: ['aa', 'bb', 'cc']
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
function changeList() {
  // 能监听，新旧value 相同  ×
  student.a.b.list.push('dd')
}
function changeListOb() {
  // 能监听，新旧value 不相同  √
  student.a.b.list = ['a', 'b', 'c']
}



// 默认不会会执行一次， 加 ,{immediate:true}
// 监听 reactive对象时，新旧数据一样，都是新的
// watch(student, (newV, oldV) => {
//   console.group('watch student 回调：')
//   console.log(newV.a.b.salary);
//   console.log(oldV.a.b.salary)
//   console.groupEnd()
// })

// 监听对象的某个属性
watch(() => student.a.b.salary, (newV, oldV) => {
  console.group('watch(() => student.a.b.salary 回调：')
  console.log(newV);
  console.log(oldV)
  console.groupEnd()
})

// 监听对象的某些属性 || 写多个watch吧
// watch([() => student.a.b.salary, () => student.age], (newV, oldV) => {
//   console.group('watch student 回调：')
//   console.log(newV);
//   console.log(oldV)
//   console.groupEnd()
// })

// 监听数组
watch(() => student.a.b.list, (newV, oldV) => {
  console.group('watch(() => student.a.b.list 回调：')
  console.log('newV', newV);
  console.log('oldV', oldV)
  console.groupEnd()
}, { deep: true })

</script>