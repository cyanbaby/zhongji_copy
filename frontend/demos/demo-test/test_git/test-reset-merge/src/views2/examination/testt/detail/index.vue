<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
      <template slot="header">
          <span class="page-title">{{$route.meta.title}}</span>
          <div class="go-back">
              <el-button plain class="exportBtn" size="small" @click="back">返回</el-button>
          </div>
      </template>
      <div class="head">
          <div class="header-container">
              <span class="header-item">
                  <span style="font-weight:bold;font-size:16px">考试名称：</span>
                  <span v-if="examName">{{ examName }}</span>
                  <span v-else>无</span>
              </span>
              <span class="header-item">
                  <span style="font-weight:bold;font-size:16px">来源：</span>
                  <span v-if="examOrigin">{{ examOrigin }}</span>
                  <span v-else>无</span>
              </span>
          </div>
      </div>
      <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @detailInfo="detailInfo" style="height:83vh">
          <div slot="header">
              <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @reset="resetSearch">
                  <template slot="provinceSearchSlot">
                      <el-cascader v-model="address" :options="options" :props="props">
                      </el-cascader>
                  </template>
              </crud-search>
              <el-button size="small" type="primary" class="exportBtns" @click="exportBtn">导出</el-button>
          </div>
          <template slot="testScoreSlot" slot-scope="scope">
              <span v-if="scope.row.testScore == null">--</span>
              <span v-else>{{ scope.row.testScore }}</span>

              <el-tag v-if="scope.row.isPass === 0" size="mini" style="margin-left: 10px;">待考试</el-tag>
              <el-tag v-if="scope.row.isPass === 1" type="success" size="mini" style="margin-left: 10px;">合格</el-tag>
              <el-tag v-if="scope.row.isPass === 2" type="warning" size="mini" style="margin-left: 10px;">不合格</el-tag>
          </template>
      </d2-crud-x>
      <el-dialog title="答题记录" :visible.sync="dialogVisible" width="30%">
          <div>
              <div>
                  <span style="font-size: 20px;font-weight:bold;color: #000">总分:</span>
                  <span style="font-weight:bold;margin:0 15px;font-size: 18px;">{{record.testScore}}</span>
                  <el-tag v-if="record.isPass == 0">未考试</el-tag>
                  <el-tag v-if="record.isPass == 1" type="success">合格</el-tag>
                  <el-tag v-if="record.isPass == 2" type="danger">不合格</el-tag>
              </div>
              <div v-for="(item,index) in record.reportSubResultExamDataVOList" :key="index">
                  <div style="padding: 15px 0">
                      <span style="font-weight: bold;margin-right:30px; font-size: 16px; color:#000">{{item.subjectName}}</span>
                      <span style="font-size: 16px;">{{item.testScore}}分</span>
                  </div>
                  <ul>
                      <li v-for="items in item.reportSubExamListDataVOList" :key="items.indexOf" style="text-decoration:underline;padding: 10px 0 10px 10px;cursor: pointer;" @click="checkExam(items)">
                          <span>第{{toChinesNum(items.indexOf)}}次&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span>{{parseTime(items.partakeTimeSubmit)}}</span>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;{{items.testScore}}分</span>
                      </li>
                  </ul>
              </div>
          </div>
      </el-dialog>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import { debounce } from 'lodash'
import util from '@/libs/util'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { formateTime, parseTime } from '@/utils/index'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      courseImg: '',
      coverImgUrl: '',
      sales: '',
      detailDialog: false,
      dialogVisible: false,
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
      record: {},
      examName: '',
      examOrigin: '',
      rowInfo: {},
      isInitAddressCode: false
    }
  },
  created () {
    const examId = this.$route.query.examId
    const addressCode = this.$route.query.addressCode
    const level = this.$route.query.level

    this.examId = examId
    this.level = level
    this.addressCode = addressCode

    function initAddress () {
      if (examId && addressCode && !this.isInitAddressCode) {
        const address = JSON.parse(localStorage.getItem('tempAddress'))
        if (addressCode !== undefined && address !== undefined) {
          this.addressCode = addressCode
          this.address = address
        }
        this.isInitAddressCode = true
      }
    }

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

    this.$api.EXAMINEE_SOURCE({ examId })
      .then(res => {
        if (res?.code === '1' && res?.data) {
          const { examName, examOrigin } = res.data
          this.examName = examName
          this.examOrigin = examOrigin
        } else {
          this.$notify({
            title: '提示',
            message: '获取考试名称、来源失败！',
            type: 'warning'
          })
        }
      })
      .catch(_err => {
        this.$notify({
          title: '提示',
          message: '获取考试名称、来源失败！',
          type: 'warning'
        })
      })
  },
  methods: {
    toChinesNum (num) { // 数字转大写
      const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      const unit = ['', '十', '百', '千', '万']
      num = parseInt(num)
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse()
        let newNum = ''
        for (var i = 0; i < strArr.length; i++) {
          newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
        }
        return newNum
      }
      const overWan = Math.floor(num / 10000)
      let noWan = num % 10000
      if (noWan.toString().length < 4) noWan = '0' + noWan
      return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
    },
    formateTime,
    parseTime,
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 返回
    back () {
      this.$router.go(-1)
    },
    // 查询
    pageRequest (query) {
      query.addressCode = this.addressCode
      query.level = this.level
      query.examId = this.examId
      return this.$api.LIST_OF_EXAMINATION_CANDIDATES(query)
    },
    // 导出按钮
    exportBtn () {
      const searchData = this.getSearch().getForm()
      this.$api.THE_EXAMINEE_EXPORT({
        examId: this.$route.query.examId,
        appId: util.cookies.get('appId'),
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
    // 答题记录
    detailInfo ({ row }) {
      this.$api.RECORD_OF_EXAMINEE_ANSWERS({
        examId: row.examId,
        examUserId: row.examUserId
      }).then(res => {
        if (res.data.isPass) {
          this.record = res.data
          this.dialogVisible = true
          this.rowInfo = row
        } else {
          this.$message({
            type: 'warning',
            message: '暂无答题记录'
          })
        }
      })
    },
    resetSearch () {
      this.address = []
      this.addressCode = undefined
      this.level = undefined
    },
    // 查看考试记录
    checkExam (items) {
      localStorage.setItem('takeExamId', items.takeExamId)
      localStorage.setItem('paperInsId', items.paperInsId)
      localStorage.setItem('studentName', this.rowInfo.studentName)
      const { href } = this.$router.resolve({
        path: '/exam_paper',
        query: {
          scene: 2
        }
      })
      window.open(href, '_blank')
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
   top:60px;
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
 .body{
   margin:0 20px 20px 20px;
 }
 .exportBtn{
   float: right;
   margin-top: -50px;
 }
 .exportBtns {
   float: right;
   margin-top: -40px;
   margin-right: 10px;
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
