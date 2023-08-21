<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide(){
    return {
      form: this
    }
  },  
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 获取所有孩子 KFormItem（可能是孙子,作业）

      // [ resultPromise, .. ]  支持异步校验啊
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      console.log(tasks)
      Promise
        .all(tasks)
        .then(() =>  cb(true) )
        .catch(() =>  cb(false))
    }
  }
}
</script>

<style>

</style>