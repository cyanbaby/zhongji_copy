<template>
  <div class="outer">
    <h2>根组件</h2>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>

      <dd>
        <p>
          <b>countRef:&nbsp;&nbsp;</b>
          <span>{{ countRef }}</span>
        </p>
      </dd>

      <dd>
        <p>
          <b>state:&nbsp;&nbsp;</b>
          <span>{{ state }}</span>
        </p>
      </dd>

    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <!-- <button @click="count++">+ 1</button> -->
        <button @click="changeCount"> countRef.value + 1</button>&nbsp;&nbsp;
        <button @click="changeStateNum"> state.num + 1</button>&nbsp;&nbsp;
      </dd>
    </dl>

    <!-- <Child /> -->
  </div>
</template>  

<script lang="ts" setup>

// import Child from './child/child.vue'
import { ref, reactive } from 'vue'

const countRef = ref(0)

const changeCount = () => {
  countRef.value++
}

const state = reactive({
  num: countRef
})
const changeStateNum = () => {
  state.num++
}

</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>