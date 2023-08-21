<template>
    <el-container v-loading="maskLoading">
      <el-main style="height:70vh;">
        <div v-show="false">
        <span class="line"></span>自由选课
        <el-switch
          v-model="isOpenFreeSelection"
          active-color="#409eff"
          inactive-color="#dcdfe6"
          :active-value="1"
          :inactive-value="2"
          @change="selectChange"
          disabled
        >
        </el-switch>
        </div>
        <div style="margin-top: 25px;margin-bottom: 25px;">
        <span class="line"></span>文章目录（总课时：{{currentTotalHours.toFixed(2)}}）
        </div>
        <div class="classifyCard" v-for="(item,i) in studyContentParams" :key="i">
          <div class="cardHead">
            <el-input v-model="item.classificationName" placeholder="请输入分类名称" style="width:50%"></el-input>
            <div style="float:right;">
            <span>必选门数：</span>
            <el-input-number v-model="item.requiredMinNumber" :precision="0" :step="1" :min="0" :max="item.studyContents.length" :controls=false placeholder="最小值"></el-input-number>
            ~
            <el-input-number v-model="item.requiredMaxNumber" :precision="0" :step="1" :min="item.requiredMinNumber" :max="item.studyContents.length" :controls=false placeholder="最大值"></el-input-number>
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
                label="文章名称"
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
            <el-link icon="el-icon-plus" :underline="false" type="primary" style="margin-top: 15px;width: 120px;" @click="choseCourse(i)">添加文章</el-link>
          </div>
        </div>
        <!-- 直接添加文章的表格 -->
        <el-table
          v-if="studyContentInfos.length>0"
          :data="studyContentInfos"
          border
          :header-cell-style="{background:'#f9f9f9'}"
          style="width: 100%;">
          <el-table-column
            prop="goodsValue"
            label="文章名称"
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
          <el-link icon="el-icon-plus" :underline="false" type="primary" style="margin-top: 15px;width: 120px;" @click="choseCourse('direct')">添加文章</el-link>
        </div>
        <div @click="addClassify" style="width: 126px;margin-top: 15px;">
        <el-button type="primary" :disabled="studyContentInfos.length > 0">添加文章分类</el-button>
        </div>
      </el-main>
          <el-dialog
            top="15px"
            title="选择文章"
            :visible.sync="choseCourseDialog"
            :close-on-click-modal=false
            width="80%"
            :before-close="handleClose"
            >
            <chose-article
            ref="choseCourseRef"
            :chose-data-count="choseData"
            >
            </chose-article>
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
import ChoseArticle from './chosearticle/chose-article.vue'
import { moveUpById, moveDownBySth, arrRemoveRepeat2 } from '@/utils/array-utils'
import { mapActions } from 'vuex'
export default {
  components: {
    ChoseArticle
  },
  data () {
    return {
      choseCourseDialog: false,
      choseData: [],
      loading: false,
      isOpenFreeSelection: 2,
      currentTotalHours: 0,
      studyContentParams: [
        /*  {
          classificationName: '', // 文章目录名称（学习内容分类名称）
          //requiredNumber: 1, // 文章目录下必选文章的数量
          requiredMinNumber: 0, // 该学习内容分类下必选门数的最小值
          requiredMaxNumber: 0, // 该学习内容分类下必选门数的最大值
          studyContents: [
            {
              courseServiceId: '', // 文章服务商品id【必须】',
              goodsValue: '', // 文章名称【必须】',
              sourceLearnHour: '', // 课时【必须】',
              classLearnHour: '', // 班级课时',
              goodsId: '' // 商品id【必须】'
            }
          ]
        } */
      ],
      studyContentInfos: [
        /* {
          courseServiceId: '', // 文章服务商品id【必须】',
          goodsValue: '', // 文章名称【必须】',
          sourceLearnHour: '', // 课时【必须】',
          classLearnHour: '', // 班级课时',
          goodsId: '' // 商品id【必须】'
        } */
      ],
      index: 0,
      flag: true, // 是否直接添加文章
      maskLoading: false
    }
  },
  watch: {
    studyContentParams: {
      handler (oldval, newval) {
        this.currentTotalHours = 0
        if (newval) {
          this.studyContentParams.forEach(res => {
            res.studyContents.forEach(item => {
              if (!item.classLearnHour && item.classLearnHour != 0) {
                this.$set(item, 'classLearnHour', 0)
              }
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
        studyContentType: 3
      }).then(res => {
        if (res.data.isOpenFreeSelection) {
          this.isOpenFreeSelection = res.data.isOpenFreeSelection
        }
        if (res.data.studyContentVOS && res.data.studyContentVOS.length > 0) {
          this.studyContentInfos = res.data.studyContentVOS
          this.choseData = []
          this.choseData = this.studyContentInfos
        }
        if (res.data.classifiedStudyContentVOS && res.data.classifiedStudyContentVOS.length > 0) {
          this.studyContentParams = res.data.classifiedStudyContentVOS
          this.synchronization()
        }
        this.maskLoading = false
      }).catch(() => {
        this.maskLoading = false
      })
    },
    addClassify () {
      if (this.studyContentInfos.length > 0) {
        this.$message({
          message: '请清除已选择文章再试',
          type: 'warning'
        })
      } else {
        this.studyContentParams.push({ classificationName: '', requiredMinNumber: 0, requiredMaxNumber: 0, studyContents: [] })
      }
    },
    deleteCard (i) {
      this.studyContentParams.splice(i, 1)
      this.synchronization()
    },
    // 新增文章
    choseCourse (i) {
      if (i == 'direct') { // 直接添加文章
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
    // 确定选择文章按钮
    choseCourseDefine () {
      this.choseCourseDialog = false
      let arr = []
      arr = this.$refs.choseCourseRef.getSelectedList()
      const midArr = arrRemoveRepeat2(this.choseData, arr, 'goodsId', 'contentId')
      let newArr = []
      newArr = midArr.map(e => {
        return {
          courseServiceId: e.courseServiceId,
          goodsValue: e.title,
          sourceLearnHour: 0,
          goodsId: e.contentId,
          classLearnHour: 0
        }
      })
      if (this.flag) { // 直接添加文章
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
    // 同步大类表格与弹窗中被选中的文章
    synchronization () {
      this.choseData = []
      this.studyContentParams.forEach(item => {
        item.studyContents.forEach(res => {
          this.choseData.push(res)
        })
      })
    },
    // 取消选择文章
    handleClose () {
      this.choseCourseDialog = false
    },
    // 删除已选文章（大类）
    deleteBtn (index, i) {
      this.studyContentParams[i].studyContents.splice(index, 1)
      this.synchronization()
      this.studyContentParams[i].requiredMinNumber = 0
      this.studyContentParams[i].requiredMaxNumber = 0
    },
    // 上移（大类）
    moveUpBtn (row, i) {
      moveUpById(this.studyContentParams[i].studyContents, row.goodsId, 'goodsId')
    },
    // 下移（大类）
    moveDownBtn (row, i) {
      moveDownBySth(this.studyContentParams[i].studyContents, row.goodsId, 'goodsId')
    },
    // 删除已选文章（直接）
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
    // 监听是否为自由选课模式，自由选课模式下不能直接添加文章
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
    async next () {
      const { planId } = await this.getStudyInfo()
      if (this.studyContentParams && this.studyContentParams.length > 0) { // 有大类
        this.studyContentParams.forEach((res, i) => {
          if (!res.classificationName) {
            this.$message({
              message: '有文章分类名称未填写！',
              type: 'warning'
            })
            throw Error()
          } else if (!(res.requiredMinNumber >= 0) || !(res.requiredMaxNumber >= 0)) {
            this.$message({
              message: '有必选门数未填写！',
              type: 'warning'
            })
            throw Error()
          } else {
            if (res.studyContents.length <= 0) {
              this.$message({
                message: '有分类未选择文章！',
                type: 'warning'
              })
              throw Error()
            } else {
              if (i == this.studyContentParams.length - 1) {
                this.loading = true
                this.$api.SAVE_STUDY_PLAN_AND_CONTENT({
                  studyPlanId: planId,
                  sourceType: 1,
                  sourceId: this.$route.query.classId,
                  isOpenFreeSelection: this.isOpenFreeSelection,
                  studyContentParams: this.studyContentParams,
                  studyContentType: 3
                }).then(res => {
                  this.$notify({
                    title: '提示',
                    message: '文章配置成功!',
                    type: 'success'
                  })
                  /* this.planId = res.data
                this.setStudyInfo({ planId: this.planId }) */
                  this.$emit('next', 3)
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
          studyPlanId: planId,
          sourceType: 1,
          sourceId: this.$route.query.classId,
          isOpenFreeSelection: this.isOpenFreeSelection,
          studyContentInfos: this.studyContentInfos,
          studyContentType: 3
        }).then(res => {
          this.$notify({
            title: '提示',
            message: '文章配置成功!',
            type: 'success'
          })
          /* this.planId = res.data
          this.setStudyInfo({ planId: this.planId }) */
          this.$emit('next', 3)
        }).catch(e => {
          this.loading = false
        })
      } else {
        this.loading = true
        this.$api.SAVE_STUDY_PLAN_AND_CONTENT({
          studyPlanId: planId,
          sourceType: 1,
          sourceId: this.$route.query.classId,
          isOpenFreeSelection: this.isOpenFreeSelection,
          studyContentInfos: this.studyContentInfos,
          studyContentType: 3
        }).then(res => {
          this.$notify({
            title: '提示',
            message: '文章配置成功!',
            type: 'success'
          })
          /* this.planId = res.data
          this.setStudyInfo({ planId: this.planId }) */
          this.$emit('next', 3)
        }).catch(e => {
          this.loading = false
        })
        // this.$message({
        //   message: '请选择文章！',
        //   type: 'warning'
        // })
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
