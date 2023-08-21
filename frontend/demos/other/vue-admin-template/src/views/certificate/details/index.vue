<template>
<d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
 <template slot="header">
      <span class="page-title">{{$route.meta.title}}</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper>
    </template>
   <div class="big-box">

      <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        style="height:80vh;margin-top:10px"
        v-on="_crudListeners"
        @previewCert="certPreview"
        @auditCert="auditCert"
      >
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
       <el-radio-group v-model="certStatus" size="small" @change="getCertListByStatus">
          <el-radio-button label=""  >全部</el-radio-button>
          <el-radio-button label="0" >待打印</el-radio-button>
          <el-radio-button label="1" >已打印</el-radio-button>
       </el-radio-group>
        <crud-toolbar
          v-bind="_crudToolbarProps"
          v-on="_crudToolbarListeners"
        />
      </div>
      <template slot-scope="scope" slot="applyStatusSlot">
        <span v-if="scope.row.applyStatus === '5' ">已打印</span>
        <span v-else>待打印</span>
      </template>
       <template slot-scope="scope" slot="applyTimeSlot">
        <span>{{scope.row.applyTime}}</span>
      </template>
       <template slot-scope="scope" slot="certPrintTimeSlot">
        <span>{{scope.row.certPrintTime}}</span>
      </template>
    </d2-crud-x>
    <el-dialog
      title="证书预览"
      :visible.sync="certPreviewDialog"
      width='48vw'
      :close-on-click-modal=false
      top="5vh">
      <div style="width:100%;height:600px;position:relative">
        <img :src="certPreviewInfo.certBackUrl" alt="" style="width:100%;height:100%">
        <ul class="cert-preview">
           <li><h2 style="text-align:center;margin-bottom:10px;margin-top:0;color:red">{{certPreviewInfo.certName}}</h2></li>
          <li style="font-size:18px">姓名：<span style="font-weight:bold">{{certPreviewInfo.studentName}}</span></li>
          <li style="font-size:18px">性别：<span style="font-weight:bold">{{certPreviewInfo.sex}}</span></li>
          <li style="font-size:18px">身份证号码：<span style="font-weight:bold">{{certPreviewInfo.idCardNum}}</span></li>
          <li style="font-size:16px;text-indent:24px;max-height:100px;min-height:50px;line-height:24px">{{certPreviewInfo.templateContent}}</li>
          <li style="font-size:16px">施教机构：<span style="font-weight:bold">{{certPreviewInfo.orgName}}</span></li>
          <li style="font-size:16px">证书编码：<span style="font-weight:bold">{{certPreviewInfo.cidentifier}}</span></li>
          <li style="font-size:16px">购课时间：<span style="font-weight:bold">{{certPreviewInfo.purchaseTime}}</span></li>
          <li style="font-size:16px">发证时间：<span style="font-weight:bold">{{certPreviewInfo.certGiveTime}}</span></li>
        </ul>
        <ul class="img-box">
          <li>
             <img :src="certPreviewInfo.certOfficialUrl1" alt="" style="width:80px;height:80px;border-radius:50%">
          </li>
          <li style="margin-bottom:5px">
             <vue-qr
             :text="downloadData.url"
             :margin="5"
             colorDark="#000"
             colorLight="#fff"
             :dotScale="1"
             :logoScale="0.2"
             :size="85"></vue-qr>
          </li>
        </ul>
      </div>

    </el-dialog>
  </div>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import vueQr from 'vue-qr'
import { d2CrudPlus } from 'd2-crud-plus'
import { myMixin } from '@/mixins'
export default {
  mixins: [d2CrudPlus.crud, myMixin],
  components: {
    vueQr
  },
  data () {
    return {
      downloadData: {
        url: 'https://static.peixunyun.cn/ed1a935935fc4148a60aa29ac4051117.jpg'
      },
      certPreviewDialog: false,
      certPreviewInfo: {
        certName: '餐厅服务员一班证书', // 证书名称.
        orgName: '继教云科技有限公司', // 组织名称.
        certBackUrl: 'https://static.peixunyun.cn/证书_1635323454268.png', // 证书背景图.
        templateContent: '通过了考试，特发此证，以资鼓励！', // 模板内容.
        certOfficialUrl: ['https://static.peixunyun.cn/ed1a935935fc4148a60aa29ac4051117.jpg'] // 公章图1.
      },

      certStatus: ''
    }
  },
  computed: {
    getBackgroundImage () {
      return {
        'background-image': `url(${this.certPreviewInfo.certBackUrl})`
      }
    }
  },
  created () {

  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    getCertListByStatus () {
      this.doRefresh()
    },
    pageRequest (query) {
      console.log('-------------', query)
      query.certId = this.$route.query.certId
      query.applyStatus = this.certStatus
      return this.$api.get_cert_user_list(query)
    },
    async certPreview ({ row }) {
      this.certPreviewDialog = true
      const { data: res } = await this.$api.MYCERT_DETAIL({
        ucId: row.ucId
        // ucId: '10',
        // certType: 1
      })
      this.certPreviewInfo = res
      this.certPreviewInfo.certOfficialUrl = this.certPreviewInfo.certOfficialUrl.split(',')
      console.log(this.certPreviewInfo)
    }
  }
}
</script>
<style lang="scss" >
  .big-box{
    .el-dialog__body{
    padding-top:0;
    }
  }
</style>
<style lang="scss" scoped>
  .img-box{
   position:absolute;
    display:flex;
    align-items:flex-end;
    width:270px;
    justify-content:space-between;
    bottom:90px;
    right:7.5vw;
  }
  .cert-preview{
    display:flex;
    flex-direction:column;
    position: absolute;
    z-index:1;
    width:60%;
    top:110px;
    left:0;
    bottom:0;
    right:0;
    margin: 0 auto;
    >li{
      margin-bottom:15px;
       display:inline-block;
    }
  }
</style>
