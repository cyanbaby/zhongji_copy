<template>
  <h1>我是Index父组件--{{ title }}</h1>
  <br />
  <br />
  <button @click="setTitle">改变父组件的title</button>

  <Home />
</template>

<script>
import Home from "./Home.vue";

export default {
  name: "App",
  data() {
    return {
      title: "Index组件里面的标题",
    };
  },
  components: {
    Home,
  },
  methods: {
    setTitle() {
      this.title = "改变后的Index组件里面的标题";
    },
  },
  // provide: {
  //     title: "Index组件里面的标题"
  // },
  provide() {
    return {
      title: this.title,
      userinfo: {
        username: "张三",
        age: 20,
      },
    };
  },
};
</script>
