<template>
  <div>
    <el-statistic
      @finish="hilarity"
      :value="deadline3"
      time-indices
      title="一寸光阴一寸金"
    >
      <template slot="suffix">
        <el-button type="primary " size="small"
          >add 10 second</el-button
        >
      </template>
    </el-statistic>
  </div>
</template>

<script>
import { Statistic } from 'element-ui'

console.log(Statistic)

export default {
  name: 'TestElementUiDemo01View',
  data() {
    return {
      deadline3: Date.now() + 1000 * 3
    }
  },
  methods: {
    hilarity() {
      this.$notify({
        title: '提示',
        message: '时间已到，你可知寸金难买寸光阴？',
        duration: 0
      })
    }
  }
}
</script>

<style></style>
