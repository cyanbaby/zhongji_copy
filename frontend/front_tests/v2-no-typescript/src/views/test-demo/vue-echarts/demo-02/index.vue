<template>
  <v-chart class="chart" :option="option" />
</template>
<script>
import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart
} from 'echarts/charts'

import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  ToolboxComponent,
  DataZoomComponent
} from 'echarts/components'

import { CanvasRenderer } from 'echarts/renderers'

import VChart, { THEME_KEY } from 'vue-echarts'
import { use } from 'echarts'

use([
  // components
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  ToolboxComponent,
  DataZoomComponent,
  // charts
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,

  // TODO: cyan other
  CanvasRenderer
])

export default {
  name: 'TestVueEchartsDemo02View',
  components: {
    VChart
  },
  // 主题选择，可选dark主题
  provide: {
    [THEME_KEY]: ''
  },
  // 数据配置
  data() {
    return {
      option: {
        // 标题配置
        title: {
          text: 'Stacked Line'
        },
        // 提示框配置
        tooltip: {
          trigger: 'axis'
        },
        // 图例配置
        legend: {
          data: ['安检点1', '安检点2', '安检点3', '安检点4', '安检点5'],
          textStyle: {
            fontSize: 10
          }
        },
        // 网格配置
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // 工具栏配置
        toolbox: {
          show: false
        },
        // x轴配置
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2021.1', '2021.3', '2021.5', '2021.7', '2021.9']
        },
        // y轴配置
        yAxis: {
          type: 'value'
        },
        // 图表数据
        series: [
          {
            name: '安检点1',
            type: 'line',
            stack: 'Total',
            data: [120, 342, 101, 134, 340]
          },
          {
            name: '安检点2',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 451, 904, 290]
          },
          {
            name: '安检点3',
            type: 'line',
            stack: 'Total',
            data: [150, 362, 501, 454, 190]
          },
          {
            name: '安检点4',
            type: 'line',
            stack: 'Total',
            data: [320, 532, 601, 334, 790]
          },
          {
            name: '安检点5',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 290]
          }
        ]
      }
    }
  }
}
</script>
