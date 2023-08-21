<template>
  <div>child1</div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
  mounted() {
    // 利用事件总线 监听 自定义类型事件
    // this.$bus.$on('event-from-child2', msg => {
    //   console.log('Child 输出：', msg)
    // })

    // 利用 $parent 监听事件  => vue组件自带$emit和$on方法
    this.$parent.$on("event-from-child2", (msg) => {
      console.log("Child 输出：", msg);
    });
  },
  methods: {
    eat(args) {
      console.log('Child1 输出：', args)
    }
  }
};
</script>

<style>
</style>