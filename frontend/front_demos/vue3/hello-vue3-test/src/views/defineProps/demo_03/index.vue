<template>
  <div class="outer">
    <h2>根组件</h2>
    <Cmp :progressBarConfig="cssData.progressBarConfig" />

    <Child v-model="cssData.progressBarConfig" />
  </div>
</template>  

<script lang="ts" setup>

import { ref } from 'vue'

import Child from './child/child.vue'
import Cmp from './cmp.vue'

const config = {
  progressBarConfig: {
    isShowStatusIcon: false,
    progressOrNodekey: "progress",
    progress: {
      progressColorKey: "progressMultiColor",
      progressSingleColor: "var(--staticColor-white)",
      tempColor: "#6366f1",
      tempNum: 0,
      progressMultiColorType: "number",
      progressMultiColor: [
        {
          id: "001",
          start: 0,
          end: 20,
          color: "#FC725A"
        },
        {
          id: "002",
          start: 20,
          end: 40,
          color: "#FFAE43"
        },
        {
          id: "003",
          start: 40,
          end: 60,
          color: "#5DC264"
        },
        {
          id: "004",
          start: 60,
          end: 80,
          color: "#6366F1"
        },
        {
          id: "005",
          start: 80,
          end: 100,
          color: "#9333EA"
        }
      ],
      isBindExp: false
    },
    node: {}
  }
}
const cssData = ref(config)

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>