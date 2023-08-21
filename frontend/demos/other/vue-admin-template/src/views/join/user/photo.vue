<!--  -->
<template>
  <div>
    <json-box ref="jsonBox" :data="formData" :jsonUrl="jsonUrl">
    </json-box>
    <el-button @click="change" >更换图片</el-button>
  </div>
</template>

<script>
import JsonBox from '@/components/json-box/index.vue'
export default {
  components: {
    JsonBox
  },
  data () {
    return {
      jsonUrl: 'https://static.peixunyun.cn/file_1650017911252.txt',
      formData: {
        photoUrl: ['https://static.peixunyun.cn/1d348baba51f4026ad1aa43ff2af186c.jpg']
      }
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    change () {
      this.$set(this.formData, 'photoUrl', ['https://static.peixunyun.cn/1d348baba51f4026ad1aa43ff2af186c.jpg',
        'https://static.peixunyun.cn/1d348baba51f4026ad1aa43ff2af186c.jpg'])
      // this.formData.photoUrl = ['https://static.peixunyun.cn/1d348baba51f4026ad1aa43ff2af186c.jpg',
      //   'https://static.peixunyun.cn/1d348baba51f4026ad1aa43ff2af186c.jpg']
      this.$refs.jsonBox.setData(this.formData)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
