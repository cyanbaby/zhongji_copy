<template>
<div>
    <el-form :model="videoform" ref="videoform" label-width="90px">
        <el-form-item label="上传到">
          <!-- 级联目录 -->
          <el-cascader
            v-model="videoform.dirId"
            :options="memuData"
            :change="handleChange"
            :props="{
              label: 'dirName',
              value: 'dirId',
              children: 'subDirList',
              checkStrictly: true
            }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="本地视频" style="margin-top: 10px;">
         <el-upload
          :drag="true"
          ref="uploadForm"
          action=''
          :show-file-list="false"
          :multiple="false"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-change="handleFileChange"
          :on-remove="handleRemove"
          :http-request="uploadFile"
          :auto-upload="false"
          :on-progress="uploadVideoProcess"
          accept=".mp4"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <progress-group v-if= "progressGroupVisible" ref="progressGroup">
          </progress-group>
        </el-form-item>
      </el-form>
</div>
</template>
<script>
/* eslint-disable */ 

import * as qiniu from 'qiniu-js'
import ProgressGroup from './progress-group.vue'
import BMF from 'browser-md5-file'

export default {
  components: {
    ProgressGroup
  },
  props: {
    memuData: {
      type: Array,
      default: null
    },
    uploadCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      videoform: {
        dirId: ''
      },
      progressInfoMap: { }, // 进度map
      fileList: [], // 选定的文件列表
      progressGroupVisible: true
    }
  },
  methods: {
    handleChange (value) {
      console.log('dirselected:', value)
    },
    clearFiles () {
      this.fileList = []
      this.$nextTick(function () {
        this.$refs.progressGroup.clearAll()
      })
    },
    doUpload () {
      this.$refs.uploadForm.submit()
    },
    updateProgresGroup (fileList) {
      const fileNames = fileList.flatMap(file => file.name)
      this.$refs.progressGroup.updateProgressGroup(fileNames)
    },
    handleFileChange (file, fileList) {
      this.updateProgresGroup(fileList)
      this.$emit('changeFileList', fileList)
    },
    handleRemove (file, fileList) {
      this.updateProgresGroup(fileList)
      this.$emit('changeFileList', fileList)
    },
    beforeUpload (file) {
      if (file.type === 'video/mp4') {
        return true
      } else {
        this.$message({
          type: 'warning',
          message: '目前只支持mp4格式视频上传'
        })
        return false
      }
    },
    clearPercentInfoMap () {
      this.progressInfoMap = {}
    },
    putPercentIntoMap (key, percent) {
      this.progressInfoMap.key = percent
      console.log('putInfo:', key, '==>', percent)
    },
    removeFromMap (key) {
      delete this.progressInfoMap.key
    },
    uploadVideoProcess (event, file, fileList) { // 不会被调用
      this.putPercentIntoMap(file.name, event.percent) // 动态获取文件上传进度
      if (this.loadProgress(file.name) >= 100) {
        setTimeout(this.removeFromMap(file.name), 1000) // 一秒后关闭进度条
      }
    },
    loadProgress (key) {
      return this.progressInfoMap.key
    },
    // 自定义上传
    uploadFile (file) {
      const _this = this
      const bmf = new BMF()
      bmf.md5(
        file.file,
        (err, md5) => {
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
          var dirId = this.videoform.dirId[this.videoform.dirId.length - 1]
          this.$emit('dirSelect', dirId)
          const fileSize = file.file.size
          const fileName = file.file.name
          this.$api.GETTOKEN({
            fileSize,
            fileName,
            dictTypeCode: 'material',
            fileType: 'media',
            md5,
            dirId,
            uploadCode: this.uploadCode
          }).then(data => {
            data = data.data
            if (data.fileUrl) {
              this.$notify({
                title: '提示',
                message: fileName + '上传' + '成功',
                type: 'success'
              })
            } else {
              // 自动切片了。。完美
              const observable = qiniu.upload(
                file.file,
                data.qiniu.key,
                data.qiniu.token,
                putExtra,
                config
              )
              const observer = {
                next: response => {
                  var currentProgress = Math.floor(response.total.percent)
                  if (Math.floor(response.total.percent) >= 100) {
                    // clearInterval(that.Interval)
                    currentProgress = 100
                  }// console.log(response);
                  console.log(`上传进度${currentProgress}%`)
                  _this.putPercentIntoMap(fileName, currentProgress)
                  _this.$refs.progressGroup.putProgress(fileName, currentProgress)
                },
                error: err => {
                  // 失败
                  // this.$message. warning('上传失败' + err.message)
                  console.log('上传失败:', err.message)
                  _this.clearPercentInfoMap()
                },
                complete: response => {
                  console.log('上传完成:', response)
                  if (response.code === '1') {
                  // this.videoUploadShow = false
                    this.$notify({
                      title: '提示',
                      message: fileName + '上传' + '成功',
                      type: 'success'
                    })
                    // this.$emit('refresh', dirId)
                    // _this.clearPercentInfoMap()
                  }
                }
              }
              observable.subscribe(observer) // 上传开始
            }
          })
        })
    }
  },
  watch: {
    // videoform: {
    //   handler: function (newVal, oldVal) {
    //     debugger
    //     if (newVal.dirId !== oldVal.dirId) {
    //       this.$emit('dirSelect', newVal.dirId)
    //     }
    //   }
    // }
  //   progressInfoMap: {
  //     handler: function (newVal, oldVal) {
  //       console.log('a.mp4=>', this.loadProgress('a.mp4'))
  //       console.log('b.mp4=>', this.loadProgress('b.mp4'))
  //       console.log('c.mp4=>', this.loadProgress('c.mp4'))
  //       console.log('d.mp4=>', this.loadProgress('d.mp4'))
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  }
}
</script>
<style lang="scss" scoped>

</style>
