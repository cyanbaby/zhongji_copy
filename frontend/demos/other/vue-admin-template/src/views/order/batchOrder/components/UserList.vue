<template>
  <div>
      <div style="display:flex;justify-content: space-between;">
        <div style="margin-bottom: 10px;">
            <el-button type="primary" @click="choseUser">选择用户</el-button>
            <el-button type="primary" @click="importUser">导入名单</el-button>
        </div>
        <div>
            <el-input v-model="searchForm.mobileNo" placeholder="输入手机号" style="width:200px;margin-right:10px"></el-input>
            <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
      <el-link type="primary" v-if="errorAmount>0" style="float:right;margin-bottom: 10px;" @click="conflictUserFileUrl">下载导入失败数据：{{errorAmount}}条</el-link>
      <el-table
        :data="userList"
        border
        style="width: 100%"
        v-loading="loadingTable"
        >
        <el-table-column
            type="index"
            width="50"
            label="序号"
        >
        </el-table-column>
        <el-table-column
            prop="cardName"
            label="姓名"
        >
        </el-table-column>
        <el-table-column
            prop="mobileNo"
            label="手机号"
        >
        </el-table-column>
        <el-table-column
            prop="certNo"
            label="身份证号">
        </el-table-column>
        <el-table-column
            label="操作"
            width="80">
        <template slot-scope="scope">
            <el-button type="text" @click="removeUser(scope.$index,scope.row)">删除</el-button>
        </template>
        </el-table-column>
        </el-table>
    <import-dialog
        title="导入学员"
        :isShowText='true'
        :dialogVisible.sync="importDialog"
        :description="description"
        :Downtemplate="Downtemplate"
        @uplpadFile="uplpadFile"
        :importLoading.sync="importLoading"
    ></import-dialog>
    <chose-student
    :dialogVisibleProp.sync="choseStudentDialog"
    :Studentlistes="isSelectedUserId"
    @SelectedStudentList="submitDialog"
    v-if="choseStudentDialog"
    ></chose-student>
  </div>
</template>
<script>
import ChoseStudent from '@/components/Select-product/SelectStudents.vue'
import { findItemIndexInArrayByProperty } from '@/utils/array-utils'
import { mapActions } from 'vuex'
export default {
  components: {
    ChoseStudent
  },
  data () {
    return {
      importDialog: false,
      description: '',
      Downtemplate: 'https://static.peixunyun.cn/学员模板.xlsx',
      importLoading: false,
      choseStudentDialog: false,
      userList: [], // 总数组
      userListCopy: [],
      errorAmount: 0,
      conflictUserFileUrl: '',
      userInfoList: [], // 已经存在的用户
      imputUserList: [], // 导入并且不存在的用户
      isSelectedUserId: [],
      searchForm: {
        mobileNo: ''
      },
      loadingTable: false
    }
  },
  // 监听
  watch: {
    userInfoList: { // 已经存在的用户
      handler () {
        this.$emit('getUserInfoList', this.userInfoList)
      },
      deep: true,
      immediate: true
    },
    imputUserList: { // 导入并且不存在的用户
      handler () {
        this.$emit('getImputUserList', this.imputUserList)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    importUser () {
      this.importDialog = true
      this.description =
        '<p>1、如果导入学员信息在平台已注册，则直接给与学习权限；如导入学员信息在平台未注册，则生成新账号后给予学习权限。</p><p>2、登录名为手机号，默认密码为123456，学员登录后可自行修改密码。</p><p>3、如果导入的学员已存在于该课，则不会对原有学员信息进行修改。</p><p>4、请严格按照模板说明填入信息(一次导入最多不超过100条)。</p>'
    },
    ...mapActions('d2admin/page', ['close']),
    uplpadFile (file) {
      if (file) {
        this.importLoading = true
        this.loadingTable = true
        this.$api.READEXCEL({
          file: file
        }).then(res => {
          this.search.mobileNo = ''
          this.search()
          this.errorAmount = res.data.conflictUserInfoList.length
          this.conflictUserFileUrl = res.data.conflictUserFileUrl
          res.data.userInfoList.forEach(ele => { // 导入并且不存在的用户
            this.imputUserList.unshift(ele)
            this.userList.unshift(ele)
          })
          res.data.existUserInfoList.forEach(ele => { // 已经存在的用户
            this.userInfoList.unshift(ele)
            this.userList.unshift(ele)
          })
          this.userListCopy = JSON.parse(JSON.stringify(this.userList))
          this.preventRepeat()
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.importLoading = false
          this.importDialog = false
          this.loadingTable = false
        }).catch(() => {
          this.importLoading = false
          this.importDialog = false
          this.loadingTable = false
        })
      } else {
        this.$message({
          message: '请正确上传文档！',
          type: 'warning'
        })
      }
    },
    choseUser () {
      this.isSelectedUserId = []
      this.userInfoList.forEach(item => {
        this.isSelectedUserId.push(item.userId)
      })
      this.choseStudentDialog = true
    },
    submitDialog (val) {
      this.search.mobileNo = ''
      this.search()
      val.forEach(item => {
        this.userInfoList.unshift(item)// 已经存在的用户
        this.userList.unshift(item)
      })
      this.userListCopy = JSON.parse(JSON.stringify(this.userList))
    },
    removeUser (index, row) {
      this.search.mobileNo = ''
      this.search()
      this.userList.splice(index, 1)
      if (row.userId) { // 已经存在的用户
        const i = findItemIndexInArrayByProperty(this.userInfoList, row.mobileNo, 'mobileNo')
        if (i >= 0) { // 存在
          this.userInfoList.splice(i, 1)
        }
      } else { // 导入并且不存在的用户
        const i = findItemIndexInArrayByProperty(this.imputUserList, row.mobileNo, 'mobileNo')
        if (i >= 0) { // 存在
          this.imputUserList.splice(i, 1)
        }
      }
      this.userListCopy = JSON.parse(JSON.stringify(this.userList))
    },
    search () { // 前端模糊查询
      const arr = this.userListCopy.filter(item => {
        return String(item.mobileNo).indexOf(this.searchForm.mobileNo) != -1
      })
      this.userList = arr
      this.choseStudentDialog = false
    },
    preventRepeat () { // 去重
      this.userList.forEach((item, i) => {
        const index = findItemIndexInArrayByProperty(this.userList.slice(i + 1), item.mobileNo, 'mobileNo')
        if (index >= 0) { // 存在
          this.removeUser(index + i + 1, this.userList[index + i + 1])
        }
      })
    }
  }
}
</script>
<style scoped>
::v-deep .d2-crud-x .d2-crud-body {
  padding-top: 0 !important;
}
</style>
