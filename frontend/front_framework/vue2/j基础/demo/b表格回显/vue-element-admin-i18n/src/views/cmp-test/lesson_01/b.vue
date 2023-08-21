<template>
  <div class="b">
    <dl>
      <dt>b mag:</dt>
      <dd>{{ msg }}</dd>
    </dl>
    <dl>
      <dt>b user:</dt>
      <dd>{{ user }}</dd>
    </dl>
    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeBmsg">btn1 changeBmsg</button>&nbsp;&nbsp;
        <button @click="changeBuserOb">btn2 changeBuserOb</button>&nbsp;&nbsp;
        <button @click="changeBuserProp">btn3 changeBuserProp</button>&nbsp;&nbsp;
      </dd>
    </dl>
  </div>
</template>

<script>
import { mixin } from './m'
let num = 0
export default {
  mixins: [mixin],
  methods: {
    changeBmsg() {
      this.msg = 'a.vue消息__' + ++num
    },
    changeBuserOb() {
      let age = this.user.age
      let name = '张三__' + ++age
      this.user = {
        age,
        name
      }
    },
    changeBuserProp() {
      this.user.age += 1
      this.user.name = '张三__' + this.user.age
    }

  }
}
</script>

<style>
.b {
  background-color: rgb(245, 245, 245);
}
.b button {
  margin: 10px;
}
</style>
