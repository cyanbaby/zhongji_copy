<template>
  <div class="demo-container yey">
    <dl>
      <dt>数据</dt>
      <dd>num1: {{ num1 }}</dd>
      <dd>res: {{ typeof res }}</dd>
    </dl>
  </div>
</template>

<script>

import NP from 'number-precision'

export default {
  name: 'Base2',
  data() {
    return {
      num1: ''
    }
  },
  computed: {
    res() {
      return NP.times(this.num1, 100).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
