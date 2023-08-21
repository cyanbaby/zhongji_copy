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
        v-on="_crudListeners"
        @editCert="goEditCert"
        @goCertInfo ="goCertInfo"
        @previewCert ="certPreview"
        @synchronousData = "synchronousData"
        @delCert="delRequest"
      >
        <div slot="header">
          <crud-search
            ref="search"
            :options="crud.searchOptions"
            @submit="handleSearch"
            style="margin-bottom:10px"
          />
          <el-button
            size="small"
            type="primary"
            @click="addRow"
            style="margin-bottom:10px"
          >
          新建证书
          </el-button>
          <crud-toolbar
            v-bind="_crudToolbarProps"
            v-on="_crudToolbarListeners"
          />
        </div>
        <template slot-scope="scope" slot="certTypeSlot">
          <span v-if="scope.row.certType === 1">培训班证书</span>
          <span v-else-if="scope.row.certType === 2">专业证书</span>
          <span v-else-if="scope.row.certType === 3">年度证书</span>
          <span v-else-if="scope.row.certType === 4">普通证书</span>
        </template>
        <template slot-scope="scope" slot="statusSlot">
          <span v-if="scope.row.status === 1">启用</span>
          <span v-else-if="scope.row.status === 2">未启用</span>
        </template>
      </d2-crud-x>
      <el-dialog
        title="证书预览"
        :visible.sync="certPreviewDialog"
        width='48vw'
        :close-on-click-modal=false
        top="5vh">
        <div style="width:100%;height:600px;position:relative">
          <img :src="certPreviewInfo.certBackUrl" alt="" style="width:100%;height:100%;">
          <ul class="cert-preview" style=" display:flex;">
            <li><h2 style="text-align:center;margin-top:0;margin-bottom:10px;color:#333;font-size:22px">{{certPreviewInfo.certName}}</h2></li>
            <li style="font-size:18px" v-if="certPreviewInfo.studentNameName">{{certPreviewInfo.studentNameName}}：<span style="font-weight:bold">张三</span></li>
            <li style="font-size:18px" v-if="certPreviewInfo.sexName">{{certPreviewInfo.sexName}}：<span style="font-weight:bold">男</span></li>
            <li style="font-size:18px;margin-bottom:18px" v-if="certPreviewInfo.idCardNumName">{{certPreviewInfo.idCardNumName}}：<span style="font-weight:bold">4324848</span></li>
            <li style="font-size:16px;text-indent:24px;max-height:100px;min-height:50px;line-height:24px">{{certPreviewInfo.templateContent}}</li>
            <li style="font-size:16px" v-if="certPreviewInfo.orgNameName">
               {{certPreviewInfo.orgNameName}}：
              <span style="font-weight:bold">{{certPreviewInfo.orgName}}</span>
            </li>
            <li style="font-size:16px" v-if="certPreviewInfo.cidentifierName">{{certPreviewInfo.cidentifierName}}：<span style="font-weight:bold">XXXXXXXXXXXX</span></li>
            <li style="font-size:16px" v-if="certPreviewInfo.purchaseTimeName">{{certPreviewInfo.purchaseTimeName}}：<span style="font-weight:bold">XXXX-XX-XX</span></li>
            <li style="font-size:16px" v-if="certPreviewInfo.certGiveTimeName">{{certPreviewInfo.certGiveTimeName}}：<span style="font-weight:bold">XXXX-XX-XX</span></li>
          <!-- <ul class="cert-preview" style=" display:flex;">
            <li><h2 style="text-align:center;margin-top:0;margin-bottom:10px;color:#000;font-size:22px">{{certPreviewInfo.certName}}</h2></li>
            <li  v-for="item in certificateDisplayConfigVOS" v-if="item.status==1" :key="index" style="font-size:18px">
                {{item.displayName}}<span v-if="item.displayLabelCode!='content'">：</span>
                <span v-if="item.displayLabelCode=='content'">{{item.displayValue}}</span>
                <span v-else style="font-weight:bold" >XXXX</span>
            </li> -->
          </ul>
          <ul class="img-box">
            <li >
              <img :src="certPreviewInfo.certOfficialUrl[0]" alt="" style="width:80px;height:80px;border-radius:50%">
            </li>
            <li style="margin-left:100px;display;inline-block">
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
import { d2CrudPlus } from 'd2-crud-plus'
import { myMixin } from '@/mixins'
import vueQr from 'vue-qr'
export default {
  mixins: [d2CrudPlus.crud, myMixin],
  components: {
    vueQr
  },
  data () {
    return {
      certTypeStatus: '',
      downloadData: {
        url: 'https://static.peixunyun.cn/ed1a935935fc4148a60aa29ac4051117.jpg'
      },
      certPreviewDialog: false,
      certPreviewInfo: {
        certName: '餐厅服务员一班证书', // 证书名称.
        orgName: '继教云科技有限公司', // 组织名称.
        certBackUrl: 'https://static.peixunyun.cn/证书_1635323454268.png', // 证书背景图.
        templateContent: '通过了考试，特发此证，以资鼓励！', // 模板内容.
        certOfficialUrl: ['https://static.peixunyun.cn/继教云公章_1635323490128.png'] // 公章图1.
      },
      certificateDisplayConfigVOS: {},
      certList: [
        {
          certName: '测试证书1',
          certId: '1001',
          orgName: '继教云',
          certType: '1',
          status: 1
        },
        {
          certName: '测试证书2',
          certId: '1002',
          orgName: '继教云',
          certType: '2',
          status: 1
        },
        {
          certName: '测试证书3',
          certId: '1003',
          orgName: '继教云',
          certType: '1',
          status: 2
        },
        {
          certName: '测试证书4',
          certId: '1004',
          orgName: '继教云',
          certType: '2',
          status: 2
        },
        {
          certName: '测试证书5',
          certId: '1005',
          orgName: '继教云',
          certType: '3',
          status: 1
        }
      ]
    }
  },
  computed: {
    getBackgroundImage () {
      return {
        background: `url(${this.certPreviewInfo.certBackUrl})`
      }
    }
  },
  methods: {
    addRow () {
      this.$router.push('/certificate/edit')
    },
    goCertInfo ({ row }) {
      this.$router.push({
        path: '/certificate/yearcertdetail',
        query: {
          certId: row.certId,
          certType: row.certType
        }
      })
      // if (row.certType == 3||row.certType == 4) {

      // } else {
      //   this.$router.push({
      //     path: '/certificate/detail',
      //     query: {
      //       certId: row.certId
      //     }
      //   })
      // }
    },
    goEditCert ({ row }) {
      this.$router.push({
        path: '/certificate/edit',
        query: {
          certId: row.certId
        }
      })
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return this.$api.get_cert_list(query)
    },
    delRequest ({ row }) {
      console.log(row)
      this.$confirm('此操作将永久删除该证书模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$api.cert_delete({ certId: row.certId })
          .then(res => {
            if (res.code == 1) {
              this.doRefresh()
              this.$message.success('删除成功！')
            }
          })
      }).catch(() => {
      })
    },
    synchronousData ({ row }) { // 同步数据
      this.$confirm('同步后，所有学员的该证书内容都将更新。是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$api.SYN_CERT_IFICATE({ certId: row.certId })
          .then(res => {
            if (res.code == 1) {
              this.doRefresh()
              this.$message.success('同步成功！')
            }
          })
      }).catch(() => {
      })
    },
    async certPreview ({ row }) {
      console.log('我是预览', row)
      this.certTypeStatus = row.certType
      const { data: res } = await this.$api.cert_preview({ certId: row.certId })
      this.certPreviewInfo = res
      this.certificateDisplayConfigVOS = res.certificateDisplayConfigVOS
      this.certPreviewInfo.certOfficialUrl = this.certPreviewInfo.certOfficialUrl.split(',')
      console.log(this.certPreviewInfo)
      this.certPreviewDialog = true
    }
  }

}
</script>
<style lang="scss">
  .big-box{
    height: 100%;
    .el-dialog__body{
    padding-top:0;
    padding-bottom:0
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
