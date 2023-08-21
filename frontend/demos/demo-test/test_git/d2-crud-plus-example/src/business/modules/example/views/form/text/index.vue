<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <div>
      <span>bar: {{ bar }} </span>
      <d2-highlight :code="codeJavascript" />
    </div>

    <template slot="header">文本
    </template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formText',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      bar: 'foo',
      codeJavascript: `
      TDDO: 搜索栏和Dialog表单中的控件都是文本
      表格
        操作列: 默认有, 且默认有  查看，编辑，删除
      搜索栏
        新增: 通过 el-button 和 addRow 事件触发
        重置: 默认有, 点击执行 pageRequest, TODO 有无其他事件?
        查询: 默认有, 点击执行 pageRequest, TODO 有无其他事件?  input框输入之后回车执行 pageRequest
      事件:
        默认执行顺序: getCrudOptions, pageRequest
      表格工具:
        <crud-toolbar> 控制
        刷新列表按钮 执行一个 底层方法刷新 doRefresh
      `,
      show: true
    }
  },
  methods: {
    getCrudOptions () {
      this.$message({
        message: 'getCrudOptions',
        type: 'success'
      });
      return crudOptions(this) // crud.js 获取 this
    },
    pageRequest (query) {
      this.$message({
        message: 'pageRequest',
        type: 'success'
      });
      return GetList(query)
    },
    addRequest (row) {
      this.$message({
        message: 'addRequest',
        type: 'success'
      });
      return AddObj(row)
    },
    updateRequest (row) {
      this.$message({
        message: 'updateRequest',
        type: 'success'
      });
      return UpdateObj(row)
    },
    delRequest (row) {
      this.$message({
        message: 'delRequest',
        type: 'success'
      });
      return DelObj(row.id)
    }
  }
}
</script>
