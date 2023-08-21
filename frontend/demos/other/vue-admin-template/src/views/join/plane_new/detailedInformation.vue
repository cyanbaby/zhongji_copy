<template>
    <d2-container>
        <template slot="header">
            <span class="page-title">【岗位编码】【岗位名称】详细统计</span>
            <el-button size="mini" style="float:right;" @click="backBtn">返回</el-button>
        </template>

    </d2-container>
</template>
<script>
/* eslint-disable */ 

import * as echarts from 'echarts'
export default {
  data () {
    return {
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    // 返回按钮
    backBtn () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
