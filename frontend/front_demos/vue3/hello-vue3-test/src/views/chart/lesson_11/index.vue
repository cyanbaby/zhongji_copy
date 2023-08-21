<template>
  <div class="outer root-copy">
    <h3> Index 根组件</h3>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="resetOption"> getOption后覆盖 </button>&nbsp;&nbsp;
        <button @click="addData"> 新增dataset数据 </button>&nbsp;&nbsp;
        <button @click="chartConfig.dataset.source.splice(-1)"> 减少dataset数据 </button>&nbsp;&nbsp;
      </dd>
    </dl>

    <Child :chartConfig="chartConfig" ref="child" />
  </div>
</template>  

<script lang="ts" setup>
import _ from 'lodash'
import { reactive, ref } from 'vue';
import Child from './child/child.vue'


let option = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      [ "班级",  "语文","数学","英语" ],
      [ "1班",   34,     67,   74 ],
      [ "2班",   54,     32,   65 ],
      [ "3班",   23,     54,   34 ],
      [ "4班",   64,     23,   76 ]
    ]
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: 'category' },
  // 声明一个 Y 轴，数值轴。
  yAxis: {},
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
}

let chartConfig = reactive(option)

const child = ref()

const getOption = () => {
  const chart = child.value.getChart()
  return chart.getOption()
}

const resetOption = () => {
  var option = getOption()

  if( option.series[0].type === 'line') {
    option.series[0].type = 'bar'
  } else {
    option.series[0].type = 'line'
  }

  chartConfig.series = option.series
}

const addData = () => {
  const [ lastBAN ] = chartConfig.dataset.source.slice(chartConfig.dataset.source.length - 1)
  const newBAN = lastBAN.map(item => {
    if(typeof item === 'string') {
      return item.replace(/([0-9])*/, match =>  ((match - 0)+1))
    }
    return item+5
  })
  chartConfig.dataset.source.push(newBAN)

  console.log(getOption())
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