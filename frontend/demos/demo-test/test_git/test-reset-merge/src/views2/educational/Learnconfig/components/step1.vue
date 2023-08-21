<template>
    <el-container v-loading="maskLoading">
      <el-main style="height:70vh;">
        <div>
        <span class="line"></span>自由选课
        <el-switch
          v-model="isOpenFreeSelection"
          active-color="#409eff"
          inactive-color="#dcdfe6"
          :active-value="1"
          :inactive-value="2"
          @change="selectChange"
        >
        </el-switch>
        </div>
        <div style="margin-top: 25px;margin-bottom: 25px;" v-if="isOpenFreeSelection==1">
        <span class="line"></span>选课要求
        <el-radio-group v-model="ruleType" @change="rulechange">
          <el-radio :label="2">按课时</el-radio>
          <el-radio :label="1">按门数</el-radio>
          <el-radio :label="3">门数+课时</el-radio>
        </el-radio-group>
        <div style="margin-top: 25px;margin-left: 80px;" v-if="ruleType==2||ruleType==3">
          总课时 达到
          <!-- <el-input-number v-model="selectClassHour" :precision="2" :step="1" :min="0" :max="currentTotalHours.toFixed(2)" :controls=false
          ></el-input-number> -->
          <el-input-number v-model="selectClassHour" :precision="2" :step="1" :min="0" :controls=false
          ></el-input-number>
        </div>
        <div style="margin-top: 25px;margin-left: 80px;" v-if="ruleType==1">
          总门数 达到
          <!-- <el-input-number v-model="classNumber" :precision="0" :step="1" :min="0" :max="currentTotalNumber" :controls=false placeholder=""></el-input-number> -->
          <el-input-number v-model="classNumber" :precision="0" :step="1" :min="0" :controls=false placeholder=""></el-input-number>
        </div>
        </div>
        <div style="margin-top: 25px;margin-bottom: 25px;">
        <span class="line"></span>课程目录（总课时：{{currentTotalHours.toFixed(2)}}）
        </div>
        <div class="classifyCard" v-for="(item,i) in studyContentParams" :key="i">
          <div class="cardHead">
            <el-input v-model="item.classificationName" placeholder="请输入分类名称" style="width:50%"></el-input>
            <div style="float:right;" v-if="isOpenFreeSelection==2||ruleType==1||ruleType==3">
            <span>必选门数：</span>
            <!-- <el-input-number v-model="item.requiredMinNumber" :precision="0" :step="1" :min="0" :max="item.studyContents.length" :controls=false placeholder="最小值"></el-input-number> -->
            <el-input-number v-model="item.requiredMinNumber" :precision="0" :step="1" :min="0" :controls=false placeholder="最小值"></el-input-number>
            ~
            <!-- <el-input-number v-model="item.requiredMaxNumber" :precision="0" :step="1" :min="item.requiredMinNumber" :max="item.studyContents.length" :controls=false placeholder="最大值"></el-input-number> -->
            <el-input-number v-model="item.requiredMaxNumber" :precision="0" :step="1" :min="item.requiredMinNumber" :controls=false placeholder="最大值"></el-input-number>
            <i class="el-icon-close" style="margin-left: 25px;cursor: pointer;" @click="deleteCard(i)"></i>
            </div>
            <div style="float:right;" v-if="isOpenFreeSelection==1&&ruleType==2">
            <span>课时要求：</span>
            <!-- <el-input-number v-model="item.requiredMinHour" :precision="2" :step="1" :min="0" :max="item.classifyHour" :controls=false placeholder="最小值"></el-input-number> -->
            <el-input-number v-model="item.requiredMinHour" :precision="2" :step="1" :min="0" :controls=false placeholder="最小值"></el-input-number>
            <i class="el-icon-close" style="margin-left: 25px;cursor: pointer;" @click="deleteCard(i)"></i>
            </div>
          </div>
          <div class="cardBody">
            <el-table
              :data="item.studyContents"
              border
              :header-cell-style="{background:'#f9f9f9'}"
              style="width: 100%;">
              <el-table-column
                prop="goodsValue"
                label="课程名称"
              >
              </el-table-column>
              <el-table-column
                prop="sourceLearnHour"
                label="课时"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="classLearnHour"
                label="班级课时"
                width="300"
              >
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.classLearnHour" :precision="2" :step="0.01" :min="0"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="160">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="moveUpBtn(scope.row,i)"
                    type="text"
                    size="small"
                    :disabled="scope.$index==0"
                  >
                    上移
                  </el-button>
                  <el-button
                    @click.native.prevent="moveDownBtn(scope.row,i)"
                    type="text"
                    size="small"
                    :disabled="(scope.$index+1)==item.studyContents.length"
                  >
                    下移
                  </el-button>
                  <el-button
                    @click.native.prevent="deleteBtn(scope.$index,i)"
                    type="text"
                    size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-link icon="el-icon-plus" :underline="false" type="primary" style="margin-top: 15px;width: 120px;" @click="choseCourse(i)">添加课程</el-link>
          </div>
        </div>
        <!-- 直接添加课程的表格 -->
        <el-table
          v-if="studyContentInfos.length>0"
          :data="studyContentInfos"
          border
          :header-cell-style="{background:'#f9f9f9'}"
          style="width: 100%;">
          <el-table-column
            prop="goodsValue"
            label="课程名称"
          >
          </el-table-column>
          <el-table-column
            prop="sourceLearnHour"
            label="课时"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="classLearnHour"
            label="班级课时"
            width="300"
          >
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.classLearnHour" :precision="2" :step="0.01" :min="0"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="moveUpBtn2(scope.row)"
                type="text"
                size="small"
                :disabled="scope.$index==0"
              >
                上移
              </el-button>
              <el-button
                @click.native.prevent="moveDownBtn2(scope.row)"
                type="text"
                size="small"
                :disabled="(scope.$index+1)==studyContentInfos.length"
              >
                下移
              </el-button>
              <el-button
                @click.native.prevent="deleteBtn2(scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-bottom:10px;" v-if="isOpenFreeSelection==2">
          <el-link icon="el-icon-plus" :underline="false" type="primary" style="margin-top: 15px;width: 120px;" @click="choseCourse('direct')">添加课程</el-link>
        </div>
        <div @click="addClassify" style="width: 126px">
        <el-button type="primary" style="margin-top: 15px;" :disabled="studyContentInfos.length > 0">添加课程分类</el-button>
        </div>
      </el-main>
          <el-dialog
            title="选择课程"
            :visible.sync="choseCourseDialog"
            :close-on-click-modal=false
            width="80%"
            :before-close="handleClose"
            >
            <chose-course
            ref="choseCourseRef"
            :chose-data-count="choseData"
            >
            </chose-course>
            <span slot="footer" class="dialog-footer">
              <el-button @click="choseCourseDialog = false">取 消</el-button>
              <el-button type="primary" @click="choseCourseDefine">确 定</el-button>
            </span>
          </el-dialog>
      <el-footer style="text-align: center;height:40px;">
        <el-button
        type="primary"
        @click="next"
        :loading="loading"
      >
        下一步
      </el-button>
      </el-footer>
    </el-container>
</template>
<script>
import ChoseCourse from './chosecourse/chose-course.vue'
import { moveUpById, moveDownBySth, arrRemoveRepeat } from '@/utils/array-utils'
import { mapActions } from 'vuex'
export default {
  components: {
    ChoseCourse
  },
  data () {
    return {
      ruleType: 2, // 选课要求 1-按门数 2-按课时 3-门数+课时
      selectClassHour: undefined, // 达标总课时
      classNumber: undefined, // 达标总门数
      studyPlanId: '',
      choseCourseDialog: false,
      choseData: [],
      loading: false,
      isOpenFreeSelection: 2,
      currentTotalHours: 0, // 所有分类总课时
      currentTotalNumber: 0, // 所有分类总门数
      studyContentParams: [
        /*  {
          requiredMinHour:'',// 该分类下必选课时最小值
          classificationName: '', // 课程目录名称（学习内容分类名称）
          //requiredNumber: 1, // 课程目录下必选课程的数量
          requiredMinNumber: 0, // 该学习内容分类下必选门数的最小值
          requiredMaxNumber: 0, // 该学习内容分类下必选门数的最大值
          studyContents: [
            {
              courseServiceId: '', // 课程服务商品id【必须】',
              goodsValue: '', // 课程名称【必须】',
              sourceLearnHour: '', // 课时【必须】',
              classLearnHour: '', // 班级课时',
              goodsId: '' // 商品id【必须】'
            }
          ]
        } */
      ],
      studyContentInfos: [
        /* {
          courseServiceId: '', // 课程服务商品id【必须】',
          goodsValue: '', // 课程名称【必须】',
          sourceLearnHour: '', // 课时【必须】',
          classLearnHour: '', // 班级课时',
          goodsId: '' // 商品id【必须】'
        } */
      ],
      index: 0,
      flag: true, // 是否直接添加课程
      maskLoading: false
    }
  },
  watch: {
    studyContentParams: {
      handler (oldval, newval) {
        this.currentTotalHours = 0
        this.currentTotalNumber = 0
        if (newval) {
          this.studyContentParams.forEach(res => {
            res.classifyHour = 0
            this.currentTotalNumber = this.currentTotalNumber + res.studyContents.length
            res.studyContents.forEach(item => {
              if (!item.classLearnHour && item.classLearnHour != 0) {
                this.$set(item, 'classLearnHour', 0)
              }
              res.classifyHour = res.classifyHour + item.classLearnHour
              this.currentTotalHours = this.currentTotalHours + item.classLearnHour
            })
          })
        }
      },
      deep: true
      // immediate: true
    },
    studyContentInfos: {
      handler (oldval, newval) {
        this.currentTotalHours = 0
        if (newval) {
          this.studyContentInfos.forEach(res => {
            if (!res.classLearnHour && res.classLearnHour != 0) {
              this.$set(res, 'classLearnHour', 0)
            }
            this.currentTotalHours = this.currentTotalHours + res.classLearnHour
          })
        }
      },
      deep: true
      // immediate: true
    }
  },
  created () {
    this.echo()
  },
  methods: {
    ...mapActions('d2admin/studyplan', ['setStudyInfo', 'getStudyInfo']),
    echo () {
      this.maskLoading = true
      this.$api.QUERT_STUDY_CONTENT({
        sourceId: this.$route.query.classId,
        studyContentType: 1
      }).then(res => {
        if (res.data.studyContentVOS && res.data.studyContentVOS.length > 0) {
          this.studyContentInfos = res.data.studyContentVOS
          this.choseData = []
          this.choseData = this.studyContentInfos
        }
        if (res.data.classifiedStudyContentVOS && res.data.classifiedStudyContentVOS.length > 0) {
          this.studyContentParams = res.data.classifiedStudyContentVOS
          this.synchronization()
        }
        if (res.data.isOpenFreeSelection) {
          this.isOpenFreeSelection = res.data.isOpenFreeSelection
          this.ruleType = res.data.ruleType
          if (res.data.ruleType == 1) { // 门数
            this.classNumber = res.data.classNumber// 门数如实回显
            this.selectClassHour = undefined// 课时置空
            this.studyContentParams.forEach(item => {
              item.requiredMinHour = 0// 分类的必选课时置空
            })
          } else if (res.data.ruleType == 2) { // 课时
            this.selectClassHour = res.data.selectClassHour// 课时如实回显
            this.classNumber = undefined// 门数置空
            this.studyContentParams.forEach(item => {
              item.requiredMinNumber = 0// 分类的门数置空
              item.requiredMaxNumber = 0
            })
          } else if (res.data.ruleType == 3) { // 课时+门数
            this.selectClassHour = res.data.selectClassHour// 课时如实回显
            this.classNumber = undefined// 门数置空
            this.studyContentParams.forEach(item => {
              item.requiredMinHour = 0// 分类的必选课时置空
            })
          }
        }
        this.studyPlanId = res.data.studyPlanId
        this.maskLoading = false
      }).catch(() => {
        this.maskLoading = false
      })
    },
    addClassify () {
      if (this.studyContentInfos.length > 0) {
        this.$message({
          message: '请清除已选择课程再试',
          type: 'warning'
        })
      } else {
        this.studyContentParams.push({ classificationName: '', requiredMinNumber: 0, requiredMaxNumber: 0, requiredMinHour: 0, studyContents: [] })
      }
    },
    deleteCard (i) {
      this.studyContentParams.splice(i, 1)
      this.synchronization()
    },
    // 新增课程
    choseCourse (i) {
      if (i == 'direct') { // 直接添加课程
        this.flag = true
        if (this.studyContentParams.length > 0) {
          this.$message({
            message: '请清除已添加的分类再试',
            type: 'warning'
          })
        } else {
          this.choseCourseDialog = true
        }
      } else {
        this.index = i
        this.flag = false
        this.choseCourseDialog = true
      }
    },
    // 确定选择课程按钮
    choseCourseDefine () {
      this.choseCourseDialog = false
      let arr = []
      arr = this.$refs.choseCourseRef.getSelectedList()
      const midArr = arrRemoveRepeat(this.choseData, arr, 'goodsId')
      let newArr = []
      newArr = midArr.map(e => {
        return {
          courseServiceId: e.courseServiceId,
          goodsValue: e.goodsValue,
          sourceLearnHour: e.learnHours,
          goodsId: e.goodsId,
          classLearnHour: e.learnHours,
          bannerImgUrl: e.goodsImg,
          goodsContentType: e.goodsContentType,
          goodsYear: e.goodsYear
        }
      })
      if (this.flag) { // 直接添加课程
        newArr.forEach(res => {
          this.studyContentInfos.push(res)
        })
        this.choseData = []
        this.choseData = this.studyContentInfos
      } else {
        newArr.forEach(res => {
          this.studyContentParams[this.index].studyContents.push(res)
        })
        this.synchronization()
      }
    },
    // 同步大类表格与弹窗中被选中的课程
    synchronization () {
      this.choseData = []
      this.studyContentParams.forEach(item => {
        item.studyContents.forEach(res => {
          this.choseData.push(res)
        })
      })
    },
    // 取消选择课程
    handleClose () {
      this.choseCourseDialog = false
    },
    // 删除已选课程（大类）
    deleteBtn (index, i) {
      this.studyContentParams[i].studyContents.splice(index, 1)
      this.synchronization()
      this.studyContentParams[i].requiredMinNumber = 0
      this.studyContentParams[i].requiredMaxNumber = 0
      this.studyContentParams[i].requiredMinHour = 0
      this.selectClassHour = 0
      this.classNumber = 0
    },
    // 上移（大类）
    moveUpBtn (row, i) {
      moveUpById(this.studyContentParams[i].studyContents, row.goodsId, 'goodsId')
    },
    // 下移（大类）
    moveDownBtn (row, i) {
      moveDownBySth(this.studyContentParams[i].studyContents, row.goodsId, 'goodsId')
    },
    // 删除已选课程（直接）
    deleteBtn2 (index) {
      this.studyContentInfos.splice(index, 1)
      this.choseData = []
      this.choseData = this.studyContentInfos
    },
    // 上移（直接）
    moveUpBtn2 (row) {
      moveUpById(this.studyContentInfos, row.goodsId, 'goodsId')
    },
    // 下移（直接）
    moveDownBtn2 (row) {
      moveDownBySth(this.studyContentInfos, row.goodsId, 'goodsId')
    },
    // 监听是否为自由选课模式，自由选课模式下不能直接添加课程
    selectChange (val) {
      if (val == 1) {
        if (this.studyContentInfos.length > 0) {
          this.studyContentInfos.splice(0, this.studyContentInfos.length)
          this.currentTotalHours = 0
          this.choseData = []
          this.choseData = this.studyContentInfos
        }
      }
    },
    next () {
      if (this.studyContentParams && this.studyContentParams.length > 0) { // 有大类
        this.studyContentParams.forEach((res, i) => {
          if (!res.classificationName) {
            this.$message({
              message: '有课程分类名称未填写！',
              type: 'warning'
            })
            throw Error()
          } else if (!(res.requiredMinNumber >= 0) || !(res.requiredMaxNumber >= 0)) {
            if (this.isOpenFreeSelection == 1 && (this.ruleType == 1 || this.ruleType == 3)) { // 开启自由选课并且选课规则需要填写门数
              this.$message({
                message: '有必选门数未填写！',
                type: 'warning'
              })
              throw Error()
            }
          } else if (!(res.requiredMinHour >= 0)) {
            if (this.isOpenFreeSelection == 1 && this.ruleType == 2) { // 开启自由选课并且选课规则需要填写课时
              this.$message({
                message: '有课时要求未填写！',
                type: 'warning'
              })
              throw Error()
            }
          } else {
            if (res.studyContents.length <= 0) {
              this.$message({
                message: '有分类未选择课程！',
                type: 'warning'
              })
              throw Error()
            } else {
              if (i == this.studyContentParams.length - 1) {
                this.loading = true
                this.$api.SAVE_STUDY_PLAN_AND_CONTENT({
                  studyPlanId: this.studyPlanId,
                  sourceType: 1,
                  sourceId: this.$route.query.classId,
                  isOpenFreeSelection: this.isOpenFreeSelection,
                  studyContentParams: this.studyContentParams,
                  studyContentType: 1,
                  ruleType: this.ruleType,
                  selectClassHour: this.selectClassHour,
                  classNumber: this.classNumber
                }).then(res => {
                  this.$notify({
                    title: '提示',
                    message: '课程配置成功!',
                    type: 'success'
                  })
                  this.planId = res.data
                  this.setStudyInfo({ planId: this.planId })
                  this.$emit('next', 1)
                }).catch(e => {
                  this.loading = false
                })
              }
            }
          }
        })
      } else if (this.studyContentInfos && this.studyContentInfos.length > 0) { // 有直接
        this.loading = true
        this.$api.SAVE_STUDY_PLAN_AND_CONTENT({
          studyPlanId: this.studyPlanId,
          sourceType: 1,
          sourceId: this.$route.query.classId,
          isOpenFreeSelection: this.isOpenFreeSelection,
          studyContentInfos: this.studyContentInfos,
          studyContentType: 1
        }).then(res => {
          this.$notify({
            title: '提示',
            message: '课程配置成功!',
            type: 'success'
          })
          this.planId = res.data
          this.setStudyInfo({ planId: this.planId })
          this.$emit('next', 1)
        }).catch(e => {
          this.loading = false
        })
      } else {
        this.$message({
          message: '请选择课程！',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style scoped>
.line{
  width: 4px;
  height: 20px;
  background: #1E90FF;
  border-radius: 4px;
  float: left;
  margin-right: 10px;
}
.classifyCard{
  border: 1px solid #e7e4e4;
  margin-bottom: 20px;
}
.cardHead{
  background: #f9f9f9;
  padding: 10px;
}
.cardBody{
  width: 100%;
  padding: 10px;
}
</style>
