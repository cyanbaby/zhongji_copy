<template>
  <div class="outer root-copy">
    <h2>Index 根组件</h2>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeStripfigure"> 切换条状图 </button>&nbsp;&nbsp;
        <br>
        <br>
      </dd>
    </dl>

    <Child :chartConfig="chartConfig" ref="child" />
  </div>
</template>  

<script lang="ts" setup>
import _ from 'lodash'
import { reactive, ref } from 'vue';
import Child from './child/child.vue'
import option from './option.js'

// 复制柱状图数据 加上： "trigger": "axis",即可

let chartConfig = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  label: {
    show: true,
    // position: 
    //  align: 'center'  // 'left'   'center'   'right'

    // verticalAlign: 'middle',   // 'top'  'middle'  'bottom'


    // top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight

    // position: 'left'
    // position: 'right'
    
    // position: 'top'  
    position: 'insideTop'  

  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'bar'
    }
  ]
})

const child = ref()

const getOption = () => {
  const chart = child.value.getChart()
  return chart.getOption()
}

const changeStripfigure = () => {
  const option = getOption()

  // console.log(option)

  const yAxis_temp = option.yAxis
  const xAxis_temp = option.xAxis
  const series = option.series.map((item: any) => {
    if (option.xAxis[0].type === "category") { // 柱状图 转 条状图
      console.log(item)
      item.label.position = 'right'
    } else {
      item.label.position = 'top'
    }
    return item
  })

  console.log(series)

  chartConfig.yAxis = xAxis_temp
  chartConfig.xAxis = yAxis_temp
  chartConfig.series = series
}

</script>

<style>
.root-copy {
  --sash-size: 4px;
}

.root-copy {
  --el-popup-modal-bg-color: var(--el-color-black);
  --el-popup-modal-opacity: 0.5;
}

.root-copy {
  color-scheme: light;
  --el-color-white: #ffffff;
  --el-color-black: #000000;
  --el-color-primary: #409eff;
  --el-color-primary-rgb: 64, 158, 255;
  --el-color-success-rgb: 103, 194, 58;
  --el-color-warning-rgb: 230, 162, 60;
  --el-color-danger-rgb: 245, 108, 108;
  --el-color-error-rgb: 245, 108, 108;
  --el-color-info-rgb: 144, 147, 153;
  --el-color-primary-light-1: #53a8ff;
  --el-color-primary-light-2: #66b1ff;
  --el-color-primary-light-3: #79bbff;
  --el-color-primary-light-4: #8cc5ff;
  --el-color-primary-light-5: #a0cfff;
  --el-color-primary-light-6: #b3d8ff;
  --el-color-primary-light-7: #c6e2ff;
  --el-color-primary-light-8: #d9ecff;
  --el-color-primary-light-9: #ecf5ff;
  --el-color-primary-dark-2: #337ecc;
  --el-color-success: #67c23a;
  --el-color-success-light-3: #95d475;
  --el-color-success-light-5: #b3e19d;
  --el-color-success-light-7: #d1edc4;
  --el-color-success-light-8: #e1f3d8;
  --el-color-success-light-9: #f0f9eb;
  --el-color-success-dark-2: #529b2e;
  --el-color-warning: #e6a23c;
  --el-color-warning-light-3: #eebe77;
  --el-color-warning-light-5: #f3d19e;
  --el-color-warning-light-7: #f8e3c5;
  --el-color-warning-light-8: #faecd8;
  --el-color-warning-light-9: #fdf6ec;
  --el-color-warning-dark-2: #b88230;
  --el-color-danger: #f56c6c;
  --el-color-danger-light-3: #f89898;
  --el-color-danger-light-5: #fab6b6;
  --el-color-danger-light-7: #fcd3d3;
  --el-color-danger-light-8: #fde2e2;
  --el-color-danger-light-9: #fef0f0;
  --el-color-danger-dark-2: #c45656;
  --el-color-error: #f56c6c;
  --el-color-error-light-3: #f89898;
  --el-color-error-light-5: #fab6b6;
  --el-color-error-light-7: #fcd3d3;
  --el-color-error-light-8: #fde2e2;
  --el-color-error-light-9: #fef0f0;
  --el-color-error-dark-2: #c45656;
  --el-color-info: #909399;
  --el-color-info-light-3: #b1b3b8;
  --el-color-info-light-5: #c8c9cc;
  --el-color-info-light-7: #dedfe0;
  --el-color-info-light-8: #e9e9eb;
  --el-color-info-light-9: #f4f4f5;
  --el-color-info-dark-2: #73767a;
  --el-bg-color: #ffffff;
  --el-bg-color-page: #ffffff;
  --el-bg-color-overlay: #ffffff;
  --el-text-color-primary: #303133;
  --el-text-color-regular: #606266;
  --el-text-color-secondary: #909399;
  --el-text-color-placeholder: #a8abb2;
  --el-text-color-disabled: #c0c4cc;
  --el-border-color: #dcdfe6;
  --el-border-color-light: #e4e7ed;
  --el-border-color-lighter: #ebeef5;
  --el-border-color-extra-light: #f2f6fc;
  --el-border-color-dark: #d4d7de;
  --el-border-color-darker: #cdd0d6;
  --el-fill-color: #f0f2f5;
  --el-fill-color-light: #f5f7fa;
  --el-fill-color-lighter: #fafafa;
  --el-fill-color-extra-light: #fafcff;
  --el-fill-color-dark: #ebedf0;
  --el-fill-color-darker: #e6e8eb;
  --el-fill-color-blank: #ffffff;
  --el-border-radius-base: 4px;
  --el-border-radius-small: 2px;
  --el-border-radius-round: 20px;
  --el-border-radius-circle: 100%;
  --el-font-size-extra-large: 20px;
  --el-font-size-large: 18px;
  --el-font-size-medium: 16px;
  --el-font-size-base: 14px;
  --el-font-size-small: 13px;
  --el-font-size-extra-small: 12px;
  --el-font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5fae\8f6f\96c5\9ed1", Arial, sans-serif;
  --el-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
  --el-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, .12);
  --el-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, .12);
  --el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16);
  --el-disabled-bg-color: var(--el-fill-color-light);
  --el-disabled-text-color: var(--el-text-color-placeholder);
  --el-disabled-border-color: var(--el-border-color-light);
  --el-index-normal: 1;
  --el-index-top: 1000;
  --el-index-popper: 2000;
  --el-overlay-color: rgba(0, 0, 0, .8);
  --el-overlay-color-light: rgba(0, 0, 0, .7);
  --el-overlay-color-lighter: rgba(0, 0, 0, .5);
  --el-mask-color: rgba(255, 255, 255, .9);
  --el-mask-color-extra-light: rgba(255, 255, 255, .3);
  --el-border-width: 1px;
  --el-border-style: solid;
  --el-border-color-hover: var(--el-text-color-disabled);
  --el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
  --el-svg-monochrome-grey: var(--el-border-color);
  --el-font-weight-primary: 500;
  --el-font-line-height-primary: 24px;
  --el-transition-duration: .3s;
  --el-transition-duration-fast: .2s;
  --el-transition-function-ease-in-out-bezier: cubic-bezier(.645, .045, .355, 1);
  --el-transition-function-fast-bezier: cubic-bezier(.23, 1, .32, 1);
  --el-transition-all: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
  --el-transition-fade: opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
  --el-transition-md-fade: transform var(--el-transition-duration) var(--el-transition-function-fast-bezier), opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
  --el-transition-fade-linear: opacity var(--el-transition-duration-fast) linear;
  --el-transition-border: border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
  --el-transition-box-shadow: box-shadow var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
  --el-transition-color: color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
}
</style>

<style scoped>
.outer {
  background-color: #fff;
  border: 1px solid royalblue;
  border-radius: 4px;
  padding: 20px;
}
</style>