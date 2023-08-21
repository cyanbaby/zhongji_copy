<template>
  <div class="parent-box">
    <div style="position: absolute;left: 20px;top: 40px;">
      爸爸组件 msg: {{ msg }}</div>
    <child :msg="msg"></child>
  </div>
</template>
<script>
/* eslint-disable */
import sunzi01 from "./sunzi01.vue";

export default {
  name: "Test",
  components: {
    child: sunzi01,
  },
  props: ['msg'],
  data() {
    return {
      // msg: '父组件 msg 默认值'
    };
  },
  created() {},
  methods: {},
};
</script>


<style scoped>

.parent-box {
  width:65%;
  background: #d6d5b7;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  position: relative;
}
</style>