<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <input type="text" v-model="newData" style="margin: 10px" />
    <br />
    <input type="text" v-model="newData2" style="margin: 10px" />
    <p>
      <b>user:&nbsp;&nbsp;</b>
      <span>{{ user }}</span>
    </p>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeDataVal"> 改变dataVal</button>&nbsp;&nbsp;
        <button @click="changeData"> 改变user</button>&nbsp;&nbsp;
      </dd>
    </dl>
    <Inner v-model:child-age="childUser.age" />
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import Inner from '../inner/inner.vue'

// const props = defineProps({
//   data: String,
//   dataTest: String,
//   user: Object
// })

interface dataType {
  name: string
  age: number
  child: any
}

const props = defineProps<{
  data: string
  dataTest: string
  user: dataType
}>()

// const emit = defineEmits(['update:data'])
// const newData = useVModel(props, 'data', emit)

const newData = useVModel(props, 'data')
const newData2 = useVModel(props, 'dataTest')



// const user = useVModel(props, 'user') as Ref
const user = useVModel(props, 'user')

const changeDataVal = () => {
  // console.log()
  newData.value = 'hahah'
}

const changeData = () => {
  user.value.name = '李四'  // todo 飘红报错
}


const childUser = user.value.child
console.log(childUser.age)

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>