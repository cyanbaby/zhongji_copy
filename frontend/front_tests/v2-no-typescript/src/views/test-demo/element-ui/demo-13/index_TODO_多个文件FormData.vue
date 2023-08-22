
<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-change="onChange"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :auto-upload="false"
    >
      点击上传
    </el-upload>
    <br>
    <div class="button" @click="submit">确定</div>
  </div>
</template>
<script>
// TODO index__upload__FormData 示例里  如果上传 多个文件呢？
export default {
  name: 'TestElementUiDemo13View',
  data() {
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    submit() {
      console.log(this.fileList)
      // if (this.fileList.length === 0) {
      //   this.$message.warning('请上传文件')
      //   return
      // }
      // // 自定义上传
      // const form = new FormData()

      // console.log(this.fileList[0])

      // // 将选取的文件插入formdata中
      // form.append('file', this.fileList[0].raw)

      // // console.log(form)
      // for (const value of form.values()) {
      //   console.log(value)
      // }
    }
  }
}
</script>
