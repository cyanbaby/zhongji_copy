<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }" style="padding:20px 50px">
        <template slot="header">
            <span class="page-title">{{$route.query.examName}}</span>
            <el-button size="mini" @click="doBack" style="float:right;">返回</el-button>
        </template>
        <div class="answer-contenter">
            <div class="left-part">
                <span>注：此处只显示主观题</span>
                <div style="margin-top:20px;" v-for="(part, i) in paperData.studentAnswerRecordGroupVOList" :key="i">
                    <strong>{{part.partName}}</strong>
                    <ul class="left-ul">
                        <div v-for="(item, j) in part.studentAnswerRecordVOList" :key="j">
                            <li @click="changeSubject(part, item, j+1)" v-if="item.checkTime && item.isCorrect == 2" style="background-color:#FF4949;color:#fff;border: 1px solid #DDDDDD;">{{j+1}}</li>
                            <li @click="changeSubject(part, item, j+1)" v-if="item.checkTime && item.isCorrect == 1" style="background-color:#40AE71;color:#fff;border: 1px solid #DDDDDD;">{{j+1}}</li>
                            <li @click="changeSubject(part, item, j+1)" v-if="item.checkTime && item.isCorrect == 3" style="background-color:#92CFA8;color:#fff;border: 1px solid #DDDDDD;">{{j+1}}</li>
                            <li @click="changeSubject(part, item, j+1)" v-if="!item.checkTime" style="border: 1px solid #DDDDDD;color:#40AE71;">{{j+1}}</li>
                        </div>
                    </ul>
                    <el-divider></el-divider>
                </div>
            </div>
            <div class="right-part">
                <div class="right-header">
                    <div class="right-item">
                        <div class="right-value">{{$route.query.studentName}}</div>
                        <div>姓名</div>
                    </div>
                    <div class="right-item">
                        <div class="right-value">{{((paperData.scoreRate || 0)*100).toFixed(2)}}%</div>
                        <div>得分率</div>
                    </div>
                    <div class="right-item">
                        <div class="right-value">{{paperData.testScore || 0}}分</div>
                        <div>分数</div>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="right-content">
                    <div class="part">
                        <div class="partname">
                            <div class="left-div"></div>
                            <strong style="font-size: 20px;">{{studentAnswerRecordGroupVOList.partName}}</strong>
                        </div>
                        <div class="title" style="align-items: center;">
                            <span style="color:red;">*</span>
                            <strong style="display:flex;align-items: center;">{{studentAnswerRecordVOList.index}}.<span v-html="studentAnswerRecordVOList.title"></span>
                                <span style="color:#8399B2;">（问答题{{studentAnswerRecordVOList.score}}分）</span>
                            </strong>
                        </div>
                        <div class="answer">
                            <div class="stu-answer">
                                <div class="answer-type">
                                    考生答案
                                </div>
                                <div class="answer-title" v-html="studentAnswerRecordVOList.studentAnswer">
                                </div>
                                <div style="margin-top:20px;" v-if="studentAnswerRecordVOList.studentAnswerImg">
                                    <img @click="toView(studentAnswerRecordVOList.studentAnswerImg)" style="width:150px;height:100px;cursor: pointer;"
                                        :src="studentAnswerRecordVOList.studentAnswerImg"
                                        alt="">
                                </div>
                            </div>
                            <div style="width: 48%;">
                                <div>
                                    <div class="analysis-type">
                                        参考答案
                                    </div>
                                    <div class="answer-title" v-html="studentAnswerRecordVOList.answer">
                                    </div>
                                </div>
                                <div style="margin-top:20px" v-if="studentAnswerRecordVOList.subjectNote">
                                    <div class="analysis-type">
                                        答案解析
                                    </div>
                                    <div class="answer-title" v-html="studentAnswerRecordVOList.subjectNote">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top:10px;background:#F5FAFF;padding:20px;width:100%;">
                        <span style="margin-right:30px">评判结果</span>
                        <el-input-number :readonly="!studentAnswerRecordVOList.answer" v-model="studentAnswerRecordVOList.gotScore" :min="0" :max="studentAnswerRecordVOList.score"></el-input-number>
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align:center;">
            <el-button type="primary" @click="markexampaperscommit()">提交</el-button>
        </div>
        <el-dialog top="1vh" :close-on-click-modal=false :visible.sync="dialog" :append-to-body="true">
            <img width="100%" :src="viewImg" alt="">
        </el-dialog>
    </d2-container>
</template>

<script>
import {
  d2CrudPlus
} from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      dialog: false,
      paperData: {},
      gotScore: 0,
      studentAnswerRecordGroupVOList: {},
      studentAnswerRecordVOList: {},
      viewImg: ''
    }
  },
  mounted () {
    this.queryexamchecklist()
  },
  methods: {
    changeSubject (part, item, j) {
      this.studentAnswerRecordGroupVOList = this.paperData.studentAnswerRecordGroupVOList.filter(res => res.partName == part.partName)[0]
      this.studentAnswerRecordVOList = this.studentAnswerRecordGroupVOList.studentAnswerRecordVOList.filter((res, i) => res.paperInsSubjectId == item.paperInsSubjectId)[0]
      this.studentAnswerRecordVOList.index = j
    },
    doBack () {
      this.$router.push({
        path: `/examination/review_paper_list?examId=${this.$route.query.examId}&examName=${this.$route.query.examName}`
      })
    },
    queryexamchecklist () {
      this.$api.queryexamchecklist({
        takeExamId: this.$route.query.takeExamId
      }).then(({ data }) => {
        if (!data.studentAnswerRecordGroupVOList) {
          this.$message.warning('未找到答题记录')
          return
        }
        this.paperData = data
        if (data.studentAnswerRecordGroupVOList) {
          this.studentAnswerRecordGroupVOList = this.paperData.studentAnswerRecordGroupVOList.map(res => {
            if (res.studentAnswerRecordVOList.filter(s => !s.checkTime).length) {
              return res
            }
          })[0] || this.paperData.studentAnswerRecordGroupVOList[0]
          const subjectArr = []
          this.studentAnswerRecordGroupVOList.studentAnswerRecordVOList.map((res, i) => {
            if (!res.checkTime) {
              subjectArr.push({
                index: i + 1,
                ...res
              })
            }
          })
          this.studentAnswerRecordVOList = subjectArr[0] || this.paperData.studentAnswerRecordGroupVOList[0].studentAnswerRecordVOList[0]
          if (!subjectArr[0]) {
            this.studentAnswerRecordVOList.index = 1
          }
        }
      })
    },
    markexampaperscommit () {
      this.$api.markexampaperscommit({
        paperInsId: this.$route.query.paperInsId,
        takeExamId: this.$route.query.takeExamId,
        userAnswerRecordId: this.studentAnswerRecordVOList.userAnswerRecordId,
        gotScore: this.studentAnswerRecordVOList.gotScore,
        paperInsSubjectId: this.studentAnswerRecordVOList.paperInsSubjectId,
        testPaperId: this.$route.query.testPaperId
      }).then(({ data }) => {
        this.$message.success('提交成功！')
        this.queryexamchecklist()
      })
    },
    toView (img) {
      this.dialog = true
      this.viewImg = img
    }
  }
}

</script>

<style lang="scss" scoped>
    .hr {
        width: 100%;
        height: 1px;
        border: none;
        margin: 20px 0;
        border-bottom: 1px dashed rgb(233, 233, 233);
    }

    .answer-contenter {
        display: flex;

        .left-part {
            position: fixed;
            width: 280px;
            border: 1px solid #DDDDDD;
            padding: 20px;
            margin-right: 10px;
            max-height: 500px;
            overflow-y: auto;

            .left-ul {
                display: flex;
                flex-wrap: wrap;
                margin-top: 20px;

                li {
                    display: flex;
                    margin-right:10px;
                    cursor: pointer;
                    justify-content: center;
                    margin-bottom: 10px;
                    cursor: pointer;
                    align-items: center;
                    width: 28px;
                    height: 28px;
                }
            }
        }

        .right-part {
            width: 100%;
            margin-left: 280px;
            padding-left: 50px;

            .right-header {
                width: 100%;
                display: flex;

                .right-item {
                    text-align: center;
                    margin-right: 50px;
                    line-height: 40px;

                    .right-value {
                        color: #1E90FF;
                        font-family: Arial;
                        font-size: 36px;
                        font-weight: bold;
                    }
                }
            }

            .right-content {
                .part {
                    padding-bottom: 30px;

                    .partname {
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;

                        .left-div {
                            width: 4px;
                            height: 20px;
                            background: #4598F9;
                            opacity: 1;
                            border-radius: 2px;
                            margin-right: 10px;
                        }
                    }

                    .title {
                        display: flex;
                        margin-bottom: 20px;
                    }

                    .answer {
                        display: flex;

                        .stu-answer {
                            width: 48%;
                            margin-right: 50px;
                        }

                        .answer-title {
                            color: #666666;
                            background: #F8F8F8;
                            padding:20px
                        }

                        .answer-type {
                            font-size: 12px;
                            display: inline-block;
                            margin-bottom: 10px;
                            background: #40AE71;
                            border-radius: 16px;
                            padding: 7px;
                            color: #fff;
                        }

                        .analysis-type {
                            font-size: 12px;
                            display: inline-block;
                            margin-bottom: 10px;
                            background: #FBE3B9;
                            border-radius: 16px;
                            padding: 7px;
                            color: #8E6E35;
                        }
                    }
                }
            }
        }
    }

</style>
