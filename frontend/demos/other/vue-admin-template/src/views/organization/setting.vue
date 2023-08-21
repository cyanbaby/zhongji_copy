<template>
  <d2-container>
    <template slot="header">
      <span class="page-title">基本信息</span>
      <!-- <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper> -->
    </template>
    <el-form ref="form"
             style="width: 600px;padding-top: 20px;"
             :model="form"
             :rules="rules"
             label-width="130px">
      <el-form-item label="机构logo"
                    prop="orgIconUrl">
        <el-upload :show-file-list="false"
                   :action="url"
                   :headers="{
            Authorization: token
          }"
                   :on-success="handleAvatarSuccess"
                   class="avatar-uploader">
          <img v-if="form.orgIconUrl"
               :src="form.orgIconUrl"
               width="100"
               height="100" />
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="组织全称"
                    prop="orgFullName">
        <el-input v-model="form.orgFullName"
                  placeholder="请输入组织全称" />
      </el-form-item>
      <el-form-item label="组织简称"
                    prop="orgShortName">
        <el-input v-model="form.orgShortName"
                  placeholder="请输入组织简称" />
      </el-form-item>

      <el-form-item label="地址"
                    prop="addressCode">
        <el-cascader ref="manageArea"
                     v-model="form.addressCode"
                     style="width:100%"
                     :options="OptionS"
                     :props="props"
                     placeholder="请选择地址"
                     @change="selectArea"
                     filterable />
      </el-form-item>
      <el-form-item label="详细地址"
                    prop="addressDetail">
        <el-input v-model="form.addressDetail"
                  placeholder="请输入详细地址" />
      </el-form-item>

      <el-form-item label="类型"
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
      <el-form-item label="管理员姓名"
                    prop="managerName">
        <el-input v-model="form.managerName"
                  placeholder="请输入管理员姓名"
                  disabled />
      </el-form-item>
      <el-form-item label="管理员手机号"
                    prop="managerMobile">
        <el-input v-model="form.managerMobile"
                  placeholder="请输入管理员手机号"
                  disabled />
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel"
                   size="mini"> 取消 </el-button>
        <el-button type="primary"
                   size="mini"
                   @click="editInfo('form')">
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import { isArray } from 'lodash'
import util from '@/libs/util'
const { promiseBaseUrl } = document.querySelector('body').dataset
export default {
  data () {
    return {
      token: util.cookies.get('token'),
      url: `${promiseBaseUrl || process.env.VUE_APP_API}/baseservice/upload/uploadimg`,
      props: {
        // lazy: true,
        // expandTrigger: 'hover',
        checkStrictly: true,
        value: 'areaCode',
        label: 'name'
        // lazyLoad: this.lazyLoad
      },
      form: {
        orgType: '', // 类型
        orgIconUrl: '', // logo
        orgFullName: '', // 组织全称
        orgShortName: '', // 组织简称
        managerName: '', // 管理员姓名
        managerMobile: '', // 管理员手机号
        addressDetail: '', // 详细地址
        addressCode: '', // 省市区联动
        provinceCode: '', // 省-编码
        cityCode: '', // 市-编码
        streetCode: '', // 街道-编码
        areaCode: '' // 区/县-编码
      },
      options: [],
      rules: {
        managerMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        orgFullName: [
          { required: true, message: '请输入组织全称', trigger: 'blur' }
        ],
        orgType: [{ required: true, message: '请输入类型', trigger: 'blur' }],
        addressCode: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        orgShortName: [
          { required: true, message: '请输入组织简称', trigger: 'blur' }
        ],
        orgIconUrl: [
          { required: true, message: '请上传组织logo', trigger: 'blur' }
        ],
        managerName: [
          { required: true, message: '请输入管理员姓名', trigger: 'blur' }
        ],
        addressDetail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      optionsorgType: [],
      OptionS: []
    }
  },
  created () {
    this.getMemberInfo()
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  mounted () {
    this.$api.SETTING_GET_DICT({
      typeCode: 'org_type'
    }).then(res => {
      const list = res.data
      if (isArray(list)) {
        this.optionsorgType = list.map(item => {
          return {
            value: `${item.dictDataValue}`,
            label: `${item.dictDataName}`
          }
        })
      }
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
    // 取消
    cancel () {
      this.getMemberInfo()
    },
    // 上传
    handleAvatarSuccess (val) {
      console.log('上传成功', val)
      if (val.code === '1') {
        this.form.orgIconUrl = val.data
        this.$notify({
          title: '提示',
          message: '上传成功!',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: val.msg,
          type: 'warning'
        })
      }
    },
    getMemberInfo () {
      this.$api.ORG_BASE_GET().then(res => {
        this.form = res.data || {}
        this.form.addressCode = this.form.addressCode.split(',').map(Number)
        console.log(this.form.addressCode)
      })
    },
    editInfo (form) {
      this.form.provinceCode = this.form.addressCode[0]
      this.form.cityCode = this.form.addressCode[1]
      this.form.areaCode = this.form.addressCode[2]
      this.form.streetCode = this.form.addressCode[3]
      console.log(this.form.addressCode)
      const code = this.form.addressCode[this.form.addressCode.length - 1]
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$api.SETTING_EDIT({
            ...this.form,
            addressCode: code
          }).then(() => {
            this.$notify({
              title: '提示',
              message: '修改基本信息成功!',
              type: 'success'
            })
            this.getMemberInfo()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selectArea (val) {
      // const panelRefs = this.$refs.manageArea.$refs.panel
      // panelRefs.lazyLoad(panelRefs.getCheckedNodes()[0])
      this.form.addressCode = val
    }
  }
}
</script>
<style>
.warning-msg {
  color: #fba549;
  font-size: 12px !important;
  margin: 0;
  font-style: normal;
}
</style>
