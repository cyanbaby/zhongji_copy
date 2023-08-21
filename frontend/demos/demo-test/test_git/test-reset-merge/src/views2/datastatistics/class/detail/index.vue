<template>
   <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
       <template slot="header">
           <span class="page-title">{{$route.meta.title}}</span>
           <div class="go-back">
               <el-button type="primary" plain size="small" class="exportBtn1" @click="back">返回</el-button>
           </div>
       </template>
       <div class="head" style="height:40px;">
           <div class="header-container">
               <span class="header-item" v-if="listInfo.length>0">班级名：{{listInfo[0].className}}</span>
               <span class="header-item" v-if="listInfo.length>0 && (listInfo[0].classToCategoryVOList&&listInfo[0].classToCategoryVOList.length>0)">分类：{{listInfo[0].classToCategoryVOList[0].catValue}}</span>
               <span class="header-item" v-if="listInfo.length>0 && (listInfo[0].classToCategoryVOList&&listInfo[0].classToCategoryVOList.length>0)">课时：{{listInfo[0].classHour}}</span>
           </div>
       </div>
       <div class="body">
           <el-tabs v-model="activeName" @tab-click="handleClick">
               <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @detailInfo="detailInfo" style="height:150vh">
                   <div slot="header">
                       <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @reset="resetSearch">
                           <template slot="areaSearchSlot">
                               <el-cascader v-model="address" :options="options" :props="props" clearable>
                               </el-cascader>
                           </template>
                       </crud-search>
                       <el-button plain class="exportBtn2" @click="exportBtn">导出</el-button>
                   </div>
                   <template slot="examQualificationSlot" slot-scope="scope">
                       <div v-if="scope.row.examQualification == 0">资格待发放</div>
                       <div v-if="scope.row.examQualification == 1">
                           <div v-if="scope.row.examResult == 0">待考试</div>
                           <div v-if="scope.row.examResult == 1">
                               {{scope.row.examScore}}
                               <el-button type="success" size="mini">合格</el-button>
                           </div>
                           <div v-if="scope.row.examResult == 2">
                               {{scope.row.examScore}}
                               <el-button type="danger" size="mini">不合格</el-button>
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
import util from '@/libs/util'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { formateTime, parseTime } from '@/utils/index'
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

    // this.doRefresh()
    this.classId = this.$route.query.classId
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
    formateTime,
    parseTime,
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    back () {
      this.$router.push('/statistic/class')
    },
    // 查询
    pageRequest (query) {
      query.addressCode = this.addressCode
      query.level = this.level

      if (query.graduateStatus >= -1) {
        query.graduateStatus = query.graduateStatus
      } else {
        query.graduateStatus = -1
      }
      if (query.studyFinish >= -1) {
        query.studyFinish = query.studyFinish
      } else {
        query.studyFinish = -1
      }
      if (query.isPass >= -1) {
        query.isPass = query.isPass
      } else {
        query.isPass = -1
      }
      if (query.certificateStatus >= -1) {
        query.certificateStatus = query.certificateStatus
      } else {
        query.certificateStatus = -1
      }
      query.classId = this.classId
      return this.$api.trainStudentName(query).then(res => {
        this.coverImgUrl = res.data.coverImgUrl
        this.className = res.data.className
        this.classHour = res.data.classHour
        this.orgFullName = res.data.orgFullName
        // this.catValue = res.data.classToCategoryVOList[res.data.classToCategoryVOList.length - 1].catValue
        // this.sales = res.data.sales
        const data = {}
        data.list = res.data.list[0].classRosterListVOList
        data.pageSize = res.data.pageSize
        data.total = res.data.total
        data.currentPage = res.data.currentPage
        this.listInfo = res.data.list
        return Promise.resolve({
          code: '1',
          data: data,
          msg: 'success'
        })
      })
    },
    // 导出按钮
    exportBtn () {
      const searchData = this.getSearch().getForm()
      searchData.addressCode = this.addressCode
      searchData.level = this.level
      searchData.classId = this.classId
      this.$api.exportTrainStudent({
        classId: this.$route.query.classId,
        appId: util.cookies.get('appId'),
        ...searchData
      }).then(res => {
        if (res.code === '1') {
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
        path: '/statistic/classstudyinfo',
        query: {
          studentId: row.studentId,
          classId: this.$route.query.classId,
          coverImgUrl: this.$route.query.coverImgUrl
        }
      })
    },
    resetSearch () {
      this.address = []
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
  right:60px;
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
.exportBtn1{
  float: right;
  margin-top: -50px;
}
.exportBtn2{
  float: right;
  margin-top: -70px;
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
