<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created() {
    this.$bus.$on('todo-something', (params) => {
      // 获取传递的参数并进行操作
      console.log('todo something')
    })
  }
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}
</style>

<style lang="scss">
.app {
  height: 100%;
  display: flex;
}
</style>
