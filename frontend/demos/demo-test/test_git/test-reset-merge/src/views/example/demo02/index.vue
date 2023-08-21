<template>
  <div style="width: 220px">
    <el-form label-width="80px">
      <el-form-item label="整数">
        <!-- <el-input v-model="value" onkeyup="value=value.replace(/[^\d]/g,'')" /> -->
        <el-input v-model.number="form.age" placeholder="请输入" min="1" oninput="value=value.replace(/[^\d]/g,'')" />
        {{ form.age }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      form: {
        age: ''
      }
    }
  },
  methods: {
    prevent(e) {
      var keynum = window.event ? e.keyCode : e.which // 获取键盘码
      if (keynum == 189 || keynum == 190 || keynum == 109 || keynum == 110) {
        this.$message.warning('禁止输入小数以及负数')
        e.target.value = ''
      }
    },
    handleKeyup(v) {
      console.log(v)
    }
  }
}
</script>
