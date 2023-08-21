<template>
<el-container v-loading="maskLoading">
      <el-header style="height:40px"><h5>学习规则设置</h5></el-header>
      <el-container>
        <el-main>
          <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :rules="rules">
            <!-- <el-form-item label="开课方式" prop="startClassMode">
              <el-radio-group v-model="ruleForm.startClassMode">
                <el-radio :label=item.label v-for="(item,index) in openMethod" :key="index">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="闯关模式">
              <el-switch
                v-model="ruleForm.isOrderStudy"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
              <span class="notes"><i class="el-icon-warning-outline"></i>按顺序任务完成100%后方可开始下一个任务的学习</span>
            </el-form-item>
            <el-form-item label="开启学习抓拍">
              <el-switch
                v-model="ruleForm.isOpenPhotosSwitch"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
              <div class="openCapture" v-if="ruleForm.isOpenPhotosSwitch==1">
                <span>班级视频总时长：</span>
                <span>{{formateTime(ruleForm.intResourceTotalTime)}}</span>
                <el-form-item label="抓拍时间点" class="time">
                  <template>
                    <div><el-radio v-model="snapRadio" label="1" >每次进入学习</el-radio></div>
                    <div>
                      <el-radio v-model="snapRadio" label="2" >学习中抓拍</el-radio>
                      <span>每次学习中第
                        <el-input-number v-model="ruleForm.learnPhotoSecond" :precision="2" :min="0" style="width:100px;margin:10px" :disabled="snapRadio!=2" :controls="false"></el-input-number>
                        分钟</span>
                      <span class="notes"><i class="el-icon-warning-outline"></i>若不填写，则为随机时间抓拍</span>
                    </div>
                </template>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="限制学习日期">
              <template>
                    <div><el-radio v-model="ruleForm.limitStudyType" :label="1" @change="radioChange">不限</el-radio></div>
                    <div>
                      <el-radio v-model="ruleForm.limitStudyType" :label="2">在规定时间内学习</el-radio>
                      <el-form-item
                        prop="studyTime"
                        :required="isrequired"
                        style="display: inline-block;"
                      >
                      <el-date-picker
                        v-model="ruleForm.studyTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :disabled="ruleForm.limitStudyType!=2"
                        @change="studyTimeChange"

                        :default-time="['00:00:00', '23:59:59']"
                      >
                      <!-- :picker-options="pickerOptions" -->
                      </el-date-picker>
                      </el-form-item>
                        <div class="notes">
                          <i class="el-icon-warning-outline"></i>
                          限制学习日期是指学员只能在该学习时间段内学习，过期则不可学习，包括回放也不可观看，过期未学习完成也不能拿到证书
                        </div>
                    </div>
                    <div>
                      <el-radio v-model="ruleForm.limitStudyType" :label="3" @change="radioChange">
                        <span>入班后
                          <el-input-number v-model="ruleForm.allowJoinStudyDay" :controls=false :min="0" :precision="0" :disabled="ruleForm.limitStudyType!=3" style="width:100px;margin:10px" @blur="inputBlur"></el-input-number>
                          天内可学</span>
                      </el-radio>
                    </div>
                    <span class="notes"><i class="el-icon-warning-outline"></i>入班后第二天的零点开始扣除天数</span>
                </template>
            </el-form-item>
            <el-button type="primary" class="button" @click="preservation" :loading="loading">保存</el-button>
          </el-form>
      </el-main>
      </el-container>
    </el-container>
</template>
<script>
/* eslint-disable */ 

import { isArray } from 'lodash'
import { mapActions } from 'vuex'
import { formateTime } from '@/utils/index'
export default {
  watch: {
    snapRadio: {
      handler (val) {
        if (val == 1) { // 每次进入学习
          this.ruleForm.isEveryEnterLearning = 1
          this.ruleForm.isOpenLearnPhoto = 0
          this.ruleForm.learnPhotoSecond = undefined
        }
        if (val == 2) { // 学习中抓拍
          this.ruleForm.isEveryEnterLearning = 0
          if (this.ruleForm.learnPhotoSecond) {
            this.ruleForm.isOpenLearnPhoto = 1
          } else {
            this.ruleForm.isOpenLearnPhoto = 2
          }
        }
      },
      immediate: true
    },
    'ruleForm.limitStudyType': {
      handler (val) {
        if (val == 1) { // 不限
          this.ruleForm.studyTime = []
          this.ruleForm.studyStartTime = ''
          this.ruleForm.studyEndTime = ''
          this.ruleForm.allowJoinStudyDay = undefined
        }
        if (val == 2) {
          this.ruleForm.allowJoinStudyDay = undefined
        }
        if (val == 3) {
          this.ruleForm.studyTime = []
          this.ruleForm.studyStartTime = ''
          this.ruleForm.studyEndTime = ''
        }
      },
      immediate: true
    }
  },
  computed: {
    isrequired: function () {
      return this.ruleForm.limitStudyType == 2
    }
  },
  data () {
    // 验证报名时间的函数
    const studyTime = (rule, value, callback) => {
      // 当开始时间为空值且为必填时，抛出错误，反之通过校验
      if ((!this.ruleForm.studyTime || this.ruleForm.studyTime.length === 0) && this.isrequired) {
        callback(new Error('请选择学习日期'))
      } else {
        callback()
      }
    }
    return {
      active: 1,
      openMethod: [],
      ruleForm: {
        // startClassMode: '', // 开课方式（1：即时开课）
        isOrderStudy: 0,
        isOpenPhotosSwitch: 0, // 是否开启学习抓拍（1-是，0-否）
        isEveryEnterLearning: '', // 每次离开学习抓拍（1-是，0-否）
        isOpenLearnPhoto: 0, // 开启学习多少分钟抓拍（1-是固定时间，0-否,2 是随机时间）
        learnPhotoSecond: '', // 学习多少分钟抓拍一次
        studyTime: [],
        studyStartTime: '',
        studyEndTime: '',
        limitStudyType: 1,
        allowJoinStudyDay: 0,
        resourceTotalTime: '',
        intResourceTotalTime: ''// 资源总时长
      },
      rules: {
        // startClassMode: [
        //   { required: true, message: '请选择开课方式', trigger: 'change' }
        // ],
        studyTime: [{ validator: studyTime }]
      },
      snapRadio: '1',
      loading: false,
      maskLoading: false
      // 选择开始时间大于等于当前时间
      // pickerOptions: {
      //   disabledDate (time) {
      //     const dateTime = new Date()
      //     const startDateTime = dateTime.setDate(dateTime.getDate() - 1)
      //     const endDateTime = dateTime.setDate(dateTime.getDate() + 30000) // 30000为当前日期之后多少天
      //     return (
      //       time.getTime() < new Date(startDateTime).getTime() ||
      //       time.getTime() > new Date(endDateTime).getTime()
      //     )
      //   }
      // }
    }
  },
  created () {
    // this.grtDict()
    this.editShow()
  },
  methods: {
    formateTime,
    ...mapActions('d2admin/studyplan', ['getStudyInfo']),
    ...mapActions('d2admin/page', ['close']),
    editShow () {
      this.maskLoading = true
      this.$api.GET_STUDY_RULE({
        classId: this.$route.query.classId
      }).then(res => {
        this.ruleForm.intResourceTotalTime = res.data.intResourceTotalTime
        if (res.data.startClassMode) {
          this.ruleForm = res.data
          // this.ruleForm.startClassMode = res.data.startClassMode.toString()
          if (res.data.isOpenLearnPhoto == 0) {
            this.snapRadio = '1'
            this.ruleForm.isEveryEnterLearning = 1
            this.ruleForm.isOpenLearnPhoto = 0
            this.ruleForm.learnPhotoSecond = undefined
          } else {
            this.snapRadio = '2'
            this.ruleForm.isEveryEnterLearning = 0
            if (this.ruleForm.learnPhotoSecond) {
              this.ruleForm.isOpenLearnPhoto = 1
            } else {
              this.ruleForm.isOpenLearnPhoto = 2
            }
          }
          if (!res.data.learnPhotoSecond) {
            this.ruleForm.learnPhotoSecond = undefined
          }
          if (res.data.studyStartTime) {
            const studyTime = []
            studyTime.push(res.data.studyStartTime)
            studyTime.push(res.data.studyEndTime)
            this.$set(this.ruleForm, 'studyTime', studyTime)
          }
          if (!res.data.allowJoinStudyDay) {
            this.ruleForm.allowJoinStudyDay = undefined
          }
        }
        this.maskLoading = false
      }).catch(() => {
        this.maskLoading = false
      })
    },
    radioChange (val) {
      if (val != 2) {
        // const model = this.ruleForm.startClassMode
        this.$refs.ruleForm.resetFields()
        // this.ruleForm.startClassMode = model
      }
    },
    inputBlur () {
      if (!this.ruleForm.allowJoinStudyDay) {
        this.ruleForm.allowJoinStudyDay = 0
      }
    },
    // // 获取开课方式字典
    // grtDict () {
    //   this.$api.DICT_LIST({
    //     typeCode: 'org_opening_method'
    //   }).then(res => {
    //     const list = res.data
    //     if (isArray(list)) {
    //       this.openMethod = list.map(item => {
    //         return {
    //           value: `${item.dictDataName}`,
    //           label: `${item.dictDataValue}`
    //         }
    //       })
    //       this.ruleForm.startClassMode = this.openMethod[0].label
    //     }
    //   })
    // },
    studyTimeChange (val) {
      this.ruleForm.studyStartTime = val[0]
      this.ruleForm.studyEndTime = val[1]
    },
    async preservation () {
      const { planId } = await this.getStudyInfo()
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.ruleForm.learnPhotoSecond && this.snapRadio == 2) {
            this.ruleForm.isOpenLearnPhoto = 2
          }
          this.loading = true
          this.$api.CREAT_STUDY_RULE({
            ...this.ruleForm,
            planId: planId,
            photoLimitCount: 1
          }).then(res => {
            this.$notify({
              title: '提示',
              message: '学习规则配置成功!',
              type: 'success'
            })
            const tagName = this.$route.fullPath
            this.close({ tagName }).then(item => { this.$router.push({ path: '/educational/class' }) })
          }).catch(e => {
            this.loading = false
          })
        } else {
          console.log('校验失败')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.openCapture{
  display: inline;
  margin-left: 20px;
}
.time{
  display: block;
  margin-left: 41px;
}
.notes{
  color: #888888;
  margin-left: 15px;
}
.button{
  margin-left: 45%;
}
</style>
