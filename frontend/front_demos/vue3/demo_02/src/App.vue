<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
let title: number = "我是一个home组件";

defineComponent({
  name: "App",
  data() {
    return {
      title,
    };
  },
});
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
