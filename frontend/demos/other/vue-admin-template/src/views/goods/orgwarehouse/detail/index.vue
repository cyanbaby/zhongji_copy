<template>
  <div>
    <div class="head">
      <el-image
        class="banner"
        :src="bannerImg"
      >
        <img
          slot="error"
          class="banner"
          src="@/assets/images/default.png"
        />
      </el-image>
      <div class="head-right">
      <h2 class="name">{{goodsValue}}</h2>
      <span class="volume">销量：{{sales}}</span>
      </div>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="学员学习记录" name="first">
          <d2-crud-x
            ref="d2Crud"
            v-bind="_crudProps"
            v-on="_crudListeners"
            @detailInfo="detailInfo"
            style="height:41vh"
          >
          <div slot="header">
            <crud-search
              ref="search"
              :options="crud.searchOptions"
              @submit="handleSearch"
            />
            <el-button plain class="exportBtn" @click="exportBtn">导出</el-button>
          </div>
          <template
              slot="studentImgSlot"
              slot-scope="scope"
            >
            <div class="imgNameCss">
              <el-image
                class="studentImg"
                :src="scope.row.studentImg"
              >
                <img
                  slot="error"
                  class="studentImg"
                  src="@/assets/images/default.png"
                />
              </el-image>
              <span class="studentName">{{scope.row.studentName}}</span>
            </div>
            </template>
            <template slot="vaildStudyTimeSlot" slot-scope="scope">
                <span>{{ getUnitTime(scope.row.vaildStudyTime) }}</span>
            </template>
            <template slot="totalStudyTimeSlot" slot-scope="scope">
                <span>{{ getUnitTime(scope.row.totalStudyTime) }}</span>
            </template>
            <template slot="learningProgressSlot" slot-scope="scope">
                <span>{{scope.row.learningProgress}}%</span>
            </template>
          </d2-crud-x>
          <el-dialog
            title="学习详情"
            :visible.sync="detailDialog"
            :close-on-click-modal=false
            width="50%">
            <span style="display:block;">学员：{{studentName}}</span>
            <br>
            <span style="margin-right:10%">课程：{{goodsValue}}</span>
            <span>最近学习时间：{{parseTime(lastStudyTime)}}</span>
            <detail-table
            ref="detailTable"
            :goodsId="goodsId"
            :studentId="studentId"
            ></detail-table>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import DetailTable from '@/views/educational/studentdetails/components/detail-table.vue'
import { parseTime } from '@/utils/index'
export default {
  mixins: [d2CrudPlus.crud],
  components: {
    DetailTable
  },
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      bannerImg: '',
      sales: '',
      activeName: 'first',
      detailDialog: false,
      currentSscId: '',
      goodsValue: '',
      lastStudyTime: '',
      studentName: '',
      studentId: ''
    }
  },
  created () {
  },
  methods: {
    getUnitTime (s) {
      var d = moment.duration(parseInt(s), 'seconds')
      var dd = Math.floor(d.asDays())
      var hh = d.hours()
      var mm = d.minutes()
      var ss = d.seconds()

      if (dd > 0) {
        return dd + '天' + hh + '时' + mm + '分' + ss + '秒'
      } else if (d.hours() > 0) {
        return hh + '时' + mm + '分' + ss + '秒'
      } else if (d.minutes() > 0) {
        return mm + '分' + ss + '秒'
      } else {
        return ss + '秒'
      }
    },
    parseTime,
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.goodsId = this.goodsId
      query.bussinessType = 1
      return this.$api.GOODS_DETAIL(query).then(res => {
        this.bannerImg = res.data.bannerImg
        this.goodsValue = res.data.goodsValue
        this.sales = res.data.sales
        const data = res.data.studentStudyVOList.data
        return Promise.resolve({
          code: '1',
          data: data,
          msg: 'success'
        })
      })
    },
    // 导出按钮
    exportBtn () {
      this.$api.EXPORT_STUDENT_STUDY_RECORD({
        goodsId: this.goodsId,
        bussinessType: 1
      }).then(res => {
        window.location = res.data
      })
    },
    // 详情
    detailInfo ({ row }) {
      this.studentName = row.studentName
      this.lastStudyTime = row.lastStudyTime

      this.detailDialog = true
      this.studentId = row.studentId
      if (this.$refs.detailTable) {
        this.$refs.detailTable.fetchDataByGoodsIdAndStuId(this.goodsId, row.studentId)
      }
    }
  }
}
</script>
<style>
.studentImg .el-image__inner {
    object-fit: cover;
}
.banner .el-image__inner{
    object-fit: cover;
}
</style>
<style scoped>
.banner{
  width: 190px;
  height: 100px;
  margin-right: 20px;
}
.head{
  margin: 20px;
  display: flex;
  align-items:center;
}
.head-right{
  display: flex;
  flex-direction:column;
}
.name{
  margin-top: -10px;
}
.volume{
  margin-top: 20px;
}
.body{
  margin: 20px;
}
.exportBtn{
  float: right;
  margin-top: -50px;
}
.imgNameCss{
  display: flex;
  text-align: left;
}
.studentImg{
  width: 70px;
  height: 40px;
  flex-shrink: 0;
}
.studentName{
  margin-left: 5px;
}
</style>
