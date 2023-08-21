<template>
    <div style="margin-bottom:25px">
        <el-steps :space="290" :active="active" finish-status="success" class="step-box">
            <el-step title="买家下单" :description="orderInfo.createTime"></el-step>
            <el-step title="买家支付" :description="orderInfo.tradeTime"></el-step>
            <el-step title="已完成" :description="orderInfo.tradeTime"></el-step>
        </el-steps>
        <div class="order-status" :class="active==1?'order-time':(active==2?'pay-time':'order-success')">
            <span class="content">当前订单状态：{{ statusLabel }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      active: 1,
      statusLabel: '待付款'
    }
  },
  props: {
    orderInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    orderInfo (val) {
      if (val.status == 'S') {
        this.active = 3
        this.statusLabel = '已完成'
      } else {
        this.active = 1
        this.statusLabel = '待付款'
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.step-box {
    width: 100%;
    margin: 15px auto;
    padding-left: 420px;
  .el-step__icon{
    cursor: pointer;
  }
  .el-step__head.is-process {
    color: #C0C4CC;
    border-color: #C0C4CC;
  }
  .el-step__title.is-process {
    font-weight: normal;
    color: #C0C4CC;
  }
  .el-step__description.is-process {
    color: #C0C4CC;
  }
  .el-step__head.is-success{
        color: #4598F9;
        border-color: #4598F9;
      .el-step__icon.is-text{
          background: #4598F9;
          .el-step__icon-inner{
                color: #fff;
                background: #4598F9;
          }
      }
      .el-step__line{
        background-color: #4598F9;
      }
  }
  .el-step__main{
      .el-step__title{
          color: #444;
      }
      .el-step__description{
          color: #888;
      }
  }
}
.order-status {
    height: 52px;
    position: relative;
    margin-left: 150px;
    background-repeat: no-repeat;
    &.order-time{
        background-image: url("../../../assets/images/order_time.png");
    }
    &.order-success{
        background-image: url("../../../assets/images/order_success.png");
    }
    &.pay-time{
        background-image: url("../../../assets/images/pay_time.png");
    }
    .content{
        position: absolute;
        top: 23px;
        left: 30px;
    }
}
</style>
