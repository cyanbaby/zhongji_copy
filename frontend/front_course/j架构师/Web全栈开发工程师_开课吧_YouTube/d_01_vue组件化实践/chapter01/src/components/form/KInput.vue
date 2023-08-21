<template>
<div>
  <!-- Vue自定义组件双向绑定(v-moodel) 需要 :value  @input -->
   <!-- v-bind="$attrs"  展开 $attrs -->
  <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
</div>
</template>

<script>
export default {
  inheritAttrs: false,  // 设置false 避免属性设置到根元素上
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)

      // 通知腹肌执行校验
      // this.$emit('validate')  // 不行 slot 还是一个插槽呢
      this.$parent.$emit('validate')  // 有耦合的问题
    }
  }
}
</script>

<style>

</style>