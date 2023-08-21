<template>
<el-container style="height:53vh">
  <el-aside width="15%" style="padding: 15px 0;">
      <el-tree :data="menu" :props="menuProps"  ref="categorytree" @node-click="getMenu" :expand-on-click-node="false" :highlight-current="true" accordion>
      </el-tree>
  </el-aside>
  <el-main>
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
            <el-radio-group v-model="paperType" size="medium" @change="typeChange">
              <el-radio-button :label="item.label" v-for="(item,i) in paperTypeDict" :key="i">{{item.value}}</el-radio-button>
            </el-radio-group>
      </div>
      </d2-crud-x>
  </el-main>
</el-container>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { isArray } from 'lodash'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      menu: [],
      menuProps: {
        label: 'catValue',
        value: 'catId',
        children: 'childCatagorys'
      },
      allCatalog: {
        label: '全部',
        value: '',
        children: []
      },
      paperTypeDict: [],
      paperType: '-1'
    }
  },
  created () {
    this.grtDict()
    this.$api.GET_Paper_TREE().then(res => {
      this.allCatalog.children = res.data
      this.menu = this.allCatalog
    })
  },
  methods: {
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.paperCatalogId = this.catId
      query.paperType = this.paperType
      return this.$api.GET_Paper_QUERY(query)
    },
    getMenu (val) {
      this.catId = val.catId
      this.doRefresh()
    },
    // 获取试卷类型字典
    // 获取开课方式字典
    grtDict () {
      this.$api.DICT_LIST({
        typeCode: 'test_paper_type'
      }).then(res => {
        const list = res.data
        if (isArray(list)) {
          this.paperTypeDict = list.map(item => {
            return {
              value: `${item.dictDataName}`,
              label: `${item.dictDataValue}`
            }
          })
        }
        this.paperType = this.paperTypeDict[0].label
      })
    },
    typeChange () {
      this.doRefresh()
    },
    // 选择按钮
    selectBtn ({ row }) {
      const flag = false
      this.$emit('closeDialog', flag)
      this.$emit('selectPaperInfo', row)
    }
  }
}
</script>
