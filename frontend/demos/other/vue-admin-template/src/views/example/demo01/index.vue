<template>
  <div>
    demo01
    <svg-icon icon-class="user" style="color: red;" />
    <div class="test">测试</div>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
// :root {
//   --main-bg-color: pink;
// }
@import "@/styles/test.scss";

.test {
  padding: 20px;
  // color: var(--main-bg-color);
  // color: var(--test-color);
  color: $nav-color;
}
</style>
