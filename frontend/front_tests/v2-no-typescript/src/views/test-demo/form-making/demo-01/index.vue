<template>
  <div class="app-window">
    <div class="app-container">
      <div class="app-box">
        <fm-making-form
          ref="makingform"
          preview
          generate-code
          generate-json
        >
        </fm-making-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestFormMakingDemo01View',
  data() {
    return {
      form: {},
      formConfig: {
        cols: [{ span: 24, list: [] }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-window {
  height: 100%;
  width: 100%;
  position: relative;
}
.app-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.app-box {
  height: 100%;
}
</style>
