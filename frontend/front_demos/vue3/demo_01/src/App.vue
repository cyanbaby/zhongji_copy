<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// import Home from './lessons/lesson_17/components/Home.vue';

// import Home from './lessons/lesson_18/components/Home.vue';

// import Home from './lessons/lesson_19/components/Home.vue';

// import Home from './lessons/lesson_20_a/components/Index.vue';
// import Home from './lessons/lesson_20_b/components/Index.vue';

import Home from "./lessons/lesson_21/components/Index.vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
