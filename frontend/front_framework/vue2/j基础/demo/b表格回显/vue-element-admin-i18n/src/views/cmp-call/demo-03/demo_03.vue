<template>
  <div class="yeye-box">
    <div style="position: absolute;left: 20px;top: 40px;">$listener 爷爷组件 msg: {{ msg }}</div>
    <!-- <div class="dingwei01">孙子传来的： </div> -->
    <child  :msg="msg" :msg2="'我是msg2'" @todo="handleChildrenClick"></child>
  </div>
</template>
<script>
import baba03 from "./baba03.vue";

export default {
  name: "Test",
  components: {
    child: baba03
  },
  data() {
    return {
      msg: '爷爷组件 msg 默认值',
    };
  },
  created() {},
  methods: {
    handleChildrenClick(arg) { // 可以接收参数， 如果不穿默认是Event对象
      console.log('这是顶层 yeye组件的 handleClick 方法输出:', arg)
      console.log(this.msg)
    }
  },
};
</script>


<style scoped>
.yeye-box {
  position: relative;
  background: #ECAD9E;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  position: relative;
  padding-top: 100px;
  padding-bottom: 100px;
  margin: 20px;
}
.dingwei01 {
  position: absolute;
  left: 20px;
  top: 70px;
}
</style>