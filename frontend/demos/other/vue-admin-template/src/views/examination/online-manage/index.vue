<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\subject-manage\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @toedit="toedit" @toview="toview" @tolazy="tolazy"
      @topublish="topublish" @toimport="toimport" @toshow="toshow" @reviewPaper="reviewPaper">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button type="primary" @click="toadd">新增考试</el-button>
        <div style="margin-top: 15px">
          <el-radio-group v-model="tabPosition" @change="typesQuery">
            <el-radio-button v-for="(item, index) in dynamicTags" :key="index" :label="item.dictDataValue">
              {{ item.dictDataName }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <template slot="examOriginSlot" slot-scope="scope">
        <span v-if="scope.row.examOrigin == 1">报名系统</span>
        <span v-else-if="scope.row.examOrigin == 2">班级</span>
        <span v-else>普通</span>
      </template>
      <template slot="examSubjectPaperVOListSlot" slot-scope="scope">
        <ul v-if="scope.row['examSubjectPaperVOList'].length < 2">
          <li v-for="item in scope.row['examSubjectPaperVOList']" :key="item.examId">
            <span v-if="item.startTime">
              {{ formatDate(item.startTime) }} ~ {{ formatDate(item.endTime) }}
            </span>
          </li>
        </ul>
        <el-popover v-else placement="bottom-start" width="300" trigger="hover">
          <ul>
            <li v-for="item in scope.row['examSubjectPaperVOList']" :key="item.examId">
              <span v-if="item.startTime">
                {{ formatDate(item.startTime) }} ~
                {{ formatDate(item.endTime) }}
              </span>
            </li>
          </ul>
          <el-button slot="reference" type="text">查看更多</el-button>
        </el-popover>
      </template>
      <template slot="createTimeSlot" slot-scope="scope">
        {{ formatDate(scope.row.createTime) }}
      </template>
    </d2-crud-x>
    <!-- 导入学员 -->
    <ImportStudent ref="ImportStudent" @doRefresh="doRefresh" />
  </d2-container>
</template>
<script>
import {
  crudOptions
} from './crud'
import {
  d2CrudPlus
} from 'd2-crud-plus'
import ImportStudent from './components/importStudent'

export default {
  name: 'OnlineExam',
  components: {
    ImportStudent
  },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      tabPosition: -1,
      dynamicTags: '',
      data: [{
        endTime: 1640880000000,
        startTime: 1635696000000,
        createTime: 1635766947522,
        orgId: '1002',
        examId: '202111250502000000022402',
        orgName: '继教云产品中心',
        examName: '文科培训班',
        examOrigin: null,
        platformId: '8002',
        examActivityId: '1202111017200',
        examActivityName: '文科培训班',
        examType: 3,
        examTotal: 0,
        examStatus: 5,
        examSubjectPaperVOList: [{
          paperName: '文综A卷',
          paperType: 1,
          totalScore: 100,
          endTime: 1640880000000,
          startTime: 1635696000000,
          updateTime: 1635766947522,
          examId: '202110220502000000017400',
          subjectName: '文科考试',
          testPaperId: '202110210516000000000205',
          examSubjectId: null,
          timeLimit: 2
        }]
      },
      {
        endTime: 1640880000000,
        startTime: 1635696000000,
        createTime: 1635770981323,
        orgId: '1002',
        examId: '202111010502000000018201',
        orgName: '继教云产品中心',
        examName: '理综培训班',
        examOrigin: '2',
        platformId: '8002',
        examActivityId: '1202111017400',
        examActivityName: '理综培训班',
        examType: 3,
        examTotal: 0,
        examStatus: 5,
        examSubjectPaperVOList: [{
          paperName: '文综A卷',
          paperType: 1,
          totalScore: 100,
          endTime: 1640880000000,
          startTime: 1635696000000,
          updateTime: 1635770981323,
          examId: '202111010502000000018201',
          subjectName: '理综考试',
          testPaperId: '202111010516000000000203',
          examSubjectId: null,
          timeLimit: 2
        }]
      }
      ]

    }
  },
  mounted () {
    this.getType()
  },
  methods: {
    // 公布成绩
    topublish () {
      this.dialog = true
    },
    // 批阅试卷
    reviewPaper ({
      row
    }) {
      this.$router.push({
        path: `/examination/review_paper_list?examId=${row.examId}&examName=${row.examName}`
      })
    },
    formatDate (date) {
      if (date == null) {
        return null
      }
      const dt = new Date(date)
      const yyyy = dt.getFullYear()
      const MM = (dt.getMonth() + 1).toString().padStart(2, '0')
      const dd = dt.getDate().toString().padStart(2, '0')
      const h = dt.getHours().toString().padStart(2, '0')
      const m = dt.getMinutes().toString().padStart(2, '0')
      const s = dt.getSeconds().toString().padStart(2, '0')
      return yyyy + '-' + MM + '-' + dd + ' ' + h + ':' + m + ':' + s
    },
    getType () {
      this.$api
        .DICT_LIST({
          typeCode: 'exam_status'
        })
        .then(({
          data
        }) => {
          this.dynamicTags = data
        })
    },
    typesQuery () {
      this.examStatus = this.tabPosition
      this.handleSearch()
    },
    toadd () {
      this.$router.push({
        path: '/educational/examaffair',
        query: {
          onlineFlag: true
        }
      })
    },
    toimport ({
      row
    }) {
      this.$refs.ImportStudent.show(row)
    },
    toshow ({
      row
    }) {
      this.$router.push({
        path: '/examination/online_show',
        query: {
          examId: row.examId
        }
      })
    },
    toedit ({
      row
    }) {
      this.$router.push({
        path: '/educational/examaffair',
        query: {
          examId: row.examId,
          onlineFlag: true
        }
      })
    },
    tolazy ({
      row
    }) {
      this.$router.push({
        path: '/examination/invigilator',
        query: {
          examId: row.examId
        }
      })
    },
    toview ({
      row
    }) {
      const {
        href
      } = this.$router.resolve({
        path: '/exam_paper',
        query: {
          scene: 1
        }
      })
      localStorage.setItem('examId', row.examId)
      localStorage.setItem('testPaperId', row.examSubjectPaperVOList[0].testPaperId)
      window.open(href, '_blank')
    },

    // 删除
    delRequest (row) {
      return this.$api.Deleteonlineexam({
        examId: row.examId
      })
    },

    pageRequest (query) {
      if (this.examStatus != '-1') {
        query.examStatus = this.examStatus
      }
      return this.$api.Querypageonlineexam(query)
    },
    getCrudOptions () {
      return crudOptions(this.isChoose)
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
