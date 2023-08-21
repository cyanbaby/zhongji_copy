<template>
    <d2-container>
        <template slot="header">
            <span class="page-title">{{this.$route.meta.title}}</span>
            <d2-helper title="帮助文档">
                <div>
                <d2-link-btn
                    title="文档链接"
                    link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
                />
                </div>
            </d2-helper>
        </template>
        <h4>商品总览</h4>
        <div class="head_1">
            <div class="row_1">
                <span class="specific">
                    <img src="@/assets/images/course.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">在售课程</span>
                    <span v-if="courseInfo.productPayNum>=0&&courseInfo.productFreeNum>=0">{{courseInfo.productPayNum+courseInfo.productFreeNum}}</span>
                    </span>
                </span>
                <span class="specific">
                    <img src="@/assets/images/course.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">付费课程</span>
                    <span>{{courseInfo.productPayNum}}</span>
                    </span>
                </span>
                <span class="specific">
                    <img src="@/assets/images/course.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">免费课程</span>
                    <span>{{courseInfo.productFreeNum}}</span>
                    </span>
                </span>
            </div>
            <div class="row_1">
                <span class="specific">
                    <img src="@/assets/images/class.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">在售班级</span>
                    <span v-if="classInfo.classFreeNum>=0&&classInfo.classPayNum>=0">{{classInfo.classFreeNum+classInfo.classPayNum}}</span>
                    </span>
                </span>
                <span class="specific">
                    <img src="@/assets/images/class.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">付费班级</span>
                    <span>{{classInfo.classPayNum}}</span>
                    </span>
                </span>
                <span class="specific">
                    <img src="@/assets/images/class.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">免费班级</span>
                    <span>{{classInfo.classFreeNum}}</span>
                    </span>
                </span>
            </div>
            <div class="row_1">
                <span class="specific">
                    <img src="@/assets/images/live.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">在售直播</span>
                    <span v-if="liveInfo.livePayNum>=0&&liveInfo.liveFreeNum>=0">{{liveInfo.livePayNum+liveInfo.liveFreeNum}}</span>
                    </span>
                </span>
                <span class="specific">
                    <img src="@/assets/images/live.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">付费直播</span>
                    <span>{{liveInfo.livePayNum}}</span>
                    </span>
                </span>
                <span class="specific">
                    <img src="@/assets/images/live.png" style="width:40px;height:40px;margin-right:10px;"/>
                    <span class="specific_right">
                    <span class="text_description">免费直播</span>
                    <span>{{liveInfo.liveFreeNum}}</span>
                    </span>
                </span>
            </div>
        </div>
        <div style="display:flex;">
            <el-card class="box-card" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <strong>课程销量top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordersaleData.course" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="课程名称" width="180">
                            </el-table-column>
                            <el-table-column prop="salesCount" label="销量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;margin-left:10px">
                <div slot="header" class="clearfix">
                    <strong>课程营业额top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordertransactionData.course" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="课程名称" width="180">
                            </el-table-column>
                            <el-table-column prop="transactionCount" label="营业额">
                            <template slot-scope="scope">
                                {{scope.row.transactionCount}}元
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
        </div>
        <div style="display:flex;">
            <el-card class="box-card" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <strong>直播销量top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordersaleData.live" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="直播名称" width="180">
                            </el-table-column>
                            <el-table-column prop="salesCount" label="销量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;margin-left:10px">
                <div slot="header" class="clearfix">
                    <strong>直播营业额top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordertransactionData.live" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="直播名称" width="180">
                            </el-table-column>
                            <el-table-column prop="transactionCount" label="营业额">
                            <template slot-scope="scope">
                                {{scope.row.transactionCount}}元
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
        </div>
        <div style="display:flex;">
            <el-card class="box-card" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <strong>班级销量top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordersaleData.class" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="班级名称" width="180">
                            </el-table-column>
                            <el-table-column prop="salesCount" label="销量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;margin-left:10px">
                <div slot="header" class="clearfix">
                    <strong>班级营业额top10排行</strong>
                </div>
                <div class="text item" style="display:flex">
                    <div>
                        <el-table :data="ordertransactionData.class" border style="width: 100%">
                            <el-table-column type="index" label="排名" width="180">
                            </el-table-column>
                            <el-table-column prop="goodsValue" label="班级名称" width="180">
                            </el-table-column>
                            <el-table-column prop="transactionCount" label="营业额">
                            <template slot-scope="scope">
                                {{scope.row.transactionCount}}元
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
        </div>
    </d2-container>
</template>
<script>
export default {
  data () {
    return {
      classInfo: {},
      courseInfo: {},
      liveInfo: {},
      ordersaleData: [],
      ordertransactionData: []
    }
  },
  created () {
    this.$api.SIGNUP_CLASS_SUM().then(res => {
      this.classInfo = res.data
    })
    this.$api.PROD_NORM_SUM_INFO().then(res => {
      this.courseInfo = res.data
    })
    this.$api.LIVE_SUM().then(res => {
      this.liveInfo = res.data
    })
    this.querySalesData()
    this.queryTurnoverData()
  },
  methods: {
    querySalesData () {
      this.$api.getordersalestop({
        goodsCategory: '0'
      }).then(({
        data
      }) => {
        this.ordersaleData = data
      })
    },
    queryTurnoverData () {
      this.$api.getordertransactiontop({
        goodsCategory: '0'
      }).then(({
        data
      }) => {
        this.ordertransactionData = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .head_1{
        margin-left: 20px;
        .row_1{
            display: flex;
            margin-bottom: 30px;
            .specific{
                display: flex;
                align-items: center;
                margin-right: 150px;
                .specific_right{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 90%;
                    font-size: 14px;
                    .text_description{
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
