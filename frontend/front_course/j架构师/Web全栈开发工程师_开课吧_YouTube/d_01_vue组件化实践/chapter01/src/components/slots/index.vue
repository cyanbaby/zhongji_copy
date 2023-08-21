<template>
  <div>
    <h2>插槽</h2>
    
    <!-- 插槽 -->
    <Layout>
      <!-- 具名插槽 -->
      <template v-slot:header>开课吧全栈</template>
      <!-- 匿名插槽 -->
      <template>content ..</template>
      <!-- 作用域插槽，对象的结构-->
      <!-- <template v-slot:footer="{fc}">{{fc}}</template> -->
      <!-- <template v-slot:footer="ctx">{{ctx.fc}}</template> -->
      <template v-slot:footer="{ fc, abc }">{{fc}}<br />{{abc}}</template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./Layout.vue";

export default {
  components: {
    Layout,
  },
};
</script>

<style>
</style>