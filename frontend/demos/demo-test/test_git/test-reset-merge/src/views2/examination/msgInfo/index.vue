<!--
 * @Date: 2021-02-20 15:27:19
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-05-26 22:28:11
 * @FilePath: \o-front-admin\src\views\examination\msgInfo\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">批次详情</span>
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
      <div slot="header">
        <crud-toolbar
          v-bind="_crudToolbarProps"
          v-on="_crudToolbarListeners"
        />
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList } from './api'
export default {
  mixins: [d2CrudPlus.crud],
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      query.batchId = this.$route.query.batchId
      return GetList(query)
    }
  }
}
</script>
