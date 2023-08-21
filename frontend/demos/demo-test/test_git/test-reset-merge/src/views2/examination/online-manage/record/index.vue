<!--
 * @Date: 2021-02-20 15:27:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 16:23:24
 * @FilePath: \p-front-admin\src\views\examination\student\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
        <span class="page-title">{{$route.meta.title}}</span>
        <el-button size="mini" @click="doBack" style="float:right;">返回</el-button>
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @showRecord="showRecord"
    >
      <div slot="header">
        <!-- <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        /> -->
        <crud-toolbar
          v-bind="_crudToolbarProps"
          v-on="_crudToolbarListeners"
        />
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { d2CrudPlus } from 'd2-crud-plus'
import { crudOptions } from './crud'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      options: []
    }
  },
  mounted () {
  },
  methods: {
    doBack () {
      this.$router.push({
        path: '/examination/online_show',
        query: {
          examId: localStorage.getItem('examId')
        }
      })
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    showRecord ({ row }) {
      localStorage.setItem('takeExamId', row.takeExamId)
      const { href } = this.$router.resolve({
        path: '/exam_paper',
        query: {
          scene: 2
        }
      })
      window.open(href, '_blank')
    },
    pageRequest (query) {
      query.examUserId = localStorage.getItem('examUserId')
      return this.$api.getUserPartakeRecord(query)
    }
  }
}
</script>
