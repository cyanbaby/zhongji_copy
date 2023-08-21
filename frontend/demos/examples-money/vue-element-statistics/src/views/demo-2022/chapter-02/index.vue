<template>
  <div class="app-container">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="barCharts" style="width: 100%; height: 100%"></div>
    <!-- <right-panel v-if="showSettings">
      <view-settings @change-barchart="handleChangeBarChart" />
    </right-panel> -->
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import RightPanel from '@/components/RightPanel'
import ViewSettings from './components/settings.vue'
import { data } from '../data.js'

// const fff24 = [...Array(24)].map((e) => '#FFF')
const ccc24 = [...Array(24)].map((e) => '#CCC')

// 中 medium
// 大中小 Large, medium and small
// 单中双 Odd, Medium and Even

const _data = data.map((element) => {
  if (Number(element.number) === 25) {
    // Medium
    element.oddAndMediumAndEven = 49
  } else {
    if (Number(element.number) % 2 === 0) {
    // Even
      element.oddAndMediumAndEven = 100
    } else {
    // Odd
      element.oddAndMediumAndEven = 2
    }
  }
  return element
})

// console.log('_data', _data)

export default {
  name: 'Demo01',
  components: {
    RightPanel,
    ViewSettings
  },
  data() {
    return {
      myChart: null,
      chartOption: {
        grid: {
          show: true,
          top: 8,
          // bottom: 20,
          bottom: 70,
          left: 55,
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
          data: _data.map((e) => e.time),
          axisLabel: {
            interval: 0, // 使x轴文字显示全
            rotate: 60
          }
        },
        yAxis: {
          type: 'value',
          interval: 1, // 步长
          min: 1, // 起始
          max: 100, // 终止

          data: Array.from({ length: 100 }, (_, index) => index + 1),
          splitLine: {
            // 网格样式
            show: true,
            lineStyle: {
              color: [
                ...Array.from({ length: 48 }, (_, index) => index + 1).map(
                  (e) => '#FFF'
                ),
                'red',
                ...Array.from({ length: 51 }, (_, index) => index + 1).map(
                  (e) => '#FFF'
                )
              ],
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            formatter(value) {
              let label = ''
              switch (value) {
                case 2:
                  label = 'o'
                  break
                case 49:
                  label = 'm'
                  break
                case 100:
                  label = 'e'
                  break
              }
              return label
            }
          }
        },
        series: [
          {
            data: _data.map((e) => e.oddAndMediumAndEven),
            type: 'line'
          }
        ]
      },
      chartOptionCopy: null
      // numbers,
      // data
    }
  },
  computed: {
    ...mapState({
      showSettings: (state) => state.settings.showSettings
    })
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
      this.drawChart()
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('barCharts')) // 也可以通过$refs.barCharts的方式去获取到dom实例。
      this.myChart = myChart
      // 绘制图表
      myChart.setOption(this.chartOption)
    },
    resizeEcharts() {
      this.myChart.resize()
    },
    handleChangeBarChart(val) {
      if (val) {
        this.drawBarChart()
      } else {
        this.drawLineChart()
      }
    },
    drawBarChart() {
      // 备份折线图
      this.chartOptionCopy = _.cloneDeep(this.chartOption)

      // 销毁图表
      this.myChart.dispose()

      // 绘制图表
      this.myChart = this.$echarts.init(document.getElementById('barCharts'))

      this.myChart.on('finished', _ => {
        console.log(113, 'finished')
      })

      const odd = _data.filter(e => e.oddAndMediumAndEven === 2).length
      const medium = _data.filter(e => e.oddAndMediumAndEven === 49).length
      const even = _data.filter(e => e.oddAndMediumAndEven === 100).length
      this.chartOption = {
        grid: {
          show: true,
          top: 8,
          // bottom: 20,
          bottom: 70,
          left: 55,
          right: 20
        },
        xAxis: {
          type: 'category',
          data: ['odd', 'medium', 'even']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [odd, medium, even],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
      this.myChart.setOption(this.chartOption)
    },
    drawLineChart() {
      this.myChart.setOption(this.chartOptionCopy)
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
