<template>
  <h1>我是app根组件--{{ title }}</h1>
  <br>
  <br>
  <button @click="setTitle">改变父组件的title</button>

  <Home />
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  data() {
    return {
      title: "app组件里面的标题"
    }
  },
  components: {
    Home
  },
  methods: {
    setTitle() {
      this.title = "改变后的app组件里面的标题"
    }
  },
  // provide: {
  //     title: "app组件里面的标题"
  // },
  provide() {
    return {
      title: this.title,
      userinfo: {
        username: "张三",
        age: 20
      }
    }
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
