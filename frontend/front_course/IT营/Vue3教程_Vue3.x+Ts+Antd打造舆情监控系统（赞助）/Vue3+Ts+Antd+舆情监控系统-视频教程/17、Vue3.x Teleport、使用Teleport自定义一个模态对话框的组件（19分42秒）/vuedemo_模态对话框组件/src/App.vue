<template>
  <Home />
</template>

<script>
//1、引入组件
import Home from './components/Home';
export default {
  data() {
    return {
      msg: "app根组件",
    };
  },
  //2、挂载组件
  components: {
    Home
  }
};
</script>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}
</style>
