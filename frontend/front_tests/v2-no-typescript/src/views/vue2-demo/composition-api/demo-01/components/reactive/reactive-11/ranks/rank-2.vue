<template>
  <div class="func-rank func-rank--F4606C">
    rank-2
    <dl>
      <dt>数据</dt>
      <dd>
        <span>table:</span>
        <pre>{{ table }}</pre>
      </dd>
    </dl>
    <dl>
      <dt>操作</dt>
      <dd>
        <el-button @click="clickEmit">$emit</el-button>
      </dd>
    </dl>
  </div>
</template>

<script>

export default {
  name: 'rank2Cmp',
  props: {
    table: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const clickEmit = () => {
      // context.emit | 直接解构 content { emit }
      context.emit('test-event')
    }

    return {
      clickEmit
    }
  }
}
</script>

<style lang="scss" scoped>
.func-rank {
  &--F4606C {
    border-color: #f4606c;
    box-sizing: border-box;
    position: absolute;
    top: 30%;
    left: 30%;
    right: 10px;
    bottom: 10px;
  }
}
</style>
