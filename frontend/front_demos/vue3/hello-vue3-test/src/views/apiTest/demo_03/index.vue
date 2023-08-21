<template>
  <div class="outer">
    <h2 class="test-01">根组件</h2>

    <div style="display: flex;">
      <div class="test">
        <dl>
          <dt style="text-align: center;">1 {{ obj_01.background }}</dt>
          <dd>
            <button style="margin: 30px 0 0 30px;" @click="change1">change</button>
          </dd>
        </dl>
      </div>
      <div class="test">
        <dl>
          <dt style="text-align: center;">2 {{ obj_02.background }}</dt>
          <dd>
            <button style="margin: 30px 0 0 30px;">change</button>
          </dd>
        </dl>
      </div>
      <div class="test">
        <dl>
          <dt style="text-align: center;">3 {{ obj_03.background }}</dt>
          <dd>
            <button style="margin: 30px 0 0 30px;">change</button>
          </dd>
        </dl>
      </div>
    </div>

    {{ msg }}

    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>
// import Child from './child/child.vue'
import { ref } from 'vue'

import defaultCssConfig from './defaultCssConfig';
console.log(defaultCssConfig)

let msg = ref('刷新DOM锚点')

let obj_01 = {
  ...defaultCssConfig
}
let obj_02 = {
  ...defaultCssConfig
}
let obj_03 = {
  ...defaultCssConfig
}


// console.log(obj_01.background === obj_02.background)  // true

function change1() {
  obj_01.background.color = "#000"
  msg.value = '刷新一下'
}



</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}

.test {
  border: 1px solid #000;
  width: 200px;
  height: 200px;
  border-radius: 4px;
  margin-right: 20px;
}
</style>