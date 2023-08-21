<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\question-manage\index.vue
-->
<template>
  <d2-container class="CSJ-editor">
    <template slot="header">
      <span class="page-title">{{isAdd}}试卷</span>
    </template>
    <div style="overflow:hidden;">
    <el-form class="pull-left" ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="组卷方式" prop="paperGroupType">
        <el-radio-group v-model="form.paperGroupType" :disabled="disabledType" @change="changeType">
          <el-radio style="margin-right: 10px" :label="1" value="自动组卷">自动组卷</el-radio>
          <el-radio style="margin-right: 10px" :label="2" value="手动组卷">手动组卷</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择试卷规则" v-if="isShow" prop="paperRuleId">
        <el-select
          v-model="form.paperRuleId"
          @change="changeRule"
          >
          <el-option
            v-for="item in ruleData"
            :key="item.value"
            :label="item.ruleName"
            :value="item.paperRuleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷名称" prop="paperName">
        <el-input placeholder="" v-model="form.paperName" @input="validPaperName()">
          <em slot="suffix">{{ form.paperName.length }} / 25</em>
        </el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input type="textarea" v-model="form.paperNote" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="试卷分类" prop="paperCatId">
        <el-cascader
          v-model="form.paperCatId"
          :options="list"
          style="width: 100%"
          :props="{
            label: 'catValue',
            value: 'testPaperCatId',
            children: 'treeChild',
            checkStrictly: true
          }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="试卷类型" prop="paperType">
        <el-radio-group v-model="form.paperType">
          <el-radio style="margin-right: 10px" v-for="(item,index) in dynamicTags" :key="index" :label="item.dictDataValue" :value="item.dictDataName">{{item.dictDataName}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="pull-right" style="position: fixed;right: 50px;z-index: 1;" v-if="form.paperGroupType == 2">
      <el-card class="box-card" style="widthmargin:20px 0;">
        <h4>统计</h4>
        <p>共{{form.totalItem}}道题，共{{form.totalScore}}分</p>
        <p v-for="(item,i) in partList" :key="i"><span style="margin-right:50px">{{item.partName}}</span><span>共{{item.subjectList?item.subjectList.length:0}}道题，共{{item.partScore || 0}}分</span></p>
      </el-card>
    </div>
    </div>
    <div v-if="!isShow">
      试卷结构
      <el-divider></el-divider>
      <div v-for="(part, num) in partList" :key="num">
        <el-form
          style="display: flex"
        >
          <el-form-item :label="'第'+ numArr[num] + '部分'"> </el-form-item>
          <el-row>
            <el-col :span="1">
                <span style="color: red;line-height: 45px;">*</span>
            </el-col>
            <el-col :span="11">
              <el-form-item label="">
                <el-input placeholder="名称" v-model="part.partName" @input="validPartName(num)">
                  <em slot="suffix">{{ part.partName.length }} / 10</em>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="">
                <el-input placeholder="说明" v-model="part.partNote" @input="validPartNote(num)">
                  <em slot="suffix">{{ part.partNote.length }} / 30</em>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="overflow:hidden;">
          <div class="pull-left" style="margin-bottom:20px;">
            <el-button @click="choseSubject(num)">
              题库选题
            </el-button>
            <el-button @click="delSubject(num)">
              删除
            </el-button>
            <span style="margin-left:20px;">当前已选择{{subjectList[num]?subjectList[num].length:0}}题</span>
          </div>
          <div class="pull-right">
              <span>批量设置分数</span>
              <el-input v-model="part.setScore" :disabled="part.subjectList?false:true" style="width:100px;margin:0 20px">
              </el-input>
              <el-button @click="doSet(num)">
                确定
              </el-button>
          </div>
        </div>
        <div v-for="(item,i) in part.subjectList" :key="i">
          <el-card class="box-card" style="margin:20px 0;">
            <div style="overflow:hidden;color:#A1A1A1;">
              <div class="pull-left">
                <span>难度: {{item.subjectLevel?dynamicTags1.filter(res => res.dictDataValue == item.subjectLevel )[0].dictDataName:""}}</span>
                <span style="margin-left:50px;">类型：{{item.subjectType?dynamicTags2.filter(res => res.dictDataValue == item.subjectType )[0].dictDataName:""}}</span>
              </div>
              <div class="pull-right">
                <span style="color: red;margin-right: 10px;">*</span>
                <el-input v-model="item.score" style="width:100px;" @input="doInput(num)">
                </el-input>分
                <a href="#" @click="deleteItem(i,num,item.score)" style="margin-left:20px">
                  <i class="el-icon-delete"></i>
                </a>
              </div>
            </div>
            <div v-html="item.subjectContent || item.title"></div>
          </el-card>
        </div>
      </div>
      <el-button type="primary" @click="doAdd()">
          添加
      </el-button>
    </div>
    <div style="text-align:center;">
      <el-button type="primary" @click="doSave()">
          保存
        </el-button>
    </div>
    <el-dialog
      :close-on-click-modal=false
      title="选择试题"
      append-to-body
      class="cus-dialog-container"
      :visible.sync="dialog"
      :destroy-on-close="true"
      width="90%"
      top="10px"
      bottom="10px">
        <Subject :isChoose="true" @chooseData="chooseData" @doClose="doClose"></Subject>
    </el-dialog>
  </d2-container>
</template>

<script>
import Subject from '../subject-manage/index.vue'
import Lodash from 'lodash'
import { mapActions } from 'vuex'
export default {
  components: {
    Subject
  },
  data () {
    return {
      numArr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'],
      dialog: false,
      isShow: true,
      disabledType: false,
      form: {
        paperName: '',
        paperCatId: '',
        paperType: '',
        paperGroupType: 1,
        totalScore: 0,
        totalItem: 0
      },
      isAdd: '',
      list: [],
      itemArr: [],
      dynamicTags: [],
      dynamicTags1: [],
      dynamicTags2: [],
      subjectList: [],
      partList: [],
      total: 0,
      ruleData: [],
      itemScore: [],
      rules: {
        paperName: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' }
        ],
        paperCatId: [
          { required: true, message: '请选择试卷分类', trigger: 'change' }
        ],
        paperType: [
          { required: true, message: '请输入试卷类型', trigger: 'change' }
        ],
        paperGroupType: [
          { required: true, message: '请选择组卷方式', trigger: 'change' }
        ],
        paperRuleId: [
          { required: true, message: '请选择试卷规则', trigger: 'change' }
        ]
      },
      part: ''
    }
  },
  beforeDestroy () {
    localStorage.removeItem('chooseItem')
  },
  mounted () {
    this.pageFindPaperRule()
    for (let i = 0; i < this.subjectList.length; i++) {
      this.total += this.subjectList[i].length
    }
    this.list = JSON.parse(localStorage.getItem('paperTree'))
    this.getLevel()
    if (this.$route.query.id) {
      this.disabledType = true
      this.getDetail()
      this.setData()
      this.isAdd = '编辑'
      this.$route.meta.title = '编辑试卷'
    } else {
      this.disabledType = false
      this.isAdd = '新增'
      this.$route.meta.title = '新增试卷'
    }
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    pageFindPaperRule () {
      this.$api.pageFindPaperRule({
        pageNum: 1,
        pageSize: 1000
      }).then(({ data }) => {
        this.ruleData = data.list
      })
    },
    changeRule (e) {
      let obj = {}
      obj = this.ruleData.find((item) => {
        return item.paperRuleId === e
      })
      this.$refs.form.clearValidate('paperName')
      this.form.paperName = obj.ruleName
    },
    changeType (e) {
      if (e == 1) {
        this.isShow = true
      } else {
        if (!this.$route.query.id) {
          this.form.paperName = ''
        }
        this.isShow = false
      }
    },
    validPaperName () {
      if (this.form.paperName.length > 25) {
        this.form.paperName = this.form.paperName.slice(0, 25)
      }
    },
    validPartName (num) {
      if (this.partList[num].partName.length > 10) {
        this.partList[num].partName = this.partList[num].partName.slice(0, 10)
      }
    },
    validPartNote (num) {
      if (this.partList[num].partNote.length > 30) {
        this.partList[num].partNote = this.partList[num].partNote.slice(0, 30)
      }
    },
    chooseData (data) {
      const itemData = Lodash.cloneDeep(data)
      if (itemData && itemData.length > 0) {
        for (var i = 0; i < itemData.length; i++) {
          itemData[i].srcSubjectId = itemData[i].subjectId
        }
      }

      this.dialog = false
      this.partList[this.part].subjectList = itemData
      this.form.totalItem = 0
      for (let i = 0; i < this.partList.length; i++) {
        const element = this.partList[i]
        this.form.totalItem += element.subjectList.length || 0
      }
    },
    doInput (part) {
      let partScore = 0
      for (let j = 0; j < this.partList[part].subjectList.length; j++) {
        partScore += (+this.partList[part].subjectList[j].score)
      }
      this.partList[part].partScore = partScore
      this.setData()
    },
    getDetail () {
      this.$api.GET_Paper({
        paperId: this.$route.query.id
      }).then(({ data }) => {
        if (data.partList) {
          for (let part = 0; part < data.partList.length; part++) {
            const element = data.partList[part]
            if (element.subjectList) {
              let partScore = 0
              for (let i = 0; i < element.subjectList.length; i++) {
                partScore += element.subjectList[i].score
                element.partScore = partScore
              }
            }
          }
          this.partList = data.partList
          data.totalScore = 0
          data.totalItem = 0
          for (let k = 0; k < data.partList.length; k++) {
            data.totalScore += data.partList[k].partScore || 0
            data.totalItem += data.partList[k].subjectList.length
          }
        } else {
          data.totalScore = 0
          data.totalItem = 0
        }
        data.paperType = data.paperType + ''
        this.form = data
        this.changeType(data.paperGroupType)
      })
    },
    doSave () {
      if (this.form.paperGroupType == 1) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.testPaperId = this.form.paperId
            this.form.paperCatId = typeof this.form.paperCatId === 'string' ? this.form.paperCatId : this.form.paperCatId[this.form.paperCatId.length - 1]
            this.$api.savePaperByRule({
              ...this.form
            }).then(({ data }) => {
              this.$notify({
                title: '提示',
                message: '操作成功!',
                type: 'success'
              })
              localStorage.removeItem('chooseItem')
              const tagName = this.$route.fullPath
              this.close({ tagName }).then(item => {
                this.$router.push({
                  path: '/examination/paper_manage'
                })
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        if (this.partList.length) {
          let flag = false; let subject = false; let scoreFlag = false
          for (let i = 0; i < this.partList.length; i++) {
            const element = this.partList[i]
            element.orderFlag = this.partList.length - i
            if (!element.partName) {
              flag = true
            }
            if (element.subjectList) {
              element.subjectList.map(res => {
                if (!res.score) {
                  scoreFlag = true
                }
                res.title = res.subjectContent || res.title
                // res.srcSubjectId = res.subjectId
              })
            } else {
              element.subjectList = []
              subject = true
            }
          }
          if (flag) {
            this.$notify({
              title: '提示',
              message: '请填写部分名称!',
              type: 'info'
            })
            return
          }
          if (subject) {
            this.$notify({
              title: '提示',
              message: '请选择题目!',
              type: 'info'
            })
            return
          }
          if (scoreFlag) {
            this.$notify({
              title: '提示',
              message: '请输入题目分数!',
              type: 'info'
            })
            return
          }
          this.form.paperCatId = typeof this.form.paperCatId === 'string' ? this.form.paperCatId : this.form.paperCatId[this.form.paperCatId.length - 1]
          this.form.partList = this.partList
          this.$api.ADD_Paper({
            ...this.form
          }).then(({ data }) => {
            this.$notify({
              title: '提示',
              message: '操作成功!',
              type: 'success'
            })
            localStorage.removeItem('chooseItem')
            const tagName = this.$route.fullPath
            this.close({ tagName }).then(item => {
              this.$router.push({
                path: '/examination/paper_manage'
              })
            })
          })
        } else {
          this.$notify({
            title: '提示',
            message: '请添加试卷结构!',
            type: 'info'
          })
        }
      }
    },
    doSet (part) {
      let partScore = 0
      for (let j = 0; j < this.partList[part].subjectList.length; j++) {
        this.partList[part].subjectList[j].score = this.partList[part].setScore
        partScore += (+this.partList[part].subjectList[j].score)
      }
      this.partList[part].partScore = partScore
      this.setData()
    },
    setData () {
      this.form.totalScore = 0
      this.form.totalItem = 0
      for (let k = 0; k < this.partList.length; k++) {
        this.form.totalScore += this.partList[k].partScore || 0
        this.form.totalItem += this.partList[k].subjectList.length
      }
    },
    getLevel () {
      this.$api.DICT_LIST({
        typeCode: 'test_paper_type'
      }).then(({ data }) => {
        data.shift()
        this.dynamicTags = data
      })
      this.$api.DICT_LIST({
        typeCode: 'test_subject_level'
      }).then(({ data }) => {
        this.dynamicTags1 = data
      })
      this.$api.DICT_LIST({
        typeCode: 'test_subject_type'
      }).then(({ data }) => {
        this.dynamicTags2 = data
      })
    },
    doAdd () {
      this.partList.push({
        partName: '',
        partNote: '',
        totalScore: 0,
        totalItem: 0
      })
    },
    deleteItem (i, num, score) {
      this.partList[num].partScore -= score
      this.partList[num].subjectList.splice(i, 1)
      this.form.totalScore -= score
      this.form.totalItem -= 1
    },
    delSubject (num) {
      if (this.partList[num].subjectList) {
        this.form.totalItem -= this.partList[num].subjectList.length
        this.form.totalScore -= this.partList[num].partScore || 0
      }
      this.partList.splice(num, 1)
    },
    doClose () {
      this.dialog = false
    },
    choseSubject (num) {
      this.dialog = true
      this.part = num
    }
  }
}
</script>

<style lang="scss">
.CSJ-editor {
  .el-table__body-wrapper {
    height: 75vh;
  }
}
</style>
