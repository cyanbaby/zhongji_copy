<!--
 * @Author: 姚文彬
 * @Date: 2021-06-16 14:21:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-02 11:27:30
 * @FilePath: \o-front-admin\src\views\article\list\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot='header'>
        <span class='page-title'>{{this.$route.meta.title}}</span>
        <d2-helper title='帮助文档'>
            <div>
                <d2-link-btn
                title='文档链接'
                link='http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html'
                />
            </div>
        </d2-helper>
    </template>
    <div style="padding:20px;height:100%;">
      <el-row :gutter="24" style="height:100%;">
        <el-col :span="4" :offset="0">
          <div class="menu-content">
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
          </div>
        </el-col>
        <el-col :span="19" :offset="0" style="height:100%;">
          <div class="list_right" style="height:100%;">
            <d2-crud-x
              ref="d2Crud"
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
                <el-button
                  size="small"
                  type="primary"
                  @click="addRow"
                >
                  <i class="el-icon-plus" /> 新增
                </el-button>
                <crud-toolbar
                  v-bind="_crudToolbarProps"
                  v-on="_crudToolbarListeners"
                />
                  <div style="margin-top:15px">
                    <el-radio-group
                        v-model="tabPosition"
                        @change="statusQuery"
                    >
                        <el-radio-button
                        v-for="(item, index) in status"
                        :key="index"
                        :label="item.value"
                        >
                        {{ item.label }}
                        </el-radio-button>
                    </el-radio-group>
                  </div>
              </div>
            </d2-crud-x>
          </div>
        </el-col>
      </el-row>

    </div>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      list: [],
      props: {
        label: 'columnName',
        value: 'columnId',
        children: 'childrenColumnList'
      },
      columnId: '',
      status: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '未发布'
        },
        {
          value: '2',
          label: '已发布'
        }
      ],
      tabPosition: ''
    }
  },
  created () {
    this.getColumn()
  },
  methods: {
    // 状态查询
    statusQuery (val) {
      this.handleSearch({ contentStatus: val })
    },
    getColumn () {
      this.$api.COLUMN_LIST({
        opDomainCode: ''
      }).then(({ data }) => {
        this.list = data
      })
    },
    addRow () {
      this.$router.push({
        path: 'list_create'
      })
    },
    toedit ({ row }) {
      this.$router.push({
        path: 'list_edit',
        query: {
          id: row.contentId
        }
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
      return this.$api.CONTENT_LIST(query)
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    // 删除
    delRequest (query) {
      return this.$api.DEL_CONTENT(query)
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
