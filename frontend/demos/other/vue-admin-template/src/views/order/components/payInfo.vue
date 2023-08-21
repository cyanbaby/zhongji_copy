<template>
    <div class="order-info">
        <div class="order-info-title">
            <div class="bar"></div>
            支付信息
        </div>
        <el-divider></el-divider>
        <div class="order-info-content">
            <div class="content-row">
                <span v-if="payInfo.paymentNo">支付号：{{payInfo.paymentNo}}</span>
                <span v-if="payInfo.gmtTime">支付下单时间：{{payInfo.gmtTime}}</span>
                <span v-if="payInfo.gmtPayment">支付完成时间：{{payInfo.gmtPayment}}</span>
            </div>
            <div class="content-row">
                <span style="margin-right: 0px;">
                  支付方式：{{payInfo.toolType}}
                  <span v-if="payInfo.amount">（￥{{payInfo.amount}}）</span>
                </span>
                <span v-if="payInfo.thirdFlowNo">第三方流水号：{{payInfo.thirdFlowNo}}</span>
            </div>
            <!-- <div class="content-row">
                <span v-if="payInfo.payer">付款信息：{{payInfo.payer}}</span>
            </div>
            <div class="content-row">
                <span v-if="payInfo.payee">收款信息：{{payInfo.payee}}</span>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    payInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
.order-info{
    margin: 30px 150px;
    .order-info-title {
        font-size: 16px;
        height: 16px;
        color: #222;
        display: flex;
        .bar {
            width: 4px;
            height: 16px;
            background: #4598F9;
            border-radius: 2px;
            margin-right: 5px;
        }
    }
    .order-info-content {
        font-size: 12px;
        color: #888888;
        .content-row {
            margin-bottom: 15px;
            span {
                margin-right: 154px;
            }
        }
    }
    .order-info-footer{
        margin-top: 15px;
        text-align: right;
        .footer-item {
            font-size: 12px;
            color: #888;
            margin-bottom: 10px;
            .footer-label {
                color: #666666;
                margin-right: 57px;
            }
        }
        .footer-total {
            margin-top: 15px;
            .footer-total-label{
                margin-right: 30px;
                font-size: 16px;
                color: #444444;
            }
            .footer-total-price {
                font-size: 20px;
                font-weight: bold;
                color: #FF9347;
            }
        }
    }
}
</style>
