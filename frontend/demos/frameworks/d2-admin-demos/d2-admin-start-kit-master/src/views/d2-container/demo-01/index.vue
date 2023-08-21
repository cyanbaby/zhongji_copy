<template>
  <d2-container filename="baidu.com">
    <template slot="header">filename</template>
    <el-card shadow="never">
      <!-- <p slot="title">d2-container</p> -->
      <d2-highlight :code="codeJavascript" />
    </el-card>
  </d2-container>
</template>

<script>
export default {
  name: 'page2',
  data () {
    return {
      codeJavascript: `
      // TODO 参数: filename
      // src/components/d2-container/index.js 
      import d2Source from './components/d2-source.vue'
      `
    }
  }
}
</script>
