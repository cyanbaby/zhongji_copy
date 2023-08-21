<template>
  <div class="child">
    <div>子组件 msg: {{ show }}</div>
    <el-input v-model="child_value" @input="inputHandle" style="width: 220px"></el-input>
    <div class="share-btn" @click="confirm">确定</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      child_value: this.show,   // 或者吧子组件 el-input 继续拆开。
    };
  },
  model: {
    prop: "show",
    event: "changed",
  },
  props: {
    // 由于model选项中的prop属性指定了，所以show接收的是父组件v-model传递的值
    show: {
      type: String,
      default: '子组件默认值',
    },
  },
  methods: {
    inputHandle(val) {
      this.$emit("changed", val);
    },
    confirm() {
      // 双向数据绑定父组件传递的值
      // 第一个参数，对应model选项的event的值，你可以叫aa，bbb，ccc，起名随你
      this.$emit("changed", '子组件双向修改后的值');
    },
  },
};
</script>


<style scoped>
.child {
  background-color: #beedc7;
  height: 400px;
  width: 60%;
  padding: 100px;
}
</style>