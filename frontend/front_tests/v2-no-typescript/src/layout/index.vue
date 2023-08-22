<template>
  <div class="layout">
    <div class="layout__left">
      <LeftNav />
    </div>
    <div class="layout__right">
      <div class="right-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from '@/layout/left-nav'

export default {
  name: 'LayoutCmp',
  components: {
    LeftNav
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100%;

  &__left {
    border-right: 1px solid #ffd04b;
    box-sizing: border-box;
    height: 100%;
    width: 210px;
    overflow: hidden;
    .el-menu {
      width: 100%;
      height: 100%;
    }
  }
  &__right {
    background: #f0f2f5;
    flex: 1;
    height: 100%;
    overflow: hidden;

    .right-container {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
