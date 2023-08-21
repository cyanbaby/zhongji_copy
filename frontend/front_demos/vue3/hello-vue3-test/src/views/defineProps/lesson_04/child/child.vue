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
        <dl style="position: relative; min-height: 80px;">
          <dt>操作:&nbsp;&nbsp;</dt>
          <div style="position: absolute;width: 630px;">
            <dd>
              <button @click="changeNumRef">调父组件 changeNumRef</button>&nbsp;&nbsp;
              <button @click="changeUserState">调父组件 changeUserState</button>&nbsp;&nbsp;
              <button @click="changeWorldText('Vue3')">调父组件 changeWorldText 并传值</button>&nbsp;&nbsp;
            </dd>
          </div>
        </dl>
      </div>
      <div style="flex: 12">
        <dl>
          <dt>现象:&nbsp;&nbsp;</dt>
          <dd>zzzz</dd>
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

// console.log(userState)

// setTimeout(() => {
//   console.log(userState)
// })

// console.log(props.userState.name)

const emit = defineEmits(['changeNumRef', 'changeUserState', 'changeWorldText'])

const changeNumRef = () => {
  emit("changeNumRef");
};

const changeUserState = () => {
  emit("changeUserState");
};


const changeWorldText = (text) => {
  emit("changeWorldText", text);
};



</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>