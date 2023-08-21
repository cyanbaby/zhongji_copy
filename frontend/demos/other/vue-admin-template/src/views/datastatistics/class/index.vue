<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
      <template slot="header">
          <span class="page-title">{{$route.meta.title}}</span>
          <d2-helper title="帮助文档">
              <div>
                  <d2-link-btn title="文档链接" link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html" />
              </div>
          </d2-helper>
      </template>
      <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @checkDetail="checkDetail">
          <div slot="header">
              <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @reset="resetSearch">
                  <template slot="orgIdSearchSlot" slot-scope="scope">
                      <el-select v-model="scope.form.orgId" filterable clearable>
                          <el-option v-for="item in orgNameSelect" :key="item.orgId" :label="item.orgFullName" :value="item.orgId">
                          </el-option>
                      </el-select>
                  </template>
                  <template slot="areaSearchSlot">
                      <el-cascader v-model="address" :options="options" :props="props" clearable>
                      </el-cascader>
                  </template>
                  <template slot="yearsSearchSlot" slot-scope="scope">
                      <el-date-picker v-model="scope.form.years" type="year" placeholder="选择年" value-format="yyyy">
                      </el-date-picker>
                  </template>
              </crud-search>
              <div class="export-btn">
                  <el-button size="small" style="margin-bottom:10px;float:right;margin-right:20px;" @click="exportBtn">导出</el-button>
              </div>
              <!-- <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" /> -->
          </div>
      </d2-crud-x>
  </d2-container>
</template>

<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      orgNameSelect: [],
      address: [],
      options: [],
      props: {
        value: 'areaCode',
        label: 'name',
        checkStrictly: true
      },
      years: '',
      isDataPermission: '',
      addressCode: undefined,
      level: undefined
    }
  },
  created () {
    // 所属组织
    this.$api.QUERY_PLAT_ORG_LIST().then(res => {
      if (res.code === '1') {
        this.orgNameSelect = res.data
        console.log('0000000000', this.orgNameSelect[0].orgId)
      }
    })
    this.doRefresh()
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
  methods: {
    // 导出
    exportBtn () {
      const searchData = this.getSearch().getForm()
      searchData.pageNum = 1
      searchData.pageSize = 20
      searchData.years = 0
      console.log(searchData)
      this.$api.exportTrain({
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
    doLoad () {},
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.addressCode = this.addressCode
      query.level = this.level

      if (query.years >= 0) {
        query.years = Number(query.years)
      } else {
        query.years = 0
      }
      if (query.orgId >= 0) {
        query.orgId = query.orgId
      } else {
        // query.orgId = '';
      }
      // query.years = this.years;
      return this.$api.trainList(query)
    },
    // 详情
    checkDetail ({ row }) {
      this.$router.push({
        path: '/statistic/classstudydetail',
        query: {
          classId: row.classId,
          addressCode: this.addressCode,
          level: this.level
          // coverImgUrl: row.coverImgUrl,
        }
      })
      localStorage.setItem('tempAddress', JSON.stringify(this.address))
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
<style scoped>
  .export-btn{
    height: 50px;
    position:absolute;
    right:0px;
    top:10px;
  }
</style>
