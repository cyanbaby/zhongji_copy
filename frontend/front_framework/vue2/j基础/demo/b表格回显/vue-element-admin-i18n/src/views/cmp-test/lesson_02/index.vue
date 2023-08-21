<template>
  <div>
    <h3>数据 方法 计算属性..</h3>
    <div class="outer">
      <cmpA />
    </div>
  </div>
</template>

<script>
import cmpA from './a'
export default {
  components: {
    cmpA,
  }
}
</script>

<style scoped>
.outer {
  background-color: #e6ceac;
  padding: 20px;
  display: flex;
}

.a {
  flex: 1;
  border-radius: 4px;
  padding: 20px;
  margin: 20px;
}

.b {
  flex: 1;
  border-radius: 4px;
  padding: 20px;
  margin: 20px;
}
</style>
