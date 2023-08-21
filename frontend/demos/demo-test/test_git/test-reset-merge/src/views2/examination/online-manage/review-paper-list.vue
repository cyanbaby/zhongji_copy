<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }" style="padding:20px 50px">
        <template slot="header">
            <span class="page-title">{{$route.meta.title}}</span>
            <el-button size="mini" @click="doBack" style="float:right;">返回</el-button>
        </template>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="科目筛选">
                <el-select v-model="formInline.examSubjectId" placeholder="科目筛选" clearable>
                    <el-option v-for="(e, i) in subjectData" :key="i" :label="e.subjectName" :value="e.examSubjectId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="批阅状态">
                <el-select v-model="formInline.isCheck" placeholder="批阅状态" clearable>
                    <el-option label="已批阅" value="1"></el-option>
                    <el-option label="未批阅" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="querymarkexampaperslist">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="markingData" style="width: 100%">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="studentName" label="姓名">
            </el-table-column>
            <el-table-column prop="subjectName" label="科目">
            </el-table-column>
            <el-table-column prop="isCheck" label="批阅状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.isCheck == 1">已批阅</span>
                    <span v-if="scope.row.isCheck == 0">未批阅</span>
                </template>
            </el-table-column>
            <el-table-column prop="paperName" label="所用试卷">
            </el-table-column>
            <el-table-column width="170" prop="partakeTimeSubmit" label="交卷时间">
                <template slot-scope="scope">
                    {{parseTime(scope.row.partakeTimeSubmit, '{y}-{m}-{d} {h}:{i}:{s}')}}
                </template>
            </el-table-column>
            <el-table-column prop="testScore" label="总分">
            </el-table-column>
            <el-table-column prop="objectiveSubjectScore" label="客观题得分">
            </el-table-column>
            <el-table-column prop="subjectivitySubjectScore" label="主观题得分">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" :disabled="!scope.row.subjectivitySubjectCount" size="mini" @click="doReview(scope.row)">批阅</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="text-align:right;width:99%;margin-top:10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </d2-container>
</template>

<script>
import {
  d2CrudPlus
} from 'd2-crud-plus'
import { parseTime } from '@/utils/index'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      formInline: {},
      subjectData: [],
      markingData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1
    }
  },
  mounted () {
    this.querymarkexampaperslist()
    this.getexamsubjectbyexamid()
  },
  methods: {
    parseTime,
    getexamsubjectbyexamid () {
      this.$api.getexamsubjectbyexamid({
        examId: this.$route.query.examId
      }).then(({ data }) => {
        this.subjectData = data
      })
    },
    querymarkexampaperslist () {
      this.$api.querymarkexampaperslist({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        examId: this.$route.query.examId,
        ...this.formInline
      }).then(({ data }) => {
        this.total = data.total
        this.markingData = data.list
      })
    },
    handleSizeChange (e) {
      this.pageSize = e
      this.querymarkexampaperslist()
    },

    handleCurrentChange (e) {
      this.pageNum = e
      this.querymarkexampaperslist()
    },
    doBack () {
      this.$router.push({
        path: '/examination/online_exam',
        query: {
          tabPosition: this.$route.query.tabPosition
        }
      })
    },
    doReview (row) {
      this.$router.push({
        path: `/examination/review_paper?examId=${this.$route.query.examId}&takeExamId=${row.takeExamId}&examUserId=${row.examUserId}&testPaperId=${row.testPaperId}&studentName=${row.studentName}&examName=${this.$route.query.examName}&paperInsId=${row.paperInsId || ''}`
      })
    }
  }
}

</script>

<style>

</style>
