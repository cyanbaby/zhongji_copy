<!--
 * @Date: 2021-02-20 15:27:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 16:23:24
 * @FilePath: \p-front-admin\src\views\examination\student\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link page-title">
          {{ title }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-scrollbar style="height: 500px;width:300px">
            <el-dropdown-item
              v-for="item in options"
              :key="item.examId"
              :command="item.examId"
            >
              {{ item.examName }}
            </el-dropdown-item>
          </el-scrollbar>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper> -->
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @toRecord="toRecord"
    >
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
        <crud-toolbar
          v-bind="_crudToolbarProps"
          v-on="_crudToolbarListeners"
        />
        <el-button type="primary" @click="downloadStudent">导出考生</el-button>
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { d2CrudPlus } from 'd2-crud-plus'
import { crudOptions } from './crud'
import util from '@/libs/util.js'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      options: [],
      command: '',
      examDis: false, // 从考试界面跳转不能切换
      title: '切换考试',
      form: {
        examId: '',
        studentName: '',
        sex: ''
      }
    }
  },
  watch: {
    '$route' () {
      if (this.$route.query.examId) {
        this.examDis = true
      } else {
        this.examDis = false
      }
    }
  },
  mounted () {
    // 查询全部考试
    this.$api.Querypageonlineexam({
      pageNum: 1,
      pageSize: 1000
    }).then(({ data }) => {
      this.options = data
    })
    if (this.$route.query.examId) {
      this.examDis = true
    } else {
      this.examDis = false
    }
  },
  methods: {
    toRecord ({ row }) {
      localStorage.setItem('examUserId', row.examUserId)
      localStorage.setItem('examId', this.$route.query.examId)
      localStorage.setItem('studentName', row.studentName)
      this.$router.push({
        path: '/examination/online_record'
      })
    },
    // 导出考生
    downloadStudent () {
      this.$api.DOWNLOAD_STUDENT({
        examId: this.form.examId || this.$route.query.examId,
        sex: this.form.sex,
        studentName: this.form.studentName,
        appId: util.cookies.get('appId')
      }).then(res => {
        this.$notify({
          title: '提示',
          message: '创建下载任务成功，请前往任务中心进行查看!',
          type: 'success'
        })
      })
    },

    // 切换考试
    handleCommand (command) {
      this.form.examId = command
      this.options.map(item => {
        if (item.examId === String(command)) {
          this.title = item.examName
        }
      })
      this.handleSearch({ examId: command })
    },

    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      if (this.$route.query.examId) {
        query.examId = this.$route.query.examId
      }
      this.form.sex = query.sex
      this.form.studentName = query.studentName
      return this.$api.Examuserbyexamid(query)
    }
  }
}
</script>
