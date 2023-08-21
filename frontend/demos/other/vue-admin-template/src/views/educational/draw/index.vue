<template>
    <div class="container">

      <span @click="countdown" class="countdown">倒计时</span>
        <div class="head">
          <span class="activeName">{{activityName | ellipsisName}}</span>
        </div>

        <div class="drawboder">
          <div v-if="!start&&!end">
            <div class="avatar" v-if="suspend">
              <span class="ava-name">{{select | ellipsis}}</span>
            </div>
            <!-- <el-avatar :size="155" :src="circleUrl" class="avatar" v-if="suspend"></el-avatar> -->
            <div class="avatar-after" v-if="goOn">
              <span class="ava-name">{{select | ellipsis}}</span>
            </div>
            <!-- <el-avatar :size="155" :src="circleUrl" class="avatar-after" v-if="goOn"><span class="ava-name">{{select | ellipsis}}</span></el-avatar> -->
            <span class="order" v-if="order<10">0{{order}}</span>
            <span class="order" v-if="order>=10">{{order}}</span>

          </div>
            <span class="end" v-if="end">本轮抽签已结束，请导出抽签结果</span>
        </div>
        <div class="drawbuttun" v-if="start">
          <div class="inner" @click="startBtn" @keyup.enter="enter">
            <span class="startBtn">开始抽签</span>
          </div>
        </div>
        <div class="drawbuttun" v-if="suspend">
          <div class="inner" @click="suspendBtn" @keyup.enter="enter">
            <span class="startBtn">暂停</span>
          </div>
        </div>
        <div class="drawbuttun" v-if="goOn">
          <div class="inner" @click="startBtn" @keyup.enter="enter">
            <span class="startBtn">继续抽签</span>
          </div>
          <span @click="afreshBtn" v-if="goOn" type="text" class="afreshBtn">重新抽签</span>
        </div>
        <div class="drawbuttun" v-if="end">
          <div class="inner" @click="exportBtn">
            <span class="startBtn">导出结果</span>
          </div>
            <span @click="afreshBtn" v-if="end" type="text" class="afreshBtn">重新抽签</span>
        </div>
        <div v-if="dialogVisible" class="mask"></div>
        <div v-if="dialogVisible" class="dialog">
          <span class="tip">重新抽签后将清空本轮抽签内容，请确认是否继续？</span>
          <div class="btn">
            <div class="cancel">
              <div class="inner" @click="cancel">
                <span class="cancelCss">取消</span>
              </div>
            </div>
            <div class="confirm">
              <div class="inner" @click="confirm">
                <span class="confirmCss">确认</span>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  filters: {
    ellipsisName (value) {
      if (!value) return ''
      if (value.length > 30) {
        return value.slice(0, 30) + '...'
      }
      return value
    },
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 7) {
        return value.slice(0, 7) + '...'
      }
      return value
    }
  },
  data () {
    return {
      list: [],
      circleUrl: '',
      selectIndex: '',
      select: '',
      start: true,
      suspend: false,
      goOn: false,
      end: false,
      timer: '',
      selectArr: [],
      activityName: this.$route.query.activityName,
      order: 0,
      dialogVisible: false
    }
  },
  created () {
    this.restart()
    this.enter()
  },
  methods: {
    enter () {
      document.onkeydown = e => {
        // 13表示回车键
        if (e.keyCode === 13) {
          if (this.start || this.goOn) {
          // 回车后执行开始抽签
            this.startBtn()
          } else if (this.suspend) {
            // 回车后执行暂停抽签
            this.suspendBtn()
          }
        }
      }
    },
    // 开始抽签
    startBtn () {
      const index = this.list.length
      if (index == 0) {
        // this.$message. warning('没有样本，无法进行抽签，请确认样本是否导入成功')
        this.start = false
        this.suspend = false
        this.goOn = false
        this.end = true
      } else {
        this.order++
        // 每次运行之前清除timer;
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.selectIndex = Math.floor(Math.random() * index)
          this.select = this.list[this.selectIndex].studentName
        }, 80)
        this.start = false
        this.suspend = true
        this.goOn = false
        this.end = false
      }
    },
    // 暂停抽签
    suspendBtn () {
      this.selectArr = []
      clearInterval(this.timer)
      this.select = this.list[this.selectIndex].studentName
      this.selectArr.push(this.list[this.selectIndex].studentSampleId)
      this.list.splice(this.selectIndex, 1)
      this.start = false
      this.suspend = false
      this.goOn = true
      this.end = false
      // const index = this.list.length
      this.$api.SAVE_DRAW_RESULT({
        activityId: this.$route.query.activityId,
        studentSampleIds: this.selectArr
      }).then(() => {
        /* if (index == 0) {
          this.start = false
          this.suspend = false
          this.goOn = false
          this.end = true
        } else { */

        /* } */
      })
    },
    // 重新开始
    afreshBtn () {
      this.dialogVisible = true
    },
    countdown () {
      const url = this.$router.resolve({
        path: '/countdown'
      })
      window.open(url.href)
    },
    // 抽签清零
    restart () {
      this.$api.RESTART_DRAW({
        activityId: this.$route.query.activityId
      }).then(res => {
        this.list = res.data
        const index = this.list.length
        if (index == 0) {
          this.$message.warning('没有样本，抽签将无法正常进行，请确认样本是否导入成功')
        }
      })
    },
    // 导出抽签结果
    exportBtn () {
      this.$api.IMPORT_RESULT({
        activityId: this.$route.query.activityId
      }).then(res => {
        window.location = res.data
      })
    },
    cancel () {
      this.dialogVisible = false
    },
    confirm () {
      this.order = 0
      this.restart()
      this.start = true
      this.suspend = false
      this.goOn = false
      this.end = false
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>
.container{
  text-align: center;
  background-image: url(./images/drawbg.png);background-size:100% 100%;
  width: 100%;
  height: 100%;
  position: relative;
}
.mask{
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
}
.head{
  background-image: url(./images/drawheader.png);background-size:100% 100%;
  left: 100px;
  right: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  height: 11vh;
  position: absolute;
}
.activeName{
  line-height: 7vh;
  font-size: 5vmin;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #02CDD5;
  background: linear-gradient(0deg, #B9EBFD 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.drawboder{
  background-image: url(./images/drawboder.png);background-size:100% 100%;
  left: 100px;
  right: 100px;
  margin-left: auto;
  margin-right: auto;
  top:20vh;
  width: 67vw;
  height:49vh;
  position: absolute;
}
.avatar{
  /* margin: 30px auto;
  display: block;
  background-color: rgba(57, 184, 221, 0.3);
  border: 3px solid rgba(255,255,255,0.3); */
  width: 30vmin;
  height: 30vmin;
  background: #39B8DD;
  border: 3px solid #FFFFFF;
  opacity: 0.3;
  border-radius: 50%;
  margin: 4vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-after{
  /* margin: 30px auto;
  display: block;
  background: rgba(57, 184, 221, 0.86);
  border: 3px solid #FFFFFF; */
  width: 30vmin;
  height: 30vmin;
  background: #39B8DD;
  border: 3px solid #FFFFFF;
  border-radius: 50%;
  margin: 4vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.order{
  font-size: 7vmin;
  font-family: Arial;
  font-weight: 400;
  color: #FFFFFF;
}
.drawbuttun{
  background-image: url(./images/drawbuttun.png);background-size:100% 100%;
  left: 100px;
  right: 100px;
  margin-left: auto;
  margin-right: auto;
  top: 72vh;
  width: 17vw;
  height: 10vh;
  position: absolute;
}
.inner{
  cursor:pointer;
}
.startBtn{
  line-height: 8vh;
  margin-top: 25px;
  font-size: 4vmin;
  font-family: Source Han Sans CN;
  font-weight: 550;
  color: #FFFFFF;
  background: linear-gradient(0deg, #B9EBFD 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.afreshBtn{
  font-size: 3vmin;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #F7F7D7;
  line-height: 7vh;
  cursor:pointer;
}
.end{
  margin: 21vh auto;
  display: block;
  font-size: 6vmin;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #6ADBE8;
}
.ava-name{
  font-size: 6vmin;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #FEFEFE;
}
.countdown{
  float: left;
  color: #01032c;
  font-size: 4vmin;
  cursor:pointer;
  opacity:0
}
.dialog{
  top:25vh;
  left: 100px;
  right: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 47vw;
  height: 49vh;
  background: #093461;
  border-radius: 30px;
  position: absolute;
  text-align: center;
  padding: 4vh 4vw;
}
.tip{
  font-size: 5vmin;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #6ADBE8;
  line-height: 10vh;
}
.btn{
  display: flex;
  margin-top: 10vh;
  justify-content:center;
}
.cancel{
  background-image: url(./images/cancelBtn.png);background-size:100% 100%;
  width: 15vw;
  height: 8vh;
}
.confirm{
  background-image: url(./images/confirmBtn.png);background-size:100% 100%;
  width: 15vw;
  height: 8vh;
  margin-left: 2vw;
}
.cancelCss{
  font-size: 3vmin;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  line-height: 6vh;
}
.confirmCss{
  font-size: 3vmin;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: white;
  line-height: 6vh;
}
</style>
