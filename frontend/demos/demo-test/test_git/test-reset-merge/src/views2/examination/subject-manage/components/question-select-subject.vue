/**
  问答题抽象
*/
<template>
  <div class="subject-container">
    <div v-if="isShowSingle">
      <div class="subject-header">
        <div class="subject-header-left">
          <div class="index-wrap">
            <div class="index">{{ submitInfo.seqno }}</div>
          </div>
          <span style="line-height: 40px"> 问答题 </span>
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
      <div class="subject-explain">
        <div class="subject-explain-title">答案</div>
        <div class="subject-explain-input">
          <vue-rich-text-editor
            v-model="submitInfo.givenAnswer"
            :height="60"
            :toolbars="toobars"
            :max-words="500"
          />
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
    <div v-if="!isShowSingle">
      <div class="subject-header">
        <div class="subject-header-left">
          <div class="index-wrap">
            <div class="index">{{ submitInfo.seqno }}</div>
          </div>
          <span style="line-height: 40px"> 问答题 </span>
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
          class="single-option"
        >
          <div class="single-option-content" v-html="submitInfo.optContent">
          </div>
        </div>
      </div>
      <div class="subject-explain">
        <div class="subject-explain-title">答案</div>
        <div class="subject-explain-input" v-html="submitInfo.givenAnswer">
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
import VueRichTextEditor from '@/components/rich-editor/vue-rich-text-editor.vue'
import { mapActions } from 'vuex'
/**  组件参数列表
 *   scene: {
      // 场景
      type: Number,
      default: 1 // 场景  1 编辑试题  2 显示试题（后台管理下的显示）
    },
    seqno: {
      // 当前题目序号
      type: Number,
      default: 1
    },
    hardLevel: {
      // 难度
      type: String,
      default: ''
    },
    subjectId: {
      // 题目id
      type: String,
      default: ''
    },
    content: {
      // 内容
      type: String,
      default: ''
    },
    chooses: {
      // 可选项 每个选项的结构： { flag: 'A', optContent:'' }  其中flag是选项标识 比如 A B C D ，optContent是选项内容
      type: Array,
      default: () => {
        return []
      }
    },
    givenAnswer: {
      // 参考答案，单选只有一个
      type: String,
      default: ''
    },
    givenExplain: {
      // 答案解析
      type: String,
      default: ''
    },
    answer: {
      // 用户答题的答案
      type: String,
      default: ''
    },
    showd: {
      // 是否显示删除整个组件的图标
      type: Boolean,
      default: false
    }
 */
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
  data () {
    return {
      isShowSingle: true,
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
    ...mapActions('d2admin/page', ['close']),
    filterP (phtml) {
      if (phtml.substring(0, 3) == '<p>') {
        return phtml.substring(3, phtml.length - 4)
      } else {
        return phtml
      }
    },
    initData (subjectData) {
      this.$set(this.submitInfo, 'hardLevel', subjectData.hardLevel)
      if (!this.scene) {
        if (subjectData.subjectId) {
          this.$set(this.submitInfo, 'subjectId', subjectData.subjectId)
          this.isShowSingle = false
        } else {
          this.isShowSingle = true
        }
      } else {
        if (subjectData.subjectId) {
          this.$set(this.submitInfo, 'subjectId', subjectData.subjectId)
        }
      }
      this.$set(this.submitInfo, 'subjectType', 4)
      this.$set(this.submitInfo, 'content', subjectData.content)
      this.$set(this.submitInfo, 'givenAnswer', subjectData.givenAnswer)
      this.$set(this.submitInfo, 'givenExplain', subjectData.givenExplain)
      this.$set(this.submitInfo, 'seqno', subjectData.seqno)
      this.$set(this.submitInfo, 'showd', subjectData.showd)
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
      this.isShowSingle = true
    },
    saveTheSubject () {
      console.log('save info:', this.submitInfo)
      if (this.validate(this.submitInfo)) {
        this.$api
          .ADD_Subject({
            subjectId: this.submitInfo.subjectId
              ? this.submitInfo.subjectId
              : '',
            title: this.filterP(this.submitInfo.content),
            subjectLevel: this.submitInfo.hardLevel,
            testSubjectCatId: this.subjectData.paperCatId ? (typeof this.subjectData.paperCatId === 'string' ? this.subjectData.paperCatId : this.subjectData.paperCatId[this.subjectData.paperCatId.length - 1]) : (typeof this.subjectData.testSubjectCatId === 'string' ? this.subjectData.testSubjectCatId : this.subjectData.testSubjectCatId[this.subjectData.testSubjectCatId.length - 1]),
            subjectType: this.submitInfo.subjectType,
            answer: this.filterP(this.submitInfo.givenAnswer),
            subjectNote: this.filterP(this.submitInfo.givenExplain)
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
              this.isShowSingle = false
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
                  _this.$notify('删除成功！')
                  _this.$emit('deleteSubject', _this.submitInfo.seqno)
                } else {
                  _this.$message.$notify('删除失败！')
                }
              })
          } else {
            _this.$emit('deleteSubject', _this.submitInfo.seqno)
          }
        })
        .catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
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
        this.isShowSingle = false
      } else {
        this.isShowSingle = true
      }
    },
    'subjectData.content' (newVal) {
      console.log('new content:', newVal)
      this.$set(this.submitInfo, 'content', newVal)
    },
    'subjectData.givenAnswer' (newVal) {
      console.log('new givenAnswer:', newVal)
      this.$set(this.submitInfo, 'givenAnswer', newVal)
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
    margin: 10px 20px;
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
