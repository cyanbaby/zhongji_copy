<template>
  <a-progress :show-text="true" :percent="0.5" :type="'line'" :size="'mini'" />

  <a-progress :show-text="true" :percent="0.5" :type="'line'" :size="'small'" />
  <a-progress :show-text="true" :percent="0.5" :type="'line'" :size="'medium'" />
  <a-progress :show-text="true" :percent="0.5" :type="'line'" :size="'large'" />

  <a-progress :show-text="true" :percent="0.5" :type="'circle'" :size="'mini'" />

  <a-progress :show-text="true" :percent="0.5" :type="'circle'" :size="'small'" />
  <a-progress :show-text="true" :percent="0.5" :type="'circle'" :size="'medium'" />
  <a-progress :show-text="true" :percent="0.5" :type="'circle'" :size="'large'" />

  <div :style="{ marginTop: '20px' }">
    <a-slider v-model="percent" :max="1" :step="0.1" :style="{ width: '150px' }" />
  </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
const percent = ref(0.2)
</script>



