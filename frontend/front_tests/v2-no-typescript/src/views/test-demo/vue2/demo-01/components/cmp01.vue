<template>
  <div class="cmp-box">
    子组件被使用。
    <slot name="name1"></slot>
    <slot name="name2"></slot>
  </div>
</template>

<script>
export default {
  name: 'CmpTest01',
  created() {}
}
</script>

<style lang="scss" scoped>
.cmp-box {
    padding: 6px;
    width: 220px;
    height: 220px;
    border: 1px dashed #409eff;
    border-radius: 6px;
}
</style>
