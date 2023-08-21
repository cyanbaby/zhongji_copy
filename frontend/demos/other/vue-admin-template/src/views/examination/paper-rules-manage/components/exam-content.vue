<template>
  <div>
    <div class="exam-header">
      <div class="exam-title">{{ examInfo.paperRuleName }}</div>
    </div>
    <div class="exam-content">
      <div class="exam-part" v-for="(part, i) in examInfo.paperStructs" :key="i">
        <div class="part-title-wrap">
          <div class="left-border"></div>
          <div class="part-title">{{ part.partName }}</div>
        </div>
        <div class="part-info">{{ part.partNote }}</div>
        <div v-for="(item, j) in part.paperSubjects" :key="j">
          <div class="part-subject" :id="part.partName + j">
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
              <div>
                <el-radio-group
                  v-model="item.chooseAnswer1"
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
              <div>
                <el-checkbox-group
                  v-model="item.chooseAnswer1"
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
    }
  },
  props: {
    examInfo: {
      type: Object,
      default: () => {
        return {}
      }
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
        text-align: center;
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
