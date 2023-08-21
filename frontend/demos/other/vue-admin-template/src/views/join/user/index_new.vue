<!--
 * @Date: 2021-02-20 15:27:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 16:20:42
 * @FilePath: \o-front-admin\src\views\join\user\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">{{this.$route.meta.title}}</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn title="文档链接"
                       link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html" />
        </div>
      </d2-helper>
    </template>
    <d2-crud-x ref="d2Crud"
               v-bind="_crudProps"
               v-on="_crudListeners"
               @audit="audit">
      <div slot="header">
        <div style="padding: 10px 0 20px; font-weight:bold;color:#000">截止{{nowtimes}}，已报名{{signUpSum}}人，其中审核通过{{auditedSum}}人，审核不通过{{unauditedSum}}人，待审核人数{{auditingSum}}人。</div>
        <crud-search ref="search"
                     :options="crud.searchOptions"
                     @submit="handleSearch" />
        <!-- <el-button
          type="primary"
          size="mini"
          :disabled="!multipleSelection || multipleSelection.length == 0"
          @click="sendMsg"
        >
          发送消息
        </el-button> -->
        <crud-toolbar v-bind="_crudToolbarProps"
                      v-on="_crudToolbarListeners" />
      </div>
      <!-- <template slot="positionIdSlot"
                slot-scope="scope">
        <span v-for="item in scope.row.positionVOList"
              :key="item.positionId"
              style="margin-left:5px">
          {{ scope.row }}
        </span>
        {{scope.row.positionVOList}}
      </template> -->
      <template slot="auditMsgStatusSlot"
                slot-scope="scope">
        <el-tag v-if="scope.row.auditMsgStatus == 1">未发送</el-tag>
        <el-tag v-if="scope.row.auditMsgStatus == 2">发送中</el-tag>
        <el-tag v-if="scope.row.auditMsgStatus == 3">成功</el-tag>
        <el-tooltip class="item"
                    v-if="scope.row.auditMsgStatus == 4"
                    effect="dark"
                    :content="scope.row.auditMsgErrmsg"
                    placement="right">
          <el-tag type="danger">失败</el-tag>
        </el-tooltip>
      </template>
    </d2-crud-x>
    <!-- 发送消息模板 -->
    <el-dialog title="短信模板配置"
               :visible.sync="visible"
               :close-on-click-modal=false
               width="800"
               height="500">
      <el-form ref="form"
               :model="form"
               style="width:400px"
               label-width="100px">
        <el-form-item label="发送方式:">
          <el-radio-group v-model="form.noticeChannel">
            <el-radio label="1">
              短信
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择通道:">
          <el-select v-model="form.basisId"
                     placeholder="请选择通道">
            <el-option v-for="item in channelList"
                       :key="item.basisId"
                       :label="item.basisName"
                       :value="item.basisId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择短信模板:">
          <el-select v-model="form.smsTemplateId"
                     placeholder="请选择模板"
                     @change="selectChange">
            <el-option v-for="item in smsTempList"
                       :key="item.smsTemplateId"
                       :label="item.smsTemplateName"
                       :value="item.smsTemplateId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板内容:">
          <!-- 根据下拉选型动态赋值，仅预览 -->
          <el-input v-model="form.templateContent"
                    type="textarea"
                    disabled
                    rows="5" />
        </el-form-item>
        <p style="font-size:12px;color:red;margin-left:100px">
          发送完成后可在考试完成分类里查看发送消息记录
        </p>
      </el-form>
      <div slot="footer">
        <el-button type="text"
                   @click="visible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="sureSend()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud_new'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
export default {
  name: 'User',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      roleList: [],
      checkedRoleIds: [],
      dialogPermissionVisible: false,
      currentUserId: undefined,
      userName: '',
      idCardNum: '',
      positionId: '',
      auditStatus: '',
      form: {
        noticeChannel: '1', // 发送方式
        basisId: '', // 通道
        smsTemplateId: '', // 短信
        templateContent: '' //  模板内容
      },
      visible: false, // 显示发送模板选择
      msgTempList: [], // 短信模板列表
      channelList: [],
      smsTempList: [],

      nowtimes: '', // 现在时间
      signUpSum: '', // 报名总数
      auditedSum: '', // 通过人数
      unauditedSum: '', // 未通过人数
      auditingSum: ''// 待审核人数
    }
  },
  created () {
    this.defaultForm = JSON.parse(JSON.stringify(this.form))
    this.$api.QUERY_AUDIT_COUNT({
      activityId: this.$route.query.activityId
    }).then((res) => {
      var nowdate = new Date()
      var year = nowdate.getFullYear()
      var month = nowdate.getMonth() + 1
      var date = nowdate.getDate()
      var day = nowdate.getDay()
      var h = nowdate.getHours()
      var m = nowdate.getMinutes()
      var s = nowdate.getSeconds()
      var h = this.checkTime(h)
      var m = this.checkTime(m)
      var s = this.checkTime(s)
      this.nowtimes = year + '年' + month + '月' + date + '日' + ' ' + h + ':' + m
      this.signUpSum = res.data.signUpSum, // 报名总数
      this.auditedSum = res.data.auditedSum, // 通过人数
      this.unauditedSum = res.data.unauditedSum, // 未通过人数
      this.auditingSum = res.data.auditingSum// 待审核人数
    })
  },
  // crud暴露的方法，mixin混入的方法，当前组件优先:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/expose.html
  methods: {
    checkTime (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    // 审核报名人
    audit ({ row }) {
      const searchData = this.getSearch().getForm()
      api.GetListKao({
        pageSize: 1000,
        pageNum: 1,
        activityId: this.$route.query.activityId,
        ...searchData
      }).then(res => {
        var recordIds = []
        recordIds = res.data.list.map(item => item.recordId)
        localStorage.setItem('recordIds', JSON.stringify(recordIds))
        this.$router.push({
          path: '/join/user/audit',
          query: {
            activityId: this.$route.query.activityId,
            positionId: row.positionId,
            recordId: row.recordId,
            auditStatus: row.auditStatus
          }
        })
      })
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      if (query.data) {
        this.userName = query.data.userName
        this.idCardNum = query.data.idCardNum
        this.positionId = query.data.positionId
        this.auditStatus = query.data.auditStatus
      }
      query.activityId = this.$route.query.activityId
      return api.GetListKao(query)
    },
    // 发送消息模板选择
    sendMsg () {
      this.visible = true
      this.refreshData()
    },
    async refreshData () {
      /* const { data } = await this.$api.MSG_TEMP_GET({
        pageSize: 50,
        pageNum: 1
      })
      this.mailTempList = data */
      const res = await this.$api.channelAndSmsTemps({})
      this.smsTempList = res.data.smsTemplateList// 模板
      this.channelList = res.data.basisConfigList// 通道
      if (this.channelList.length == 1) {
        this.form.basisId = this.channelList[0].basisId
      }
      /* this.resetSelected() */
    },
    selectChange () {
      this.smsTempList.forEach(item => {
        if (this.form.smsTemplateId == item.smsTemplateId) {
          this.form.templateContent = item.smsTemplateContent
        }
      })
    },
    sureSend () {
      this.$api.SAVE_SIGNUP_ORG_AUDIT_SMS_TEMPLATE({
        smsTemplateId: this.form.smsTemplateId,
        basisId: this.form.basisId
      }).then(() => {
        const recordId = this.multipleSelection.map(v => (v = v.recordId))
        this.$api.BATCH_SEND_AUDIT_SMS({
          activityId: this.$route.query.activityId,
          recordId: recordId,
          templateContent: this.form.templateContent
        }).then(() => {
          this.visible = false
          this.$notify({
            title: '提示',
            message: '发送通知成功!',
            type: 'success'
          })
          this.multipleSelection = []
          this.refresh()
          this.doRefresh()
        })
      })
    },
    refresh () {
      this.form = JSON.parse(JSON.stringify(this.defaultForm))
    }
  }
}
</script>
<style scoped>
::v-deep .el-form-item {
  margin-right: 30px;
}
::v-deep .el-form-item__label {
  padding-right: 16px !important;
}
</style>
