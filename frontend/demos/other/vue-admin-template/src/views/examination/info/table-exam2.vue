<template>
  <div>
      <div style="width: 100%;margin-bottom: 20px;">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="考场名称">
          <el-input v-model="searchForm.examRoomName" placeholder="请输入考场名称"></el-input>
      </el-form-item>
      <el-form-item label="排考岗位">
          <el-input v-model="searchForm.positionName" placeholder="请输入排考岗位"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="reset">重置</el-button>
      </el-form-item>
      </el-form>
          <el-table
              :data="roomTable"
              border
              style="width: 100%; height: 70vh;"
              v-loading="roomTableLoaing"
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
              prop="positionName"
              label="考场名称（编码）"
              >
                  <template slot-scope="scope">
                      <span>{{scope.row.examRoomName}}<span v-if="scope.row.examRoomCode">({{scope.row.examRoomCode}})</span></span>
                  </template>
              </el-table-column>
              <el-table-column
              prop="detailAddress"
              label="考场地址"
              >
              </el-table-column>
              <el-table-column
              prop="examRoomCapacity"
              label="容纳人数"
              width="180"
              >
              </el-table-column>
              <el-table-column
              prop="timeList"
              label="已排座人数"
              width="180"
              >
                  <template slot-scope="scope">
                      <div v-for="(item) in scope.row.timeList" :key="item.seatExamRoomId">
                      {{item.examTimeStr}} <span style="margin-left:10px;">{{item.examRoomUsedCount}}人</span>
                      </div>
                  </template>
              </el-table-column>
              <el-table-column
              prop="subject"
              label="排考岗位"
              width="180"
              >
                  <template slot-scope="scope">
                      <el-tooltip
                      effect="light"
                      :content="scope.row.subject"
                      placement="bottom"
                      v-if="scope.row.subject.length>30"
                      >
                          <span>{{scope.row.subject.substring(0, 30) + "…"}}</span>
                      </el-tooltip>
                      <span v-else>{{scope.row.subject}}</span>
                  </template>
              </el-table-column>
              <el-table-column
              label="操作"
              width="300"
              >
              <template slot-scope="scope">
                  <el-button @click="viewTable1(scope.row)" type="text" size="small">返回上一页</el-button>
                  <el-button @click="checkStudent(scope.row)" type="text" size="small">查看考生</el-button>
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
          <el-pagination
          style="float:right;margin-top:20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paging.pageNum"
          :page-sizes="[20, 30, 40, 50]"
          :page-size="paging.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
          </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    examSiteId: {
      type: String,
      default: ''
    },
    activityId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      roomTable: [],
      timeVisible: false,
      searchForm: {},
      defaultForm: {},
      roomTableLoaing: false,
      paging: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0
    }
  },
  created () {
    this.defaultForm = JSON.parse(JSON.stringify(this.searchForm))
    this.getSeatRoom()
  },
  methods: {
    viewTable1 (row) {
      this.$emit('swichViewTable', false)
    },
    handleSizeChange (val) {
      this.paging.pageNum = 1
      this.paging.pageSize = val
      this.getSeatRoom()
    },
    handleCurrentChange (val) {
      this.paging.pageNum = val
      this.getSeatRoom()
    },
    getSeatRoom () {
      this.roomTableLoaing = true
      this.$api.GET_SEAT_ROOM({
        activityId: this.activityId,
        examSiteId: this.examSiteId,
        ...this.paging,
        ...this.searchForm
      }).then(res => {
        this.roomTable = res.data.list
        this.total = res.data.total
        this.paging.pageNum = res.data.currentPage
        this.paging.pageSize = res.data.pageSize
        this.roomTable.forEach(item => {
          item.subject = ''
          item.subjectList.forEach((str, i) => {
            if (item.subjectList.length > i + 1) {
              item.subject = item.subject + str.positionCode + str.positionName + '(' + str.subjectUsedCount + '人)、'
            } else {
              item.subject = item.subject + str.positionCode + str.positionName + '(' + str.subjectUsedCount + '人)'
            }
          })
        })
        this.roomTableLoaing = false
      }).catch(() => {
        this.roomTableLoaing = false
      })
    },
    onSubmit () {
      this.paging.pageNum = 1
      this.getSeatRoom()
    },
    reset () {
      this.searchForm = JSON.parse(JSON.stringify(this.defaultForm))
      this.paging.pageNum = 1
      this.getSeatRoom()
    },
    handleCommand (command, row) {
      if (command == 'a') {
        this.$api.EXPORT_ROOM_ARRIVE_FILE({
          activityId: this.activityId,
          examRoomId: row.examRoomId
        }).then(() => {
          this.$notify({
            title: '提示',
            message: '您需要的文件正在下载，请前往任务中心获取文件内容',
            type: 'success'
          })
        })
      } else if (command == 'b') {
        this.$api.EXPORT_ROOM_SEAT_FILE({
          activityId: this.activityId,
          examRoomId: row.examRoomId
        }).then(() => {
          this.$notify({
            title: '提示',
            message: '您需要的文件正在下载，请前往任务中心获取文件内容',
            type: 'success'
          })
        })
      } else if (command == 'c') {
        this.$api.EXPORT_ROOM_DESK_FILE({
          activityId: this.activityId,
          examRoomId: row.examRoomId
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
    }
  }
}
</script>
<style lang="scss" scoped>
.demo-form-inline{
  margin-top: 10px;
}
</style>
