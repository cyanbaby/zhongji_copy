/**
  单选题抽象
*/
<template>
  <div class="subject-container">
    <div>
      <div class="subject-header">
        <div class="subject-header-left">
          <div class="index-wrap">
            <div class="index">1</div>
          </div>
          <span style="line-height: 40px"> 单选题 </span>
        </div>
      </div>
      <div class="subject-content">
        <vue-rich-text-editor
          v-model="submitInfo.title"
          :height="60"
          :toolbars="toobars"
          :max-words="500"
        />
      </div>
      <div class="subject-options">
        <div
          v-for="(item, index) in submitInfo.chooses"
          :key="index"
          class="single-option"
        >
          <div class="single-option-first">
            <div class="item-index">
              {{ String.fromCharCode('A'.charCodeAt(0) + index) }}
            </div>
          </div>
          <div class="single-option-content" style="width:100%">
            <vue-rich-text-editor
              v-model="item.optionalContent"
              :height="60"
              :toolbars="toobars"
              :max-words="500"
            />
          </div>
          <div class="single-option-del">
            <a
              href="#"
              @click="deleteOptionItem(index)"
              style="margin-right: 20px"
            >
              <i class="el-icon-delete"></i>
            </a>
          </div>
        </div>
        <div class="subject-options-add">
          <el-button
            type="warning"
            icon="el-icon-plus"
            circle
            @click="addOptionItem"
            plain
          ></el-button>
        </div>
      </div>
      <div class="subject-submit">
        <el-button type="primary" size="mini" @click="saveTheSubject">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueRichTextEditor from '@/components/rich-editor/vue-rich-text-editor.vue'
export default {
  components: { VueRichTextEditor },
  props: {
    subjectData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      submitInfo: {},
      toobars: [
        [
          'fullscreen',
          '|',
          'undo',
          'redo',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'removeformat',
          'formatmatch',
          '|',
          'forecolor',
          'backcolor',
          'insertorderedlist',
          'insertunorderedlist',
          '|',
          'fontsize',
          'touppercase',
          'tolowercase',
          '|',
          'date',
          'time',
          'spechars'
        ]
      ]
    }
  },
  mounted () {
    if (JSON.stringify(this.subjectData) != '{}') {
      this.initData(this.subjectData)
    }
  },
  methods: {
    filterP (phtml) {
      if (phtml.substring(0, 3) == '<p>') {
        return phtml.substring(3, phtml.length - 4)
      } else {
        return phtml
      }
    },
    initData (subjectData) {
      this.$set(this.submitInfo, 'questionType', 1)
      this.$set(this.submitInfo, 'questionId', subjectData.questionId)
      this.$set(this.submitInfo, 'title', subjectData.title)
      this.$set(this.submitInfo, 'chooses', subjectData.chooses)
      this.$set(this.submitInfo, 'seqno', subjectData.seqno)
      this.$set(this.submitInfo, 'showd', subjectData.showd)
    },
    saveTheSubject () {
      this.$set(this.submitInfo, 'questionType', 1)
      if (this.validate(this.submitInfo)) {
        if (!this.submitInfo.questionId) {
          let tempSubject
          if (this.$route.query.idEdit) {
            tempSubject = JSON.parse(localStorage.getItem('tempSubjectData'))
            tempSubject[this.$route.query.idEdit] = this.submitInfo
          } else {
            tempSubject = localStorage.getItem('tempSubjectData') ? JSON.parse(localStorage.getItem('tempSubjectData')).concat([{
              ...this.submitInfo
            }]) : [{
              ...this.submitInfo
            }]
          }
          localStorage.setItem('tempSubjectData', JSON.stringify(tempSubject))
        } else {
          localStorage.setItem('editSubjectData', JSON.stringify(this.submitInfo))
        }
        this.$router.push({ path: '/examination/survey_edit', query: { id: this.$route.query.id } })
      }
    },
    validate (si) {
      if (!si.title) {
        this.$message.warning('题目内容必填')
        return false
      }
      if (si.chooses.length <= 0 || (si.chooses.length && si.chooses.filter(res => !res.optionalContent).length)) {
        this.$message.warning('请输入选项')
        return false
      }
      return true
    },
    deleteOptionItem (index) {
      const arr = this.submitInfo.chooses
      if (arr.length === 2) {
        this.$notify({
          title: '提示',
          message: '至少保留两个选项!',
          type: 'info'
        })
        return
      }
      arr.splice(index, 1)
    },
    addOptionItem () {
      if (!this.submitInfo.chooses) {
        this.submitInfo.chooses = []
      }
      let nextChar = 'A'
      const arr = this.submitInfo.chooses
      if (arr.length > 0) {
        nextChar = this.calcNextChar(arr[arr.length - 1].flag)
      }
      arr.push({
        flag: nextChar,
        optionalContent: ''
      })
      this.$forceUpdate()
    },
    calcNextChar (ch) {
      return String.fromCharCode(ch.charCodeAt(0) + 1)
    }
  },
  watch: {
    'subjectData.subjectId' (newVal) {
      console.log('new subjectId:', newVal)
      this.$set(this.submitInfo, 'subjectId', newVal)
    },
    'subjectData.title' (newVal) {
      console.log('new title:', newVal)
      this.$set(this.submitInfo, 'title', newVal)
    },
    'subjectData.chooses' (newVal) {
      console.log('new chooses:', newVal)
      this.$set(this.submitInfo, 'chooses', newVal)
    },
    'subjectData.showd' (newVal) {
      console.log('new showd:', newVal)
      this.$set(this.submitInfo, 'showd', newVal)
    },
    'subjectData.seqno' (newVal) {
      console.log('new seqno:', newVal)
      this.$set(this.submitInfo, 'seqno', newVal)
    }
  }
}
</script>
<style lang='scss' scoped>
.subject-container {
  input {
    border: 1px solid #dcdfe6;
  }
  margin: 20px auto;
  font-size: 14px;
  .subject-header {
    margin: 10px 20px;
    display: flex;
    justify-content: space-between;
  }
  .subject-header-left {
    display: flex;
    .index-wrap {
      text-align: center;
      margin-right: 20px;
      .index {
        width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: #ffcc33;
        border-radius: 50%;
        color: #fff;
      }
    }
  }
  .subject-catalog {
    display: flex;
    .subject-catalog-title {
      width: 120px;
    }
  }
  .subject-content {
    display: flex;
    margin: 10px 20px;
  }
  .subject-options {
    .single-option {
      margin: 20px auto;
      display: flex;
      .item-index {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin-left: 20px;
      }
      .single-option-content {
        margin-left: 20px;
      }
      .single-option-del {
        margin-left: 20px;
        margin-top: 10px;
      }
    }
    .subject-options-add {
      width: 40px;
      height: 40px;
      margin-left: 20px;
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .subject-answer {
    display: flex;
    margin: 10px 20px;
    align-items: center;
    .subject-answer-title {
      padding: 0 10px;
      border-radius: 12px;
      background: #fbe3b9;
      height: 24px;
      line-height: 24px;
      display: inline-block;
    }
    .subject-answer-input {
      line-height: 25px;
      margin-left: 15px;
    }
  }
  .subject-explain {
    margin: 0 20px;
    .subject-explain-title {
      padding: 0 10px;
      border-radius: 12px;
      background: #fbe3b9;
      height: 24px;
      line-height: 24px;
      display: inline-block;
    }
    .subject-explain-input {
      margin-top: 10px;
    }
  }
  .subject-submit {
    margin: 20px 20px;
  }
}
.item-hidden {
  height: 1px;
  visibility: hidden;
  background-color: green;
  border: 3px solid red;
}
</style>
