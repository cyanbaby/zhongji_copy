<!--
 * @Date: 2021-02-20 15:27:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 16:21:18
 * @FilePath: \o-front-admin\src\views\join\plane\index.vue
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
               @toStudent="toStudent"
               @toDown="toDown">
      <div slot="header">
        <crud-search ref="search"
                     :options="crud.searchOptions"
                     @submit="handleSearch" />
        <crud-toolbar v-bind="_crudToolbarProps"
                      v-on="_crudToolbarListeners" />
      </div>

      <template slot="activityStatusSlot"
                slot-scope="scope">
        {{ scope.row.activityStatus == 1 ? "未发布" : "已发布" }}
      </template>
      <template slot="activityTimeSlot"
                slot-scope="scope">
        <span v-if="!scope.row.startTime||!scope.row.endTime">不限制报名时间</span>
        <span v-else>{{ `${scope.row.startTime}-${scope.row.endTime}` }}</span>
      </template>
    </d2-crud-x>
    <el-dialog title="报名表下载"
               :visible.sync="dialog"
               width="800px"
               :close-on-click-modal=false>
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>按岗位</span>

        </div>
        <el-form :model="form"
                 ref="form">
          <el-form-item label="">
            <el-checkbox-group v-model="form.positionIds">
              <el-checkbox :label="item.positionId"
                           v-for="(item, index) in workList"
                           :key="index">{{ item.positionName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-button style="padding: 10px 10px"
                   class="small"
                   type="text"
                   @click="submitTask">批量下载</el-button>
      </el-card>

      <el-card class="box-card"
               style="margin-top:20px;">
        <div slot="header"
             class="clearfix">
          <span>按个人</span>
        </div>
        <el-button type="text"
                   class="small"
                   style="padding: 10px 10px"
                   @click="personalDownload">逐个下载</el-button>
      </el-card>

      <span slot="footer">
        <el-button @click="dialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
import util from '@/libs/util'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      dialog: false,
      form: {
        // taskId: '',
        activityId: '',
        positionIds: []
      },
      workList: []
    }
  },
  methods: {
    personalDownload () {
      this.$router.push({
        path: 'singers/manage',
        query: {
          activityId: this.form.activityId
        }
      })
    },
    // 提交下载任务
    submitTask () {
      if (this.form.positionIds.length <= 0) {
        this.$message({
          message: '请选择岗位',
          type: 'warning'
        })
      } else {
        // 任务改为由后端创建，但是需要增加appId入参
        api.GET_WORK_DOWNLOAD({
          ...this.form,
          appId: util.cookies.get('appId')
        })
          .then(() => {
            this.$notify({
              title: '提示',
              message: '创建下载任务成功，请前往任务中心进行查看!',
              type: 'success'
            })
          })
        this.dialog = false
      }
    },
    // 下载报名表
    async toDown ({ row }) {
      // 查询活动下岗位列表
      await api
        .GetWork({
          pageSize: 1000,
          pageNum: 1,
          activityId: row.activityId
        })
        .then(res => {
          this.workList = res.data.list
        })

      // 不由前端创建任务
      // const { data } = await this.$api
      //   .ADD_TASK({
      //     name: `${row.activityName}导出报名表`, // 任务名称
      //     taskType: '2' // 1导入，2导出
      //   })

      // this.form.taskId = data
      this.form.activityId = row.activityId
      this.dialog = true
    },
    toStudent ({ row }) {
      const { activityId } = row
      if (row.templateType == 1) {
        this.$router.push({ path: '/join/user', query: { activityId } })
      } else if (row.templateType == 2) {
        this.$router.push({ path: '/join/user-gao', query: { activityId } })
      }
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return api.GetList(query)
    }
  }
}
</script>
