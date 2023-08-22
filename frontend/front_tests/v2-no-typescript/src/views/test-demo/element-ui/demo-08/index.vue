<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 460px"
    >
      <el-form-item label="时间范围" prop="timeRange">
        ruleForm.timeRange {{ ruleForm.timeRange }}
        <el-date-picker
          v-model="ruleForm.timeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="true"

        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TestElementUiDemo08View',
  data() {
    return {
      ruleForm: {
        timeRange: []
      },
      rules: {
        timeRange: [
          { required: true, message: '请选择时间范围', trigger: 'change' }
        ],

        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.ruleForm.timeRange[1] = '2023-05-18T16:00:00.000Z'
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
