<template>
<el-container style="height:53vh">
    <d2-crud-x
    ref="d2Crud"
    v-bind="_crudProps"
    v-on="_crudListeners"
    style="width:100%"
    @selectBtn="selectBtn"
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
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.certType = 1
      return this.$api.QUERRY_ALLCERT(query)
    },
    // 选择按钮
    selectBtn ({ row }) {
      const flag = false
      this.$emit('closeDialog', flag)
      this.$emit('tableDate', row)
    }
  }
}
</script>
