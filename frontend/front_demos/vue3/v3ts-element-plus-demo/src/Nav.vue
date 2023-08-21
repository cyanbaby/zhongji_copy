<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Sugar /></el-icon>
        <span>Element Plus</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Element 基础</span></template>
        <el-menu-item index="1-1-1">item 1</el-menu-item>
        <el-menu-item index="1-1-2">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>Element 业务</span></template>
        <el-menu-item index="1-2-1">item 1</el-menu-item>
        <el-menu-item index="1-2-1">item 2</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Sugar /></el-icon>
        <span>Vue3</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Vue3 基础</span></template>
        <el-menu-item index="2-1-1">item 1</el-menu-item>
        <el-menu-item index="2-1-2">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>Vue3 问题</span></template>
        <el-menu-item index="2-2-1">item 1</el-menu-item>
        <el-menu-item index="2-2-1">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>Vue3 实验</span></template>
        <el-menu-item index="2-3-1">item 1</el-menu-item>
        <el-menu-item index="2-4-1">item 2</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><Sugar /></el-icon>
        <span>Data Structure</span>
      </template>
      <el-menu-item-group>
        <template #title><span>A 结构</span></template>
        <el-menu-item index="3-1-1">item 1</el-menu-item>
        <el-menu-item index="3-1-2">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>B 结构</span></template>
        <el-menu-item index="3-2-1">item 1</el-menu-item>
        <el-menu-item index="3-2-1">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>C 结构</span></template>
        <el-menu-item index="3-3-1">item 1</el-menu-item>
        <el-menu-item index="3-4-1">item 2</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon><Sugar /></el-icon>
        <span>Algorithms</span>
      </template>
      <el-menu-item-group>
        <template #title><span>A 算法</span></template>
        <el-menu-item index="4-1-1">item 1</el-menu-item>
        <el-menu-item index="4-1-2">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>B 算法</span></template>
        <el-menu-item index="4-2-1">item 1</el-menu-item>
        <el-menu-item index="4-2-1">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>C 算法</span></template>
        <el-menu-item index="4-3-1">item 1</el-menu-item>
        <el-menu-item index="4-4-1">item 2</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>    
    
    <el-sub-menu index="5">
      <template #title>
        <el-icon><Sugar /></el-icon>
        <span>Review</span>
      </template>
      <el-menu-item-group>
        <template #title><span>A 结构</span></template>
        <el-menu-item index="5-1-1">item 1</el-menu-item>
        <el-menu-item index="5-1-2">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>B 结构</span></template>
        <el-menu-item index="5-2-1">item 1</el-menu-item>
        <el-menu-item index="5-2-1">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>C 结构</span></template>
        <el-menu-item index="5-3-1">item 1</el-menu-item>
        <el-menu-item index="5-4-1">item 2</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>  

    <el-sub-menu index="6">
      <template #title>
        <el-icon><Sugar /></el-icon>
        <span>Issues</span>
      </template>
      <el-menu-item-group>
        <template #title><span>A 结构</span></template>
        <el-menu-item index="6-1-1">item 1</el-menu-item>
        <el-menu-item index="6-1-2">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>B 结构</span></template>
        <el-menu-item index="6-2-1">item 1</el-menu-item>
        <el-menu-item index="6-2-1">item 2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title><span>C 结构</span></template>
        <el-menu-item index="6-3-1">item 1</el-menu-item>
        <el-menu-item index="6-4-1">item 2</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>      

    
    <el-menu-item index="7">
      <el-icon><Sugar /></el-icon>
      <template #title>Other</template>
    </el-menu-item>      
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Sugar } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>