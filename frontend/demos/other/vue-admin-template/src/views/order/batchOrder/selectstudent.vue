<template>
 <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
 <template slot="header">
      <div  class="header-close">
          <span class="page-title">选择学员</span>
           <i class="el-icon-close" @click="closeClick"></i>
      </div>
    </template>
   <div class="big-box">
      <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        style="height:70vh;margin-top:10px"
        v-on="_crudListeners"
        @selection-change="handleSelectionChange"
        @addVipmember="addVipmember"
      >
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        >
          <template slot="addressCodeSearchSlot">
              <el-cascader
                v-model="form.addressCode"
                style="width:100%"
                :options="options"
                :props="props"
                placeholder="请选择地址"
                @change="selectArea"
              />
          </template>
        </crud-search>
      </div>
    </d2-crud-x>
    <div style="margin: 10px;text-align: right;">
      <el-button
        type="primary"
        @click="batchAudit"
      >
        确认
      </el-button>
    </div>
  </div>
   </d2-container>
</template>

<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
// import vueQr from 'vue-qr'
import { d2CrudPlus } from 'd2-crud-plus'
import { myMixin } from '@/mixins'
export default {
  mixins: [d2CrudPlus.crud, myMixin],
  components: {
  },
  data () {
    return {
      form: {
        addressCode: '' // 省市区联动
      },
      props: {
        value: 'areaCode',
        label: 'name'
      },
      options: [],

      dialogMember: false,
      certStatus: '',
      // 审核结果
      auditStatus: 0,
      // 审核通过/不通过原因
      auditResult: '',
      textarea: '',
      // 是否是批量审核
      isBatchAudit: false,
      ucIds: [],
      ucId: '',
      auditStudentInfo: {
        // 班级内课程
        classCourseList: [
          {
            courseName: '',
            classHour: 0
          }
        ],
        // 单独课程
        courseList: [
          {
            courseName: '',
            classHour: 0
          }
        ],
        applyTime: '',
        auditTime: '',
        auditStatus: 2,
        major: '',
        auditResult: ''
      }
    }
  },
  computed: {
  },
  created () {
    this.getMemberInfo()
  },
  mounted () {
    this.$api.CITY_GET().then(res => {
      this.options = res.data
    })
  },
  methods: {
    selectArea (val) {
      this.form.addressCode = val
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
    closeClick () { // 关闭
      window.history.go(-1)
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    getCertListByStatus () {
      this.doRefresh()
    },
    pageRequest (query) {
      console.log('-------------', query)
      const code = this.form.addressCode[this.form.addressCode.length - 1]
      query.addressCode = code || '' // 地址传参

      query.certId = this.$route.query.certId

      return this.$api.get_cert_user_list(query)
    },
    batchAudit () {
      if (this.ucIds.length > 0) {
        this.$api.SUBMIT_AUDIT_RESULT({
          ucIds: this.ucIds
        }).then(res => {
          if (res.code == 1) {
            this.$message.success('操作成功')
            setTimeout(() => {
              window.history.go(-1)
            }, 500)
          }
        })
      } else {
        this.$message.warning('请先选择学员')
      }
    },
    handleSelectionChange (arg) {
      const ucIdArr = []
      arg.forEach(item => {
        ucIdArr.push(item.ucId)
      })
      this.ucIds = ucIdArr
    }

  }
}
</script>
<style lang="scss" >
  .big-box{
    .el-dialog__body{
      padding-bottom:0
    }
    .el-dialog__header{
   border-bottom:2px #f2f2f2 solid;
   padding-bottom:15px;
   padding-top:15px;
    }
  }
</style>
<style lang="scss" scoped>
  .header-close{
    display: flex;
    justify-content: space-between;
    .el-icon-close{
      font-size: 30px;
      cursor: pointer;
    }
  }
  .img-box{
   position:absolute;
    display:flex;
    align-items:flex-end;
    width:270px;
    justify-content:space-between;
    bottom:90px;
    right:7.5vw;
  }
  .applyInfo-box{
    font-size: 15px;
    margin-top:20px;
    width: 100%;
    display:flex;
    flex-direction:column;
    margin-left:5px;
    li{
      margin-bottom:40px;
      h4{
        display:inline-block;
        margin:0;
      }
    }
    li:first-child,li:last-child{
      display:flex;
      flex-direction:row;
    }
    li:nth-child(2){
      display:flex;
      flex-direction:row;
    }
    li:nth-child(3){
      display:flex;
      flex-direction:row;
      div{
        margin-bottom:15px;
      }
      div:last-child{
        margin-bottom:0;
      }
    };
  }
</style>
