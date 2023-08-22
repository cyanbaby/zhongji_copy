<template>
  <i :class="iconClass ? iconClass : 'nav-icon'"></i>
</template>

<script>
export default {
  name: 'CmpNavIcon',
  props: {
    iconClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-icon {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
}
</style>
