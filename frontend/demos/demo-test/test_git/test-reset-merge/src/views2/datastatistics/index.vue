<template>
  <d2-container>
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
    <div>
      <h4 class="title">概况</h4>
      <div class="top-wrap">
        <div class="top-item">
          <div class="others">
            <span>今日学习人数</span>
            <el-popover
              placement="bottom-start"
              width="250"
              trigger="hover"
              content="筛选时间内开启学习的学员数，一人多次学习记为一人。">
              <i slot="reference" class="el-icon-warning-outline" style="font-size:18px"></i>
            </el-popover>
          </div>
          <span style="font-size:24px">{{currentStudyData.dayStudySumPersonTotal || 0}}</span>
          <span>较前一天&nbsp;<span :class="{'isNumReduce':currentStudyData.dayStudyPersonNumPrePercent.indexOf('-')>-1}">{{currentStudyData.dayStudyPersonNumPrePercent}}</span></span>
        </div>
        <div class="top-item">
          <div class="others">
            <span>今日学习时长（小时）</span>
          </div>
          <span style="font-size:24px">{{currentStudyData.dayStudySumTimeTotal || 0}}</span>
          <span>较前一天&nbsp;<span :class="{'isNumReduce':currentStudyData.dayStudyTimePrePercent.indexOf('-')>-1}">{{currentStudyData.dayStudyTimePrePercent}}</span></span>
        </div>
        <div class="top-item">
          <div class="others">
            <span>今日人均学习时长（小时）</span>
          </div>
          <span style="font-size:24px">{{currentStudyData.avgDayStudyTimeHour || 0}}</span>
          <span>较前一天&nbsp;<span :class="{'isNumReduce':currentStudyData.avgPreDayPercent.indexOf('-')>-1}">{{currentStudyData.avgPreDayPercent}}</span></span>
        </div>
        <div class="top-item">
          <div class="others">
            <span>今日开课数</span>
            <el-popover
              placement="bottom-start"
              width="250"
              trigger="hover"
              content="筛选时间内，所有学员开始任意课程首次学习的数量之和">
              <i slot="reference" class="el-icon-warning-outline" style="font-size:18px"></i>
            </el-popover>
          </div>
          <span style="font-size:24px">{{currentStudyData.dayOpenCourseCountTotal}}</span>
          <div style="width:2px;height:2px;"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:40px">
      <h4 class="title">课程实时学习排行top10</h4>
      <el-table
    :data="courseTableData"
    border
    style="width: 60%">
    <el-table-column
      label="排名"
      type="index"
      width="100">
    </el-table-column>
    <el-table-column
      prop="sourceName"
      label="课程名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="studentTotal"
      label="学员总人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="studyPersonTotal"
      label="今日学习人数">
    </el-table-column>
    <el-table-column
      prop="studyTimeTotal"
      label="今日学习时长（小时）">
      <template slot-scope="scope">{{(scope.row.studyTimeTotal/3600).toFixed(2)}}</template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="getCourseDetail(scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <div style="margin-top:40px">
      <h4 class="title">班级实时学习排行top10</h4>
           <el-table
    :data="classTableData"
    border
    style="width: 60%">
    <el-table-column
      label="排名"
      type="index"
      width="100">
    </el-table-column>
    <el-table-column
      prop="sourceName"
      label="班级名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="studentTotal"
      label="学员总人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="studyPersonTotal"
      label="今日学习人数">
    </el-table-column>
    <el-table-column
      prop="studyTimeTotal"
      label="今日学习时长（小时）">
      <template slot-scope="scope">{{(scope.row.studyTimeTotal/3600).toFixed(2)}}</template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="getClassDetail(scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      currentStudyData: {},
      courseTableData: [],
      classTableData: []
    }
  },
  created () {
    this.getCurrentStudyData()
    this.getClassTopTen()
    this.getCourseTopTen()
  },
  methods: {
    getCurrentStudyData () {
      const loading = this.$loading({
        text: ''
      })
      this.loading = true
      this.$api.QUERY_STUDY_SUM_DAYNOW().then(res => {
        if (res.code === '1') {
          loading.close()
          this.currentStudyData = res.data
        }
      })
    },
    getClassTopTen () {
      this.$api.QUERY_CLASS_TOP_LIST().then(res => {
        if (res.code === '1') {
          this.classTableData = res.data
        }
      })
    },
    getCourseTopTen () {
      this.$api.QUERY_COURSE_TOP_LIST().then(res => {
        if (res.code === '1') {
          this.courseTableData = res.data
        }
      })
    },
    getCourseDetail (row) {
      // this.$router.push({
      //   path: '/statistic/course'
      // })
      this.$router.push({
        path: '/statistic/studydetail',
        query: {
          goodsId: row.sourceId,
          sourceLearnHour: row.sourceLearnHour
        }
      })
    },
    getClassDetail (row) {
      // this.$router.push({
      //   path: '/statistic/class'
      // })
      this.$router.push({
        path: '/statistic/classstudydetail',
        query: {
          classId: row.sourceId
        }
      })
    }
  }
}
</script>
<style scoped>
.title{
  margin:10px 0;
}
.top-wrap{
  display: flex;
  flex-direction: row;
}
.top-item{
  width:180px;
  height:120px;
  border: 1px  solid #d7d7d7;
  padding:10px;
  font-size:13px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right:20px;
}
.others{
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.isNumReduce{
  color:red;
}
</style>
