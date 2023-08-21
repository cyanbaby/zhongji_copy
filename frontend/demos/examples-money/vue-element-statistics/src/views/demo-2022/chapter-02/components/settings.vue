<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">当前计算</h3>
      <div class="drawer-item">
        <span>柱状图</span>
        <el-switch v-model="barChart" class="drawer-switch" @change="handleChangeBarChart"/>
      </div>
      <!--
      <a href="https://panjiachen.github.io/vue-element-admin-site/zh/job/" target="_blank" class="job-link">
        <el-alert
          title="部门目前非常缺人！有兴趣的可以点击了解详情。坐标: 字节跳动"
          type="success"
          :closable="false"
        />
      </a> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'ViewSettings',
  data() {
    return {
      barChart: false
    }
  },
  computed: {
  },
  methods: {
    handleChangeBarChart(val) {
      this.$emit('change-barchart', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }

  .job-link{
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
