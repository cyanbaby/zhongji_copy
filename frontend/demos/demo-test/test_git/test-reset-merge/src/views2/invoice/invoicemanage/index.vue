<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
        <template slot='header'>
            <span class='page-title'>{{this.$route.meta.title}}</span>
            <d2-helper title='帮助文档'>
                <div>
                    <d2-link-btn
                    title='文档链接'
                    link='http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html'
                    />
                </div>
            </d2-helper>
        </template>
        <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        style="width:100%"
        @drawBtn="drawBtn"
        @exportBtn="exportBtn"
        @pagination-current-change="currentPage"
        >
            <div slot="header">
                <crud-search
                ref="search"
                :options="crud.searchOptions"
                @submit="handleSearch"
                @reset="resetClick"
                style="display: inline;"
                >
                  <template slot="addressCodeSearchSlot">
                      <el-cascader
                        ref="cascader"
                        v-model="form.addressCode"
                        style="width:100%"
                        :options="options"
                        :props="props"
                        placeholder="请选择地址"
                        @change="selectArea"
                      />
                  </template>
                </crud-search>
                <el-button
                style="float:right;"
                size="small"
                @click="exportBtn"
                >导出
                </el-button>
            </div>
        </d2-crud-x>
        <div>
        <el-dialog title="开具发票" :visible.sync="dialogVisible" :close-on-click-modal="false">
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="133px"
            label-position="left">
            <el-form-item label="待开票金额">
              <span>￥{{amount}}</span>
            </el-form-item>
            <el-form-item label="开票方式" prop="invoiceWay">
              <el-radio-group v-model="formData.invoiceWay" size="medium">
                <el-radio v-for="(item, index) in billingMethod" :key="index" :label="item.value"
                  :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="handelConfirm">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </d2-container>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      dialogVisible: false,
      formData: {
        orderInvoiceId: '',
        invoiceWay: 1
      },
      billingMethod: [{
        label: '线下开票',
        value: 1
      }],
      pageNum: '',
      amount: '',
      form: {
      	addressCode: '', // 省市区联动
      	level: ''
      },
      props: {
        value: 'areaCode',
        label: 'name',
        checkStrictly: true
      },
      options: []
    }
  },
  created () {
    // this.getMemberInfo()
  },
  mounted () {
  	this.$api.GET_USER_AREA().then(res => {
  	  this.options = res.data
  	})
  },
  methods: {
    resetClick () {
      this.form.addressCode = ''
      this.form.level = ''
    },
    selectArea (val) {
    	this.$nextTick(() => {
    		this.form.level = this.$refs.cascader.getCheckedNodes()[0].data.level
    	})
    	this.form.addressCode = val
    	const code = this.form.addressCode[this.form.addressCode.length - 1]
    	this.form.addressCode = code || '' // 地址传参
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
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.addressCode = this.form.addressCode ? this.form.addressCode : '' // 地址传参
      query.level = this.form.level
      query.buyerName = query.studentName
      return this.$api.PAGE_QUERY_ORDER_INVOICE(query)
    },
    // 开具发票
    drawBtn ({ row }) {
      this.amount = row.amount
      this.formData.orderInvoiceId = row.orderInvoiceId
      this.dialogVisible = true
    },
    // 确定开具发票
    handelConfirm () {
      this.$api.ISSUE_INVOICE({
        ...this.formData
      }).then(() => {
        this.dialogVisible = false
        this.doRefresh()
        this.$message({
          message: '发票开具成功！',
          type: 'success'
        })
      })
    },
    getSearch () {
      return this.$refs[this.crud.format.ref.search]
    },
    exportBtn () {
      const searchData = this.getSearch().getForm()
      this.$api.EXPORT_INVOICE_ORDER({
        ...searchData,
        pageNum: 1,
        pageSize: 999999,
        addressCode: this.form.addressCode,
        level: this.form.level
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
