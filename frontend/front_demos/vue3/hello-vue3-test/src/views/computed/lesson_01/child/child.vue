<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <dl>
      <dt>非响应式数据 源:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>user:&nbsp;&nbsp;</b>
          <span>{{ user }}</span>
        </p>

      </dd>
    </dl>

    <dl>
      <dt>计算属性数据:&nbsp;&nbsp;</dt>
      <dd>


        <p>
          <b>user:&nbsp;&nbsp;</b>
          <span>{{ user }}</span>
        </p>



        <p>
          <b>childUser_object:&nbsp;&nbsp;</b>
          <span>{{ childUser_object }}</span>
        </p>

        <p>
          <b>childUser_object.name:&nbsp;&nbsp;</b>
          <span>{{ childUser_object.name }}</span>
        </p>


        <p>
          <b>childUser_prop:&nbsp;&nbsp;</b>
          <span>{{ childUser_prop }}</span>
        </p>

        <p>
          <b>childUser_prop.name:&nbsp;&nbsp;</b>
          <span>{{ childUser_prop.name }}</span>
        </p>
        
      </dd>
    </dl>


    <dl>
      <dt>props updateTextRef:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>updateTextRef:&nbsp;&nbsp;</b>
          <span>{{ updateTextRef }}</span>
        </p>

      </dd>
    </dl>


    <!-- <Inner/> -->
  </div>
</template>

<script lang="ts" setup>
// import Inner from '../inner/inner.vue'

import { computed } from 'vue'

// 声明 props
const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  },
  updateTextRef: {
    type: Number,
    default: 0
  }
})

const childUser_object = computed(() => {
  return props.user
})

const childUser_prop = computed(() => {
  return {
    'name': props.user.name,
    'age': props.user.age
  }
})


setTimeout(() => {
  console.group('5秒之后')
  console.log('childUser_object =>', childUser_object)
  console.log('props.user =>', props.user)
  console.log('childUser_prop =>', childUser_prop)
  console.log('childUser_prop.value.name =>', childUser_prop.value.name)
  console.log('props.user.name =>', props.user.name)
  console.groupEnd()
}, 5000)

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>