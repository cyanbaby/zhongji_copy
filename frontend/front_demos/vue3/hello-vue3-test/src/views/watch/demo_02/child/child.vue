<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>count:&nbsp;&nbsp;</b>
          <span>{{ count }}</span>
        </p>
        <p>
          <b>num:&nbsp;&nbsp;</b>
          <span>{{ num }}</span>
        </p>
        <p>
          <b>other:&nbsp;&nbsp;</b>
          <span>{{ other }}</span>
        </p>
      </dd>
    </dl>
    <Inner />
  </div>
</template>

<script lang="ts" setup>
import Inner from '../inner/inner.vue'
import { defineProps, watch } from 'vue';
// 声明 props
const props = defineProps({
  count: {
    type: Number,
    default: 888
  },
  num: {
    type: Number,
    default: 888
  },
  other: {
    type: Number,
    default: 888
  }
})

// 这样直接监听不到变化
// watch(()=>props, (newValue, oldValue) => {
//   console.group('子组件 watch count: ')
//   console.log('newValue', JSON.stringify(newValue))
//   console.log('oldValue', JSON.stringify(oldValue))
//   console.groupEnd()
// }, { deep:true })





// 默认不会会执行一次， 加 ,{immediate:true}
// watch(() => props.count, (newValue, oldValue) => {
//   console.group('子组件 watch count: ')
//   console.log('newValue', newValue)
//   console.log('oldValue', oldValue)
//   console.groupEnd()
// }, { immediate: true })

// // 默认不会会执行一次， 加 ,{immediate:true}
// watch(() => props.num, (newValue, oldValue) => {
//   console.group('子组件 watch num: ')
//   console.log('newValue', newValue)
//   console.log('oldValue', oldValue)
//   console.groupEnd()
// }, { immediate: true })

// // 默认不会会执行一次， 加 ,{immediate:true}
// watch(() => props.other, (newValue, oldValue) => {
//   console.group('子组件 watch other: ')
//   console.log('newValue', newValue)
//   console.log('oldValue', oldValue)
//   console.groupEnd()
// }, { immediate: true })


// 合并监听
watch([() => props.count, () => props.num, () => props.other], (newValue, oldValue) => {
  console.group('子组件 watch [() => props.count, () => props.num, () => props.other]: ')
  console.log('newValue', newValue)
  console.log('oldValue', oldValue)
  console.groupEnd()
}, { immediate: true })

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>