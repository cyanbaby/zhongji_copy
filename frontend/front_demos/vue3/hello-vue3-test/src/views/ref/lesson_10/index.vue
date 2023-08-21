<template>
  <div class="outer">
    <h2>根组件</h2>

    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>siteMap:&nbsp;&nbsp;</b>
          <span>{{ siteMap }}</span>
        </p>

        <p>
          <b>state:&nbsp;&nbsp;</b>
          <span>{{ state }}</span>
        </p>
        <p>
          <b>x:&nbsp;&nbsp;</b>
          <span>{{ x }}</span>
        </p>
        <p>
          <b>y:&nbsp;&nbsp;</b>
          <span>{{ y }}</span>
        </p>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <!-- <button @click="count++">+ 1</button> -->
        <button @click="changeSiteMap"> btn1 change siteMap</button>&nbsp;&nbsp;
        <button @click="changeX"> btn2 x +1 </button>&nbsp;&nbsp;
        <button @click="changeY"> btn3 y +1 </button>&nbsp;&nbsp;
      </dd>
    </dl>

    <dl>
      <dt>现象:&nbsp;&nbsp;</dt>
      <dd>点击 btn2,btn3 state x,y 和 state 视图更新</dd>
      <br>
      <dd>点击 btn2,btn3 之后 sourceUser 数据会改变，但是视图不会更新</dd>
      <br>
      <dd>点击 btn1 之后 changeSiteMap数据会改变，changeSiteMap视图不会更新，</dd>
      <dd>但是之后继续点击 btn2或者btn3后 x,y 和 state视图会直接更新成 changeSiteMap 的数据</dd>
    </dl>
    
    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

import { reactive, toRefs } from 'vue'

const siteMap = {
  x: 1,
  y: 2
}

function changeSiteMap() {
  siteMap.x += 100
  siteMap.y += 100
}

const state = reactive(siteMap)

const { x, y } = toRefs(state)

function changeX() {
  x.value += 1
}
function changeY() {
  y.value += 1
}
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>