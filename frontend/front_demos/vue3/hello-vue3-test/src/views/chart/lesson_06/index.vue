<template>
  <div class="outer">
    <div style="position: relative;">
      <h2>父组件</h2>
      <p class="spans">
        
        <span>yAxis.nameLocation - 坐标轴名称显示位置</span>
        <span>yAxis.axisLine - 坐标轴轴线相关设置</span>
        <span>yAxis.axisTick - y轴刻度</span>
        <span>yAxis.splitLine - y轴网格线(平行x轴)</span>
        <span>yAxis.splitArea - 隔行换色</span>
        <span>yAxis.name - y轴名称</span>
        <span>yAxis.nameGap - 坐标轴名称与轴线之间的距离</span>
        <span>yAxis.nameTextStyle - 坐标轴名称的文字样式</span>
        <span>yAxis.axisLabel - 坐标轴刻度标签的相关设置</span>
        <span>yAxis.axisPointer - 坐标轴指示器配置项 hover出现刻度横线</span>


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
import { stubTrue } from 'lodash';
import { reactive } from 'vue';
import Child from './child/child.vue'

let option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],


    splitLine: {
      "show": false,
      "lineStyle": {
        "width": 1,
        "type": "solid",
        "color": " rgba(26, 26, 26, 0.08)"
      }
    }


  },
  yAxis: {
    show: true, // show: false
    nameLocation: 'end',  // start
    type: 'value',
    "axisLine": {
      "show": true,
      "lineStyle": {
        // "color": " rgba(26, 26, 26, 0.08)"
        "color": " rgba(26, 26, 26, 0.2)"
      }
    },
    "axisTick": {
      "show": true
      // "show": false  // 默认?
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "width": 1,
        "type": "solid",
        "color": " rgba(26, 26, 26, 0.08)"
        // "color": "royalblue"
      }
    },

    "splitArea": {
      "show": true,
      "areaStyle": {
        // "color": ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']

        // TODO onein-ui 输出的配置不太对
        // "color": [
        //   {
        //     "colorStops": [],
        //     "x": {
        //       "type": "linear",
        //       "x": 1,
        //       "y": 1,
        //       "x2": 1,
        //       "y2": 0,
        //       "colorStops": [
        //         {
        //           "offset": 0,
        //           "color": "#FFFFFF"
        //         },
        //         {
        //           "offset": 1,
        //           "color": "#FFFFFF"
        //         }
        //       ]
        //     },
        //     "y": 0,
        //     "x2": 1,
        //     "y2": 0,
        //     "type": "linear",
        //     "global": false
        //   },
        //   {
        //     "colorStops": [],
        //     "x": {
        //       "type": "linear",
        //       "x": 1,
        //       "y": 1,
        //       "x2": 1,
        //       "y2": 0,
        //       "colorStops": [
        //         {
        //           "offset": 0,
        //           "color": "#FFFFFF"
        //         },
        //         {
        //           "offset": 1,
        //           "color": "#FFFFFF"
        //         }
        //       ]
        //     },
        //     "y": 0,
        //     "x2": 1,
        //     "y2": 0,
        //     "type": "linear",
        //     "global": false
        //   }
        // ]
      }
    },

    name: '我是Y轴',
    nameGap: 30,
    "nameTextStyle": {
      "fontFamily": "PingFang SC",
      "fontSize": 14,
      "fontWeight": "400",
      "textAlign": "right",
      "lineHeight": 1,
      "color": " #1A1A1A"
    },
    "axisLabel": {
      "fontFamily": "PingFang SC",
      "fontSize": 12,
      "fontWeight": "400",
      "textAlign": "right",
      "lineHeight": 1,
      "color": " rgba(26, 26, 26, 0.6)",
      "margin": 20,
      "rotate": 0
    },
    "axisPointer": {
      "show": stubTrue,
      "type": "line"
      // "type": "shadow"
      // "type": "none"

    }
  },
  series: [
    {
      name: '销量',
      type: 'line',
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