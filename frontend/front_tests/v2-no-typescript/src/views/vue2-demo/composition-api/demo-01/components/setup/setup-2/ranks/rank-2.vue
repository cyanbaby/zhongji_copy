<template>
  <div class="func-rank func-rank--F4606C">
    rank-2
    <dl>
      <dt>数据</dt>
      <dd>
        <span>str:</span>
        <span>{{ str }}</span>
      </dd>
    </dl>
    <dl>
      <dt>操作</dt>
      <dd>
        <el-button @click="consoleContext">输出 context.attrs</el-button>
        <el-button @click="manualUpdate">手动更新视图</el-button>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getCurrentInstance, ref, onBeforeUpdate } from 'vue'
import { Message } from 'element-ui'

export default {
  name: 'rank2Cmp',
  // onUpdated() {
  //   console.log(1)
  // },
  setup(props, context) {
    // console.log(context.attrs) // => https://blog.csdn.net/weixin_46267040/article/details/125370112

    const instance = getCurrentInstance()
    console.log(instance.proxy)

    const consoleContext = () => {
      // console.log(context.attrs)
      // instance.proxy.$message(
      //   'context.attrs.str:' + context.attrs.str + ', context.attrs 非响应式数据'
      // )

      // 推荐这样使用。
      Message({
        message:
          'context.attrs.str:' +
          context.attrs.str +
          ', context.attrs 是非响应式数据',
        offset: 20
      })
      Message.error({
        message: '但此处又是响应式的，只是视图没有更新',
        offset: 60
      })
    }

    // attrs不需要props中声明接收
    // const str = context.attrs.str
    const str = ref(context.attrs.str)

    const manualUpdate = () => {
      str.value = context.attrs.str
    }

    onBeforeUpdate(() => {
      str.value = context.attrs.str
      Message({
        type: 'success',
        message:
          'onBeforeUpdate: 用代码更新 str，无需再点击手动更新视图按钮了',
        offset: 20
      })
    })

    return {
      consoleContext,
      str,
      manualUpdate
    }
  }
}
</script>

<style lang="scss" scoped>
.func-rank {
  &--F4606C {
    border-color: #f4606c;
    box-sizing: border-box;
    position: absolute;
    top: 20%;
    left: 20%;
    right: 10px;
    bottom: 10px;
  }
}
</style>
