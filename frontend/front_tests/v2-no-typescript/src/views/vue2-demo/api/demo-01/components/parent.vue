<template>
  <div class="">
    这是父组件
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'parentCmp',
  data() {
    return {
      message: 'Hello Vue',
      sayHello: 'Parent say hello'
    }
  },
  methods: {
    showMessage() {
      console.log(this.sayHello + this.message)
    }
  },
  created() {
    console.log('extends created')
  }
}
</script>
