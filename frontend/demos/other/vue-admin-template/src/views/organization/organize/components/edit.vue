<template>
  <div v-loading="maskLoading">
    <el-form ref="form"
             style="width: 600px"
             :model="form"
             :rules="rules"
             label-width="120px">
      <el-form-item label="组织全称："
                    prop="orgFullName">
        <el-input v-model="form.orgFullName"
                  placeholder="请输入组织全称" />
      </el-form-item>
      <el-form-item label="组织简称："
                    prop="orgShortName">
        <el-input v-model="form.orgShortName"
                  placeholder="请输入组织简称" />
      </el-form-item>
      <el-form-item label="机构logo："
                    prop="orgIconUrl">
        <div class="avatar-uploader"
             @click="upload"
             v-if="!form.orgIconUrl">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <div v-else
             @click="upload">
          <img :src="form.orgIconUrl"
               style="width:60px;" />
        </div>
      </el-form-item>
      <el-form-item label="地址："
                    prop="addressCodeList">
        <el-row>
          <el-col :span="24">
            <el-cascader ref="manageArea"
                         v-model="form.addressCodeList"
                         style="width:100%"
                         :props="props"
                         :options="OptionS"
                         placeholder="请选择地址"
                         @change="handleChange"
                         filterable />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="详细地址："
                    prop="addressDetail">
        <el-input v-model="form.addressDetail"
                  placeholder="请输入详细地址" />
      </el-form-item>

      <el-form-item label="组织类型："
                    prop="orgType">
        <el-select v-model="form.orgType"
                   placeholder="请选择"
                   style="width:100%">
          <el-option v-for="item in optionsorgType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="管理员姓名："
                    prop="managerName">
        <el-input v-model="form.managerName"
                  placeholder="请输入管理员姓名"
                  disabled />
      </el-form-item>
      <el-form-item label="管理员手机号："
                    prop="managerMobile">
        <el-input v-model="form.managerMobile"
                  placeholder="请输入管理员手机号"
                  disabled />
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 40px;"
                   type="primary"
                   @click="saveEdit">保存</el-button>
        <el-button style="margin-left: 20px;"
                   @click="resetEdit">取消</el-button>
        <el-button style="margin-left: 20px;"
                   @click="changeRole">更换管理员</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="上传图片"
               :visible.sync="imgUploadDialog"
               width="800px"
               :close-on-click-modal=false>
      <resource-uploader-v2 ref="pictureResourceUploader"
                            resource-name="图片"
                            upload-code="Upload-portal-cover"
                            :show-upload-button="true"
                            :show-select-dir="true"
                            :select-dir-by-suffix="true"
                            :show-label="true"
                            file-type="img"
                            @uploadComplete="uploadComplete" />
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */ 

export default {
  watch: {
    'form.orgFullName': {
      handler (newval) {
        this.form.orgShortName = newval
      }
    },
    selectOrgInfo: {
      handler (newval) {
        this.form.addressCodeList = []
        newval.provinceCode ? this.form.addressCodeList.push(newval.provinceCode - 0) : ''
        newval.cityCode ? this.form.addressCodeList.push(newval.cityCode - 0) : ''
        newval.areaCode ? this.form.addressCodeList.push(newval.areaCode - 0) : ''
        newval.streetCode ? this.form.addressCodeList.push(newval.streetCode - 0) : ''
      },
      deep: true,
      immediate: true

    }
  },
  props: {
    selectOrgInfo: {},
    optionsorgType: []
  },
  data () {
    return {
      OptionS: '',
      maskLoading: false,
      props: {
        // expandTrigger: 'hover',
        checkStrictly: true,
        value: 'areaCode',
        label: 'name'
      },
      form: JSON.parse(JSON.stringify(this.selectOrgInfo)),
      defaultFormData: {},
      rules: {
        orgFullName: [
          { required: true, message: '请输入组织全称', trigger: 'blur' }
        ],
        addressCodeList: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        orgShortName: [
          { required: true, message: '请输入组织简称', trigger: 'blur' }
        ],
        orgIconUrl: [
          { required: true, message: '请上传组织logo', trigger: 'blur' }
        ],
        orgType: [{
          required: true,
          message: '请选择组织类型',
          trigger: 'change'
        }],
        managerName: [{
          required: true,
          message: '请输入管理者姓名',
          trigger: 'blur'
        }],
        managerMobile: [{
          required: true,
          message: '请输入管理者手机号',
          trigger: 'blur'
        }]
      },
      imgUploadDialog: false,
      orgId: ''
    }
  },
  created () {
    this.defaultFormData = JSON.parse(JSON.stringify(this.form))
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  methods: {
    // lazyLoad (node, resolve) {
    //   if (node.children && node.children.length > 0) {
    //     node.children = []
    //   }
    //   setTimeout(() => {
    //     const { level } = node
    //     if (level == 0) {
    //       node.value = 0
    //     }
    //     this.$api.getArea({ parentCode: node.value }).then(res => {
    //       const province = res.data.map((value, i) => ({
    //         value: value.areaCode,
    //         label: value.name,
    //         leaf: level >= 3
    //       }))
    //       resolve(province)
    //     })
    //   })
    // },
    saveEdit () {
      this.maskLoading = true
      this.$api.SETTING_EDIT({
        ...this.form
      }).then(() => {
        this.$message({
          message: '组织信息修改成功',
          type: 'success'
        })
        this.$emit('isChangeView', true)
        this.form = JSON.parse(JSON.stringify(this.defaultFormData))
        this.maskLoading = false
      }).catch(() => {
        this.maskLoading = false
      })
    },
    resetEdit () {
      this.$emit('isChangeView', true)
      this.form = JSON.parse(JSON.stringify(this.defaultFormData))
    },
    // 转省市区编码,只提交最后一位
    handleChange (val) {
      // const panelRefs = this.$refs.manageArea.$refs.panel
      // panelRefs.lazyLoad(panelRefs.getCheckedNodes()[0])
      this.form.addressCode = val[val.length - 1]
      const data = this.$refs.manageArea.getCheckedNodes()[0]
      data.path[0] ? this.form.provinceCode = data.path[0] : ''
      data.path[1] ? this.form.cityCode = data.path[1] : ''
      data.path[2] ? this.form.areaCode = data.path[2] : ''
      data.path[3] ? this.form.streetCode = data.path[3] : ''
      data.pathLabels[0] ? this.form.province = data.pathLabels[0] : ''
      data.pathLabels[1] ? this.form.city = data.pathLabels[1] : ''
      data.pathLabels[2] ? this.form.area = data.pathLabels[2] : ''
      data.pathLabels[3] ? this.form.street = data.pathLabels[3] : ''
    },
    upload () {
      this.imgUploadDialog = true
      this.$nextTick(params => {
        this.$refs.pictureResourceUploader.clearFiles()
      })
    },
    uploadComplete (params) {
      this.imgUploadDialog = false
      this.form.orgIconUrl = params.url
    },
    changeRole () {
      this.$emit('changeRole', true)
    }
  }
}
</script>
<style scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.warning-msg {
  color: #fba549;
  font-size: 12px !important;
  margin: 0;
  font-style: normal;
}
</style>
