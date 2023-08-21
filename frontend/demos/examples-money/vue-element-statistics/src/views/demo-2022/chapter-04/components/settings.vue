<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">controllers</h3>
      <!-- <div class="drawer-item">
        <span>柱状图</span>
        <el-switch v-model="barChart" class="drawer-switch" @change="handleChangeBarChart"/>
      </div> -->

      <div class="drawer-item">
        <el-button type="primary" plain @click="handleClickCalcProbability">Calc Probability</el-button>
      </div>
      <pre>
        {{ mantissaProbability }}
      </pre>
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
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      barChart: false,
      mantissaProbability: {
        p0: 0,
        p1: 0,
        p2: 0,
        p3: 0,
        p4: 0,
        p5: 0,
        p6: 0,
        p7: 0,
        p8: 0,
        p9: 0
      }
    }
  },
  computed: {},
  methods: {
    handleChangeBarChart(val) {
      this.$emit('change-barchart', val)
    },
    handleClickCalcProbability() {
      console.log(this.chartData)
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
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }

  .job-link {
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
