<template>
  <div class="outer">
    <h2>根组件</h2>
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
          <b>student.a:&nbsp;&nbsp;</b>
          <span>{{ student?.a }}</span>
        </p>
        <p>
          <b>student.a.b:&nbsp;&nbsp;</b>
          <span>{{ student?.a?.b }}</span>
        </p>
        <p>
          <b>student.a.b.salary:&nbsp;&nbsp;</b>
          <span>{{ student?.a?.b?.salary }}</span>
        </p>

      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <!-- <button @click="changeStudent">changeStudent</button>&nbsp;&nbsp; -->
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
        <br>
        <br>
        <button @click="diffGetData"> lodash get === reactive ? </button>&nbsp;&nbsp;

      </dd>
    </dl>

    <!-- <Child :student="student" /> -->
  </div>
</template>  

<script>

</script>

<script lang="ts" setup>
import _ from 'lodash'
import {
  watch,
  reactive
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

// function changeStudent() {

//   student = reactive({
//     name: '李四',
//     age: 40,
//     a: {
//       b: {
//         salary: 4000
//       }
//     }
//   })

//   console.log(student)
// }

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
  // let a = {
  //   b: {
  //     salary: ++changeStudentAobCount
  //   }
  // }

  // student.a = a

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
  if (student?.age) {
    let age = student.age
    student.age = ++age
  }

  student.a = null
  // delete student['a']
}

function diffGetData() {
  console.log(
    _.get(student, 'a') === student.a
  )


  // 测试1
  // var a = {}
  // _.set(a, 'b.c', '我是c')
  // console.log(a)

  // 测试2
  // var user = reactive({
  //   name: '张三',
  //   age: 20,
  //   a: {
  //     b: {
  //       salary: 3000
  //     }
  //   }
  // })
  // // _.set(a, 'b.c', '我是c')
  // user.a = null
  // console.log(user)
}




// 无需deep，即可监听
// watch(student, (newValue, oldValue) => {
//   console.group('父组件 watch(student)')
//   // console.log(newValue)
//   // console.log(oldValue)
//   console.log('newValue: ', JSON.stringify(newValue))
//   console.log('oldValue: ', JSON.stringify(oldValue))
//   console.groupEnd()
// });

// 没有deep的话都监听不到，newValue和oldValue数据一致是另外一个问题。
// watch(() => student, (newValue, oldValue) => {
//   console.group('父组件 watch(watch(() => student))')
//   // console.log(newValue)
//   // console.log(oldValue)
//   console.log('newValue: ', JSON.stringify(newValue))
//   console.log('oldValue: ', JSON.stringify(oldValue))
//   console.groupEnd()
// }, { deep: true });

// 嵌套属性对象, 需要反写不然会缓存冗余结构
const watchProps = [
  'name',
  'age',
  'a.b.salary',
  'a.b',
  'a',
]

// 没有deep的话都监听不到，newValue和oldValue数据一致是另外一个问题。
// watch(watchProps.map(prop => () => _.get(student, prop)), (newValue, oldValue) => {
//   let option = {}
//   console.group('父组件监听对象的多个属性 数组[fn1, fn2..])')

//   newValue.forEach((element, index) => {
//     if (!_.isEqual(element, oldValue[index])) {
//       // console.group('_.set')
//       // console.log('index', index)
//       // console.log('watchProps[index]', watchProps[index])
//       // console.log('element', element)
//       // console.groupEnd()
//       if(element) {
//         _.set(option, watchProps[index], element)
//       }

//       // student[watchProps[index]] = element
//     }
//   })
//   // console.log('student: ', student)
//   // console.log('newValue: ', newValue)
//   // console.log('newValue: ', JSON.stringify(newValue))
//   // console.log('oldValue: ', JSON.stringify(oldValue))
//   console.log(JSON.stringify(option))


//   console.groupEnd()
// }, { deep: true });



watch(watchProps.map(prop => () => _.get(student, prop)), (newValue, oldValue) => {
  
  let option = {}

  console.group('父组件监听对象的多个属性 数组[fn1, fn2..])')

  newValue.forEach((element, index) => {
    if (!_.isEqual(element, oldValue[index])) {
      _.set(option, watchProps[index], element)
    }
  })
  console.log(JSON.stringify(option))
  console.groupEnd()

}, { deep: true });




</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>