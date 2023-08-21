<!--
 * @Author: your name
 * @Date: 2021-04-14 12:42:54
 * @LastEditTime: 2021-07-05 20:13:38
 * @LastEditors: 姚文彬
 * @Description: In User Settings Edit
 * @FilePath: \p-front-admin\src\views\user-center\base.vue
-->
<template>
  <div class="edit-account-box">
    <el-dialog v-if="editDialog"
               title="编辑用户信息"
               :visible.sync="editDialog"
               :close-on-click-modal="false"
               width="52%"
               top="1vh">
      <div class="container-box">
        <div class="base-top">
          <!-- TODO 默认头像 -->
          <el-upload :show-file-list="false"
                     :action="url"
                     :headers="{
          Authorization: token,
          OpDomain:opDomain
        }"
                     :on-success="handleAvatarSuccess"
                     :on-error="handleAvatarError">
            <img v-if="info.headPortraitUrl"
                 :src="info.headPortraitUrl"
                 style="width:80px;height:80px" />

            <el-button v-else>
              <i class="el-icon-plus avatar-uploader-icon"></i>
              上传图片
            </el-button>
          </el-upload>

          <div class="name">
            <!-- {{ info.nickName }} -->
          </div>
        </div>
        <el-form ref="form"
                 :model="info"
                 label-width="70px"
                 :rules="rules"
                 style="width:100%">
          <el-row :gutter="24">
            <el-col :span="10"
                    :offset="0">
              <h3 class="item-title">
                详细资料
              </h3>
              <el-form-item label="姓名">
                <el-input v-model="info.cardName"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="info.nickName"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="info.gender">
                  <el-radio :label="1">
                    男
                  </el-radio>
                  <el-radio :label="0">
                    女
                  </el-radio>
                  <el-radio :label="-1">
                    未知
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="info.jobPosition"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item label="身份证号"
                            prop="certNo">
                <el-input v-model="info.certNo"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14"
                    :offset="0">
              <h3 class="item-title">
                联系信息
              </h3>

              <el-form-item label="邮箱"
                            prop="email">
                <el-input v-model="info.email"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item label="手机"
                            prop="mobileNo">
                <el-input v-model="info.mobileNo"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item label="所在地区">
                <el-row>
                  <el-col :span="24">
                    <el-cascader ref="adressRef"
                                 v-model="info.address"
                                 :props="adressProps"
                                 :options="OptionS"
                                 clearable
                                 style="width:100%"
                                 @change="adressChange"
                                 filterable>
                    </el-cascader>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="width:100%;margin:10px 0"></div>
          <el-row :gutter="24">
            <el-col :span="10"
                    :offset="0">
              <h3 class="item-title">
                教育信息
              </h3>

              <el-form-item label="学历">
                <el-select v-model="info.educationLevel"
                           placeholder="请选择"
                           size="small"
                           @change="educationLevelChanged">
                  <el-option v-for="item in educationLevel"
                             :key="item.dictDataValue"
                             :label="item.dictDataName"
                             :value="item.dictDataValue">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学位">
                <el-select v-model="info.academicDegree"
                           placeholder="请选择"
                           size="small"
                           @change="academicDegreeChanged">
                  <el-option v-for="item in degreeSelect"
                             :key="item.dictDataValue"
                             :label="item.dictDataName"
                             :value="item.dictDataValue">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="13"
                    :offset="0">
              <h3 class="item-title">
                工作信息
              </h3>

              <el-form-item label="工作单位">
                <el-input v-model="info.companyName"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item label="工作年限">
                <div style="display:flex">
                  <el-input-number v-model="info.jobYear"
                                   :min="0"
                                   :controls="false"
                                   size="small"
                                   style="width:95%">
                  </el-input-number>
                  <span style="padding-left:5px">年</span>
                </div>
              </el-form-item>
              <el-form-item label="职务">
                <el-select v-model="info.jobTitle"
                           placeholder="请选择"
                           size="small"
                           style="width:100%"
                          >
                  <el-option v-for="item in jobTitleList"
                             :key="item.dictDataValue"
                             :label="item.dictDataName"
                             :value="item.dictDataName">
                  </el-option>
                </el-select>
              </el-form-item>
              <h3 class="item-title">
                工作经历
              </h3>
              <el-form-item label="从事专业">
                <el-select v-model="info.major"
                           placeholder="请选择"
                           size="small"
                           style="width:100%"
                           >
                  <el-option v-for="item in majorSelect"
                             :key="item.majorId"
                             :label="item.majorName"
                             :value="item.majorId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职称">
                <el-select v-model="info.title"
                           placeholder="请选择"
                           size="small"
                           @change="jobTitleChanged"
                           style="width:100%"
                           >
                  <el-option v-for="item in jobTitleSelect"
                             :key="item.dictDataValue"
                             :label="item.dictDataName"
                             :value="item.dictDataValue">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="footer">
          <el-button class="footer-btn"
                     @click="editDialog = false">
            取消
          </el-button>
          <el-button type="primary"
                     class="footer-btn"
                     @click="save">
            确定
          </el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import util from '@/libs/util'

import { globalOpdomain } from '@/utils/index'
const { promiseBaseUrl } = document.querySelector('body').dataset
export default {
  props: {
    info: {
      type: Object,
      default: () => { }
    },
    majorSelect: {
      type: Array,
      default: () => []
    },
    addressOptions: {
      type: Array,
      default: () => []
    },
    cityOptions: {
      type: Array,
      default: () => []
    },
    areaOptions: {
      type: Array,
      default: () => []
    }

  },
  data () {
    return {
      editDialog: false,
      opDomain: globalOpdomain(),
      rules: {
        mobileNo: [
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      // certNo: [{
      //   pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      //   message: '请输入正确的身份证号码',
      //   trigger: 'blur'
      // }],
      // email: [
      //   {
      //     type: 'email',
      //     message: '请输入正确的邮箱地址',
      //     trigger: ['blur', 'change']
      //   }
      // ]
      // mobileNo: [
      //   {
      //     pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      //     message: '请输入正确的手机号码',
      //     trigger: 'blur'
      //   }]
      // },
      // // 省选择
      // addressOptions: regionData,
      // // 市选择
      // cityOptions: [],
      // areaOptions: [],
      jobTitleSelect: [],
      majorInSelect: [],
      degreeSelect: [],
      educationLevel: [],
      token: util.cookies.get('token'),
      url: `${promiseBaseUrl || process.env.VUE_APP_API}/baseservice/upload/uploadimg`,
      adressProps: {
        // lazy: true,
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'areaCode',
        label: 'name'
        // lazyLoad: this.lazyLoad
      },
      OptionS: '',
      jobTitleList: []
    }
  },
  mounted () {
    this.getDicData()
  },
  created () {
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  methods: {
    async getDicData () {
      const { data: res1 } = await this.$api.SETTING_GET_DICT({
        typeCode: 'job_title'
      })
      this.jobTitleSelect = res1
      const { data: res2 } = await this.$api.SETTING_GET_DICT({
        typeCode: 'academic_degree'
      })
      this.degreeSelect = res2
      const { data: res3 } = await this.$api.SETTING_GET_DICT({
        typeCode: 'education_level'
      })
      this.educationLevel = res3
      const { data: res4 } = await this.$api.SETTING_GET_DICT({
        typeCode: 'duties'
      })
      this.jobTitleList = res4
    },
    cancelEdit () {
      this.$emit('cancelEdit')
      this.$refs.form.resetFields()
    },
    educationLevelChanged (val) {
      const obj = this.educationLevel.find(item =>
        item.dictDataValue === val
      )
      this.info.educationLevel = obj.dictDataName
    },
    academicDegreeChanged (val) {
      const obj = this.degreeSelect.find(item =>
        item.dictDataValue === val
      )
      this.info.academicDegree = obj.dictDataName
    },
    jobTitleChanged (val) {
      const obj = this.jobTitleSelect.find(item =>
        item.dictDataValue === val
      )
      this.info.title = obj.dictDataName
    },
    save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('save', this.info)
        }
      })
    },
    // 上传
    handleAvatarSuccess (val) {
      console.log('上传成功', val)
      if (val.code === '1') {
        this.info.headPortraitUrl = val.data
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
    handleAvatarError (val) {
      console.log('上传失败', val)
    },
    adressChange (val) {
      // const panelRefs = this.$refs.adressRef.$refs.panel
      // panelRefs.lazyLoad(panelRefs.getCheckedNodes()[0])
      this.info.provinceCode = val[0] ? val[0] : ''
      this.info.cityCode = val[1] ? val[1] : ''
      this.info.areaCode = val[2] ? val[2] : ''
      this.info.streetCode = val[3] ? val[3] : ''
      let pathLabels = []
      if (this.$refs.adressRef.getCheckedNodes()[0]) {
        pathLabels = this.$refs.adressRef.getCheckedNodes()[0].pathLabels
      }
      this.info.province = pathLabels[0] ? pathLabels[0] : ''
      this.info.city = pathLabels[1] ? pathLabels[1] : ''
      this.info.area = pathLabels[2] ? pathLabels[2] : ''
      this.info.street = pathLabels[3] ? pathLabels[3] : ''
    }
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
    // }
  }
}
</script>
<style lang="scss">
.edit-account-box{
  .el-dialog__body{
    padding-top:0;
  }
  .container-box{
    .el-form-item{
      margin-bottom:20px;
    }
  }
}
</style>
<style lang="scss" scoped>
.container-box{
  // padding:20px 40px;
  width:100%;
  .footer{
    width:300px;
    margin:0 auto;
    display:flex;
    justify-content:space-between;
    margin-top:30px;
  }
  .footer-btn{
    width:120px;
    border-radius:40px;
  }
}
.title-box{
  width:100%;
  height: 20px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 600;
  line-height: 34px;
  color: #222222;
  opacity: 1;
  padding:0 20px 50px 0;
  // border-bottom:1px solid #BBBBBB;
}
.item-title{
  margin-top:0;
  padding-left:6px;
  border-left:3px solid #4598F9;
}
.base-top {
  // display: flex;
  // flex-direction: row;
  // align-items: flex-start;
  padding-bottom: 20px;
  margin-top:18px;
  position:relative;
  border-bottom:1px white solid;
  img {
    width: 80px;
    height: 80px;
    // border-radius: 50%;
    // margin-right: 20px;
  }
  .name {
    font-size: 17px;
    color: #333;
    line-height:80px;
    position:absolute;
    left:100px
  }
  div:last-child{
    position:absolute;
    right:0;
  }
}

</style>
