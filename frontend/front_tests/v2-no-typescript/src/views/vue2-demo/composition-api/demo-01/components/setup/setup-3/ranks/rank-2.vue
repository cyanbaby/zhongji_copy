<template>
  <div class="func-rank func-rank--F4606C">
    rank-2
    <dl>
      <dt>数据</dt>
      <dd>
        <span>str:</span>
        <span>{{ str }}</span>
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
    str: {
      type: String,
      default: ''
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
    top: 20%;
    left: 20%;
    right: 10px;
    bottom: 10px;
  }
}
</style>
