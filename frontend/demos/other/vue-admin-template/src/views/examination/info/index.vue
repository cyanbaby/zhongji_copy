<template>
  <d2-container>
    <template slot="header">
      <span class="page-title">考场资料</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper>
    </template>
    <template>
      <div style="margin-bottom:10px;" v-if="table1Show">
        <el-select v-model="activityId" placeholder="请选择考试">
          <el-option
            v-for="item in examOptions"
            :key="item.activityId"
            :label="item.activityName"
            :value="item.activityId">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left:10px;" @click="getSeatSite">切换考试</el-button>
      </div>
      <div style="width: 100%;">
          <el-table
              :data="siteTable"
              border
              style="width: 100%;height: 75vh;"
              v-if="table1Show"
              v-loading="siteTableLoaing"
              >
              <el-table-column
              type="index"
              label="序号"
              width="60"
              >
              </el-table-column>
              <el-table-column
              prop="examSiteName"
              label="考点名称（编码）"
              >
                  <template slot-scope="scope">
                      <span>{{scope.row.examSiteName}}<span v-if="scope.row.examSiteCode">({{scope.row.examSiteCode}})</span></span>
                  </template>
              </el-table-column>
              <el-table-column
              prop="detailAddress"
              label="考点地址"
              >
              </el-table-column>
              <el-table-column
              prop="totalExamRoomNum"
              label="考场数量"
              width="180"
              >
              </el-table-column>
              <el-table-column
              prop="usedExamRoomNum"
              label="本次考试使用数量"
              width="180"
              >
              </el-table-column>
              <el-table-column
              label="操作"
              width="300"
              >
              <template slot-scope="scope">
                  <el-button @click="checkStudent(scope.row)" type="text" size="small">查看考生</el-button>
                  <el-button @click="swichViewTable(scope.row)" type="text" size="small">查看已用考场</el-button>
                  <el-dropdown @command="(command)=>{handleCommand(command,scope.row)}">
                  <span style="color:#4598f9;margin-left: 15px;">
                      导出物料<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a">导出签到表</el-dropdown-item>
                      <el-dropdown-item command="b">导出座次表</el-dropdown-item>
                      <el-dropdown-item command="c">导出桌签表</el-dropdown-item>
                  </el-dropdown-menu>
                  </el-dropdown>
              </template>
              </el-table-column>
          </el-table>
          <table-exam-2
          @swichViewTable="swichViewTable"
          :examSiteId="examSiteId"
          :activityId="activityId"
          v-else></table-exam-2>
      </div>
    </template>
  </d2-container>
</template>

<script>
import TableExam2 from './table-exam2.vue'
export default {
  components: {
    TableExam2
  },
  data () {
    return {
      examOptions: [],
      siteTable: [],
      table1Show: true,
      examSiteId: '',
      siteTableLoaing: false,
      activityId: ''
    }
  },
  created () {
    this.getActivityOtions()
  },
  methods: {
    getActivityOtions () {
      this.$api.QUERY_ACTIVITY_ALL().then(res => {
        this.examOptions = res.data
        if (res.data && res.data.length > 0) {
          this.activityId = res.data[0].activityId
          this.getSeatSite()
        }
      })
    },
    getSeatSite () {
      this.siteTableLoaing = true
      this.$api.GET_SEAT_SITE({
        activityId: this.activityId
      }).then(res => {
        this.siteTable = res.data.siteList
        this.siteTableLoaing = false
      }).catch(() => {
        this.siteTableLoaing = false
      })
    },
    handleCommand (command, row) {
      if (command == 'a') {
        this.$api.EXPORT_SITE_ARRIVE_FILE({
          activityId: this.activityId,
          examSiteId: row.examSiteId
        }).then(() => {
          this.$notify({
            title: '提示',
            message: '您需要的文件正在下载，请前往任务中心获取文件内容',
            type: 'success'
          })
        })
      } else if (command == 'b') {
        this.$api.EXPORT_SITE_SEAT_FILE({
          activityId: this.activityId,
          examSiteId: row.examSiteId
        }).then(() => {
          this.$notify({
            title: '提示',
            message: '您需要的文件正在下载，请前往任务中心获取文件内容',
            type: 'success'
          })
        })
      } else if (command == 'c') {
        this.$api.EXPORT_SITE_DESK_FILE({
          activityId: this.activityId,
          examSiteId: row.examSiteId
        }).then(() => {
          this.$notify({
            title: '提示',
            message: '您需要的文件正在下载，请前往任务中心获取文件内容',
            type: 'success'
          })
        })
      }
    },
    // 查看考生
    checkStudent (row) {
      this.$router.push({
        path: '/examination/student',
        query: {
          activityId: this.activityId,
          examSiteId: row.examSiteId
        }
      })
    },
    swichViewTable (row) {
      this.examSiteId = row.examSiteId
      this.table1Show = !this.table1Show
    }
  }
}
</script>
