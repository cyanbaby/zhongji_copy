<template>
  <div class="middle">
    <h3> Child 子组件</h3>

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
  chart.setOption(props.chartConfig)
})


debouncedWatch(props.chartConfig, (newValue, oldValue) => {
  
  chart.setOption(newValue)  
})


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