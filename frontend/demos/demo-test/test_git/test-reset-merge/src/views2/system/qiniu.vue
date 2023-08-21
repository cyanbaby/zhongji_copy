<template>
  <div>

    <el-form :model="uploadForm">
      <el-form-item label="">
        <el-upload
          ref="uploadForm"
          :multiple="true"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-change="handleFileChange"
          :on-remove="handleRemove"
          :http-request="uploadFile"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as qiniu from 'qiniu-js'
export default {
  data () {
    return {
      file: ''
    }
  },
  methods: {
    // 上传文件，获取文件流
    handleFileChange (file) {
      console.log('上传文件', file)
      this.file = file.raw
    },
    handleRemove (file, fileList) {
      this.file = ''
    },
    beforeUpload (file) {

    },
    submitUpload () {
      if (this.file !== '') {
        this.$refs.uploadForm.submit()
      } else {
        this.$message({
          message: '请先选择文件!',
          type: 'warning',
          duration: '2000'
        })
      }
    },
    // 自定义上传
    async uploadFile () {
      const putExtra = {
        fname: '',
        params: {},
        mimeType: null
      }
      const config = {
        region: '',
        chunkSize: 10,
        forceDirect: false
      }

      const { data } = await this.$api.GETTOKEN({
        fileSize: this.file.size,
        fileName: this.file.name,
        uploadCode: 'uploadCode'
      })
      // 自动切片了。。完美
      const observable = qiniu.upload(
        this.file, // 文件数组
        data.qiniu.key,
        data.qiniu.token,
        putExtra,
        config
      ); const observer = {
        next: response => {
          if (Math.floor(response.total.percent) >= 100) {
            // clearInterval(that.Interval)
            console.log(Math.floor(response.total.percent))
          }// console.log(response);
          console.log(`上传进度${Math.floor(response.total.percent)}%`)
        },
        error: err => {
          // 失败
          // this.$message. warning('上传失败' + err.message)
          console.log('上传失败:', err.message)
        },
        complete: response => {
          console.log('上传完成:', response)
        }
      }
      observable.subscribe(observer) // 上传开始
    }
  }
}
</script>
