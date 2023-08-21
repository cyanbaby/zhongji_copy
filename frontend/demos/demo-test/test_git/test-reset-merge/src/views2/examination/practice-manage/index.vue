<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\paper-manage\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <TreeContent
      :list="menu"
      :parentList = "parentList"
      dictTypeCode="file"
      fileType=""
      @refresh="refresh"
      @refreshTree="queryMenu"
    >
      <d2-crud-x
        style="height: 75vh"
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @topublish="topublish"
        @markPaper="markPaper"
        @toedit="toedit"
      >
        <div slot="header">
          <crud-search
            ref="search"
            :options="crud.searchOptions"
            @submit="handleSearch"
          />
          <el-button type="primary" @click="toadd">新增练习</el-button>
        </div>
        <template slot="paperNumSlot" slot-scope="scope">
          <div v-if="scope.row.isGenerate == 1">{{scope.row.usedQuantity}}/{{scope.row.generateQuantity}}</div>
          <div v-else>{{scope.row.generateQuantity}}</div>
        </template>
        <template slot="paperNameSlot" slot-scope="scope">
          <div v-html="scope.row.paperName"></div>
        </template>
      </d2-crud-x>
    </TreeContent>

    <el-dialog
      title="生成练习"
      :visible.sync="dialog"
      width="300px"
      append-to-body
      >
      <div>
        已生成份数：{{generateQuantity}}份
      </div>
      <div style="margin-top: 20px">
        预生成份数：
        <el-input-number
          size="mini"
          :step="1"
          v-model="copyNum"
          :min="0"
          step-strictly
        ></el-input-number>
      </div>

      <span slot="footer">
        <el-button type="primary" size="mini" @click="doCreatePaper">确定生成</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import TreeContent from './components/TreeContent.vue'

export default {
  components: {
    TreeContent
  },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      copyNum: 0,
      dialog: false,
      tabPosition: -1,
      paperName: '',
      testPaperId: '',
      paperCatalogId: '',
      generateQuantity: 0,
      data: [],
      parentList: [],
      menu: []
    }
  },
  created () {
    this.queryMenu()
    this.getType()
  },
  methods: {
    markPaper (row) {
      this.testPaperId = row.row.paperId
      this.generateQuantity = row.row.generateQuantity
      this.dialog = true
    },
    doCreatePaper () {
      this.$api.generatePaper({
        testPaperId: this.testPaperId,
        generateAmount: this.copyNum
      }).then(({ data }) => {
        this.$message.success('生成成功！')
        this.dialog = false
      })
    },
    topublish ({ row }) {
      this.$api.publishPaper({
        paperId: row.paperId,
        publishStatus: row.publishStatusCode == 1 ? 2 : 1
      }).then((res) => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.handleSearch()
      })
    },
    sortType (arr, prop, desc) {
      var props = []
      var ret = []; var results = []
      var i = 0
      var len = arr.length
      if (typeof prop == 'string') {
        for (; i < len; i++) {
          var oI = arr[i];
          (props[i] = new String(oI && oI[prop] || ''))._obj = oI
        }
      } else if (typeof prop == 'function') {
        for (; i < len; i++) {
          var oI = arr[i];
          (props[i] = new String(oI && prop(oI) || ''))._obj = oI
        }
      } else {
        throw '参数类型错误'
      }
      props.sort()
      for (i = 0; i < len; i++) {
        ret[i] = props[i]._obj
        if (props[i]._obj.treeChild && typeof props[i]._obj.treeChild === 'object') {
          ret[i].treeChild = this.sortType(props[i]._obj.treeChild, 'orderNum', true)[0]
        }
      }
      if (desc) ret.reverse()
      results.push(ret)
      return results
    },
    typesQuery () {
      this.handleSearch()
    },
    toadd () {
      this.$router.push({
        path: 'practice_edit'
      })
    },
    refresh (val) {
      this.paperCatalogId = val
      this.handleSearch({ paperCatalogId: val })
    },
    toedit ({ row }) {
      this.$router.push({
        path: 'practice_edit',
        query: {
          id: row.paperId
        }
      })
    },

    // 删除
    delRequest (row) {
      return this.$api.DEL_Paper({
        paperId: row.paperId
      })
    },
    getTwo (obj) {
      obj = obj.map(item => {
        let treeChild
        if (item.treeChild) {
          treeChild = item.treeChild.map(every => {
            if (item.treeChild[0].level < 3) {
              return {
                testPaperCatId: every.testPaperCatId,
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
    queryMenu () {
      this.$api
        .GET_Paper_TREE()
        .then((res) => {
          localStorage.setItem('paperTree', JSON.stringify(res.data))
          this.menu = this.sortType(res.data, 'orderNum', true)[0]
          const defaultData = [{
            testPaperCatId: '-1',
            catValue: '顶级分类',
            parentCatId: -1
          }]
          this.parentList = defaultData.concat(this.getTwo(this.menu))
        })
    },

    pageRequest (query) {
      this.paperName = query.paperName || this.paperName
      query.paperName = this.paperName
      query.paperCatalogId = this.paperCatalogId
      return this.$api.pageListOrgExercisesList(query)
    },
    getCrudOptions () {
      return crudOptions(this)
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
  height: 75vh;
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
