<template>
  <el-container>
    <el-header>
      <el-radio-group v-model="radio" @change="radioChange">
        <el-radio-button label="1">我的课程</el-radio-button>
        <el-radio-button label="2">分销的课程</el-radio-button>
      </el-radio-group>
    </el-header>
    <el-container style="height:60vh">
      <el-aside width="15%" style="padding: 15px 0;">
          <el-tree :data="menu" :props="menuProps"  ref="categorytree" @node-click="getMenu" :expand-on-click-node="false" :highlight-current="true" accordion node-key="catId">
          </el-tree>
      </el-aside>
      <el-main style="margin:0px;padding:0">
        <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        style="padding:0"
        >
            <div slot="header">
              <crud-search
                ref="search"
                :options="crud.searchOptions"
                @submit="handleSearch"/>
            </div>
            <template slot='goodsIdSlot' slot-scope='scope'>
            <el-checkbox
            v-model="goodsInfo"
            :label="scope.row.goodsId"
            :disabled="disable(scope.row.goodsId)"
            @change="change"
            >
            <br>
            </el-checkbox>
            </template>
            <template
            slot="goodsImgSlot"
            slot-scope="scope"
        >
            <el-image
            class="goodsImg"
            :src="scope.row.goodsImg"
            >
            <img
                slot="error"
                class="goodsImg"
                src="@/assets/images/default.png"
            />
            </el-image>
            </template>

            <template slot="fullCatagoryNamesSlot" slot-scope="scope">
              <ul v-if="scope.row['fullCatagoryNames'].length<2">
                <li v-for="(item,i) in scope.row['fullCatagoryNames']" :key='i'>{{item}}</li>
              </ul>
            <el-popover
            v-else
            placement="bottom-start"
            width="300"
            trigger="hover"
            >
            <ul>
              <li v-for="(item,i) in scope.row['fullCatagoryNames']" :key='i'>{{item}}</li>
            </ul>
            <el-button slot="reference" type="text">查看更多</el-button>
            </el-popover>
            </template>

        </d2-crud-x>
        </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { findItemInArrayByProperty } from '@/utils/array-utils'
export default {
  mixins: [d2CrudPlus.crud],
  props: {
    choseDataCount: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    choseDataCount: {
      handler (val) {
        this.choseDataId = []
        val.forEach(res => { this.choseDataId.push(res.goodsId) })
        this.goodsInfo = this.choseDataId
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      categoryDic: [], // 课程大类字典
      menu: [],
      menuProps: {
        label: 'catValue',
        value: 'catId',
        children: 'childCatagorys'
      },
      goodsCategory: 6,
      goodsInfo: [],
      checked: false,
      choseData: this.choseDataCount,
      choseDataId: [],
      disableRow: [],
      selectedList: [],
      radio: '1'
    }
  },
  created () {
    this.queryCategoryTree()
  },
  methods: {
    /**
     * 获取当前列表数据
     * @returns
     */
    getD2CrudTableData () {
      const d2Crud = this.getD2Crud()
      return d2Crud == null || d2Crud.d2CrudData
    },
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      if (this.radio == '1') {
        query.goodsType = this.goodsCategory
        query.catId = this.catId
        return this.$api.GET_GOODS_INFO(query)
      }
      if (this.radio == '2') {
        query.goodsType = this.goodsCategory
        query.catId = this.catId
        return this.$api.GET_DISTRIBUTE_GOODS_INFO(query)
      }
    },
    // 课程大类变化
    categoryChange (val) {
      this.goodsCategory = val
      this.catId = ''
      this.doRefresh()
      this.queryCategoryTree()
    },
    queryCategoryTree () {
      this.$api.GET_ORGGOODS_CATAGORY({
        goodsType: this.goodsCategory
      }).then(res => {
        this.menu = res.data
      })
    },
    getMenu (val) {
      this.catId = val.catId
      this.doRefresh()
    },
    disable (goodsId) {
      if (this.choseDataId.includes(goodsId)) {
        return true
      } else {
        return false
      }
    },
    change (val) {
      this.refreshSelected()
    },
    refreshSelected () {
      const currentList = this.getD2CrudTableData()
      this.goodsInfo.forEach(res => {
        const item = findItemInArrayByProperty(this.selectedList, res, 'goodsId')
        if (!item) {
          const found = findItemInArrayByProperty(currentList, res, 'goodsId')
          if (found) { this.selectedList.push(found) }
        }
      })
      for (let idx = this.selectedList.length - 1; idx >= 0; idx--) {
        const selected = this.selectedList[idx]
        const fIdx = this.goodsInfo.indexOf(selected.goodsId)
        if (fIdx < 0) {
          this.selectedList.splice(idx, 1)
        }
      }
    },
    getSelectedList () {
      return this.selectedList
    },
    radioChange () {
      this.catId = ''
      this.$refs.categorytree.setCurrentKey(null)
      this.doRefresh()
    }
  }
}
</script>
<style scoped>
.goodsImg{
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
