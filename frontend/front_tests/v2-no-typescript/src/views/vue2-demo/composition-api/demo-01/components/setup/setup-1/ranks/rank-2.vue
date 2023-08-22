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
  onUpdated() {
    console.log(1)
  },
  setup(props, context) {
    return {
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
