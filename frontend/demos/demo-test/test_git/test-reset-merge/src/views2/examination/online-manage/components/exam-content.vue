<template>
  <div>
    <div class="exam-header">
      <div class="exam-title">{{ examInfo.paperName }}</div>
      <div class="exam-info">
        <div class="info-wrap" v-if="scene === 2">
          <span class="sub-title">考试时间: </span
          >{{ examInfo.answerTimeLimit }}分钟
        </div>
        <div class="info-wrap" v-if="scene === 2">
          <span class="sub-title">得分: </span>{{ examInfo.testScore }}分
        </div>
        <div class="info-wrap" v-else>
          <span class="sub-title">总分: </span>{{ examInfo.totalScore }}分
        </div>
        <div class="info-wrap" v-if="scene === 2">
          <span class="sub-title">考生: </span>{{ studentName }}
        </div>
      </div>
    </div>
    <div class="exam-content">
      <div class="exam-part" v-for="(part, i) in examInfo.testPaperInstanceStructs" :key="i">
        <div class="part-title-wrap">
          <div class="left-border"></div>
          <div class="part-title">{{ part.paperInsPartName }}</div>
        </div>
        <div class="part-info">{{ part.paperInsPartNote }}</div>
        <div v-for="(item, j) in part.testPaperInstanceSubjects" :key="j">
          <div class="part-subject" :id="part.paperInsPartName + j">
            <div class="part-wrap">
              <span
                class="exam-type"
                :class="
                  item.subjectTypeCode === 1
                    ? 'single'
                    : item.subjectTypeCode === 2
                    ? 'multiple'
                    : 'judge'
                "
              >
                {{
                  item.subjectTypeDesc.substring(0,item.subjectTypeDesc.length-1)
                }}
              </span>
              {{ j + 1 }}.<span v-html="filterP(item.title)"></span>
              <span class="score">({{ item.score }}分)</span>
            </div>
            <div
              style="margin-left: 20px"
              v-if="item.subjectTypeCode === 1 || item.subjectTypeCode === 3"
            >
              <div v-if="scene === 2" style="position: relative;">
                <div class="right-tip">
                  <img src="@/assets/images/right.png" v-if="item.isCorrect == 1" alt="" class="is-right">
                  <img src="@/assets/images/error.png" v-if="item.isCorrect == 2" alt="" class="is-right">
                </div>
                <el-radio-group
                  v-model="item.userAnswer"
                  disabled
                >
                  <el-radio
                    v-for="(content, c) in changeType(item.optionalContent)"
                    :key="c"
                    :label="content.flag"
                    >{{ content.flag + "." + filterP(content.optContent) }}</el-radio
                  >
                </el-radio-group>
              </div>
              <div v-else>
                <el-radio-group
                  v-model="item.userAnswer1"
                  disabled
                >
                  <el-radio
                    v-for="(content, c) in changeType(item.optionalContent)"
                    :key="c"
                    :label="content.flag"
                    >{{ content.flag + "." + filterP(content.optContent) }}</el-radio
                  >
                </el-radio-group>
              </div>
            </div>

            <div v-if="item.subjectTypeCode === 2" style="margin-left: 20px">
              <div v-if="scene === 2" style="position: relative;">
                <div class="right-tip">
                  <img src="@/assets/images/right.png" v-if="item.isCorrect == 1" alt="" class="is-right">
                  <img src="@/assets/images/error.png" v-if="item.isCorrect == 2" alt="" class="is-right">
                </div>
                <el-checkbox-group
                  v-model="item.userAnswer"
                  disabled
                >
                  <el-checkbox
                    v-for="(content, c) in changeType(item.optionalContent)"
                    :key="c"
                    :label="content.flag"
                    >{{ content.flag + "." + filterP(content.optContent) }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
              <div v-else>
                <el-checkbox-group
                  v-model="item.userAnswer1"
                  disabled
                >
                  <el-checkbox
                    v-for="(content, c) in changeType(item.optionalContent)"
                    :key="c"
                    :label="content.flag"
                    >{{ content.flag + "." + filterP(content.optContent) }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </div>

            <div v-if="item.subjectTypeCode === 4" style="margin-left: 20px;position:relative;">
              <div class="right-tip" v-if="scene === 2">
                <img src="@/assets/images/right.png" v-if="item.isCorrect == 1" alt="" class="is-right">
                <img src="@/assets/images/error.png" v-if="item.isCorrect == 2" alt="" class="is-right">
                <span v-if="item.isCorrect == 3 && item.gotScore">{{item.gotScore}}分</span>
              </div>
            </div>

            <div v-if="item.subjectTypeCode === 4 && scene === 2" class="answer-wrap">
              <div class="answer" style="width: 70px;">考生答案</div>
              <div class="answer-value" v-html="item.userAnswer"></div>
            </div>
            <div v-if="item.subjectTypeCode === 4 && item.userAnswerImg && scene === 2"
              style="margin-top:10px;margin-left:80px;">
              <img :src="item.userAnswerImg" style="width: 100px;height:100px;cursor: pointer;"
                @click="showImg(item.userAnswerImg)" />
            </div>
            <div class="answer-wrap" v-if="scene === 2" style="margin-top: 15px;">
              <div class="answer">答案</div>
              <div class="answer-value">{{ item.answer }}</div>
            </div>
            <div class="note-wrap" v-if="scene === 2 && item.subjectNote">
              <div class="note">解析</div>
              <div v-html="filterP(item.subjectNote)">
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */ 

export default {
  data () {
    return {
      breadList: [],
      dynamicTags: []
    }
  },
  props: {
    examInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    scene: {
      type: Number,
      default: 1
    },
    studentName: {
      type: String,
      default: ''
    }
  },
  mounted () {
  },
  methods: {
    filterP (phtml) {
      if (phtml && phtml.substring(0, 3) == '<p>') {
        return phtml.substring(3, phtml.length - 4)
      } else {
        return phtml
      }
    },
    changeType (data) {
      if (data && data.indexOf('[{') >= 0) {
        if (eval(data)[0].flag && eval(data)[0].optContent) {
          return eval(data)
        } else {
          return []
        }
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.right-tip {
  position: absolute;
  right: 0;

  .is-right {
    width: 40px;
    height: 40px;
  }
}
.exam-header {
  height: 90px;
  text-align: center;
  padding-top: 20px;
  border-bottom: 1px solid #d1d1d1;
  .exam-title {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 41px;
    color: #3a9853;
  }
  .exam-info {
    display: flex;
    justify-content: center;
    .info-wrap {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      margin-right: 40px;
      .sub-title {
        color: #888888;
      }
    }
  }
}
.single {
  background: #40ae71;
}
.multiple {
  background: #4593eb;
}
.judge {
  background: #f8a95a;
}
hr {
  border: none;
  margin: 40px 0;
  border-bottom: 1px dashed #e9e9e9;
}
.exam-content {
  margin-top: 20px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  .exam-part {
    line-height: 40px;
    padding: 0 40px;
    .part-title-wrap {
      display: flex;
      align-items: center;
      .left-border {
        width: 4px;
        height: 20px;
        border-radius: 4px;
        background: #40ae71;
      }
      .part-title {
        padding-left: 8px;
        color: #222222;
      }
    }
    .part-info {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 27px;
      color: #444444;
    }
    .part-subject {
      font-size: 18px;
      .el-radio {
        display: block;
        line-height: 40px;
        color: #444444;
      }
      .el-radio__input.is-disabled+span.el-radio__label{
        color: #444;
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #444444;
      }
      .el-radio__input.is-checked .el-radio__inner {
        border-color: #3a9853;
        background: #3a9853;
      }
      .el-checkbox__input.is-disabled + span.el-checkbox__label {
        color: #444444;
      }

      .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #40ae71 !important;
        border-radius: 2px;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #40ae71 !important;
      }
      .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
        background-color: #3a9853;
        border-color: #dcdfe6;
      }
      .el-checkbox {
        display: block;
        position: relative;
        white-space: nowrap;
      }
      .part-wrap {
        .score {
          color: #8399b2;
        }
        .exam-type {
          display: inline-block;
          width: 40px;
          height: 18px;
          margin-right: 5px;
          color: #fff;
          text-align: center;
          box-sizing: content-box;
          line-height: 18px;
          font-size: 10px;
          border-radius: 6px 6px 6px 0px;
        }
        .required {
          color: #e02020;
        }
      }
      .answer-wrap {
        display: flex;
        .answer {
          width: 48px;
          height: 24px;
          background: #40ae71;
          border-radius: 16px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 23px;
          text-align: center;
          color: #fff;
          margin-right: 15px;
        }
        .answer-value {
          font-size: 20px;
          font-family: Arial;
          font-weight: 400;
          line-height: 23px;
          color: #444444;
        }
      }
      .note-wrap {
        display: flex;
        align-items: center;
        margin-top: 15px;
        .note {
          width: 48px;
          height: 24px;
          background: #fbe3b9;
          border-radius: 16px;
          line-height: 23px;
          color: #8e6e35;
          margin-right: 15px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 500;
        }
        .note-value {
          width: 100%;
        }
      }
    }
  }
}
</style>
