<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }"
                class="yearcertdetail-box">
    <template slot="header">
      <span class="page-title">证书详情</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn title="文档链接"
                       link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html" />
        </div>
      </d2-helper>
    </template>
    <div class="big-box">

      <d2-crud-x ref="d2Crud"
                 v-bind="_crudProps"
                 style="height:80vh;margin-top:10px"
                 v-on="_crudListeners"
                 @selection-change="handleSelectionChange"
                 @applyRecord="applyRecord"
                 @addVipmember="addVipmember"
                 @auditCert="auditCert"
                 @previewCert="certPreview">
        <div slot="header">
          <crud-search ref="search"
                       :options="crud.searchOptions"
                       @submit="handleSearch">
            <template slot="startTimeSearchSlot"
                      slot-scope="scope">
              <span style="color:#606266;padding-right:8px">申请时间</span>
              <el-date-picker v-model="scope.form.startTime"
                              type="date"
                              placeholder="开始日期"
                              style="width: 180px;">
              </el-date-picker>
              <span style="color: #888;padding-left:10px">至</span>
            </template>
            <template slot="endTimeSearchSlot"
                      slot-scope="scope"
                      style="margin-left:-5px">
              <el-date-picker v-model="scope.form.endTime"
                              type="date"
                              placeholder="结束日期"
                              style="width: 180px">
              </el-date-picker>
            </template>
          </crud-search>
          <div>
            <el-radio-group v-model="certStatus"
                            size="small"
                            @change="getCertListByStatus">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="3">待审核</el-radio-button>
              <el-radio-button label="0">待打印</el-radio-button>
              <el-radio-button label="1">已打印</el-radio-button>
            </el-radio-group>
          </div>

          <crud-toolbar v-bind="_crudToolbarProps"
                        v-on="_crudToolbarListeners" />
          <el-button v-if="$route.query.certType!=4"
                     type="primary"
                     @click="batchAudit"
                     size="small"
                     style="margin-top:20px">批量审核</el-button>
          <el-button v-if="$route.query.certType==4"
                     type="primary"
                     @click="addAudience"
                     size="small"
                     style="margin-top:20px">导入名单</el-button>
        </div>

        <template slot-scope="scope"
                  slot="applyStatusSlot">
          <span v-if="scope.row.applyStatus === '5' ">已打印</span>
          <span v-else-if="scope.row.applyStatus === '3' ">待审核</span>
          <span v-else-if="scope.row.applyStatus === '6' ">审核不通过</span>
          <span v-else-if="scope.row.applyStatus === '4' ">待打印</span>
          <span v-else>待申请</span>
        </template>
        <template slot-scope="scope"
                  slot="applyTimeSlot">
          <span>{{scope.row.applyTime}}</span>
        </template>
        <template slot-scope="scope"
                  slot="certPrintTimeSlot">
          <span>{{scope.row.certPrintTime}}</span>
        </template>
      </d2-crud-x>
      <el-dialog :visible.sync="auditCertDialog"
                 :close-on-click-modal=false
                 width='40vw'
                 top="5vh">
        <h3 slot="title"
            style="margin:0"
            v-if="isBatchAudit">批量审核证书</h3>
        <h3 slot="title"
            style="margin:0"
            v-else>审核证书</h3>
        <ul class="applyInfo-box">
          <li v-if="!isBatchAudit"
              style="width:100%;display:flex;flex-direction:row;">
            <div style="flex: 1;">
              <h4 style="letter-spacing:2em">学员</h4>
              <span>{{auditStudentInfo.studentName}}</span>
            </div>
            <div style="flex: 1;"
                 v-if="$route.query.certType==3">
              <h4 style="letter-spacing:2em">年度</h4>
              <span>{{auditStudentInfo.certYear}}年</span>
            </div>
          </li>
          <li v-if="!isBatchAudit"
              style="width:100%;display:flex;flex-direction:row;">
            <div style="flex: 1;"
                 v-if="$route.query.certType==3">
              <h4>学时要求</h4>
              <span style="margin-left:30px">{{auditStudentInfo.classHour}}学时</span>
            </div>
            <div style="flex: 1;">
              <h4 style="letter-spacing:2em">专业</h4>
              <span>{{auditStudentInfo.major}}</span>
            </div>

          </li>
          <li v-if="!isBatchAudit">
            <h4 style="letter-spacing:2em">课程</h4>
            <div>
              <div v-if="auditStudentInfo.classCourseList.length>0">
                <h4 style="margin-bottom:10px">班级内课程</h4>
                <div v-for="(item, index) in auditStudentInfo.classCourseList"
                     :key="index">
                  <span v-if="item.courseName.length>25">{{item.courseName.substring(0,25)+'...'}}</span>
                  <span v-else>{{item.courseName}}</span>
                  <span style="padding-left:20px">{{item.classHour}}学时</span>
                </div>
              </div>
              <div v-if="auditStudentInfo.courseList.length>0">
                <h4 style="margin-bottom:10px">单门课程</h4>
                <div v-for="(item, index) in auditStudentInfo.courseList"
                     :key="index">
                  <span v-if="item.courseName.length>25">{{item.courseName.substring(0,25)+'...'}}</span>
                  <span v-else>{{item.courseName}}</span>
                  <span style="padding-left:20px">{{item.classHour}}学时</span>
                </div>
              </div>
            </div>
          </li>
          <li v-if="!isBatchAudit">
            <h4>申请时间</h4>
            <span style="margin-left:30px">{{auditStudentInfo.applyTime}}</span>
          </li>
          <!-- <li  v-if="!isBatchAudit">
        <h4>审核时间</h4>
        <span style="margin-left:30px">{{auditStudentInfo.auditTime}}</span>
      </li> -->
          <li>
            <h4>审核结果</h4>
            <el-radio-group v-model="auditStatus"
                            style="margin-left:30px">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2"
                        v-if="$route.query.certType==3">不通过</el-radio>
              <el-radio :label="2"
                        v-else
                        disabled="disable">不通过</el-radio>
            </el-radio-group>
          </li>
          <li>
            <el-input type="textarea"
                      :rows="2"
                      placeholder="请填写通过/不通过原因"
                      v-model="auditResult"
                      maxlength="100"
                      show-word-limit
                      style="width:70%;margin-left:80px;margin-top:-20px">
            </el-input>
          </li>
        </ul>
        <div slot="footer">
          <el-button @click="auditCertDialog = false">取消</el-button>
          <el-button type="primary"
                     @click="submitAudit">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 导入会员 -->
    <importMember ref="importMember"
                  :dialogMember="dialogMember"
                  @handleCanel="handleCanel"
                  @uploadClick="uploadClick"
                  @pageRequest="statusQuery"
                  @doRefresh="doRefresh" />
    <el-dialog title="证书预览"
               :visible.sync="certPreviewDialog"
               width='48vw'
               class="detail-box"
               :close-on-click-modal=false
               top="5vh">
      <div style="width:100%;height:600px;position:relative">
        <img :src="certPreviewInfo.certBackUrl"
             alt=""
             style="width:100%;height:100%">
        <ul class="cert-preview">
          <li>
            <h2 style="text-align:center;margin-bottom:10px;margin-top:0;color:#333">{{certPreviewInfo.certName}}</h2>
          </li>
          <li style="font-size:18px"
              v-if="certPreviewInfo.studentNameName">{{certPreviewInfo.studentNameName}}：<span style="font-weight:bold">{{certPreviewInfo.studentName}}</span></li>
          <li style="font-size:18px"
              v-if="certPreviewInfo.sexName">{{certPreviewInfo.sexName}}：<span style="font-weight:bold">{{certPreviewInfo.sex}}</span></li>
          <li style="font-size:18px"
              v-if="certPreviewInfo.idCardNumName">{{certPreviewInfo.idCardNumName}}：<span style="font-weight:bold">{{certPreviewInfo.idCardNum}}</span></li>
          <li style="font-size:16px;text-indent:24px;max-height:100px;min-height:50px;line-height:24px">{{certPreviewInfo.templateContent}}</li>
          <li style="font-size:16px"
              v-if="certPreviewInfo.orgNameName">
            {{certPreviewInfo.orgNameName}}
            <span style="font-weight:bold">{{certPreviewInfo.orgName}}
            </span>
          </li>
          <li style="font-size:16px"
              v-if="certPreviewInfo.cidentifierName">{{certPreviewInfo.cidentifierName}}：<span style="font-weight:bold">{{certPreviewInfo.cidentifier}}</span></li>
          <li style="font-size:16px"
              v-if="certPreviewInfo.purchaseTimeName">{{certPreviewInfo.purchaseTimeName}}：<span style="font-weight:bold">{{certPreviewInfo.purchaseTime}}</span></li>
          <li style="font-size:16px"
              v-if="certPreviewInfo.certGiveTimeName">{{certPreviewInfo.certGiveTimeName}}：<span style="font-weight:bold">{{certPreviewInfo.certGiveTime}}</span></li>
        </ul>
        <ul class="img-box">
          <li>
            <img :src="certPreviewInfo.certOfficialUrl1"
                 alt=""
                 style="width:80px;height:80px;border-radius:50%">
          </li>
          <li style="margin-left:100px;display;inline-block">
            <vue-qr :text="downloadData.url"
                    :margin="5"
                    colorDark="#000"
                    colorLight="#fff"
                    :dotScale="1"
                    :logoScale="0.2"
                    :size="85"></vue-qr>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog title="证书预览"
               :visible.sync="certPreviewDialogShu"
               width='48vw'
               class="detail-box"
               :close-on-click-modal=false
               top="5vh">
      <div style="width:100%;height:600px;position:relative">
        <img :src="certPreviewInfo.certBackUrl"
             alt=""
             style="width:100%;height:100%">
        <ul class="cert-preview">
          <li>
            <h2 style="text-align:center;margin-bottom:10px;margin-top:0;color:#333">{{certPreviewInfo.certName}}</h2>
          </li>
          <li style="font-size:18px;text-align: center;"
              v-if="certPreviewInfo.studentNameName"><span style="font-weight:bold">{{certPreviewInfo.studentName}}</span></li>
          <!--    <li style="font-size:18px" v-if="certPreviewInfo.sexName">{{certPreviewInfo.sexName}}：<span style="font-weight:bold">{{certPreviewInfo.sex}}</span></li>
        <li style="font-size:18px" v-if="certPreviewInfo.idCardNumName">{{certPreviewInfo.idCardNumName}}：<span style="font-weight:bold">{{certPreviewInfo.idCardNum}}</span></li> -->
          <li style="font-size:16px;text-indent:24px;max-height:100px;min-height:50px;line-height:24px">{{certPreviewInfo.templateContent}}</li>
          <li style="font-size:16px;text-align: center;"
              v-if="certPreviewInfo.cidentifierName">{{certPreviewInfo.cidentifierName}}：<span style="font-weight:bold">{{certPreviewInfo.cidentifier}}</span></li>
          <li style="margin: 0 auto;display;inline-block">
            <vue-qr :text="downloadData.url"
                    :margin="5"
                    colorDark="#000"
                    colorLight="#fff"
                    :dotScale="1"
                    style="border: 10px solid #fff;margin-bottom: 8px;"
                    :logoScale="0.2"
                    :size="85"></vue-qr>
          </li>
          <li style="font-size:16px;text-align: center;"
              v-if="certPreviewInfo.orgNameName">
            <!-- {{certPreviewInfo.orgNameName}} -->
            <span style="font-weight:bold">{{certPreviewInfo.orgName}}
            </span>
          </li>
          <!--        <li style="font-size:16px" v-if="certPreviewInfo.purchaseTimeName">3{{certPreviewInfo.purchaseTimeName}}：<span style="font-weight:bold">{{certPreviewInfo.purchaseTime}}</span></li>
 -->
          <li style="font-size:16px;text-align: center;margin-bottom: 5px;"
              v-if="certPreviewInfo.certGiveTimeName"><span style="font-weight:bold">{{certPreviewInfo.certGiveTime}}</span></li>
          <li style="text-align: center;">
            <img :src="certPreviewInfo.certOfficialUrl1"
                 alt=""
                 style="width:60px;height:60px;border-radius:50%">
          </li>
        </ul>
        <ul class="img-box">

        </ul>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
// import vueQr from 'vue-qr'
import { d2CrudPlus } from 'd2-crud-plus'
import { myMixin } from '@/mixins'
import importMember from './components/importMember'
import vueQr from 'vue-qr'
import { globalOpDomain } from '@/utils/index'
export default {
  mixins: [d2CrudPlus.crud, myMixin],
  components: {
    importMember,
    vueQr
  },
  data () {
    return {
      certTypeStatus: '',
      downloadData: {
        url: 'https://static.peixunyun.cn/ed1a935935fc4148a60aa29ac4051117.jpg'
      },
      certPreviewDialog: false,
      certPreviewDialogShu: false,
      certPreviewInfo: {
        certName: '餐厅服务员一班证书', // 证书名称.
        orgName: '继教云科技有限公司', // 组织名称.
        certBackUrl: 'https://static.peixunyun.cn/证书_1635323454268.png', // 证书背景图.
        templateContent: '通过了考试，特发此证，以资鼓励！', // 模板内容.
        certOfficialUrl: ['https://static.peixunyun.cn/ed1a935935fc4148a60aa29ac4051117.jpg'] // 公章图1.
      },
      dialogMember: false,
      auditCertDialog: false,
      certStatus: '',
      // 审核结果
      auditStatus: 0,
      // 审核通过/不通过原因
      auditResult: '',
      textarea: '',
      // 是否是批量审核
      isBatchAudit: false,
      ucIds: [],
      ucId: '',
      auditStudentInfo: {
        // 班级内课程
        classCourseList: [
          {
            courseName: '',
            classHour: 0
          }
        ],
        // 单独课程
        courseList: [
          {
            courseName: '',
            classHour: 0
          }
        ],
        applyTime: '',
        auditTime: '',
        auditStatus: 2,
        major: '',
        auditResult: '',
        Url: ''
      }
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    // 预览
    certPreview ({ row }) {
      const path = 'http://' + globalOpDomain() + '/d/#/cert_qrcode?ucId=' + row.ucId + '&certType=' + row.certType
      this.Url = path
      this.certTypeStatus = row.certType
      this.$api.MYCERT_DETAIL({
        ucId: row.ucId,
        certScanUrl: this.Url
      }).then(res => {
        if (res.code == '1') {
          // window.location = res.data
          window.open(res.data, '_blank')
        }
        this.certPreviewInfo = res.data
        // if (this.certPreviewInfo.typesetting == 1) { //横屏
        //   this.certPreviewDialog = true
        //   this.certPreviewDialogShu = false
        // } else {
        //   this.certPreviewDialog = false
        //   this.certPreviewDialogShu = true
        // }
        // this.certPreviewInfo.certOfficialUrl = this.certPreviewInfo.certOfficialUrl.split(',')
      })
    },
    handleCanel () {
      this.dialogMember = false
    },
    // addVipmember({ row }){ //导入观众
    //      console.log( row.ucId)
    //      this.ucId = row.ucId
    //      this.dialogMember = true;
    //      this.$refs.importMember.show(row.ucId);
    // },
    addAudience () { // 导入观众 弹框
      this.dialogMember = true
      this.$refs.importMember.show(this.$route.query.certId)
    },
    uploadClick (form) {
      console.log(form)
      const formdata = new FormData()// 创建form对象
      formdata.append('certId', form.certId)
      formdata.append('file', form.file)
      this.$api.IMPORT_ORDINARY_CERT(formdata).then(res => {
        this.dialogMember = false
        if (res.code === '1') {
          this.$notify({
            title: '提示',
            message: '导入成功!',
            type: 'success'
          })
          setTimeout(() => {
            this.doRefresh()
          }, 100)
        } else {
          this.$message.warning(res.msg)
        }
      }).catch(res => {
        this.dialogMember = false
      })
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    getCertListByStatus () {
      this.doRefresh()
    },
    pageRequest (query) {
      console.log('-------------', query)
      query.certId = this.$route.query.certId
      query.applyStatus = this.certStatus
      query.startTime = new Date(query.startTime).getTime()
      query.endTime = new Date(query.endTime).getTime()
      return this.$api.get_cert_user_list(query)
    },
    async auditCert ({ row }) {
      this.isBatchAudit = false
      this.auditCertDialog = true
      this.ucIds = []
      this.ucIds.push(row.ucId)
      const { data: res } = await this.$api.Get_AUDIT_STUDENT_INFO({
        ucId: row.ucId
      })
      this.auditStudentInfo = res
    },
    batchAudit () {
      if (this.ucIds.length > 0) {
        this.auditCertDialog = true
        this.isBatchAudit = true
      } else {
        this.$message.warning('请选择需要审核的学员')
      }
    },
    submitAudit () {
      console.log(this.ucIds)
      console.log(this.auditResult)
      console.log(this.auditStatus)
      if (this.auditStatus == 1 || this.auditStatus == 2) {
        this.$api.SUBMIT_AUDIT_RESULT({
          ucIds: this.ucIds,
          auditResult: this.auditResult,
          auditStatus: Number(this.auditStatus)
        })
          .then(res => {
            if (res.code == 1) {
              this.doRefresh()
              this.$message.success('审核学员成功')
            }
          })
        this.auditCertDialog = false
      } else {
        this.$message.warning('请选择审核结果')
      }
      this.auditStatus = 0
      this.auditResult = ''
      setTimeout(() => {
        this.doRefresh()
      }, 100)
    },
    handleSelectionChange (arg) {
      const ucIdArr = []
      arg.forEach(item => {
        ucIdArr.push(item.ucId)
      })
      this.ucIds = ucIdArr
    },
    applyRecord ({ row }) {
      this.$router.push({
        path: '/certificate/auditrecord',
        query: {
          certId: row.certId,
          ucId: row.ucId,
          certType: row.certType
        }
      })
    }
  }
}
</script>
<style lang="scss">
.marginLeft.el-button {
  margin-left: 3px;
}
.detail-box {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
}
.big-box {
  .el-dialog__body {
    padding-bottom: 0;
    padding-top: 0;
  }
  .el-dialog__header {
    //border-bottom:2px #f2f2f2 solid;
    padding-bottom: 15px;
    padding-top: 15px;
  }
}
</style>

<style lang="scss" scoped>
.yearcertdetail-box {
  .el-form {
    .el-input {
      width: 140px !important;
    }
  }
}
.img-box {
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 270px;
  justify-content: space-between;
  bottom: 90px;
  right: 7.5vw;
}
.applyInfo-box {
  font-size: 15px;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  li {
    margin-bottom: 40px;
    h4 {
      display: inline-block;
      margin: 0;
    }
  }
  li:first-child,
  li:last-child {
    display: flex;
    flex-direction: row;
  }
  li:nth-child(2) {
    display: flex;
    flex-direction: row;
  }
  li:nth-child(3) {
    display: flex;
    flex-direction: row;
    div {
      margin-bottom: 15px;
    }
    div:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.img-box {
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 270px;
  justify-content: space-between;
  bottom: 90px;
  right: 7.5vw;
}
.cert-preview {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  width: 60%;
  top: 110px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
  > li {
    margin-bottom: 15px;
    display: inline-block;
  }
}
</style>
