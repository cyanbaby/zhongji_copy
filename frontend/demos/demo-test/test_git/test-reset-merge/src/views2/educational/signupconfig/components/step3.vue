<template>
  <div style="margin-top:50px;">
    <el-form
      ref="form"
      :model="form"
      label-width="110px"
    >
       <el-form-item label="选择报名表">
        <el-select
          v-model="form.templateId"
          filterable
          placeholder="选择报名表"
        >
          <el-option
            v-for="item in options"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报名校验字段" v-if="form.templateId==1">
        <div style="margin-top:25px">
          <h4 style="display:inline;margin-right:20px;">详细资料</h4>
          <el-checkbox-group v-model="checkList" style="display:inline">
            <el-checkbox :label="item.fieldCode" v-for="(item,i) in detailInfo" :key="i" :disabled="item.fieldCode=='name'">{{item.fieldName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <h4 style="display:inline;margin-right:20px;">联系信息</h4>
          <el-checkbox-group v-model="checkList" style="display:inline">
            <el-checkbox :label="item.fieldCode" v-for="(item,i) in contactInfo" :key="i">{{item.fieldName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <h4 style="display:inline;margin-right:20px;">教育信息</h4>
          <el-checkbox-group v-model="checkList" style="display:inline">
            <el-checkbox :label="item.fieldCode" v-for="(item,i) in educationInfo" :key="i">{{item.fieldName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <h4 style="display:inline;margin-right:20px;">工作信息</h4>
          <el-checkbox-group v-model="checkList" style="display:inline">
            <el-checkbox :label="item.fieldCode" v-for="(item,i) in workInfo" :key="i">{{item.fieldName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
        <el-form-item label="报名须知">
        <el-switch
          v-model="switchValue"
          active-color="#13ce66">
        </el-switch>
      </el-form-item>

       <el-form-item label="须知命名" v-show="switchValue">
        <el-input
          :rows="10"
          v-model="commitmentName"
          style="width:600px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="须知内容" v-show="switchValue">
        <el-input
          type="textarea"
          :rows="10"
          v-model="commitment"
          style="width:600px;"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item
        v-if="form.templateName"
        label="已选择的报名表"
      >
        <el-tag
          closable
          type="success"
          @close="handleClose()"
        >
          {{ form.templateName }}
        </el-tag>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          @click="next"
          :loading="loading"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import util from '@/libs/util.js'
import { mapActions } from 'vuex'
import { findItemInArrayByProperty, findItemIndexInArrayByProperty } from '@/utils/array-utils'
export default {
  data () {
    return {
      checkList: [],
      form: {
        templateId: '1',
        templateName: ''
      },
      options: [],
      commitment: '本人承诺填报资料内容属实，如有弄虚作假、不符合应聘岗位条件等情况，一经发现，责任自负，用人单位可不予聘用。本人承诺诚信考试，并服从工作分配。',
      commitmentName: '报名诚信承诺书',
      loading: false,
      switchValue: true,
      detailInfo: [], // 详细资料
      contactInfo: [], // 联系信息
      educationInfo: [], // 教育信息
      workInfo: [], // 工作信息
      signupInfoValidateObjs: []
    }
  },
  mounted () {
    // 查询报名表
    this.$api.GET_TEMP().then(res => {
      this.options = res.data
      this.options.unshift({ templateName: '用户信息', templateId: '1' })
    })
    // this.init()
    this.echo()
    this.getCheckField()
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    init () {
      this.$api.GetBase({
        activityId: this.$route.query.activityId || util.cookies.get('activityId')
      }).then(res => {
        this.form = res.data.enterTemplateVO || {}
        this.commitment = res.data.commitment
        this.switchValue = ''
      })
    },
    next () {
      this.loading = true
      const key = this.switchValue ? 1 : 0
      this.$api.SAVE_SIGNUP_COMMITMENT({
        activityId: this.$route.query.activityId || util.cookies.get('activityId'),
        commitment: this.commitment,
        commitmentName: this.commitmentName,
        isRegistrationInstructions: key,
        templateId: this.form.templateId

      }).then(() => {
        if (this.form.templateId == '1') {
          this.signupInfoValidateObjs.forEach(item => {
            item.confStatus = 2
          })
          this.checkList.forEach(item => {
            const index = findItemIndexInArrayByProperty(this.signupInfoValidateObjs, item, 'fieldCode')
            if (index != -1) {
              this.signupInfoValidateObjs[index].confStatus = 1
            }
          })
          this.$api.SAVE_SIGN_INFO_VALIDATES({
            activityId: this.$route.query.activityId || util.cookies.get('activityId'),
            signupInfoValidateObjs: this.signupInfoValidateObjs
          }).then(() => {
            this.$notify({
              title: '提示',
              message: '关联报名表成功!',
              type: 'success'
            })
            const tagName = this.$route.fullPath
            this.close({ tagName }).then(item => { this.$router.push({ path: '/educational/class' }) })
          }).catch(e => {
            this.loading = false
          })
        } else {
          this.$notify({
            title: '提示',
            message: '关联报名表成功!',
            type: 'success'
          })
          const tagName = this.$route.fullPath
          this.close({ tagName }).then(item => { this.$router.push({ path: '/educational/class' }) })
        }
      }).catch(e => {
        this.loading = false
      })
    },
    // 回显
    echo () {
      this.$api.GET_SIGNUP_INFO({
        classId: this.$route.query.classId
      }).then(res => {
        this.form.templateId = res.data.templateId
        this.commitment = res.data.commitment
        this.switchValue = res.data.isRegistrationInstructions === 1
        this.commitmentName = res.data.commitmentName
      })
    },
    getCheckField () {
      this.$api.QUERY_SIGN_INFO_VALIDATES({
        activityId: this.$route.query.activityId || util.cookies.get('activityId')
      }).then(res => {
        this.signupInfoValidateObjs = res.data
        this.detailInfo = []
        let field = ''
        field = findItemInArrayByProperty(res.data, 'name', 'fieldCode')
        if (field) {
          this.detailInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'sex', 'fieldCode')
        if (field) {
          this.detailInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'cert_no', 'fieldCode')
        if (field) {
          this.detailInfo.push(field)
        }
        this.contactInfo = []
        field = findItemInArrayByProperty(res.data, 'mobile', 'fieldCode')
        if (field) {
          this.contactInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'email', 'fieldCode')
        if (field) {
          this.contactInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'area', 'fieldCode')
        if (field) {
          this.contactInfo.push(field)
        }
        this.educationInfo = []
        field = findItemInArrayByProperty(res.data, 'education', 'fieldCode')
        if (field) {
          this.educationInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'degree', 'fieldCode')
        if (field) {
          this.educationInfo.push(field)
        }
        this.workInfo = []
        field = findItemInArrayByProperty(res.data, 'work_company', 'fieldCode')
        if (field) {
          this.workInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'work_year', 'fieldCode')
        if (field) {
          this.workInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'professional', 'fieldCode')
        if (field) {
          this.workInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'technical_title', 'fieldCode')
        if (field) {
          this.workInfo.push(field)
        }
        field = findItemInArrayByProperty(res.data, 'job_title', 'fieldCode')
        if (field) {
          this.workInfo.push(field)
        }
        this.checkList = []
        if (res.data) {
          res.data.forEach(item => {
            if (item.confStatus == 1) {
              this.checkList.push(item.fieldCode)
            }
          })
        }
      })
    }
  }
}
</script>
