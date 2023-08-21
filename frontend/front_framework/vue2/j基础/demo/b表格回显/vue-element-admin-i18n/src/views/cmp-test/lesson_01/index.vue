<template>
  <div class="outer">
    <cmpA />
    <cmpB />
  </div>
</template>

<script>
import cmpA from './a'
import cmpB from './b'
export default {
  components: {
    cmpA,
    cmpB
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
