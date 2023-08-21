<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
      <template slot="header">
          <span class="page-title">{{$route.meta.title}}</span>
          <div class="go-back">
              <el-button plain type="mini" class="exportBtn" @click="back">返回</el-button>
          </div>
      </template>
      <div class="head">
          <div class="header-container">
              <span class="header-item" v-if="Roster.goodsValue">课程名称：{{Roster.goodsValue}}</span>
              <span class="header-item" v-if="Roster.catValue">分类：{{Roster.catValue}}</span>
              <span class="header-item" v-if="Roster.learnHour">课时：{{Roster.learnHour}}</span>
              <el-button size="small" type="primary" class="exportBtns" @click="exportBtn">导出</el-button>
          </div>
      </div>
      <div class="body">
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @detailInfo="detailInfo" style="height:80vh">
                  <div slot="header">
                      <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @reset="resetSearch">
                          <template slot="areaSearchSlot">
                              <el-cascader v-model="address" :options="options" :props="props" clearable>
                              </el-cascader>
                          </template>
                          <template slot="gmtCreateStrSearchSlot">
                              <el-date-picker v-model="value1" type="datetimerange" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
                              </el-date-picker>
                          </template>
                      </crud-search>
                      <template>

                      </template>
                  </div>
                  <template slot="examQualificationSlot" slot-scope="scope">
                      <div v-if="scope.row.examQualification == 0">资格待发放</div>
                      <div v-if="scope.row.examQualification == 1">
                          <div v-if="scope.row.isPass == 0">待考试</div>
                          <div v-if="scope.row.isPass == 1">
                              {{scope.row.testScore}}
                              <el-button type="success" size="mini" style="padding: 7px 15px;">合格</el-button>
                          </div>
                          <div v-if="scope.row.isPass == 2">
                              {{scope.row.testScore}}
                              <el-button type="warning" size="mini" style="padding: 7px 15px;">不合格</el-button>
                          </div>
                      </div>
                  </template>
              </d2-crud-x>
          </el-tabs>
      </div>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import { debounce } from 'lodash'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { formateTime, parseTime } from '@/utils/index'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      // goodsId: '',
      value1: [],
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
      Roster: '',
      isInitAddressCode: false
    }
  },
  created () {
    const addressCode = this.$route.query.addressCode
    const level = this.$route.query.level

    this.level = level
    this.addressCode = addressCode

    function initAddress () {
      if (addressCode && !this.isInitAddressCode) {
        const address = JSON.parse(localStorage.getItem('tempAddress'))
        if (addressCode !== undefined && address !== undefined) {
          this.addressCode = addressCode
          this.address = address
        }
        this.isInitAddressCode = true
      }
    }

    this.participantRoster()
    // this.doRefresh()
    this.goodsId = this.$route.query.goodsId
    this.$api.CHECK_DATA_PERMISSION().then(res => {
      this.isDataPermission = res.data
      if (this.isDataPermission) {
        // 自定义配置
        this.$api.GET_USER_AREA().then(res => {
          if (res.data && res.data.length > 0) {
            this.options = res.data
            initAddress.call(this)
          }
        })
      } else {
        // 全部地区选择
        this.$api.getArea().then(res => {
          if (res && res.length > 0) {
            this.options = res
            initAddress.call(this)
          }
        })
      }
    })
  },
  methods: {
    // 查询课程学员名册-基础信息
    participantRoster () {
      this.$api.BASIC_INFORMATION_OF_COURSE_PARTICIPANT_ROSTER({
        goodsId: this.$route.query.goodsId
      }).then(res => {
        if (res.code == '1') {
          this.Roster = res.data
        }
      })
    },
    formateTime,
    parseTime,
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    back () { // 返回
      this.$router.push({
        path: '/statistic/course'
      })
    },
    // 查询
    pageRequest (query) {
      query.addressCode = this.addressCode
      query.level = this.level

      if (this.value1.length > 0) {
        query.buyTimeStart = this.value1[0].getTime()
        query.buyTimeEnd = this.value1[1].getTime()
      }

      query.goodsId = this.$route.query.goodsId
      // console.log(query.level)
      // if (query.graduateStatus >= -1) {
      //   query.graduateStatus = query.graduateStatus;
      // } else {
      //   query.graduateStatus = -1
      // }
      // if (query.studyFinish >= -1) {
      //   query.studyFinish = query.studyFinish
      // } else {
      //   query.studyFinish = -1
      // }
      // if (query.isPass >= -1) {
      //   query.isPass = query.isPass;
      // } else {
      //   query.isPass = -1
      // }
      // if (query.certificateStatus >= -1) {
      //   query.certificateStatus = query.certificateStatus;
      // } else {
      //   query.certificateStatus = -1
      // }
      query.idCard = query.idcard
      return this.$api.LIST_OF_COURSE_PARTCIPANTS(query)
    },
    // 导出
    exportBtn () {
      const searchData = this.getSearch().getForm()
      searchData.addressCode = this.addressCode
      searchData.level = this.level
      if (this.value1.length > 0) {
        searchData.buyTimeStart = this.value1[0].getTime()
        searchData.buyTimeEnd = this.value1[1].getTime()
      }
      searchData.goodsId = this.$route.query.goodsId
      this.$api.COURSE_STUDENT_LIST_EXPORT({
        ...searchData
      }).then(res => {
        if (res.code == '1') {
          this.$message({
            type: 'success',
            message: '创建下载任务成功，请前往任务中心进行查看!'
          })
        }
      })
    },
    handleClick () {
      console.log('haha')
    },
    // 详情
    detailInfo ({ row }) {
      this.$router.push({
        path: '/statistic/coursestudyinfo',
        query: {
          studentId: row.studentId,
          goodsId: this.$route.query.goodsId
          // coverImgUrl: this.$route.query.coverImgUrl
        }
      })
    },
    resetSearch () {
      this.address = []
      this.value1 = []
      this.addressCode = undefined
      this.level = undefined
    }

  },
  watch: {
    address (newValue, oldValue) {
      if (newValue.length > 0) {
        this.addressCode = newValue[newValue.length - 1]
        this.level = newValue.length - 1
      } else {
        this.addressCode = undefined
        this.level = undefined
      }
      setTimeout(() => {
        this.doRefresh()
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
 <style scoped>
 .header-container{
   position: relative;
   width:100%;
 }
 .go-back{
   position: absolute;
   right:10px;
   top:65px;
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
   margin: 20px 0 0 20px;
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
 /* .body{
   margin: 20px;
 } */
 .exportBtn{
   float: right;
   margin-top: -50px;
 }
 .exportBtns {
  float: right;
   margin-right:50px
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
