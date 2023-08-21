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
          <div slot="header" style="position: relative;">
              <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @reset="resetSearch">
                  <!-- 工作地区 -->
                  <template slot="areaSearchSlot">
                      <el-cascader v-model="address" :options="options" :props="props" clearable>
                      </el-cascader>
                  </template>
                  <div class="export-btn">
                      <el-button size="small" type="primary" style="margin-bottom:10px;float:right;margin-right:20px;" @click="exportBtn">导出</el-button>
                  </div>
              </crud-search>

          </div>
          <template slot="startTimeSlot" slot-scope="scope">
              <span v-if="scope.row.startTime && scope.row.endTime">
                  {{Time(scope.row.startTime)}} —— {{Time(scope.row.endTime)}}
              </span>
              <span v-else>--</span>
          </template>
          <template slot="examPassRadioStrSlot" slot-scope="scope">
              <span v-if="scope.row.examPassRadioStr">{{ scope.row.examPassRadioStr }}</span>
              <span v-else>--</span>
          </template>
      </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import dayjs from 'dayjs'
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
      addressCode: '',
      level: ''
    }
  },
  created () {
    this.doRefresh()
    this.$api.CHECK_DATA_PERMISSION().then(res => {
      this.isDataPermission = res.data
      if (this.isDataPermission) {
        // 自定义配置
        this.$api.GET_USER_AREA().then(res => {
          if (res.data && res.data.length > 0) {
            this.options = res.data
          }
        })
      } else {
        // 全部地区选择
        this.$api.getArea().then(res => {
          if (res && res.length > 0) {
            this.options = res
          }
        })
      }
    })
  },
  methods: {
    Time (str) {
      if (str) {
        return dayjs(str).format('YYYY-MM-DD HH:mm')
      }
    },
    // 导出
    exportBtn () {
      const searchData = this.getSearch().getForm()
      this.$api.EXPORT_OF_EXAM_LIST({
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
    doLoad () { },
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.addressCode = this.addressCode
      query.level = this.level

      if (query.orgShortName >= 0) {
        query.orgId = query.orgShortName
      }
      return this.$api.TEST_STATISTICS(query)
    },
    // 详情
    checkDetail ({ row }) {
      this.$router.push({
        path: 'testt/teststudydetail',
        query: {
          examId: row.examId,
          level: this.level,
          addressCode: this.addressCode
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
  .export-btn {
    width: 100px;
    position:absolute;
    top: 0;
    right: 0;
  }
</style>
