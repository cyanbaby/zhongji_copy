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
      <span class="page-title">编辑试题</span>
    </template>
    <el-form ref="form" :model="subjectData" style="overflow: hidden;margin-top:10px;margin-bottom: -30px;" label-width="90px">
      <el-row>
        <el-col :span="1" style="text-align: right;line-height: 45px;margin-left: -15px;">
          <span style="color: red">*</span>
        </el-col>
        <el-col span="23">
          <el-form-item label="选择分类">
            <el-cascader
              v-model="subjectData.paperCatId"
              :options="list"
              style="width: 100%"
              :props="{
                label: 'catValue',
                value: 'testSubjectCatId',
                children: 'treeChild',
                checkStrictly: true
              }"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <component
      :is="componentTypes[subjectData.subjectType-1]"
      :scene='1'
      :subject-data="subjectData"
    ></component>
  </d2-container>
</template>

<script>
/* eslint-disable */ 

import SingleSelectSubject from './components/single-select-subject.vue'
import MultipleSelectSubject from './components/multiple-select-subject.vue'
import JudgeSelectSubject from './components/judge-select-subject.vue'
import QuestionSelectSubject from './components/question-select-subject.vue'
export default {
  components: { SingleSelectSubject, MultipleSelectSubject, JudgeSelectSubject, QuestionSelectSubject },
  data () {
    return {
      componentTypes: [
        SingleSelectSubject,
        MultipleSelectSubject,
        JudgeSelectSubject,
        QuestionSelectSubject
      ],
      subjectData: {},
      testSubjectCatId: '',
      list: ''
    }
  },
  mounted () {
    this.list = this.putFirst(JSON.parse(localStorage.getItem('subjectTree')))
    this.getDetail()
  },
  watch: {
  },
  methods: {
    putFirst (arr) {
      let obj
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].catValue === '默认分类') {
          obj = arr[i]
          arr.splice(i, 1)

          break
        }
      }
      arr.unshift(obj)
      return arr
    },
    getDetail () {
      this.$api.GET_Subject({
        subjectId: this.$route.query.id
      }).then(({ data }) => {
        data.seqno = 1
        data.hardLevel = data.subjectLevel + ''
        data.content = data.subjectContent
        data.chooses = eval(data.optionalContent)
        if (data.subjectType === 2) {
          data.givenAnswers = data.answer
        } else {
          data.givenAnswer = data.answer
        }
        data.givenExplain = data.subjectNote
        data.paperCatId = data.testSubjectCatId || data.paperCatId
        this.subjectData = data
      })
    }
  }
}
</script>

<style lang="scss">
</style>
