<!--
 * @Date: 2021-02-20 15:27:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 16:23:36
 * @FilePath: \p-front-admin\src\views\join\plane\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header"
              v-if="!detailShow">
      <span class="page-title">{{$route.meta.title}}</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn title="文档链接"
                       link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html" />
        </div>
      </d2-helper>
    </template>
    <d2-crud-x ref="d2Crud"
               v-if="!detailShow"
               v-bind="_crudProps"
               v-on="_crudListeners"
               @showDetail="showDetail"
               @backstageOpen="backstageOpen">
      <div slot="header">
        <crud-search ref="search"
                     :options="crud.searchOptions"
                     @submit="handleSearch"
                     @reset="resetClick">
          <template slot="buyerAddressCodeSearchSlot">
            <el-cascader v-model="form.buyerAddressCode"
                         style="width:100%"
                         :options="options"
                         :props="props"
                         placeholder="请选择地址"
                         @change="selectArea" />
          </template>
        </crud-search>
        <div class="peculiar"
             style="margin-bottom: 10px;">
          <el-radio-group v-model="tabPosition"
                          @change="statusQuery">
            <el-radio-button v-for="(item, index) in status"
                             :key="index"
                             :label="item.dictDataValue"
                             :checked="isRadioChecked(index,tabPosition)">
              {{ item.dictDataName }}
            </el-radio-button>
          </el-radio-group>

          <el-button type="primary"
                     style="float:right;"
                     @click="exportBtn">导出</el-button>
          <!-- <el-button type="primary"
                     style="float:right; margin-right: 30px">批量开单</el-button> -->
        </div>
        <!-- <div>
                  <el-button type="primary" @click="batchClick">批量开单</el-button>
                </div> -->
        <crud-toolbar v-bind="_crudToolbarProps"
                      v-on="_crudToolbarListeners" />
      </div>
      <template slot="subOrderListSlot"
                slot-scope="scope">
        <div>订单号：{{scope.row.orderNo}}<span style="color:#49AF4F;">【{{status.filter(res => res.dictDataValue == scope.row.status)[0].dictDataName}}】</span></div>
        <div style="display:flex;"
             v-for="(order, i) in scope.row.subOrderList"
             :key="i">
          <div class="pic-img-box">
            <el-image class="productImg"
                      :src="order.goodsImg">
              <img slot="error"
                   class="productImg"
                   src="@/assets/images/default.png" />
            </el-image>
            <div class="tips-refund"
                 v-if="order.status == 'R'">退款中</div>
            <div class="tips-refund"
                 v-if="order.status == 'RS'">已退款</div>
            <div class="tips-refund"
                 v-if="order.status == 'RF'">退款失败</div>
          </div>
          <div class="name">
            <div>{{order.goodsValue}}</div>
            <div>
              <span style="margin-right: 20px;">规格：{{order.goodsNormName}}</span>
              <span>数量：{{order.quantity}}</span>
            </div>
            <div>价格：
              <span v-if="order.price">￥{{order.price}}</span>
              <span v-else>免费</span>
            </div>
          </div>
        </div>
      </template>

      <template slot="goodsNormNameSlot"
                slot-scope="scope">
        {{scope.row.goodsNormName==-1?'无':scope.row.goodsNormName}}
      </template>

      <template slot="actualAmountSlot"
                slot-scope="scope">
        <span v-if="scope.row.actualAmount">￥{{scope.row.actualAmount}}</span>
        <span v-else>免费</span>
      </template>
      <template slot="orderAmountSlot"
                slot-scope="scope">
        <span v-if="scope.row.orderAmount">￥{{scope.row.orderAmount}}</span>
        <span v-else>免费</span>
      </template>
      <template slot="buyerSlot"
                slot-scope="scope">
        <div>
          {{scope.row.buyer.name}}
        </div>
        <div>
          {{scope.row.buyer.mobile == 'null' ? '' : scope.row.buyer.mobile}}
        </div>
      </template>
      <template slot="deliverObjSlot"
                slot-scope="scope">
        <div>
          {{scope.row.deliverObj.name}}
        </div>
        <div>
          {{scope.row.deliverObj.mobile == 'null' ? '' : scope.row.deliverObj.mobile}}
        </div>
      </template>
      <template slot="paymentToolTypeSlot"
                slot-scope="scope">

        <div v-if="scope.row.paymentInfo">
          {{scope.row.paymentInfo.paymentToolType == 'null'? '' : scope.row.paymentInfo.paymentToolType}}
        </div>
        <!-- <div v-if="scope.row.paymentInfo && scope.row.paymentInfo.paymentToolType=='ALI_PAY'">
          支付宝
        </div>
        <div v-if="scope.row.paymentInfo && scope.row.paymentInfo.paymentToolType=='WX_PAY'">
          微信
        </div>
        <div v-if="scope.row.paymentInfo && scope.row.paymentInfo.paymentToolType=='OFFLINE_PAYMENT'">
          线下付款
        </div>
        <div v-if="scope.row.paymentInfo && scope.row.paymentInfo.paymentToolType=='NO_PAYMENT'">
          免付款
        </div> -->
      </template>
      <template slot="gmtCreateSlot"
                slot-scope="scope">
        <div v-if="scope.row.paymentInfo">
          {{scope.row.paymentInfo.gmtCreate == 'null'? '' : scope.row.paymentInfo.gmtCreate}}
        </div>

      </template>
    </d2-crud-x>
    <detail v-if="detailShow"
            :tradeNo="tradeNo"
            @switchList="switchList"></detail>
    <el-dialog title="后台开通订单"
               :visible.sync="dialogVisible"
               width="30%">
      <span>开通后，学员将直接享受该商品权益，确认继续？</span>
      <el-form :model="form_1"
               style="color: #000">
        <el-form-item label="支付方式"
                      style="min-height: 30px; margin-top: 15px">
          <el-radio-group v-model="form_1.resource"
                          size="margin-bottom: 0 !important;">
            <el-radio label="线下付款"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付金额">
          <el-input v-model="form_1.num"
                    size="mini"
                    :disabled="true"
                    style="width: 80px">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="determineClick">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import detail from './detail.vue'
import {
  crudOptions
} from './crud'
import {
  d2CrudPlus
} from 'd2-crud-plus'
export default {
  components: { detail },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      form_1: {
        resource: '',
        num: 1
      },
      dialogVisible: false,
      form: {
        buyerAddressCode: '' // 省市区联动
      },
      props: {
        value: 'areaCode',
        label: 'name',
        checkStrictly: true
      },
      options: [],
      status: [],
      tabPosition: -1,
      detailShow: false,
      tradeNo: ''
    }
  },
  created () {
    // this.getMemberInfo()
  },
  mounted () {
    this.$api.GET_USER_AREA().then(res => {
      console.log('数据类型', res.data)
      this.options = res.data
    })
    this.grtDict()
  },
  methods: {
    handleChange (value) { // 支付金额
      console.log(value)
    },
    resetClick () { // 重置
      this.form.buyerAddressCode = ''
    },
    batchClick () {
      this.$router.push({
        path: '/order/batch_order',
        query: {
          productType: 1
        }
      })
    },
    selectArea (val) {
      this.form.buyerAddressCode = val
      const code = this.form.buyerAddressCode[this.form.buyerAddressCode.length - 1]
      this.form.buyerAddressCode = code || '' // 地址传参
      console.log('val', val)
      console.log('this.form.buyerAddressCode', this.form.buyerAddressCode)
    },
    // 取消
    cancel () {
      this.getMemberInfo()
    },
    getMemberInfo () {
      this.$api.ORG_BASE_GET().then(res => {
        this.form = res.data || {}
        // this.form.buyerAddressCode = this.form.buyerAddressCode.split(',').map(Number)
      })
    },
    determineClick () { // 后台开通
      this.$api.getbackstageopen(
        this.tradeNo
      ).then(res => {
        if (res.code == 1) {
          this.$message({
            message: '后台开通成功',
            type: 'success'
          })
          this.doRefresh()
          this.dialogVisible = false
        }
      })
    },
    backstageOpen (scope) { // 后台开通成功
      this.form_1.resource = ''
      console.log('backstageOpen', scope)
      this.tradeNo = scope.row.tradeNo
      this.dialogVisible = true
    },
    switchList () {
      this.detailShow = false
    },
    grtDict () {
      this.$api.DICT_LIST({
        typeCode: 'order_status'
      }).then(({
        data
      }) => {
        this.status = data
      })
    },
    showDetail (scope) {
      this.detailShow = true
      this.tradeNo = scope.row.tradeNo
      // this.$router.push({
      //     path: `/order/course_detail`,
      //     query: {
      //         tradeNo: scope.row.tradeNo
      //     }
      // })
    },
    isRadioChecked (index, tabPosition) {
      return Number(index) === Number(tabPosition)
    },
    // 状态查询
    statusQuery (val) {
      this.tabPosition = val
      this.handleSearch({
        ...this.getSearch().getForm(),
        status: val == -1 ? '' : val
      })
    },
    addRequest (row) {
      return this.$api.EXAM_POINT_ADD(row)
    },

    updateRequest (row) {
      return this.$api.EXAM_POINT_UPDATE(row)
    },

    delRequest (row) {
      return this.$api.EXAM_POINT_DEL({
        examPointId: row.examPointId
      })
    },

    getCrudOptions () {
      return crudOptions(this)
    },

    pageRequest (query) {
      query.buyerName = query.buyer ? query.buyer.name : ''
      query.buyerMobile = query.buyer ? query.buyer.mobile : ''
      query.companyName = query.buyer ? query.buyer.companyName : ''
      query.buyerAddressCode = this.form.buyerAddressCode

      query.tradeType = 20
      query.startTime = query.startTime ? new Date(query.startTime).getTime() : ''
      query.endTime = query.endTime ? new Date(query.endTime).getTime() : ''
      query.status = this.tabPosition == -1 ? '' : this.tabPosition
      return this.$api.getplatorgorderlist(query)
    },
    getSearch () {
      return this.$refs[this.crud.format.ref.search]
    },
    exportBtn () {
      const searchData = this.getSearch().getForm()
      searchData.startTime = searchData.startTime ? new Date(searchData.startTime).getTime() : ''
      searchData.endTime = searchData.endTime ? new Date(searchData.endTime).getTime() : ''
      this.$api.EXPORT_ORDER({
        ...searchData,
        tradeType: 20,
        status: this.tabPosition == -1 ? '' : this.tabPosition,
        pageNum: 1,
        pageSize: 999999,
        buyerAddressCode: this.form.buyerAddressCode,
        orderType: 1
      }).then(res => {
        if (res.data) {
          window.location = res.data
          this.$message({
            message: '正在导出，请耐心等待浏览器响应！',
            type: 'success'
          })
        } else {
          this.$message({
            message: '系统异常，请稍后再试',
            type: 'warning'
          })
        }
      })
    }
  }
}

</script>

<style lang="scss">
.backstage-open {
  margin-left: 6px !important;
}

.productImg .el-image__inner {
  object-fit: cover;
}

.name {
  margin-left: 5px;
}

.productImg {
  width: 100px;
  height: 60px;
  flex-shrink: 0;
}
.pic-img-box {
  position: relative;
  .tips-refund {
    position: absolute;
    padding: 0px 4px;
    color: #fff;
    font-size: 12px;
    top: 0;
    right: 0;
    background: #409eff;
  }
}
</style>
