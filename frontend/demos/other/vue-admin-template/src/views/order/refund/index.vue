<!--
 * @Date: 2021-02-20 15:27:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 16:23:36
 * @FilePath: \p-front-admin\src\views\join\plane\index.vue
-->
<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
      <template slot="header" v-if="!detailShow">
          <span class="page-title">{{$route.meta.title}}</span>
          <d2-helper title="帮助文档">
              <div>
                  <d2-link-btn title="文档链接"
                      link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html" />
              </div>
          </d2-helper>
      </template>
          <d2-crud-x ref="d2Crud" v-if="!detailShow" v-bind="_crudProps" v-on="_crudListeners"  @doRefund="doRefund">
              <div slot="header">
                  <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @reset="resetClick">
                  </crud-search>
                  <div class="peculiar" style="margin-bottom: 10px;">
                      <el-radio-group v-model="tabPosition" @change="statusQuery">
                          <el-radio-button :label="-1">
                              全部
                          </el-radio-button>
                          <el-radio-button :label="1">
                              待处理
                          </el-radio-button>
                          <el-radio-button :label="3">
                              已拒绝
                          </el-radio-button>
                          <el-radio-button :label="2">
                              退款成功
                          </el-radio-button>

                      </el-radio-group>
                      <el-button type="primary" style="float:right;" size="mini" @click="exportBtn">导出</el-button>
                  </div>
                  <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
              </div>
              <template
                  slot="orderInfoSlot"
                  slot-scope="scope"
              >
                  <div style="display:flex">
                      <el-image class="productImg" :src="scope.row.goodsImg">
                          <img slot="error" class="productImg" src="@/assets/images/default.png" />
                      </el-image>
                      <span class="name">{{scope.row.goodsValue}}</span>
                  </div>
              </template>
              <template
                  slot="buyerSlot"
                  slot-scope="scope"
              >
                  <div>{{scope.row.buyerName}}</div>
                  <div>{{scope.row.buyerMobile}}</div>
              </template>
              <template
                  slot="refundActualAmountSlot"
                  slot-scope="scope"
              >
                  <div v-if="scope.row.auditStatus!=3">{{scope.row.refundActualAmount}}</div>
              </template>
          </d2-crud-x>
        <el-dialog
          title="退款处理"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="退款管理" prop="auditStatus">
              <el-radio-group v-model="ruleForm.auditStatus">
                <el-radio :label="2">通过</el-radio>
                <el-radio :label="3">拒绝</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="申请退款金额" prop="refundAmount">
              <el-input v-model="ruleForm.refundAmount" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="ruleForm.auditStatus == 2" label="实际退款金额" prop="refundActualAmount">
              <el-input type="number" v-model="ruleForm.refundActualAmount"></el-input>
            </el-form-item>
            <el-form-item label="退款备注" prop="auditRemark">
              <el-input type="textarea" v-model="ruleForm.auditRemark"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitRefund">提 交</el-button>
          </span>
        </el-dialog>
    </d2-container>
</template>

<script>
import {
  crudOptions
} from './crud'
import {
  d2CrudPlus
} from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      ruleForm: {},
      dialogVisible: false,
      form: {
        addressCode: '' // 省市区联动
      },
      props: {
        value: 'areaCode',
        label: 'name',
        checkStrictly: true
      },
      rules: {
        auditStatus: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        refundActualAmount: [
          { required: true, message: '请输入实际退款金额', trigger: 'blur' }
        ]
      },
      auditStatus: [],
      tabPosition: -1,
      detailShow: false
    }
  },
  mounted () {
  },
  methods: {
    resetClick () { // 重置
      this.form.addressCode = ''
    },
    // 状态查询
    statusQuery (val) {
      this.tabPosition = val
      this.handleSearch({
        ...this.getSearch().getForm(),
        auditStatus: val == -1 ? '' : val
      })
    },
    doRefund (scope) {
      this.dialogVisible = true
      this.ruleForm.subTradeRefundRecordId = scope.row.subOrderRefundRecordId
      this.ruleForm.refundAmount = scope.row.refundAmount
    },
    addRequest (row) {
      return this.$api.EXAM_POINT_ADD(row)
    },

    getCrudOptions () {
      return crudOptions(this)
    },

    pageRequest (query) {
      query.pageSize = 10
      query.startTime = query.startTime ? new Date(query.startTime).getTime() : ''
      query.endTime = query.endTime ? new Date(query.endTime).getTime() : ''
      return this.$api.queryplatorderrefundrecord(query)
    },
    getSearch () {
      return this.$refs[this.crud.format.ref.search]
    },
    exportBtn () {
      const searchData = this.getSearch().getForm()
      searchData.startTime = searchData.startTime ? new Date(searchData.startTime).getTime() : ''
      searchData.endTime = searchData.endTime ? new Date(searchData.endTime).getTime() : ''
      this.$api.exportplatorderrefundrecord({
        ...searchData,
        auditStatus: this.tabPosition == -1 ? '' : this.tabPosition,
        pageNum: 1,
        pageSize: 999999
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
    },
    submitRefund () {
      this.$api.auditplatorderrefundrecord({
        ...this.ruleForm
      }).then(res => {
        this.dialogVisible = false
        this.$message({
          message: '退款成功！',
          type: 'success'
        })
        this.handleSearch()
      })
    }
  }
}

</script>

<style lang="scss">

    .productImg .el-image__inner {
        object-fit: cover;
    }

    .name{
        margin-left: 5px;
    }

    .productImg {
        width: 70px;
        height: 40px;
        flex-shrink: 0;
    }
</style>
