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
import { ref, defineProps, onMounted, watch } from 'vue'

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

// 图表实例
let chartEl = ref<any>(null)
let chart: any;

onMounted(() => {
  chart = echarts.init(chartEl.value)

  // 绘制图表
  chart.setOption(props.chartConfig)
})
// todo 这里用watch 不太好，可能移除没事件， 可以用computed，先看看别人怎么用的
watch(() => props.chartConfig, (newValue, oldValue) => {
  console.group('子组件 watch props.chartConfig: ')
  console.log('newValue', newValue)
  console.log('oldValue', oldValue)
  console.log(JSON.stringify(newValue))
  console.groupEnd()

  chart.setOption(newValue)
}, { deep: true })

</script>

<style scoped>
.middle {
  border: 1px solid #ecad9e;
  border-radius: 4px;
  padding: 20px;
}
</style>