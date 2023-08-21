<!--
 * @Author: your name
 * @Date: 2021-04-12 16:27:01
 * @LastEditTime: 2021-07-21 16:21:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \o-front-admin\src\views\examination\info-user\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">考生管理</span>
      <!-- <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper> -->
    </template>

    <d2-crud-x ref="d2Crud"
               v-bind="_crudProps"
               v-on="_crudListeners"
               @audit="audit">
      <div slot="header">
        <crud-search ref="search"
                     :options="crud.searchOptions"
                     @submit="handleSearch">
          <template slot="examSiteNameSearchSlot"
                    slot-scope="scope">
            {{scope.row.examSiteName}}
          </template>
        </crud-search>
        <crud-toolbar v-bind="_crudToolbarProps"
                      v-on="_crudToolbarListeners" />
        <el-select v-model="value1"
                   @change="change1"
                   size="small"
                   placeholder="请选择考点">
          <el-option v-for="item in options1"
                     :key="item.examSiteId"
                     :label="item.examSiteName"
                     :value="item.examSiteId">
          </el-option>
        </el-select>
        <el-select v-model="value2"
                   style="margin: 0 20px"
                   size="small"
                   @change="change2"
                   :disabled="shows"
                   placeholder="请选择考场">
          <el-option v-for="item in options2"
                     :key="item.examRoomId"
                     :label="item.examRoomName"
                     :value="item.examRoomId">
          </el-option>
        </el-select>

        <!-- <el-button
          type="primary"
          size="mini"
          :disabled="!multipleSelection || multipleSelection.length == 0"
          @click="sendMsg"
        >
          发送消息
        </el-button> -->
        <el-button type="primary"
                   size="small"
                   @click="theExaminee">
          导出考生
        </el-button>

        <!-- <el-button
          size="mini"
          @click="msgRecording"
        >
          发送消息记录
        </el-button> -->
      </div>
    </d2-crud-x>
    <!-- 发送消息记录/批次列表 -->
    <el-dialog title="发送消息记录"
               :visible.sync="recording"
               :close-on-click-modal=false
               width="900"
               height="500">
      <vxe-grid ref="xGrid1"
                v-bind="gridOptionsRecording">
        <template v-slot:operate="{ row }">
          <el-button type="text"
                     @click="customBtn1(row)">
            批次结果详情
          </el-button>
        </template>
      </vxe-grid>
    </el-dialog>

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
        <el-form-item label="发送通道:">
          <el-checkbox-group v-model="form.noticeChannel">
            <el-checkbox label="1">
              短信通道
            </el-checkbox>
            <el-checkbox label="2">
              邮箱通道
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择模板:">
          <el-select v-model="form.templateId"
                     placeholder="请选择模板">
            <el-option v-for="item in msgTempList"
                       :key="item.templateId"
                       :label="item.templateName"
                       :value="item.templateId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="模板内容:">
          <!-- 根据下拉选型动态赋值，仅预览 -->
          <el-input v-model="form.noticeContent"
                    type="textarea"
                    disabled />
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
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { EXAM_STUDENT, EXAM_POST_MSG } from './api'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      shows: true,
      value1: '',
      value2: '',
      examSiteId: '',
      examRoomId: '',
      options1: [],
      options2: [],
      recording: false, // 显示已发送信息弹窗
      // 已发送记录
      gridOptionsRecording: {
        height: 500,
        pagerConfig: {
          pageSize: 10,
          pageSizes: [5, 10, 15, 20]
        },
        proxyConfig: {
          // 对应响应结果 { result: [], page: { total: 100 } }
          props: {
            result: 'list', // 配置响应结果列表字段
            total: 'total' // 配置响应结果总页数字段
          },
          ajax: {
            // 接收 Promise 对象
            query: async ({ page, sorts, filters, form }) => {
              const { data } = await this.$api.EXAM_GET_RECORDING({
                pageSize: page.pageSize,
                pageNum: page.currentPage
              })
              return data
            }
          }
        },
        columns: [
          {
            field: 'batchName',
            title: '批次',
            width: 100
          },
          {
            field: 'count',
            title: '人数',
            width: 120
          },
          {
            field: 'sendTime',
            title: '发送时间',
            width: 150
          },
          {
            field: 'templateName',
            title: '使用模板名',
            minWidth: 150
          },
          {
            title: '操作',
            width: 140,
            fixed: 'right',
            slots: { default: 'operate' }
          }
        ]
      },
      form: {
        noticeChannel: [],
        templateId: '',
        noticeContent: '', //  通知内容
        visible: false // 显示发送模板选择
      },
      visible: false, // 显示发送模板选择
      msgTempList: [], // 短信模板列表
      Query: ''
    }
  },
  watch: {
    'form.templateId' (val) {
      this.msgTempList.map(item => {
        if (item.templateId === val) {
          this.form.noticeContent = item.templateContent
        }
      })
    }
  },
  created () {
    this.$api.CHECK_THE_TEST_VENUE().then(res => {
      this.options1 = res.data
    })
  },
  methods: {
    change1 (row) {
      this.examSiteId = row
      this.options1.forEach((item, index) => {
        if (row == item.examSiteId) {
          this.options2 = this.options1[index].examRoomListVOS
          this.shows = false
          this.value2 = ''
        }
      })
    },
    change2 (row) {
      this.examRoomId = row
    },
    // 批次详情
    customBtn1 (row) {
      this.$router.push({
        path: '/examination/subject_msg_info',
        query: {
          batchId: row.batchId // 批次id
        }
      })
    },

    // 发送消息记录
    msgRecording () {
      this.recording = true
    },

    // 发送消息模板选择
    sendMsg () {
      this.visible = true
      this.queryMsgTemp()
    },
    // 导出考生
    theExaminee () {
      this.$api.BATCH_SEND_AUDIT_SMS({
        ...this.Query
      }).then(res => {
        if (res.code == '1') {
          this.$notify({
            title: '提示',
            message: '导出成功，请前往任务中心查看',
            type: 'success'
          })
        }
      })
    },
    // 打印准考证
    audit ({ row }) {
      this.$api.PRINT_THE_ADMINSSION_TICKET({
        recordId: row.recordId
      }).then(res => {
        console.log(res)
        if (res.code == '1') {
          this.$notify({
            title: '提示',
            message: '打印准考证成功!',
            type: 'success'
          })
          window.open(res.data)
        }
      })
    },
    // 查询短信模板列表
    queryMsgTemp () {
      this.$api
        .MSG_TEMP_GET({
          pageSize: 50,
          pageNum: 1
        })
        .then(res => {
          this.msgTempList = res.data.list
        })
    },

    // 批量发送消息
    sureSend () {
      const ids = this.multipleSelection.map(v => (v = v.userId))

      EXAM_POST_MSG({
        takeExamUserIds: ids, // 考生id组
        templateId: this.form.templateId, // 信息模板
        noticeType: 1, // 通知类型 1  成绩通知 2 其他信息
        noticeChannel: this.form.noticeChannel.join(',') // 通知渠道 1 短信通知 2 邮件通知，多个用逗号隔开【必须】
      }).then(() => {
        this.visible = false
        this.$notify({
          title: '提示',
          message: '发送短信成功!',
          type: 'success'
        })
      })
    },

    handleCurrentChange (val) {
      this.currentRow = val
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      query.examSiteId = this.examSiteId
      query.examRoomId = this.examRoomId
      query.activityId = this.$route.query.activityId || 'bvvymkc7iqyo'
      this.Query = query
      return EXAM_STUDENT(query)
    }
  }
}
</script>
