<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>
        <p>
          <b>props.student.name:&nbsp;&nbsp;</b>
          <span>{{ props.student.name }}</span>
        </p>
        <p>
          <b>props.student.age:&nbsp;&nbsp;</b>
          <span>{{ props.student.age }}</span>
        </p>
        <p>
          <b>props.student.a:&nbsp;&nbsp;</b>
          <span>{{ props.student.a }}</span>
        </p>
        <p>
          <b>props.student.a.b:&nbsp;&nbsp;</b>
          <span>{{ props.student.a.b }}</span>
        </p>
        <p>
          <b>props.student.a.b.salary:&nbsp;&nbsp;</b>
          <span>{{ props.student.a.b.salary }}</span>
        </p>

      </dd>
    </dl>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, watch } from 'vue';
// 声明 props
const props = defineProps({
  student: {
    type: Object,
    default: ()=>({})
  }
})

// 无需deep，即可监听
// watch(props.student, (newValue, oldValue) => {
//   console.group('子组件 watch(props.student)')
//   // console.log(newValue)
//   // console.log(oldValue)
//   console.log('newValue: ', JSON.stringify(newValue))
//   console.log('oldValue: ', JSON.stringify(oldValue))
//   console.groupEnd()
// })

// 没有deep的话都监听不到，newValue和oldValue数据一致是另外一个问题。
watch(() => props.student, (newValue, oldValue) => {
  console.group('子组件 watch(watch(() => student))')
  // console.log(newValue)
  // console.log(oldValue)
  console.log('newValue: ', JSON.stringify(newValue))
  console.log('oldValue: ', JSON.stringify(oldValue))
  console.groupEnd()
}, { deep: true });

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>