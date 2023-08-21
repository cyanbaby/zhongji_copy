<template>
  <d2-container>
    <template slot="header">
      <span class="page-title">批量开单</span>
    </template>
    <div class="container">
      <div class="labelContainer">
        <span class="label">商品类型：</span>
        <el-radio-group v-model="formData.orderType" @change="radioChange">
            <el-radio-button :label="1">课程</el-radio-button>
            <!-- <el-radio-button label="2">班级</el-radio-button>
            <el-radio-button label="3">直播</el-radio-button> -->
        </el-radio-group>
      </div>
      <div class="labelContainer">
        <span class="label">购买内容：</span>
        <div class="contentContainer">
          <content-list @getProductList="getProductList"></content-list>
        </div>
      </div>
      <div class="labelContainer">
        <span class="label">应付金额：(每笔)&nbsp;&nbsp;</span>
        <div style="display:flex;align-items: center;">
          <el-input v-model="formData.productPrice" style="width:300px;margin-right: 10px;" disabled></el-input>
          <span>元</span>
        </div>
      </div>
      <div class="labelContainer">
        <span class="label">支付方式：</span>
        <div>
          <el-radio-group v-model="formData.payType">
            <el-radio label="OFFLINE_PAYMENT">线下支付</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="labelContainer">
        <span class="label">购买用户：</span>
        <div class="contentContainer">
          <user-list @getUserInfoList="getUserInfoList" @getImputUserList="getImputUserList"></user-list>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" style="margin-bottom:15px;"
      :disabled="formData.productList.length==0||(formData.userInfoList.length==0&&formData.imputUserList.length==0)"
      @click="confirmBilling"
      :loading="submitLoading"
      >确认开单</el-button>
    </div>
  </d2-container>
</template>
<script>
import ContentList from './components/ContentList.vue'
import UserList from './components/UserList.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    ContentList,
    UserList
  },
  data () {
    return {
      formData: {
        orderType: 1,
        productList: [],
        productPrice: 0,
        payType: 'OFFLINE_PAYMENT',
        userInfoList: [], // 已经存在的用户
        imputUserList: []// 导入并且不存在的用户
      },
      submitLoading: false
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    radioChange () {},
    getProductList (val) { // 购买内容表格数据实时监听
      this.formData.productList = val
      this.formData.productPrice = 0
      if (val.length > 0) {
        val.forEach(ele => {
          this.formData.productPrice = (parseFloat(this.formData.productPrice) + parseFloat(ele.productPrice)).toFixed(2)
        })
      }
    },
    getUserInfoList (val) {
      this.formData.userInfoList = val
    },
    getImputUserList (val) {
      this.formData.imputUserList = val
    },
    confirmBilling () {
      this.submitLoading = true
      this.$api.BATCH_ORDER({
        ...this.formData
      }).then(res => {
        if (res.code == '1') {
          this.$message({
            message: '批量开单处理中，请在2分钟后前往任务中心查看开单执行结果',
            type: 'success'
          })
          this.submitLoading = false
          const tagName = this.$route.fullPath
          this.close({ tagName }).then(item => { this.$router.push({ path: '/order/course_order' }) })
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
          this.submitLoading = false
        }
      }).catch(() => {
        this.submitLoading = false
      })
    }
  }
}
</script>
<style  scoped lang="scss">
.container{
  padding: 20px;
  margin-bottom: 20px;
}
.labelContainer{
  margin-bottom: 30px;
  display: flex;
  // align-items: center;
}
.label{
  width: 80px;
  margin-right: 10px;
  text-align: center;
  flex-shrink: 0;
}
.contentContainer{
  width: 90%;
}
.footer{
  background: #fff;
  border-top: 1px solid #D8D8D8;
  width: 90.5vw;
  height: 60px;
  line-height: 60px;
  position: fixed;
  bottom: 11px;
  left: 171px;
  text-align: center;
  z-index: 999;
}
</style>
