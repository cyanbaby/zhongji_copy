<template>
  <div class="parent-box">
    <div style="position: absolute;left: 20px;top: 40px;">父组件 msg: {{ msg }}</div>
    <child v-model="msg"></child>
  </div>
</template>
<script>
import TestChild02 from "./TestChild02.vue";

export default {
  name: "Test",
  components: {
    child: TestChild02,
  },
  data() {
    return {
      msg: '父组件 msg默认值'
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