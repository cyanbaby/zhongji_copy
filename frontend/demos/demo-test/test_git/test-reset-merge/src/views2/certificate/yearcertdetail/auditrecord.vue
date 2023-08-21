<template>
  <d2-container>
    <el-link
        :underline="false"
        type="primary"
        @click="goYearCertList"
        style="margin:20px">
        返回证书详情
    </el-link>
   <el-table
    :data="studentInfo"
    stripe
    border
    :header-cell-style="{backgroundColor:'#F2F2F2'}"
    style="width: 40vw;margin-bottom:30px">
    <el-table-column
      prop="studentName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="idCardNum"
      label="身份证号"
      width="180">
    </el-table-column>
    </el-table>
    <ul class="applyInfo-box">
        <li class="others" v-if="$route.query.certType==3">
          <h4 style="padding-left:2em">
            年度
          </h4>
          <span>{{ ApplyRecordInfo.certYear }}年</span>
        </li>
        <li class="others"  v-if="$route.query.certType==3">
          <h4>学时要求</h4>
          <span>{{ ApplyRecordInfo.classHour }}学时</span>
        </li>
        <li class="others">
          <h4 style="padding-left:2em">
            专业
          </h4>
          <span>{{ ApplyRecordInfo.major }}</span>
        </li>
        <li class="others">
          <h4 style="padding-left:2em">
            课程
          </h4>
          <div style="display:flex;flex-direction:column;margin-top:2px">
            <div
              v-if="ApplyRecordInfo.classCourseList&&ApplyRecordInfo.classCourseList.length>0"
              class="anothers"
            >
              <h4 style="font-size:12px">
                班级内课程
              </h4>
              <div
                v-for="(item, index) in ApplyRecordInfo.classCourseList"
                :key="index"
                style="padding:2px"
              >
                <span v-if="item.courseName.length>25">{{ item.courseName.substring(0,25)+'...' }}</span>
                <span v-else>{{ item.courseName }}</span>
                <span style="color:#888">({{ item.classHour }}学时)</span>
              </div>

            </div>
              <div
                  v-if="ApplyRecordInfo.classCourseList&&ApplyRecordInfo.classCourseList.length>0&&ApplyRecordInfo.courseList&&ApplyRecordInfo.courseList.length>0"
                style="width:100%;border-bottom:#CBCBD1 1px solid;margin:14px 0"
              ></div>
            <div
              v-if="ApplyRecordInfo.courseList&&ApplyRecordInfo.courseList.length>0"
              class="anothers"
            >
              <h4 style="font-size:12px">
                单门课程
              </h4>
              <div
                v-for="(item, index) in ApplyRecordInfo.courseList"
                :key="index"
                 style="padding:2px"
              >
                <span v-if="item.courseName.length>25">{{ item.courseName.substring(0,25)+'...' }}</span>
                <span v-else>{{ item.courseName }}</span>
                <span style="color:#888">({{ item.classHour }}学时)</span>
              </div>
            </div>
          </div>
        </li>
        <li class="others">
          <h4>申请时间</h4>
          <span>{{ ApplyRecordInfo.applyTime }}</span>
        </li>
        <li class="others">
          <h4>审核时间</h4>
          <span>{{ ApplyRecordInfo.auditTime }}</span>
        </li>
        <li class="others">
          <h4>审核结果</h4>
          <span
            v-if="ApplyRecordInfo.auditStatus === 1"
            style="color:#67c23a;font-weight:bold;text-shadow: 2px 2px 5px;"
          >{{ '通过' }}</span>
          <span
            v-if="ApplyRecordInfo.auditStatus === 2"
            style="color:#f56c6c;font-weight:bold;text-shadow: 2px 2px 5px;"
          >{{ '不通过' }}</span>
        </li>
        <li>
          <el-card
            shadow="never"
            style="width:50%;background:#F8F8F8;margin-left:80px;max-height:130px"
          >
            <span
              v-if="ApplyRecordInfo.auditStatus === 1"
              style="margin:0"
            >
              {{ ApplyRecordInfo.auditResult ? ApplyRecordInfo.auditResult : '审核通过' }}
            </span>
            <span
              v-if="ApplyRecordInfo.auditStatus === 2"
              style="margin:0">
              {{ ApplyRecordInfo.auditResult ? ApplyRecordInfo.auditResult : '审核不通过' }}
            </span>
          </el-card>
        </li>
    </ul>

  </d2-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      studentInfo: [{
        idCardNum: '',
        studentName: '',
        sex: ''
      }],
      ApplyRecordInfo: {}
    }
  },
  created () {
    this.getCertApplyRecord()
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    async getCertApplyRecord () {
      const { data: res } = await this.$api.GET_CERT_APPLYRECORD({
        ucId: this.$route.query.ucId
      })
      this.ApplyRecordInfo = res
      this.studentInfo[0].idCardNum = this.ApplyRecordInfo.idCardNum
      this.studentInfo[0].studentName = this.ApplyRecordInfo.studentName
      this.studentInfo[0].sex = this.ApplyRecordInfo.sex
    },

    goYearCertList () {
      // const tagName = this.$route.fullPath
      // this.close({ tagName }).then(() => {
      //   this.$router.push({
      //     path: '/certificate/yearcertdetail',
      //     query: {
      //       certId: this.$route.query.certId
      //     }
      //   })
      // })
      window.history.go(-1)
    }
  }
}
</script>
<style lang="scss">
.failed-comment{
    .el-scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow: scroll;
    height: 120%;
  }
}

</style>
<style lang="scss" scoped>
  .applyInfo-box{
    width: 40vw;
    display:flex;
    flex-direction:column;
    margin-left:5px;
     font-size:14px;
    h4{
      color: #888888;
      margin:0;
      padding-right:2em;
    }
    span{
      color:#444;
    }
    li{
      margin-bottom:25px;
      div{
        display: flex;
        flex-direction: row;
      }
    }
    .others{
      display: flex;
      flex-direction: row;
    }
    .anothers{
      display: flex;
      flex-direction: column;
      span{
        padding-right:20px
      }
    }
  }
</style>
