<template>
  <div class="parent-box">
    <div style="position: absolute;left: 20px;top: 40px;">
      父组件 msg: {{ msg }}
    </div>
    <child v-model="msg"></child>
  </div>
</template>
<script>
import TestChild01 from "./TestChild01.vue";

export default {
  name: "Test",
  components: {
    child: TestChild01,
  },
  data() {
    return {
      msg: '父组件 msg 默认值'
    };
  },
  created() {},
  methods: {},
};
</script>


<style >
.parent-box {
  background: #d6d5b7;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  position: relative;
  margin: 20px;
}
</style>