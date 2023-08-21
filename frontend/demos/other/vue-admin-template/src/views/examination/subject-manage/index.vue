<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\subject-manage\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <TreeContent
      :list="menu"
      :isChoose="isChoose"
      :parentList="parentList"
      dictTypeCode="file"
      fileType=""
      @refresh="refresh"
      @refreshTree="queryMenu"
    >
      <d2-crud-x
        ref="d2Crud"
        :pagination="pagination"
        @pagination-size-change="paginationSizeChange"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @toedit="toedit"
      >
        <div slot="header">
          <crud-search
            ref="search"
            :options="crud.searchOptions"
            @submit="handleSearch"
          />
          <el-button type="primary" @click="toadd" v-if="!isChoose"
            >新增试题</el-button
          >

          <el-button
            @click="batchImport"
            style="margin-right: 10px"
            v-if="!isChoose"
            >批量导入</el-button
          >
          <div style="margin-top: 15px">
            <el-radio-group v-model="tabPosition" @change="typesQuery">
              <el-radio-button
                v-for="(item, index) in dynamicTags"
                :key="index"
                :label="item.dictDataValue"
              >
                {{ item.dictDataName }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <template slot="subjectContentSlot" slot-scope="scope">
          <div v-html="scope.row.subjectContent"></div>
        </template>
        <template slot="subjectLevelSlot" slot-scope="scope">
          {{
            dynamicTags1.filter(
              (res) => res.dictDataValue == scope.row.subjectLevel
            )[0].dictDataName
          }}
        </template>
        <template slot="subjectTypeSlot" slot-scope="scope">
          {{
            dynamicTags.filter(
              (res) => res.dictDataValue == scope.row.subjectType
            )[0].dictDataName
          }}
        </template>
      </d2-crud-x>
    </TreeContent>
    <div style="margin-bottom: 20px; text-align: right" v-if="isChoose">
      <el-button type="primary" @click="doChoose">确定</el-button>
      <el-button @click="doClose" style="margin-right: 10px">取消</el-button>
    </div>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import TreeContent from './components/TreeContent.vue'

export default {
  name: 'Subject',
  components: {
    TreeContent
  },
  props: ['isChoose'],
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      tabPosition: -1,
      subjectContent: '',
      subjectCatalogId: '',
      subjectType: -1,
      data: [],
      parentList: [],
      menu: [],
      dynamicTags: '',
      dynamicTags1: '',
      pagination: {
        layout: 'sizes,total,prev, pager, next, jumper',
        pageSizes: [10, 20, 30, 40, 50, 100],
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.queryMenu()
    this.getType()
  },
  methods: {
    paginationSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
    },
    getType () {
      this.$api
        .DICT_LIST({
          typeCode: 'test_subject_type'
        })
        .then(({ data }) => {
          this.dynamicTags = data
        })
      this.$api
        .DICT_LIST({
          typeCode: 'test_subject_level'
        })
        .then(({ data }) => {
          this.dynamicTags1 = data
        })
    },
    sortType (arr, prop, desc) {
      var props = []
      var ret = []
      var results = []
      var i = 0
      var len = arr.length
      if (typeof prop == 'string') {
        for (; i < len; i++) {
          var oI = arr[i];
          (props[i] = new String((oI && oI[prop]) || ''))._obj = oI
        }
      } else if (typeof prop == 'function') {
        for (; i < len; i++) {
          var oI = arr[i];
          (props[i] = new String((oI && prop(oI)) || ''))._obj = oI
        }
      } else {
        throw '参数类型错误'
      }
      props.sort()
      for (i = 0; i < len; i++) {
        ret[i] = props[i]._obj
        if (
          props[i]._obj.treeChild &&
          typeof props[i]._obj.treeChild === 'object'
        ) {
          ret[i].treeChild = this.sortType(
            props[i]._obj.treeChild,
            'orderNum',
            true
          )[0]
        }
      }
      if (desc) ret.reverse()
      results.push(ret)
      return results
    },
    typesQuery () {
      this.handleSearch()
    },
    doClose () {
      this.$emit('doClose')
    },
    toadd () {
      this.$router.push({
        path: 'subject_add'
      })
    },
    refresh (val, catValue) {
      this.subjectCatalogId = val
      this.handleSearch({ subjectCatalogId: val })
    },
    toedit ({ row }) {
      this.$router.push({
        path: 'subject_edit',
        query: {
          id: row.subjectId
        }
      })
    },
    batchImport () {
      this.$router.push({
        path: 'batch_import'
      })
    },

    // 删除
    delRequest (row) {
      return this.$api.DEL_Subject({
        subjectId: row.subjectId
      })
    },
    getTwo (obj) {
      obj = obj.map((item) => {
        let treeChild
        if (item.treeChild) {
          treeChild = item.treeChild.map((every) => {
            if (item.treeChild[0].level < 3) {
              return {
                testSubjectCatId: every.testSubjectCatId,
                platformId: every.platformId,
                orgId: every.orgId,
                catValue: every.catValue,
                parentCatId: every.parentCatId,
                level: every.level,
                orderNum: every.orderNum
              }
            }
          })
        }
        return {
          ...item,
          treeChild: treeChild
        }
      })
      return obj
    },
    doChoose () {
      this.$emit('chooseData', this.multipleSelection)
    },
    doCancel () {
      this.$router.push({
        path: 'paper_edit'
      })
    },
    putFirst (arr) {
      let obj
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].catValue === '默认分类') {
          obj = arr[i]
          arr.splice(i, 1)

          break
        }
      }
      arr.unshift(obj)
      return arr
    },
    // 查询试题分类
    queryMenu () {
      this.$api.GET_Subject_TREE().then((res) => {
        localStorage.setItem('subjectTree', JSON.stringify(res.data))
        this.menu = this.putFirst(this.sortType(res.data, 'orderNum', true)[0])
        const defaultData = [
          {
            testSubjectCatId: '-1',
            catValue: '顶级分类',
            parentCatId: '-1'
          }
        ]
        this.parentList = defaultData.concat(
          this.getTwo(this.menu).filter((res) => res.catValue != '默认分类')
        )
      })
    },

    pageRequest (query) {
      query.pageSize = this.pagination.pageSize
      this.subjectContent = query.subjectContent
      query.subjectContent = this.subjectContent
      query.subjectType = this.tabPosition
      query.subjectCatalogId = this.subjectCatalogId

      const res = this.$api.GET_Subject_QUERY(query).then(data => {
        this.pagination.total = data.data.total
        if (data.data.total > 100) {
          this.pagination.pageSizes = [10, 20, 30, 40, 50, 100, data.data.total]
        }
        return data
      })
      return res
    },
    getCrudOptions () {
      return crudOptions(this.isChoose)
    }
  }
}
</script>
<style lang="scss" scoped>
.fixed-video {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);

  ::v-deep.el-tabs__item {
    font-size: 14px;
    color: #353535;
    line-height: 48px;
  }

  .video-player-box {
    position: absolute;
    width: 600px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -150px;
    background: #000;
  }

  .close-icon {
    position: absolute;
    font-size: 28px;
    color: #fff;
    right: 100px;
    top: 100px;
  }
}
.video-card {
  display: flex;
  .video-play {
    background: #000;
    width: 80px;
    height: 50px;
    border-radius: 2px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .video-r {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .video-name {
    width: 130px;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 3px;
  }
  .video-count {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }
}
.menu-content {
  background: #fff;
  ::v-deep .el-menu {
    border-right: none;
  }
  .menu-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
}
</style>
