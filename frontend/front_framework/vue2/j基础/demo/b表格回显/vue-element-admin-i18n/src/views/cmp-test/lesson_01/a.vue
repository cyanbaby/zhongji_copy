<template>
  <div class="a">
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
        <button @click="changeAmsg">changeAmsg</button>&nbsp;&nbsp;
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
    changeAmsg() {
      this.msg = 'a.vue消息__' + ++num
    }
  }
}
</script>

<style>
.a {
  background-color: rgb(245, 245, 245);

}
</style>
