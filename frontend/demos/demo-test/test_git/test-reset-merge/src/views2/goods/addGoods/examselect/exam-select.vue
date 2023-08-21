<template>
  <el-container style="height:60vh">
    <d2-crud-x
    ref="d2Crud"
    v-bind="_crudProps"
    v-on="_crudListeners"
    @choseBtn="choseBtn"
    style="width:100%"
    >
      <div slot="header">
          <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
          />
      </div>
    </d2-crud-x>
  </el-container>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud],
  methods: {
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return this.$api.GET_SIMPLE_EXAM_LIST(query)
    },
    choseBtn ({ row }) {
      const examInfo = {}
      examInfo.examId = row.examId
      examInfo.examName = row.examName
      this.$emit('getExamInfo', examInfo)
    }
  }
}
</script>
