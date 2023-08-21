<template>
  <div>
    <!-- lebal -->
    <label v-if="label">{{label}}</label>
    
    <slot></slot>

    <!-- 校验信息显示 -->
    <p v-if="error" style="color: red">{{error}}</p>

    <!-- 查看 校验规则 数据 -->
    <!-- <p>{{form.model}}</p> -->
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      error: '' // error空，说明通过
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      // 当前规则是什么   this.form.rules
      // console.log(this.form.rules[this.prop])

      // 当前值是什么     KFormItem 的 prop=xxx  this.form.model[prps]
      // console.log(this.form.model[this.prop])

      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]

      // console.log(rules)
      // console.log(value)

      // 校验的描述对象
      const desc = {[this.prop]: rules}

      // 创建 Schema 实例
      const schema = new Schema(desc)
      return schema.validate({[this.prop]: value}, errors => {
        if(errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    }
  }
}
</script>

<style>

</style>