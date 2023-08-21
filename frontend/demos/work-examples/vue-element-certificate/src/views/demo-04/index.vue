<template>
  <!-- <div class="app-container">
    <pdf src="https://static.peixunyun.cn/8065100165_b6bb4b6c-5999-40fc-ad6f-51945ef1aaa6.pdf"
    style="display: inline-block; width: 25%"></pdf>
  </div> -->
  <div>
    <!-- directive -->
    <div class="images" v-viewer>
      <img v-for="src in images" :key="src" :src="src" />
    </div>
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src" />
    </viewer>
    <!-- api -->
    <button type="button" @click="show">Click to show</button>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

export default {
  name: 'DemoView04',
  components: {
    pdf,
    VueViewer
  },
  data() {
    return {
      images: [
        'https://picsum.photos/200/200',
        'https://picsum.photos/300/200',
        'https://picsum.photos/250/200'
      ]
    }
  },
  methods: {
    show() {
      this.$viewerApi({
        images: this.images
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
</style>