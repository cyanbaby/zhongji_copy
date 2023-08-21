<template>
  <div>
    <h3>Location组件---{{ title }}</h3>
    <br />
    username:{{ userinfo.username }}
    <br />
    age:{{ userinfo.age }}
  </div>
</template>

<script>
export default {
  inject: ["title", "userinfo"],
};
</script>

<style lang="scss">
h2 {
  text-align: center;
}
</style>
