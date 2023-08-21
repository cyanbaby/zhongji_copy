<template>
  <el-container style="height:69vh">
    <el-aside width="15%" style="padding: 15px 0;">
      <el-tree
        :data="list"
        node-key="columnId"
        default-expand-all
        :props="props"
        :expand-on-click-node="false"
        @node-click="clickNode"
      >
        <span class="custom-tree-node onlyThree" slot-scope="{ node }">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </el-aside>
    <el-main style="margin:0px;padding:0;margin-left:10px;">
      <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
      >
        <div slot="header">
          <crud-search
            ref="search"
            :options="crud.searchOptions"
            @submit="handleSearch"
          />
        </div>
        <template slot='contentIdSlot' slot-scope='scope'>
          <el-checkbox
          v-model="goodsInfo"
          :label="scope.row.contentId"
          :disabled="disable(scope.row.contentId)"
          @change="change"
          >
          <br>
          </el-checkbox>
        </template>
      </d2-crud-x>
    </el-main>
  </el-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { findItemInArrayByProperty } from '@/utils/array-utils'
export default {
  mixins: [d2CrudPlus.crud],
  props: {
    choseDataCount: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    choseDataCount: {
      handler (val) {
        this.choseDataId = []
        val.forEach(res => { this.choseDataId.push(res.goodsId) })
        this.goodsInfo = this.choseDataId
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      goodsInfo: [],
      checked: false,
      choseData: this.choseDataCount,
      choseDataId: [],
      selectedList: [],
      list: [],
      props: {
        label: 'columnName',
        value: 'columnId',
        children: 'childrenColumnList'
      },
      columnId: ''
    }
  },
  created () {
    this.getColumn()
  },
  methods: {
    getColumn () {
      this.$api.COLUMN_LIST({
        opDomainCode: ''
      }).then(({ data }) => {
        this.list = data
      })
    },
    clickNode (data) {
      this.columnId = data.columnId
      this.doRefresh()
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    pageRequest (query) {
      query.columnId = this.columnId
      query.contentStatus = 2
      return this.$api.CONTENT_LIST(query)
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    disable (contentId) {
      if (this.choseDataId.includes(contentId)) {
        return true
      } else {
        return false
      }
    },
    change (val) {
      this.refreshSelected()
    },
    refreshSelected () {
      const currentList = this.getD2CrudTableData()
      this.goodsInfo.forEach(res => {
        const item = findItemInArrayByProperty(this.selectedList, res, 'contentId')
        if (!item) {
          const found = findItemInArrayByProperty(currentList, res, 'contentId')
          if (found) { this.selectedList.push(found) }
        }
      })
      for (let idx = this.selectedList.length - 1; idx >= 0; idx--) {
        const selected = this.selectedList[idx]
        const fIdx = this.goodsInfo.indexOf(selected.contentId)
        if (fIdx < 0) {
          this.selectedList.splice(idx, 1)
        }
      }
    },
    getSelectedList () {
      return this.selectedList
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 15px;
}
.menu-content {
  height: 60vh;
  overflow: scroll;
  overflow-x:auto;
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
.onlyThree{
  overflow:hidden;
  text-overflow:ellipsis;//显示为省略号
  white-space:nowrap;//不换行
  text-align: left;
  padding-bottom: 2%;
  span{
    overflow:hidden;
    text-overflow:ellipsis;//显示为省略号
    white-space:nowrap;
  }
}
</style>
