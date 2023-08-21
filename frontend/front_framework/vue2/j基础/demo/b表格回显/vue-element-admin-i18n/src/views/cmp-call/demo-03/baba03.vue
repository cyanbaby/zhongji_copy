<template>
  <div class="parent-box">
    <div
      style="position: absolute; left: 20px; top: 40px"
      @click="$listeners.todo('替换')"
    >
      $listener 爸爸组件 msg: {{ $attrs.msg }}
    </div>
    <!-- 也不需要向内绑定了 -->
    <!-- <child :msg="msg"></child> -->

    <!-- 可以选择继续传递-->
    <!-- <child v-bind="$attrs" v-on="$listeners"></child> -->
    <child v-bind="$attrs" v-on="$listeners"></child>
  </div>
</template>
<script>
import sunzi03 from "./sunzi03.vue";

export default {
  name: "Test",
  components: {
    child: sunzi03,
  },
  // 当前组件props接收了msg2，当前组件的 $attrs 就不会收集 msg2 了哦！
  props: ["msg2"],
  data() {
    return {
      // msg: '父组件 msg 默认值'
    };
  },
  created() {
    // console.log('this.$attrs', this.$attrs)
    console.log("this.$listeners", this.$listeners);
  },
  methods: {},
};
</script>


<style scoped>
.parent-box {
  width: 65%;
  background: #d6d5b7;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  position: relative;
}
</style>