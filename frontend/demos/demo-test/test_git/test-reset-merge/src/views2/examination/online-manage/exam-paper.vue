<template>
  <div class="exam-wrap">
    <exam-content
      :examInfo="examInfo"
      :scene="scene"
      :studentName="studentName"
    ></exam-content>
  </div>
</template>

<script>
import examContent from './components/exam-content.vue'
export default {
  components: {
    examContent
  },
  data () {
    return {
      menuList: [],
      breadList: [],
      componentId: '',
      partList: [],
      examInfo: {},
      studentName: '',
      scene: 1 // 组件场景 1：答题  2：记录
    }
  },
  mounted () {
    this.scene = +this.$route.query.scene
    this.studentName = localStorage.getItem('studentName')
    if (this.scene == 2) {
      this.showRecord()
    } else {
      this.showDetail()
    }
  },
  methods: {
    showDetail () {
      this.$api.preview({
        testPaperId: localStorage.getItem('testPaperId')
      }).then(({ data }) => {
        for (let i = 0; i < data.testPaperInstanceStructs.length; i++) {
          const element = data.testPaperInstanceStructs[i]
          element.testPaperInstanceSubjects.map(res => {
            if (res.subjectTypeCode === 3) {
              res.optionalContent = "[{flag:'A', optContent:'对'}, {flag:'B', optContent:'错'}]"
            }
          })
        }
        this.examInfo = data
      })
    },
    showRecord () {
      this.$api.checkanswerrecord({
        takeExamId: localStorage.getItem('takeExamId')
      }).then(({ data }) => {
        for (let i = 0; i < data.testPaperInstanceStructs.length; i++) {
          const element = data.testPaperInstanceStructs[i]
          element.testPaperInstanceSubjects.map(res => {
            if (res.subjectTypeCode === 2) {
              res.userAnswer = res.userAnswer
                ? res.userAnswer.split(';')
                : []
            } else if (res.subjectTypeCode === 3) {
              if (res.userAnswer === 'false') {
                res.userAnswer = 'B'
              } else if (res.userAnswer === 'true') {
                res.userAnswer = 'A'
              }
              res.optionalContent = "[{flag:'A', optContent:'对'}, {flag:'B', optContent:'错'}]"
            }
          })
        }
        this.examInfo = data
      })
    }
  }
}
</script>

<style lang="scss">
  .exam-wrap {
    color: #000;
    width: 70%;
    margin: 0 auto;
  }
</style>
