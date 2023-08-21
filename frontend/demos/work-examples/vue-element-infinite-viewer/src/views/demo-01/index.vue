<template>
  <div class="app-container">
    <VueInfiniteViewer class="viewer">
      <div class="viewport">AA</div>
    </VueInfiniteViewer>
  </div>
</template>

<script>
import { VueInfiniteViewer } from "vue-infinite-viewer";

export default {
  name: 'Demo01',
  components: {
    VueInfiniteViewer
  },
  data() {
    return {
      barChartOption: {
        xAxis: {
          type: 'category',
          data: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  },
  mounted() {
    // this.initApp()
  },
  methods: {
    initApp() {
      this.drawCharts()
    },
    drawCharts() {
      this.drawBarChart()
    },
    drawBarChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('barCharts')) // 也可以通过$refs.barCharts的方式去获取到dom实例。
      // 绘制图表
      myChart.setOption(this.barChartOption)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;

  width: 800px;
  height: 800px;
  position: relative;
}

.viewer {
  border: 1px solid black;
  position: relative;
  width: 800px;
  height: 800px;
}
.viewport {
  position: relative;
  width: 400px;
  height: 600px;
  background: #f55;
}
</style>
