<!--
 * @Date: 2021-02-20 15:27:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 16:20:42
 * @FilePath: \o-front-admin\src\views\join\user\index.vue
-->
<template>
  <!-- 报名人员4113223056 -->
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">{{this.$route.meta.title}}</span>
    </template>
    <d2-crud-x ref="d2Crud"
               v-bind="_crudProps"
               v-on="_crudListeners"
               @select="selection"
               @audit="audit">
      <div slot="header">
        <crud-search ref="search"
                     :options="crud.searchOptions"
                     @submit="handleSearch" />
        <el-button type="text"
                   @click="synchronousData"
                   style="float: right; margin-right:10px">
          <i>
            <img style="width: 25px;height: 20px;vertical-align:middle; margin-right:5px"
                 src="@/assets/images/yunDuanShuaXin.png">
          </i>同步数据
        </el-button>
      </div>
      <template slot='syncStatusSlot'
                slot-scope='scope'>
        <span v-if="scope.row.syncStatus == 1">未同步</span>
        <span v-if="scope.row.syncStatus == 2">已同步</span>
        <el-tooltip class="item"
                    effect="dark"
                    v-if="scope.row.syncStatus == 3"
                    :content="scope.row.syncFailed"
                    placement="top">
          <span style="color:red">同步失败</span>
        </el-tooltip>
      </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import util from '@/libs/util.js'
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
      recordIdsList: [],
      Status: true
      // Text: ''
    }
  },
  created () {
    this.doRefresh()
    // this.defaultForm = JSON.parse(JSON.stringify(this.form))
    this.getpersonnel()
  },

  // crud暴露的方法，mixin混入的方法，当前组件优先:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/expose.html
  methods: {
    // synchronization (row, column) {
    //   if (row.syncStatus == 1 && column.label == '同步状态') {
    //     this.Text = row.syncFailed
    //   }
    // },
    synchronousData () {
      // 按钮不可以一直点
      if (!this.Status) {
        return
      }
      this.Status = false
      this.$api.TO_REPORT_THE().then(res => {
        this.$notify({
          title: '提示',
          message: '同步成功',
          type: 'success'
        })
        setTimeout(() => {
          this.Status = true
        }, 3000)
      })
    },
    selection (str, a) {
      debugger
      if (str.length > 0) {
        this.recordIdsList = str
      }
    },
    // 查询
    pageRequest (query) {
      console.log(query.syncStatus)
      if (query.syncStatus >= 0) {
        query.syncStatus = query.syncStatus
      } else {
        query.syncStatus = 0
      }
      return this.$api.THE_TRAINING_RESULTS(query)
    },
    getpersonnel (query) { // 分页查询培训成果统计信息
      this.$api.THE_TRAINING_RESULTS({
        pageNum: 1,
        pageSize: 10,
        syncStatus: query.syncStatus
      }).then((res) => {
        console.log(res)
      })
    },
    audit ({ row }) {
      const searchData = this.getSearch().getForm()
      this.$api.THE_TRAINING_RESULTS({
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        console.log(res)
        // var recordIds = []
        // recordIds = res.data.list.map(item => item.recordId)
        // localStorage.setItem('recordIds', JSON.stringify(recordIds))
      })
    },
    getCrudOptions () {
      return crudOptions(this)
    }

  }
}
</script>
