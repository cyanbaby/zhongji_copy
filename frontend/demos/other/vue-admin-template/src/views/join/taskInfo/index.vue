<!--
 * @Author: your name
 * @Date: 2021-04-08 14:59:52
 * @LastEditTime: 2021-07-21 16:21:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \p-front-admin\src\views\join\temp\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">任务详情</span>
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
    >
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {

    }
  },
  methods: {

    getCrudOptions () {
      return crudOptions(this)
    },

    pageRequest (query) {
      query.taskId = this.$route.query.id
      return this.$api.GET_TASK_INFO(query)
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
