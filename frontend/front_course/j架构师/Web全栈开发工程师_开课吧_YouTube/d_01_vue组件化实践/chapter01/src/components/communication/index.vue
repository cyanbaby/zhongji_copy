<template>
  <div>
    <h2>组件通信</h2>
    <!-- props，自定义事件 -->
    <Child1 msg="这是一个数据，来自父组件" @some-event="onSomeEvent"/>
    <!-- 事件总线 -->
    <Child2 msg="这是一个数据，来自父组件" @click="onClick"/>

    <button @click="goHome">回家吃饭</button>
  </div>
</template>

<script>
import Child1 from "./Child1.vue";
import Child2 from "./Child2.vue";

export default {
  name: 'Parent',
  provide() {
    return {
      foo: 'foooooo',
      comp: this
    }
  },
  components: {
    Child1,
    Child2,
  },
  methods: {
    onSomeEvent(e) {
        console.log(e)
    },
    goHome() {
      this.$children[0].eat('米饭!')
    },
    onClick() {
      console.log('来自父组件的onClick方法输出 this:',this.$options.name)
    }
  }
};
</script>

<style scope>
button {
  margin: 10px 0;
}
</style>