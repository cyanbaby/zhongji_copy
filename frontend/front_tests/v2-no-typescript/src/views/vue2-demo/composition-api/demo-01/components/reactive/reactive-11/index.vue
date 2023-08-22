<template>
  <div class="fiexd-container">
    <div style="width: 100%; height: 100%">
      <div class="func-rank func-rank--19CAAD">
        <div>
          <el-link
            type="primary"
            :underline="false"
            style="margin-right: 15px; font-weight: bold"
            >reactive-11</el-link
          >
          <el-link type="success" :underline="false" style="font-weight: bold"
            >rank-1</el-link
          >
        </div>

        <div style="padding: 24px">
          <div>const tableState = reactive(tableData)</div>
          <div>
            [vue warn]: Avoid using Array as root value for reactive() as it
            cannot be tracked in watch() or watchEffect(). Use ref() instead.
            This is a Vue-2-only limitation.
          </div>
          <div>
            [vue
            warn]:避免使用Array作为reactive()的根值，因为它不能在watch()或watchEffect()中被跟踪。请改用ref()。这是vue
            -2独有的限制。
          </div>
        </div>

        <!-- <dl>
          <dt>数据</dt>
          <dd>
            <span>tableState:</span>
            <pre>{{ tableState }}</pre>
          </dd>
        </dl> -->

        <dl>
          <dt>数据</dt>
          <dd>
            <span>tableRef:</span>
            <pre>{{ tableRef }}</pre>
          </dd>
        </dl>

        <dl>
          <dt>操作</dt>
          <dd>
            <el-button @click="spliceTableRef"
              >[清空 & 添加] splice ref</el-button
            >
            <el-button @click="changeUserStateObj"
              >[整个对象] 重写引用</el-button
            >
          </dd>
        </dl>

        <rank2 :table="tableRef" />
      </div>
    </div>
  </div>
</template>

<script>
// import Mock from 'mockjs'
// import { reactive } from 'vue'
import { ref } from 'vue'
import { cloneDeep } from 'lodash'

// import { Message } from 'element-ui'
import rank2 from './ranks/rank-2.vue'

const table = [
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }
]

// Tip Cyan: reactive 方法 根据传入的对象 ，创建返回一个深度响应式对象。 => 响应式对象看起来和传入的对象一样，但是，响应式对象属性值改动，不管层级有多深，都会触发响应式。新增和删除属性也会触发响应式。
export default {
  name: 'reactive1Func',
  components: {
    rank2
  },
  setup(props, context) {
    const tableData = cloneDeep(table)

    // const tableState = reactive(tableData)

    const tableRef = ref(tableData)

    const spliceTableRef = () => {
      const len = tableRef.value.length
      if (len) {
        tableRef.value.splice(0, len)
      } else {
        tableRef.value.push(...table.reverse())
      }
    }

    // Tip Cyan: https://juejin.cn/post/7202961375554699322
    const changeUserStateObj = () => {
      // Message('目前不可以这样玩儿的，以后可能会有！')
      tableRef.value = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }

    const changeUserStateInfo = () => {}

    return {
      // tableState,
      tableRef,
      spliceTableRef,
      changeUserStateObj,
      changeUserStateInfo
    }
  }
}
</script>

<style lang="scss" scoped>
/*

  科学上舒服的颜色

  绿
  #19CAAD
  #8CC7B5
  #A0EEE1
  #BEE7E9
  #DEEDC7

  红
  #D6D5B7
  #D1BA74
  #E6CEAC
  #ECAD9E
  #F4606C

*/

.func-rank {
  padding: 10px;
  border-width: 2px;
  border-style: dashed;

  &--19CAAD {
    position: relative;
    border-color: #19caad;
    height: 100%;
    box-sizing: border-box;
  }
}

.fiexd-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
