<template>
  <div class="app-container">
    <designer
      v-if="showList"
      :bg-code="bgCode"
      :pdf-size="pdfSize"
    />
    <control
      @change-bg-img="handleChangeBgImg"
      @remove-bg-img="bgCode = ''"
      @pdf-direction="changePdfSize"
    />
  </div>
</template>

<script>
import designer from './components/certificate-drag/designer.vue'
import control from './components/certificate-drag/control.vue'

export default {
  name: 'Demo02',
  components: {
    designer,
    control
  },
  data() {
    return {
      showList: true,
      bgCode: '',
      pdfSize: {
        width: '1123px',
        height: '794px'
      }
    }
  },
  watch: {
    'pdfSize.width': function(val) {
      this.showList = false
      this.$nextTick(() => {
        this.showList = true
      })
    }
  },
  mounted() {},
  methods: {
    changePdfSize(direction) {
      this.pdfSize.width = direction ? '1123px' : '794px'
      this.pdfSize.height = direction ? '794px' : '1123px'
    },
    handleChangeBgImg(bgCode) {
      this.bgCode = bgCode
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  // background-color: #f1f3f8;
  min-height: calc(100vh - 84px);
  background-color: #ccc;
  position: relative;
}
</style>
