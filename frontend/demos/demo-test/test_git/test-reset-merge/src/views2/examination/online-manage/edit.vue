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
      <span class="page-title">配置考试</span>
    </template>
    <el-steps :active="active">
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="排考" icon="el-icon-upload"></el-step>
    </el-steps>
    <el-form ref="form" v-if="active==1" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="11" :offset="6">
          <el-form-item label="考试类型" prop="examType">
            <el-select v-model="form.examType" style="width:100%" placeholder="请选择">
              <el-option
                label="线上考试"
                value="1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考试活动名称" prop="examName">
            <el-input type="text" v-model="form.examName" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="pkform" v-if="active==2" :model="pkform" :rules="pkRules" label-position="top">
      <el-row>
        <el-col :span="11" :offset="7" style="width: 47%;margin-left: 28%;">
          <el-form-item label="考试设置（考试时间为空代表不限制时间）" prop="examType">
            <el-input type="text" placeholder="科目名称" style="width:200px;" v-model="pkform.examName"/>
            <el-date-picker
              style="margin:0 10px"
              v-model="pkform.value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              >
            </el-date-picker>
            <el-button type="primary">选择试卷</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="pkform" v-if="active==2" :model="pkform" :rules="pkRules" label-width="120px">
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="及格分数" prop="examName">
            <el-input type="text" v-model="pkform.examName" />
          </el-form-item>
          <el-form-item label="成绩设置" prop="examType">
            <el-select v-model="form.examType" style="width:100%" placeholder="请选择">
              <el-option
                label="交卷后立即显示"
                value="1">
              </el-option>
              <el-option
                label="不显示"
                value="1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="答题时长" prop="examName">
            <el-input type="text" v-model="pkform.examName" />
          </el-form-item>
          <el-form-item label="答题次数" prop="examName">
            <el-input type="text" v-model="pkform.examName" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" v-if="active==1" style="text-align: right;">
      <el-button
        @click="doCancel()"
      >
        <span>取消</span>
      </el-button>
      <el-button
        type="primary"
        @click="doNext()"
      >
        <span>下一步</span>
      </el-button>
    </div>
    <div slot="footer" v-if="active==2" style="text-align: right;">
      <el-button
        @click="doPre()"
      >
        <span>上一步</span>
      </el-button>
      <el-button
        type="primary"
        @click="doOver()"
      >
        <span>完成</span>
      </el-button>
    </div>
  </d2-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {},
      pkform: {},
      active: 1,
      pkRules: {
        examType: [
          { required: true, message: '请选择考试类型', trigger: 'blur' }
        ],
        examName: [
          { required: true, message: '请输入考试活动名称', trigger: 'blur' }
        ]
      },
      rules: {
        examType: [
          { required: true, message: '请选择考试类型', trigger: 'blur' }
        ],
        examName: [
          { required: true, message: '请输入考试活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    doCancel () {
      const tagName = this.$route.fullPath
      this.close({ tagName }).then(item => {
        this.$router.push({
          path: '/examination/online_exam'
        })
      })
    },
    doNext () {
      this.active = 2
    },
    doPre () {
      this.active = 1
    },
    doOver () {
      const tagName = this.$route.fullPath
      this.close({ tagName }).then(item => {
        this.$router.push({
          path: '/examination/online_exam'
        })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
