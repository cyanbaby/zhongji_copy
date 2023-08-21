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
              <el-avatar shape="square" :size="120" :src="BasicInformationList.photoUrl">
                <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
              </el-avatar>
            </div>
          </div>
          <div class="detail-container-info">
            <div class="detail-container-info-words">
              <span class="detail-container-info-words-item">
                <span class="detail-container-name">{{BasicInformationList.studentName}}
                  <i class="el-icon-female" v-if="BasicInformationList.sex==0"></i>
                  <i class="el-icon-male" v-if="BasicInformationList.sex==1"></i>
                  <span class="idCss">
                    (身份证号：
                    <span v-if="BasicInformationList.idcardNu">{{BasicInformationList.idcardNu}}</span>
                    <span v-else>无</span>
                    )
                  </span>
                </span>
              </span>
              <span class="detail-container-info-words-item">
                手机号：
                <span class="data" v-if="BasicInformationList.mobile">{{BasicInformationList.mobile}}</span>
                <span v-else>无</span>
              </span>
              <span class="detail-container-info-words-item">
                课程完成状态：
                <el-tag size="mini" v-if="BasicInformationList.graduateStatus==0" effect="plain" type="danger">未结业</el-tag>
                <el-tag size="mini" v-if="BasicInformationList.graduateStatus==1" effect="plain">已结业</el-tag>

              </span>
              <span class="detail-container-info-words-item">
                <span class="numControl" :title="BasicInformationList.companyName">
                  工作单位：
                  <span class="data" v-if="BasicInformationList.companyName">{{BasicInformationList.companyName}} </span>
                  <span v-else>无</span>
                </span>
              </span>
              <span class="detail-container-info-words-item">
                <span class="numControl" :title="BasicInformationList.workRegion">
                  所在地区：
                  <span class="data" v-if="BasicInformationList.workRegion">{{BasicInformationList.workRegion}}</span>
                  <span v-else>无</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="tableContainer">
          <el-row>
            <span class="line"></span>
            <h3 style="margin-bottom:8px;">学习进度</h3>
            <div class="sign">
              <span class="region">
                <span>累计学习时长：</span>
                <span v-if="studentStudyContentList.studyTimeSecond == null" class="signCss">无</span>
                <span v-else>{{timeFormat(studentStudyContentList.studyTimeSecond)}}</span>
              </span>
              <span class="region">
                <span>有效学习时长：</span>
                <span v-if="studentStudyContentList.studyEffectiveTimeSecond == null" class="signCss">无</span>
                <span v-else>{{timeFormat(studentStudyContentList.studyEffectiveTimeSecond)}}</span>
              </span>
              <span class="region">
                <span>学习进度：</span>
                <span v-if="studentStudyContentList.learningProgress == null" class="signCss">无</span>
                <span v-else>{{ studentStudyContentList.learningProgress }}%</span>
              </span>
              <span class="region">
                <span>开始学习时间：</span>
                <span class="signCss" v-if="studentStudyContentList.firstStudyTime">{{dayjS(studentStudyContentList.firstStudyTime)}}</span>
                <span v-else>无</span>
              </span>
              <span class="region">
                <span>最近学习时间：</span>
                <span class="signCss" v-if="studentStudyContentList.lastStudyTime">{{dayjS(studentStudyContentList.lastStudyTime)}}</span>
                <span v-else>无</span>
              </span>
            </div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick(studentStudyContentList)">
              <el-tab-pane v-for="item in studentStudyContentList.data" :key="item.contentObjId" :label="item.useName" :name="item.useId"></el-tab-pane>
              <template>
                <el-table :data="TheCoursewareList" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#F7F7F7',border: '1px solid #EBEEF5'}">
                  <el-table-column prop="chapterName" label="章节名称">
                  </el-table-column>
                  <el-table-column prop="studyTimeSecond" label="累计学习时长">
                    <template slot-scope="scope">
                      <span v-if="scope.row.studyTimeSecond == null">无</span>
                      <span v-else>{{timeFormat(scope.row.studyTimeSecond)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="studyEffectiveTimeSecond" label="有效学习时长">
                    <template slot-scope="scope">
                      <span v-if="scope.row.studyEffectiveTimeSecond == null">无</span>
                      <span v-else>{{timeFormat(scope.row.studyEffectiveTimeSecond)}}</span>
                    </template>

                  </el-table-column>
                  <el-table-column prop="learningProgress" label="进度">
                    <template slot-scope="scope">
                      <span v-if="scope.row.learningProgress == null">无</span>
                      <span>{{ scope.row.learningProgress * 100 }}%</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template>
                       <el-link type="primary" :underline="false" @click="onClickComplete">手动完成</el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-tabs>
          </el-row>
          <el-row>
            <span class="line"></span>
            <h3 style="margin-bottom:10px;">考试</h3>
            <div class="certificate" style="padding-bottom: 10px;">
              <span class="certRegion" style="width:20%">
                <span>状态：</span>
                <span class="signCss" v-if="examDetailResultList.isPass">
                  <span v-if="examDetailResultList.isPass==0">待考试</span>
                  <span v-if="examDetailResultList.isPass==1">合格</span>
                  <span v-if="examDetailResultList.isPass==2">不合格</span>
                </span>
                <span v-else>无</span>
              </span>
              <span class="certRegion" style="width:20%">
                <span>当前考生成绩：</span>
                <span v-if="examDetailResultList.testScore == null" class="signCss">无</span>
                <span v-else>{{examDetailResultList.testScore}}</span>
              </span>
              <span class="certRegion" style="width:20%">
                <span>最新考试时间：</span>
                <span class="signCss" v-if="examDetailResultList.updateTime">{{dayjS(examDetailResultList.updateTime)}}</span>
                <span v-else>无</span>
              </span>
            </div>
            <template>
              <el-table :data="examDetailResultList.examDetailResultList" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#F7F7F7',border: '1px solid #EBEEF5'}">
                <el-table-column prop="examName" label="考试记录" width="450">
                </el-table-column>
                <el-table-column prop="examTime" label="考试时间" width="200">
                </el-table-column>
                <el-table-column prop="examQualification" label="考试结果">
                  <template slot-scope="scope">
                    <div v-if="scope.row.examQualification == 0">资格待发放</div>
                    <div v-if="scope.row.examQualification == 1">
                      <div v-if="scope.row.isPass == 0">待考试</div>
                      <div v-if="scope.row.isPass == 1">
                        {{scope.row.testScore}}
                        <el-button type="success" size="mini">合格</el-button>
                      </div>
                      <div v-if="scope.row.isPass == 2">
                        {{scope.row.testScore}}
                        <el-button type="warning" size="mini">不合格</el-button>
                      </div>
                    </div>
                    <!-- <el-tag type="success"
                            v-if="scope.row.isPass=='1'"
                            effect="plain">合格</el-tag>
                    <el-tag type="danger"
                            v-if="scope.row.isPass=='2'"
                            effect="plain">不合格</el-tag> -->
                  </template>
                </el-table-column>
                <el-table-column prop="testScore" label="成绩">
                  <template slot-scope="scope">
                    <span v-if="scope.row.testScore == null">无</span>
                    <span>{{scope.row.testScore}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="90">
                  <template slot-scope="scope">
                    <el-button @click="checkExam(scope.row)" type="text" size="small">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-row>
          <el-row>
            <span class="line"></span>
            <h3 style="margin-bottom:10px;">证书</h3>
            <div class="certificate">
              <span class="certRegion" style="width:20%">
                <span>证书名称：</span>
                <span class="signCss" v-if="certDetailResultList.certName">{{certDetailResultList.certName}}</span>
                <span v-else>无</span>
              </span>
              <span class="certRegion" style="width:20%">
                <span>证书编码：</span>
                <span class="signCss" v-if="certDetailResultList.cIdentifier">{{certDetailResultList.cIdentifier}}</span>
                <span v-else>无</span>
              </span>
              <span class="certRegion" style="width:20%">
                <span>状态：</span>
                <span class="signCss" v-if="certDetailResultList.applyStatus">
                  <span v-if="certDetailResultList.applyStatus == 1">资格待发放</span>
                  <span v-if="certDetailResultList.applyStatus == 2">待申请</span>
                  <span v-if="certDetailResultList.applyStatus == 3">已申请</span>
                  <span v-if="certDetailResultList.applyStatus == 4">已发放</span>
                  <span v-if="certDetailResultList.applyStatus == 5">已打印</span>
                </span>
                <span v-else>无</span>
              </span>
              <span class="certRegion" style="width:20%">
                <span>申请证书时间：</span>
                <span class="signCss" v-if="certDetailResultList.applyTime">{{certDetailResultList.applyTime}}</span>
                <span v-else>无</span>
              </span>
            </div>
          </el-row>
        </div>
      </div>
      <el-dialog title="学习详情" :visible.sync="detailDialog" :close-on-click-modal=false width="50%">
        <span style="display:block;">学员：{{studentInfo.studentName}}</span>
        <br>
        <span style="margin-right:10%">课程：{{goodsValue}}</span>
        <span>最近学习时间：{{lastStudyTime}}</span>
        <detail-table :sscId="currentSscId" :studentId="this.$route.query.studentId" ref="detailTable"></detail-table>
      </el-dialog>
      <el-dialog title="抓拍记录" :visible.sync="captureRecordDialog" width="50%" @close="captureRecordDialogClose" :close-on-click-modal=false>
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
            <el-divider content-position="left">
              <h4>{{item.photoDate}}</h4>
            </el-divider>
            <div class="container-cards">
              <div class="container-card" v-for="(data,subs) in item.studyTaskPhotoRecordResults" :key="subs">
                <div class="container-card-img">
                  <el-image style="width: 100px; height: 100px" :src="data.photoUrl" :preview-src-list="[data.photoUrl]">
                  </el-image>
                </div>
                <div class="container-card-words">
                  <span>{{data.photoLocation}}</span>
                  <span>{{data.chapterName}}</span>
                  <span>{{data.itemName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination background @current-change="handleCurrentChange" :page-size="3" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total" :hide-on-single-page="true">
        </el-pagination>
      </el-dialog>
      <!-- <template slot="footer">
        <div style="text-align:center">
          <span @click="toBottom"
                v-if="downShow">
            <d2-icon-svg name="down"
                         class="svgCss" />
          </span>
          <el-button type="primary"
                     plain
                     style="width:150px"
                     size="mini"
                     @click="back">返回</el-button>
        </div>
      </template> -->
    </d2-container>
  </div>
</template>
<script>
/* eslint-disable */ 

import moment from 'moment'
import DetailTable from './components/detail-table.vue'
import { findItemInArrayByProperty } from '@/utils/array-utils'
import { formateTime } from '@/utils/index'
import dayjs from 'dayjs'
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
      // studentId: this.$route.query.studentId,
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
      studentStudyContentList: [],
      certDetailResultList: [],
      examDetailResultList: {
        examDetailResultList: []
      },
      activeName: '',
      BasicInformationList: [],
      TheCoursewareList: [],
      sscId: '',
      fromClass: null,
      taskId: ''
    }
  },
  mounted () {
    // this.watchDown()
    // window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  // 这里必须要移除掉这个window添加的监听事件，要不然在别的界面也会出发滚动监听
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll, true) //  离开页面清除（移除）滚轮滚动事件
  },
  created () {
    this.BasicInformationOfStudents() // 课程学员详情-学员基础信息
    this.TheLearningProcess() // 课程学员详情-学习进度

    this.TheTestInformation() // 课程学员详情-考试信息
    this.CertificateInformation() // 课程学员详情-证书信息
  },
  beforeRouteEnter (to, from, next) {
    console.log('from', from)
    if (from.name === 'classstudyinfo') {
      next(vm => {
        vm.fromClass = 1
      })
    }
    next()
  },
  methods: {
    // 格式化时间 from user-pc
    timeFormat (value) {
      var secondTime = parseInt(value) // 秒
      var minuteTime = 0 // 分
      var hourTime = 0 // 小时
      if (secondTime >= 60) {
        minuteTime = parseInt(secondTime / 60)
        secondTime = parseInt(secondTime % 60)
        if (minuteTime >= 60) {
          hourTime = parseInt(minuteTime / 60)
          minuteTime = parseInt(minuteTime % 60)
        }
      }
      var result =
        '' +
        (parseInt(secondTime) < 10
          ? '0' + parseInt(secondTime)
          : parseInt(secondTime))

      // if (minuteTime > 0) {
      result =
        '' +
        (parseInt(minuteTime) < 10
          ? '0' + parseInt(minuteTime)
          : parseInt(minuteTime)) +
        ':' +
        result
      // }
      // if (hourTime > 0) {
      result =
        '' +
        (parseInt(hourTime) < 10
          ? '0' + parseInt(hourTime)
          : parseInt(hourTime)) +
        ':' +
        result
      // }
      return result
    },
    formateTime,
    // parseTime,
    // formateTime () { // 获取课程学员详情
    // this.$api.DETAILS_OF_COURSE_PARTCIPANTS({
    //   goodsId: this.$route.query.goodsId,
    //   studentId: this.studentId
    // }).then(res => { })
    // this.studentInfo = res.data
    // this.studentStudyContentList = res.data.studentStudyContentList // 学习进度
    // this.certDetailResultList = res.data.certDetailResultList // 证书
    // this.examDetailResultList = res.data.examDetailResultList // 考试
    // },
    dayjS (time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    BasicInformationOfStudents () { // 课程学员详情-学员基础信息
      this.$api.COURSE_PARTICIPANT_DETAILS_BASIC_PARTICIPANT_INFORMATION({
        studentId: this.$route.query.studentId,
        goodsId: this.$route.query.goodsId
      }).then(res => {
        if (res.code == '1') {
          this.BasicInformationList = res.data
        }
      })
    },
    TheLearningProcess () { // 课程学员详情-学习进度
      this.$api.COURSE_PARTICIPANT_DETAILS_LEARNING_PROGRESS({
        goodsId: this.$route.query.goodsId,
        studentId: this.$route.query.studentId
      }).then(res => {
        if (res.code == '1') {
          this.sscId = res.data.sscId
          this.activeName = res.data.data[0].useId
          this.studentStudyContentList = res.data
          this.TheCoursewareInformation()
        }
      })
    },
    TheCoursewareInformation () { // 课程学员详情-课件信息
      this.$api.COURSE_PARTICIPANT_DETAILS_COURSEWARE_INFORMATION({
        sscId: this.sscId,
        studentId: this.$route.query.studentId,
        useId: this.activeName
      }).then(res => {
        if (res.code == '1') {
          this.TheCoursewareList = res.data.chapterInfoResultList
          this.taskId = res.data.taskId
        }
      })
    },
    TheTestInformation () { // 课程学员详情-考试信息
      this.$api.COURSE_PARTICIPANT_DETAILS_EXAMINATION_INFORMATION({
        goodsId: this.$route.query.goodsId,
        studentId: this.$route.query.studentId
      }).then(res => {
        if (res.code == '1') {
          res.data.examDetailResultList.forEach(element => {
            if (element.examTime) {
              element.examTime = moment(parseInt(element.examTime)).format('YYYY-MM-DD HH:mm:ss')
            }
          })
          this.examDetailResultList = res.data
        }
      })
    },
    CertificateInformation () { // 课程学员详情-证书信息
      this.$api.COURSE_PARTICIPANT_DETAILS_CERTIFICATE_INFORMATION({
        goodsId: this.$route.query.goodsId,
        studentId: this.$route.query.studentId
      }).then(res => {
        if (res.code == '1') {
          this.certDetailResultList = res.data
        }
      })
    },
    handleClick (row) {
      this.sscId = row.sscId
      console.log(this.activeName)
      this.TheCoursewareInformation() // 课程学员详情-课件信息
    },
    // 将秒转化为时分秒
    formateSeconds (endTime) {
      let secondTime = parseInt(endTime)// 将传⼊的秒的值转化为Number
      let min = 0// 初始化分
      let h = 0// 初始化⼩时
      let result = ''
      if (secondTime > 60) { // 如果秒数⼤于60，将秒数转换成整数
        min = parseInt(secondTime / 60)// 获取分钟，除以60取整数，得到整数分钟
        secondTime = parseInt(secondTime % 60)// 获取秒数，秒数取佘，得到整数秒数
        if (min > 60) { // 如果分钟⼤于60，将分钟转换成⼩时
          h = parseInt(min / 60)// 获取⼩时，获取分钟除以60，得到整数⼩时
          min = parseInt(min % 60) // 获取⼩时后取佘的分，获取分钟除以60取佘的分
        }
      }
      result = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
      return result
    },
    // detailInfo (row) {
    //   this.detailDialog = true
    //   this.studentId = row.studentId
    //   this.currentSscId = row.sscId
    //   this.goodsValue = row.goodsValue
    //   this.lastStudyTime = row.lastStudyTime
    //   if (this.$refs.detailTable) {
    //     this.$refs.detailTable.fetchData(row.sscId)
    //   }
    // },
    // captureRecord (row) {
    //   this.captureRecordDialog = true
    //   this.goodsValue = row.goodsValue
    //   this.$api.QUERY_PHOTO_RECORD({
    //     studentId: row.studentId,
    //     sscId: row.sscId
    //   }).then(res => {
    //     this.photoLoading = false
    //     if (!res.data.photoCount) {
    //       this.photoCount = 0
    //     } else {
    //       this.photoCount = res.data.photoCount
    //     }
    //     if (!res.data.wareInfo) {
    //       this.wareInfo = []
    //     } else {
    //       this.wareInfo = res.data.wareInfo
    //       this.change(this.wareInfo[0].stId)
    //       this.wareName = this.wareInfo[0].stId
    //       this.handleCurrentChange(1)
    //     }
    //   })
    // },
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
    back () { // 返回
      if (this.fromClass == 1) {
        this.$router.push({
          path: '/statistic/classstudydetail',
          query: {
            classId: this.$route.query.classId,
            goodsId: this.$route.query.goodsId,
            coverImgUrl: this.$route.query.coverImgUrl
          }
        })
      } else {
        this.$router.push({
          path: '/statistic/coursestudydetail',
          query: {
            goodsId: this.$route.query.goodsId,
            coverImgUrl: this.$route.query.coverImgUrl
          }
        })
      }
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
      localStorage.setItem('studentName', this.BasicInformationList.studentName)
      const { href } = this.$router.resolve({
        path: '/exam_paper',
        query: {
          scene: 2
        }
      })
      window.open(href, '_blank')
    },

    /**
     * @description 手动完成点击事件
     * 1. 不需要row数据, 没有章节手动完成，所有行点击手动完成，行为一样
     * 2. 更新课程学员详情-学习进度
     * @return void
     */
    onClickComplete () {
      const stId = this.taskId // 学习任务id
      const studentId = this.$route.query.studentId // 学员id

      this.$api.COMPLETE_STUDY_PROGRESS({ stId, studentId })
        .then(res => {
          if (res.code === '1') {
            this.$message({
              message: res.msg || '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg || '修改失败',
              type: 'warning'
            })
          }

          // 课程学员详情-学习进度
          this.TheLearningProcess()
        })
        .catch(err => {
          this.$message({
            message: '修改失败' + err,
            type: 'warning'
          })
          // 课程学员详情-学习进度
          this.TheLearningProcess()
        })
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
  margin: 20px auto 0;
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
  height: 55px;
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
