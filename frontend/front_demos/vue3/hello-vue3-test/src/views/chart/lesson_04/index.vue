<template>
  <div class="outer">
    <div style="position: relative;">
      <h2>父组件</h2>
      <p class="spans">

        <p>xAxis.boundaryGap - 默认为 true，这时候刻度只是作为分隔线, 非类目轴不一样</p>
        <p>xAxis.type - 默认为 'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。</p>
        <p>xAxis.alignTicks - 在多个 x 轴为数值轴的时候，可以开启该配置项自动对齐刻度。只对'value'和'log'类型的轴有效。</p>
        <p>xAxis.show - 是否显示 x 轴。</p>
        <p>xAxis.nameLocation - 坐标轴名称显示位置</p>
        <p>xAxis.splitLine 坐标轴在 grid 区域中的分隔线。</p>
        <p>xAxis.axisLine 坐标轴轴线相关设置。</p>
        <p>...yAxis</p>
        <p>...yAxis</p>
        
      </p>
    </div>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeOpTitle"> changeOpTitle </button>&nbsp;&nbsp;
      </dd>
    </dl>

    <Child :chartConfig="chartConfig" />
  </div>
</template>  

<script lang="ts" setup>
import { reactive } from 'vue';
import Child from './child/child.vue'

let option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],

    "boundaryGap": true,
    "type": "category",

    // splitLine: {
    //   show: true,    // 是否显示分隔线。默认数值轴显示，类目轴不显示
    //   interval: '0',    // 坐标轴刻度标签的显示间隔，在类目轴中有效.0显示所有
    //   color: ['#ccc'],    // 分隔线颜色，可以设置成单个颜色，也可以设置成颜色数组，分隔线会按数组中颜色的顺序依次循环设置颜色
    //   width: 3,    // 分隔线线宽
    //   type: 'solid',     // 坐标轴线线的类型（'solid'，实线类型；'dashed'，虚线类型；'dotted',点状类型）
    // },

    // splitLine: {
    //   "show": false,
    //   "lineStyle": {
    //     "width": 1,
    //     "type": "solid",
    //     "color": " rgba(26, 26, 26, 0.08)"
    //   }
    // }
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      // type: 'line',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
let chartConfig = reactive(option)

const changeOpTitle = () => {
  // 都可以监听到
  // chartConfig.aName = '张三'
  // chartConfig.info = {
  //   age: 18
  // }
  chartConfig.title = {
    text: 'ECharts 标题__' + Math.floor(Math.random() * 1000)
  }
}

</script>

<style scoped>
.outer {
  background-color: #fff;
  border: 1px solid royalblue;
  border-radius: 4px;
  padding: 20px;
}

h2 {
  margin-bottom: 200px;
}

.spans {
  top: -65px;
  position: absolute;
  left: 100px;
}

.spans span {
  display: inline-block;
  margin: 10px;
}
</style>