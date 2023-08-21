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
                              <img :src="userHeadImg" />
                          </el-avatar>
                      </div>
                  </div>
                  <div class="detail-container-info">
                      <div class="detail-container-info-words">
                          <span class="detail-container-info-words-item">
                              <span class="detail-container-name">{{studentInfo.name}}
                                  <span class="idCss">(身份证号：{{ certNo }})</span>
                              </span>
                          </span>
                          <span class="detail-container-info-words-item">手机号：<span class="data">{{studentInfo.mobile}}</span></span>
                          <span class="detail-container-info-words-item">学习完成状态：
                              <el-tag size="mini" v-if="studentInfo.isFinish=='未完成'" effect="plain" type="danger">未完成</el-tag>
                              <el-tag size="mini" v-if="studentInfo.isFinish=='已完成'" effect="plain">已完成</el-tag>
                          </span>
                          <span class="detail-container-info-words-item"><span class="numControl" :title="studentInfo.region">所在地区：<span class="data">{{studentInfo.region}}</span></span></span>
                          <span class="detail-container-info-words-item"><span class="numControl" :title="studentInfo.companyName">工作单位：<span class="data">{{studentInfo.companyName}}</span></span></span>

                      </div>
                  </div>
              </div>
              <div class="tableContainer">
                  <el-row>
                      <span class="line"></span>
                      <h3>观看数据</h3>
                      <el-table :data="userViewDetailVOList" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{ background:'#F7F7F7', border: '1px solid #EBEEF5' }" border>
                          <el-table-column prop="playDuration" label="观看时长">
                              <template slot-scope="scope">
                                  <span>{{ formateTime(scope.row.playDuration) }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="firstActiveTime" label="进入时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.firstActiveTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="lastActiveTime" label="离开时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.lastActiveTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="province" label="地区">
                          </el-table-column>
                          <el-table-column prop="city" label="城市">
                          </el-table-column>
                          <el-table-column prop="userAgent" label="设备类型">
                          </el-table-column>
                          <el-table-column prop="viewType" label="类型">
                          </el-table-column>
                      </el-table>
                  </el-row>
                  <el-row>
                      <span class="line"></span>
                      <h3>发言记录</h3>
                      <el-table :data="userMessageDetailVOList" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{ background:'#F7F7F7',border: '1px solid #EBEEF5' }" border>
                          <el-table-column
                            type="index"
                            width="60"
                            label="序号"
                            align="center">
                          </el-table-column>
                          <el-table-column prop="sendTime" label="发言时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.sendTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="testScore" label="内容">
                          </el-table-column>
                      </el-table>
                  </el-row>
                  <el-row>
                      <span class="line"></span>
                      <h3>签到记录</h3>
                      <!-- TODO 没有签到次数字段 -->
                      <el-table :data="userCheckinDetailVOList" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{ background:'#F7F7F7',border: '1px solid #EBEEF5' }" border>
                          <el-table-column prop="checkInTimes" label="签到次数"></el-table-column>
                          <el-table-column prop="checkinStartTime" label="签到发起时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.checkinStartTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="actualCheckinTime" label="实际签到时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.actualCheckinTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                      </el-table>
                  </el-row>
                  <el-row>
                      <span class="line"></span>
                      <h3>答题卡</h3>
                      <el-table :data="userQuestionDetailVOList" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{ background:'#F7F7F7',border: '1px solid #EBEEF5' }" border>
                          <el-table-column prop="questionTitle" label="答题卡名称"></el-table-column>
                          <el-table-column prop="sendTime" label="答题发起时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.sendTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="submitTime" label="答题时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.submitTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="answer" label="答案">
                          </el-table-column>
                          <el-table-column prop="correct" label="是否正确">
                              <template slot-scope="scope">
                                <span>{{ scope.row.correct ? '是' : '否' }}</span>
                              </template>
                          </el-table-column>
                      </el-table>
                  </el-row>
                  <el-row>
                      <span class="line"></span>
                      <h3>答卷</h3>
                      <el-table :data="userQuestionnaireDetailVOList" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{ background:'#F7F7F7',border: '1px solid #EBEEF5' }" border>
                          <el-table-column prop="questName" label="问卷名称"></el-table-column>
                          <el-table-column prop="createdTime" label="问卷发起时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.createdTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="submitTime" label="提交答卷时间">
                              <template slot-scope="scope">
                                  <span>{{ moment(scope.row.submitTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </template>
                          </el-table-column>
                      </el-table>
                  </el-row>
              </div>
          </div>
      </d2-container>
  </div>
</template>
<script>
import moment from 'moment'
import { formateTime, timeFormat } from '@/utils/index'

export default {
  data () {
    return {
      // TODO 还有一些冗余代码没删除
      moment,
      liveChannelId: '',
      studentId: this.$route.query.studentId,
      downShow: false,
      studentInfo: {
        photoUrl: '',
        name: '', // 姓名
        isFinish: '', // 学习完成状态
        mobile: '', // 手机号
        region: '', // 所在地区
        companyName: '' // 工作单位
      },
      certNo: '', // 身份证
      userHeadImg: '', // 头像
      userViewDetailVOList: [], // 用户的观看数据
      userMessageDetailVOList: [], // 用户的发言数据
      userCheckinDetailVOList: [], // 用户的签到记录
      userQuestionDetailVOList: [], // 用户的答题记录
      userQuestionnaireDetailVOList: [] // 用户的问卷记录
    }
  },
  created () {
    const liveChannelId = this.$route.query.liveChannelId
    this.liveChannelId = liveChannelId

    const tempRowLookData = JSON.parse(localStorage.getItem('tempRowLookData')) || {}
    this.studentInfo = Object.assign(this.studentInfo, tempRowLookData)
    localStorage.removeItem('tempRowLookData')

    this.getDetail()
  },
  methods: {
    timeFormat,
    formateTime,
    getDetail () {
      const userId = this.$route.query.userId
      const liveChannelId = this.liveChannelId

      this.$api.LIVE_STATISTICS_GETUSERLIVEDATADETAIL({
        userId,
        liveChannelId
      }).then(res => {
        if (res.code == '1' && res.data) {
          const {
            certNo,
            userHeadImg,
            userCheckinDetailVOList,
            userMessageDetailVOList,
            userQuestionDetailVOList,
            userQuestionnaireDetailVOList,
            userViewDetailVOList
          } = res.data
          this.certNo = certNo
          this.userHeadImg = userHeadImg
          this.userCheckinDetailVOList = userCheckinDetailVOList
          this.userMessageDetailVOList = userMessageDetailVOList
          this.userQuestionDetailVOList = userQuestionDetailVOList
          this.userQuestionnaireDetailVOList = userQuestionnaireDetailVOList
          this.userViewDetailVOList = userViewDetailVOList
        }
      })
    },
    back () {
      const liveChannelId = this.liveChannelId
      this.$router.push({
        path: '/live/livetudydetail',
        query: {
          liveChannelId
        }
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
</style>
