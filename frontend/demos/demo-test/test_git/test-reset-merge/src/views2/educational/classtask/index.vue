<template>
  <div class="special">
    <d2-container>
      <template slot="header">
        <span class="page-title">班级任务-{{jobName}}</span>
        <span class="notes"
              style="font-size: 12px;margin-left: 10px;color: #888888;">为确保学员能正常进行考试、证书申领，请预先配置完成对应任务配置。</span>
        <el-button type="primary"
                   plain
                   style="float: right;border: 1px solid #1E90FF;"
                   size="mini"
                   @click="back">返回</el-button>
      </template>
      <div class="contanier"
           v-loading="contanierLoading">
        <div class="title">
          <span class="line"></span><span class="title_text">学分型</span>
        </div>
        <div class="layout">
          <div class="card"
               v-for="(item,index) in classStudyScore"
               :key="index">
            <div class="cardbody">
              <div class="cardHead"></div>
              <div class="cardbottom">
                <span class="taskName">{{item.jobName}}</span>
                <div style="display: flex;justify-content:space-between;align-items:center">
                  <div>
                    <span style="color: #1E90FF;font-size: 25px;">{{item.completeProfitValue}}</span>
                    <span>学分</span>
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
               @click="addTask('1')">
            <!-- 学分型 -->
            <img src="@/assets/images/addBtn.png"
                 style="width: 40px;" />
          </div>
        </div>
        <div class="title">
          <span class="line"></span><span class="title_text">考试资格型</span>
        </div>
        <div class="layout">
          <div class="card"
               v-for="(item,i) in examQualifications"
               :key="i">
            <div class="cardbody">
              <div class="cardHead"></div>
              <div class="cardbottom">
                <span class="taskName">{{item.jobName}}</span>
                <div style="display: flex;justify-content:space-between;align-items:center">
                  <div>
                    <span style="font-size: 15px;line-height: 27px;color: #1E90FF;letter-spacing: 1px;">考试资格</span>
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
               v-if="examQualifications.length==0">
            <!-- 考试资格型 -->
            <img src="@/assets/images/addBtn.png"
                 style="width: 40px;" />
          </div>
        </div>
        <div class="title">
          <span class="line"></span><span class="title_text">证书资格型</span>
        </div>
        <div class="layout"
             style="margin-bottom: 28px;">
          <div class="card"
               v-for="(item,index) in certApplyQualifications"
               :key="index">
            <div class="cardbody">
              <div class="cardHead"></div>
              <div class="cardbottom">
                <span class="taskName">{{item.jobName}}</span>
                <div style="display: flex;justify-content:space-between;align-items:center">
                  <div>
                    <span style="font-size: 15px;line-height: 27px;color: #1E90FF;letter-spacing: 1px;">证书资格</span>
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
               @click="addTask('3')"
               v-if="certApplyQualifications.length==0">
            <!-- 证书资格型 -->
            <img src="@/assets/images/addBtn.png"
                 style="width: 40px;" />
          </div>
        </div>
        <div class="title">
          <span class="line"></span><span class="title_text">学员结业任务</span>
        </div>
        <div class="layout"
             style="margin-bottom: 10px;">
          <div class="card"
               v-for="(item,index) in classGraduate"
               :key="index">
            <div class="cardbody">
              <div class="cardHead"></div>
              <div class="cardbottom">
                <span class="taskName">{{item.jobName}}</span>
                <div style="display: flex;justify-content:space-between;align-items:center">
                  <div>
                    <span style="font-size: 15px;line-height: 27px;color: #1E90FF;letter-spacing: 1px;">学员结业</span>
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
               @click="addTask('5')"
               v-if="!classGraduate || classGraduate.length==0">
            <!-- 证书资格型 -->
            <img src="@/assets/images/addBtn.png"
                 style="width: 40px;" />
          </div>
        </div>
        <div style="margin-bottom:28px;">
          <span style="color:#606266;"
                @click="saveConfig(1)"
                v-if="(!certApplyQualifications || (certApplyQualifications && !certApplyQualifications.length)) || (classGraduate && classGraduate.length)">+快捷创建：同证书资格任务</span>
          <span style="color:#1E90FF;cursor: pointer;"
                @click="saveConfig(1)"
                v-if="(certApplyQualifications && certApplyQualifications.length) && (!classGraduate || (classGraduate && !classGraduate.length))">+快捷创建：同证书资格任务</span>
        </div>
        <!-- <div style="display: flex;align-items: center;">
          <el-button type="primary"
                     @click="refresh">保存</el-button>
          <span class="warn"
                style="width:18px;margin:0 9px 0 20px;">
            <el-checkbox v-model="checked">如需影响到已购课学员，请勾选此按钮后保存</el-checkbox>
          </span>
        </div> -->
      </div>
      <el-dialog title="新增任务"
                 :visible.sync="taskDialog"
                 width="50%"
                 @close="closeDialog"
                 :close-on-click-modal=false>
        <el-form :model="taskInfo"
                 :rules="taskRules"
                 ref="taskInfo"
                 label-width="120px"
                 :inline="true">
          <el-form-item label="名称"
                        prop="jobName"
                        style="display: block;">
            <el-input v-model="taskInfo.jobName"
                      style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item style="display: block;"
                        label="请选择完成条件">
            <template>
              <div style="margin-bottom:10px;"
                   v-if="taskInfo.jobType != 3 && taskInfo.jobType != 5">
                <el-checkbox v-model="checked1"
                             style="margin-right:15px"></el-checkbox>
                <span>学员入班</span>
              </div>
              <!-- 请选择完成条件 -->
              <div v-for="(domain, index) in taskInfo.jobConditionList"
                   :key="domain.key">

                <el-checkbox v-model="domain.checked"
                             style="margin-right:15px;"></el-checkbox>
                <el-select v-model="domain.conditionLinkId"
                           style="width:120px;margin-right:10px"
                           @change="change(domain, index, 1)">
                  <el-option v-for="item in options"
                             :key="item.studyContentClassificationId"
                             :label="item.classificationName"
                             :value="item.studyContentClassificationId">
                  </el-option>
                </el-select>
                <el-select v-model="domain.conditionType"
                           v-if="domain.conditionLinkId == '4'"
                           style="width:120px;"
                           @change="change(domain)">
                  <el-option v-for="item in OptionS1"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="domain.conditionType"
                           v-else
                           style="width:120px;"
                           @change="change(domain)">
                  <el-option v-for="item in OptionS2"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                <span style="margin:0 10px 0 10px;">达到</span>
                <el-form-item style="width:90px">
                  <el-input v-model="domain.conditionNum"
                            style="width:90px"
                            onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                            onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <span v-if="domain.conditionType == 3 || domain.conditionType == 14">学时</span>
                <span v-if="domain.conditionType == 1 || domain.conditionType == 13">门</span>
                <span v-if="domain.conditionType == 2">分钟</span>
                <el-button type="text"
                           v-if="index == 0"
                           @click="addCondition"
                           style="margin-left: 10px;">
                  <div class="Add">+</div>
                </el-button>
                <el-button type="text"
                           @click.prevent="remove(domain)"
                           style="margin-left: 10px;"
                           v-if="index!=0">
                  <div class="Delete">—</div>
                </el-button>
              </div>
              <!-- 直播学时 -->
              <div style="margin-bottom:20px;">
                <el-checkbox v-model="checked2"
                             style="margin-right:15px"></el-checkbox>
                直播学时数达到
                <el-input v-model="LiveSchool"
                          style="width:90px;margin: 0 10px"
                          onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                          onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"></el-input>学时
              </div>
              <!-- 班级考试 -->
              <div style="margin-bottom:20px;"
                   v-if="taskInfo.jobType != 2">
                <el-checkbox v-model="checked3"
                             style="margin-right:15px"></el-checkbox>
                班级考试成绩达到
                <el-input v-model="ClassTest"
                          style="width:90px;margin: 0 10px"
                          onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                          onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"></el-input>分
              </div>
              <!-- 班级学分 -->
              <div v-if="taskInfo.jobType != 1"
                   style="margin-bottom:20px;">
                <el-checkbox v-model="checked4"
                             style="margin-right:15px"></el-checkbox>
                班级学分达到
                <el-input v-model="ClassCredits"
                          style="width:90px;margin: 0 10px"
                          onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                          onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"></el-input>分
              </div>
            </template>
          </el-form-item>
          <el-form-item label="条件判定逻辑"
                        prop="determinLogicType"
                        style="display: block;">
            <el-radio-group v-model="taskInfo.determinLogicType">
              <el-radio label="2">全部需要完成</el-radio>
              <el-radio label="1">随机完成一个</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="完成奖励"
                        style="display: block;">
            <!-- <el-radio-group v-model="taskInfo.completeProfitType">
                <div style="margin-bottom: 20px;">
                  <el-radio label="1">班级学分</el-radio>
                  <el-input-number v-model="taskInfo.completeProfitValue" :min="0" :controls="false" :precision="0" :disabled="disabled"></el-input-number>
                </div>
                <div style="margin-bottom: 20px;">
                  <el-radio label="2" >考试资格</el-radio>
                </div>
                <div style="margin-bottom: 20px;">
                  <el-radio label="3">证书申领资格</el-radio>
                </div>
              </el-radio-group> -->
            <span v-if="taskInfo.completeProfitType == 1">
              <span style="margin-right: 15px;">班级学分</span>
              <el-input v-model="taskInfo.completeProfitValue"
                        style="width:100px;margin-right:10px"
                        onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                        onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"></el-input>
              <span>分</span>
            </span>
            <span v-if="taskInfo.completeProfitType == 2">考试资格</span>
            <span v-if="taskInfo.completeProfitType == 3">证书资格</span>
            <span v-if="taskInfo.completeProfitType == 6">学员结业</span>
          </el-form-item>
          <el-form-item style="margin-left: 45%;">
            <el-button type="primary"
                       @click="saveConfig()"
                       :loading="saveLoading">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="任务信息"
                 :visible.sync="checkInfoDialog"
                 :close-on-click-modal=false
                 width="40%">
        <el-form label-width="130px">
          <el-form-item label="名称：">
            {{checkInfo.jobName}}
          </el-form-item>
          <el-form-item label="完成条件：">
            <span v-for="(item,i) in checkInfo.jobConditionList"
                  :key="i"
                  style="display:block">
              <span v-if="item.conditionType==1">课程学习完成数</span>
              <span v-if="item.conditionType==2">课程学习时间</span>
              <span v-if="item.conditionType==3">课程课时数</span>
              <span v-if="item.conditionType==4">考试成绩</span>
              <span v-if="item.conditionType==5">班级学分</span>
              <span v-if="item.conditionType==6">直播课时数</span>
              <span v-if="item.conditionType==7">学员入班</span>
              <span v-if="item.conditionType==13">{{item.conditionLinkName}}分类课程完成门数</span>
              <span v-if="item.conditionType==14">{{item.conditionLinkName}}分类课程课时数</span>
              <span v-if="item.conditionType!=7">达到</span>
              <span v-if="item.conditionType!=7">{{item.conditionNum}}</span>
              <span v-if="item.conditionType==1 || item.conditionType == 13">门</span>
              <span v-if="item.conditionType==2">分钟</span>
              <span v-if="item.conditionType==3||item.conditionType==6 || item.conditionType == 14">课时</span>
              <span v-if="item.conditionType==4||item.conditionType==5">分</span>
            </span>
          </el-form-item>
          <el-form-item label="条件判定逻辑：">
            <span v-if="checkInfo.determinLogicType==1">随机完成一个</span>
            <span v-if="checkInfo.determinLogicType==2">全部需要完成</span>
          </el-form-item>
          <el-form-item label="完成奖励：">
            <span v-if="checkInfo.completeProfitType==1">班级学分{{checkInfo.completeProfitValue}}</span>
            <span v-if="checkInfo.completeProfitType==2">考试资格</span>
            <span v-if="checkInfo.completeProfitType==3">证书资格</span>
            <span v-if="checkInfo.completeProfitType==6">学员结业</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- <template slot="footer">
        <div style="text-align:center">
        <el-button type="primary" plain style="width:150px;border: 2px solid #1E90FF;font-weight: 500;" size="mini" @click="refresh">刷新</el-button>
        </div>
      </template> -->
    </d2-container>
  </div>
</template>
<script>
/* eslint-disable */ 

export default {
  watch: {
    /* 'taskInfo.completeProfitType': {
      handler (val) {
        if (val == 1) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },
      immediate: true
    }, */
    taskDialog (val) {
      if (val !== '') {
        if (!this.$refs.taskInfo) {
          this.$nextTick(() => {
            this.$refs.taskInfo.resetFields()
          })
        } else {
          this.$refs.taskInfo.resetFields()
        }
      }
    }
  },
  data () {
    return {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      LiveSchool: '',
      ClassTest: '',
      ClassCredits: '',
      contanierLoading: false,
      jobName: this.$route.query.className,
      // tableData: [],
      classStudyScore: [],
      examQualifications: [],
      certApplyQualifications: [],
      classGraduate: [],
      options: [{
        studyContentClassificationId: '4',
        classificationName: '全部课程'
      }],
      OptionS1: [
        {
          value: '3',
          label: '课时数'
        }, {
          value: '1',
          label: '完成门数'
        },
        {
          value: '2',
          label: '学习时长'
        }
      ],
      OptionS2: [
        {
          value: '14',
          label: '分类课程课时数'
        }, {
          value: '13',
          label: '分类课程完成门数'
        }
      ],
      optionsMid: [],
      unitOptions: [
        {
          value: '1',
          label: '门'
        }, {
          value: '2',
          label: '分钟'
        },
        {
          value: '3',
          label: '课时'
        },
        {
          value: '4',
          label: '分'
        }
      ],
      taskDialog: false,
      taskInfo: {
        jobType: 1,
        jobName: this.$route.query.className,
        cycleType: 1, // 任务时效类型 1 一次性任务 2周期性任务
        partakeType: 1, // 参与者类型 1 班级学员
        sourceType: 1, // 来源对象类型 1 班级
        determinLogicType: '2',
        completeProfitType: 1,
        completeProfitValue: '',
        jobConditionList: [
          {
            conditionType: '3',
            conditionNum: '',
            key: Date.now(),
            conditionUnit: '3',
            checked: false,
            conditionLinkId: '4',
            conditionLinkName: ''
          }
        ],
        reward: ''
      },
      disabled: false,
      opdisable: [],
      taskRules: {
        jobName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        determinLogicType: [{ required: true, message: '请选择条件判定逻辑', trigger: 'change' }]
        // completeProfitValue: [{ required: true, message: '请输入完成奖励', trigger: 'blur' }]
      },
      checkInfo: {},
      checkInfoMid: {},
      checkInfoDialog: false,
      saveLoading: false,
      checked: false,
      Show: true,
      State: true
    }
  },
  created () {
    this.$api.SEARCH_FOR_FREE_COURSES({
      classId: this.$route.query.classId
    }).then(res => {
      if (res.data.length > 0) {
        res.data.forEach(item => {
          this.options.push(item)
        })
      }
    })
    this.getTaskInfos()
    this.defaultForm = JSON.parse(JSON.stringify(this.taskInfo))
    this.optionsMid = JSON.parse(JSON.stringify(this.options))
    this.checkInfoMid = JSON.parse(JSON.stringify(this.checkInfo))
  },
  methods: {
    getTaskInfos () {
      this.contanierLoading = true
      this.$api.QUERY_JOB_INFOS({
        sourceId: this.$route.query.classId,
        sourceType: 1,
        partakeType: 1
      }).then(res => {
        /*   this.tableData = res.data
          res.data.forEach(item => {
            if (item.completeProfitType == 1) {
              item.reward = item.completeProfitValue + '学分'
            }
            if (item.completeProfitType == 2) {
              item.reward = '考试资格'
            }
            if (item.completeProfitType == 3) {
              item.reward = '证书申领资格'
            }
          }) */
        this.classStudyScore = res.data.classStudyScore
        this.examQualifications = res.data.examQualifications
        this.certApplyQualifications = res.data.certApplyQualifications
        this.classGraduate = res.data.classGraduate
        this.contanierLoading = false
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
    // 查看
    check (row) {
      this.checkInfo = JSON.parse(JSON.stringify(this.checkInfoMid))
      this.checkInfoDialog = true
      this.$api.QUERY_JOB_CONFIG({ jobId: row.jobId }).then(res => {
        this.checkInfo = res.data
      })
    },
    // 新增任务弹窗
    addTask (flag) {
      // this.options = JSON.parse(JSON.stringify(this.optionsMid))
      this.taskInfo = JSON.parse(JSON.stringify(this.defaultForm))
      if (flag == '1') { // 学分型
        this.taskInfo.jobType = 1
        // this.options.splice(6, 1)
        this.$set(this.taskInfo, 'completeProfitType', 1)
      } else if (flag == '2') { // 考试资格型
        this.taskInfo.jobType = 2
        // this.options.splice(5, 1)
        this.$set(this.taskInfo, 'completeProfitType', 2)
      } else if (flag == '3') { // 证书资格型
        this.taskInfo.jobType = 3
        this.$set(this.taskInfo, 'completeProfitType', 3)
      } else if (flag == '5') { // 学员结业
        this.taskInfo.jobType = 5
        this.$set(this.taskInfo, 'completeProfitType', 6)
      }
      this.taskDialog = true
      this.saveLoading = false
    },
    addCondition () {
      this.taskInfo.jobConditionList.push({
        conditionType: '3',
        conditionNum: '',
        key: Date.now(),
        conditionUnit: '3',
        checked: false,
        conditionLinkId: '4',
        conditionLinkName: ''
      })
    },
    change (domain, index, num) {
      if (num) {
        if (domain.conditionLinkId == '4') {
          this.taskInfo.jobConditionList[index].conditionType = '3'
        }
        if (domain.conditionLinkId != '4') {
          this.taskInfo.jobConditionList[index].conditionType = '14'
        }
      }
      console.log(domain, index)

      this.taskInfo.jobConditionList.forEach(item => {
        if (index >= 0) {
          this.options.forEach((items) => {
            if (domain.conditionLinkId == items.studyContentClassificationId) {
              this.taskInfo.jobConditionList[index].conditionLinkName = items.classificationName
            }
          })
        }
        if (item.conditionType == 1 || item.conditionType == 13) {
          item.conditionUnit = 1 // 门
        } else if (item.conditionType == 2) {
          item.conditionUnit = 2// 分钟
        } else if (item.conditionType == 3 || item.conditionType == 6 || item.conditionType == 14) {
          item.conditionUnit = 3 // 课时
        } else if (item.conditionType == 4 || item.conditionType == 5) {
          item.conditionUnit = 4 // 分
        }
        console.log(item.conditionUnit)
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
      this.checked1 = false,
      this.checked2 = false,
      this.checked3 = false,
      this.checked4 = false,
      this.LiveSchool = '',
      this.ClassTest = '',
      this.ClassCredits = '',
      this.opdisable = []
    },
    // 弹窗内容保存
    saveConfig (type) {
      if (type) {
        this.certApplyQualifications[0].jobId = undefined
        this.certApplyQualifications[0].jobConditionList.map(res => {
          res.jobConditionId = undefined
          res.jobId = undefined
        })
        this.$api.SAVE_TASK_CONFIG({
          ...this.certApplyQualifications[0],
          sourceId: this.$route.query.classId,
          jobType: 5,
          completeProfitType: 6
        }).then(res => {
          this.taskDialog = false
          this.$notify({
            title: '提示',
            message: '创建成功!',
            type: 'success'
          })
          this.getTaskInfos()
        }).catch(e => {
        })
      } else {
        const arr = []
        const list = []
        this.taskInfo.jobConditionList.forEach((item, index) => {
          arr.push(item.checked)
          if (item.checked && item.conditionNum == '') {
            this.State = false
            this.$notify({ title: '提示', message: '请输入完成条件', type: 'info' })
          } else {
            this.State = true
            if (item.checked && item.conditionNum != '') {
              list.push(item)
            }
          }
        })
        if (!this.State) {
          return
        }
        if (arr.indexOf(true) == -1) {
          this.Show = false
        } else {
          this.Show = true
        }
        const taskInfo = {
          jobType: this.taskInfo.jobType,
          jobName: this.taskInfo.jobName,
          cycleType: this.taskInfo.cycleType, // 任务时效类型 1 一次性任务 2周期性任务
          partakeType: this.taskInfo.partakeType, // 参与者类型 1 班级学员
          sourceType: this.taskInfo.sourceType, // 来源对象类型 1 班级
          determinLogicType: this.taskInfo.determinLogicType,
          completeProfitType: this.taskInfo.completeProfitType,
          completeProfitValue: this.taskInfo.completeProfitValue,
          jobConditionList: list,
          reward: this.taskInfo.reward
        }
        if (this.checked1 == true) {
          list.push({ conditionType: 7 })
        }
        if (this.checked2 == true && this.LiveSchool != '') {
          list.push({ conditionType: 6, conditionUnit: 3, conditionNum: this.LiveSchool })
        }
        if (this.checked3 == true && this.ClassTest != '') {
          list.push({ conditionType: 4, conditionUnit: 4, conditionNum: this.ClassTest })
        }
        if (this.checked4 == true && this.ClassCredits != '') {
          list.push({ conditionType: 5, conditionUnit: 4, conditionNum: this.ClassCredits })
        }
        if (this.checked1 == false && this.checked2 == false && this.checked3 == false && this.checked4 == false && this.Show == false) {
          this.$notify({ title: '提示', message: '请选择完成条件', type: 'info' })
        } else if (this.checked2 == true && this.LiveSchool == '') {
          this.$notify({ title: '提示', message: '请输入直播学时数', type: 'info' })
        } else if (this.checked3 == true && this.ClassTest == '') {
          this.$notify({ title: '提示', message: '请输入班级考试成绩', type: 'info' })
        } else if (this.checked4 == true && this.ClassCredits == '') {
          this.$notify({ title: '提示', message: '请输入班级学分', type: 'info' })
        } else if (this.taskInfo.jobType == 1 && this.taskInfo.completeProfitValue == '') {
          this.$notify({ title: '提示', message: '请输入完成奖励', type: 'info' })
        } else {
          this.$refs.taskInfo.validate((valid) => {
            if (valid) {
              this.saveLoading = true
              this.$api.SAVE_TASK_CONFIG({
                ...taskInfo,
                sourceId: this.$route.query.classId
              }).then(res => {
                this.taskDialog = false
                this.$notify({
                  title: '提示',
                  message: '关联任务配置成功!',
                  type: 'success'
                })
                this.getTaskInfos()
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
    },
    // 返回
    back () {
      this.$router.push({
        path: '/educational/class'
      })
    },
    // 刷新
    refresh () {
      if (this.checked) {
        this.$api.QUERY_JOB_INFOS({
          sourceId: this.$route.query.classId,
          sourceType: 1,
          partakeType: 1
        }).then(res => {
          this.checked = false
          const arr = []
          arr.push(res.data.classGraduate[0])
          arr.push(res.data.certApplyQualifications[0])
          arr.push(res.data.examQualifications[0])
          res.data.classStudyScore.forEach(ele => {
            arr.push(ele)
          })
          this.$api.UPDATETASK({
            saveTaskConfigForm: arr
          }).then(() => {
            this.getTaskInfos()
            this.$notify({
              title: '提示',
              message: '保存成功!',
              type: 'success'
            })
            this.getTaskInfos()
          })
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
.Add {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: #1e90ff 1px solid;
  color: #1e90ff;
}
.Delete {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  align-items: center;
  border: #ff1e1e 1px solid;
  color: #ff1e1e;
}
::v-deep .el-form-item__content {
  margin-bottom: 0 !important;
}
::v-deep .el-form-item__label {
  width: 130px !important;
}
.contanier {
  background-color: white;
  padding: 20px;
  padding-right: 0;
}
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
  font-family: Source Han Sans CN;
  font-weight: bold;
  line-height: 18px;
  color: #333333;
}
.layout {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
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
