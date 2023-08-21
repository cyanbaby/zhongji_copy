<template>
  <div class="demo-container">
    <dl>
      <dt>当前屏幕分辨率</dt>
      <dd>宽:</dd>
      <dd>高:</dd>
    </dl>
    <div class="test" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      heigh: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      console.group('宽高信息：')
      console.log('网页可见区域宽：', document.body.clientWidth)
      console.log('offsetWidth：', document.body.offsetWidth)
      console.groupEnd()
    }
  }
}
</script>

<style scoped>
.test {
  width: 500px;
  height: 500px;
  background: #67c23a;
}

/*
  前缀min-表示“至少”，即“大于等于”的意思。
  前缀max-表示“至多”，即“小于等于”的意思。
*/
@media screen and (min-width: 1600px) and (max-width: 1919px) {
  .test {
    width: 400px;
    height: 400px;
    background: #409eff;
  }
}
</style>
