<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">{{this.$route.meta.title}}</span>
      <d2-helper title='帮助文档'>
        <div>
          <d2-link-btn title='文档链接' link='http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html' />
        </div>
      </d2-helper>
    </template>
    <div style="height:100%">
      <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @certificationDialogBtn='certificationDialogBtn'>
        <div slot="header">
          <crud-search ref="search" :options="crud.searchOptions" style="display: inline;" @submit="handleSearch"/>
          <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
        </div>
        <template slot-scope="scope" slot="standingCommitteeNameSlot">
          <span v-if="scope.row.standingCommitteeName">常务委员会{{scope.row.standingCommitteeName}}</span>
          <span v-else>/</span>
        </template>
        <template slot-scope="scope" slot="majorNameSlot">
          <span v-if="scope.row.majorName&&scope.row.professionalCommitteeName">{{scope.row.majorName}}{{scope.row.professionalCommitteeName}}</span>
          <span v-else>/</span>
        </template>
        <template slot-scope="scope" slot="corporateTransferImgSlot">
          <el-image
            v-if="scope.row.corporateTransferImg"
            style="width: 100px;height: 40px; "
            :src="scope.row.corporateTransferImg"
            :preview-src-list="srcList"
            @click="vbs(scope.row.corporateTransferImg)"
            >
          </el-image>
        </template>
        <template slot-scope="scope" slot="certPdfSlot">
          <el-link type="primary" :underline="false" :href="scope.row.standingCommitteeCertPdf" target="_blank" v-if="scope.row.standingCommitteeCertPdf">常务委员会证书</el-link>
          <el-link v-if="scope.row.standingCommitteeCertPdf&&scope.row.professionalCommitteeCertPdf">、</el-link>
          <el-link type="primary" :underline="false" :href="scope.row.professionalCommitteeCertPdf" target="_blank" v-if="scope.row.professionalCommitteeCertPdf">专业委员会证书</el-link>
        </template>
      </d2-crud-x>
    </div>
    <el-dialog
      title="选择证书类型"
      :visible.sync="certTypeDialog"
      width="30%"
    >
    <el-select v-model="certInfo" placeholder="请选择证书类型" style="width:100%;" value-key="certId">
      <el-option
        v-for="item in certOptions"
        :key="item.certId"
        :label="item.certName"
        :value="item"
        >
      </el-option>
    </el-select>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="certificationBtn">发放证书</el-button>
      </div>
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
      certTypeDialog: false,
      certOptions: [],
      certInfo: {},
      clUserSignupId: '',
      srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg']
    }
  },
  mounted () {
  },
  methods: {
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.signupType = 1
      return this.$api.PAGE_QUERY_SIGNUP_INFO(query)
    },
    // 发证弹窗
    certificationDialogBtn ({ row }) {
      this.clUserSignupId = row.clUserSignupId
      this.$api.QUERY_USER_CERT({
        clUserSignupId: row.clUserSignupId
      }).then(res => {
        this.certInfo = {}
        this.certOptions = res.data
        this.certTypeDialog = true
      })
    },
    // 发放证书
    certificationBtn () {
      this.$api.CREATE_USER_CERT({
        clUserSignupId: this.clUserSignupId,
        ...this.certInfo
      }).then(res => {
        if (res.code == '1') {
          this.$message({
            message: '证书发放成功！',
            type: 'success'
          })
          this.certTypeDialog = false
          this.doRefresh()
        }
      })
    },
    // 预览原图
    vbs (val) {
      this.srcList = []
      this.srcList.push(val)
    }
  }
}

</script>
<style lang="scss">
  .fileIcon {
    width: 15px;
    height: 15px;
    float: left
  }

</style>
