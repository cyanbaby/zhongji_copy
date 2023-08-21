<template>
  <div>
    <h3>{{ title }}</h3>

    <router-link to="/example/demo06">
      <el-link type="primary">跳转 demo06</el-link>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Demo 06'
    }
  },
  methods: {
    getPlateList() {

      return undefined
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('07 执行了')
    // console.log(vm.componentName)

    // console.log(to)
    // console.log(from)
    // if (from.fullPath === '/login' || from.fullPath === '/') {
    //   next((vm) => {
    //     vm.getPlateList()
    //   })
    // } else {
    //   next()
    // }
    next((vm) => {
      vm.getPlateList()
    })
  }
}
</script>
