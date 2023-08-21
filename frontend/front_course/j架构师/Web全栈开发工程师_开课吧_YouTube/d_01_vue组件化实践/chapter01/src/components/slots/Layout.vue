<template>
  <div>
    <div class="header">
      <!-- 具名插槽 -->
      <slot name="header"></slot>
    </div>

    <!-- 匿名插槽 -->
    <div class="body">
      <slot></slot>
    </div>

    <div class="footer">
      <!-- 作用域插槽 -->
      <slot name="footer" :fc="footerContent" :abc="'我是abc'"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remark: [
        '好好学习，天天向上',
        '学习永远不晚',
        '学习知识要善于思考，思考，在思考',
        '学习的敌人是自己的满足，要认真学习一点东西，必须从不自满开始',
        '三人行必有我师焉，择其善者而从之，其不善者而改之'
      ]
    }
  },
  computed: {
    footerContent() {
      return this.remark[new Date().getDay() - 1]
    }
  }
}
</script>

<style>

</style>