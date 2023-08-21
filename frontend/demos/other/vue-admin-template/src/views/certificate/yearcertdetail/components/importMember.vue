<!--
 * @Author: your name
 * @Date: 2021-04-13 15:19:01
 * @LastEditTime: 2021-07-19 17:19:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \p-front-admin\src\views\examination\subject\components\importStudent.vue
-->
<template>
  <el-dialog
  title="导入发证名单"
  :before-close="handleClose"
  :visible.sync="dialogMember"
  width="60%">
    <p class="rules">
      规则说明：<br>
      1.新导入的发证名单，如未注册，则会默认以手机号创建一个账号，密码：123456<br>
      2. 身份证号与手机号为唯一字段，不可重复导入<br>
    </p>
    <p class="rules margin-top-20">
     操作说明：<br>
      1. 操作完成之前，请不要关闭本页面<br>
      2. 导入的模板格式，请
      <el-link
        type="primary"
        style="display:inline-block"
        @click="downloade"
      >
        点击下载模板
      </el-link>
      ，并严格按照格式填入信息
    </p>
    <el-form
      ref="ruleForm"
      class="margin-top"
      :model="form"
    >
      <el-form-item
        label="请选择需要导入的文件"
        prop="upload"
        class="upload"
      >
        <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          :headers="{
            Authorization: jtoken,
            OpDomain: opDomain
          }"
          :data="{
            ucId:form.ucId
            //appId:appId,
          }"
          accept=".xlsx, .xls"
          :before-remove="beforeRemove"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :auto-upload="false"
          :file-list="fileList"
        >
          <el-button size="small">
            <i class="el-icon-upload2" />上传Excel
          </el-button>
        </el-upload>
        <!-- <div class="warning-msg ">
            * 支持扩展名：.xls .xlsx， 登录名为手机号，默认密码为123456
          </div> -->
      </el-form-item>
    </el-form>

    <div
      slot="footer"
      style="text-align:center"
    >
      <el-button
        type="warning"
        @click="submitSuccess"
      >
        导入数据
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
/* eslint-disable */ 

import util from '@/libs/util'
import { globalOpdomain } from '@/utils/index'
const { promiseBaseUrl } = document.querySelector('body').dataset

export default {
  data () {
    return {
      // dialogMember: false,
      form: {
        file: '',
        ucId: ''
      },
      importStudentApi: (promiseBaseUrl || process.env.VUE_APP_API) + '/live/importaudience', // /examservice/examenter/importexamenter
      fileList: [],
      fileName: null,
      errMsg: [],
      taskId: '',
      appId: util.cookies.get('appId'),
      opDomain: ''
    }
  },
  props: {
    dialogMember: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    jtoken () {
      return util.cookies.get('token')
    }
  },

  // 监听模态框的关闭清楚数据
  watch: {
    dialogMember (val) {
      if (val === false) {
        this.fileList = []
        this.errMsg = []
      }
    }
  },
  mounted () {
    const domain = location.host
    this.opDomain = globalOpdomain()
  },

  methods: {
    handleClose (done) {
      this.$emit('handleCanel')
    },
    // 上传中
    // handleProgress () {
    //   const loadingInstance = Loading.service({ fullscreen: true, text: '上传中...' })
    //   this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    //     loadingInstance.close()
    //   })
    // },
    async show (id) {
      // this.dialogMember = true
      this.form.certId = id
      // 创建任务| 后端创建任务
      // const { data } = await this.$api
      //   .ADD_TASK({
      //     name: `${row.examName}导入学员`, // 任务名称
      //     taskType: '1' // 1导入，2导出
      //   })

      // this.taskId = data
    },

    // 限制上传文件个数
    handleExceed (files, fileList) {
      console.log(files, fileList)
      this.$message.warning('当前只允许上传1个文件')
    },

    // 删除前的判断
    beforeRemove (file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 删除成功的 文件列表清0
    handleRemove () {
      this.form.file = ''
      this.errMsg = []
    },

    // 上传前的判断
    beforeUpload (file) {
      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.warning('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      this.form.file = file
    },

    // 不需要用户点击校验

    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange (file, fileList) {
      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        return false
      }
      this.form.file = file.raw
      this.fileList = fileList.slice(-1)
      this.fileName = file
    },

    // 上传成功的钩子函数
    handleSuccess (res) {
      console.log('导入会员上传:', res)

      const { code } = res
      if (code === '1') {
        this.form.file = ''
        this.dialogMember = false

        this.$notify({
          title: '提示',
          message: '创建成功',
          type: 'success'
        })
        this.$emit('doRefresh')
      } else {
        this.$notify({
          title: '提示',
          message: '导入失败!',
          type: 'warning'
        })
      }
    },

    // 点击上传回调
    submitSuccess () {
      if (this.form.file === '') {
        this.$message.warning('请选择上传文件')
      } else {
        this.$nextTick(() => {
          this.$emit('uploadClick', this.form)
          // this.$refs.upload.submit()
        })
      }
    },

    // 校验数据
    validateData () {
      if (this.form.file === '') {
        this.$message.warning('请选择上传文件')
      } else {
        this.$nextTick(() => {
          // this.$refs.upload.submit()
          this.$emit('uploadClick', this.form)
          // 不能走submit方法，无法二次提交
        })
      }
    },

    /**
     * 下载模板
     */
    downloade () {
      window.location = 'https://static.peixunyun.cn/导入发证名单.xlsx'
    }
  }
}
</script>
<style lang="scss">
.rules {
  color: #101010;
  line-height: 24px;
  font-size: 14px;
}
.errMsg-list {
  display: flex;
  flex-wrap: wrap;
  line-height: 26px;
  font-size: 12px;
  color: red;
  li {
    margin-right: 15px;
  }
}
</style>
