<template>
  <div>
    <div>
      {{ msg }}
    </div>
  </div>
</template>

<script>
import my from './components/my'

export default {
  name: 'Vue2DemoApiExtends01View',
  extends: my,
  data() {
    return {
      // msg: '宿主 msg'
    }
  },
  created() {
  }
}
</script>

<style></style>
