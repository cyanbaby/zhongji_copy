<template>
  <el-container style="height: 100vh;">
    <el-aside width="252px">

      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
        :default-active="router.currentRoute.value.path" text-color="#fff" @open="handleOpen" @close="handleClose"
        router>

        <el-menu-item index="/home">
          <el-icon>
            <HelpFilled />
          </el-icon>
          <router-link to="/home"><span>Home</span></router-link>
        </el-menu-item>

        <el-sub-menu index="0">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>ref&nbsp;reactive&nbsp;toRef&nbsp;toRefs</span>
          </template>
          <!-- <el-menu-item index="/ref/base">base component</el-menu-item> -->

          <el-menu-item-group title="基本使用">

            <el-menu-item index="/ref/lesson_01">ref&nbsp;&nbsp;基本使用</el-menu-item>
            <el-menu-item index="/ref/lesson_02">toRef&nbsp;&nbsp;字面量对象</el-menu-item>
            <el-menu-item index="/ref/lesson_03">toRef&nbsp;&nbsp;变量对象</el-menu-item>
            <el-menu-item index="/ref/lesson_04">toRefs&nbsp;&nbsp;字面量对象</el-menu-item>
            <el-menu-item index="/ref/lesson_05">toRefs&nbsp;&nbsp;变量对象</el-menu-item>
            <el-menu-item index="/ref/lesson_06">reactive属性值ref</el-menu-item>
            <!-- <el-menu-item index="/ref/lesson_07">reactive属性值ref Ⅱ</el-menu-item> -->
            <el-menu-item index="/ref/lesson_08">toRefs reactive 最佳实践Ⅰ</el-menu-item>
            <el-menu-item index="/ref/lesson_09">toRefs reactive 最佳实践Ⅱ</el-menu-item>
            <el-menu-item index="/ref/lesson_10">toRefs reactive 最佳实践Ⅲ</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="ref(数组|对象)">
            <el-menu-item index="/ref/lesson_11">ref(Object | Array)</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="ref DOM">
            <el-menu-item index="/ref/lesson_12">ref dom</el-menu-item>
          </el-menu-item-group>

        </el-sub-menu>

        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>defineProps</span>
          </template>



          <el-menu-item-group title="ref,普通类型,reactive,普通对象">
            <el-menu-item index="/defineProps/base">component base</el-menu-item>
            <el-menu-item index="/defineProps/lesson_01">父传子 父change</el-menu-item>
            <el-menu-item index="/defineProps/lesson_02">父传子 子change</el-menu-item>
            <el-menu-item index="/defineProps/lesson_03">父传子 defineEmits</el-menu-item>
            <el-menu-item index="/defineProps/lesson_04">父传子 reactive 嵌套</el-menu-item>
            <el-menu-item index="/defineProps/lesson_05">父 ref&nbsp;&nbsp;子 computed</el-menu-item>
            <el-menu-item index="/defineProps/lesson_06">父 obj&nbsp;&nbsp;子 computed</el-menu-item>
          </el-menu-item-group>

          <el-menu-item index="/defineProps/demo_01">todo 拆分,toRef,toRefs,Array</el-menu-item>

          <el-menu-item-group title="重构">
            <el-menu-item index="/defineProps/demo_02">useVModel 使用</el-menu-item>
            <el-menu-item index="/defineProps/demo_03">useVModel 使用 Ⅱ</el-menu-item>
            <el-menu-item index="/defineProps/demo_04">defineProps 基础</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>watch</span>
          </template>
          <el-menu-item index="/watch/demo_01">multi watch ref & props</el-menu-item>
          <el-menu-item index="/watch/demo_02">watch [ref*n] & props</el-menu-item>
          <el-menu-item index="/watch/demo_03">watch reactive & props</el-menu-item>
          <el-menu-item index="/watch/demo05">watch array</el-menu-item>
          <el-menu-item index="/watch/demo06">stop watch</el-menu-item>
          <el-menu-item index="/watch/demo_07">watch 对象多个属性 </el-menu-item>
        </el-sub-menu>


        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>provide inject</span>
          </template>
          <el-menu-item index="/provide/demo01">todo 拆分</el-menu-item>
        </el-sub-menu>



        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>computed</span>
          </template>
          <el-menu-item-group title="测试">
            <el-menu-item index="/computed/lesson_01">父组件 普通对象</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="测试要清晰">
            <el-menu-item index="/computed/lesson_02">computed reactive</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item index="/computed/demo01">测试</el-menu-item> -->

        </el-sub-menu>

        <el-sub-menu index="40">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>useVModel</span>
          </template>
          <el-menu-item-group title="测试">
            <el-menu-item index="/useVModel/lesson_01">useVModel</el-menu-item>
            <el-menu-item index="/useVModel/lesson_02">useVModel to user</el-menu-item>
            <el-menu-item index="/useVModel/lesson_03">useVModel 测试</el-menu-item>
          </el-menu-item-group>

        </el-sub-menu>

        <el-sub-menu index="400">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>chart</span>
          </template>
          <el-menu-item-group title="测试">
            <el-menu-item index="/chart/lesson_01">series 1</el-menu-item>
            <el-menu-item index="/chart/lesson_02">series 2</el-menu-item>
            <el-menu-item index="/chart/lesson_03">dataset</el-menu-item>
            <el-menu-item index="/chart/lesson_04">xAxis</el-menu-item>
            <el-menu-item index="/chart/lesson_06">yAxis</el-menu-item>
            <el-menu-item index="/chart/lesson_05">双y轴 折线图</el-menu-item>
            <el-menu-item index="/chart/lesson_07">测试 option</el-menu-item>
            <el-menu-item index="/chart/lesson_08">dataset 柱状图</el-menu-item>
            <el-menu-item index="/chart/lesson_09">tooltip 基本配置</el-menu-item>
            <el-menu-item index="/chart/lesson_10">tooltip 语数外</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="TODO">
            <el-menu-item index="/chart/base">获取 getOption 更新</el-menu-item>
            <el-menu-item index="/chart/base">轮播实现</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="归档">
            <el-menu-item index="/chart/lesson_11">dataset & getOption</el-menu-item>
            <el-menu-item index="/chart/lesson_12">getOption & 转条状图</el-menu-item>
            <el-menu-item index="/chart/lesson_13">折线图显示标签</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="401">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>api 测试</span>
          </template>
          <el-menu-item index="/apiTest/base">base component</el-menu-item>

          <el-menu-item-group title="Vue3 动态 class">
            <el-menu-item index="/apiTest/demo_01">props 数组</el-menu-item>
            <el-menu-item index="/apiTest/demo_02">class 重复</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="JavaScrpit">
            <!-- <el-menu-item index="/apiTest/demo_01">ES Module 导出引用类型</el-menu-item> -->
            <el-menu-item index="/apiTest/demo_03">... 嵌套对象</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="5">

          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>组件通信</span>
          </template>
          <el-menu-item index="/callData/base">base component</el-menu-item>
          <!-- <el-menu-item index="/callData/demo01">todo 组件通信</el-menu-item> -->
        </el-sub-menu>

        <el-sub-menu index="6">
          <template #title>
            <el-icon>
              <HelpFilled />
            </el-icon>
            <span>路由</span>
          </template>
          <el-menu-item index="/routerTest/demo01">全局&组件 钩子顺序</el-menu-item>
        </el-sub-menu>

      </el-menu>

    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>

  </el-container>
</template>

<script lang="ts" setup>
import {
  HelpFilled,
} from '@element-plus/icons-vue'

import { useRouter } from "vue-router"

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

// //初始化路由
const router = useRouter()

// setTimeout(() => {
//   console.log(router.currentRoute)
// }, 3000)

</script>

<style>
body {
  margin: 0;
}

.el-menu {
  height: 100%;
}

/* .el-menu-item.is-active {
    color: var(--el-menu-active-color);
} */
.el-menu-item a {
  text-decoration: none;
  color: #fff;
}

.router-link-active {
  color: var(--el-menu-active-color) !important;
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
</style>