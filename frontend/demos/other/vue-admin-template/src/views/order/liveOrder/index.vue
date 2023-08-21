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
          <template slot="addressCodeSearchSlot"
                    >
            <el-cascader v-model="form.addressCode"
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
                     size="mini"
                     @click="exportBtn">导出</el-button>
        </div>
        <!-- <div>
                    <el-button type="primary" @click="batchClick">批量开单</el-button>
                  </div> -->
        <crud-toolbar v-bind="_crudToolbarProps"
                      v-on="_crudToolbarListeners" />
      </div>
      <template slot="orderInfoSlot"
                slot-scope="scope">
        <div>订单号：{{scope.row.orderNo}}<span style="color:#49AF4F;">【{{status.filter(res => res.dictDataValue == scope.row.status)[0].dictDataName}}】</span></div>
        <div style="display:flex">
          <el-image class="productImg"
                    :src="scope.row.goodsImg">
            <img slot="error"
                 class="productImg"
                 src="@/assets/images/default.png" />
          </el-image>
          <span class="name">{{scope.row.goodsValue}}</span>
        </div>
      </template>

      <template slot="goodsNormNameSlot"
                slot-scope="scope">
        {{scope.row.goodsNormName==-1?'无':scope.row.goodsNormName}}
      </template>

      <template slot="priceSlot"
                slot-scope="scope">
        <span v-if="scope.row.price">￥{{scope.row.price}}</span>
        <span v-else>免费</span>
      </template>
      <template slot="subActualAmountSlot"
                slot-scope="scope">
        <span v-if="scope.row.subActualAmount">￥{{scope.row.subActualAmount}}</span>
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
        <div>
          {{scope.row.paymentInfo.paymentToolType == 'null'? '' : scope.row.paymentInfo.paymentToolType}}
        </div>

      </template>
      <template slot="gmtCreateSlot"
                slot-scope="scope">
        <div>
          {{scope.row.paymentInfo.gmtCreate == 'null'? '' : scope.row.paymentInfo.gmtCreate}}
        </div>

      </template>
    </d2-crud-x>
    <detail v-if="detailShow"
            :tradeNo="tradeNo"
            @switchList="switchList"></detail>
    <el-dialog title="后台开通订单"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <span>开通后，学员将直接享受该商品权益，确认继续？</span>
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
      dialogVisible: false,
      form: {
        addressCode: '' // 省市区联动
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
      this.options = res.data
    })
    this.grtDict()
  },
  methods: {
    resetClick () { // 重置
      this.form.addressCode = ''
    },
    batchClick () {
      this.$router.push({
        path: '/order/batch_order',
        query: {
          productType: 3
        }
      })
    },
    selectArea (val) {
      this.form.addressCode = val
      const code = this.form.addressCode[this.form.addressCode.length - 1]
      this.form.addressCode = code || '' // 地址传参
      console.log('val', val)
      console.log('this.form.addressCode', this.form.addressCode)
    },
    // 取消
    cancel () {
      this.getMemberInfo()
    },
    getMemberInfo () {
      this.$api.ORG_BASE_GET().then(res => {
        this.form = res.data || {}
        // this.form.addressCode = this.form.addressCode.split(',').map(Number)
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
    backstageOpen (scope) { // 后台开通
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
      query.addressCode = this.form.addressCode

      query.tradeType = 17
      query.startTime = query.startTime ? new Date(query.startTime).getTime() : ''
      query.endTime = query.endTime ? new Date(query.endTime).getTime() : ''
      query.status = this.tabPosition == -1 ? '' : this.tabPosition
      return this.$api.getplatorgorderlist(query).then(data => {
        const newData = []
        for (let i = 0; i < data.data?.list.length; i++) {
          const listArr = data.data?.list[i]
          for (let j = 0; j < listArr.subOrderList.length; j++) {
            const subOrderArr = listArr.subOrderList[j]
            newData.push({
              ...listArr,
              ...subOrderArr
            })
          }
        }
        data.data.list = newData
        return data
      })
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
        tradeType: 17,
        status: this.tabPosition == -1 ? '' : this.tabPosition,
        pageNum: 1,
        pageSize: 999999,
        addressCode: this.form.addressCode,
        orderType: 3
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
</style>
