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
      <span class="page-title">{{$route.query.id ? '编辑':"新增"}}试题</span>
    </template>
    <component
      :is="componentTypes[$route.query.questionTypeId == 4 ? 2 : $route.query.questionTypeId - 1]"
      :subject-data="subjectData"
    ></component>
  </d2-container>
</template>

<script>
import SingleSelectSubject from './components/single-select-subject.vue'
import MultipleSelectSubject from './components/multiple-select-subject.vue'
import QuestionSelectSubject from './components/question-select-subject.vue'
export default {
  components: { SingleSelectSubject, MultipleSelectSubject, QuestionSelectSubject },
  data () {
    return {
      componentTypes: [
        SingleSelectSubject,
        MultipleSelectSubject,
        QuestionSelectSubject
      ],
      subjectData: localStorage.getItem('subjectData') ? JSON.parse(localStorage.getItem('subjectData')) : {}
    }
  }
}
</script>

<style lang="scss">
</style>
