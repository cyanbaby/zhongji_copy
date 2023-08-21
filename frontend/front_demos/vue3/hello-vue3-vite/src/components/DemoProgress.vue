<template>
  <a-progress :percent="percent" :size="'large'" :type="'line'" animation />

  <div :style="{ marginTop: '20px' }">
    <a-slider v-model="percent" :max="1" :step="0.1" :style="{ width: '150px' }" />
  </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
const percent = ref(0.2)
</script>



