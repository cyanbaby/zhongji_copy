<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeUserOb">btn1 changeUserOb</button>&nbsp;&nbsp;
        <button @click="changeUserProp">btn2 changeUserProp</button>&nbsp;&nbsp;
      </dd>
    </dl>
    <!-- <Inner /> -->
  </div>
</template>

<script>
// import Inner from '../inner/inner.vue'

export default {
  // components: {
  //   Inner
  // }
  props: {
    changeUserOb: Function,
    changeUserProp: Function
  },
  data() {
    return {
      flag: '父组件'
    }
  }
}
</script>

<style>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>
