<template>
  <div class="function-container">
    <el-menu
      :default-active="activeIndex"
      class="function-container__menu"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-submenu index="setup">
        <template slot="title">setup</template>
        <el-menu-item index="setup-1">props</el-menu-item>
        <el-menu-item index="setup-2">context</el-menu-item>
        <el-menu-item index="setup-3">emit</el-menu-item>
      </el-submenu>
      <el-submenu index="ref">
        <template slot="title">ref</template>
        <el-menu-item index="ref-1">普通值</el-menu-item>
        <el-menu-item index="ref-2">todo 对象</el-menu-item>
        <el-menu-item index="ref-3">todo 数组</el-menu-item>
      </el-submenu>

      <el-submenu index="reactive">
        <template slot="title">reactive</template>
        <el-menu-item index="reactive-1">对象</el-menu-item>
        <!-- <el-menu-item index="reactive-2">todo 对象</el-menu-item>
        <el-menu-item index="reactive-3">todo 对象</el-menu-item>
        <el-menu-item index="reactive-4">todo 对象</el-menu-item>
        <el-menu-item index="reactive-5">todo 对象</el-menu-item>
        <el-menu-item index="reactive-6">todo 对象</el-menu-item>
        <el-menu-item index="reactive-7">todo 对象</el-menu-item>
        <el-menu-item index="reactive-8">todo 对象</el-menu-item>
        <el-menu-item index="reactive-9">todo 对象</el-menu-item>
        <el-menu-item index="reactive-10">todo 对象</el-menu-item> -->
        <el-menu-item index="reactive-11">数组</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">我的工作台</template>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
        <el-menu-item index="4-3">选项3</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">选项4</template>
          <el-menu-item index="4-4-1">选项1</el-menu-item>
          <el-menu-item index="4-4-2">选项2</el-menu-item>
          <el-menu-item index="4-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <div class="function-container__main">
      <component v-bind:is="currentTabComponent" :text="'我是父组件传递的 text'"></component>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import setup_1 from './components/setup/setup-1'
import setup_2 from './components/setup/setup-2'
import setup_3 from './components/setup/setup-3'

import ref_1 from './components/ref/ref-1'
import ref_2 from './components/ref/ref-2'
import ref_3 from './components/ref/ref-3'

import reactive_1 from './components/reactive/reactive-1'
import reactive_11 from './components/reactive/reactive-11'

// 文档: https://cn.vuejs.org/api/composition-api-setup.html#basic-usage
export default {
  name: 'Vue2Demo01View',
  components: {
    setup_1,
    setup_2,
    setup_3,

    ref_1,
    ref_2,
    ref_3,

    reactive_1,
    reactive_11
  },
  computed: {
    currentTabComponent() {
      return this.activeIndex.replace(/-/g, '_')
    }
  },
  setup() {
    const count = ref(0)
    // const activeIndex = ref('ref-1')
    const activeIndex = ref('reactive-11')

    const handleSelect = (key, keyPath) => {
      // console.log(keyPath.at(-1))
      activeIndex.value = key
    }

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count,
      activeIndex,
      handleSelect
    }
  }
}
</script>

<style lang="scss" scoped>
.function-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &__main {
    flex: 1;
    overflow-y: auto;
    position: relative;
  }
}
</style>
