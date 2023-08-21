<template>
    <el-container style="height:70vh">
      <el-aside width="250px" class="aside">
            <div class="special">
                <el-input v-model="filterText" placeholder="输入关键字过滤" class="fiter" suffix-icon="el-icon-search" size="small"></el-input>
            </div>
          <el-tree
            ref="tree"
            :data="list"
            node-key="categoryId"
            :props="props"
            :expand-on-click-node="false"
            :highlight-current="true"
             :filter-node-method="filterNode"
            @node-click="clickNode"
             style="padding: 0 12px;"
          >
               <span class="custom-tree-node" slot-scope="{ node }">
                  <el-tooltip
                    :content="node.label"
                    :disabled="isShowTooltip"
                    :open-delay="300"
                    placement="top"
                    effect="light"
                  >
                    <span @mouseover="mouseOver($event)" class="over-ellipsis">{{node.label }}</span>
                  </el-tooltip>
                </span>
          </el-tree>
         </el-aside>
        <el-main class="main">
          <d2-crud-x
            ref="d2Crud"
            v-bind="_crudProps"
            v-on="_crudListeners"
          >
        <div slot="header">
          <crud-search
            ref="search"
            :options="crud.searchOptions"
            @submit="handleSearch"
          />
          <div style="margin-top:5px">
            <el-radio-group
              v-model="tabPosition"
              @change="statusQuery"
            >
              <el-radio-button
                v-for="(item, index) in status"
                :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <template slot='liveChannelIdSlot' slot-scope='scope'>
          <el-checkbox
            v-model="goodsInfo"
            :label="scope.row.liveChannelId"
            :disabled="disable(scope.row.liveChannelId)"
            @change="change"
          >
          <br>
          </el-checkbox>
        </template>
        <template slot="coverImgSlot" slot-scope="scope">
           <div class="imgNameCss">
                  <el-image
                    class="coverImg"
                    :src="scope.row.coverImg"
                  >
                    <img
                      slot="error"
                      class="coverImg"
                      src="@/assets/images/default.png"
                    />
                  </el-image>
                  <span class="name">{{scope.row.name}}</span>
                </div>
        </template>
        <template slot="priceSlot" slot-scope="scope">
          <span>{{scope.row.price}}元</span>
        </template>
        <template slot="categoryNameSlot" slot-scope="scope">
          <ul v-if="scope.row.categoryName.length<=12">
            <li>{{scope.row.categoryName}}</li>
          </ul>
                <el-popover
                v-else
                placement="right-start"
                width="300"
                trigger="hover"
                >
                <ul>
                  <li>{{scope.row.categoryName}}</li>
                </ul>
                <el-button slot="reference" type="text">查看更多</el-button>
                </el-popover>
        </template>
        <template slot="watchStatusSlot" slot-scope="scope">
         <span v-if="scope.row.watchStatus == 3 && scope.row.playBackType == 1">回放中</span>
         <span v-if="scope.row.watchStatus == 3 && scope.row.playBackType == 0 ">已结束</span>
         <span v-if="scope.row.watchStatus == 1">直播中</span>
         <span v-if="scope.row.watchStatus == 0">未开始</span>
        </template>
      </d2-crud-x>
      </el-main>
      </el-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { mapState } from 'vuex'
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
    filterText (val) {
      this.$refs.tree.filter(val)
    },
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
      goodsInfo: [],
      choseDataId: [],
      disableRow: [],
      selectedList: [],
      activeName: 'lecturer',
      tabPosition: null,
      filterText: '',
      list: [],
      props: {
        label: 'categoryName',
        value: 'categoryId',
        children: 'childrenLiveCategoryVO'
      },
      watchStatus: null,
      liveChannelId: '',
      categoryId: '',
      status: [
        {
          value: null,
          label: '全部'
        },
        {
          value: 0,
          label: '未开始'
        },
        {
          value: 1,
          label: '正在直播'
        },
        {
          value: 2,
          label: '回放中'
        },
        {
          value: 3,
          label: '已结束'
        }
      ],
      isShowTooltip: false
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  created () {
    this.getColumn()
  },
  methods: {
    // 超出显示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    },
    filterNode (value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    },
    statusQuery (val) {
      this.handleSearch({
        watchStatus: val,
        categoryId: this.categoryId
      })
    },
    getColumn () {
      this.$api.QUERY_LIVE_MENU().then(({ data }) => {
        this.list = data
      })
    },
    clickNode (data) {
      this.categoryId = data.categoryId
      this.doRefresh()
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    // 列表查询
    pageRequest (query) {
      query.categoryId = this.categoryId
      query.watchStatus = this.tabPosition
      return this.$api.GET_LIVE_LIST(query)
    },
    disable (liveChannelId) {
      if (this.choseDataId.includes(liveChannelId)) {
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
        const item = findItemInArrayByProperty(this.selectedList, res, 'liveChannelId')
        if (!item) {
          const found = findItemInArrayByProperty(currentList, res, 'liveChannelId')
          if (found) { this.selectedList.push(found) }
        }
      })
      for (let idx = this.selectedList.length - 1; idx >= 0; idx--) {
        const selected = this.selectedList[idx]
        const fIdx = this.goodsInfo.indexOf(selected.liveChannelId)
        if (fIdx < 0) {
          this.selectedList.splice(idx, 1)
        }
      }
    },
    getSelectedList () {
      return this.selectedList
    }
  }

}

</script>
<style lang="scss">
.special .el-input--small .el-input__inner {
    height: 30px;
    background: #F3F4F6;
    border-radius: 20px;
}
.el-tree-node__content{
  height: 40px;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    color: #1E90FF;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .el-tree-node__expand-icon {
    color: #1E90FF;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .el-tree-node__expand-icon.is-leaf {
    color: transparent;
}
.coverImg .el-image__inner {
    object-fit: cover;
}
</style>
<style lang="scss" scoped>
.onlyThree{
  overflow:hidden;
  text-overflow:ellipsis;//显示为省略号
  white-space:nowrap;//不换行
  text-align: left;
  padding-bottom: 2%;
  span{
    overflow:hidden;
    text-overflow:ellipsis;//显示为省略号
    white-space:nowrap;
  }
}
.main{
  width: 90%;
  border: 1px solid #CFD7E5;
  margin: 10px;
  padding: 10px;
  background: white;
  }
.aside{
  border: 1px solid #CFD7E5;
  margin:10px 0 10px 10px;
  background: white;
  overflow-x:hidden;
}
.fiter{
  width: 90%;
  margin: 10px 10px;
  overflow:auto;
}
.imgNameCss{
  display: flex;
  text-align: left;
}
.coverImg{
  width: 70px;
  height: 40px;
  flex-shrink: 0;
}
.name{
  margin-left: 5px;
}
.over-ellipsis{
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.show{
  margin-left: 25px;
  height: 100px;
  margin-bottom: -40px;
}
.explain{
  color: darkgray;
  font-size:10px;
  line-height: 10px;
}
.goodsImgDialog{
  float: left;
  width: 100px;
  height: 80%;
  margin-right: 20px;
  object-fit: contain;
}
.goodsName{
  font-weight:bold;
  font-size:25px;
  margin-bottom: 5px;
}
.tab-box{
  margin-top: 20px;
  .url-box{
    margin-bottom: 16px;
    .title{
      width: 112px;
      display: inline-block;
    }
    .title,.url-input{
      margin-right: 16px;
    }
    .des{
      margin-right: 30px;
    }
    .look-child{
      margin-left: 20px;
    }
  }
}

</style>
