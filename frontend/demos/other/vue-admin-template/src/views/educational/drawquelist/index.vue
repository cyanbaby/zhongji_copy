<template>
<d2-container>
    <template slot="header">
      <span class="page-title">{{this.$route.meta.title}}</span>
    </template>
    <d2-crud-x
    ref="d2Crud"
    v-bind="_crudProps"
    v-on="_crudListeners"
    style="width:100%"
    @importBtn="importBtn"
    @drawBtn="drawBtn"
    @exportBtn="exportBtn"
    >
        <div slot="header">
            <crud-search
              ref="search"
              :options="crud.searchOptions"
              @submit="handleSearch"
            />
            <el-button
            size="small"
            type="primary"
            @click="addRow"
            >新增
            </el-button>
        </div>
    </d2-crud-x>
    <el-dialog
    title="批量导入"
    :visible.sync="importVisible"
    :close-on-click-modal=false
    width="35%"
     >
    <el-form
      ref="ruleForm"
      :model="form"
      style="width: 60%;display: inline-block;float: left;"
    >
      <el-form-item
        label="请选择需要导入的文件"
        prop="upload"
        class="upload"
      >
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="importStudentApi"
          :headers="{
            Authorization: jtoken,
            OpDomain:opDomain
          }"
          :data="{
            activityId:activityId
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
      </el-form-item>
    </el-form>
    <el-link
        type="primary"
        style="display:inline-block; float: left; margin-top: 10px;"
        @click="downloade"
      >
        点击此处下载模板
    </el-link>

    <span slot="footer" class="dialog-footer">
      <el-button @click="importStudent" style="margin-right:40%">点击上传</el-button>
    </span>
  </el-dialog>
</d2-container>
</template>
<script>
import util from '@/libs/util'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { globalOpdomain } from '@/utils/index'
const { promiseBaseUrl } = document.querySelector('body').dataset
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      importVisible: false,
      form: {
        file: '',
        id: ''
      },
      importStudentApi: (promiseBaseUrl || process.env.VUE_APP_API) + '/teachservice/draw/importstusample',
      opDomain: globalOpdomain(),
      activityId: '',
      fileList: [],
      errMsg: [],
      fileName: null
    }
  },
  // 监听模态框的关闭清除数据
  watch: {
    importVisible (val) {
      if (val === false) {
        this.fileList = []
        this.errMsg = []
      }
    }
  },
  computed: {
    jtoken () {
      return util.cookies.get('token')
    }
  },
  created () {

  },
  methods: {
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return this.$api.QUERY_ACTIVITY(query)
    },
    // 新增
    addRequest (row) {
      return this.$api.ADD_ACTIVITY(row)
    },
    delRequest (row) {
      return this.$api.DEL_ACTIVITY({ activityId: row.activityId })
    },
    importBtn ({ row }) {
      this.activityId = row.activityId
      this.importVisible = true
    },
    /**
     * 下载模板
     */
    downloade () {
      window.location = 'https://filejnzx.peixunyun.cn/%E6%A0%B7%E6%9C%AC%E6%A8%A1%E6%9D%BF.xls'
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
      console.log('导入样本上传:', res)
      const { code, msg } = res
      if (code === '1') {
        this.form.file = ''
        this.importVisible = false
        this.$notify({
          title: '提示',
          message: '导入样本成功！',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: msg,
          type: 'warning'
        })
      }
    },
    // 限制上传文件个数
    handleExceed (files, fileList) {
      console.log(files, fileList)
      this.$message.warning('当前只允许上传1个文件')
    },
    // 点击上传回调
    importStudent () {
      if (this.form.file === '') {
        this.$message.warning('请选择上传文件')
      } else {
        this.$nextTick(() => {
          this.$refs.upload.submit()
        })
      }
    },
    // 开始抽签
    drawBtn ({ row }) {
      const url = this.$router.resolve({
        path: '/drawque',
        query: {
          activityId: row.activityId,
          activityName: row.activityName
        }
      })
      window.open(url.href)
    },
    // 导出抽签结果
    exportBtn ({ row }) {
      this.$api.IMPORT_RESULT({
        activityId: row.activityId
      }).then(res => {
        window.location = res.data
      })
    }
  }
}
</script>
