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
  // https://blog.csdn.net/weixin_45536484/article/details/120041612
  tooltip: {
    show: true,    // 是否显示提示框组件
    trigger: 'axis',    // 触发类型（'item'，数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用；'axis'，坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用；'none'，不触发。）
  

    backgroundColor: 'rgba(50,50,50,0.7)',    // 提示框浮层的背景颜色
    textStyle: {
      color: '#FFF',     // 文字的颜色
      fontStyle: 'normal',    // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体） 
      fontWeight: 'normal',    // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
      fontSize: '20',    // 文字字体大小
      lineHeight: '50',    // 行高 
    },
    formatter: function (params) {
      var result = ''
      var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:30px;height:30px;background-color:#F1E67F"></span>'    // 定义第一个数据前的圆点颜色
      var dotHtml2 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:30px;height:30px;background-color:#2BA8F1"></span>'    // 定义第二个数据前的圆点颜色
      result += params[0].axisValue + "</br>" + dotHtml + ' 数据名称 ' + params[0].data + "</br>" + dotHtml2 + ' 数据名称 ' + params[1].data;
      return result
    }
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量111',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: '销量222',
      type: 'line',
      data: [15, 30, 46, 20, 20, 30]
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