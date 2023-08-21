<template>
  <div class="parent-box">
    <div style="position: absolute;left: 20px;top: 40px;">
      $attsrs 爸爸组件 msg: {{ $attrs.msg }}
    </div>
    <!-- 也不需要向内绑定了 -->
    <!-- <child :msg="msg"></child> -->

    <child v-bind="$attrs"></child>
  </div>
</template>
<script>
import sunzi02 from "./sunzi02.vue";

export default {
  name: "Test",
  components: {
    child: sunzi02,
  },
  // 当前组件props接收了msg2，当前组件的 $attrs 就不会收集 msg2 了哦！
  props: ['msg2'],
  data() {
    return {
      // msg: '父组件 msg 默认值'
    };
  },
  created() {
    // console.log('this.$attrs', this.$attrs)
  },
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