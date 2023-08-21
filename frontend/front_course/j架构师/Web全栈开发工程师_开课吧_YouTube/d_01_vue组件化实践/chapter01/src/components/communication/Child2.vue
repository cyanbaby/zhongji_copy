<template>
  <div>
    <!-- $listeners会被展开并监听 -->
    <h3 v-on="$listeners">child2</h3>
    <button @click="sendToChild1">Child2 给 Child1 发送消息</button>
    <p>Child2 msg： {{ $attrs.msg }}</p>
    <!-- <p>Child2 foo： {{ foo }}</p> -->
    <p>Child2 bar： {{ bar }}</p>

  </div>
</template>

<script>
export default {
    // inject: ['foo'],
    inject: {
      bar: {
        from: 'foo'
      }
    },
    methods: {
        sendToChild1() {
            // 利用事件总线 广播 自定义类型事件
            // this.$bus.$emit('event-from-child2', '这是一个数据，来自 Child2 组件')

            // 利用 $parent 派发事件  => vue组件自带$emit和$on方法
            this.$parent.$emit('event-from-child2', '这是一个数据，来自 Child2 组件')
        
        }
    }
}
</script>

<style>

</style>