<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <Home /> -->

  <br>
  <br>
  <hr>
  <br>
  <br>
  <!-- <News /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Home from './components/Home.vue';
// import News from './components/News.vue';

export default defineComponent({
  name: 'App',
  components: {
    // Home,
    // News
  },
  data() {
    return {

    }
  }
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
