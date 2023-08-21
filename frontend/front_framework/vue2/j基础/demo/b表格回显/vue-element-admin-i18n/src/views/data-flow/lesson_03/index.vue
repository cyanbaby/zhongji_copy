<template>
  <div class="outer">
    <h2>根组件</h2>
    <div style="display: flex;">
      <div style="flex: 8">
        <dl>
          <dt>数据:&nbsp;&nbsp;</dt>
          <dd>

            <p>
              <b>parentMsg:&nbsp;&nbsp;</b>
              <span>{{ parentMsg }}</span>
            </p>

          </dd>
        </dl>

        <dl>
          <dt>操作:&nbsp;&nbsp;</dt>
          <dd>
            <button @click="changeParentMsg">btn1 修改 parentMsg</button>&nbsp;&nbsp;
          </dd>
        </dl>

      </div>
      <div style="flex: 12">
        <dl>
          <dt>现象:&nbsp;&nbsp;</dt>
          <dl>
            <dt>点击 父组件btn1:</dt>
            <dd>父子组件 parentMsg 数据和视图 更新</dd>
            <dd>子组件 childMsg 数据和视图 不更新</dd>
          </dl>
          <dl>
            <dt>点击 子组件btn1:</dt>
            <dd>子组件 childMsg 数据和视图 更新</dd>
            <dd>父子组件 parentMsg 数据和视图 不更新</dd>
          </dl>
        </dl>
      </div>
    </div>

    <Child :parentMsg="parentMsg" />
  </div>
</template>

<script>
let num = 0
import Child from './child/child.vue'
export default {
  components: {
    Child
  },
  data() {
    return {
      parentMsg: '父组件消息__' + num
    }
  },
  methods: {
    changeParentMsg() {
      this.parentMsg = '父组件消息__' + ++num
    }
  }
}
</script>

<style>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>
