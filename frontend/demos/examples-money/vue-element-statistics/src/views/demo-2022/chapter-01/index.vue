<template>
  <div class="app-container">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="barCharts" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import { data } from '../data.js'
console.log(data)

const fff24 = [...Array(24)].map((e) => '#FFF')
const ccc24 = [...Array(24)].map((e) => '#CCC')

export default {
  name: 'Demo01',
  data() {
    return {
      myChart: null,
      chartOption: {
        grid: {
          show: true,
          top: 8,
          // bottom: 20,
          bottom: 70,
          left: 25,
          right: 20
        },
        tooltip: {
          trigger: 'axis'
        },
        // dataZoom: [
        //   {
        //     startValue: '2022-01-04'
        //   },
        //   {
        //     type: 'inside'
        //   }
        // ],
        xAxis: {
          type: 'category',
          data: data.map((e) => e.time),
          axisLabel: {
            interval: 0, // 使x轴文字显示全
            rotate : 60
          }
        },
        yAxis: {
          type: 'value',
          interval: 1, // 步长
          min: 1, // 起始
          max: 49, // 终止
          splitLine: {
            // 网格样式
            show: true,
            lineStyle: {
              color: [...ccc24, 'red', ...ccc24],
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [
          {
            data: data.map((e) => Number(e.number)),
            type: 'line'
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
