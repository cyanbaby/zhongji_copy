<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\question-manage\index.vue
-->
<template>
  <d2-container>
    <template slot="header">
      <span class="page-title">{{ isAdd }}问卷</span>
    </template>
    <div style="overflow: hidden">
      <el-form class="pull-left" ref="form" :rules="rules" :model="form" label-width="110px">
        <el-form-item label="问卷名称" prop="questionnaireSurveyName">
          <el-input placeholder="" v-model="form.questionnaireSurveyName" @input="validquestionnaireSurveyName()">
            <em slot="suffix">{{ form.questionnaireSurveyName.length }} / 25</em>
          </el-input>
        </el-form-item>
        <el-form-item label="问卷说明">
          <el-input type="textarea" placeholder="" style="width: 500px" rows="5" v-model="form.questionnaireSurveyNote">
          </el-input>
        </el-form-item>
        <el-form-item label="分类" prop="questionnaireSurveyCatId">
          <el-cascader v-model="form.questionnaireSurveyCatId" :options="list" style="width: 100%" :props="{
              label: 'questionnaireSurveyCatName',
              value: 'questionnaireSurveyCatId',
              children: 'childCategoryVOS',
              checkStrictly: true,
            }"></el-cascader>
        </el-form-item>
      </el-form>
      <div class="pull-right" style="position: fixed; right: 50px; z-index: 1">
        <el-card class="box-card" style="widthmargin: 20px 0">
          <el-button size="mini"
            @click="setquestionType(1)" type="primary" icon="el-icon-plus">单选题
          </el-button>
          <el-button size="mini"
            @click="setquestionType(2)" type="primary" icon="el-icon-plus">多选题
          </el-button>
          <el-button size="mini"
            @click="setquestionType(4)" type="primary" icon="el-icon-plus">问答题
          </el-button>
        </el-card>
      </div>
    </div>
    问卷结构
    <el-divider></el-divider>
    <el-card v-for="(temp, i) in form.questionDTOS" :key="i" style="margin-bottom: 10px;">
      <div style="display:flex;justify-content: space-between;">
        <div>
          <div style="display:flex;align-items: center;margin-bottom:20px;">
            <el-button size="mini" type="primary">
              {{
                filterDicName(temp.questionType)
              }}
            </el-button>
            <div style="margin-left:10px;display: flex;align-items: center;">{{ i + 1 }}.<span
                v-html="temp.title"></span></div>
          </div>
          <div style="margin-top:10px;">
            <el-radio-group v-if="temp.questionType == 1" disabled>
              <div v-for="(content, c) in temp.chooses" :key="c" style="margin-bottom:10px;">
                <el-radio :label="content.flag">{{ content.flag + "."}}<span v-html="filterP(content.optionalContent)"></span></el-radio>
              </div>
            </el-radio-group>
            <el-checkbox-group v-if="temp.questionType == 2" disabled>
              <div v-for="(content, c) in temp.chooses" :key="c" style="margin-bottom:10px;">
                <el-checkbox :value="content.flag" :label="content.flag">
                  {{ content.flag + "."}}<span v-html="filterP(content.optionalContent)"></span></el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <el-button size="mini" icon="el-icon-edit" @click="editSubject(i, temp)"></el-button>
          <el-button size="mini" icon="el-icon-delete" @click="delSubject(i,temp)"></el-button>
        </div>
      </div>
    </el-card>
    <div style="text-align: center;margin-top:20px;">
      <el-button type="primary" size="mini" @click="doSave()"> 保存 </el-button>
    </div>
  </d2-container>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      form: {
        questionnaireSurveyName: '',
        questionnaireSurveyCatId: ''
      },
      isAdd: '',
      list: [],
      dynamicTags1: [],
      dynamicTags2: [],
      subjectList: [],
      partList: [],
      tempflag: false,
      questionDTOS: [],
      delSurveyData: [],
      rules: {
        questionnaireSurveyName: [{
          required: true,
          message: '请输入问卷名称',
          trigger: 'blur'
        }],
        questionnaireSurveyCatId: [{
          required: true,
          message: '请选择试卷分类',
          trigger: 'change'
        }]
      }
    }
  },
  beforeDestroy () {
    if (!this.tempflag) {
      localStorage.removeItem('tempSubjectData')
      localStorage.removeItem('delSurveyData')
    }
  },
  mounted () {
    window.onbeforeunload = function () {
      localStorage.removeItem('tempSubjectData')
      localStorage.removeItem('delSurveyData')
    }
    this.list = JSON.parse(localStorage.getItem('paperTree'))
    this.getLevel()
    this.form = localStorage.getItem('surveyData') ? JSON.parse(localStorage.getItem('surveyData')) : {}
    localStorage.removeItem('surveyData')
    if (this.$route.query.id) {
      this.getDetail()
      this.isAdd = '编辑'
      this.$route.meta.title = '编辑问卷'
    } else {
      localStorage.removeItem('delSurveyData')
      this.form.questionDTOS = localStorage.getItem('tempSubjectData') ? JSON.parse(localStorage.getItem(
        'tempSubjectData')) : []
      this.isAdd = '新增'
      this.$route.meta.title = '新增问卷'
    }
  },
  methods: {
    filterDicName (dicId) {
      return this.dynamicTags2.length ? this.dynamicTags2.filter(
        (res) =>
          res.dictDataValue != -1 && res.dictDataValue == dicId
      )[0].dictDataName : ''
    },
    filterP (phtml) {
      if (phtml && phtml.substring(0, 3) == '<p>') {
        return phtml.substring(3, phtml.length - 4)
      } else {
        return phtml
      }
    },
    setquestionType (subjectId) {
      localStorage.removeItem('subjectData')
      this.tempflag = true
      localStorage.setItem('surveyData', JSON.stringify(this.form))
      this.$router.push({
        path: 'survey_subject_edit',
        query: {
          questionTypeId: subjectId,
          id: this.$route.query.id
        }
      })
    },
    validquestionnaireSurveyName () {
      if (this.form.questionnaireSurveyName.length > 25) {
        this.form.questionnaireSurveyName = this.form.questionnaireSurveyName.slice(0, 25)
      }
    },
    editSubject (i, row) {
      const len = this.form.questionDTOS.filter(res => res.questionId).length
      this.tempflag = true
      localStorage.setItem('subjectData', JSON.stringify(row))
      this.$router.push({
        path: 'survey_subject_edit',
        query: {
          questionTypeId: row.questionType,
          id: this.$route.query.id,
          idEdit: i - len
        }
      })
    },
    delSubject (i, temp) {
      this.form.questionDTOS.splice(i, 1)
      if (temp.questionId) {
        this.delSurveyData.push(temp.questionId)
        localStorage.setItem('delSurveyData', JSON.stringify(this.delSurveyData))
      } else {
        const data = JSON.parse(localStorage.getItem('tempSubjectData')).filter((res, r) => r != i)
        localStorage.setItem('tempSubjectData', JSON.stringify(data))
      }
    },
    getDetail () {
      this.$api.echoPaper({
        questionnaireSurveyId: this.$route.query.id
      }).then(({
        data
      }) => {
        this.questionDTOS = data.questionVOS.map(res => {
          return {
            ...res,
            chooses: JSON.parse(res.optionalContent)
          }
        })
        if (localStorage.getItem('editSubjectData')) {
          const editId = JSON.parse(localStorage.getItem('editSubjectData'))
          this.questionDTOS = this.questionDTOS.map(res => {
            if (res.questionId == editId.questionId) {
              return editId
            } else {
              return res
            }
          })
        }
        if (localStorage.getItem('delSurveyData')) {
          const delId = JSON.parse(localStorage.getItem('delSurveyData'))
          for (let i = 0; i < delId.length; i++) {
            const element = delId[i]
            this.questionDTOS = this.questionDTOS.filter(res => res.questionId != element)
          }
        }
        this.questionDTOS = this.questionDTOS.concat(localStorage.getItem('tempSubjectData') ? JSON.parse(localStorage.getItem('tempSubjectData')) : [])
        data.questionDTOS = this.questionDTOS
        this.form = data
      })
    },
    doSave () {
      const copyData = _.cloneDeep(this.form.questionDTOS)
      let len = copyData.length
      this.form.questionDTOS = this.form.questionDTOS.map(res => {
        if (res.questionType == 4) {
          return {
            ...res,
            title: this.filterP(res.title),
            orderFlag: len--
          }
        } else {
          return {
            ...res,
            optionalContent: JSON.stringify(res.chooses.map(m => {
              return {
                flag: m.flag,
                optionalContent: this.filterP(m.optionalContent)
              }
            })),
            title: this.filterP(res.title),
            orderFlag: len--
          }
        }
      })
      this.form.questionnaireSurveyCatId = typeof this.form.questionnaireSurveyCatId === 'string' ? this.form
        .questionnaireSurveyCatId : this.form.questionnaireSurveyCatId[this.form.questionnaireSurveyCatId.length - 1]
      this.$api.saveQuestionSurvey({
        ...this.form
      }).then(({
        data
      }) => {
        this.$notify({
          title: '提示',
          message: '操作成功!',
          type: 'success'
        })
        this.$router.push({
          path: '/examination/survey_manage'
        })
      })
    },
    getLevel () {
      this.$api.DICT_LIST({
        typeCode: 'test_subject_level'
      }).then(({
        data
      }) => {
        this.dynamicTags1 = data
      })
      this.$api.DICT_LIST({
        typeCode: 'test_subject_type'
      }).then(({
        data
      }) => {
        this.dynamicTags2 = data
      })
    }
  }
}

</script>

<style lang="scss">
</style>
