<template>
<div>
    <el-form :model="resourceform" ref="resourceform" label-width="80px">
        <el-form-item label="上传到">
          <!-- 级联目录 -->
          <el-cascader
            v-model="resourceform.dirId"
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
        <el-form-item :label="resourceName" style="margin-top: 10px;">
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
          :accept="resourceSuffix"
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
      default: function () {
        return []
      }
    },
    uploadCode: {
      type: String,
      default: ''
    },
    resourceName: {
      type: String,
      default: ''
    },
    resourceSuffix: {
      type: String,
      default: ''
    },
    resourceType: {
      type: String,
      default: 'media'
    },
    resourceBindId: {
      type: String,
      default: ''
    }

  },
  data () {
    return {
      resourceform: {
        dirId: ''
      },
      progressInfoMap: { }, // 进度map
      fileList: [], // 选定的文件列表
      progressGroupVisible: true,
      suffixTypes: this.getSuffixTypesFromResourceSuffix(),
      bindId: ''
    }
  },
  mounted () {
    this.bindId = this.resourceBindId
  },
  watch: {
    resourceBindId (newVal) {
      this.bindId = newVal
    }
  },
  methods: {
    getSuffixTypesFromResourceSuffix () {
      return this.resourceSuffix.split(',')
    },
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
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
      if (this.suffixTypes.indexOf(fileSuffix) === -1) {
        this.$message.warning('上传文件只能是{}格式', this.resourceSuffix)
        return false
      } else {
        return true
      }
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
          var dirId = this.resourceform.dirId[this.resourceform.dirId.length - 1]
          var resourceBindId = this.bindId
          this.$emit('dirSelect', dirId)
          const fileSize = file.file.size
          const fileName = file.file.name
          this.$api.GETTOKEN({
            fileSize,
            fileName,
            md5,
            dictTypeCode: 'material',
            fileType: this.resourceType,
            dirId,
            uploadCode: this.uploadCode
          }).then(data => {
            data = data.data
            if (typeof data === 'string') {
              this.$notify({
                title: '提示',
                message: fileName + '上传' + '成功',
                type: 'success'
              })
              this.$emit('uploadComplete', { dirId, url: data, resourceBindId })
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
                  _this.$refs.progressGroup.putProgress(fileName, currentProgress)
                },
                error: err => {
                  // 失败
                  // this.$message. warning('上传失败' + err.message)
                  console.log('上传失败:', err.message)
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
                    this.$emit('uploadComplete', { dirId: dirId, url: response.data, resourceBindId: resourceBindId })
                    // _this.clearPercentInfoMap()
                  }
                }
              }
              observable.subscribe(observer) // 上传开始
            }
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
