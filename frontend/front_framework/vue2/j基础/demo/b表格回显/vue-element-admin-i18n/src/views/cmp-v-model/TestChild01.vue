
<template>
  <div class="child">
    <div>子组件 msg: {{ value }}</div>
    <el-input v-model="child_value" @input="inputHandle" style="width: 220px"></el-input>
    <div class="share-btn" @click="confirm">确定</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      child_value: this.value,
    };
  },
  props: {
    value: {                
        type: String,                
        default: '子组件默认值'            
    }
  },
  created() {},
  methods: {
    inputHandle(val) {
      this.$emit("input", val);
    },
    confirm() {
      // 双向数据绑定父组件:value对应的值
      // 通过$emit触发父组件input事件，第二个参数为传递给父组件的值，这里传递了一个false值
      // 可以理解为最上面展示的@input="msg = $event.target.value"这个事件
      // 即触发父组件的input事件，并将传递的值‘false’赋值给msg
      this.$emit("input", '这是子组件更改后的值');
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