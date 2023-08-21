<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">{{$route.meta.title}}</span>
      <el-button plain
                 size="small"
                 class="exportBtn"
                 @click="back">返回</el-button>
    </template>
    <div class="tableContainer">
      <el-row>
        <span class="line"></span>
        <h3>直播间概览</h3>
        <template>
          <div class="overview">
            <div class="overview_left">
              <div class="overview_text">
                <div style="margin-bottom: 10px;">
                  <span class="overview_digital">{{ overviewForm.actualLiveBroadcastDuration }}</span><span>分钟</span>
                </div>
                <div>直播时长</div>
              </div>
              <div class="overview_text">
                <div style="margin-bottom: 10px;">
                  <span class="overview_digital">{{ overviewForm.numberOfViewers }}</span><span>人</span>
                </div>
                <div>观看人数</div>
              </div>
              <div class="overview_text">
                <div style="margin-bottom: 10px;">
                  <span class="overview_digital">{{ overviewForm.numberOfVisits }}</span><span>次</span>
                </div>
                <div>访问次数</div>
              </div>
              <div class="overview_text">
                <div style="margin-bottom: 10px;">
                  <span class="overview_digital">{{ overviewForm.perCapitaViewingTime }}</span><span>分钟</span>
                </div>
                <div>人均观看时长</div>
              </div>
              <div class="overview_text">
                <div style="margin-bottom: 10px;">
                  <span class="overview_digital">{{ overviewForm.numberOfSpeeches }}</span><span>条</span>
                </div>
                <div>发言数</div>
              </div>
              <div class="overview_text">
                <div style="margin-bottom: 10px;"><span class="overview_digital">{{ overviewForm.numberOfSpeakers }}</span></div>
                <div>发言人数</div>
              </div>
            </div>
            <div class="overview_right">
              <!-- ECHARTS区域 -->
              <div ref="terminal"
                   style="width: 400px;height: 100px;"></div>
            </div>
          </div>
        </template>
      </el-row>
      <el-row>
        <span class="line"></span>
        <h3>互动统计</h3>
        <template>
          <div class="InteractiveStatistical" v-for="(item, index) in signInList" :key="index">

            <div style="width:61px">
              <el-tag v-show="index === 0" size="small" style="padding: 0 11px;">签到</el-tag>
            </div>
            <div style="width:255px;font-size:14px;">第{{ index+1 }}次签到</div>
            <div style="width:230px;font-size:12px;color:#797979;">{{ item.checkinStartTime }}</div>
            <div style="width:100px;font-size:12px;color:#797979;">签到人数：{{ item.checkinQuantity }}</div>
            <div style="width:740px;font-size:12px;color:#797979;">签到率：{{ item.checkinRate }}%</div>
            <div>
              <el-button size="mini" style="color:#797979;" @click="exportSignIn(item.checkinid)">导出数据</el-button>
            </div>
          </div>

          <div class="InteractiveStatistical"  v-for="(item, index) in issuesList" :key="index">
            <div style="width:61px">
              <el-tag v-show="index === 0" size="small" style="padding: 0 11px;">问卷</el-tag>
            </div>
            <div style="width:255px;font-size:14px;">{{ item.questName }}</div>
            <div style="width:230px;font-size:12px;color:#797979;">{{ item.questionnaireStartTime }}</div>
            <div style="width:100px;font-size:12px;color:#797979;">提交人数：{{ item.numberOfSubmitters }}</div>
            <div style="width:740px;font-size:12px;color:#797979;">提交率：{{ item.submissionRate }}%</div>
            <div>
              <el-button size="mini" style="color:#797979;" @click="exportIssues(item.questionnaireId)">导出数据</el-button>
            </div>
          </div>
          <div class="InteractiveStatistical"  v-for="(item, index) in answerList" :key="index">
            <div style="width:61px">
              <el-tag v-show="index === 0" size="small"  style="width: 50px;">答题卡</el-tag>
            </div>
            <div style="width:255px;font-size:14px;">{{ item.questionTitle }}</div>
            <div style="width:230px;font-size:12px;color:#797979;">{{ item.questionStartTime }}</div>
            <div style="width:100px;font-size:12px;color:#797979;">答题人数：{{ item.numberOfAnswer }}</div>
            <div style="width:740px;font-size:12px;color:#797979;">
              答题率：{{ item.answerRate }}%
              <span style="padding: 0 10px;">正确人数：{{ item.correctNumber }}</span>
              正确率：{{ item.accuracy }}%
            </div>
            <div>
              <el-button size="mini" style="color:#797979;" @click="exportAnswer(item.questionId)">导出数据</el-button>
            </div>
          </div>
        </template>
      </el-row>
      <el-row>
        <span class="line"></span>
        <h3 style="margin-bottom:0">观看数据</h3>
        <template>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <d2-crud-x ref="d2Crud"
                       v-bind="_crudProps"
                       v-on="_crudListeners"
                       @detailInfo="detailInfo"
                       style="height:60vh">
              <div slot="header">
                <crud-search ref="search"
                             :options="crud.searchOptions"
                             @submit="handleSearch"
                             @reset="resetSearch">
                  <template slot="regionSearchSlot">
                    <el-cascader v-model="address"
                                 :options="options"
                                 :props="props"
                                 clearable>
                    </el-cascader>
                  </template>
                </crud-search>
                <el-button size="small"
                           type="primary"
                           class="exportBtns"
                           @click="exportBtn">导出</el-button>
              </div>
              <template slot="isPassSlot"
                        slot-scope="scope">
                <div v-if="scope.row.examQualification == 0">资格待发放</div>
                <div v-if="scope.row.examQualification == 1">
                  <div v-if="scope.row.examResult == 0">待考试</div>
                  <div v-if="scope.row.examResult == 1">
                    {{scope.row.examScore}}
                    <el-button type="success"
                               size="small">合格</el-button>
                  </div>
                  <div v-if="scope.row.examResult == 2">
                    {{scope.row.examScore}}
                    <el-button type="warning"
                               size="small">不合格</el-button>
                  </div>
                </div>
              </template>
            </d2-crud-x>
          </el-tabs>
        </template>
      </el-row>
    </div>
    <div class="body">

    </div>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import util from '@/libs/util'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { formateTime, parseTime } from '@/utils/index'
import * as echarts from 'echarts'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      // goodsId: '',
      courseImg: '',
      coverImgUrl: '',
      sales: '',
      activeName: 'first',
      detailDialog: false,
      currentSscId: '',
      className: '',
      lastStudyTime: '',
      studentName: '',
      studentId: '',
      orgFullName: '',
      classHour: 0,
      catValue: '',
      options: [],
      props: {
        value: 'areaCode',
        label: 'name',
        checkStrictly: true
      },
      address: [],
      addressCode: undefined,
      level: undefined,
      listInfo: [],
      isDataPermission: '',
      option: {
        title: {
          text: '观看终端',
          left: '65%'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          top: '30',
          left: '250'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '75%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            data: [
              {
                value: 1048,
                name: 'pc',
                itemStyle: {
                  color: '#fb524f'
                }
              },
              {
                value: 735,
                name: '手机',
                itemStyle: {
                  color: '#ffc77f'
                }
              }
            ]
          }
        ]
      },
      liveChannelId: '',
      overviewForm: {
        actualLiveBroadcastDuration: '', // 本场次实际直播总时长，单位分钟
        numberOfViewers: '', // 直播观看人数
        numberOfVisits: '', // 访问次数
        perCapitaViewingTime: '', // 人均观看时长（分钟）（浮点类型）
        numberOfSpeeches: '', // 发言数
        numberOfSpeakers: '', // 发言人数
        proportionOfPC: 0, // 观看终端中PC所占比例（浮点类型）
        proportionOfMobilePhones: 0 // 观看终端中手机所占比例（浮点类型）
      },
      signInList: [], // 签到
      issuesList: [], // 问卷
      answerList: [] // 答题
    }
  },
  created () {
    // this.doRefresh()
    this.liveChannelId = this.$route.query.liveChannelId

    this.getSignInList()
    this.geiSsuesList()
    this.getAnswerList()

    this.$api.CHECK_DATA_PERMISSION().then(res => {
      this.isDataPermission = res.data
      if (this.isDataPermission) {
        // 自定义配置
        this.$api.GET_USER_AREA().then(res => {
          if (res.data && res.data.length > 0) {
            this.options = res.data
            console.log('options', this.options)
          }
        })
      } else {
        // 全部地区选择
        this.$api.getArea().then(res => {
          if (res && res.length > 0) {
            this.options = res
            console.log('options', this.options)
          }
        })
      }
    })
  },
  mounted () {
    this.getOverviewForm()
  },
  methods: {
    // url是后端接口返回的，在下载按钮的点击事件调用如下方法
    downLoad (url) { // 下载
      var a = document.createElement('a')
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    // 导出签到详情
    exportSignIn (checkinid) {
      this.$api.LIVE_STATISTICS_EXPORTCHECKINRECORD({ checkinid })
        .then(res => {
          if (res.code == 1 && res.data) {
            this.downLoad(res.data)
          }
        })
        .catch(_err => {
          console.log(_err)
        })
    },
    // 导出问卷详情
    exportIssues (questionnaireId) {
      this.$api.LIVE_STATISTICS_EXPORTQUESTIONNAIRE({ questionnaireId })
        .then(res => {
          if (res.code == 1 && res.data) {
            this.downLoad(res.data)
          }
        })
        .catch(_err => {
          console.log(_err)
        })
    },
    // 导出答题卡详情
    exportAnswer (questionId) {
      this.$api.LIVE_STATISTICS_EXPORTLIVEQUESTION({ questionId })
        .then(res => {
          if (res.code == 1 && res.data) {
            this.downLoad(res.data)
          }
        })
        .catch(_err => {
          console.log(_err)
        })
    },
    formateTime,
    parseTime,
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    back () {
      this.$router.push({
        path: '/live/liveStatistics'
      })
    },
    // 查询
    pageRequest (query) {
      console.log('query', query)
      if (this.address.length > 0) {
        this.addressCode = this.address[this.address.length - 1]
        this.level = this.address.length - 1
        query.addressCode = this.addressCode
        query.level = this.level
      }

      // if (query.graduateStatus >= -1) {
      //   query.graduateStatus = query.graduateStatus
      // } else {
      //   query.graduateStatus = -1
      // }
      // if (query.studyFinish >= -1) {
      //   query.studyFinish = query.studyFinish
      // } else {
      //   query.studyFinish = -1
      // }
      // if (query.isPass >= -1) {
      //   query.isPass = query.isPass
      // } else {
      //   query.isPass = -1
      // }
      // if (query.certificateStatus >= -1) {
      //   query.certificateStatus = query.certificateStatus
      // } else {
      //   query.certificateStatus = -1
      // }

      query.liveChannelId = this.liveChannelId

      return this.$api.LIVE_STATISTICS_GETVIEWDATA(query)
    },
    // 导出按钮
    exportBtn (checkinid) {
      const liveChannelId = this.liveChannelId
      this.$api.LIVE_STATISTICS_EXPORTVIEWDATA({ liveChannelId })
        .then(res => {
          if (res.code == 1 && res.data) {
            this.downLoad(res.data)
          }
        })
        .catch(_err => {
          console.log(_err)
        })
    },
    // 导出按钮
    // exportBtn () {
    //   console.log('111')
    //   const searchData = this.getSearch().getForm()
    //   searchData.addressCode = this.addressCode
    //   searchData.level = this.level
    //   searchData.liveChannelId = this.liveChannelId
    //   this.$api.exportTrainStudent({
    //     liveChannelId: this.$route.query.liveChannelId,
    //     appId: util.cookies.get('appId'),
    //     ...searchData
    //   }).then(res => {
    //     console.log('res', res)
    //     window.location = res.data
    //     if (res.code == 1) {
    //       window.location = res.data
    //       // this.$message({
    //       //   type: 'success',
    //       //   message: '创建下载任务成功，请前往任务中心进行查看!',
    //       // })
    //     }
    //   })
    // },
    handleClick () {
      console.log('haha')
    },
    // 详情
    detailInfo ({ row }) {
      const userId = row.userId
      const liveChannelId = this.liveChannelId
      this.$router.push({
        path: '/live/livestudyinfo',
        query: {
          userId: userId.toString(),
          liveChannelId: liveChannelId.toString()
          // coverImgUrl: this.$route.query.coverImgUrl
        }
      })
      localStorage.setItem('tempRowLookData', JSON.stringify(row))
    },
    resetSearch () {
      this.address = []
      this.addressCode = undefined
      this.level = undefined
    },

    getOverviewForm () {
      const liveChannelId = this.liveChannelId
      this.$api.LIVE_STATISTICS_OVERVIEW({ liveChannelId })
        .then(res => {
          if (res.code === '1') {
            this.overviewForm = res.data
            this.initEcharts()
          }
        })
        .catch(_error => {
          console.log(_error)
        })
    },
    initEcharts () {
      const chartDom = this.$refs.terminal
      var myChart = echarts.init(chartDom)
      this.option.series[0].data[0].value = this.overviewForm.proportionOfPC
      this.option.series[0].data[1].value = this.overviewForm.proportionOfMobilePhones
      myChart.setOption(this.option)
    },
    getSignInList () {
      const liveChannelId = this.liveChannelId
      this.$api.LIVE_STATISTICS_CHECKINRECORD({ liveChannelId })
        .then(res => {
          if (res.code === '1') {
            this.signInList = res.data
          }
        })
        .catch(_error => {
          console.log(_error)
        })
    },
    geiSsuesList () {
      const liveChannelId = this.liveChannelId
      this.$api.LIVE_STATISTICS_LIVEQUESTIONNAIRE({ liveChannelId })
        .then(res => {
          if (res.code === '1') {
            this.issuesList = res.data
          }
        })
        .catch(_error => {
          console.log(_error)
        })
    },
    getAnswerList () {
      const liveChannelId = this.liveChannelId
      this.$api.LIVE_STATISTICS_LIVEQUESTION({ liveChannelId })
        .then(res => {
          if (res.code === '1') {
            this.answerList = res.data
          }
        })
        .catch(_error => {
          console.log(_error)
        })
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
 <style scoped lang="scss">
 .InteractiveStatistical {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
 }
 .tableContainer{
  width: 100%;
  background-color: white;
  margin-top: 20px;
  padding: 0px 20px;
  .overview {
    display: flex;
  .overview_left {
    display: flex;
    justify-content: space-between;
    width: 65%;
    padding-left: 20px;
    .overview_text {
        text-align: center;
        .overview_digital {
            color:red;
            font-size:40px;

        }
    }
  }
  .overview_left {

  }
  }
}
 .line{
  width: 4px;
  height: 20px;
  background: #1E90FF;
  border-radius: 4px;
  float: left;
  margin-top: 20px;
  margin-right: 10px;
}
 .header-container{
   position: relative;
   width:100%;
 }
 .go-back{
   position: absolute;
   right:10px;
   top:50px;
 }
 .header-item{
   margin-right: 40px;
   display:inline-block;
 }
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
   margin:0 20px 20px 20px;
 }
 .exportBtn{
   float: right;
   margin-top: -12px;
 }
 .exportBtns{
   float: right;
   margin-top: -40px;
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
