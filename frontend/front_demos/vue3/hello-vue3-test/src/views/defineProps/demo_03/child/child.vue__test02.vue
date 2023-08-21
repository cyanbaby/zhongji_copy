<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    测试01 progressBarConfig.progress.progressColorKey 能否通过 progress 快捷方式修改，并保持响应<br />
    测试02 progressBarConfig.progress = {} 是否会保持响应?
    <dl style="position: relative;">
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>progressBarConfig:&nbsp;&nbsp;</b>
        <pre>{{ progressBarConfig }}</pre>
        </p>
        <div style="position: absolute; width: 350px; top: -15px;right: 0;">
          <dl>
            <dt>操作:&nbsp;&nbsp;</dt>
            <dd>
              <button @click="handleTest">测试</button>&nbsp;&nbsp;
              <button @click="handleTest01">测试1</button>&nbsp;&nbsp;
              <button @click="handleTest02">测试2</button>&nbsp;&nbsp;
            </dd>
          </dl>
        </div>
      </dd>
    </dl>
    <!-- <Inner /> -->
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import Inner from '../inner/inner.vue'

const props = defineProps({
  modelValue: Object
})

// const emit = defineEmits(['update:data'])
// const newData = useVModel(props, 'data', emit)

// const progressBarConfig = useVModel(props, 'modelValue')
const progressBarConfig = props.modelValue
// console.log(progressBarConfig.isShowStatusIcon)  // false
// console.log(progressBarConfig.progress)
// console.log(JSON.stringify(progressBarConfig.progress))



const progress = progressBarConfig.progress

const handleTest = () => {
  progressBarConfig.isShowStatusIcon = !progressBarConfig.isShowStatusIcon
}
// todo 把父组件数据放到一个子组件里去显示
const handleTest01 = () => {
  progress.progressColorKey = 'progressMultiColor__' + Math.floor(Math.random() * 20)
}
let state = true
const handleTest02 = () => {
  if (state) {
    progressBarConfig.progress = {}
    state = false
  } else {
    progressBarConfig.progress = {
      name: '张三',
      age: 18
    }
    state = true
  }
}
</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>