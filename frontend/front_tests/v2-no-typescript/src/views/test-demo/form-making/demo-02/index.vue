<template>
  <div>
    <fm-generate-form :data="jsonData" ref="generateForm"> </fm-generate-form>

    <el-button type="primary" @click="handleSubmit">Submit</el-button>
    <el-button type="primary" @click="handleSubmit(false)"
      >Submit(不验证表单)</el-button
    >
  </div>
</template>

<script>
import jsonData from './jsonData'

export default {
  name: 'TestFormMakingDemo02View',
  data() {
    return {
      jsonData
    }
  },
  methods: {
    handleSubmit(validate = true) {
      this.$refs.generateForm.getData(validate).then((data) => {
        this.$alert(data, '表单数据')
      })
    }
  }
}
</script>
