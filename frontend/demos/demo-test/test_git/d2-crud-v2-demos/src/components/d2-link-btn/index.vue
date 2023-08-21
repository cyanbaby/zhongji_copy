<template>
  <el-button-group>
    <el-button v-if="title" size="mini" @click="$open(link)">{{title}}</el-button>
    <el-button size="mini" @click="$open(link)">
      {{link}}
    </el-button>
  </el-button-group>
</template>

<script>
export default {
  name: 'd2-link-btn',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    link: {
      type: String,
      required: false,
      default: 'https://github.com/d2-projects'
    }
  }
}
</script>
