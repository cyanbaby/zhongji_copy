<template>
  <div class="middle">
    <h3> Child 子组件</h3>

    <div style="display: flex;">
      <div style="flex: 10">
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
          <dt>现象:&nbsp;&nbsp;</dt>
          <dd>点击 btn1,不可以修改， 只读警告</dd>
          <dd style="margin-top: 8px;">点击 btn2,user数据更新了， 视图不会更新， 但是数据已经更改了，</dd>
          <dd style="margin-bottom: 8px;">再次点击 btn4或根组件btn3,btn4 是操作更改后的数据，并且会更新 user和userState的视图【父子组件的视图都会更新】</dd>
          <dd>点击 btn3,不可改</dd>
          <dd>点击 btn4, userState数据视图都更新了，会同步更新user的数据和视图【父子组件的视图都会更新】</dd>
        </dl>
      </div>

    </div>



    <!-- <Inner/> -->
  </div>
</template>

<script lang="ts" setup>
// import Inner from '../inner/inner.vue'


// 声明 props
const props = defineProps({
  userState: {
    type: Object,
    default: () => ({})
  },
  numRef: {
    type: Number,
    default: 0
  },
  user: {
    type: Object,
    default: () => ({})
  },
  num: {
    type: Number,
    default: 0
  },
})

function changeNum() {
  // props.num += 1
  // console.group('change num')
  // console.log(props.num)
  // console.groupEnd()
  console.log('不可以修改， 只读警告')
}

function changeUser() {
  props.user.age += 100
  props.user.name = '张三' + props.user.age

  // console.group('change num')
  // console.log(props.user)
  // console.groupEnd()
}


function changeNumRef() {
  // props.numRef.value += 1  // 红色 error
  // props.numRef += 1  // 不可以修改， 只读警告
  console.log('不可改')
}

function changeUserState() {
  props.userState.age += 1
  props.userState.name = '张三' + props.userState.age
}

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>