<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
        <el-radio-group v-model="objectType" style="float:right" @change="changeObjectType">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="06">课程</el-radio-button>
            <el-radio-button label="20">班级报名</el-radio-button>
            <el-radio-button label="17">直播</el-radio-button>
        </el-radio-group>
        <el-card class="box-card" style="margin-top: 50px;">
            <div slot="header" class="clearfix">
                <strong>订单概况</strong>
            </div>
            <div class="text item" style="display:flex;">
                <div style="margin: 0 50px;">
                    <div>
                        <strong>下单用户数</strong>
                    </div>
                    <div style="text-align:center;margin:10px 0;">
                        <span>{{order.orderUserCount}}</span>
                    </div>
                </div>
                <div style="margin: 0 50px;">
                    <div>
                        <strong>下单数</strong>
                    </div>
                    <div style="text-align:center;margin:10px 0;">
                        <span>{{order.orderCount}}</span>
                    </div>
                </div>
                <div style="margin: 0 50px;">
                    <div>
                        <strong>下单金额</strong>
                    </div>
                    <div style="text-align:center;margin:10px 0;">
                        <span>{{order.orderAmount}}</span>
                    </div>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="text item" style="display:flex;margin-top:20px;">
                <div style="margin: 0 50px;">
                    <div>
                        <strong>付款用户数</strong>
                    </div>
                    <div style="text-align:center;margin:10px 0;">
                        <span>{{order.payUserCount}}</span>
                    </div>
                </div>
                <div style="margin: 0 50px;">
                    <div>
                        <strong>付款订单数</strong>
                    </div>
                    <div style="text-align:center;margin:10px 0;">
                        <span>{{order.payOrderCount}}</span>
                    </div>
                </div>
                <div style="margin: 0 50px;">
                    <div>
                        <strong>付款订单总金额</strong>
                    </div>
                    <div style="text-align:center;margin:10px 0;">
                        <span>{{order.payOrderAmountCount}}</span>
                    </div>
                </div>
                <div style="margin: 0 50px;">
                    <div>
                        <strong>平均客单价</strong>
                    </div>
                    <div style="text-align:center;margin:10px 0;">
                        <span>{{order.avgUserPrice}}</span>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px;">
            <div slot="header" class="clearfix">
                <strong>订单构成</strong>
            </div>
            <div class="text item" style="display:flex">
                <div style="width:49%">
                    <div id="echarts" style="width: 90%;height:400px;"></div>
                </div>
                <div style="width:49%">
                    <el-table :data="structureData" border style="width: 100%">
                        <el-table-column prop="terminalName" label="来源终端" width="180">
                        </el-table-column>
                        <el-table-column prop="payOrderCount" label="付款订单数" width="180">
                        </el-table-column>
                        <el-table-column prop="compareDayBefore" label="较前一天">
                        </el-table-column>
                        <el-table-column prop="payAmount" label="付款金额">
                            <template slot-scope="scope">
                                {{scope.row.payAmount}}元
                            </template>
                        </el-table-column>
                        <el-table-column prop="compareYesterday" label="较昨天">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px;">
            <div slot="header" class="clearfix">
                <strong>支付渠道</strong>
            </div>
            <div class="text item" style="display:flex">
                <div style="width:49%">
                    <div id="echarts1" style="width: 90%;height:400px;"></div>
                </div>
                <div style="width:49%">
                    <el-table :data="payData" border style="width: 100%">
                        <el-table-column prop="channelName" label="支付渠道" width="180">
                        </el-table-column>
                        <el-table-column prop="payAmountCount" label="支付金额" width="180">
                            <template slot-scope="scope">
                                {{scope.row.payAmountCount}}元
                            </template>
                        </el-table-column>
                        <el-table-column prop="compareYesterday" label="较昨天涨幅">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px;">
            <div slot="header" class="clearfix">
                <strong>订单金额分布</strong>
            </div>
            <div class="text item">
                <div id="echarts2" style="width: 100%;height:400px;"></div>
            </div>
        </el-card>
        <!-- <el-card class="box-card" style="margin-top: 20px;">
            <div slot="header" class="clearfix">
                <strong>地域分布</strong>
            </div>
            <div class="text item" style="display:flex">
                <div style="width:49%">
                    <div id="echarts3" style="width: 90%;height:400px;"></div>
                </div>
                <div style="width:49%">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="date" label="排名" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="地域" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="订单数" sortable>
                        </el-table-column>
                        <el-table-column prop="address" label="订单金额" sortable>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-card> -->
        <div style="display:flex;" v-if="objectType == '06' || objectType == '0'">
            <el-card class="box-card" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <strong>课程销量top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordersaleData.course" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="课程名称" width="180">
                            </el-table-column>
                            <el-table-column prop="salesCount" label="销量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;margin-left:10px">
                <div slot="header" class="clearfix">
                    <strong>课程营业额top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordertransactionData.course" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="课程名称" width="180">
                            </el-table-column>
                            <el-table-column prop="transactionCount" label="营业额">
                            <template slot-scope="scope">
                                {{scope.row.transactionCount}}元
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
        </div>
        <div style="display:flex;" v-if="objectType == '17' || objectType == '0'">
            <el-card class="box-card" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <strong>直播销量top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordersaleData.live" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="直播名称" width="180">
                            </el-table-column>
                            <el-table-column prop="salesCount" label="销量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;margin-left:10px">
                <div slot="header" class="clearfix">
                    <strong>直播营业额top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordertransactionData.live" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="直播名称" width="180">
                            </el-table-column>
                            <el-table-column prop="transactionCount" label="营业额">
                            <template slot-scope="scope">
                                {{scope.row.transactionCount}}元
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
        </div>
        <div style="display:flex;" v-if="objectType == '20' || objectType == '0'">
            <el-card class="box-card" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <strong>班级销量top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordersaleData.class" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="班级名称" width="180">
                            </el-table-column>
                            <el-table-column prop="salesCount" label="销量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;margin-left:10px">
                <div slot="header" class="clearfix">
                    <strong>班级营业额top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordertransactionData.class" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="班级名称" width="180">
                            </el-table-column>
                            <el-table-column prop="transactionCount" label="营业额">
                            <template slot-scope="scope">
                                {{scope.row.transactionCount}}元
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
/* eslint-disable */ 

import {
  d2CrudPlus
} from 'd2-crud-plus'
import axios from 'axios'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    function randomData () {
      return Math.round(Math.random() * 500)
    }
    return {
      objectType: 0,
      order: {},
      structureData: [],
      ordermoneyData: [],
      ordersaleData: [],
      ordertransactionData: [],
      ordermoneyXData: [],
      ordermoneyYData: [],
      payChartData: [],
      structureChartData: [],
      payData: [],
      seriesData: [{
        name: '天津市',
        value: 20057.34
      },
      {
        name: '北京市',
        value: 15477.48
      },
      {
        name: '上海市',
        value: 31686.1
      },
      {
        name: '河北省',
        value: 6992.6
      },
      {
        name: '山东省',
        value: 44045.49
      },
      {
        name: '山西省',
        value: 4045.49
      }
      ]
    }
  },
  mounted () {
    this.initOrder()
    this.initOrderStructure()
    this.getorderpaychannel()
    this.getordermoneydistribution()
    this.getordersalestop()
    this.getordertransactiontop()
    // this.initEchart3()
  },
  methods: {
    subStr (str) {
      // 设置变量存储返回值
      let newstr = ''
      // 如果长度超过5，就要截取插入字符
      if (str.length > 7) {
        // 第一次截取
        newstr = str.slice(0, 7) + '\n'
        // 闭包再次调用，如果截取后的字段长度依然超过5，再次调用，如果没有直接返回当前值
        return newstr + this.subStr(str.slice(7))
      } else {
        // 直接返回当前值
        return str
      }
    },
    initEchart () {
      // 1. 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('echarts'))
      const _this = this
      const option = {
        tooltip: { // 提示框，可以在全局也可以在
          trigger: 'item', // 提示框的样式
          formatter: '{b}: {c}%',
          color: '#000', // 提示框的背景色
          textStyle: { // 提示的字体样式
            color: 'black'
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie', // 环形图的type和饼图相同
          radius: ['50%', '70%'], // 饼图的半径，第一个为内半径，第二个为外半径
          avoidLabelOverlap: false,
          color: ['#D1FBEF', '#F9D858', '#4CD0DD', '#DF86F0', '#F5A7C1'],
          label: {
            normal: { // 正常的样式
              show: true,
              formatter (value) {
                let res = value.name // 获取到名称
                res = _this.subStr(res)
                return res
              },
              position: 'left'
            },
            emphasis: { // 选中时候的样式
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          }, // 提示文字
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.structureChartData
        }]
      }
      myChart.clear()
      myChart.setOption(option)
    },
    initEchart1 () {
      // 1. 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('echarts1'))
      const _this = this
      const option = {
        tooltip: { // 提示框，可以在全局也可以在
          trigger: 'item', // 提示框的样式
          formatter: '{b}: {c}%',
          color: '#000', // 提示框的背景色
          textStyle: { // 提示的字体样式
            color: 'black'
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie', // 环形图的type和饼图相同
          radius: ['50%', '70%'], // 饼图的半径，第一个为内半径，第二个为外半径
          avoidLabelOverlap: false,
          color: ['#D1FBEF', '#F9D858', '#4CD0DD', '#DF86F0', '#F5A7C1'],
          label: {
            normal: { // 正常的样式
              show: true,
              formatter (value) {
                let res = value.name // 获取到名称
                res = _this.subStr(res)
                return res
              },
              position: 'left'
            },
            emphasis: { // 选中时候的样式
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          }, // 提示文字
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.payChartData
        }]
      }
      myChart.setOption(option)
    },
    initEchart2 () {
      // 1. 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('echarts2'))
      const option = {
        xAxis: {
          type: 'category',
          data: this.ordermoneyXData
        },
        tooltip: { // 提示框，可以在全局也可以在
          trigger: 'item', // 提示框的样式
          formatter: '{b}: {c}%',
          color: '#000', // 提示框的背景色
          textStyle: { // 提示的字体样式
            color: 'black'
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.ordermoneyYData,
          type: 'line'
        }]
      }
      myChart.setOption(option)
    },
    initEchart3 () {
      axios.get('/geojson.json').then(res => {
        this.$nextTick(() => {
          // 1. 基于准备好的dom，初始化echarts实例
          const myChart = this.$echarts.init(document.getElementById('echarts3'))
          this.$echarts.registerMap('china', res.data)
          const option = {
            // 悬浮窗
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return `${params.name}: ${params.value || 0}`
              }
            },
            // 图例
            visualMap: {
              min: 800,
              max: 50000,
              text: ['High', 'Low'],
              realtime: false,
              calculable: true,
              inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
              }
            },
            // 要显示的散点数据
            series: [{
              type: 'map',
              map: 'china',
              // 这是要显示的数据
              data: this.seriesData,
              // 自定义命名映射，不设置的话，label默认是使用 geoJson中的name名
              nameMap: {
                北京市: '北京重命名',
                天津市: '天津重命名'
              }
            }

            ]
          }
          myChart.setOption(option)
        })
      })
    },
    changeObjectType () {
      this.initOrder()
      this.initOrderStructure()
      this.getorderpaychannel()
      this.getordermoneydistribution()
      this.getordersalestop()
      this.getordertransactiontop()
    },
    initOrder () {
      this.$api.getorderoverview({
        goodsCategory: this.objectType
      }).then(({
        data
      }) => {
        this.order = data
      })
    },
    initOrderStructure () {
      this.$api.getorderstructure({
        goodsCategory: this.objectType
      }).then(({
        data
      }) => {
        this.structureData = data
        this.structureChartData = data.map(res => {
          return {
            name: res.terminalName,
            value: res.orderProportion.substring(0, res.orderProportion.length - 1)
          }
        })
        this.initEchart()
      })
    },
    getorderpaychannel () {
      this.$api.getorderpaychannel({
        goodsCategory: this.objectType
      }).then(({
        data
      }) => {
        this.payData = data
        this.payChartData = data.map(res => {
          return {
            name: res.channelName,
            value: res.orderProportion.substring(0, res.orderProportion.length - 1)
          }
        })
        this.initEchart1()
      })
    },
    getordermoneydistribution () {
      this.$api.getordermoneydistribution({
        goodsCategory: this.objectType
      }).then(({
        data
      }) => {
        this.ordermoneyXData = []
        this.ordermoneyYData = []
        this.ordermoneyData = data
        data.map(res => {
          this.ordermoneyXData.push(res.section)
          this.ordermoneyYData.push(res.orderQuantity)
        })
        this.initEchart2()
      })
    },
    getordersalestop () {
      this.$api.getordersalestop({
        goodsCategory: this.objectType
      }).then(({
        data
      }) => {
        this.ordersaleData = data
      })
    },
    getordertransactiontop () {
      this.$api.getordertransactiontop({
        goodsCategory: this.objectType
      }).then(({
        data
      }) => {
        this.ordertransactionData = data
      })
    }
  }

}

</script>

<style lang="scss">
</style>
