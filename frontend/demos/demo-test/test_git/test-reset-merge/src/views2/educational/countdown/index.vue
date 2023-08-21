<template>
  <div class="container">
      <div class="css">{{formateTime2(timer)}}</div>
      <el-button @click="refresh">重新开始</el-button>
      <el-dialog
        :visible.sync="dialogVisible"
        :close-on-click-modal=false
        width="30%"
      >
        <span slot="footer" class="dialog-footer">
            <el-form :model="countDown" class="demo-form-inline" label-width="80px" :rules="rules" ref="countDown">
            <el-form-item label="时间：" prop="time">
                <el-input-number v-model="countDown.time" :min="0" :controls="false" style="margin-right:10px;width:85%"  placeholder="请输入倒计时总时长"></el-input-number>分钟
            </el-form-item>
                <el-button type="primary" @click="submit">确定</el-button>
            </el-form>
        </span>
        </el-dialog>
  </div>
</template>
<script>
import { formateTime2 } from '@/utils/index'
export default {
  data () {
    return {
      timerCount: null,
      timer: 300,
      dialogVisible: false,
      countDown: {
        time: ''
      },
      defaultForm: {},
      rules: {
        time: [
          { required: true, message: '请输入倒计时总时长', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.setTime()
    this.defaultForm = JSON.parse(JSON.stringify(this.countDown))
  },
  methods: {
    formateTime2,
    setTime () {
      this.timerCount = setInterval(() => {
        if (this.timer == 0) {
          clearInterval(this.timerCount) // 清除定时器
        } else {
          (
            this.timer--
          )
        }
      }, 1000)
    },
    refresh () {
      this.countDown = JSON.parse(JSON.stringify(this.defaultForm))
      this.dialogVisible = true
    },
    submit () {
      this.$refs.countDown.validate((valid) => {
        if (valid) {
          clearInterval(this.timerCount) // 清除定时器
          this.timer = this.countDown.time * 60
          this.setTime()
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.container{
  background-color: black;
  width: 100%;
  height: 100vh;
  text-align: center;
}
.css{
  color: aliceblue;
  font-size: 45vmin;
  padding-top: 25vh;
}
</style>
