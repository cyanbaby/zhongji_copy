<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <!-- 组件通信 -->
    <!-- <communication /> -->

    <!-- 插槽 -->
    <slot-example />

    <!-- KForm -->
    <KForm />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// 组件通信
// import communication from './components/communication'

// 插槽
import slotExample from './components/slots'

// KForm
// import KForm from './components/form'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // communication,  // 组件通信
    slotExample,    // 插槽
    // KForm
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
