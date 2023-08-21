<template>
  <Home />

  <br />
  <br />

  <hr />

  <br />
  <br />

  <News />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "./Home.vue";
import News from "./News.vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
    News,
  },
  data() {
    return {};
  },
});
</script>
