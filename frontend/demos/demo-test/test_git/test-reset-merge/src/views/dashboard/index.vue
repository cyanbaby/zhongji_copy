<template>
  <div class="dashboard-container">
    <el-button @click="changeColor('#00AFC5')">切换绿色</el-button>
    <el-button @click="changeColor('#ff4500')">切换红色</el-button>
    <div class="dashboard-text">name: {{ name ? name : 'cyan' }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    changeColor(val) {
      // const declaration = document.querySelector(':root').style
      // const propvalue = declaration.getPropertyValue("--right-main-color")
      // const color = getComputedStyle(document.documentElement).getPropertyValue('--right-main-color')

      document.documentElement.style.setProperty('--right-main-color', val)
    }
  }
}
</script>
<style>
:root {
  --right-main-color: royalblue;
}
</style>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    color: var(--right-main-color);
  }
}
</style>
