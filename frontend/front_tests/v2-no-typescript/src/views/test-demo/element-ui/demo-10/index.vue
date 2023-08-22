<template>
  <el-input
    v-model="inputValue"
    :value="inputValue"
    :input="handleInput"
    @input="handleInput"
    :maxlength="maxLength"
  ></el-input>
</template>

<script>
export default {
  name: 'TextView',
  data() {
    return {
      inputValue: '',
      maxLength: 10
    }
  },
  methods: {
    handleInput(value) {
      const newValue = value.replace(/\D/g, '') // 移除非数字字符
      this.inputValue = newValue
    }
  }
}
</script>
