<template>
  <d2-container class="specific" :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header" v-if="!detailShow">
      <span class="page-title">{{this.$route.meta.title}}</span>
    </template>
    <template slot="header" v-if="detailShow">
      <div class="headCss">
      <span class="page-title">详情</span>
      <el-button type="primary" plain style="float: right;" size="mini" @click="back">返回</el-button>
      </div>
    </template>
    <el-container style="height: 100%;" v-if="!detailShow">
      <el-aside width="200px" class="aside">
            <div class="special">
                <el-input v-model="filterText" placeholder="输入关键字过滤" class="fiter" suffix-icon="el-icon-search" size="small"></el-input>
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
          >
              <div slot="header">
                <crud-search
                  ref="search"
                  :options="crud.searchOptions"
                  @submit="handleSearch"
                />
                  <el-button
                  size="small"
                  type="primary"
                  @click="addRow"
                  >新增课程
                  </el-button>

                  <crud-toolbar
                  v-bind="_crudToolbarProps"
                  v-on="_crudToolbarListeners"
                  />
              </div>
              <template
              slot="goodsImgSlot"
              slot-scope="scope"
            >
            <div class="imgNameCss">
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
            <template slot="operationSlot" slot-scope="scope">
              <div class="btnCss">
                <el-link :underline="false" type="primary" @click="editJumpBtn(scope.row)">编辑</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link :underline="false" type="primary" @click="groundingBtn(scope.row)">上架</el-link>
                <el-divider direction="vertical" size="small"></el-divider>
                <el-link :underline="false" type="primary" @click="previewBtn(scope.row)">预览</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-dropdown @command="(command)=>{handleCommand(command, scope.row)}">
                  <span class="el-dropdown-link" style="font-size: 14px;">
                    更多
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="detailBtn">
                      详情
                    </el-dropdown-item>
                    <el-dropdown-item command="deleteBtn">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </d2-crud-x>
          <el-dialog
            :title="title"
            :visible.sync="dialog"
            :close-on-click-modal=false
            width="50%"
            top="10px"
            center
            >
            <div class="show">
              <el-image
                  class="goodsImgDialog"
                  :src="rowData.goodsImg"
                >
                  <img
                    slot="error"
                    class="goodsImgDialog"
                    src="@/assets/images/default.png"
                  />
              </el-image>
              <div>
              <div class="goodsName">{{rowData.goodsValue}}</div>
              <div class="category">
                <span v-for="(item,i) in rowData.fullCatagoryNames" :key="i">
                  {{item}}
                  <span v-if="rowData.fullCatagoryNames.length-1!=i">；</span>
                </span>
              </div>
              </div>
            </div>
            <el-form ref="form" :model="form" label-width="135px" style="margin-top: 50px;" :rules="rules">
            <vxe-table
                style="margin-bottom: 30px;"
                border
                resizable
                show-overflow
                :data="tableData"
                :edit-config="{trigger: 'click', mode: 'row'}"
                ref="xTable"
                :edit-rules="validRules"
                >
                  <vxe-table-column type="checkbox" width="60"></vxe-table-column>
                  <vxe-table-column field="normName" title="规格"></vxe-table-column>
                  <vxe-table-column field="shelvesTotal" title="上架数量" :edit-render="{name: '$input', props: {type: 'number',min:1}}"></vxe-table-column>
                  <vxe-table-column field="productPrice" title="销售价" :edit-render="{name: '$input', props: {type: 'float', digits: 2,min:0}}"></vxe-table-column>
            </vxe-table>

                <el-form-item label="限购：" prop="limitQuantity">
                  每个用户累计可购买数量
                  <el-input-number size="mini" v-model="form.limitQuantity" controls-position="right" :min="0" disabled></el-input-number>
                  件
                  <br>
                  <span class="explain">0为不限购</span>
                </el-form-item>

                <el-form-item label="售后：" prop="isSupportRefund">
                  <el-radio-group v-model="form.isSupportRefund">
                      <el-radio :label="1">支持退款</el-radio>
                      <el-radio :label="2">不支持退款</el-radio>
                  </el-radio-group>
                  <br>
                  <span class="explain">若是不支持退款，课程详情页将展示“<span style="color:#6F9F9D;font-weight:bold;">此课程不支持退款</span>”字样</span>
                </el-form-item>
                <el-form-item label="下单页面限制：" prop="placeOrderLimit">
                  <el-radio-group v-model="form.placeOrderLimit">
                      <el-radio :label="1">不限制</el-radio>
                      <el-radio :label="2">禁止购物车购买</el-radio>
                  </el-radio-group>
                  <br>
                  <span class="explain">若是禁止购物车界面购买，买家将只能在课程详情页购买单个课程；交易设置中也可对全局进行设置，只有都不限制时，课程才会允许加入购物车</span>
                </el-form-item>
                <el-form-item label="可购物客户限制：" prop="buyCustLimit">
                  <el-radio-group v-model="form.buyCustLimit">
                      <el-radio  :label="1">不限制</el-radio>
                      <el-radio  :label="2">仅会员</el-radio>
                  </el-radio-group>
                  <br>
                  <span class="explain">你可在客户管理中对客户进行分组</span>
                </el-form-item>
                <div style="margin-left: 40%;">
                  <el-button @click="dialog = false">取 消</el-button>
                  <el-button type="primary" @click="putAway">上架</el-button>
                </div>
            </el-form>
          </el-dialog>
        </el-main>
      </el-container>
      <detail v-if="detailShow" :goodsId="goodsId"></detail>
      <template slot="footer" v-if="detailShow">
        <div style="text-align:center">
        <span @click="toBottom" v-if="downShow">
          <d2-icon-svg name="down" class="svgCss"/>
        </span>
        <el-button type="primary" plain style="width:150px" size="mini" @click="back">返回</el-button>
        </div>
      </template>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import util from '@/libs/util'
import detail from './detail/index.vue'

export default {
  components: {
    detail
  },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      filterText: '',
      platformFullName: '', // 平台名称
      goodsCategory: 6,
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
      tableData: [
        {
          shelvesTotal: '',
          productPrice: ''
        }
      ],

      form: {
        catId: '',
        goodsId: '',
        goodsValue: '',
        goodsType: '',
        limitQuantity: 1,
        isSupportRefund: 1,
        placeOrderLimit: 1,
        buyCustLimit: 1
      },
      normForms: [], // 规格
      title: '',
      validRules: { // 表格校验
        shelvesTotal: [{ required: true, message: '上架数量必须填写' }],
        productPrice: [{ required: true, message: '销售价必须填写' }]
      },
      rules: {
        limitQuantity: [{ required: true, message: '限购数为必填项', trigger: 'blur' }],
        isSupportRefund: [{ required: true, message: '售后为必选项', trigger: 'blur' }],
        placeOrderLimit: [{ required: true, message: '下单页面限制为必选项', trigger: 'blur' }],
        buyCustLimit: [{ required: true, message: '可购物客户限制为必选项', trigger: 'blur' }]
      },
      isShowTooltip: false,
      detailShow: false,
      goodsId: ''
    }
  },
  watch: {
    filterText (val) {
      this.$refs.categorytree.filter(val)
    }
  },
  created () {
    this.platformFullName = util.cookies.get('title')
    this.queryCategoryTree()
  },
  methods: {
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
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
      query.bussinessDomainType = 1
      return this.$api.GET_WARES_LIST(query)
    },
    getMenu (val) {
      // console.log(val.catId)
      this.catId = val.catId
      this.doRefresh()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.catValue.indexOf(value) !== -1
    },
    // 查询课程规格信息
    queryNorm (goodsId) {
      this.$api.GET_NORM_LIST({
        goodsId: goodsId
      }).then(res => {
        this.tableData = res.data
      })
    },
    // 上架
    async putAway () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      if (selectRecords.length > 0) {
        const errMap = await $table.validate(selectRecords).catch(errMap => errMap)
        if (errMap) { // 必填项未填写
        } else { // 表格内信息校验成功
          this.$refs.form.validate((valid) => {
            if (valid) {
              const selectRecords = this.$refs.xTable.getCheckboxRecords()
              this.$api.PUT_AWAY({
                ...this.form,
                normForms: selectRecords,
                bussinessType: 1
              }).then(res => {
                this.dialog = false
                this.$message({
                  message: '上架成功',
                  type: 'success'
                })
                this.doRefresh()
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      } else {
        this.$message.warning('请选择课程规格')
      }
    },
    addRow () {
      this.$router.push({
        path: '/goods/addGoods',
        query: {}
      })
    },
    editJumpBtn (row) {
      this.$router.push({
        path: '/goods/addGoods',
        query: {
          goodsId: row.goodsId,
          goodsType: row.goodsType
        }
      })
    },
    // 超出显示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    },
    groundingBtn (row) {
      // 上架弹窗
      this.rowData = row
      this.form.catId = row.catId
      this.form.goodsId = row.goodsId
      this.form.goodsValue = row.goodsValue
      this.form.goodsType = row.goodsType
      this.title = '上架到' + this.platformFullName
      this.queryNorm(row.goodsId)
      this.dialog = true
    },
    previewBtn (row) {
      // 预览直接跳转
      let status = 1
      if (row.status == '未上架') {
        status = 1
      }
      if (row.status == '已上架') {
        status = 2
      }
      const url = this.$router.resolve({
        path: '/coursedetail',
        query: {
          goodsId: row.goodsId,
          status: status
        }
      })
      window.open(url.href)
    },
    handleCommand (command, row) {
      if (command == 'detailBtn') {
        this.goodsId = row.goodsId
        this.detailShow = true
      }
      if (command == 'deleteBtn') {
        this.$confirm('确定删除课程吗?删除后不可恢复，且已购买该课程的学员无法观看', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.DELETE_GOODS({
            goodsId: row.goodsId
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.doRefresh()
          })
        }).catch(() => {
          console.log('已取消删除')
        })
      }
    },
    back () {
      this.detailShow = false
    }
  }
}
</script>
<style>
.goodsImg .el-image__inner {
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
.goodsImg{
  width: 70px;
  height: 40px;
  flex-shrink: 0;
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
  overflow:auto;
}
.over-ellipsis{
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
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
.btnCss{
  display: flex;
  align-items: center;
}
</style>
