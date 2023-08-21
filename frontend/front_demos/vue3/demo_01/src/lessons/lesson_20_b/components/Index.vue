<template>
  <h1>我是Index父组件--{{ title }}</h1>
  <br />
  <button @click="setTitle">执行方法改变父组件的title</button>

  <br />
  <br />

  <input type="text" v-model="username" />
  {{ username }}
  <br />
  <br />

  <Home />
</template>

<script>
import Home from "./Home.vue";
import { ref, reactive, provide, toRefs } from "vue";
export default {
  name: "App",
  setup() {
    let title = ref("Index父组件里面的title");
    let userinfo = reactive({
      username: "张三",
      age: 20,
    });
    let setTitle = () => {
      title.value = "App组件里面改变后的Title";
    };

    provide("title", title);
    provide("userinfo", userinfo);
    return {
      title,
      setTitle,
      ...toRefs(userinfo),
    };
  },
  components: {
    Home,
  },
};
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
