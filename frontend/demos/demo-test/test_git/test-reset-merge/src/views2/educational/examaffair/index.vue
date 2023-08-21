<template>
  <d2-container>
    <template slot="header">
      <span class="page-title">配置考试</span>
    </template>
    <el-steps :active="active"
              simple
              space="150"
              finish-status="success">
      <el-step title="基本信息" />
      <el-step title="排考" />
    </el-steps>
    <template v-if="active==0">
      <el-form :model="baseInfo"
               :rules="baseRules"
               ref="baseInfo"
               label-width="130px"
               class="baseInfo">
        <el-form-item label="考试类型"
                      prop="examType">
          <el-select v-model="baseInfo.examType"
                     :disabled='true'>
            <el-option label="班级线上考试"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试活动名称"
                      prop="examName">
          <el-input v-model="baseInfo.examName"
                    style="width:19%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="next"
                     class="next">下一步</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-if="active==1">
      <div>
        <el-form :model="examInfo"
                 :rules="examRules"
                 ref="examInfo"
                 label-width="170px"
                 class="examInfo">
          <el-form-item label="考试设置"
                        prop="subjectName">
            <div>
              <el-input v-model="examInfo.subjectName"
                        placeholder="请输入考试科目名称"
                        style="width:200px;margin-right: 10px;"></el-input>
              <el-date-picker v-model="testTime"
                              type="datetimerange"
                              range-separator="至"
                              start-placeholder="考试开始时间"
                              end-placeholder="考试结束时间"
                              style="margin-right: 10px;"
                              value-format="timestamp"
                              :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
              <el-input v-model="examInfo.paperName"
                        style="width:200px;margin-right: 10px;"
                        readonly=""
                        v-if="examInfo.paperName">
                <i slot="suffix"
                   class="el-icon-circle-close"
                   @click="clearChose"></i>
              </el-input>
              <el-input v-model="examInfo.paperId"
                        v-if="false"></el-input>
              <el-button @click="choseTestPaper"
                         v-if="!examInfo.paperName">选择试卷</el-button>
            </div>
          </el-form-item>
          <span class="notes"><i class="el-icon-warning-outline"></i> 考试时间为空代表不限制时间</span>
          <el-form-item label="及格分数"
                        prop="passScore">
            <el-input-number v-model="examInfo.passScore"
                             :min="0"
                             :controls="false"
                             :precision="0"
                             style="margin-right: 10px;"></el-input-number>分
          </el-form-item>
          <el-form-item label="成绩设置"
                        prop="showScoreAtOnce">
            <el-select v-model="examInfo.showScoreAtOnce"
                       style="width:180px"
                       placeholder="请选择成绩设置">
              <el-option label="交卷后立即显示"
                         value="1"></el-option>
              <el-option label="不显示"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="examInfo.showScoreAtOnce==1"
                        label="公布范围"
                        prop="publishRange1">
            <el-checkbox-group v-model="examInfo.publishRange1">
              <el-checkbox label="1"
                           disabled>成绩</el-checkbox>
              <el-checkbox label="2">正确答案</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="答题时长"
                        prop="answerTimeLimit">
            <el-input-number v-model="examInfo.answerTimeLimit"
                             :min="0"
                             :controls="false"
                             :precision="0"
                             style="margin-right: 10px;"></el-input-number>分钟
          </el-form-item>
          <el-form-item label="答题次数"
                        prop="answerTimesLimit">
            <el-input-number v-model="examInfo.answerTimesLimit"
                             :min="-1"
                             :controls="false"
                             :precision="0"
                             style="margin-right: 10px;"></el-input-number>次
          </el-form-item>
          <span class="notes"><i class="el-icon-warning-outline"></i> -1表示无限次</span>
          <el-form-item label="科目成绩取值方式：">
            <el-radio-group v-model="radio">
              <el-radio :label="1">取最高分</el-radio>
              <el-radio :label="2">取平均分</el-radio>
              <el-radio :label="3">取最低分</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考试总成绩取值方式：">
            <el-radio-group v-model="total_radio">
              <el-radio :label="1">取所有科目成绩之和</el-radio>
              <el-radio :label="2">取总成绩的科目平均分</el-radio>
              <el-radio :label="3">取某个单科最高分</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考试监控"
                        prop="isOpenSwitchCheck1">
            <el-checkbox size="mini"
                         v-model="examInfo.isOpenSwitchCheck1">切屏后强制交卷</el-checkbox>
          </el-form-item>
          <el-form-item label=""
                        prop="limitSwitchAmount">
            学员切换页面超过<el-input-number v-model="examInfo.limitSwitchAmount"
                             size="mini"
                             :min="0"
                             :controls="false"
                             :precision="0"
                             style="width: 50px;margin-right: 10px;margin-left: 10px;"></el-input-number>次后将被强制交卷
          </el-form-item>
          <el-form-item>
            <el-button @click="prev"
                       class="prev">上一步</el-button>
            <el-button type="primary"
                       @click="save"
                       :loading="saveLoading">保存</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="选择试卷"
                   :visible.sync="TestPapreDialog"
                   :close-on-click-modal=false
                   width="70%">
          <chose-paper ref="chosePaperRef"
                       @closeDialog="closeDialog"
                       @selectPaperInfo="selectPaperInfo">
          </chose-paper>
        </el-dialog>
      </div>
    </template>
  </d2-container>
</template>
<script>
import ChosePaper from './components/chosepaper/chose-paper.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    ChosePaper
  },
  watch: {
    testTime: {
      handler (val) {
        if (val) {
          this.examInfo.timeLimit = 2
          this.examInfo.startTime = val[0]
          this.examInfo.endTime = val[1]
        } else {
          this.examInfo.timeLimit = 1
        }
      },
      immediate: true
    }
  },
  created () {
    let param
    if (this.$route.query.onlineFlag) {
      param = {
        examId: this.$route.query.examId
      }
    } else {
      param = {
        examActivityId: this.$route.query.classId,
        examOrigin: 2
      }
    }
    this.$api.QUERY_CLASS_EXAM(param).then(res => {
      if (JSON.stringify(res.data) === '{}') {
        console.log('新建')
      } else {
        console.log('编辑')

        this.baseInfo.examName = res.data.examName
        this.examInfo = res.data
        console.log(res.data)
        debugger
        this.$set(this.examInfo, 'isOpenSwitchCheck1', res.data.isOpenSwitchCheck == 2)
        this.$set(this.examInfo, 'showScoreAtOnce', res.data.showScoreAtOnce.toString())
        this.$set(this.examInfo, 'publishRange1', this.examInfo.publishRange ? this.examInfo.publishRange.split(',') : ['1'])
        this.$set(this.examInfo, 'subjectName', res.data.examSubjectPaperVOList[0].subjectName)
        this.$set(this.examInfo, 'paperName', res.data.examSubjectPaperVOList[0].paperName)
        this.$set(this.examInfo, 'paperId', res.data.examSubjectPaperVOList[0].testPaperId)
        this.examInfo.timeLimit = res.data.examSubjectPaperVOList[0].timeLimit
        this.examInfo.examSubjectId = res.data.examSubjectPaperVOList[0].examSubjectId
        this.radio = res.data.subjectScoreValue
        this.total_radio = res.data.totalScoreValue
        if (res.data.examSubjectPaperVOList[0].timeLimit == 2) {
          this.testTime.push(res.data.examSubjectPaperVOList[0].startTime)
          this.testTime.push(res.data.examSubjectPaperVOList[0].endTime)
        }
      }
    })
  },
  data () {
    return {
      active: 0,
      radio: 1,
      total_radio: 1,
      baseInfo: {
        examType: '3',
        examName: this.$route.query.examActivityName
      },
      baseRules: {
        examType: [
          { required: true, message: '请选择考试类型', trigger: 'change' }
        ],
        examName: [
          { required: true, message: '请输入考试活动名称', trigger: 'blur' }
        ]
      },
      testTime: [],
      examSubjectSaveParamList: [],
      examInfo: {
        examSubjectId: '',
        showScoreAtOnce: '1',
        publishRange1: ['1'],
        passScore: '',
        startTime: '',
        endTime: '',
        paperId: '',
        subjectName: '',
        paperName: '',
        timeLimit: 1, // 考试时间限制类型 数据字典 serious_test_limit 1 不限 2 限制【必须】
        answerTimeLimit: '', // 答题时长限制
        answerTimesLimit: '', // 答题次数限制
        isOpenSwitchCheck1: '', // 是否开启切屏
        limitSwitchAmount: '' // 切换次数
      },
      examRules: {
        passScore: [
          { required: true, message: '请输入及格分数', trigger: 'blur' }
        ],
        showScoreAtOnce: [
          { required: true, message: '请选择成绩设置', trigger: 'change' }
        ],
        answerTimeLimit: [
          { required: true, message: '请输入答题时长', trigger: 'blur' }
        ],
        answerTimesLimit: [
          { required: true, message: '请输入答题次数', trigger: 'blur' }
        ],
        subjectName: [
          { required: true, message: '请输入考试科目名称', trigger: 'blur' }
        ],
        publishRange1: [
          { required: true, message: '请选择公布范围', trigger: 'change' }
        ]
      },
      TestPapreDialog: false,
      saveLoading: false
    }
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    next () {
      this.$refs.baseInfo.validate((valid) => {
        if (valid) {
          this.active = 1
        } else {
          console.log('校验失败')
          return false
        }
      })
    },
    choseTestPaper () {
      this.TestPapreDialog = true
    },
    prev () {
      this.active = 0
    },
    closeDialog (val) {
      this.TestPapreDialog = val
    },
    selectPaperInfo (val) {
      this.examInfo.paperId = val.paperId
      this.examInfo.paperName = val.paperName
    },
    clearChose () {
      this.examInfo.paperId = ''
      this.examInfo.paperName = ''
    },
    save () {
      this.examSubjectSaveParamList = []
      if (this.examInfo.paperId == '') {
        this.$message.warning('请选择试卷')
      } else {
        this.$refs.examInfo.validate((valid) => {
          if (valid) {
            this.saveLoading = true
            const obj = {}
            obj.examSubjectId = this.examInfo.examSubjectId
            obj.startTime = this.examInfo.startTime
            obj.endTime = this.examInfo.endTime
            obj.paperId = this.examInfo.paperId
            obj.subjectName = this.examInfo.subjectName
            obj.timeLimit = this.examInfo.timeLimit
            this.examSubjectSaveParamList.push(obj)
            this.examInfo.isOpenSwitchCheck = this.examInfo.isOpenSwitchCheck1 ? 2 : 1
            this.examInfo.publishRange = this.examInfo.publishRange1.join(',')
            this.$api.SAVE_TESTINFO({
              ...this.examInfo,
              ...this.baseInfo,
              examSubjectSaveParamList: this.examSubjectSaveParamList,
              examActivityId: this.$route.query.classId,
              examActivityName: this.$route.query.examActivityName,
              examOrigin: this.$route.query.onlineFlag ? '' : 2,
              subjectScoreValue: this.radio,
              totalScoreValue: this.total_radio
            }).then(res => {
              this.$notify({
                title: '提示',
                message: '关联考试配置成功!',
                type: 'success'
              })
              const tagName = this.$route.fullPath
              if (this.$route.query.onlineFlag) {
                this.close({ tagName }).then(item => { this.$router.push({ path: '/examination/online_exam' }) })
              } else {
                this.close({ tagName }).then(item => { this.$router.push({ path: '/educational/class' }) })
              }
            }).catch(e => {
              this.saveLoading = false
            })
          } else {
            console.log('校验失败')
            return false
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.baseInfo {
  margin-top: 20px;
}
.next {
  margin-left: 40%;
}
.examInfo {
  margin-top: 20px;
}
.prev {
  margin-left: 30%;
}
.notes {
  color: #888888;
  display: block;
  font-size: 12px;
  margin: 0 0 20px 170px;
}
.el-icon-circle-close {
  cursor: pointer;
}
</style>
