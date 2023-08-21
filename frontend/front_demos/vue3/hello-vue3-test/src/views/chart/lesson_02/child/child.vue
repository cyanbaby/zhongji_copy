<template>
  <div class="middle">
    <h3> Child 子组件</h3>

    <!-- <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>chartConfig:&nbsp;&nbsp;</b>
        <p>{{ chartConfig }}</p>
        </p>
      </dd>
    </dl> -->

    <div id="main" ref="chartEl" style="width: 600px;height:400px;"></div>

    <!-- <Inner/> -->
  </div>
</template>

<script lang="ts" setup>
// import Inner from '../inner/inner.vue'
import * as echarts from 'echarts';
import _ from 'lodash'
import { ref, defineProps, onMounted, watch, defineExpose } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import { getPositionDataWithUnit } from 'element-plus';

const props = withDefaults(
  defineProps<{
    chartConfig?: any
  }>(),
  {
    chartConfig: () => {
      return {}
    }
  }
)

let zhang = ref('张三')

// 图表实例
let chartEl = ref<any>(null)
let chart = ref<any>(null);

onMounted(() => {
  chart = echarts.init(chartEl.value)

  // 绘制图表
  chart.setOption(props.chartConfig)
})
// todo 这里用watch 不太好，可能移除没事件， 可以用computed，先看看别人怎么用的
// watch(() => props.chartConfig, (newValue, oldValue) => {
//   console.group('子组件 watch props.chartConfig: ')
//   console.log('newValue', newValue)
//   console.log('oldValue', oldValue)
//   console.log(JSON.stringify(newValue))
//   console.groupEnd()

//   chart.setOption(newValue)
// }, { deep: true })


// debouncedWatch(() => props.chartConfig, (newValue, oldValue) => {
//   // console.group('子组件 watch props.chartConfig: ')
//   // console.log('newValue', newValue)
//   // console.log('oldValue', oldValue)
//   // console.log(JSON.stringify(newValue))
//   // console.groupEnd()

//   // chart.setOption(newValue)

//   // console.log(
//   chart.setOption({
//     title: newValue.title
//   })
//   chart.setOption({
//     series: newValue.series
//   })

// }, { deep: true })

const watchProps = [
  'color',
  'title.text',
  'title',
  'xAxis',
  'yAxis',
  'series'
]

debouncedWatch(watchProps.map(prop => () => _.get(props.chartConfig, prop)), (newValue, oldValue) => {
  
  let option = {}

  console.group('子组件 监听 props对象 的多个属性 数组[fn1, fn2..])')

  newValue.forEach((element, index) => {
    if (!_.isEqual(element, oldValue[index])) {
      _.set(option, watchProps[index], element)
    }
  })

  console.log(JSON.stringify(option))
  console.groupEnd()

  chart.setOption(option)

}, { deep: true});

// 合并一下在setOption ?
// function setMergeOption() {

// }

function getChart() {
  return chart
}

defineExpose({ chart, zhang, getChart })
</script>

<style scoped>
.middle {
  border: 1px solid #ecad9e;
  border-radius: 4px;
  padding: 20px;
}
</style>