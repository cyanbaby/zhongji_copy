<template>
  <div class="app-wrapper">
    <div class="sidebar-container"><Nav /></div>
    <router-view class="main-container"></router-view>
  </div>
</template>
<script lang="ts" setup>

import Nav from './Nav.vue'

</script>
<style>
html,
body,
#app {
  height: 100%;
}

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.sidebar-container {
  transition: width .28s;
  width: 210px !important;
  /* background-color: #304156; */
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  overflow-y: auto;
}

.main-container {
  min-height: 100%;
  -webkit-transition: margin-left .28s;
  transition: margin-left .28s;
  margin-left: 210px;
  position: relative;
}

/* 滚动条的宽度 */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, .3);
  border-radius: 3px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  height: 100%;
}
</style>