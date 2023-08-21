<!--
 * @Author: your name
 * @Date: 2021-04-08 14:59:52
 * @LastEditTime: 2021-06-19 13:44:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \p-front-admin\src\views\join\temp\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">任务中心</span>
      <!-- <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper> -->
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @toForm="toForm"
      @toDetail="toDetail"
    >
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import util from '@/libs/util'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {

    }
  },
  methods: {
    // 下载任务
    toForm ({ row }) {
      if (row.downUrl) {
        window.location = row.downUrl
      } else {
        this.$notify({
          title: '提示',
          message: '暂未下载完成或下载失败，请稍后再试',
          type: 'warning'
        })
      }
    },
    // 详情
    toDetail ({ row }) {
      this.$router.push({
        path: '/join/task-info',
        query: {
          id: row.taskId
        }
      })
    },

    getCrudOptions () {
      return crudOptions(this)
    },

    pageRequest (query) {
      query.appId = util.cookies.get('appId')
      return this.$api.GET_TASK(query)
    },

    addRequest (row) {
      return this.$api.TEMP_ADD(row)
    },
    updateRequest (row) {
      return this.$api.TEMP_UPDATE(row)
    },

    delRequest (row) {
      return this.$api.TEMP_DEL({ templateId: row.templateId })
    }
  }
}
</script>
