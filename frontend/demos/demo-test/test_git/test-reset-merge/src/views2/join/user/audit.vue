<!--
 * @Author: your name
 * @Date: 2021-04-14 21:07:30
 * @LastEditTime: 2021-07-22 15:33:20
 * @LastEditors: Please set LastEditors
 * @Description: 报名人审核
 * @FilePath: \o-front-admin\src\views\join\user\audit.vue
-->

<template>
  <div>

    <d2-container>
      <!-- 左侧步骤条 -->
      <div class="ArticleSteps">
        <div style="height: 400px;width: 170px;"
             v-if="show">
          <el-steps direction="vertical"
                    :active="Active">
            <el-step title="提交报名">
              <template slot="description">
                {{postForm.name}} <br>
                {{postForm.auditTime}}
              </template>
            </el-step>
            <el-step>
              <template slot="title">
                <span v-if="postForm.auditStatus == 0">审核中</span>
                <span v-if="postForm.auditStatus == 1">审核通过</span>
                <span class="audit-fail" v-if="postForm.auditStatus == 2">审核不通过</span>
              </template>
              <template slot="description">
                招考单位 <br>
                <span v-if="postForm.auditStatus == 1">{{postForm.comment}}</span>
              </template>
            </el-step>
            <el-step title="审核完成"></el-step>
          </el-steps>
        </div>
        <div style="height: 400px;"
             v-else>
          <el-steps direction="vertical"
                    :active="Active">
            <el-step></el-step>
            <el-step></el-step>
            <el-step></el-step>
          </el-steps>
        </div>
        <div class="show-hidden-btn"
             @click="show = !show">
          {{show ? '收起' : '展开'}}
        </div>
      </div>
      <div>
        <div class="headCss">
          <span class="page-title">审核详情</span>
          <el-button type="primary"
                     plain
                     style="float: right;"
                     size="mini"
                     @click="backS">返回</el-button>
        </div>
        <div style="display: flex;justify-content: space-between; align-items:center;padding: 15px 0;">
          <div style="display:flex; width:100%;justify-content: space-between;">
            <span class="page-title"
                  v-if="postForm.auditStatus == 1 || postForm.auditStatus == 2"
                  style="font-size:15px">审核时间：{{ postForm.auditTime }}</span>
            <span class="page-title"
                  v-if="postForm.auditStatus == 1 || postForm.auditStatus == 2"
                  style="font-size:15px">审核人：{{ postForm.auditorName }}</span>
          </div>
          <div style="display:flex; width: 100%;justify-content: flex-end;">
            <div style="margin-right:50px; display: inline-block; line-height:34px">
              <span class="page-title"
                    style="font-size:15px">报考岗位：{{postSForm.positionName}}</span>
            </div>
            <el-button type="success"
                       size="small"
                       icon="el-icon-back"
                       :disabled="index == 0"
                       @click="back">上一个</el-button>
            <el-button type="warning"
                       size="small"
                       icon="el-icon-right"
                       @click="next">下一个</el-button>
            <el-button type="primary"
                       v-if="postForm.auditStatus == 0"
                       size="small"
                       icon="el-icon-edit"
                       @click="showAudit">审核</el-button>
          </div>
        </div>
      </div>
      <!-- 待审核 -->
      <div style="display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;width:100%;height:auto;margin-bottom:20px;">
        <div style="flex-grow:1;width: 100%;height:auto;">
          <div class="pdf-content">
            <span style="padding-left:10px;margin-left:10px;border-left: #4598F9 3px solid;font-weight: bold;margin-top: 20px;display: inline-block;">报名人信息</span>
            <div>
              <pdf ref="pdf"
                   :src="postForm.enterFormUrl"
                   v-for="i in pageCount"
                   :key="i"
                   :page="i">
              </pdf>
            </div>
          </div>
        </div>
        <!-- 岗位信息 -->

        <br>
        <div>
          <span style="padding-left:10px;margin-left:10px;border-left: #4598F9 3px solid;font-weight: bold;">岗位要求</span>
          <div class="postInfo">
            <el-form label-width="100px"
                     :model="postForm">
              <el-form-item label="岗位名称">
                <el-input disabled
                          v-model="postForm.positionName"></el-input>
              </el-form-item>
              <el-form-item label="招聘人数">
                <el-input disabled
                          v-model="postForm.recruitNum"></el-input>
              </el-form-item>
              <el-form-item label="学历要求">
                <el-select disabled
                           style="width:100%;"
                           v-model="postForm.degree"
                           placeholder="请选择">
                  <el-option v-for="item in education"
                             :key="item.dictDataValue"
                             :label="item.dictDataName"
                             :value="item.dictDataValue">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄要求">
                <div style="width:390px;height:40px;background:#fff;padding:0 15px;display: flex;"
                     v-if="postForm.limitedAge == 1">
                  <div style="margin-right:20px">{{time(postForm.startBirthDate)}}—{{time(postForm.endBirthDate)}}</div>
                  <div style="color:red"
                       v-if="postForm.age >= '35'">报名人年龄 {{postForm.age}}岁</div>
                  <div v-else>
                    <span v-if="postForm.age">报名人年龄{{postForm.age}}岁</span>
                  </div>
                </div>
                <div style="width:390px;height:40px;background:#fff;padding:0 15px"
                     v-if="postForm.limitedAge == 2">
                  <div>不限制</div>
                </div>
              </el-form-item>
              <el-form-item label="专业要求">
                <p style="margin-top:0"
                   v-if="postSForm.profession == 1">
                  <span>研究生：</span>
                  <el-cascader v-model="postSForm.master"
                               :options="options1"
                               :props="props"
                               :disabled="SHOW"
                               clearable
                               style="width:85%" />
                </p>
                <p v-if="postSForm.profession == 1">
                  <span style="margin-left:14px;">本科：</span>
                  <el-cascader v-model="postSForm.bachelor"
                               :options="options2"
                               :props="props"
                               :disabled="SHOW"
                               clearable
                               style="width:85%" />
                </p>
                <p v-if="postSForm.profession == 1">
                  <span style="margin-left:14px;">专科：</span>
                  <el-cascader v-model="postSForm.junior"
                               :options="options3"
                               :props="props"
                               :disabled="SHOW"
                               clearable
                               style="width:85%;" />
                </p>
                <el-input v-model="postSForm.customProfession"
                          v-if="postSForm.profession == 2"
                          :disabled="Status"
                          placeholder="请输入专业名称"
                          style="width:100%;" />
              </el-form-item>
              <el-form-item label="岗位介绍">
                <el-input disabled
                          v-model="postForm.introduce"
                          type="textarea"
                          :rows="5"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input disabled
                          v-model="postForm.memo"
                          type="textarea"
                          :rows="5"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div v-if="srcList.length>0">
        <div class="page-title file-info"
             style="font-size:16px;font-weight: bold;">附件信息</div>
        <div>
          <div v-for="item in postForm.userOtherVOS"
               :key="item.otherInfoId">
            <div class="accessory">
              <div style="font-weight:bold; margin-right:20px;">{{item.fieldName}}:</div>
              <div v-for="items in item.userOtherInfoDOS"
                   :key="items.otherInfoId">
                <el-image :src="items.fieldValue"
                          :preview-src-list="srcList">
                </el-image>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 审核弹框 -->
      <el-dialog title="审核"
                 :visible.sync="dialog"
                 width="500"
                 @closed="closed">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="审核结果">
            <el-radio v-model="form.auditStatus"
                      label="1">审核通过</el-radio>
            <el-radio v-model="form.auditStatus"
                      label="2">审核不通过</el-radio>
          </el-form-item>
          <el-form-item label="选择常用语">
            <el-select v-model="form.region"
                       style="width:95%"
                       @change="Change"
                       placeholder="请选择常用语">
              <el-option v-for="item in OptionSSS"
                         :key="item.id"
                         :label="item.commonWords"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核理由">
            <el-input v-model="form.comment"
                      type="textarea"
                      :rows="4"
                      style="width:95%"
                      placeholder="审核通过不需要填审核理由，如需更多审核常用语请联系平台管理员" />
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="submit"
                     :disabled="flag">确 定</el-button>
        </span>
      </el-dialog>
    </d2-container>
  </div>

</template>

<script>
/* eslint-disable */ 

import * as api from './api'
import Pdf from 'vue-pdf'
import merge from 'webpack-merge'
import JsonMainBox from './components/json-main-box.vue'
import util from '@/libs/util'
// import { globalBaseUrl, parseTime, globalOpDomain } from '@/utils/index'
import { findItemIndexInArrayByValue } from '@/utils/array-utils'
export default {
  components: {
    JsonMainBox,
    Pdf
  },
  data () {
    return {
      // 总页数
      pageCount: undefined,
      options1: [],
      options2: [],
      options3: [],
      Active: 0,
      Status: true,
      disabledS: true,
      OptionSSS: [], // 审核常用语
      show: false,
      jsonData: {},
      props: {
        value: 'catalogId',
        label: 'catalogName',
        multiple: true,
        checkStrictly: true
      },
      dialog: false,
      form: {
        auditStatus: '',
        region: '',
        comment: ''
      },
      defaultForm: {},
      info: {},
      isLastRecord: true,
      recordId: '',
      flag: false,
      postForm: {},
      postSForm: {},
      // 学历要求
      education: [],
      tableData: [],
      props: {
        value: 'catalogId',
        label: 'catalogName',
        multiple: true,
        checkStrictly: true
      },
      registrationForm: [],
      IdList: [],
      index: localStorage.getItem('preIndex'),
      srcList: [],
      SHOW: true
    }
  },
  mounted () {
    const _this = this
    if (this.$route.query.recordId) {
      this.recordId = this.$route.query.recordId
    }
    // 学历字典
    this.$api.GetDegree().then(res => {
      this.education = res.data
    })
    _this.$api.GetAcademic().then(res => {
      _this.academicOptions = res.data
    })
    this.$api.GetPoliticalStatus().then(res => {
      this.politicalStatusOptions = res.data
    })
    // 不同学历专业
    this.$api.GetMajor({
      catalogType: 4 // 1/文件类型 2/专科类型 3/本科类型 4/研究生类型 5/研究生博士
    }).then(res => {
      this.options1 = res.data
    })
    this.$api.GetMajor({
      catalogType: 3 // 1/文件类型 2/专科类型 3/本科类型 4/研究生类型 5/研究生博士
    }).then(res => {
      this.options2 = res.data
    })
    this.$api.GetMajor({
      catalogType: 2 // 1/文件类型 2/专科类型 3/本科类型 4/研究生类型 5/研究生博士
    }).then(res => {
      this.options3 = res.data
    })
  },
  created () {
    this.defaultForm = JSON.parse(JSON.stringify(this.form))
    localStorage.setItem('preIndex', 0)
    localStorage.setItem('idList', JSON.stringify(this.IdList))
    this.firstPage()
  },
  // TODO 业务场景，报名表关联活动一旦发布后，应不允许修改报名表，否则会导致数据不同步问题,目前后端做了该逻辑控制，但是列表处未限制
  // 故涉及到报名表需要严格测试，联动逻辑尽量放代码中使用自定义组件，否则出现bug无法修改。如学历专业联动逻辑： "select_1621577719247":"3","cascader_1623935688817"
  methods: {
    // pdf
    getPageNum () {
      const loadingTask = Pdf.createLoadingTask(this.postForm.enterFormUrl, { withCredentials: false })
      loadingTask.promise.then(Pdf => {
        this.pageCount = Pdf.numPages
      }).catch(err => {
        console.error('pdf加载失败', err)
      })
    },
    time (str) {
      const arr = str.trim().split(' ')
      return arr[0]
    },
    closed () {
      this.form = {
        auditStatus: '',
        region: '',
        comment: ''
      }
    },
    refresh () {
      this.form = JSON.parse(JSON.stringify(this.defaultForm))
    },
    firstPage () {
      const ts = this
      api.GetObjKao({
        recordId: ts.$route.query.recordId
      }).then(res => {
        ts.IdList.push(ts.$route.query.recordId)
        localStorage.setItem('idList', JSON.stringify(ts.IdList))
        ts.getInfo(res)
      })
    },
    // 上一个
    back () {
      const ts = this
      const preIndex = this.index - 1
      const curRid = this.IdList[preIndex]
      ts.$router.push({
        query: {
          activityId: ts.$route.query.activityId,
          positionId: ts.$route.query.positionId,
          recordId: curRid,
          auditStatus: ts.$route.query.auditStatus
        }
      })
      api.GetObjKao({
        recordId: curRid
      }).then(res => {
        ts.index--
        localStorage.setItem('preIndex', JSON.stringify(this.index))
        ts.getInfo(res)
      })
    },

    // 下一个
    next () {
      const ts = this
      api.GetObjKaoList({
        activityId: ts.$route.query.activityId,
        positionId: ts.$route.query.positionId,
        recordId: ts.$route.query.recordId,
        auditStatus: ts.$route.query.auditStatus
      }).then(res => {
        if (res.data.recordId) {
          ts.getInfo(res)
          if (ts.IdList.indexOf(res.data.recordId) == -1) {
            ts.IdList.push(res.data.recordId)
            localStorage.setItem('idList', JSON.stringify(ts.IdList))
            ts.index++
            localStorage.setItem('preIndex', JSON.stringify(ts.index))
          }
          ts.$router.push({
            query: {
              activityId: ts.$route.query.activityId,
              positionId: ts.$route.query.positionId,
              recordId: res.data.recordId,
              auditStatus: ts.$route.query.auditStatus
            }
          })
        } else {
          ts.$message({
            message: '暂无报名人员',
            type: 'warning'
          })
        }
      })
    },
    getInfo (res) {
      this.postForm = res.data
      this.getPageNum()
      const arr = []
      if (!res.data.userOtherVOS) res.data.userOtherVOS = []
      res.data.userOtherVOS.forEach(item => {
        item.userOtherInfoDOS.forEach(items => {
          arr.push(items.fieldValue)
        })
      })
      this.srcList = arr
      api.QUERY_JOB_INFORMATION({
        positionId: res.data.positionId
      }).then(res => {
        this.postSForm = res.data
      })
      // 侧边栏状态
      if (res.data.auditStatus == 0) {
        this.Active = 2
      } else if (res.data.auditStatus == 1 || res.data.auditStatus == 2) {
        this.Active = 3
      }
    },
    submit () { // 审核确定
      const _this = this
      if (this.form.auditStatus == 2 && this.form.comment == '') {
        this.$message({
          message: '审核不通过请填写审核意见',
          type: 'warning'
        })
      } else {
        api.AUDIT_STUDENT({
          ...this.form,
          recordId: this.$route.query.recordId
        }).then((res) => {
          if (res.code == '1') {
            _this.dialog = false
            _this.$message({
              message: '审核成功',
              type: 'success'
            })
            _this.firstPage(res.data.recordId)
            _this.refresh()
          } else {
            _this.dialog = false
          }
        })
      }
    },
    showAudit () { // 查询常用语
      this.dialog = true
      api.COMMON_EXPRESSIONS_LIST({
        activityId: this.postForm.activityId
      }).then(res => {
        this.OptionSSS = res.data
      })
    },
    Change (val) { // 选择常用语
      this.OptionSSS.forEach(item => {
        if (item.id == val) {
          this.form.comment = item.commonWords
        }
      })
    },
    backS () { // 返回
      this.$router.push({ path: '/join/user1', query: { activityId: this.$route.query.activityId } })
    }
  }
}
</script>
<style lang="scss">
.Html table {
  border-collapse: collapse;
  th,
  td {
    text-align: center;
    border: solid 1px;
  }
}
</style>
<style lang="scss" scoped>
.file-info{
  margin:20px 0;
}
.pdf-content{
  width: 100%;
  max-height: 647px;
  overflow-y: scroll;
  border: 1px solid #ddd;
}
.el-steps--vertical{
  box-shadow: 0px 0px 10px 4px #eee;
  padding: 20px 10px;
  margin-left: 5px;
}
.show-hidden-btn{
  color:#409EFF;
  text-decoration:underline;
  cursor:pointer;
  padding:10px 0 0 10px;
  font-size:14px;
}
.audit-fail{
  color: #f56c6c;
}
.accessory {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  span {
    font-weight: bold;
  }
  .el-image {
    width: 200px;
    height: 100px;
  }
}
.headCss {
  padding-bottom: 30px;
  justify-content: space-between;
  border-bottom: solid 1px #999;
}
// 覆盖表单生成器禁用样式
::v-deep .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #fff;
  color: #606266;
  cursor: not-allowed;
}
::v-deep .el-input__prefix,
.el-input__suffix {
  display: none;
}
::v-deep .el-form-item__label {
  width: 100px !important;
}
// ::v-deep input {
//   width: 400px;
// }

::v-deep.el-input__prefix,
.el-input__suffix {
  display: none;
}
.postInfo {
  width: 530px;
  background: #f5f5f5;
  padding: 10px 20px 20px 20px;
  margin-top: 25px;
}
.ArticleSteps {
  position: absolute;
  top: 180px;
  left: 14px;
  // display: flex;
  z-index: 10;
  background-color: rgba($color: #fff, $alpha: 1);
}
</style>
