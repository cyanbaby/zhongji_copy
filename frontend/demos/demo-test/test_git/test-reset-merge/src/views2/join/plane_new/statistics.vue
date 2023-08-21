<!--
  * @Author: 姚文彬
  * @Date: 2021-06-01 16:56:20
  * @LastEditors: 姚文彬
  * @LastEditTime: 2021-06-03 13:50:12
  * @FilePath: \d2-crud-plus-with-d2admin-starter\src\views\join\plane\edit.vue
 -->
 <template>
  <d2-container class="baoming-tongji">
      <template slot="header">
          <span class="page-title">【{{ activityName }}】数据统计</span>
          <el-button size="mini" style="float:right;" @click="backBtn">返回</el-button>
      </template>
      <div>
          <el-radio-group v-model="activeIndex" @change="handleClick">
              <el-radio-button label="0">概要统计</el-radio-button>
              <el-radio-button label="1">岗位统计</el-radio-button>
          </el-radio-group>
          <div v-show="activeIndex == '0'">
              <div class="baoming-tongji__div--toptip">
                  截止{{time}}，已报名{{Statistics1.signupNum}}人，
                  其中审核通过{{Statistics1.auditOkNum}}人，
                  审核不通过{{Statistics1.auditFailNum}}人，
                  待审核人数{{Statistics1.waitAuditNum}}人，
                  打印准考证{{Statistics1.printExamCardNum}}人。
              </div>
              <!-- 数据模块 -->
              <div class="flex-box flex-box-5-4">
                  <div class="flex-box-item" :style="{
                      backgroundImage: `url(${topListPanelBgc01})`
                    }">
                      <span class="baoming-tongji__span--paneltext">今日报名人数</span>
                      <div>
                          <span class="baoming-tongji__span--paneltext num">{{Statistics1.todaySignupNum}}</span>
                          <span class="baoming-tongji__span--paneltext">人</span>
                      </div>
                  </div>
                  <div class="flex-box-item" :style="{
                      backgroundImage: `url(${topListPanelBgc02})`
                    }">
                      <span class="baoming-tongji__span--paneltext">今日未审核人数</span>
                      <div>
                          <span class="baoming-tongji__span--paneltext num">{{Statistics1.waitAuditNum}}</span>
                          <span class="baoming-tongji__span--paneltext">人</span>
                      </div>
                  </div>
                  <div class="flex-box-item" :style="{
                      backgroundImage: `url(${topListPanelBgc03})`
                    }">
                      <span class="baoming-tongji__span--paneltext">今日审核通过人数</span>
                      <div>
                          <span class="baoming-tongji__span--paneltext num">{{Statistics1.todayAuditOkNum}}</span>
                          <span class="baoming-tongji__span--paneltext">人</span>
                      </div>
                  </div>
                  <div class="flex-box-item" :style="{
                      backgroundImage: `url(${topListPanelBgc04})`
                    }">
                      <span class="baoming-tongji__span--paneltext">今日审核不通过人数</span>
                      <div>
                          <span class="baoming-tongji__span--paneltext num">{{Statistics1.todayAuditFailNum}}</span>
                          <span class="baoming-tongji__span--paneltext">人</span>
                      </div>
                  </div>
                  <div class="flex-box-item" :style="{
                      backgroundImage: `url(${topListPanelBgc05})`
                    }">
                      <span class="baoming-tongji__span--paneltext">今日打印准考证人数</span>
                      <div>
                          <span class="baoming-tongji__span--paneltext num">{{Statistics1.todayPrintExamCardNum}}</span>
                          <span class="baoming-tongji__span--paneltext">人</span>
                      </div>
                  </div>
              </div>
              <!-- 统计模块查询 -->
              <el-form :inline="true" status-icon ref="ruleForm" style="height: 40px; margin: 20px 0;">
                  <el-form-item label="统计时间段">
                      <el-date-picker v-model="datevalue" type="daterange" @change="Change" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="统计时间间隔">
                      <el-select v-model="statisticalForm.timeInterval" placeholder="请选择">
                          <el-option v-for="item in timeIntervaldate" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item style="float: right; margin-right: 0;">
                      <el-button type="primary" @click="submitForm">统计</el-button>
                  </el-form-item>
              </el-form>

              <!-- 数据展示区域 -->
              <div class="datacount">
                  <div ref="div1" class="div1 datacount__div-1"></div>
                  <el-table
                    :data="Statistics1.dataList"
                    border
                    stripe
                    max-height="440"
                    class="datacount__div-2"
                    :header-cell-style="{
                      background:'#FAFAFA',
                      color: '#444444'
                    }"
                  >
                      <el-table-column prop="timeStr" label="日期">
                      </el-table-column>
                      <el-table-column prop="signupNum" label="报名人数">
                      </el-table-column>
                      <el-table-column prop="auditOkNum" label="审核通过人数">
                      </el-table-column>
                  </el-table>
              </div>
          </div>
          <div v-show="activeIndex == '1'">
              <div class="baoming-tongji__div--toptip">
                截止{{time}}，
                【{{activityName}}】已发布 {{total}} 个岗位，
                总计招聘 {{totalOf}} 人，
                已报名人数 {{sign}} 人，
                竞争比最高 {{competitionHigh}}，
                最低 {{competitionEnd}}
              </div>
              <el-form :inline="true">
                  <el-form-item label="岗位名称">
                      <el-input v-model="positionName" style="width: 220px;"></el-input>
                  </el-form-item>
                  <el-form-item style="margin: 0;">
                      <el-button type="primary" @click="JobSearch('a')">搜索</el-button>
                      <el-button @click="JobSearch('b')">重置</el-button>
                  </el-form-item>
                  <el-form-item style="float: right; margin-right: 0;">
                      <el-button type="primary" @click="exportData">导出</el-button>
                  </el-form-item>
              </el-form>
              <el-table
                :data="JobTableData"
                border
                :header-cell-style="{
                    background:'#409EFF',
                    color: '#fff',
                }"
              >
                  <el-table-column prop="positionName" label="岗位名称">
                  </el-table-column>
                  <el-table-column prop="positionCode" label="岗位编码">
                  </el-table-column>
                  <el-table-column prop="departmentName" label="所属部门"  width="300">
                  </el-table-column>
                  <el-table-column prop="recruitNum" label="招聘人数">
                  </el-table-column>
                  <el-table-column prop="signupNum" label="报名人数">

                  </el-table-column>
                  <el-table-column prop="waitAuditNum" label="未审核人数">

                  </el-table-column>
                  <el-table-column prop="auditOkNum" label="审核通过人数">

                  </el-table-column>
                  <el-table-column prop="auditFailNum" label="审核不通过人数">
                  </el-table-column>
                  <el-table-column prop="printExamCardNum" label="打印准考证人数">
                  </el-table-column>
                  <el-table-column prop="auditOkDivRecruitRatio" label="竞争比">
                  </el-table-column>
                  <!-- <el-table-column prop="address"
                           label="操作">
                        <template slot-scope="scope">
                          <el-link @click="ViewDetails(scope.row)"
                                  :underline="false">查看详情</el-link>
                        </template>
                      </el-table-column> -->
              </el-table>
          </div>
      </div>
  </d2-container>
</template>
<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
const topListPanelBgc01 = require('./images/001.png')
const topListPanelBgc02 = require('./images/002.png')
const topListPanelBgc03 = require('./images/003.png')
const topListPanelBgc04 = require('./images/004.png')
const topListPanelBgc05 = require('./images/005.png')

export default {
  data () {
    return {
      // 公用数据
      time: '',
      activityName: this.$route.query.activityName,
      activeIndex: 0,
      statisticalForm: {
        activityId: this.$route.query.activityId,
        timeInterval: '2',
        startTime: '',
        endTime: ''
      },
      datevalue: [],
      timeIntervaldate: [
        {
          label: '日',
          value: '2'
        },
        {
          label: '月',
          value: '1'
        }
      ],
      // 概要统计echarts配置项
      option: {
        title: {
          text: 'Large Ara Chart',
          left: 'center',
          top: 25
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          },
          right: '5%'
        },
        legend: {
          data: ['报名人数', '审核通过人数'],
          right: '10%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              symbol: ['none', 'arrow']
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              symbol: ['none', 'arrow']
            },
            interval: 10
          }
        ],
        series: [
          {
            name: '报名人数',
            type: 'bar',
            barWidth: '30%',
            data: [],
            color: '#FFB900'
          },
          {
            name: '审核通过人数',
            type: 'bar',
            barWidth: '30%',
            data: [],
            color: '#209AB5'
          }
        ]
      },
      total: 0,
      totalOf: 0,
      sign: 0,
      competitionHigh: '',
      competitionEnd: '',
      // 概要统计数据
      Statistics1: [],
      // 岗位统计数据
      positionName: '',
      JobTableData: [],
      topListPanelBgc01: topListPanelBgc01,
      topListPanelBgc02: topListPanelBgc02,
      topListPanelBgc03: topListPanelBgc03,
      topListPanelBgc04: topListPanelBgc04,
      topListPanelBgc05: topListPanelBgc05
    }
  },
  created () {
    const str = +new Date() - 518400000
    const str1 = new Date(str)
    const str2 = new Date()
    this.statisticalForm.startTime = +new Date(str)
    this.statisticalForm.endTime = +new Date()
    const arrs = []
    arrs.push(str1)
    arrs.push(str2)
    this.datevalue = arrs
    console.log(this.datevalue)
    this.getcensus()
    this.time = dayjs().format('YYYY-MM-DD HH:mm')
  },
  mounted () {

  },
  methods: {
    getcensus () {
      this.$api.QUERY_STATISTICAL_ACTIVITIES({
        ...this.statisticalForm
      }).then(res => {
        this.Statistics1 = res.data
        this.option.xAxis[0].data = []
        this.option.series[0].data = []
        this.option.series[1].data = []
        this.option.title.text = res.data.echartsName
        if (res.data.dataList) {
          res.data.dataList.forEach(item => {
            this.option.xAxis[0].data.push(item.timeStr)
            this.option.series[0].data.push(item.signupNum)
            this.option.series[1].data.push(item.auditOkNum)
          })
        }
        const chartDom = this.$refs.div1
        var myChart = echarts.init(chartDom)
        myChart.setOption(this.option)
      })
    },
    getJob (a) {
      this.$api.QUERY_STATISTICS_POST({
        activityId: this.$route.query.activityId,
        positionName: this.positionName
      }).then(res => {
        if (!a) {
          const arr = []
          this.totalOf = 0
          this.sign = 0
          res.data.forEach(item => {
            this.totalOf += Number(item.recruitNum)
            this.sign += Number(item.signupNum)
            arr.push(item.auditOkDivRecruitRatio)
          })
          this.total = res.data.length
          this.competitionHigh = Math.max.apply(null, arr)// 最大值
          this.competitionEnd = Math.min.apply(null, arr)// 最小值
          this.JobTableData = res.data
        } else {
          res.data.forEach(item => {
            if (this.positionName == item.positionName) {
              this.JobTableData = []
              this.JobTableData.push(item)
            }
          })
        }
      })
    },
    Change (val) {
      console.log(val)
      this.statisticalForm.startTime = val[0]
      this.statisticalForm.endTime = val[1]
    },
    // 岗位事件
    // 查看详情
    ViewDetails (row) {
      this.$router.push({
        path: 'detailedInformation',
        query: row
      })
    },
    // 导出岗位
    exportData () {
      this.$api.EXPORT_STATISTICS_POST({
        activityId: this.$route.query.activityId,
        positionName: this.positionName
      }).then(res => {
        if (res.code == '1') {
          this.$notify({
            title: '提示',
            message: '创建下载任务成功，请前往任务中心进行查看!',
            type: 'success'
          })
        }
      })
    },
    // 查询岗位
    JobSearch (str) {
      if (str == 'a') {
        this.getJob('a')
      } else {
        this.positionName = ''
        this.getJob()
      }
    },
    // 切换tab栏事件
    handleClick () {
      if (this.activeIndex == 0) {
        this.getcensus()
      } else {
        this.getJob()
      }
    },
    // 返回按钮
    backBtn () {
      this.$router.go(-1)
    },
    // 概要统事件
    // 概要统计查询
    submitForm () {
      console.log(this.datevalue, this.statisticalForm.timeInterval)
      this.getcensus()
    }
  }
}
</script>
<style scoped lang="scss">
.Text {
  color: #2db5c8;
  text-decoration: underline;
  cursor: pointer;
}
::v-deep .cell {
  text-align: center;
}
.tip {
  padding-left: 20px;
  margin-bottom: 12px;
  font-weight: bold;
}

.count_centent {
  width: 65%;
  display: flex;
  justify-content: space-around;

  div {
    width: 16%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      text-align: center;
      margin: 0;
      color: aliceblue;
      font-weight: 500;
    }
  }
}

.datacount {
  display: flex;
  width: 100%;
  height: 440px;
  & > div {
    flex: 1;
    border: 1px solid #409eff;
    border-radius: 6px;
    .div1 {
      height: 440px;
    }
  }
  .datacount__div-1 {
    margin-right: 10px;
  }
  .datacount__div-2{
    margin-left: 10px;
  }
}
</style>
<style scoped lang="scss">
.baoming-tongji {
  .page-title {
    height: 18px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 31px;
    color: #222222;
  }
  &__div--toptip {
    margin: 20px 0;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #AAAAAA;
    opacity: 1;
  }
  &__span--paneltext {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #FFFFFF;
  }
  &__span--paneltext.num {
    font-size: 32px;
  }
  .flex-box {
    display: flex;
  }
  .flex-box-5-4 {
    justify-content: space-between;
    & > div {
      & > div {
        margin-top: 7%;
      }
    }
  }
  .flex-box-item {
    // flex: 1;
    width: 19.4375rem;
    height: 9.25rem;
    margin-right: 2rem;
    vertical-align: middle;
    color: white;
    background-size: contain;
    background-repeat: no-repeat;
    padding-left: 2%;
    padding-top: 2%;
  }
  .flex-box-item:nth-last-child(1) {
    margin-right: 0;
  }
}
</style>
