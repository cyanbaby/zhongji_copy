<template>
  <div class="special">
  <d2-container>

      <template slot="header">
        <div class="headCss">
        <span class="page-title">学员详情</span>
        <el-button type="primary" plain style="float: right;" size="mini" @click="back">返回</el-button>
        </div>
      </template>

      <div class="body-container" ref="bodyHeight">
      <div class="detail-container">
          <div class="detail-container-img">
              <div class="avatar">
              <el-avatar shape="square" :size="120" :src="studentInfo.photoUrl">
                  <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"/>
              </el-avatar>
              </div>
          </div>
          <div class="detail-container-info">
            <div class="detail-container-info-words">
              <span class="detail-container-info-words-item">
              <span class="detail-container-name">{{studentInfo.studentName}}
                <i class="el-icon-female" v-if="studentInfo.sex==0"></i>
                <i class="el-icon-male" v-if="studentInfo.sex==1"></i>
                <span class="idCss">ID：{{studentInfo.studentId}}</span>
              </span>
              </span>
              <span class="detail-container-info-words-item">学分：<span class="data">{{studentInfo.classStudyScore}}</span></span>
              <span class="detail-container-info-words-item">状态：
                <el-tag size="mini" v-if="studentInfo.graduateStatus==0" effect="plain" type="danger">未结业</el-tag>
                <el-tag size="mini" v-if="studentInfo.graduateStatus==1" effect="plain">已结业</el-tag>
              </span>
              <span class="detail-container-info-words-item">身份证号：<span class="data">{{studentInfo.idcardNu}}</span></span>
              <span class="detail-container-info-words-item"><span class="numControl" :title="studentInfo.companyName">工作单位：<span class="data">{{studentInfo.companyName}}</span></span></span>
              <span class="detail-container-info-words-item"><span class="numControl" :title="studentInfo.jobTitle">职务：<span class="data">{{studentInfo.jobTitle}}</span></span></span>
              <span class="detail-container-info-words-item"><span class="numControl" :title="studentInfo.workRegion">地区：<span class="data">{{studentInfo.workRegion}}</span></span></span>
              <span class="detail-container-info-words-item">
                <span style="float: left;">班级：</span>
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">
                    {{studentInfo.className}}（<span v-for="(item,i) in studentInfo.classToCategoryVOList" :key="i">{{item.catValue}}</span>）
                  </div>
                  <div class="numControl-inline">
                      <span class="numControl"><span class="data">{{studentInfo.className}}</span>
                        <span v-if="studentInfo.classToCategoryVOList&&studentInfo.classToCategoryVOList.length!=0"><span class="data">（<span v-for="(item,i) in studentInfo.classToCategoryVOList" :key="i">{{item.catValue}}；</span>）</span></span>
                      </span>
                  </div>
                </el-tooltip>
              </span>
              <span class="detail-container-info-words-item">入班方式：<span v-if="studentInfo.entryClassMode==1" class="data">报名</span>
                      <span v-if="studentInfo.entryClassMode==2" class="data">导入</span></span>
              <span class="detail-container-info-words-item">入班时间：<span class="data">{{parseTime(studentInfo.entryClassTime)}}</span></span>

              <span v-if="studentInfo.isRemove==1" class="detail-container-info-words-item">移除时间：<span class="data">{{parseTime(studentInfo.removeTime)}}</span></span>
              <span v-if="studentInfo.isRemove==1" class="detail-container-info-words-item"><span class="numControl" :title="studentInfo.removeReason">移除原因：<span class="data">{{studentInfo.removeReason}}</span></span></span>
              </div>
          </div>
      </div>
      <div class="tableContainer">
      <el-row>
        <span class="line"></span><h3>报名</h3>
        <div class="sign">
          <span class="region">
          <span>报名活动名称：</span>
          <span class="signCss" v-if="activityInfoVoList&&activityInfoVoList.length!=0">{{activityInfoVoList[0].activityName}}</span>
          </span>
          <span class="region">
          <span>报名时间：</span>
          <span class="signCss" v-if="activityInfoVoList&&activityInfoVoList.length!=0">{{activityInfoVoList[0].signupTime}}</span>
          </span>
          <span class="region">
          <span>报名模板：</span>
          <span class="signCss" v-if="activityInfoVoList&&activityInfoVoList.length!=0">{{activityInfoVoList[0].templateName}}</span>
          </span>
          <span class="region">
          <span>是否收费：</span>
          <span class="signCss" v-if="activityInfoVoList&&activityInfoVoList.length!=0&&activityInfoVoList[0].isFree==2">是</span>
          <span class="signCss" v-if="activityInfoVoList&&activityInfoVoList.length!=0&&activityInfoVoList[0].isFree==1">否</span>
          </span>
          <span class="region">
          <span>支付金额：</span>
          <span class="signCss" v-if="activityInfoVoList&&activityInfoVoList.length!=0">{{activityInfoVoList[0].price}}元</span>
          </span>
        </div>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <span class="line"></span><h3>学习</h3>
        <el-tabs v-model="activeName">
          <el-tab-pane label="课程" name="course">
            <template>
              <el-table
                :data="studentInfo.studentStudyContentList"
                style="width: 100%;margin-bottom: 20px;"
                :header-cell-style="{background:'#F7F7F7',border: '1px solid #EBEEF5'}"
                >
                <el-table-column
                  prop="goodsValue"
                  label="课程名称"
                  width="320"
                >
                </el-table-column>
                <el-table-column
                  prop="startTime"
                  label="首次学习时间"
                >
                <template slot-scope="scope">
                    <span>{{parseTime(scope.row.startTime)}}</span>
                </template>
                </el-table-column>
                <el-table-column
                  prop="lastStudyTime"
                  label="最后学习时间">
                  <template slot-scope="scope">
                    <span>{{parseTime(scope.row.lastStudyTime)}}</span>
                </template>
                </el-table-column>
                <el-table-column
                  prop="studyTimeSecond"
                  label="累计学习时长">
                  <template slot-scope="scope">
                    <span>{{formateTime(scope.row.studyTimeSecond)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="studyEffectiveTimeSecond"
                  label="有效时长">
                  <template slot-scope="scope">
                    <span>{{formateTime(scope.row.studyEffectiveTimeSecond)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="learningProgress"
                  label="学习进度">
                  <template slot-scope="scope">
                    <el-progress :percentage="scope.row.learningProgress"></el-progress>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="examQualification"
                  label="考试结果">
                  <template slot-scope="scope">
                     <div v-if="scope.row.examQualification == 0">资格待发放</div>
                      <div v-if="scope.row.examQualification == 1">
                        <div v-if="scope.row.examResult == 0">待考试</div>
                        <div v-if="scope.row.examResult == 1">
                          {{scope.row.examScore}}
                          <el-button type="success" size="small">合格</el-button>
                        </div>
                        <div v-if="scope.row.examResult == 2">
                          {{scope.row.examScore}}
                          <el-button type="warning" size="small">不合格</el-button>
                        </div>
                      </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="studyStatus"
                  label="结业状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.graduateStatus==0">未结业</span>
                    <span v-if="scope.row.graduateStatus==1">已结业</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                >
                  <template slot-scope="scope">
                    <el-button @click="detailInfo(scope.row)" type="text" size="small">详情</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button @click="captureRecord(scope.row)" type="text" size="small">抓拍记录</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="直播" name="live">
            <template>
              <el-table
              :data="studentInfo.liveDetailResultList"
              style="width: 100%;margin-bottom: 20px;"
              :header-cell-style="{background:'#F7F7F7',border: '1px solid #EBEEF5'}"
              >
                <el-table-column
                  prop="liveName"
                  label="直播名称"
                >
                </el-table-column>
                <el-table-column
                  prop="learnHour"
                  label="观看时长"
                >
                </el-table-column>
                <el-table-column
                  prop="stayHour"
                  label="停留时长"
                >
                </el-table-column>
                <el-table-column
                  prop="firstInTime"
                  label="首次进入时间"
                >
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row>
        <span class="line"></span><h3>考试</h3>
        <div class="certificate" style="padding-bottom: 10px;">
          <span class="certRegion" style="width:20%">
          <span>状态：</span>
          <span class="signCss">
              <span v-if="studentInfo.examQualification==0">资格待发放</span>
              <span v-if="studentInfo.examQualification==1">
                <span v-if="studentInfo.isPass == 0">待考试</span>
                <span v-if="studentInfo.isPass == 1">合格</span>
                <span v-if="studentInfo.isPass == 2">不合格</span>
              </span>
          </span>
          </span>
          <span class="certRegion" style="width:20%">
          <span>当前考生成绩：</span>
          <span class="signCss">{{studentInfo.testScore}}</span>
          </span>
          <span class="certRegion" style="width:20%">
          <span>最新考试时间：</span>
          <span class="signCss">{{parseTime(studentInfo.updateTime)}}</span>
          </span>
        </div>
        <template>
            <el-table
              :data="studentInfo.examDetailResultList"
              style="width: 100%;margin-bottom: 20px;"
              :header-cell-style="{background:'#F7F7F7',border: '1px solid #EBEEF5'}"
              >
              <el-table-column
                label="序号"
                width="90"
                type="index"
              >
              </el-table-column>
              <el-table-column
                prop="examName"
                label="名称"
                width="450"
              >
              </el-table-column>
              <el-table-column
                prop="isPass"
                label="考试结果"
              >
              <template slot-scope="scope">
                <el-tag type="success" effect="plain">{{scope.row.isPass}}</el-tag>
              </template>
              </el-table-column>
              <el-table-column
                prop="testScore"
                label="考试得分">
              </el-table-column>
              <el-table-column
                prop="examTime"
                label="考试时间"
                width="200"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                width="90"
              >
                <template slot-scope="scope">
                  <el-button @click="checkExam(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
      </el-row>
      <el-row>
        <span class="line"></span><h3>证书</h3>
        <div class="certificate">
          <span class="certRegion" style="width:20%">
          <span>证书名称：</span>
          <span class="signCss" v-if="certDetailResultList&&certDetailResultList.length!=0">{{certDetailResultList[0].certName}}</span>
          </span>
          <span class="certRegion" style="width:20%">
          <span>证书编码：</span>
          <span class="signCss" v-if="certDetailResultList&&certDetailResultList.length!=0">{{certDetailResultList[0].cidentifier}}</span>
          </span>
          <span class="certRegion" style="width:20%">
          <span>状态：</span>
          <span class="signCss" v-if="certDetailResultList&&certDetailResultList.length!=0">
            <span v-if="certDetailResultList[0].status == 1">资格待发放</span>
            <span v-if="certDetailResultList[0].status == 2">待申请</span>
            <span v-if="certDetailResultList[0].status == 3">待审核</span>
            <span v-if="certDetailResultList[0].status == 4">待打印</span>
            <span v-if="certDetailResultList[0].status == 5">已打印</span>
          </span>
          </span>
          <span class="certRegion" style="width:20%">
          <span>申领时间：</span>
          <span class="signCss" v-if="certDetailResultList&&certDetailResultList.length!=0">{{certDetailResultList[0].applyTime}}</span>
          </span>
          <span class="certRegion" style="width:20%">
          <span>首次打印时间：</span>
          <span class="signCss" v-if="certDetailResultList&&certDetailResultList.length!=0">{{certDetailResultList[0].firstPrintTime}}</span>
          </span>
        </div>
      </el-row>
      </div>
      </div>
      <el-dialog
        title="学习详情"
        :visible.sync="detailDialog"
        :close-on-click-modal=false
        width="50%">
        <span style="display:block;">学员：{{studentInfo.studentName}}</span>
        <br>
        <span style="margin-right:10%">课程：{{goodsValue}}</span>
        <span>最近学习时间：{{parseTime(lastStudyTime)}}</span>
        <detail-table
        :sscId="currentSscId"
        :studentId="studentId"
        ref="detailTable"
        ></detail-table>
      </el-dialog>
            <el-dialog
              title="抓拍记录"
              :visible.sync="captureRecordDialog"
              width="50%"
              @close="captureRecordDialogClose"
              :close-on-click-modal=false
            >
              <span style="display:block;">学员：{{studentInfo.studentName}}</span>
              <br>
              <span style="margin-right:10%">课程：{{goodsValue}}</span>
              <span>抓拍次数：{{photoCount}}</span>
                <div>
                <el-radio-group v-model="wareName" style="margin:15px 0" slot="header" @change="change" size="mini">
                  <el-radio-button :label="item.stId" v-for="(item,sub) in wareInfo" :key="sub">{{item.wareName}}</el-radio-button>
                </el-radio-group>
                </div>
                <div class="container" v-loading="photoLoading">
                <el-empty description="暂无数据" v-if="total==0"></el-empty>
                <div v-for="(item,subscript) in pagingList" :key="subscript">
                  <el-divider content-position="left"><h4>{{item.photoDate}}</h4></el-divider>
                  <div class="container-cards">
                  <div class="container-card" v-for="(data,subs) in item.studyTaskPhotoRecordResults" :key="subs">
                    <div class="container-card-img">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="data.photoUrl"
                      :preview-src-list="[data.photoUrl]">
                    </el-image>
                    </div>
                    <div class="container-card-words">
                    <span>{{getParseTime(data.photoLocation)}}</span>
                    <span>{{data.chapterName}}</span>
                    <span>{{data.itemName}}</span>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :page-size="3"
                  :current-page.sync="currentPage"
                  layout="total, prev, pager, next"
                  :total="total"
                  :hide-on-single-page="true"
                  >
                </el-pagination>
            </el-dialog>
      <template slot="footer">
        <div style="text-align:center">
        <span @click="toBottom" v-if="downShow">
          <d2-icon-svg name="down" class="svgCss"/>
        </span>
        <el-button type="primary" plain style="width:150px" size="mini" @click="back">返回</el-button>
        </div>
      </template>
  </d2-container>
  </div>
  </template>
<script>
import { parseTime, getParseTime, formateTime } from '@/utils/index'
import DetailTable from './components/detail-table.vue'
import { findItemInArrayByProperty } from '@/utils/array-utils'
export default {
  components: {
    DetailTable
  },
  // props: {
  //   studentId: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data () {
    return {
      studentId: this.$route.query.studentId,
      studentInfo: {},
      detailDialog: false,
      goodsValue: '',
      lastStudyTime: '',
      currentSscId: '',
      captureRecordDialog: false,
      src: '',
      photoCount: 0,
      wareInfo: [],
      wareName: '',
      photoInfos: [],
      total: 0,
      pagingList: [],
      currentPage: 1,
      photoLoading: true,
      downShow: false,
      activityInfoVoList: [],
      certDetailResultList: [],
      activeName: 'course'
    }
  },
  mounted () {
    this.watchDown()
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  // 这里必须要移除掉这个window添加的监听事件，要不然在别的界面也会出发滚动监听
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll, true) //  离开页面清除（移除）滚轮滚动事件
  },
  created () {
    this.getDetail()
  },
  methods: {
    parseTime,
    getParseTime,
    formateTime,
    getDetail () {
      this.$api.GET_STUDENT_DETAIL({
        classId: this.$route.query.classId,
        studentId: this.studentId
      }).then(res => {
        this.studentInfo = res.data
        this.activityInfoVoList = res.data.activityInfoVoList
        this.certDetailResultList = res.data.certDetailResultList
      })
    },
    detailInfo (row) {
      this.detailDialog = true
      this.studentId = row.studentId
      this.currentSscId = row.sscId
      this.goodsValue = row.goodsValue
      this.lastStudyTime = row.lastStudyTime
      if (this.$refs.detailTable) {
        this.$refs.detailTable.fetchData(row.sscId)
      }
      this.$router.push({
        path: '/statistic/coursestudyinfo',
        query: {
          studentId: row.studentId,
          goodsId: row.goodsId,
          classId: this.$route.query.classId
        }
      })
    },
    captureRecord (row) {
      this.captureRecordDialog = true
      this.goodsValue = row.goodsValue
      this.$api.QUERY_PHOTO_RECORD({
        studentId: row.studentId,
        sscId: row.sscId
      }).then(res => {
        this.photoLoading = false
        if (!res.data.photoCount) {
          this.photoCount = 0
        } else {
          this.photoCount = res.data.photoCount
        }
        if (!res.data.wareInfo) {
          this.wareInfo = []
        } else {
          this.wareInfo = res.data.wareInfo
          this.change(this.wareInfo[0].stId)
          this.wareName = this.wareInfo[0].stId
          this.handleCurrentChange(1)
        }
      })
    },
    change (val) {
      const needList = findItemInArrayByProperty(this.wareInfo, val, 'stId')
      this.photoInfos = needList.photoInfos
      this.total = this.photoInfos.length
      this.handleCurrentChange(1)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.pagingList = this.photoInfos.slice((val - 1) * 3, val * 3)
    },
    captureRecordDialogClose () {
      this.wareInfo = []
      this.pagingList = []
      this.total = 0
    },
    back () {
      this.$router.push({
        path: '/statistic/classstudydetail',
        query: {
          classId: this.$route.query.classId,
          coverImgUrl: this.$route.query.coverImgUrl
        }
      })
    },
    // 监控是否超出一屏
    watchDown () {
      const visibleHeight = document.documentElement.clientHeight - 209 // 可见区域高度
      const bodyHeight = this.$refs.bodyHeight.offsetHeight // div真实高度
      if (bodyHeight > visibleHeight) {
        this.downShow = true
      }
    },
    handleScroll () {
      const scrollTop = this.$el.querySelector('.d2-container-full__body').scrollTop
      const visibleHeight = document.documentElement.clientHeight - 209 // 可见区域高度
      const bodyHeight = this.$refs.bodyHeight.offsetHeight + 20 // div真实高度
      if (scrollTop + visibleHeight >= bodyHeight) {
        this.downShow = false
      } else {
        this.downShow = true
      }
    },
    toBottom () {
      this.$nextTick(() => {
        const scrollTop = this.$el.querySelector('.d2-container-full__body').scrollTop
        const visibleHeight = document.documentElement.clientHeight - 209 // 可见区域高度
        this.$el.querySelector('.d2-container-full__body').scrollTo({
          top: visibleHeight + scrollTop,
          behavior: 'smooth'
        })
      })
    },
    checkExam (row) {
      localStorage.setItem('takeExamId', row.takeExamId)
      localStorage.setItem('paperInsId', row.paperInsId)
      localStorage.setItem('studentName', this.studentInfo.studentName)
      const { href } = this.$router.resolve({
        path: '/exam_paper',
        query: {
          scene: 2
        }
      })
      window.open(href, '_blank')
    }
  }
}
</script>
  <style>
  .d2-layout-header-aside-group .d2-layout-header-aside-content .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .special .container-component .d2-container-full .d2-container-full__footer {
      padding: 8px;
      position: relative;
  }

  .d2-layout-header-aside-group .d2-layout-header-aside-content .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .special .container-component .d2-container-full .d2-container-full__body {
      padding: 0;
      background-color: #f5f5f9;
  }
  .theme-chester .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .special .container-component .d2-container-full {
      border: 0;
  }
  </style>
  <style scoped>
  .body-container{
    width: 97%;
    margin: 20px auto;
  }
  .headCss{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .detail-container{
    background-color: white;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 20px;
  }
  .detail-container-img{
    margin-right: 15px;
  }
  .detail-container-info{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    font-size: 15px;
  }
  .detail-container-name{
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
  }
  .detail-container-info-words{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items:center;
    height: 100px;
    align-items: flex-end;
  }
  .detail-container-info-words-item{
    width: 33.33%;
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    color: #888888;
  }
  .el-icon-female{
    color:#FF4B96;
    margin-right: 10px;
  }
  .el-icon-male{
    color:#1E90FF;
    margin-right: 10px;
  }
  .idCss{
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    line-height: 16px;
    color: #888888;
  }
  .numControl{
    display:block;
    word-break:keep-all;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    -icab-text-overflow:ellipsis;
    -khtml-text-overflow:ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow:ellipsis;
    max-width: 100%;
  }
  .numControl-inline{
    float: left;
    width: 80%;
  }
  .container{
    display: flex;
    flex-direction: column ;
    height: 300px;
    overflow:auto;
  }
  .container-cards{
    display: flex;
    flex-direction: row ;
    flex-wrap: wrap;
  }
  .container-card{
    display: flex;
    flex-direction: row ;
    width: 210px;
    height: 100px;
    align-items: center;
    justify-content:space-between;
    margin-bottom: 10px;
  }
  .container-card-img{
    width: 100px;
    height: 100px;
  }
  .container-card-words{
    justify-content:space-between;
    height: 70%;
    width: 6vw;
    display: flex;
    flex-direction: column ;
  }
  .data{
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    color: #444444;
  }
  .tableContainer{
    width: 100%;
    background-color: white;
    margin-top: 20px;
    padding: 0px 20px;
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
  .signCss{
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #444444;
  }
  .region{
    width: 33%;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #888888;
  }
  .sign{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items:center;
    height: 70px;
  }
  .svgCss{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 48.7%;
    top:-5vh;
    cursor: pointer;
    fill: #BFBFBF;
  }
  .svgCss:hover{
      fill: #1E90FF;
  }
  .certRegion{
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #888888;
  }
  .certificate{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items:center;
    padding-bottom: 35px;
  }
  </style>
