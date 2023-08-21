<template>
    <div class="order-info">
        <div class="order-info-title">
            <div class="bar"></div>
            订单信息
        </div>
        <el-divider></el-divider>
        <div class="order-info-content">
            <div class="content-row">
                <span>订单号：{{orderInfo.orderNo}}</span>
                <span>下单时间：{{orderInfo.createTime}}</span>
                <span>下单渠道：{{orderInfo.operaChannel}}</span>
            </div>
            <div class="content-row">
                <span>订单总金额：<label v-if="orderInfo.totalAmount">￥{{orderInfo.totalAmount}}</label></span>
            </div>
            <div class="content-row">
                <span>门户：{{orderInfo.portalName}}</span>

                <span>IP：{{orderInfo.sourceAddress}}</span>

                <span>浏览器：{{orderInfo.sourceBrowser}}</span>
            </div>
        </div>
        <el-table
            :data="goodsInfo"
            border
            style="width: 100%">
            <el-table-column
                prop="goodsValue"
                label="商品名称"
                width="160">
            </el-table-column>
            <el-table-column
                prop="goodsNormName"
                label="规格"
                width="150">
            </el-table-column>
            <el-table-column
                prop="quantity"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="price"
                label="单价">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="subOrderAmount"
                label="商品金额">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.subOrderAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="subDiscountAmount"
                label="商品优惠金额">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.subDiscountAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="subActualAmount"
                label="小计金额">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.subActualAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="售后状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status=='W'">待付款</span>
                    <span v-if="scope.row.status=='S'">付款成功</span>
                    <span v-if="scope.row.status=='F'">付款失败</span>
                    <span v-if="scope.row.status=='C'">付款已取消</span>
                    <span v-if="scope.row.status=='R'">退款中</span>
                    <span v-if="scope.row.status=='RS'">已退款</span>
                    <span v-if="scope.row.status=='RF'">退款失败</span>
                </template>
            </el-table-column>

        </el-table>
        <div class="order-info-footer">
            <div class="footer-item" v-if="orderInfo.actualAmount">
                <label for="" class="footer-label">小计合计：</label>
                ￥{{orderInfo.actualAmount}}
            </div>
            <div class="footer-item" v-if="orderInfo.orgDiscountAmount">
                <label for="" class="footer-label">组织优惠：</label>
                ￥{{orderInfo.orgDiscountAmount}}
            </div>
            <div class="footer-item" v-if="orderInfo.platDiscountAmount">
                <label for="" class="footer-label">平台优惠：</label>
                ￥{{orderInfo.platDiscountAmount}}
            </div>
            <div class="footer-total">
                <label for="" class="footer-total-label">订单合计{{goodsInfo.length}}件商品，应收：</label>
                <label class="footer-total-price" v-if="orderInfo.receivableAmount">￥{{orderInfo.receivableAmount}}</label>
                <span v-else>免费</span>
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
    orderInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    goodsInfo: {
      type: Object,
      default () {
        return []
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
