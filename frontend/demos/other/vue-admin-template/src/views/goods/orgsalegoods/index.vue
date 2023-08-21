<template>
  <d2-container class="specific" :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot='header'>
        <span class='page-title'>{{this.$route.meta.title}}</span>
        <d2-helper title='帮助文档'>
            <div>
                <d2-link-btn
                title='文档链接'
                link='http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html'
                />
            </div>
        </d2-helper>
    </template>
    <el-container style="height: 100%;">
      <el-aside width="200px" class="aside">
            <div class="special">
                <el-input v-model="filterText"
                placeholder="输入关键字过滤"
                class="fiter"
                suffix-icon="el-icon-search"
                size="small"></el-input>
            </div>
            <el-tree
            :data="menu"
            :props="menuProps"
            node-key="id1"
            :filter-node-method="filterNode"
            ref="categorytree"
            style="padding: 0 12px;"
            @node-click="getMenu"
            :expand-on-click-node="false"
            :highlight-current="true"
            >
                <span class="custom-tree-node" slot-scope="{data}">
                  <el-tooltip
                    :content="data.catValue"
                    :disabled="isShowTooltip"
                    :open-delay="300"
                    placement="top"
                    effect="light"
                  >
                    <span @mouseover="mouseOver($event)" class="over-ellipsis">{{ data.catValue }}</span>
                  </el-tooltip>
                </span>

            </el-tree>
      </el-aside>
        <el-main class="main">
          <d2-crud-x
              ref="d2Crud"
              v-bind="_crudProps"
              v-on="_crudListeners"
              @undercarriageBtn="undercarriageBtn"
              @allocationBtn="allocationBtn"
          >
              <div slot="header">
                <crud-search
                  ref="search"
                  :options="crud.searchOptions"
                  @submit="handleSearch"
                />
              </div>
              <template
              slot="productImgSlot"
              slot-scope="scope"
            >
            <div class="imgNameCss">
              <el-image
                class="productImg"
                :src="scope.row.productImg"
              >
                <img
                  slot="error"
                  class="productImg"
                  src="@/assets/images/default.png"
                />
              </el-image>
              <span class="name">{{scope.row.goodsValue}}</span>
            </div>
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
            <template
              slot="maxProductPriceSlot"
              slot-scope="scope"
            >
            <span v-if="scope.row.maxProductPrice>=0&&scope.row.maxProductPrice==scope.row.minProductPrice">￥{{scope.row.maxProductPrice}}</span>
            <span v-else><span v-if="scope.row.minProductPrice>=0">￥{{scope.row.minProductPrice}}~</span><span v-if="scope.row.maxProductPrice>=0">￥{{scope.row.maxProductPrice}}</span></span>
            </template>

          </d2-crud-x>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :close-on-click-modal=false
            width="30%"
          >
            <span>确定执行该课程的下架操作吗?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="undercarriage">确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog :close-on-click-modal=false
            title="分配类目"
            :visible.sync="allocationdialog"
            width="30%"
          >
          <div v-loading="catalogLoading">
            <!-- <el-tree
            :data="menu2"
            :props="menuProps"
            node-key="catId"
            ref="tree2"
            :default-checked-keys="catIds"
            style="height: 50vh; overflow-y: auto;"
            :highlight-current=true
            @node-click="setCatalog"
            :default-expanded-keys="keyList"
            show-checkbox
            check-strictly
            >
            </el-tree> -->
            <el-tree
              ref="tree2"
              :data="menu2"
              :props="menuProps"
              show-checkbox
              @check-change="setCatalog"
              :node-key="menuProps.value"
              default-expand-all
              :default-checked-keys="catIds"
              check-strictly
              style="height: 50vh; overflow-y: auto;"
            >
            </el-tree>
          </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="allocationdialog=false">取 消</el-button>
              <el-button type="primary" @click="allocatSubmit">确 定</el-button>
            </span>
          </el-dialog>
        </el-main>
      </el-container>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { isArray } from 'lodash'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      filterText: '',
      goodsCategory: '',
      categoryDic: [], // 课程大类字典
      menu: [],
      menuProps: {
        label: 'catValue',
        children: 'childCatagorys',
        value: 'catId'
      },
      catId: '',
      dialog: false,
      rowData: {},
      tableData: [],
      form: {
        quota: 0,
        afterSale: 1,
        orderLimit: 1,
        custLimit: []
      },
      dialogVisible: false,
      productId: '',
      isShowTooltip: false,
      allocationdialog: false,
      catIds: [],
      menu2: [],
      catalogLoading: true,
      targetProductCatIds: []
      // keyList: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.categorytree.filter(val)
    }
  },
  created () {
    this.$api.SETTING_GET_DICT({
      typeCode: 'plant_goods_category'
    }).then(res => {
      const list = res.data
      if (isArray(list)) {
        this.categoryDic = list.map(item => {
          return {
            value: `${item.dictDataName}`,
            label: `${item.dictDataValue}`
          }
        })
        this.goodsCategory = this.categoryDic[0].label
        this.queryCategoryTree()
        this.doRefresh()
      }
    })
  },
  methods: {
    /**
     * 第一次请求页面数据
     * initColumns初始化完成后调用
     * 可以用一个空方法覆盖它，阻止初始化后请求数据
     */
    doLoad () {},
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.catValue.indexOf(value) !== -1
    },
    queryCategoryTree () {
      this.$api.GET_CATEGORY_LIST_TREE({
        goodsType: this.goodsCategory
      }).then(res => {
        this.menu = res.data
      })
    },
    // 查询
    pageRequest (query) {
      query.goodsType = this.goodsCategory
      query.catId = this.catId
      return this.$api.GET_SELL_LIST(query)
    },
    // 课程大类变化
    categoryChange (val) {
      this.goodsCategory = val
      this.catId = ''
      this.doRefresh()
      this.queryCategoryTree()
    },
    getMenu (val) {
      // console.log(val.catId)
      this.catId = val.catId
      this.doRefresh()
    },
    undercarriageBtn ({ row }) {
      this.productId = row.productId
      this.dialogVisible = true
    },
    undercarriage () {
      this.$api.UNDERCARRIAGE({
        productId: this.productId
      }).then(res => {
        this.dialogVisible = false
        this.doRefresh()
        this.$message({
          message: '下架成功',
          type: 'success'
        })
      })
    },
    // 超出显示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    },
    // 分配类目
    allocationBtn ({ row }) {
      this.catalogLoading = true
      this.productId = row.productId
      this.allocationdialog = true
      this.$api.GET_CATEGORY_LIST_TREE({
        goodsType: 6
      }).then(res => {
        res.data.splice(0, 1)
        this.menu2 = res.data
        this.$api.GET_PRODUCT_CATAGORY({
          productId: this.productId
        }).then(item => {
          this.catIds = []
          this.catIds = item.data.catagoryIdList
          // const key = item.data.catagoryIdList.toString()
          // this.targetProductCatId = key
          // this.keyList.push(key)
          // this.$refs.tree2.setCurrentKey(key)
          this.catalogLoading = false
        })
      })
    },
    setCatalog () {
      this.targetProductCatIds = []
      this.targetProductCatIds = this.$refs.tree2.getCheckedKeys()
    },
    allocatSubmit () {
      this.$api.MODIFY_DIRECTORY({
        productId: this.productId,
        targetProductCatIds: this.targetProductCatIds
      }).then(() => {
        this.allocationdialog = false
        this.doRefresh()
      })
    }
  }
}
</script>
<style>
.productImg .el-image__inner {
    object-fit: cover;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
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
.special .el-input--small .el-input__inner {
    height: 30px;
    background: #F3F4F6;
    border-radius: 20px;
}
.page-compact .d2-crud-pagination {
    float: right;
}
</style>
<style scoped>
.fileIcon{
  width:15px;
  height:15px;
  float:left
}
.greenDot{
  width: 6px;
  height: 6px;
  background: #2FCE63;
  border-radius: 50%;
  margin-right: 5px;
}
.imgNameCss{
  display: flex;
  text-align: left;
}
.name{
  margin-left: 5px;
}
.redDot{
  width: 6px;
  height: 6px;
  background: #F33E21;
  border-radius: 50%;
  margin-right: 5px;
}
.contain{
  display: flex;
  flex-direction: row;
  align-items:center;
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
}
.over-ellipsis{
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.imgNameCss{
  display: flex;
  text-align: left;
}
.productImg{
  width: 70px;
  height: 40px;
  flex-shrink: 0;
}
.name{
  margin-left: 5px;
}
</style>
