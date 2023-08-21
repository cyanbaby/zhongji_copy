<template>
<d2-container>
    <template slot="header">
      <span class="page-title">{{title}}</span>
    </template>
    <el-form :model="classManage" :rules="classManageRules" ref="classManage" label-width="90px">
        <el-form-item label="班级名称" style="width:480px" prop="className">
            <el-input v-model="classManage.className" placeholder="请输入班级名称"></el-input>
        </el-form-item>

        <!-- <el-form-item
        label="班级分类"
        v-for="(item,index) in classManage.classifyList"
        :key="index"
        :prop="'classifyList.'+index+'.classify'"
        :rules="{ required: true, message: '请选择班级分类', trigger: 'change' }"
        >
            <el-cascader
            v-model="item.classify"
            :options="menu"
            @change="handleChange"
            placeholder="请选择班级分类"
            class="classify"
            :props="menuProps"
            ref="item.classify"
            :show-all-levels="false"
            >
            </el-cascader>
            <i class="el-icon-circle-plus-outline" @click="addClassify"></i>
            <i class="el-icon-remove-outline" @click.prevent="removeClassify(item)"></i>
        </el-form-item> -->
        <el-form-item label="班级分类" style="width:480px" prop="catIds">
            <el-cascader
            ref="cascaderRef"
            v-model="classManage.catIds"
            :options="catalogue"
            :props="menuProps"
            clearable
            style="width:100%"
            @change="nodeChange"
            >
        </el-cascader>
        </el-form-item>
        <el-form-item label="班级封面" prop="coverImgUrl">
            <el-image
            class="classImg"
            :src="classManage.coverImgUrl"
            @click="upload"
            >
            <span
            slot="error"
            class="avatar-uploader"
            @click="upload"
            >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            </span>
            </el-image>
        </el-form-item>
        <el-form-item label="年度" prop="classYear">
              <el-date-picker
                   @change="changeYear"
                   v-model="classManage.classYear"
                   type="year"
                   value-format="yyyy"
                   placeholder="选择年">
                 </el-date-picker>
        </el-form-item>
        <el-form-item label="班级介绍" prop="classMemo">
              <vue-rich-text-editor v-model="classManage.classMemo" :max-word-count="4000">
              </vue-rich-text-editor>
        </el-form-item>
        <el-form-item style="margin-left:40%">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        <el-dialog title="上传图片" :visible.sync="imgUploadDialog" width="650px" :close-on-click-modal=false>
          <resource-uploader-v2
            ref="pictureResourceUploader"
            v-model="classManage.coverImgUrl"
            resource-name="图片"
            upload-code="Upload-file-img"
            :show-upload-button="true"
            :show-select-dir="true"
            :select-dir-by-suffix="true"
            :show-label="true"
            file-type="img"
            resource-bind-id='test'
            @uploadComplete="uploadComplete"
          />
        </el-dialog>
    </el-form>
</d2-container>
</template>
<script>
import vueRichTextEditor from '@/components/rich-editor/vue-rich-text-editor.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    vueRichTextEditor
  },
  data () {
    return {
      title: '',
      classManage: {
        classYear: '',
        className: '', // 班级名称
        /* classifyList: [{
          classify: ''
        }], */
        catIds: [],
        // coverImgUrl: 'http://www.qq.com/404-2.gif',
        coverImgUrl: '',
        classMemo: ''
      },
      menu: [],
      catalogue: [],
      menuProps: {
        multiple: true,
        checkStrictly: true,
        label: 'catValue',
        value: 'catId',
        children: 'treeChild'
      },
      imgUploadDialog: false,
      classManageRules: {
        className: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
        ],
        catIds: [
          { required: true, message: '请选择班级分类', trigger: 'change' }
        ],
        coverImgUrl: [
          { required: true, message: '请上传班级封面', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getMenuTree()
    this.editShow()
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    // 查询班级分类目录
    getMenuTree () {
      this.$api.GET_CLASSIFY_LIST().then(res => {
        this.catalogue = res.data
      })
    },
    changeYear (value) {
      console.log(this.classManage.classYear)
    },
    // 编辑回显
    editShow () {
      if (this.$route.query.classId) {
        this.$route.meta.title = '编辑班级'
        this.title = '编辑班级'
        this.$api.GET_CLASS_BY_ID({
          classId: this.$route.query.classId
        }).then(res => {
          this.classManage = res.data
          this.classManage.classYear = String(this.classManage.classYear)
          var arr = []
          res.data.classToCategoryVOList.forEach(item => { arr.push(item.catIds) })
          this.$set(this.classManage, 'catIds', arr)
        })
      } else {
        this.$route.meta.title = '创建班级'
        this.title = '创建班级'
      }
    },
    /* addClassify () {
      this.classManage.classifyList.push({
        classify: ''
        // key: Date.now()
      })
    },
    removeClassify (item) {
      var index = this.classManage.classifyList.indexOf(item)
      if (index !== 0) {
        this.classManage.classifyList.splice(index, 1)
      }
    }, */
    upload () {
      this.imgUploadDialog = true
      this.$nextTick(params => {
        this.$refs.pictureResourceUploader.clearFiles()
      })
    },
    uploadComplete (params) {
      this.imgUploadDialog = false
      console.log('文件上传完成：{}', params)
    },
    save () {
      this.$refs.classManage.validate((valid) => {
        if (valid) {
          const val = this.classManage.catIds
          const catIds = []
          val.forEach(res => { catIds.push(res[res.length - 1]) })
          if (this.classManage.classId) { // 编辑
            this.$api.EDIT_CLASSINFO({
              ...this.classManage,
              catIds: catIds
            }).then(() => {
              this.$message({
                message: '班级编辑成功',
                type: 'success'
              })
              const tagName = this.$route.fullPath
              this.close({ tagName }).then(item => { this.$router.push({ path: '/educational/class' }) })
            })
          } else {
            this.$api.ADD_CLASSINFO({
              ...this.classManage,
              catIds: catIds
            }).then(() => {
              this.$message({
                message: '班级创建成功',
                type: 'success'
              })
              const tagName = this.$route.fullPath
              this.close({ tagName }).then(item => { this.$router.push({ path: '/educational/class' }) })
            })
          }
        } else {
          console.log('校验失败')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.classManage.resetFields()
    },
    nodeChange () {
      const val = JSON.parse(JSON.stringify(this.classManage.catIds))
      val.forEach(res => {
        const arr = []
        for (let i = 0; i < res.length - 1; i++) {
          arr.push(res[i])
        }
        console.log('nodeChange -> arr', arr)
        const index = val.findIndex(res => {
          if (res.toString() == arr.toString()) {
            return true
          }
        })
        if (index >= 0) {
          val.splice(index, 1)
          this.$set(this.classManage, 'catIds', val)
        }
      })
    }
  }
}
</script>
<style scoped>
.classify{
    margin-right: 15px;
    width: 400px;
    margin-bottom: 10px;
}
i{
    font-size:20px;
    font-weight: 500;
}
.classImg{
    width:182px;
    height:115px;
    object-fit: cover;
}
.avatar-uploader {
    display: block;
    width: 182px;
    height: 115px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 182px;
    height: 115px;
    line-height: 115px;
    text-align: center;
  }
  .avatar {
    width: 182px;
    height: 115px;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
  }
</style>
