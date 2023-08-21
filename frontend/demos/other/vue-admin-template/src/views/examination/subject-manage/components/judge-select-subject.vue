/**
  判断题抽象
*/
<template>
  <div class="subject-container">
    <div v-if="isShow">
      <div class="subject-header">
        <div class="subject-header-left">
          <div class="index-wrap">
            <div class="index">{{ submitInfo.seqno }}</div>
          </div>
          <span style="line-height: 40px"> 判断题 </span>
        </div>
        <div class="subject-header-right">
          <span style="color: red">*</span>
          <span style="line-height: 40px;margin-right: 10px;"> 难度 </span>
          <el-select v-model="submitInfo.hardLevel" placeholder="请选择">
            <el-option
              v-for="(item, index) in hardLevelDict"
              :key="index"
              :label="item.dictDataName"
              :value="item.dictDataValue"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="subject-content">
        <vue-rich-text-editor
          v-model="submitInfo.content"
          :height="60"
          :toolbars="toobars"
          :max-words="500"
        />
      </div>
      <div class="subject-answer">
        <div class="subject-answer-title">答案</div>
        <div class="subject-answer-input">
          <el-button :type="check?'danger':''" icon="el-icon-check" circle @click="check=!check;error=false;"></el-button>
          <el-button :type="error?'danger':''" icon="el-icon-close" circle @click="error=!error;check=false;"></el-button>
        </div>
      </div>
      <div class="subject-explain">
        <div class="subject-explain-title">解析</div>
        <div class="subject-explain-input">
          <vue-rich-text-editor
            v-model="submitInfo.givenExplain"
            :height="60"
            :toolbars="toobars"
            :max-words="500"
          />
        </div>
      </div>
      <div class="subject-submit">
        <el-button type="primary" size="mini" @click="saveTheSubject">保存</el-button>
      </div>
    </div>
    <div v-if="!isShow">
      <div class="subject-header">
        <div class="subject-header-left">
          <div class="index-wrap">
            <div class="index">{{ submitInfo.seqno }}</div>
          </div>
          <span style="line-height: 40px"> 判断题 </span>
        </div>
        <div class="subject-header-right">
          <span style="line-height: 40px"> 难度：</span>
          {{ findHardLevelNameByValue(submitInfo.hardLevel) }}

          <el-button
            v-if="submitInfo.showd"
            type="text"
            icon="el-icon-delete"
            style="margin-left: 20px"
            @click="deleteSubject"
          ></el-button>
        </div>
      </div>
      <div class="subject-content">
        <div v-html="submitInfo.content"></div>
      </div>
      <div class="subject-options">
        <div
          v-for="(item, index) in submitInfo.chooses"
          :key="index"
          class="single-option"
        >
          <div class="single-option-first">
            <div class="item-index">
              {{ item.flag }}
            </div>
          </div>
          <div class="single-option-content" v-html="item.optContent">
          </div>
        </div>
      </div>
      <div class="subject-answer">
        <div class="subject-answer-title">答案</div>
        <div class="subject-answer-input">
          <el-button v-if="check" type="danger" icon="el-icon-check" circle></el-button>
          <el-button v-if="error" type="danger" icon="el-icon-close" circle></el-button>
        </div>
      </div>
      <div class="subject-explain" v-if="submitInfo.givenExplain">
        <div class="subject-explain-title">解析</div>
        <div class="subject-explain-input" v-html="submitInfo.givenExplain">
        </div>
      </div>
      <div class="subject-submit">
        <el-button type="primary" size="mini" @click="editTheSubject">修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */ 

import VueRichTextEditor from '@/components/rich-editor/vue-rich-text-editor.vue'
import { mapActions } from 'vuex'
export default {
  components: { VueRichTextEditor },
  props: {
    subjectData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    scene: {
      type: Number,
      default: 0
    }
  },
  directives: { // 自定义的v-focus指令
    focus: {
      inserted: function (el, { value }) {
        if (value) {
          $(el).find('input').focus()// 聚焦输入框
        }
      }
    }
  },
  data () {
    return {
      explainEdit: true,
      check: false,
      error: false,
      isShow: true,
      hardLevelDict: [
        {
          dictDataName: '简单',
          dictDataValue: '1'
        },
        {
          dictDataName: '一般',
          dictDataValue: '2'
        },
        {
          dictDataName: '中等',
          dictDataValue: '3'
        },
        {
          dictDataName: '较难',
          dictDataValue: '4'
        },
        {
          dictDataName: '困难',
          dictDataValue: '5'
        }
      ],
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
  created () {},
  mounted () {
    this.initData(this.subjectData)
  },
  computed: {},
  methods: {
    doChange () {
      this.explainEdit = false
    },
    ...mapActions('d2admin/page', ['close']),
    initData (subjectData) {
      this.$set(this.submitInfo, 'hardLevel', subjectData.hardLevel)
      if (!this.scene) {
        if (subjectData.subjectId) {
          this.$set(this.submitInfo, 'subjectId', subjectData.subjectId)
          this.isShow = false
        } else {
          this.isShow = true
        }
      }
      if (subjectData.answer === 'A' || subjectData.answer === 'true') {
        this.check = true
        this.error = false
      } else if (subjectData.answer === 'B' || subjectData.answer === 'false') {
        this.check = false
        this.error = true
      }
      this.$set(this.submitInfo, 'subjectType', 3)
      this.$set(this.submitInfo, 'content', subjectData.content)
      this.$set(this.submitInfo, 'chooses', subjectData.chooses)
      this.$set(this.submitInfo, 'givenExplain', subjectData.givenExplain)
      this.$set(this.submitInfo, 'seqno', subjectData.seqno)
      this.$set(this.submitInfo, 'showd', subjectData.showd)
      this.$set(this.submitInfo, 'subjectId', subjectData.subjectId)
      this.submitInfo.testSubjectCatId = subjectData.testSubjectCatId
    },
    findHardLevelNameByValue (value) {
      const array = this.hardLevelDict
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        if (element.dictDataValue == value) {
          return element.dictDataName
        }
      }
      return ''
    },
    deleteItem () {
      console.log('shanchu')
    },
    editTheSubject () {
      this.isShow = true
    },
    saveTheSubject () {
      console.log('save info:', this.submitInfo)
      if (this.validate(this.submitInfo)) {
        this.$api
          .ADD_Subject({
            subjectId: this.submitInfo.subjectId
              ? this.submitInfo.subjectId
              : '',
            title: this.submitInfo.content,
            subjectLevel: this.submitInfo.hardLevel,
            optionalContent: "[{'flag':'A','optContent':'对'},{'flag':'B','optContent':'错'}]",
            testSubjectCatId: this.subjectData.paperCatId ? (typeof this.subjectData.paperCatId === 'string' ? this.subjectData.paperCatId : this.subjectData.paperCatId[this.subjectData.paperCatId.length - 1]) : (typeof this.subjectData.testSubjectCatId === 'string' ? this.subjectData.testSubjectCatId : this.subjectData.testSubjectCatId[this.subjectData.testSubjectCatId.length - 1]),
            subjectType: this.submitInfo.subjectType,
            answer: this.submitInfo.givenAnswer,
            subjectNote: this.submitInfo.givenExplain
          })
          .then(({ data }) => {
            this.$notify({
              title: '提示',
              message: '操作成功!',
              type: 'success'
            })
            if (this.scene) {
              const tagName = this.$route.fullPath
              this.close({ tagName }).then(item => { this.$router.push({ path: '/examination/subject_manage' }) })
            } else {
              this.submitInfo.subjectId = data.subjectId
              this.$emit('saveSubject', this.submitInfo)
              this.isShow = false
            }
          })
      }
    },
    validate (si) {
      if (!si.testSubjectCatId) {
        this.$message.warning('必须选定分类')
        return false
      }
      if (!si.hardLevel) {
        this.$message.warning('题目难度必填')
        return false
      }
      if (!si.content) {
        this.$message.warning('题目内容必填')
        return false
      }
      if (this.check) {
        si.givenAnswer = 'A'
      }
      if (this.error) {
        si.givenAnswer = 'B'
      }
      if (!si.givenAnswer) {
        this.$message.warning('答案必填')
        return false
      }
      // if (!si.givenExplain) {
      //   this.$message.warning('解析必填')
      //   return false
      // }
      return true
    },
    deleteSubject () {
      const _this = this
      _this
        .$confirm('此操作将永久删除此题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          if (_this.submitInfo.subjectId) {
            _this.$api
              .DEL_Subject({
                subjectId: _this.submitInfo.subjectId
              })
              .then((res) => {
                if (res.code == 1) {
                  this.$notify({
                    title: '提示',
                    message: '删除成功！',
                    type: 'success'
                  })
                  _this.$emit('deleteSubject', _this.submitInfo.seqno)
                } else {
                  this.$notify({
                    title: '提示',
                    message: '删除失败！',
                    type: 'warning'
                  })
                }
              })
          } else {
            _this.$emit('deleteSubject', _this.submitInfo.seqno)
          }
        })
        .catch(() => {
          this.$notify({
            title: '提示',
            message: '已取消删除!',
            type: 'info'
          })
        })
    },
    calcNextChar (ch) {
      return String.fromCharCode(ch.charCodeAt(0) + 1)
    }
  },
  watch: {
    'subjectData.hardLevel' (newVal) {
      console.log('new hardLevel:', newVal)
      this.$set(this.submitInfo, 'hardLevel', newVal)
    },
    'subjectData.subjectId' (newVal) {
      console.log('new subjectId:', newVal)
      this.$set(this.submitInfo, 'subjectId', newVal)
      if (newVal) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    'subjectData.content' (newVal) {
      console.log('new content:', newVal)
      this.$set(this.submitInfo, 'content', newVal)
    },
    'subjectData.chooses' (newVal) {
      console.log('new chooses:', newVal)
      this.$set(this.submitInfo, 'chooses', newVal)
    },
    'subjectData.givenExplain' (newVal) {
      console.log('new givenExplain:', newVal)
      this.$set(this.submitInfo, 'givenExplain', newVal)
    },
    'subjectData.showd' (newVal) {
      console.log('new showd:', newVal)
      this.$set(this.submitInfo, 'showd', newVal)
    },
    'subjectData.seqno' (newVal) {
      console.log('new seqno:', newVal)
      this.$set(this.submitInfo, 'seqno', newVal)
    },
    'subjectData.testSubjectCatId' (newVal) {
      this.submitInfo.testSubjectCatId = this.subjectData.testSubjectCatId
      console.log('new testSubjectCatId:', newVal)
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
        line-height: 40px;
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
