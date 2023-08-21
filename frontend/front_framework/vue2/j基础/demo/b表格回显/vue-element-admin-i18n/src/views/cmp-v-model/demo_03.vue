<template>
  <div class="parent-box">
    <div style="position: absolute;left: 20px;top: 40px;">父组件 msg: {{ msg }}</div>
    <div style="position: absolute;left: 20px;top: 80px;">父组件 name: {{ name }}</div>
    <child :msg.sync="msg" :name.sync="name"></child>
    <!-- <child 
      :msg="msg"
      @update:msg="msg = $event"
    ></child> -->

  </div>
</template>
<script>
import TestChild03 from "./TestChild03.vue";

export default {
  name: "Test",
  components: {
    child: TestChild03,
  },
  data() {
    return {
      msg: '父组件 msg 默认值',
      name: '父组件 name 默认值',
    };
  },
  created() {},
  methods: {},
};
</script>


<style scoped>
.parent-box {
  background: #d6d5b7;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  position: relative;
}
</style>