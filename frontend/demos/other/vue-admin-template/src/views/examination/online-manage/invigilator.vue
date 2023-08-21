<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }" style="padding:20px 50px">
    <div class="menu-content" style="display:flex;">
      <el-card style="min-width:250px;margin-right:10px;">
        <ul style="height:600px;overflow-y:auto">
          <li style="font-weight:bold;padding:10px 20px; border-bottom: 1px solid gainsboro;">考试中科目</li>
          <li v-for="(subject, i) in subjectinfo" :key="i"
            @click="changeSubject(i,subject.examSubjectId, subject.subjetcExamStatus)"
            style="cursor: pointer;padding:10px 20px;border-bottom: 1px solid gainsboro;"
            :class="menuIndex == i ? 'selectClass':''">
            <div style="margin-bottom:10px;font-weight:bold">{{subject.examSubjectName}}
            </div>
            <div style="line-height:30px">
              <div>开始：{{subject.startTime}}</div>
              <div>结束：{{subject.endTime}}</div>
            </div>
          </li>
        </ul>
      </el-card>
      <div style="width:99%">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="studentName" size="mini" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="queryonlineexamexamuserminitorinfo">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="minitorinfo" border style="width: 99%;margin-top:10px">
          <el-table-column prop="studentName" label="姓名" width="80">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" width="110">
          </el-table-column>
          <el-table-column prop="deviceTerminal" label="设备" width="120">
          </el-table-column>
          <el-table-column prop="validMode" label="验证方式" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.validMode == 1">活体检测</span>
              <span v-if="scope.row.validMode == 2">验证码</span>
              <span v-if="scope.row.validMode == 3">无验证</span>
            </template>
          </el-table-column>
          <el-table-column prop="entryExamTime" label="进入考试时间" width="120">
            <template slot-scope="scope">{{parseTime(scope.row.entryExamTime, '{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column prop="submitTestPaperTime" label="交卷时间" width="120">
            <template slot-scope="scope">{{parseTime(scope.row.submitTestPaperTime, '{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column prop="answerTime" label="答题用时（分钟）" width="140">
          </el-table-column>
          <el-table-column prop="compulsorySubmissionTime" label="最晚交卷时间" width="120">
            <template
              slot-scope="scope">{{parseTime(scope.row.compulsorySubmissionTime, '{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="extendAnswer(scope.row)">延长答题时间</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align:right;width:99%;margin-top:10px" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="inputVisible1" width="30%">
      <el-form>
        <el-form-item label="延迟时长">
          <el-input-number v-model="lateTimeValue" style="margin-right:10px" :min="1">
          </el-input-number>分钟
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inputVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handleInputConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  d2CrudPlus
} from 'd2-crud-plus'
import {
  parseTime
} from '@/utils/index'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      pageNum: 1,
      total: 0,
      pageSize: 10,
      lateTimeValue: '',
      studentName: '',
      subjectinfo: [],
      currentPage: 1,
      userMonitorId: '',
      title: '',
      minitorinfo: [],
      inputVisible1: false,
      menuIndex: 0,
      examSubjectId: ''
    }
  },
  mounted () {
    this.getexamsubject()
    window.document.title = '监控台'
  },
  methods: {
    parseTime,
    getexamsubject () {
      this.$api.getexamsubject({
        examId: this.$route.query.examId
      }).then(({
        data
      }) => {
        this.subjectinfo = data
        this.examSubjectId = data[0].examSubjectId
        this.queryonlineexamexamuserminitorinfo()
      })
    },

    changeSubject (i, examSubjectId) {
      this.menuIndex = i
      this.examSubjectId = examSubjectId
      this.queryonlineexamexamuserminitorinfo()
    },

    queryonlineexamexamuserminitorinfo () {
      this.$api.queryonlineexamexamuserminitorinfo({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        examId: this.$route.query.examId,
        examSubjectId: this.examSubjectId,
        studentName: this.studentName
      }).then(({
        data
      }) => {
        this.minitorinfo = data.list
        this.total = data.total
        this.pageNum = data.currentPage
        this.pageSize = data.pageSize
      })
    },

    extendAnswer (row) {
      this.lateTimeValue = ''
      this.userMonitorId = row.userMonitorId
      this.inputVisible1 = true
      this.title = '延迟答题时间'
    },

    handleSizeChange (e) {
      this.pageSize = e
      this.queryonlineexamexamuserminitorinfo()
    },

    handleCurrentChange (e) {
      this.pageNum = e
      this.queryonlineexamexamuserminitorinfo()
    },

    handleInputConfirm () {
      this.$api.delaysubmittime({
        userMonitorId: this.userMonitorId,
        submitTimeValue: this.lateTimeValue
      }).then(({
        data
      }) => {
        this.$message.success('延长成功！')
        this.inputVisible1 = false
        this.queryonlineexamexamuserminitorinfo()
      })
    }
  }
}

</script>

<style scoped lang="scss">
  ::v-deep .el-card__body {
    padding: 0;
  }

  ::v-deep .el-dialog__body {
    max-height: 600px;
    overflow-y: auto;
  }

  .point-class {
    ::v-deep .el-input__inner {
      border: none;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .box-card {
    .item {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;

      .title {
        margin-bottom: 5px;
      }
    }
  }

  .selectClass {
    border-left: 2px solid #606266;
    background: gainsboro;
  }

</style>
