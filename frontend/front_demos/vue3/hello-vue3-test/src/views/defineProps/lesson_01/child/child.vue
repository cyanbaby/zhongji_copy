<template>
  <div class="middle">
    <h3> Child 子组件</h3>
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

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>