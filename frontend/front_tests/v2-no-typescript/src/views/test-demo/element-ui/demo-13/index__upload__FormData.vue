<template>
  <div>
    <el-form>
      <el-form-item label="选择文件：">
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="onChange"
          :show-file-list="false"
          multiple
          :auto-upload="false"
        >
          <div class="up-btn">
            <!-- <img src="@/assets/images/dialog/broadSystem/up-load.png" alt="" /> -->
            <span>点击上传</span>
          </div>
        </el-upload>
        <!-- <div class="file-list" v-for="(v, i) in fileList" :key="i">
        <img
          src="@/assets/images/dialog/broadSystem/gl.png"
          alt=""
          class="gl"
        />
        <span class="file-name">{{ v.name }}</span>
        <img
          src="@/assets/images/dialog/broadSystem/gb.png"
          alt=""
          class="gb"
          @click="delFile(i)"
        />
      </div> -->
      </el-form-item>
    </el-form>

    <div class="button" @click="submit">确定</div>
  </div>
</template>

<script>
export default {
  name: 'TestElementUiDemo13View',
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    onChange(file, fileList) {
      // const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      // 这里我需要上传mp3文件，所以做了限制
      // const extension = testmsg === 'mp3'
      // if (!extension) {
      //   this.$message({
      //     message: '上传文件只能是mp3格式!',
      //     type: 'warning'
      //   })
      //   return
      // }

      // 将选取的文件拿到，这里需要根据自己业务来写
      this.fileList[0] = file
    },
    submit() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
        return
      }
      // 自定义上传
      const form = new FormData()

      console.log(this.fileList[0])

      // 将选取的文件插入formdata中
      form.append('file', this.fileList[0].raw)

      // console.log(form)
      for (const value of form.values()) {
        console.log(value)
      }

      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })

      // 调用上传接口
      // upload(form, this.gid, this.token)
      //   .then((res) => {
      //     loading.close()
      //     if (res.result == 200) {
      //       this.$message.success('上传成功')
      //       this.isShow = false
      //       this.$parent.getMusicList()
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     loading.close()
      //     this.$message.error('上传失败')
      //   })
    }
  }
}
</script>
