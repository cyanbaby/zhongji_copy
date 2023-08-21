<template>
  <div>
    <el-card v-loading="mask">
      <div class="title">
        <span class="line"></span><span class="title_text">课程考试资格</span>
      </div>
      <div class="layout"
           style="margin-bottom: 50px;">
        <div class="card"
             v-for="(item,i) in completeList"
             :key="i">
          <div class="cardbody">
            <div class="cardHead"></div>
            <div class="cardbottom">
              <span class="taskName">{{item.jobName}}</span>
              <div style="display: flex;justify-content:space-between;align-items:center">
                <div>
                  <span style="font-size: 15px;line-height: 27px;color: #1E90FF;letter-spacing: 1px;">获得考试资格</span>
                </div>
                <div>
                  <div>
                    <el-button size="mini"
                               style="width:48px;height: 24px;padding: 5px 8px;margin-bottom: 10px;"
                               @click="check(item)">查看</el-button>
                  </div>
                  <el-button size="mini"
                             style="width:48px;height: 24px;padding: 5px 8px;color: #1E90FF;border: 1px solid #1E90FF;"
                             @click="deleteClick(item.jobId)">删除</el-button>
                </div>
              </div>
              <div class="time">{{item.jobCreateTime}}创建</div>
            </div>
          </div>
        </div>
        <div class="addBtn"
             @click="addTask('1')"
             v-if="completeList.length==0">
          <!-- 课程考试资格 -->
          <img src="@/assets/images/addBtn.png"
               style="width: 40px;" />
        </div>
      </div>

      <div class="title">
        <span class="line"></span><span class="title_text">课程结业</span>
      </div>
      <div class="layout">
        <div class="card"
             v-for="(item,i) in graduationList"
             :key="i">
          <div class="cardbody">
            <div class="cardHead"></div>
            <div class="cardbottom">
              <span class="taskName">{{item.jobName}}</span>
              <div style="display: flex;justify-content:space-between;align-items:center">
                <div>
                  <span style="font-size: 15px;line-height: 27px;color: #1E90FF;letter-spacing: 1px;">课程结业</span>
                </div>
                <div>
                  <div>
                    <el-button size="mini"
                               style="width:48px;height: 24px;padding: 5px 8px;margin-bottom: 10px;"
                               @click="check(item)">查看</el-button>
                  </div>
                  <el-button size="mini"
                             style="width:48px;height: 24px;padding: 5px 8px;color: #1E90FF;border: 1px solid #1E90FF;"
                             @click="deleteClick(item.jobId)">删除</el-button>
                </div>
              </div>
              <div class="time">{{item.jobCreateTime}}创建</div>
            </div>
          </div>
        </div>
        <div class="addBtn"
             @click="addTask('2')"
             v-if="graduationList.length==0">
          <!-- 课程结业 -->
          <img src="@/assets/images/addBtn.png"
               style="width: 40px;" />
        </div>
      </div>
      <div>
        <el-link :underline="false"
                 type="primary"
                 style="line-height: 80px;"
                 :disabled="graduationList.length!=0"
                 @click="fastTask">+快捷任务：课程学习完成即课程结业</el-link>
      </div>
      <div>
        <el-checkbox v-model="isUpdatetask">如需影响到已购课学员，请勾选此按钮后保存</el-checkbox>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-button type="primary"
                   @click="saveBtn"
                   class="nextBtn"
                   :loading="closeLoaing">保存</el-button>
      </div>
    </el-card>
    <el-dialog title="新增课程任务"
               :visible.sync="taskDialog"
               width="45%"
               @close="closeDialog"
               :close-on-click-modal=false>
      <el-form :model="taskInfo"
               :rules="taskRules"
               ref="taskInfo"
               label-width="150px"
               :inline="true">
        <el-form-item label="名称"
                      prop="jobName"
                      style="display: block;">
          <el-input v-model="taskInfo.jobName"
                    style="width:185%"></el-input>
        </el-form-item>
        <el-form-item style="display: block;"
                      v-for="(domain, index) in taskInfo.jobConditionList"
                      :key="domain.key"
                      :label="'完成条件'+(index+1)"
                      :prop="'jobConditionList.' + index + '.conditionType'"
                      :rules="{
                required: true, message: '请选择完成条件', trigger: 'change'
            }">
          <div style="">
            <el-select v-model="domain.conditionType"
                       placeholder="请选择完成条件"
                       @change="change">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
                         :disabled="opdisable.includes(item.value)">
              </el-option>
            </el-select>
            <span style="margin:0 10px 0 10px;"
                  v-if="domain.conditionType!=8">达到</span>
            <el-form-item style="width:90px"
                          :prop="'jobConditionList.' + index + '.conditionNum'"
                          :rules="{
                        required: true, message: '请输入完成条件', trigger: 'blur'
                    }"
                          v-if="domain.conditionType!=8">
              <el-input-number v-model="domain.conditionNum"
                               style="width:90px"
                               :min="1"
                               :controls="false"></el-input-number>
            </el-form-item>
            <span style="margin-left:10px"
                  v-if="domain.conditionType==12">%</span>
            <span style="margin-left:10px"
                  v-if="domain.conditionType==10">分</span>
            <el-button type="text"
                       @click.prevent="remove(domain)"
                       style="margin-left: 10px;"
                       v-if="index!=0">删除</el-button>
          </div>
        </el-form-item>
        <el-button type="text"
                   @click="addCondition"
                   style="margin-left: 150px;display: block;">添加条件</el-button>
        <el-form-item label="条件判断逻辑"
                      prop="determinLogicType"
                      style="display: block;">
          <el-radio-group v-model="taskInfo.determinLogicType">
            <el-radio label="2">全部完成</el-radio>
            <el-radio label="1">任意完成一个</el-radio>
            <el-radio label="3">按顺序完成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="完成奖励"
                      prop="completeProfitType"
                      style="display: block;">
          <span v-if="taskInfo.jobType == 2"
                style="display: flex;align-items: baseline;">
            <el-radio v-model="taskInfo.completeProfitType"
                      :label="2">考试资格</el-radio>
            <el-link :underline="false"
                     type="primary"
                     @click="choseExam"
                     v-if="!examInfo.examId">+关联考试</el-link>
            <div v-else
                 style="color: #419EFF;font-size: 14px;font-weight: 500;">
              <span>{{examInfo.examName}}</span>
              <i class="el-icon-close"
                 style="margin-left: 5px;font-size: 16px;cursor: pointer;"
                 @click="removeExam"></i>
            </div>
          </span>
          <span v-if="taskInfo.jobType == 4">
            <el-radio v-model="taskInfo.completeProfitType"
                      :label="4">课程结业</el-radio>
          </span>
        </el-form-item>
        <el-form-item style="margin-left: 45%;">
          <el-button type="primary"
                     @click="saveConfig"
                     :loading="saveLoading">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="选择考试"
               :close-on-click-modal=false
               :visible.sync="choseExamDialog"
               v-if="choseExamDialog">
      <exam-select @getExamInfo="getExamInfo"></exam-select>
    </el-dialog>
    <el-dialog title="任务信息"
               :visible.sync="checkInfoDialog"
               :close-on-click-modal=false
               width="40%">
      <el-form label-width="150px">
        <el-form-item label="名称：">
          {{checkInfo.jobName}}
        </el-form-item>
        <el-form-item label="完成条件：">
          <span v-for="(item,i) in checkInfo.jobConditionList"
                :key="i"
                style="display:block">
            <span v-if="item.conditionType==8">加入课程</span>
            <span v-if="item.conditionType==12">课程学习进度</span>
            <span v-if="item.conditionType==10">考试成绩</span>
            <span v-if="item.conditionType!=8">达到</span>
            <span v-if="item.conditionType!=8">{{item.conditionNum}}</span>
            <span v-if="item.conditionType==12">%</span>
            <span v-if="item.conditionType==10">分</span>
          </span>
        </el-form-item>
        <el-form-item label="条件判定逻辑：">
          <span v-if="checkInfo.determinLogicType==2">全部完成</span>
          <span v-if="checkInfo.determinLogicType==1">任意完成一个</span>
          <span v-if="checkInfo.determinLogicType==3">按顺序完成</span>
        </el-form-item>
        <el-form-item label="完成奖励：">
          <span v-if="checkInfo.completeProfitType==2">考试资格</span>
          <span v-if="checkInfo.completeProfitType==2"
                style="margin-left:5px;">{{checkInfo.examName}}</span>
          <span v-if="checkInfo.completeProfitType==4">课程结业</span>
          <span></span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */ 

import ExamSelect from './examselect/exam-select.vue'
import { findItemInArrayByProperty } from '@/utils/array-utils'
import { mapActions } from 'vuex'
export default {
  components: {
    ExamSelect
  },
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      mask: false,
      taskDialog: false,
      options: [
        {
          value: '8',
          label: '加入课程'
        },
        {
          value: '12',
          label: '课程学习进度'
        },
        {
          value: '10',
          label: '考试成绩'
        }
      ],
      optionsMid: [],
      opdisable: [],
      taskInfo: {
        cycleType: 1, // 任务时效类型 1 一次性任务 2周期性任务
        partakeType: 2, // 参与者类型 1 班级学员 2课程
        sourceType: 2, // 来源对象类型 1 班级 2班级
        determinLogicType: '',
        completeProfitType: 2,
        jobConditionList: [
          {
            conditionType: '',
            conditionNum: '',
            key: Date.now(),
            conditionUnit: '5'
          }
        ]
      },
      taskRules: {
        jobName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        determinLogicType: [{ required: true, message: '请选择条件判定逻辑', trigger: 'change' }],
        completeProfitType: [{ required: true, message: '请选择完成奖励', trigger: 'blur' }]
      },
      choseExamDialog: false,
      checkInfo: {},
      checkInfoMid: {},
      checkInfoDialog: false,
      saveLoading: false,
      examInfo: {},
      isUpdatetask: false,
      graduationList: [],
      completeList: [],
      closeLoaing: false,
      catInfo: {}
    }
  },
  created () {
    if (this.$route.query.goodsId) {
      this.getTaskInfos()
    }
    this.defaultForm = JSON.parse(JSON.stringify(this.taskInfo))
    this.optionsMid = JSON.parse(JSON.stringify(this.options))
    this.checkInfoMid = JSON.parse(JSON.stringify(this.checkInfo))
    this.examInfoMid = JSON.parse(JSON.stringify(this.examInfo))
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    ...mapActions('d2admin/goods', ['getGoodsInfo']),
    getTaskInfos () {
      this.mask = true
      this.$api.QUERY_JOB_INFOS({
        sourceId: this.goodsId,
        sourceType: 2,
        partakeType: 2
      }).then(res => {
        this.graduationList = res.data.courseCompletion
        this.completeList = res.data.examQualifications
        this.mask = false
      }).catch(() => {
        this.mask = false
      })
    },
    // 新增任务弹窗
    addTask (flag) {
      this.options = JSON.parse(JSON.stringify(this.optionsMid))
      this.taskInfo = JSON.parse(JSON.stringify(this.defaultForm))
      this.removeExam()
      if (flag == '1') { // 课程考试资格
        this.taskInfo.jobType = 2
        this.options.splice(2, 1)
        this.$set(this.taskInfo, 'completeProfitType', 2)
      } else if (flag == '2') { // 课程结业
        this.taskInfo.jobType = 4
        this.$set(this.taskInfo, 'completeProfitType', 4)
      }
      this.taskDialog = true
      this.$nextTick(() => {
        this.$refs.taskInfo.clearValidate()
      })
      // this.saveLoading = false
    },
    addCondition () {
      this.taskInfo.jobConditionList.push({
        conditionType: '',
        conditionNum: '',
        key: Date.now()
      })
    },
    change () {
      this.taskInfo.jobConditionList.forEach(item => {
        if (item.conditionType == 12) {
          item.conditionUnit = 5
        } else if (item.conditionType == 10) {
          item.conditionUnit = 4
        }
      })
      const arr = []
      this.taskInfo.jobConditionList.forEach(item => {
        if (item.conditionType) {
          arr.push(item.conditionType)
        }
        this.opdisable = arr
      })
    },
    remove (item) {
      var index = this.taskInfo.jobConditionList.indexOf(item)
      if (index !== -1) {
        this.taskInfo.jobConditionList.splice(index, 1)
      }
      this.change()
    },
    closeDialog () {
      this.opdisable = []
      this.$refs.taskInfo.clearValidate()
    },
    choseExam () {
      this.choseExamDialog = true
    },
    // 查看
    check (row) {
      this.checkInfo = JSON.parse(JSON.stringify(this.checkInfoMid))
      this.checkInfoDialog = true
      this.$api.QUERY_JOB_CONFIG({ jobId: row.jobId }).then(res => {
        this.checkInfo = res.data
      })
    },
    saveConfig () {
      this.$refs.taskInfo.validate((valid) => {
        if (valid) {
          this.saveLoading = true
          if (this.taskInfo.jobType == 2) {
            if (!this.examInfo.examId) {
              this.$message({
                message: '请关联考试',
                type: 'warning'
              })
              this.saveLoading = false
            } else {
              this.$api.EDIT_GOODS_EXAM({
                goodsId: this.goodsId,
                examId: this.examInfo.examId
              }).then(() => {
                this.$api.SAVE_TASK_CONFIG({
                  ...this.taskInfo,
                  sourceId: this.goodsId
                }).then(() => {
                  this.saveLoading = false
                  this.taskDialog = false
                  this.getTaskInfos()
                }).catch(() => {
                  this.saveLoading = false
                })
              }).catch(() => {
                this.saveLoading = false
              })
            }
          } else {
            this.$api.SAVE_TASK_CONFIG({
              ...this.taskInfo,
              sourceId: this.goodsId
            }).then(() => {
              this.saveLoading = false
              this.taskDialog = false
              this.getTaskInfos()
            }).catch(() => {
              this.saveLoading = false
            })
          }
        }
      })
    },
    // 删除
    deleteClick (jobId) {
      this.$confirm('确定删除该任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.DELETE_TASK_INFO({
          jobId: jobId
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getTaskInfos()
        })
      }).catch(() => {
        console.log('deleteClick -> 已取消删除')
      })
    },
    saveBtn () {
      if (this.isUpdatetask) {
        this.closeLoaing = true
        this.$api.QUERY_JOB_INFOS({
          sourceId: this.goodsId,
          sourceType: 2,
          partakeType: 2
        }).then(res => {
          const arr = []
          arr.push(res.data.courseCompletion[0])
          arr.push(res.data.examQualifications[0])
          console.log('TCL: saveBtn -> arr', arr)
          this.$api.UPDATETASK({
            saveTaskConfigForm: arr
          }).then(() => {
            if (this.$route.query.goodsId) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '课程新增成功',
                type: 'success'
              })
            }
            this.closeLoaing = false
            const tagName = this.$route.fullPath
            this.close({ tagName }).then(item => { this.$router.push({ path: '/goods/orgwarehouse' }) })
          }).catch(() => {
            this.closeLoaing = false
          })
        }).catch(() => {
          this.closeLoaing = false
        })
      } else {
        if (this.$route.query.goodsId) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '课程新增成功',
            type: 'success'
          })
        }
        const tagName = this.$route.fullPath
        this.close({ tagName }).then(item => { this.$router.push({ path: '/goods/orgwarehouse' }) })
      }
    },
    async getNewCatInfo () {
      const catInfo = await this.getGoodsInfo()
      this.catInfo = catInfo
    },
    async fastTask () {
      await this.getNewCatInfo()
      console.log('TCL: fastTask -> this.getGoodsInfo()', this.getGoodsInfo())
      this.$api.GET_BY_GOODSID({
        goodsId: this.goodsId,
        goodsType: this.$route.query.goodsType ? this.$route.query.goodsType : this.catInfo.goodsType
      }).then(res => {
        this.taskInfo.jobName = res.data.goodsValue
        this.taskInfo.jobConditionList[0].conditionType = 12
        this.taskInfo.jobConditionList[0].conditionNum = 100
        this.taskInfo.determinLogicType = '2'
        this.taskInfo.jobType = 4
        this.$set(this.taskInfo, 'completeProfitType', 4)
        this.$api.SAVE_TASK_CONFIG({
          ...this.taskInfo,
          sourceId: this.goodsId
        }).then(() => {
          this.getTaskInfos()
        })
      })
    },
    getExamInfo (examInfo) {
      this.examInfo = examInfo
      this.choseExamDialog = false
    },
    removeExam () {
      this.examInfo = JSON.parse(JSON.stringify(this.examInfoMid))
    }
  }
}
</script>
<style scoped>
.title {
  display: flex;
  align-items: center;
  margin-bottom: 17px;
}
.line {
  width: 4px;
  height: 20px;
  background: #1e90ff;
  border-radius: 4px;
  float: left;
  margin-right: 10px;
}
.title_text {
  font-size: 18px;
  font-family: 'Source Han Sans CN';
  font-weight: 500;
  line-height: 18px;
  color: #333333;
}
.layout {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin-right: 20px;
  margin-bottom: 10px;
}
.cardbody {
  width: 303px;
  height: 150px;
  background: rgba(255, 255, 255, 0.39);
  border: 1px solid #1e90ff;
  box-shadow: 0px 1px 4px rgba(21, 34, 50, 0.08);
  border-radius: 6px;
  position: relative;
}
.cardHead {
  width: 303px;
  height: 9px;
  background: rgba(30, 144, 255, 0.9);
  border: 1px solid #1e90ff;
  box-shadow: 0px 1px 4px rgba(21, 34, 50, 0.08);
  border-radius: 6px 6px 0px 0px;
  position: absolute;
  top: -1px;
  left: -1px;
}
.cardbottom {
  margin-top: 32px;
  margin-left: 20px;
  margin: 24px 23px 27px 20px;
}
.taskName {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 600;
  line-height: 27px;
  color: #5a607f;
  letter-spacing: 1px;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.time {
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 20px;
  color: #7e84a3;
}
.addBtn {
  width: 151px;
  height: 151px;
  background: rgba(30, 144, 255, 0.1);
  padding: 55px 55px;
  cursor: pointer;
}
.warn {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #444444;
}
</style>
