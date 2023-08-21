<template>
  <div class="outer">
    <h2>根组件</h2>
    <div style="display: flex;">
      <div style="flex: 8">
        <dl>
          <dt>数据:&nbsp;&nbsp;</dt>
          <dd>

            <p>
              <b>user:&nbsp;&nbsp;</b>
              <span>{{ user }}</span>
            </p>

          </dd>
        </dl>

        <dl>
          <dt>操作:&nbsp;&nbsp;</dt>
          <dd>
            <button @click="changeUserOb">btn1 替换 user</button>&nbsp;&nbsp;
            <button @click="changeUserProps">btn2 修改 user.name</button>&nbsp;&nbsp;
          </dd>
        </dl>

      </div>
    </div>

    <Child :user="user" />
  </div>
</template>

<script>

import Child from './child/child.vue'
export default {
  components: {
    Child
  },
  data() {
    return {
      user: {
        name: '张三',
        age: 18
      }
    }
  },
  methods: {

    changeUserOb() {
      const age = this.user.age + 1
      const name = '张三' + age
      this.user = {
        name: name,
        age: age
      }
    },
    changeUserProps() {
      // tag2 此种改变方式，子组件转接, 同上，子组件数据childUser和视图都不会发生改变
      this.user.age += 1
      this.user.name = '张三' + this.user.age

      // 这才是正常的，需要watch子组件 父组件的数据，直接watch，并且需要转接，保持单向数据流
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
