<template>
  <div class="fiexd-container">
    <div style="width: 100%; height: 100%">
      <div class="func-rank func-rank--19CAAD">
        <div>
          <el-link
            type="primary"
            :underline="false"
            style="margin-right: 15px; font-weight: bold"
            >reactive-1</el-link
          >
          <el-link type="success" :underline="false" style="font-weight: bold"
            >rank-1</el-link
          >
        </div>
        <dl>
          <dt>数据</dt>
          <dd>
            <span>userState:</span>
            <pre>{{ userState }}</pre>
          </dd>
        </dl>
        <dl>
          <dt>操作</dt>
          <dd>
            <el-button @click="changeUserStateAttr"
              >[对象.属性] 的方式更新</el-button
            >
            <el-button @click="changeUserStateObj">[整个对象] 重写引用</el-button>
            <el-button @click="changeUserStateInfo"
              >[属性对象 info]  重写引用</el-button
            >
          </dd>
        </dl>

        <rank2 :user="userState" />
      </div>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs'
// import { reactive, defineProps } from 'vue'
import { reactive } from 'vue'
import { Message } from 'element-ui'
import rank2 from './ranks/rank-2.vue'

// console.log(defineProps)

// Tip Cyan: reactive 方法 根据传入的对象 ，创建返回一个深度响应式对象。 => 响应式对象看起来和传入的对象一样，但是，响应式对象属性值改动，不管层级有多深，都会触发响应式。新增和删除属性也会触发响应式。
export default {
  name: 'reactive1Func',
  components: {
    rank2
  },
  setup(props, context) {
    const user = {
      name: '张三',
      age: 18,
      info: {
        address: '湖南省 长沙市 岳麓区 望兴西西里',
        price: 1800
      }
    }
    const userState = reactive(user)

    const changeUserStateAttr = () => {
      const mkUser = Mock.mock({
        name: '@cname',
        'age|1-100': 100
      })
      userState.name = mkUser.name
      userState.age = mkUser.age
    }

    // Tip Cyan: https://juejin.cn/post/7202961375554699322
    const changeUserStateObj = () => {
      Message('目前不可以这样玩儿的，以后可能会有！')
    }

    const changeUserStateInfo = () => {
      const mkInfo = Mock.mock({
        address: '@city(true)',
        'price|1800-18000': 1800
      })
      userState.info = mkInfo
    }

    return {
      userState,
      changeUserStateAttr,
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
