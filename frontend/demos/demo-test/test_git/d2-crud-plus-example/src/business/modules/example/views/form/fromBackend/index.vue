<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      异步后台获取crud配置
      <span style="color: gray; font-size: 12px"
        >【主要看index.vue中getCrudOptions方法即可】</span
      >
    </template>
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners">
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
        <el-button size="small" type="primary" @click="addRow"
          ><i class="el-icon-plus" /> 新增</el-button
        >
        <crud-toolbar
          :search.sync="crud.searchOptions.show"
          :compact.sync="crud.pageOptions.compact"
          :columns="crud.columns"
          @refresh="doRefresh()"
          @columns-filter-changed="handleColumnsFilterChanged"
        />
      </div>
      <template slot="actionSlot" slot-scope="scope">
        <ATableActionBar
          :list="scope.row.tableActionButtons"
          @trigger="(btn) => handleClickAction(scope.row, btn)"
          :placement="'bottom-end'"
        />
      </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { AddObj, GetList, UpdateObj, DelObj, GetCrud } from './api'
import { d2CrudPlus } from 'd2-crud-plus'
// import { ATableActionBar } from '@jjy-npm/admin-ui'

export default {
  name: 'formView',
  mixins: [d2CrudPlus.crud],
  components: {
    // ATableActionBar
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    async getCrudOptions() {
      const ret = await GetCrud() // 异步从后台获取crud
      // 警告： eval有安全风险，此处为了演示支持配置方法。
      // 如无必要，请不要用eval，如果crud配置中并不需要配置方法的话，直接 return JSON.parse(ret.data) 即可
      // eslint-disable-next-line no-eval
      const getCrudOptions = eval(ret.data)
      return getCrudOptions(this)
    },
    pageRequest(query) {
      return GetList(query)
        .then((response) => {
          console.log(response)
          response.data.records.forEach((row) => {
            row.tableActionButtons = [
              {
                name: '详情',
                event: 'showDetail',
                show: true
              },
              {
                name: '更改组织',
                event: 'changeOrganization',
                show: true
              },
              {
                name: '后台开通',
                event: 'backstageOpen',
                show: true
              }
            ]
          })
          return response // 记得返回response，这样后面的处理函数还可以继续使用它
        })
        .catch((error) => {
          // 这里是响应失败后的处理函数
          console.error(error)
          throw error // 记得抛出错误，这样后面的处理函数可以处理这个错误
        })
    },
    addRequest(row) {
      return AddObj(row)
    },
    updateRequest(row) {
      return UpdateObj(row)
    },
    delRequest(row) {
      return DelObj(row.id)
    }
  }
}
</script>
