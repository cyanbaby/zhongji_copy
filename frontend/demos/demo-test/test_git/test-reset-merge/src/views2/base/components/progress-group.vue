<template>
<div>
    <ul >
        <li v-for =" item in progressDataList" :key= "item.name">
            <el-row >
                 <el-col :span="8" style="margin-top:-12px;">  {{item.name}}  </el-col>
                  <el-col :span="12"><div>
                      <el-progress :key="item.percent"  :percentage="getProgress(item.name)"></el-progress>
                      </div></el-col>
            </el-row>
        </li>
    </ul>
</div>
</template>
<script>
export default {
  data () {
    return {
      progressDataList: [
      ]
    }
  },
  methods: {
    updateProgressGroup (dataList) {
      this.progressDataList = []
      for (var index in dataList) {
        if (typeof dataList[index] === 'string') {
          this.putProgress(dataList[index], 0)
        } else {
          this.putProgress(dataList[index].name, dataList[index].percent)
        }
      }
    },
    clearAll () {
      console.log('clear all')
      this.progressDataList = []
    },
    putProgress (name, percent) {
      console.log('name=', name, ',percent=', percent)
      const pct = percent || 0
      const element = this.progressDataList.find(v => {
        if (v.name === name) {
          return true
        } else {
          return false
        }
      })
      if (element) {
        element.percent = pct
      } else {
        this.progressDataList.push({ name: name, percent: pct })
      }
    },
    getProgress (name) {
      const element = this.progressDataList.find(v => {
        if (v.name === name) {
          return true
        } else {
          return false
        }
      })
      if (element) {
        return element.percent
      } else {
        return 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
