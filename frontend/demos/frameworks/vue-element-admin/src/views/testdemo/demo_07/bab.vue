<template>
  <div class="bab">
    <h3>爸爸组件</h3>
    <dl>
      <dt>爸爸组件的数据</dt>
      <dd>接收的 msg: {{ msg }}</dd>
      <el-button size="mini" @click="click">click</el-button>
    </dl>

    <!-- <div class="sunz">
      <h3>孙子组件</h3>
      <dl>
        <dt>孙子组件的数据</dt>
        <dd>name: ccc</dd>
        <dd>age: 8</dd>
      </dl>
    </div> -->
  </div>
</template>

<script>
// 参考： https://www.cnblogs.com/Im-Victor/p/16121210.html
export default {
  model: {
    prop: 'msg', // 指定 v-model 要绑定的参数叫什么名字，来自于 props 中定义的参数
    event: 'update:msg' // 指定要触发的事件名字，将被用于 $emit
  },
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {
    click() {
      this.$emit('update:msg', '随意值')
    }
  }
}
</script>

<style lang="scss" scoped>
.yey {
  background-color: #a0eee1;
}
.bab {
  background-color: #bee7e9;
}
.sunz {
  background-color: #beedc7;
}
</style>
