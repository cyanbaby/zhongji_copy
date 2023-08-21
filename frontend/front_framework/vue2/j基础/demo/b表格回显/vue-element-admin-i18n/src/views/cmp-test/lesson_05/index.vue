<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>a mag:</dt>
      <dd>{{ msg }}</dd>
    </dl>
    <dl>
      <dt>a user:</dt>
      <dd>{{ user }}</dd>
    </dl>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeUserOb">btn1 changeUserOb</button>&nbsp;&nbsp;
        <button @click="changeUserProp">btn2 changeUserProp</button>&nbsp;&nbsp;
      </dd>
    </dl>
    <Child :changeUserOb="changeUserOb" :changeUserProp="changeUserProp" />
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
      flag: '父组件',
      msg: '父组件msg',
      user: {
        name: '张三',
        age: 18
      }
    }
  },
  methods: {
    changeUserOb() {
      console.log(this.flag)
      let age = this.user.age
      let name = '张三__' + ++age
      this.user = {
        age,
        name
      }
    },
    changeUserProp() {
      console.log(this.flag)
      this.user.age += 1
      this.user.name = '张三__' + this.user.age
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
