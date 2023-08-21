<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>ref:&nbsp;&nbsp;</dt>
      <dd>接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。</dd>
    </dl>

    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>
        <p>
          <b>count:&nbsp;&nbsp;</b>
          <span>{{ count }}</span>
        </p>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <!-- <button @click="count++">+ 1</button> -->
        <button @click="changeCount">+ 1</button>
      </dd>
    </dl>

    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

// import Child from './child/child.vue'
import { ref } from 'vue'

const count = ref(0)

const changeCount = () => {
  count.value++
}
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>