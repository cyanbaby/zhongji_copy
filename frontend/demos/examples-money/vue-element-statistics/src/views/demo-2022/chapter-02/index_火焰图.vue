<template>
  <div class="app-container">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="barCharts" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import { data } from '../data.js'

// const numbers = [...Array(49)].map((x, i) => i + 1)

export default {
  name: 'Demo01',
  data() {
    return {
      myChart: null,
      chartOption: {
        grid: {
          show: true,
          top: 8,
          bottom: 20,
          left: 25,
          right: 20
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: data.map((e) => e.time),
          axisLabel: {
            interval: 0 // 使x轴文字显示全
          }
        },
        yAxis: {
          type: 'value',
          interval: 1, // 步长
          min: 1, // 起始
          max: 49 // 终止
        },
        series: [
          {
            data: data.map((e) => Number(e.number)),
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: 'red'
                  },
                  {
                    offset: 1,
                    color: 'Orange'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
      // numbers,
      // data
    }
  },
  mounted() {
    this.initApp()
    window.addEventListener('resize', this.resizeEcharts)
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
      this.myChart = myChart
      // 绘制图表
      myChart.setOption(this.chartOption)
    },
    resizeEcharts() {
      this.myChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
