<template>
  <div class="outer">
    <div style="position: relative;">
      <h2>父组件</h2>
      <span style="position: absolute; top: 10px; left:100px;">yAxis.alignTicks; </span>
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

    // splitLine: {
    //   show: true,    // 是否显示分隔线。默认数值轴显示，类目轴不显示
    //   interval: '0',    // 坐标轴刻度标签的显示间隔，在类目轴中有效.0显示所有
    //   color: ['#ccc'],    // 分隔线颜色，可以设置成单个颜色，也可以设置成颜色数组，分隔线会按数组中颜色的顺序依次循环设置颜色
    //   width: 3,    // 分隔线线宽
    //   type: 'solid',     // 坐标轴线线的类型（'solid'，实线类型；'dashed'，虚线类型；'dotted',点状类型）
    // },

    splitLine: {
      // "show": true,
      "show": false,
      "lineStyle": {
        "width": 1,
        "type": "solid",
        "color": " rgba(26, 26, 26, 0.08)"
      }
    }


  },
  yAxis: [
    // {
    //   type: 'value',
    //   min: 0,
    //   max: 100,
    // }, {
    //   type: 'value',
    //   min: 0,
    //   max: 200,
    // }

    // {
    //   type: 'value',
    //   min: 0,
    //   max: 100,
    //   alignTicks: true,
    // }, {
    //   type: 'value',
    //   min: 0,
    //   max: 200,
    //   alignTicks: true,
    // }

    {
      type: 'value',
      min: 0,
      max: 100,
      alignTicks: true,
    }, {
      type: 'value',
      min: 0,
      max: 300,
      alignTicks: true,
    }

  ],
  series: [
    {
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: '销量2',
      type: 'line',
      data: [60, 40, 46, 20, 20, 30]
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
</style>