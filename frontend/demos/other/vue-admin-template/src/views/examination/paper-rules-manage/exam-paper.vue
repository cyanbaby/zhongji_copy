<template>
  <div class="exam-wrap">
    <exam-content
      :examInfo="examInfo"
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
      examInfo: {}
    }
  },
  mounted () {
    this.showDetail()
  },
  methods: {
    showDetail () {
      if (this.$route.query.paperRuleId) {
        this.$api.previewPaper({
          paperRuleId: this.$route.query.paperRuleId
        }).then(({ data }) => {
          for (let i = 0; i < data.paperStructs.length; i++) {
            const element = data.paperStructs[i]
            for (let j = 0; j < element.paperSubjects.length; j++) {
              const element1 = element.paperSubjects[j]
              if (element1.subjectTypeCode === 3) {
                element1.optionalContent = "[{flag:'A', optContent:'对'}, {flag:'B', optContent:'错'}]"
              }
            }
          }
          data.paperStructs.sort((a, b) => b.orderFlag - a.orderFlag)
          this.examInfo = data
        })
      } else {
        this.$api.preview({
          testPaperId: localStorage.getItem('testPaperId')
        }).then(({ data }) => {
          this.examInfo = data
        })
      }
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
