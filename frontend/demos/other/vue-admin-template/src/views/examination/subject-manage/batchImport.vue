<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\question-manage\index.vue
-->
<template>
  <d2-container>
    <template slot="header">
      <span class="page-title">批量导入</span>
    </template>
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <el-row>
        <el-col :span="15">
          <el-form-item label="分类" prop="catalogId">
            <el-cascader
              v-model="form.catalogId"
              :options="list"
              style="width: 100%"
              :props="{
                label: 'catValue',
                value: 'testSubjectCatId',
                children: 'treeChild',
                checkStrictly: true,
              }"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="">
          <p>规则说明：</p>
          <p>1.请按模板的格式整理数据</p>
          <p>2.一次最多只能导入200道试题</p>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="请选择需要导入的文件">
          <el-upload
            class="upload"
            ref="upload"
            :action="uploadUrl"
            :on-success="onSuccess"
            :on-error="onError"
            :auto-upload="false"
            :multiple="false"
            :data="param"
            limit=1
            :headers="{
              Authorization: token,
              OpDomain: opDomain
            }"
            accept=".xlsx, .xls">
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
          <div>
            <a href="https://static.peixunyun.cn/系统试题导入模板.xlsx">点击此处下载模板</a>
          </div>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="">
          <el-button size="small" type="primary" @click="doImport()">点击上传</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
import { globalOpdomain } from '@/utils/index'
import { mapActions } from 'vuex'
const { promiseBaseUrl } = document.querySelector('body').dataset
export default {
  data () {
    const catalogIdValid = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择分类'))
      } else {
        callback()
      }
    }
    return {
      opDomain: globalOpdomain(),
      uploadUrl: '',
      token: util.cookies.get('token'),
      form: {},
      file: '',
      param: '',
      list: [],
      rules: {
        catalogId: [
          { required: true, message: '请选择分类', validator: catalogIdValid, trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.list = JSON.parse(localStorage.getItem('subjectTree'))
  },
  watch: {},
  methods: {
    ...mapActions('d2admin/page', ['close']),
    onSuccess (res) {
      if (res.code == 1) {
        this.$notify({
          title: '提示',
          message: '导入成功!',
          type: 'success'
        })
        const tagName = this.$route.fullPath
        this.close({ tagName }).then(item => {
          this.$router.push({
            path: '/examination/subject_manage'
          })
        })
      } else {
        this.$notify({
          title: '提示',
          message: res.msg,
          type: 'error'
        })
      }
    },
    onError (res) {
      this.$notify({
        title: '提示',
        message: '导入失败!',
        type: 'error'
      })
    },
    doImport () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.param = { catalogId: this.form.catalogId[this.form.catalogId.length - 1] }
          this.uploadUrl = `${promiseBaseUrl || process.env.VUE_APP_API}/examservice/subject/import`
          this.$nextTick(() => {
            this.$refs.upload.submit()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.upload {
    display: inline-block;
}
</style>
