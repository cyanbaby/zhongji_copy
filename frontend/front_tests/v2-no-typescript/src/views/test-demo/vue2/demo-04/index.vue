<template>
  <div>
    <dl>
      <dt>嵌套mixins的变量</dt>
      <dd>{{ name }}</dd>
    </dl>
  </div>
</template>

<script>
import a from './mixins/a.js'
// import b from './mixins/b.js'

export default {
  name: 'TestVue2Demo04View',
  // mixins: [a, b],
  mixins: [a],

  data() {
    return {
      // name: '张三'
    }
  },
  created() {
    console.log('页面组件 created')
  }

}
</script>

<style></style>
