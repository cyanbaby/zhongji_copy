<template>
  <div>
    <h2>Home组件</h2>
    <br>
    <br>
    <Location />
    <br>
    <br>

  </div>
</template>

<script>
import Location from "./Location"

export default {
  name: "Home组件",
  data() {
    return {
      msg: "我是home组件的msg"
    }
  },
  components: {
    Location
  }
}
</script>
