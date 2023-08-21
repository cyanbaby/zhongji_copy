<template>
  <el-container style="height:80vh">
    <d2-crud-x
    ref="d2Crud"
    v-bind="_crudProps"
    v-on="_crudListeners"
    @previewBtn='previewBtn'
    style="width:100%"
    >
      <div slot="header">
          <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
          />
      </div>
      <template slot='wareIdSlot' slot-scope='scope'>
        <el-checkbox
        v-model="wareIds"
        :label="scope.row.wareId"
        @change="changeSelectedContent"
        >
        <br>
        </el-checkbox>
      </template>
      <template slot="courseWareToCategoryVOListSlot" slot-scope="scope">
          <ul v-if="scope.row['courseWareToCategoryVOList'].length<2">
          <li v-for="item in scope.row['courseWareToCategoryVOList']" :key='item.catId'>{{item.catValue}}</li>
          </ul>
      <el-popover
      v-else
      placement="bottom-start"
      width="300"
      trigger="hover"
      >
      <ul>
          <li v-for="item in scope.row['courseWareToCategoryVOList']" :key='item.catId'>{{item.catValue}}</li>
      </ul>
      <el-button slot="reference" type="text">查看更多</el-button>
      </el-popover>
      </template>
    </d2-crud-x>
  </el-container>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { findItemInArrayByProperty } from '@/utils/array-utils'
export default {
  mixins: [d2CrudPlus.crud],
  props: {
    cousreWareInfo: {
      type: Object,
      default: () => { return {} }
    }
  },
  watch: {
    cousreWareInfo: {
      handler: function (val) {
        if (val.wareIds) {
          this.wareIds = val.wareIds
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      wareIds: [],
      // coursewareInfo: []
      seletedWares: {}
    }
  },
  methods: {
    initSelectedWares () {
      const _this = this
      if (_this.cousreWareInfo.wareInfo) {
        _this.cousreWareInfo.wareInfo.forEach(item => {
          _this.seletedWares[item.wareId] = item.wareValue
        })
      }
    },
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      return this.$api.GET_SUBSCRIBERECORD(query)
    },
    /*  doAfterRefresh (query, options) {
      var a = this.getD2CrudTableData()
      console.log(a)
      const item = findItemInArrayByProperty(a, '202108250507000000000004', 'wareId')
      if (item) {
        if (!this.multipleSelection) {
          this.multipleSelection = []
        }
        this.multipleSelection.push(item)
      }
    }, */
    // 预览
    previewBtn ({ row }) {
      return this.$api.PREVIEW_JUMP({ wareId: row.wareId }).then((data) => {
        window.open(data.data)
        // window.location.href = data.data
      })
    },
    /* // 多选change事件
    doSelectionChange (selection) {
      this.wareIds = []
      selection.forEach(res => {
        const item = findItemInArrayByProperty(this.seletedWares, res.wareId, 'wareId')
        if (!item) {
          this.seletedWares.push({ wareId: res.wareId, wareTime: 2 })
        }
      })
    }, */
    /* getSelectedWares () {
      return this.seletedWares
    }, */
    /*  isSelected (wareId) {
      // console.log('isSelected -> this.wareIds', this.wareIds)
      return this.wareIds.includes(wareId)
    }, */
    /*  getWareIds (val) {
      console.log('我在这')
      console.log(this.wareIds)
      this.wareIds.push(row.wareId)
      this.coursewareInfo.push(row.wareValue)
    }, */
    changeSelectedContent () {
      // console.log('当前选定:', this.wareIds, this.getD2CrudTableData())
      const arr = this.getD2CrudTableData()
      if (!this.wareIds) { return }
      this.wareIds.forEach(id => {
        const item = findItemInArrayByProperty(arr, id, 'wareId')
        if (item) {
          this.seletedWares[id] = item
        }
      })
      for (const item in this.seletedWares) {
        const idx = this.wareIds.indexOf(item)
        if (idx < 0) {
          delete this.seletedWares[item]
        }
      }
    },
    getSelectedWares () {
      return this.seletedWares
    },
    getSelectedWaresInfo () {
      return this.coursewareInfo
    }
  }
}
</script>
