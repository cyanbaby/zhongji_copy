<template>
  <div class="demo-container">
    <el-card class="box-card" style="width: 50%">
      <div slot="header" class="clearfix">
        <span>管理端</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动形式">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div>
      <el-divider />
    </div>
    <el-card class="box-card" style="width: 50%">
      <div slot="header" class="clearfix">
        <span>用户端</span>
      </div>
      <div class="common-tip">
        <div v-html="tipStr" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        desc: ''
      },
      tipStr: ''
    }
  },
  methods: {
    onSubmit() {
      this.tipStr = this.form.desc
    }
  }
}
</script>
