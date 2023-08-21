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
                  <!-- 所属组织 -->
                  <!-- <template slot="orgIdSearchSlot"
                    slot-scope="scope">
                      <el-select v-model="scope.form.orgId"
                                filterable
                                clearable>
                        <el-option v-for="item in orgNameSelect"
                                  :key="item.orgId"
                                  :label="item.orgFullName"
                                  :value="item.orgId">
                        </el-option>
                      </el-select>
                    </template> -->
                  <!-- 学员地区 -->
                  <template slot="areaSearchSlot">
                      <el-cascader v-model="address" :options="options" :props="props" clearable>
                      </el-cascader>
                  </template>
                  <!-- 年度 -->
                  <template slot="yearsSearchSlot" slot-scope="scope">
                      <el-date-picker v-model="scope.form.years" type="year" placeholder="选择年" value-format="yyyy">
                      </el-date-picker>
                  </template>
              </crud-search>
              <div class="export-btn">
                  <el-button size="small" type="primary" style="float:right;margin-right:20px;" @click="exportBtn">导出</el-button>
              </div>
          </div>
      </d2-crud-x>
  </d2-container>
</template>

<script>
import { omitBy, cloneDeep } from 'lodash'
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
      isDataPermission: ''
    }
  },
  created () {
    // 所属组织
    // this.$api.QUERY_PLAT_ORG_LIST().then(res => { // QUERY_PLAT_ORG_LIST: 根据组织机构id获取组织信息
    //   if (res.code === '1') {
    //     this.orgNameSelect = res.data
    //   }
    // })

    this.$api.CHECK_DATA_PERMISSION().then(res => { // CHECK_DATA_PERMISSION: 检查是否开启数据权限
      this.isDataPermission = res.data
      if (this.isDataPermission) {
        // 自定义配置
        this.$api.GET_USER_AREA().then(res => { // GET_USER_AREA: 获取省市区信息
          if (res.data && res.data.length > 0) {
            this.options = res.data
          }
        })
      } else {
        // 全部地区选择
        this.$api.getArea().then(res => { // getArea: 查询中国行政地区表
          if (res && res.length > 0) {
            this.options = res
          }
        })
      }
    })
  },
  mounted () {
    // this.getSearch().getForm()
  },
  methods: {
    /**
     * 获取search组件ref
     * @returns {*}
     */
    getSearch () {
      return this.$refs[this.crud.format.ref.search]
    },
    // 导出
    exportBtn () {
      const searchData = this.getSearch().getForm()
      this.$api.COURSE_STATISTICS_DERIVE({
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
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.addressCode = this.addressCode
      query.level = this.level

      const form = cloneDeep(this.getSearch().getForm())
      const param = omitBy(form, (item) => item === undefined || item === null)
      Object.assign(query, param)

      return this.$api.COURSE_STATISTICS(query)
    },
    // 查看详情
    checkDetail ({ row }) {
      this.$router.push({
        path: '/statistic/coursestudydetail',
        query: {
          goodsId: row.goodsId,
          addressCode: this.addressCode,
          level: this.level
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
       width: 100px;
    position:absolute;
    top: 0;
    right: 0;
    }
  </style>
