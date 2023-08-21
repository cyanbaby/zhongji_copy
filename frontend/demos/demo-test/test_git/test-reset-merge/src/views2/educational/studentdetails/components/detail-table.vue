<template>
  <el-container style="height:55vh;">
    <d2-crud-x
    ref="d2Crud"
    v-bind="_crudProps"
    v-on="_crudListeners"
    style="width:100%"
    v-loading="detailLoading"
    @complete="complete"
    >
    <!-- <div slot="header">
    <crud-search
      ref="search"
      :options="crud.searchOptions"
      @submit="handleSearch"
    >
    <template slot="wareNameSearchSlot" slot-scope="scope">
      <el-radio-group v-model="wareName" style="margin-top: 10px;">
        <el-radio-button :label="item" v-for="(item,i) in wareNameList" :key="i"></el-radio-button>
      </el-radio-group>
    </template>
    </crud-search>
    </div> -->
    <el-radio-group v-model="wareName" style="margin-top: 10px;" slot="header" @change="change" size="mini">
      <el-radio-button :label="item.stId" v-for="(item,i) in fullList" :key="i">{{item.wareName}}</el-radio-button>
    </el-radio-group>
     <template slot="learningProgressSlot" slot-scope="scope">
        <span>{{Number((scope.row.learningProgress*100).toFixed(2))}}%</span>
    </template>
    <template slot="studyTimeSecondSlot" slot-scope="scope">
        <span>{{formateTime(scope.row.studyTimeSecond)}}</span>
    </template>
    <template slot="studyEffectiveTimeSecondSlot" slot-scope="scope">
        <span>{{formateTime(scope.row.studyEffectiveTimeSecond)}}</span>
    </template>
    </d2-crud-x>
  </el-container>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { findItemInArrayByProperty } from '@/utils/array-utils'
import { formateTime } from '@/utils/index'
export default {
  mixins: [d2CrudPlus.crud],
  props: {
    sscId: {
      type: String,
      default: ''
    },
    goodsId: {
      type: String,
      default: ''
    },
    studentId: {
      type: String,
      default: ''
    }
  },
  mounted () {
    if (this.goodsId && this.studentId) {
      this.fetchDataByGoodsIdAndStuId(this.goodsId, this.studentId)
    } else {
      this.fetchData()
    }
  },
  data () {
    return {
      fullList: [],
      wareNameList: [],
      wareName: '',
      tableList: [],
      chapterList: [],
      detailLoading: true,
      sscIdCarry: ''
    }
  },
  created () {
  },
  methods: {
    formateTime,
    doLoad () {
    },
    fetchData (sscId) {
      this.detailLoading = true
      if (sscId) {
        this.sscIdCarry = sscId
      } else {
        this.sscIdCarry = this.sscId
      }
      const _this = this
      this.$api.QUERY_STUDY_CONTENT_CHAPTER({
        sscId: this.sscIdCarry
      }).then(res => {
        _this.fullList = res.data
        if (_this.fullList[0]) {
          this.wareName = _this.fullList[0].stId
          this.change(_this.fullList[0].stId)
        }
        this.detailLoading = false
      })
    },
    fetchDataByGoodsIdAndStuId (goodsId, studentId) {
      this.detailLoading = true
      const _this = this
      this.$api.QUERY_STUDY_CONTENT_CHAPTER_BY_STUID_GOODSID({
        goodsId: goodsId,
        studentId: studentId
      }).then(res => {
        _this.fullList = res.data
        if (_this.fullList[0]) {
          this.wareName = _this.fullList[0].stId
          this.change(_this.fullList[0].stId)
        }
        this.detailLoading = false
      })
    },
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    change (val) {
      const needList = findItemInArrayByProperty(this.fullList, val, 'stId')
      this.chapterList = needList.chapterList
      this.doRefresh()
    },
    // 查询
    pageRequest (query) {
      return Promise.resolve({
        code: '1',
        data: {
          currentPage: this.handleCurrentChange(),
          list: this.chapterList,
          pageSize: 5,
          total: this.chapterList.length
        },
        msg: 'success'
      })
    },
    handleCurrentChange () {
      return 2
    },
    complete () {
      this.$api.COMPLETE_STUDY_PROGRESS({
        stId: this.wareName,
        studentId: this.studentId
      }).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
</script>
