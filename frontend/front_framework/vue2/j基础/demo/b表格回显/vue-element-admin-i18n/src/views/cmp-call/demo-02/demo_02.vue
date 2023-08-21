<template>
  <div class="yeye-box">
    <div style="position: absolute;left: 20px;top: 40px;">$attsrs 爷爷组件 msg: {{ msg }}</div>
    <!-- <div class="dingwei01">孙子传来的： </div> -->
    <child  :msg="msg" :msg2="'我是msg2'"></child>
  </div>
</template>
<script>
import baba02 from "./baba02.vue";

export default {
  name: "Test",
  components: {
    child: baba02
  },
  data() {
    return {
      msg: '爷爷组件 msg 默认值',
    };
  },
  created() {},
  methods: {},
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