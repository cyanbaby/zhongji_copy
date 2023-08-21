<template>
  <div class="demo-container yey">
    <h3>爷爷组件</h3>
    <dl>
      <dt>爷爷组件的数据</dt>
      <dd>yeye的msg: {{ msg }}</dd>
    </dl>

    <bab v-model="msg" />
  </div>
</template>

<script>
import Bab from './bab.vue'

export default {
  name: 'Base2',
  components: {
    Bab
  },
  data() {
    return {
      msg: 'yeye 数据'
    }
  }
}
</script>

<style lang="scss" scoped>
.yey {
  background-color: #A0EEE1;
}
.bab {
  background-color: #BEE7E9;
}
.sunz {
  background-color: #BEEDC7;
}
</style>
