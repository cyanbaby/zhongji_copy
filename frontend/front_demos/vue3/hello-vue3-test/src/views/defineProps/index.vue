<template>
  <div class="outer">
    <h2>defineProps 根组件</h2>


    <b>原始对象obj => obj:</b> {{ obj }}
    <br>

    
    <b>ref(原始对象obj objname) => state:</b> {{ state }}
    <br>
    <br>

    <button @click="changeObj">change obj</button>
    &nbsp;
    &nbsp;
    <button @click="changeState">change state.value</button>


    <br>
    <br>

    <hr>

    <b>原始对象obj_02 => obj_02:</b> {{ obj_02 }}
    <br>

    <b>toRef(原始对象obj_02, 'name') => state_02:</b> {{ state_02 }}
    <br>
    <br>
    <button @click="changeObj_02">change obj_02</button>
    &nbsp;
    &nbsp;
    <button @click="changeState_02">change state_02.value</button>

    <hr>
    它一直更新，不然控制不了更新技能 => ageRef: {{ ageRef }}
    <br>
    <br>
    <button @click="stopAgeTimer">stopAgeTimer</button>
    &nbsp;
    &nbsp;
    <button @click="startAgeTimer">startAgeTimer</button>

    <br>
    <br>


    <hr>
    ref(20)  reactive({age: ageRef2 }) => info: {{ info.age }}
    <br>
    <br>
    <button @click="stopInfoAgeTimer">stopInfoAgeTimer</button>
    &nbsp;
    &nbsp;
    <button @click="startInfoAgeTimer">startInfoAgeTimer</button>

    <br>
    <br>



    <hr>
    state_03.age: {{ state_03.age }}
    <br>
    <br>

    ageRef_03：{{ ageRef_03 }}
    <br>
    <br>
    <button @click="changeStateAge_03">changeStateAge_03</button>
    &nbsp;
    &nbsp;
    <button @click="changeAgeRef_03">changeAgeRef_03</button>

    <br>
    <br>
    
    <hr>
    state_04.age: {{ state_04.age }}
    <br>
    <br>

    ageRef_04：{{ ageRef_04 }}
    <br>
    <br>
    <button @click="changeStateAge_04">changeStateAge_04</button>
    &nbsp;
    &nbsp;
    <button @click="changeAgeRef_04">changeAgeRef_04</button>

    <br>
    <br>

    <hr>

    <b>userinfo:</b> {{ userinfo }}
    <br>
    <br>
    <button @click="changeUserInfo">change userinfo</button>
    &nbsp;
    &nbsp;
    <button @click="addAge">技能: 算是更新视图?</button>

    <br>
    <br>


    <Child :userinfo="userinfo" @sayHello="sayHello" />
  </div>
</template>  

<script lang="ts" setup>

// demo_01

import Child from './demo_01/child/child.vue'


import { provide, reactive, ref, toRef } from 'vue'

// 注入普通对象
/*
const userinfo = {
  username: "张三",
  age: 20
}
provide('userinfo', userinfo)

setTimeout(() => {
  userinfo.username = '张3333'
  userinfo.age = 200
}, 1500)
//*/

// 注入响应式对象
//*
let userinfo = reactive({
  username: "张三",
  age: 20
})

provide('userinfo', userinfo)

setTimeout(() => {
  userinfo.username = '张3333'
  userinfo.age = 200
}, 1500)
//*/


const sayHello = () => {
  // console.log('index.vue sayHello')
  // console.log('Hello World')

  console.log(userinfo)
}

const changeUserInfo = () => {
  userinfo.username = '张三 变 李四'
}
const addAge = () => {
  userinfo.age += 1
}



/* ------------------------- /ref/case1_ref_sideeffect.vue 开始 ------------------------- */

// 原始数据 => 普通对象
let obj = { name: "罗翔", age: 22 }

// ref响应式数据， ref是值的复制,视图会更新，不会影响源数据
let state = ref(obj.name)

const changeObj = () => {
  obj.name = 'Obj new name'
  console.log(obj)  // 数据变，视图不变
  // 有意思的现象是，点击玩这个按钮之后，点击 changeState 会更新 obj 的视图  或者 在1.5s 的定时器之前完成一次点击
}


// 数据变
function changeState() {
  state.value = "张三 变 罗翔";

  // 原始数据没有发生改变 原始数据obj { name: "张三", age: 22 }
  console.group('原始数据obj')
  console.log(obj)
  console.groupEnd()


  // 变成了一个ref的对象
  console.group('响应式state')
  console.log(state)
  console.groupEnd()

  //响应式数据发生改变了  
  /*********************************************
  响应式state RefImpl {
      _rawValue: "张三变成李四", _shallow: false,
      __v_isRef: true, _value: "张三变成李四"
  }
  *********************************************/
}
/* ------------------------- /ref/case1_ref_sideeffect.vue 结束 ------------------------- */





/* ------------------------- /ref/case2_toRef_view.vue 开始 ------------------------- */
// 原始数据 => 普通对象
let obj_02 = { name: "张三", age: 22 }

// 将对象中的某一个属性name变成响应式数据
// 而不是将 源数据obj_02对象 变成响应式数据
let state_02 = toRef(obj_02, 'name');

const changeObj_02 = () => {
  obj_02.name = 'Obj new name 02'
  // console.log(obj)  // 数据变，视图不变
  // 有意思的现象是，点击玩这个按钮之后，点击 changeState 会更新 obj 的视图  或者 在1.5s 的定时器之前完成一次点击
}

// toRef是引用,视图不跟新
function changeState_02() {

  state_02.value = "张三变成李四 02";

  // 源数据obj_02 属性值发生了改变 obj_02 {name: '张三变成李四', age: 22}
  console.group('原始数据obj_02')
  console.log(obj_02)
  console.groupEnd()

  // 但视图不会更新
  // console.log(state_02.value)  // 张三变成李四
  console.group('响应式state_02')
  console.log(state_02)
  console.groupEnd()
}
/* ------------------------- /ref/case2_toRef_view.vue 结束 ------------------------- */






/* ------------------------- /ref/case3_ref_change.vue 开始 ------------------------- */
let ageRef = ref(20)

let age_timer = {}

function stopAgeTimer() {
  clearInterval(age_timer)
}
function startAgeTimer() {
  age_timer = setInterval(() => {
    ageRef.value += 1
  }, 100)
}
/* ------------------------- /ref/case3_ref_change.vue 结束 ------------------------- */






/* ------------------------- case4_reactive_mock_case3.vue 开始 ------------------------- */
const ageRef2 = ref(20)

const info = reactive({
  age: ageRef2
})

let info_age_timer = {}

function stopInfoAgeTimer() {
  clearInterval(info_age_timer)
}
function startInfoAgeTimer() {
  info_age_timer = setInterval(() => {
    ageRef2.value  += 1
  }, 100)
}

/* ------------------------- case4_reactive_mock_case3.vue 结束 ------------------------- */





/* ------------------------- case5_reactive_toRef_combination 开始 ------------------------- */

// todo 这里再用一个变量试试
const state_03 = reactive({
  name: 'JL',
  age: 18
})
const ageRef_03 = toRef(state_03, 'age')


function changeStateAge_03() {
  state_03.age += 1
  // console.log(ageRef_03.value) // 关联同步同步了
}
function changeAgeRef_03() {
  ageRef_03.value += 1
  // console.log(state_03.age) // 关联同步同步了
}

/* ------------------------- case5_reactive_toRef_combination 结束 ------------------------- */





/* ------------------------- case5_reactive_toRef_z 开始 ------------------------- */

let user = {
  name: 'JL',
  age: 18
}

const state_04 = reactive(user)

const ageRef_04 = toRef(state_04, 'age')


function changeStateAge_04() {
  state_04.age += 1
  // console.log(ageRef_04.value) // 关联同步同步了
}
function changeAgeRef_04() {
  ageRef_04.value += 1
  // console.log(state_04.age) // 关联同步同步了
}

/* ------------------------- case5_reactive_toRef_z 结束 ------------------------- */

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>