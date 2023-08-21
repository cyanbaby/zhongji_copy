<template>
  <div style="padding:20px; display: flex;">
    <el-tag
      v-for="(tag) in dynamicTags"
      :key="tag.value"
      style="margin-right: 10px"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script>
export default {
  name: 'Test2',
  data() {
    return {
      dynamicTags: [
        { label: '标签一', value: 'test1' },
        { label: '标签二', value: 'test2' },
        { label: '标签三', value: 'test3' },
        { label: '标签四', value: 'test4' },
        { label: '标签五', value: 'test5' },
        { label: '标签六', value: 'test6' },
        { label: '标签七', value: 'test7' },
        { label: '标签八', value: 'test8' },
        { label: '标签九', value: 'test9' },
        { label: '标签十', value: 'test10' }
      ]
      // dynamicTags: ["标签一", "标签二", "标签三", "标签四", "标签五", "标签六"],
    }
  },
  created() {
    setTimeout(() => {
      this.dynamicTags.push({ label: '标签11', value: 'test11' })
    }, 3000)
    setTimeout(() => {
      this.dynamicTags.push({ label: '标签12', value: 'test12' })
    }, 6000)
  },
  methods: {
    handleClose(tag) {
      const index = this.dynamicTags.findIndex(item => item.value === tag.value)
      this.dynamicTags.splice(index, 1)
    }
  }
}
</script>
