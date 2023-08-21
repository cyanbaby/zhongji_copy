<template>
  <d2-container>
    <template slot="header"
              v-if="rostShow">
      <span class="page-title">学员花名册</span>
      <el-button type="primary"
                 plain
                 style="float: right;"
                 size="mini"
                 @click="back">返回</el-button>
    </template>
    <div v-if="rostShow">
      <div class="secendCss">

        <span class="greyCss">班级名：</span><span class="black"
              style="margin-right: 50px;">{{className}}</span>

        <span class="greyCss">分类：</span>
        <el-tooltip effect="light"
                    placement="bottom">
          <div slot="content"><span v-for="(item,index) in classToCategoryVOList"
                  :key="index">{{item.catValue}}</span></div>
          <div class="numControl-inline"><span class="numControl"><span class="black"
                    v-for="(item,i) in classToCategoryVOList"
                    :key="i">{{item.catValue}}；</span></span></div>
        </el-tooltip>

      </div>

      <div v-if="!listShow">
        <el-row style="height:42.5px">
          <el-form ref="searchForm"
                   :model="searchForm"
                   :inline="true"
                   @submit.native.prevent
                   style="height:42.5px">
            <el-form-item label="学员姓名">
              <el-input v-model="searchForm.studentName"
                        @keypress.13.native="getRosterListByName"
                        size="small"
                        style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="searchForm.mobile"
                        @keypress.13.native="getRosterListByName"
                        size="small"
                        style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="所在地区">
              <el-cascader v-if="isDataPermission"
                           v-model="address"
                           :options="options"
                           :props="props"
                           clearable
                           style="width:150px"
                           size="small"
                           @keypress.13.native="getRosterListByName"
                           filterable>
              </el-cascader>
              <el-cascader v-if="!isDataPermission"
                           ref="manageArea"
                           :options="OptionS"
                           v-model="address"
                           style="width:150px"
                           :props="props"
                           size="small"
                           @keypress.13.native="getRosterListByName"
                           filterable
                           clearable />
            </el-form-item>
            <el-form-item label="工作单位">
              <el-input v-model="searchForm.companyName"
                        @keypress.13.native="getRosterListByName"
                        size="small"
                        style="width:150px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click="getRosterListByName"
                         size="small">查询</el-button>
              <el-button icon="el-icon-refresh-right"
                         @click="reset"
                         size="small">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <div class="opbutton">
          <div class="opbutton-left">
            <el-button type="primary"
                       icon="el-icon-circle-plus-outline"
                       @click="importStudents('NEW')"
                       style="margin-right: 10px;">导入学员</el-button>
            <el-button type="primary"
                       icon="el-icon-circle-plus-outline"
                       @click="importStudents('OLD')"
                       style="margin-right: 10px;">老系统导入</el-button>
            <el-dropdown trigger="click"
                         @command="handleCommand">
              <el-button type="primary"
                         icon="el-icon-upload2"
                         v-popover:popover>导出</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="exportStudents">导出花名册</el-dropdown-item>
                <el-dropdown-item command="exportStudentsDetail">导出学员学习明细</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="warning"
                       icon="el-icon-remove-outline"
                       @click="removeBtn"
                       style="background-color:#FFBA00;color:#FFFFFF;margin-left: 10px;"
                       v-if="isRemove==2&&stateForm.studentIds.length!=0">移除学员</el-button>
            <el-button type="warning"
                       icon="el-icon-circle-plus-outline"
                       @click="renewStudent"
                       style="background-color:#FFBA00;color:#FFFFFF;margin-left: 10px;"
                       v-if="isRemove==1&&stateForm.studentIds.length!=0">恢复在读</el-button>
          </div>
          <div class="right">
            <span @click="switchBtn">
              <d2-icon-svg name="switch"
                           class="svgCss" />
            </span>
            <el-radio-group v-model="isRemove"
                            @change="getRosterListClear">
              <el-radio-button label="2">在读学员</el-radio-button>
              <el-radio-button label="1">已移除</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- <div>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="importStudents">导入学员</el-button>
        <el-button type="warning" icon="el-icon-remove-outline" @click="removeBtn" style="background-color:#FFBA00;color:#FFFFFF" v-if="isRemove==2&&stateForm.studentIds.length!=0">移除学员</el-button>
        <el-button type="warning" icon="el-icon-circle-plus-outline" @click="renewStudent" style="background-color:#FFBA00;color:#FFFFFF" v-if="isRemove==1&&stateForm.studentIds.length!=0">恢复在读</el-button>
      </div>
    </div> -->
        <el-container>
          <el-main v-loading="mainLoading">
            <el-empty description="暂无数据"
                      v-if="total==0"></el-empty>
            <div class=container>
              <div class="container-card"
                   :span="6"
                   v-for="(item,i) in studentInfoList"
                   :key="i">
                <el-checkbox v-model="stateForm.studentIds"
                             :label="item.studentId"
                             class="checked"
                             :checked="checked"
                             @change="change"><br></el-checkbox>
                <el-row class="card"
                        :class="{'compuretu':checked && stateForm.studentIds.includes(item.studentId)}">
                  <div class="cardInnre"
                       @click="jumpDetail(item.studentId)">
                    <el-col :span="9"
                            :offset="1"
                            style="padding-top: 20px;">
                      <el-avatar :size="100"
                                 :src="item.photoUrl">
                        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                      </el-avatar>
                    </el-col>
                    <el-col :span="14">
                      <span class="name">{{item.studentName}}
                        <i class="el-icon-female"
                           style="color:#FF4B96"
                           v-if="item.sex==0"></i>
                        <i class="el-icon-male"
                           style="color:#1E90FF"
                           v-if="item.sex==1"></i>
                      </span>
                      <br>
                      <span class="grey">{{item.mobile}}</span>
                      <br>
                      <span class="course"
                            v-if="isRemoveMid==2">已学/总课程：<span style="color:#1E90FF">{{item.learnedCourseCount}}</span>/{{item.totalCourseCount}}<br></span>
                      <span class="black">考试成绩：{{item.testScore}}</span>
                      <br>
                      <span class="black">证书：<span style="color:#888888">{{item.certStatus}}</span></span>
                      <br>
                      <span class="black">入班方式：
                        <span v-if="item.entryClassMode===1">报名</span>
                        <span v-if="item.entryClassMode===2">导入</span>
                      </span>
                      <br>
                      <span class="reason"
                            :title="item.removeReason"
                            v-if="isRemoveMid==1">移除原因：{{item.removeReason | ellipsis}}</span>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </div>
            <div class="container-card"></div>
            <el-pagination background
                           layout="prev, pager, next"
                           :total="total"
                           :page-size="paging.pageSize"
                           style="float:right"
                           @current-change="handleCurrentChange"
                           :hide-on-single-page="true">
            </el-pagination>
          </el-main>
        </el-container>
      </div>
      <sturosterlist style="margin-top:13.5px"
                     v-if="listShow"
                     ref="rosterList"
                     :isDataPermission="isDataPermission"
                     :options="options"
                     @switchCard="switchCard"
                     @importStudents="importStudents"
                     @jumpDetail="jumpDetail"
                     @removeBtnList="removeBtnList"
                     @renewBtnList="renewBtnList">
      </sturosterlist>

      <el-dialog title="导入学员"
                 :visible.sync="importStudentsVisible"
                 :close-on-click-modal=false
                 width="40%">
        <p>你正在【{{className}}】批量导入学员</p>
        <p>规则说明：</p>
        <p>1.如果导入学员信息在平台已注册，则直接给与学习权限；如导入学员信息在平台未注册，则生成新账号后给予学习权限。</p>
        <p>2.登录名为手机号，默认密码为123456，学员登录后可自行修改密码</p>
        <p>3.如果导入的学员已存在于该课，则不会对原有学员信息进行修改</p>
        <p>4.请严格按照模板说明填入信息</p>
        <!-- <el-input v-model="input" @focus="upload" readonly style="width:20%;margin:0 10px"></el-input> -->
        <el-form ref="ruleForm"
                 class="margin-top"
                 :model="form"
                 style="width: 60%;display: inline-block;float: left;">
          <el-form-item label="请选择需要导入的文件"
                        prop="upload"
                        class="upload">
            <el-upload ref="upload"
                       class="upload-demo"
                       :action="importStudentApi"
                       :headers="{
            Authorization: jtoken,
            OpDomain:opDomain
          }"
                       :data="{
            classId:classId,
            type:type
          }"
                       accept=".xlsx, .xls"
                       :before-remove="beforeRemove"
                       :on-remove="handleRemove"
                       :before-upload="beforeUpload"
                       :on-change="handleChange"
                       :limit="1"
                       :on-exceed="handleExceed"
                       :on-success="handleSuccess"
                       :auto-upload="false"
                       :file-list="fileList">
              <el-button size="small">
                <i class="el-icon-upload2" />上传Excel
              </el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-link type="primary"
                 style="display:inline-block;float: left; margin-top: 17px;"
                 @click="downloade"
                 v-if="type=='NEW'">
          点击下载模板
        </el-link>
        <el-dialog width="30%"
                   title="提示"
                   :visible.sync="innerVisible"
                   :close-on-click-modal=false
                   append-to-body>
          数据导入需要时间，请稍后再来查看
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="innerVisible=false">确定</el-button>
          </span>
        </el-dialog>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="importStudent"
                     style="margin-right:40%">点击上传</el-button>
        </span>
      </el-dialog>
      <el-dialog title="移除学员"
                 :visible.sync="removeDialog"
                 :close-on-click-modal=false
                 width="30%">
        <el-form ref="stateForm"
                 :model="stateForm"
                 label-width="90px"
                 style="width:85%">
          <el-form-item label="移除原因：">
            <el-input type="textarea"
                      v-model="stateForm.removeReason"
                      :autosize="{ minRows: 4, maxRows: 17}"
                      style="margin-top:15px"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="removeStudent">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <studentdetails v-if="!rostShow"
                    :studentId="studentId"
                    @switchRost="switchRost"></studentdetails>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { globalOpdomain } from '@/utils/index'
import { mapActions } from 'vuex'
import sturosterlist from '../sturosterlist/index.vue'
import studentdetails from '../studentdetails/index.vue'
const { promiseBaseUrl } = document.querySelector('body').dataset
export default {
  components: {
    sturosterlist,
    studentdetails
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 34) {
        return value.slice(0, 34) + '...'
      }
      return value
    }
  },
  data () {
    return {
      className: '',
      checked: false,
      classToCategoryVOList: [],
      isRemoveMid: 2,
      isRemove: 2,
      paging: {
        pageNum: 1,
        pageSize: 12
      },
      searchForm: {
        studentName: '',
        companyName: '',
        mobile: '',
        addressCode: undefined,
        level: undefined
      },
      address: [],
      searchDefaultForm: {},
      stateForm: {
        studentIds: [],
        removeReason: ''
      },
      total: 0,
      importStudentsVisible: false,
      innerVisible: false,
      removeDialog: false,
      file: '',
      fileList: [],
      errMsg: [],
      fileName: null,
      classId: '',
      studentInfoList: [],
      form: {
        file: '',
        id: ''
      },
      importStudentApi: (promiseBaseUrl || process.env.VUE_APP_API) + '/teachservice/roster/importstudent',
      opDomain: globalOpdomain(),
      mainLoading: true,
      listShow: true, // 列表页和卡片页显隐
      rostShow: true, // 花名册和详情页的显隐
      studentId: '',
      type: '',
      options: [],
      props: {
        value: 'areaCode',
        label: 'name',
        // expandTrigger: 'hover',
        checkStrictly: true
      },
      isDataPermission: false,
      // lazyProps: {
      //   lazy: true,
      //   checkStrictly: true,
      //   // expandTrigger: 'hover',
      //   lazyLoad: this.lazyLoad
      // },
      OptionS: []
    }
  },
  // 监听模态框的关闭清除数据
  watch: {
    dialimportStudentsVisibleog (val) {
      if (val === false) {
        this.fileList = []
        this.errMsg = []
      }
    }
  },
  computed: {
    jtoken () {
      return util.cookies.get('token')
    }
  },
  created () {
    this.$api.CHECK_DATA_PERMISSION().then(res => {
      this.isDataPermission = res.data
    })
    this.searchDefaultForm = JSON.parse(JSON.stringify(this.searchForm))
    this.getRosterList()
    this.$api.GET_USER_AREA().then(res => {
      if (res.data && res.data.length > 0) {
        this.options = res.data
      }
    })
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    // lazyLoad (node, resolve) {
    //   if (node.children && node.children.length > 0) {
    //     node.children = []
    //   }
    //   setTimeout(() => {
    //     const { level } = node
    //     if (level == 0) {
    //       node.value = 0
    //     }
    //     this.$api.getArea({ parentCode: node.value }).then(res => {
    //       const province = res.data.map((value, i) => ({
    //         value: value.areaCode,
    //         label: value.name,
    //         leaf: level >= 3
    //       }))
    //       resolve(province)
    //     })
    //   })
    // },
    getRosterList () {
      this.mainLoading = true
      if (this.address.length > 0) {
        this.searchForm.addressCode = this.address[this.address.length - 1]
        this.searchForm.level = this.address.length - 1
      }
      this.$api.GET_ROSTER_LIST({
        classId: this.$route.query.classId,
        isRemove: this.isRemove,
        ...this.paging,
        ...this.searchForm
      }).then(res => {
        this.className = res.data.className
        this.classToCategoryVOList = res.data.classToCategoryVOList
        this.studentInfoList = res.data.studentInfoList.list
        this.total = res.data.studentInfoList.total
        this.paging.pageNum = res.data.studentInfoList.currentPage
        this.isRemoveMid = this.isRemove
        this.mainLoading = false
      })
    },
    // 查询按钮
    getRosterListByName () {
      this.paging.pageNum = 1
      this.getRosterList()
    },
    reset () {
      this.paging.pageNum = 1
      this.address = ''
      this.stateForm.studentIds = []
      this.searchForm = JSON.parse(JSON.stringify(this.searchDefaultForm))
      this.getRosterList()
    },
    // 分页
    handleCurrentChange (val) {
      this.paging.pageNum = val
      this.getRosterList()
    },
    // 移除学员弹窗
    removeBtn () {
      this.removeDialog = true
    },
    // 确认移除学员
    removeStudent () {
      this.$api.REMOVE_STUDENT({
        studentIds: this.stateForm.studentIds,
        removeReason: this.stateForm.removeReason
      }).then(() => {
        this.removeDialog = false
        this.$notify({
          title: '提示',
          message: '移除学员成功',
          type: 'success'
        })
        this.stateForm.studentIds = []
        this.stateForm.removeReason = ''
        if (!this.listShow) {
          this.getRosterList()
        }
        if (this.listShow) {
          this.$refs.rosterList.doRefresh()
        }
      })
    },
    // 恢复在读
    renewStudent () {
      this.$api.RENEW_STUDENT({
        studentIds: this.stateForm.studentIds
      }).then(() => {
        this.$notify({
          title: '提示',
          message: '恢复学员成功',
          type: 'success'
        })
        this.stateForm.studentIds = []
        this.getRosterList()
      })
    },
    // 列表移除学员
    removeBtnList (studentIds) {
      this.stateForm.studentIds = []
      this.stateForm.studentIds.push(studentIds)
      this.removeDialog = true
    },
    // 列表恢复学员
    renewBtnList (studentIds) {
      this.stateForm.studentIds = []
      this.stateForm.studentIds.push(studentIds)
      this.$api.RENEW_STUDENT({
        studentIds: this.stateForm.studentIds
      }).then(() => {
        this.$notify({
          title: '提示',
          message: '恢复学员成功',
          type: 'success'
        })
        this.stateForm.studentIds = []
        this.$refs.rosterList.doRefresh()
      })
    },
    // 导入学员弹窗
    importStudents (e) {
      console.log('importStudents -> e', e)
      this.type = e
      this.classId = this.$route.query.classId
      this.importStudentsVisible = true
    },
    /**
     * 下载模板
     */
    downloade () {
      const getTimestamp = new Date().getTime()
      const url = 'https://static.peixunyun.cn/学员导入模板.xlsx?timestamp=' + getTimestamp
      window.location = url
    },
    // 删除前的判断
    beforeRemove (file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 删除成功的 文件列表清0
    handleRemove () {
      this.form.file = ''
      this.errMsg = []
    },

    // 上传前的判断
    beforeUpload (file) {
      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.warning('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      this.form.file = file
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange (file, fileList) {
      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        return false
      }
      this.form.file = file.raw
      this.fileList = fileList.slice(-1)
      this.fileName = file
    },

    // 上传成功的钩子函数
    handleSuccess (res) {
      console.log('导入学员上传:', res)
      const { code, msg } = res
      if (code === '1') {
        this.form.file = ''
        this.importStudentsVisible = false
        this.innerVisible = true
        this.getRosterList()
        this.$notify({
          title: '提示',
          message: '导入学员成功！',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: msg,
          type: 'warning'
        })
      }
    },
    // 限制上传文件个数
    handleExceed (files, fileList) {
      console.log(files, fileList)
      this.$message.warning('当前只允许上传1个文件')
    },
    // 点击上传回调
    importStudent () {
      if (this.form.file === '') {
        this.$message.warning('请选择上传文件')
      } else {
        this.$nextTick(() => {
          this.$refs.upload.submit()
        })
      }
    },
    jumpDetail (studentId) {
      this.rostShow = false
      this.studentId = studentId
    },
    change (val) {
      console.log('change -> val', val)
      this.checked = val
    },
    getRosterListClear () {
      this.mainLoading = true
      this.stateForm.studentIds = []
      this.stateForm.removeReason = ''
      this.checked = false
      this.paging.pageNum = 1
      this.getRosterList()
    },
    switchBtn () {
      this.getRosterListClear()
      this.listShow = true
    },
    switchCard () {
      this.listShow = false
    },
    switchRost () {
      this.rostShow = true
    },
    // 导出
    handleCommand (e) {
      if (e == 'exportStudents') {
        this.exportStudents()
      }
      if (e == 'exportStudentsDetail') {
        this.exportStudentsDetail()
      }
    },
    // 导出学员
    exportStudents () {
      this.$api.EXPORT_STUDENT_INFO({
        classId: this.$route.query.classId,
        isRemove: this.isRemove,
        appId: util.cookies.get('appId'),
        ...this.searchForm
      }).then(res => {
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: '创建下载任务成功，请前往任务中心进行查看!'
          })
        }
      })
    },
    // 导出班级学员进度
    exportStudentsDetail () {
      this.$api.EXPORT_STUDENT_DETAIL({
        classId: this.$route.query.classId,
        isRemove: this.isRemove,
        appId: util.cookies.get('appId'),
        ...this.searchForm
      }).then(res => {
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: '创建下载任务成功，请前往任务中心进行查看!'
          })
        }
      })
    },
    back () {
      this.$router.push({
        path: '/educational/class'
      })
    }
  }
}
</script>
<style scoped>
.cardInnre {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
}
.card {
  width: 100%;
  height: 150px;
}
.card :hover {
  cursor: pointer;
  background: #f8f8f8;
}
.name {
  width: 54px;
  height: 18px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 31px;
  color: #444444;
  margin-left: -5px;
}
.grey {
  width: 114px;
  height: 19px;
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  line-height: 16px;
  color: #888888;
}
.course {
  width: 126px;
  height: 15px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 24px;
  color: #444444;
}
.black {
  height: 14px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 24px;
  color: #444444;
}
.reason {
  width: 161px;
  height: 32px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 18px;
  color: #3a4d64;
  word-break: break-all;
}
.checked {
  position: absolute;
  top: 10px;
  left: 10px;
}
.greyCss {
  height: 19px;
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  line-height: 16px;
  color: #888888;
}
.compuretu {
  background: #f8f8f8;
}

.container {
  display: flex;
  flex-flow: row wrap;
  flex: auto;
}
.container-card {
  width: 280px;
  position: relative;
  margin: 1%;
}
.opbutton {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
}
.opbutton-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.numControl {
  display: block;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -icab-text-overflow: ellipsis;
  -khtml-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  max-width: 650px;
}
.secendCss {
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
}
.svgCss {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
}
.svgCss:hover {
  fill: #1e90ff;
}
.right {
  display: flex;
  align-items: center;
}
</style>
