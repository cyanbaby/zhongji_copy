<template>
  <div>嵌套mixins钩子</div>
</template>

<script>
import a from './mixins/a.js'
import b from './mixins/b.js'

export default {
  name: 'TestVue2Demo03View',
  mixins: [a, b],
  created() {
    console.log('页面组件 created')
  }

}
</script>

<style></style>
