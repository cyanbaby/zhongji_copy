<!-- 已被废弃，暂存 -->
<template>
    <el-container>
      <el-header style="height:40px"><h5>学习内容设置</h5></el-header>
      <el-main style="height:67vh">
          <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @moveUpBtn="moveUpBtn"
                @moveDownBtn="moveDownBtn"
                @deleteBtn="deleteBtn"
                @cell-data-change="handleCellDataChange"
            >
            <el-button slot="header"  type="primary" @click="choseCourse" size="mini">新增</el-button>
            <span slot="header" class="currentClassHour">当前总课时：{{currentTotalHours}}</span>
            <template
              slot="bannerImgUrlSlot"
              slot-scope="scope"
            >
              <el-image
                class="bannerImgUrl-logo"
                :src="scope.row.bannerImgUrl"
              >
                <img
                  slot="error"
                  class="bannerImgUrl-logo"
                  src="@/assets/images/default.png"
                />
              </el-image>
            </template>
          </d2-crud-x>
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
          </el-main>
          <el-footer>
            <el-button
            type="primary"
            style="margin-left:40%"
            @click="next"
            :loading="loading"
          >
            下一步
          </el-button>
          </el-footer>
    </el-container>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import ChoseCourse from './chosecourse/chose-course.vue'
import { moveUpById, moveDownBySth, arrRemoveRepeat } from '@/utils/array-utils'
import { mapActions } from 'vuex'
export default {
  components: {
    ChoseCourse
  },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      goodsCategory: 6,
      choseCourseDialog: false,
      goodsIds: [],
      choseData: [],
      currentTotalHours: 0,
      planId: '',
      editPlanId: undefined,
      loading: false
    }
  },
  created () {
  },
  methods: {
    ...mapActions('d2admin/studyplan', ['setStudyInfo', 'getStudyInfo']),
    /**
     * doRefresh结束后的操作
     */
    doAfterRefresh (query, options) {
      this.choseData = this.getD2CrudTableData()
      this.currentTotalHours = 0
      this.getD2CrudTableData().forEach(res => {
        this.currentTotalHours = this.currentTotalHours + res.classLearnHour
      })
      if (this.getD2CrudTableData()[0].planId) {
        this.editPlanId = this.getD2CrudTableData()[0].planId
      }
    },
    /**
     * 获取当前列表数据
     * @returns
     */
    getD2CrudTableData () {
      const d2Crud = this.getD2Crud()
      return d2Crud == null || d2Crud.d2CrudData
    },
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.goodsType = 6
      query.catId = this.catId
      query.sourceId = this.$route.query.classId
      return this.$api.GET_STUDY_CONTENT(query).then(({ data }) => {
        var newData = []
        data.forEach(res => {
          res.learnHour = res.sourceLearnHour
          newData.push(res)
        })
        if (!data.list) {
          return Promise.resolve({
            code: '1',
            data: {
              list: newData
            },
            msg: 'success'
          })
        }
      })
    },
    // 新增课程
    choseCourse () {
      this.choseCourseDialog = true
    },
    // 确定选择课程按钮
    choseCourseDefine () {
      this.choseCourseDialog = false
      var goodsInfo = []
      goodsInfo = this.$refs.choseCourseRef.getSelectedList()
      var newGoodsInfo = arrRemoveRepeat(this.choseData, goodsInfo, 'goodsId')
      newGoodsInfo.forEach(res => {
        res.bannerImgUrl = res.goodsImg
        res.learnHour = res.learnHours
        this.$refs.d2Crud.addRow(res)
      })
      this.choseData = this.getD2CrudTableData()
      this.currentTotalHours = 0
      this.getD2CrudTableData().forEach(res => {
        this.currentTotalHours = this.currentTotalHours + res.classLearnHour
      })
    },
    // 取消选择课程
    handleClose () {
      this.choseCourseDialog = false
    },
    // 删除已选课程
    deleteBtn ({ index }) {
      this.$refs.d2Crud.removeRow(index)
    },
    // 上移
    moveUpBtn ({ row }) {
      moveUpById(this.choseData, row.goodsId, 'goodsId')
    },
    // 下移
    moveDownBtn ({ row }) {
      moveDownBySth(this.choseData, row.goodsId, 'goodsId')
    },
    // 最后一行下移置灰
    isLastIndex (index) {
      if (index === this.getD2CrudTableData().length - 1) {
        return true
      } else {
        return false
      }
    },
    // 监听改变的课时
    handleCellDataChange ({ value }) {
      let total = 0
      this.getD2CrudTableData().forEach(res => {
        total = total + res.classLearnHour
      })
      this.currentTotalHours = total.toFixed(2)
    },
    async next () {
      if (this.getD2CrudTableData().length == 0) {
        this.$notify({
          title: '提示',
          message: '请选择课程',
          type: 'warning'
        })
      } else {
        this.loading = true
        this.$api.SAVE_STUDY_CONTENT({
          studyContents: this.getD2CrudTableData(),
          sourceType: 1,
          sourceId: this.$route.query.classId,
          studyPlanId: this.editPlanId
        }).then(res => {
          this.$notify({
            title: '提示',
            message: '学习内容配置成功!',
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
}
</script>
<style scoped>
.currentClassHour{
  float: right;
  margin-top: 10px;
}
.bannerImgUrl-logo{
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
