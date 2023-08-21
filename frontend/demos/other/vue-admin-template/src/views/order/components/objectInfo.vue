<template>
    <div class="order-info">
        <div class="order-info-title">
            <div class="bar"></div>
            买家/交付对象信息
        </div>
        <el-divider></el-divider>
        <div class="order-info-content">
            <div class="content-row">
                <span>买家类型：{{orderInfo.buyerType == 1?'个人':'组织'}}</span>
            </div>
            <div class="content-row">
                <span>用户名：{{objectInfo.name}}</span>
                <span>用户手机号：{{objectInfo.mobile}}</span>
            </div>
            <div class="content-row">
                <span>交付对象：{{objectInfo.name}}</span>
                <span>交付对象手机号：{{objectInfo.mobile}}</span>
            </div>
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
    objectInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    orderInfo: {
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
