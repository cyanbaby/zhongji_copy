<template>
  <div class="outer">
    <h2>根组件</h2>
    
    <Child v-model:user-name="userName" />
  </div>
</template>  

<script lang="ts" setup>

import {ref} from 'vue'
import Child from './child/child.vue'

const userName = ref('张三')

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>