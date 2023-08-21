<template>
  <div class="outer">
    <div style="display: flex;">
      <h2>根组件</h2>
      <p style="line-height: 52px;text-indent: 20px ">测试计算属性计算 reactive 响应式对象</p>
    </div>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>
        <p>
          <b>student.name:&nbsp;&nbsp;</b>
          <span>{{ student.name }}</span>
        </p>
        <p>
          <b>student.age:&nbsp;&nbsp;</b>
          <span>{{ student.age }}</span>
        </p>
        <p>
          <b>student?.a:&nbsp;&nbsp;</b>
          <span>{{ student?.a }}</span>
        </p>
        <p>
          <b>student?.a?.b:&nbsp;&nbsp;</b>
          <span>{{ student?.a?.b }}</span>
        </p>
        <p>
          <b>student?.a?.b?.salary:&nbsp;&nbsp;</b>
          <span>{{ student?.a?.b?.salary }}</span>
        </p>

      </dd>
    </dl>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeStudentName">student.name</button>&nbsp;&nbsp;
        <button @click="changeStudentAge">student.age</button>&nbsp;&nbsp;
        <br>
        <br>
        <button @click="changeStudentAob"> student.a = {..} </button>&nbsp;&nbsp;
        <button @click="changeStudentABob"> student.a.b = {..} </button>&nbsp;&nbsp;
        <br>
        <br>
        <button @click="changeStudentAbSalary"> student.a.b.salary </button>&nbsp;&nbsp;
        <button @click="doubleChange"> doubleChange </button>&nbsp;&nbsp;
      </dd>
    </dl>
    <pre>{{ cpt_student }}</pre>
    <Child />
  </div>
</template>  

<script lang="ts" setup>
import {
  reactive,
  computed
} from "vue";
import Child from './child/child.vue'

// 计数器
let changeStudentNameCount = 0
let changeStudentAobCount = 3333
let changeStudentABobCount = 6666

let student = reactive({
  name: '张三',
  age: 20,
  a: {
    b: {
      salary: 3000
    }
  }
})


const cpt_student = computed(() => {
  return student
})


function changeStudentName() {
  student.name = '张三__' + ++changeStudentNameCount
}
function changeStudentAge() {
  // student.age++
  // 或者
  // student.age += 1
  // 或者
  let age = student.age
  student.age = ++age
}

function changeStudentAob() {
  let a = {
    b: {
      salary: ++changeStudentAobCount
    }
  }

  student.a = a
}

function changeStudentABob() {
  if (student?.a) {
    let b = {
      salary: ++changeStudentABobCount
    }
    student.a.b = b
  }
}

function changeStudentAbSalary() {
  // student.a.b.salary += 1000
  // 或..
  // let salary = student.a.b.salary
  // student.a.b.salary = salary += 1000

  if (student?.a?.b) {
    let salary = student.a.b.salary
    student.a.b.salary = salary += 1000
  }
}

function doubleChange() {
  // let age = student.age
  // student.age = ++age

  // student.name = '张三__' + ++changeStudentNameCount
  // 或
  // changeStudentName()
  // changeStudentAge()

  // Ob test
  if (student.age) {
    let age = student.age
    student.age = ++age
  }


  student.a = null
}
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>