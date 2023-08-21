<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
        <template slot="header">
            <span class="page-title">订单详情</span>
            <el-button type="primary" plain style="float: right;" size="mini" @click="back">返回</el-button>
        </template>
        <order-status :orderInfo="orderInfo"></order-status>
        <order-info :orderInfo="orderInfo" :goodsInfo="goodsInfo"></order-info>
        <invoice-info :invoiceInfo="invoiceInfo"></invoice-info>
        <pay-info :payInfo="payInfo"></pay-info>
        <object-info :objectInfo="objectInfo" :orderInfo="orderInfo"></object-info>
    </d2-container>
</template>

<script>
import { d2CrudPlus } from 'd2-crud-plus'
import OrderStatus from '../components/orderStatus.vue'
import OrderInfo from '../components/orderInfo.vue'
import InvoiceInfo from '../components/invoiceInfo.vue'
import PayInfo from '../components/payInfo.vue'
import ObjectInfo from '../components/objectInfo.vue'
export default {
  components: { OrderStatus, OrderInfo, InvoiceInfo, PayInfo, ObjectInfo },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      orderInfo: {},
      invoiceInfo: {},
      payInfo: {},
      objectInfo: {},
      buyerInfo: {}
    }
  },
  props: {
    tradeNo: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    back () {
      this.$emit('switchList')
    },
    getDetail () {
      this.$api.getplatorgorderdetail(
        this.tradeNo
      ).then(({ data }) => {
        this.orderInfo = data
        this.invoiceInfo = data.orderInvoiceVO[0]
        this.payInfo = data.payment
        this.goodsInfo = data.subOrderList
        this.buyerInfo = data.buyer
        this.objectInfo = data.deliverObj
      })
    }
  }
}
</script>

<style lang="scss">
</style>
