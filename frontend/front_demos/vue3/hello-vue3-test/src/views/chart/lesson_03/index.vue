<template>
  <div class="outer">
    <h2>父组件</h2>
    <!-- <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>chartConfig:&nbsp;&nbsp;</b>
          <p>{{ chartConfig }}</p>
        </p>
      </dd>
    </dl>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeChartData"> 切换数据</button>&nbsp;&nbsp;
      </dd>
    </dl> -->

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeCfgTitleAndSeries"> changeCfgTitleAndSeries </button>&nbsp;&nbsp;
        <br>
        <br>

        <button @click="changeCfgColor"> changeCfgColor </button>&nbsp;&nbsp;
        <button @click="changeCfgTitle"> changeCfgTitle </button>&nbsp;&nbsp;
        <button @click="changeCfgSeries"> changeCfgSeries </button>&nbsp;&nbsp;
        <button @click="changeCfgXAxis"> changeCfgXAxis </button>&nbsp;&nbsp;

        <br>
        <br>

        <button @click="getOption"> getOption </button>&nbsp;&nbsp;
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
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},

  // 在系列中写数据
  xAxis: {
    type: 'category',
    data: ['拿铁', '奶茶', '奶酪', '蛋糕']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: '2015',
      data: [10, 20, 30, 40]
    },
    {
      type: 'bar',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9]
    },
    {
      type: 'bar',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1]
    }
  ]

  // 只保留一个series
  // xAxis: {
  //   type: 'category',
  //   data: ['拿铁', '奶茶', '奶酪', '蛋糕']
  // },
  // yAxis: {},
  // series: [
  //   {
  //     type: 'bar',
  //     name: '2015',
  //     data: [10, 20, 30, 40]
  //   },
  //   // {
  //   //   type: 'bar',
  //   //   name: '2016',
  //   //   data: [95.8, 89.4, 91.2, 76.9]
  //   // },
  //   // {
  //   //   type: 'bar',
  //   //   name: '2017',
  //   //   data: [97.7, 83.1, 92.5, 78.1]
  //   // }
  // ]

}

let chartConfig = reactive(option)




const changeCfgColor = () => {
  chartConfig.color = _.shuffle(['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'])
}

const changeCfgTitle = () => {
  // chartConfig.title = {
  //   text: 'ECharts 标题__'+Math.floor(Math.random()*1000)
  // }
  chartConfig.title.text = 'ECharts 标题__' + Math.floor(Math.random() * 1000)
}


// 这里是按[item] 顺序，锁定修改不影响其他的数据 = =
// const changeCfgSeries = () => {
//   chartConfig.series = [
//     {},{},
//     {
//       // name: '销量__' + Math.floor(Math.random() * 1000),
//       name: '蛋糕',
//       type: 'bar',
//       data: [
//         20, // Math.random() * 5, 
//         40, // Math.random() * 20, 
//         60, // Math.random() * 36, 
//         80, // Math.random() * 10, 
//         100, // Math.random() * 10, 
//         100, // Math.random() * 20
//       ]
//     }
//   ]
// }
const changeCfgSeries = () => {
  // chartConfig.xAxis = [{
  //   type: 'category',
  //   data: ['拿铁', '奶茶', '奶酪', '蛋糕']
  // }]
  // chartConfig.yAxis = [{}]
  // chartConfig.series = [
  //   {
  //     type: 'bar',
  //     name: '2015',
  //     data: [10, 20, 30, 40],
  //   }
  // ]
  const chart = child.value.getChart()
  console.log(chart.getOption())
}


const changeCfgXAxis = () => {
  chartConfig.xAxis = {
    data: ['衬衫_' + Math.floor(Math.random() * 20), '羊毛衫_' + Math.floor(Math.random() * 20), '雪纺衫_' + Math.floor(Math.random() * 20), '裤子_' + Math.floor(Math.random() * 20), '高跟鞋_' + Math.floor(Math.random() * 20), '袜子_' + Math.floor(Math.random() * 20)]
  }
}



const changeCfgTitleAndSeries = () => {
  // 都可以监听到
  // chartConfig.aName = '张三'
  // chartConfig.info = {
  //   age: 18
  // }

  chartConfig.title = {
    text: 'ECharts 标题__' + Math.floor(Math.random() * 1000)
  }

  chartConfig.series = [
    {
      name: '销量__' + Math.floor(Math.random() * 1000),
      type: 'bar',
      data: [Math.random() * 5, Math.random() * 20, Math.random() * 36, Math.random() * 10, Math.random() * 10, Math.random() * 20]
    }
  ]

}

const child = ref()

const getOption = () => {
  // console.log()
  // console.log(child.value.zhang)
  // console.log(child.value.echart)
  // console.log()

  const chart = child.value.getChart()
  console.log(chart.getOption())
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