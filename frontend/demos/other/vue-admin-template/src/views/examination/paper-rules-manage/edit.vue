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
      <span class="page-title">{{ isAdd }}试卷</span>
    </template>
    <div style="overflow: hidden">
      <el-form
        class="pull-left"
        ref="form"
        :rules="rules"
        :model="form"
        label-width="90px"
      >
        <el-form-item label="规则名称" prop="ruleName">
          <el-input
            placeholder=""
            v-model="form.ruleName"
            @input="validPaperName()"
          >
            <em slot="suffix">{{ form.ruleName.length }} / 25</em>
          </el-input>
        </el-form-item>
        <el-form-item label="分类" prop="testPaperCatId">
          <el-cascader
            v-model="form.testPaperCatId"
            :options="list"
            style="width: 100%"
            :props="{
              label: 'catValue',
              value: 'testPaperCatId',
              children: 'treeChild',
              checkStrictly: true,
            }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="业务规则" prop="busRuleType">
          <el-radio-group v-model="form.busRuleType">
            <el-radio
              style="margin-right: 10px"
              v-for="(item, index) in dynamicTags"
              :key="index"
              :label="item.dictDataValue"
              :value="item.dictDataName"
              >{{ item.dictDataName }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="pull-right" style="position: fixed; right: 50px; z-index: 1">
        <el-card class="box-card" style="widthmargin: 20px 0">
          <h4>统计</h4>
          <p>共{{ form.totalItem }}道题，共{{ form.totalScore }}分</p>
          <p v-for="(item, i) in paperRuleStructVOS" :key="i">
            <span style="margin-right: 50px">{{ item.partName }}</span
            ><span
              >共{{ item.partNum || 0 }}道题，共{{
                item.partScore || 0
              }}分</span
            >
          </p>
        </el-card>
      </div>
    </div>
    试卷结构
    <el-divider></el-divider>
    <div v-for="(part, num) in paperRuleStructVOS" :key="num">
      <el-form style="display: flex">
        <el-form-item :label="'第' + numArr[num] + '部分'"> </el-form-item>
        <el-row>
          <el-col :span="1">
            <span style="color: red; line-height: 45px">*</span>
          </el-col>
          <el-col :span="11">
            <el-form-item label="">
              <el-input
                placeholder="名称"
                v-model="part.partName"
                @input="validPartName(num)"
              >
                <em slot="suffix">{{ part.partName.length }} / 10</em>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="">
              <el-input
                placeholder="说明"
                v-model="part.partNote"
                @input="validPartNote(num)"
              >
                <em slot="suffix">{{ part.partNote.length }} / 30</em>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button @click="delSubject(num)" style="margin-left: 20px">
            删除
          </el-button>
        </el-form-item>
      </el-form>
      <div v-for="(item, i) in part.ruleDetailVOS" :key="i">
        <el-card class="box-card" style="margin: 20px 0; line-height: 40px">
          <el-button
            @click="
              delSubjectType(
                num,
                i,
                (item.score * item.subjectTotal).toFixed(1),
                item.subjectTotal
              )
            "
            size="mini"
            style="float: right"
          >
            删除
          </el-button>
          <div style="display: flex">
            <div style="width: 200px; font-weight: bold">
              {{ getSubjectName(item.subjectType) }}
            </div>
            <span
              v-for="(type, t) in item.subjectLeverList"
              :key="t"
              style="width: 130px"
              >{{ type.dictDataName }}</span
            >
          </div>
          <div style="display: flex">
            <span style="width: 120px">抽题数量</span>
            <span style="width: 80px">{{ item.subjectTotal }}</span>
            <el-input-number
              size="mini"
              v-for="(type, t) in item.subjectLeverList"
              :key="t"
              @change="changeAmount(num, i)"
              :step="1"
              v-model="type.subjectAmount"
              :min="0"
              step-strictly
              style="width: 100px; margin-right: 30px"
            ></el-input-number>
          </div>
          <div style="display: flex">
            <span style="width: 90px">每题分值</span>
            <el-input-number
              style="width: 100px"
              v-model="item.score"
              @change="changeScore(num, i, $event)"
              size="mini"
              :precision="1"
              :step="0.1"
              :min="0.0"
            ></el-input-number>
          </div>
          <div style="display: flex">
            <span style="width: 90px">抽题来源</span>
            <el-cascader
              v-model="item.subjectSource"
              :options="subjectSourceList"
              style="width: 50%"
              @change="changeSource(num, i)"
              :props="{
                label: 'catValue',
                value: 'testSubjectCatId',
                children: 'treeChild',
                checkStrictly: true,
                multiple: true,
                emitPath: false,
              }"
            ></el-cascader>
          </div>
          <div style="display: flex" v-if="item.sourceData">
            <span style="margin-left: 90px; width: 100px"
              >共{{ item.sourceTotal }}道</span
            >
            <div
              style="width: 120px"
              v-for="(type, t) in dynamicTags1"
              :key="t"
            >
              <div v-for="(subjectType, s) in item.sourceData" :key="s">
                <span v-if="subjectType.subjectType == type.dictDataValue"
                  >{{ type.dictDataName }}：{{ subjectType.amount }}道</span
                >
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div style="margin-bottom: 20px">
        <el-button type="primary" size="mini" @click="choseSubject(num)">
          添加题型
        </el-button>
      </div>
    </div>
    <el-button type="primary" size="mini" @click="doAdd()">
      添加部分
    </el-button>
    <div style="text-align: center">
      <el-button type="primary" size="mini" @click="doSave()"> 保存 </el-button>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="选择题型"
      append-to-body
      width="300px"
      class="cus-dialog-container"
      style="text-align: center"
      :visible.sync="dialog"
      :destroy-on-close="true"
    >
      <el-select v-model="subjectType">
        <el-option
          v-for="(item, i) in dynamicTags2"
          :key="i"
          :label="item.dictDataName"
          :value="item.dictDataValue"
        >
        </el-option>
      </el-select>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="chooseType"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
/* eslint-disable */ 

import { mapActions } from 'vuex'
import _ from 'lodash'
import log from '@/plugin/log'
export default {
  data () {
    return {
      subjectArr: [],
      subjectType: '',
      numArr: [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
        '十一',
        '十二',
        '十三',
        '十四',
        '十五',
        '十六',
        '十七',
        '十八',
        '十九',
        '二十'
      ],
      dialog: false,
      form: {
        ruleName: '',
        testPaperCatId: '',
        busRuleType: '',
        totalScore: 0,
        totalItem: 0
      },
      subjectSource: [],
      isAdd: '',
      list: [],
      subjectSourceList: [],
      itemArr: [],
      dynamicTags: [],
      dynamicTags1: [],
      dynamicTags2: [],
      ruleDetailVOS: [],
      paperRuleStructVOS: [],
      total: 0,
      itemScore: [],
      rules: {
        ruleName: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ],
        testPaperCatId: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        busRuleType: [
          { required: true, message: '请选择业务规则', trigger: 'blur' }
        ]
      },
      part: ''
    }
  },
  beforeDestroy () {
    localStorage.removeItem('chooseItem')
  },
  mounted () {
    for (let i = 0; i < this.ruleDetailVOS.length; i++) {
      this.total += this.ruleDetailVOS[i].length
    }
    this.list = JSON.parse(localStorage.getItem('paperTree'))
    this.getLevel()
    this.queryMenu()
    if (this.$route.query.paperRuleId) {
      this.setData()
      this.isAdd = '编辑'
      this.$route.meta.title = '编辑试卷'
    } else {
      this.isAdd = '新增'
      this.$route.meta.title = '新增试卷'
    }
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    changeScore (num, i, score) {
      if (typeof i == 'number') {
        this.paperRuleStructVOS[num].ruleDetailVOS[i].score = score
      }
      const partScore = this.paperRuleStructVOS[num].ruleDetailVOS.reduce(
        (total, number, index) => {
          if (index == 1) {
            return (
              total.score * total.subjectTotal +
              number.score * number.subjectTotal
            )
          } else {
            return total + number.score * number.subjectTotal
          }
        }
      )
      this.paperRuleStructVOS[num].partScore =
        typeof partScore == 'object'
          ? parseFloat(partScore.score * partScore.subjectTotal).toFixed(1)
          : parseFloat(partScore).toFixed(1)
      const totalScore = this.paperRuleStructVOS.reduce(
        (total, number, index) => {
          if (index == 1) {
            return parseFloat(total.partScore || 0) + parseFloat(number.partScore || 0)
          } else {
            return parseFloat(total) + parseFloat(number.partScore || 0)
          }
        }
      )
      this.form.totalScore =
        typeof totalScore == 'object'
          ? parseFloat(totalScore.partScore).toFixed(1)
          : parseFloat(totalScore).toFixed(1)
    },
    changeAmount (num, i) {
      if (typeof i == 'number') {
        this.paperRuleStructVOS[num].ruleDetailVOS[i].subjectTotal =
          this.paperRuleStructVOS[num].ruleDetailVOS[i].subjectLeverList.reduce(
            (total, number, index) => {
              if (index == 1) {
                return (total.subjectAmount || 0) + (number.subjectAmount || 0)
              } else {
                return (total || 0) + (number.subjectAmount || 0)
              }
            }
          )
      }
      const partScore = this.paperRuleStructVOS[num].ruleDetailVOS.reduce(
        (total, number, index) => {
          if (index == 1) {
            return (
              total.score * total.subjectTotal +
              number.score * number.subjectTotal
            )
          } else {
            return total + number.score * number.subjectTotal
          }
        }
      )
      this.paperRuleStructVOS[num].partScore =
        typeof partScore == 'object'
          ? parseFloat(partScore.score * partScore.subjectTotal).toFixed(1)
          : parseFloat(partScore).toFixed(1)
      const totalScore = this.paperRuleStructVOS.reduce(
        (total, number, index) => {
          if (index == 1) {
            return parseFloat(total.partScore || 0) + parseFloat(number.partScore || 0)
          } else {
            return parseFloat(total) + parseFloat(number.partScore || 0)
          }
        }
      )
      this.form.totalScore =
        typeof totalScore == 'object'
          ? parseFloat(totalScore.partScore).toFixed(1)
          : parseFloat(totalScore).toFixed(1)
      const partNum = this.paperRuleStructVOS[num].ruleDetailVOS.reduce(
        (total, number, index) => {
          if (index == 1) {
            return total.subjectTotal + number.subjectTotal
          } else {
            return total + number.subjectTotal
          }
        }
      )
      this.paperRuleStructVOS[num].partNum =
        typeof partNum == 'object' ? partNum.subjectTotal : partNum
      const totalItem = this.paperRuleStructVOS.reduce((total, number, index) => {
        if (index == 1) {
          return (total.partNum || 0) + (number.partNum || 0)
        } else {
          return total + (number.partNum || 0)
        }
      })
      this.form.totalItem =
        typeof totalItem == 'object' ? totalItem.partNum : totalItem
    },
    changeSource (num, i) {
      this.$api
        .getExerciseSubjectNumber({
          subjectType: this.subjectType,
          subjectSource:
            this.paperRuleStructVOS[num].ruleDetailVOS[i].subjectSource.join(
              ','
            )
        })
        .then((res) => {
          this.paperRuleStructVOS[num].ruleDetailVOS[i].sourceTotal =
            res.data.reduce((total, number, index) => {
              if (index == 1) {
                return total.amount + number.amount
              } else {
                return total + number.amount
              }
            })
          this.paperRuleStructVOS[num].ruleDetailVOS[i].sourceData = res.data
          this.$forceUpdate()
        })
    },
    // 查询试题分类
    queryMenu () {
      this.$api.GET_Subject_TREE().then((res) => {
        this.subjectSourceList = res.data
      })
    },
    validPaperName () {
      if (this.form.ruleName.length > 25) {
        this.form.ruleName = this.form.ruleName.slice(0, 25)
      }
    },
    validPartName (num) {
      if (this.paperRuleStructVOS[num].partName.length > 10) {
        this.paperRuleStructVOS[num].partName = this.paperRuleStructVOS[
          num
        ].partName.slice(0, 10)
      }
    },
    validPartNote (num) {
      if (this.paperRuleStructVOS[num].partNote.length > 30) {
        this.paperRuleStructVOS[num].partNote = this.paperRuleStructVOS[
          num
        ].partNote.slice(0, 30)
      }
    },
    doInput (part) {
      let partScore = 0
      for (
        let j = 0;
        j < this.paperRuleStructVOS[part].ruleDetailVOS.length;
        j++
      ) {
        partScore += +this.paperRuleStructVOS[part].ruleDetailVOS[j].score
      }
      this.paperRuleStructVOS[part].partScore = partScore
      this.setData()
    },
    getSubjectName (type) {
      return this.dynamicTags2.filter((res) => res.dictDataValue == type)[0]
        .dictDataName
    },
    getLevelName (type) {
      return this.dynamicTags1.filter((res) => res.dictDataValue == type)[0]
        .dictDataName
    },
    getDetail () {
      this.$api
        .echoPaperRule({
          paperRuleId: this.$route.query.paperRuleId
        })
        .then(({ data }) => {
          data.busRuleType = data.busRuleType + ''
          this.form = data
          if (data.paperRuleStructVOS) {
            for (let part = 0; part < data.paperRuleStructVOS.length; part++) {
              const element = data.paperRuleStructVOS[part]
              if (element.ruleDetailVOS) {
                const partScore = 0
                const list = []
                for (let i = 0; i < element.ruleDetailVOS.length; i++) {
                  const vos = element.ruleDetailVOS[i]
                  vos.subjectSource = vos.subjectSource.split(',')
                  if (!list.length) {
                    list.push({
                      ...vos,
                      subjectTotal: vos.subjectAmount,
                      subjectLeverList: [
                        {
                          ruleDetailId: vos.ruleDetailId,
                          dictDataValue: vos.subjectLevel,
                          subjectAmount: vos.subjectAmount,
                          dictDataName: this.getLevelName(vos.subjectLevel)
                        }
                      ]
                    })
                  } else {
                    const typearr = list.filter(res => res.subjectType == vos.subjectType && res.subjectSource == vos.subjectSource.join(','))
                    if (typearr.length) {
                      typearr[0].subjectTotal = vos.subjectAmount + typearr[0].subjectTotal
                      typearr[0].subjectLeverList.push({
                        ruleDetailId: vos.ruleDetailId,
                        dictDataValue: vos.subjectLevel,
                        subjectAmount: vos.subjectAmount,
                        dictDataName: this.getLevelName(vos.subjectLevel)
                      })
                    } else {
                      list.push({
                        ...vos,
                        subjectTotal: vos.subjectAmount,
                        subjectLeverList: [
                          {
                            ruleDetailId: vos.ruleDetailId,
                            dictDataValue: vos.subjectLevel,
                            subjectAmount: vos.subjectAmount,
                            dictDataName: this.getLevelName(
                              vos.subjectLevel
                            )
                          }
                        ]
                      })
                    }
                  }
                }
                element.ruleDetailVOS = list
              }
            }
            this.paperRuleStructVOS = data.paperRuleStructVOS
            for (let k = 0; k < data.paperRuleStructVOS.length; k++) {
              this.changeAmount(k)
              this.changeScore(k)
              for (
                let m = 0;
                m < data.paperRuleStructVOS[k].ruleDetailVOS.length;
                m++
              ) {
                this.subjectType =
                  data.paperRuleStructVOS[k].ruleDetailVOS[m].subjectType
                this.changeSource(k, m)
              }
            }
          } else {
            data.totalScore = 0
            data.totalItem = 0
          }
        })
    },
    chooseType () {
      // if(this.paperRuleStructVOS[this.part].ruleDetailVOS?.filter(res=>res.subjectType == this.subjectType).length){
      //   this.$message.warning("每部分只能添加一种题型")
      //   return
      // }
      this.paperRuleStructVOS[this.part].ruleDetailVOS =
        this.paperRuleStructVOS[this.part].ruleDetailVOS || []
      const dynamicTags1 = []
      this.dynamicTags1.map((res) => {
        dynamicTags1.push(Object.assign({}, res, { subjectAmount: 0 }))
      })
      this.paperRuleStructVOS[this.part].ruleDetailVOS.push({
        subjectType: this.subjectType,
        subjectLevel: '',
        score: '',
        subjectSource: '',
        subjectTotal: '',
        subjectLeverList: dynamicTags1
      })
      this.dialog = false
    },
    doSave () {
      const vos = _.cloneDeep(this.paperRuleStructVOS)
      if (vos.length) {
        let flag = false
        let subject = false
        let scoreFlag = false
        let subjectNum = false
        let subjectSource = false
        let typeOrderFlag = vos.filter((res) => res.ruleDetailVOS).length
        for (let i = 0; i < vos.length; i++) {
          const element = vos[i]
          if (!element.partName) {
            flag = true
          }
          if (element.ruleDetailVOS) {
            const ruleDetailVOSArr = []
            element.ruleDetailVOS = element.ruleDetailVOS.map((res) => {
              res.subjectSource =
                typeof res.subjectSource === 'string'
                  ? res.subjectSource
                  : res.subjectSource.join(',')
              res.orderFlag = typeOrderFlag
              typeOrderFlag--
              if (!res.score) {
                scoreFlag = true
              }
              if (!res.subjectTotal) {
                subjectNum = true
              }
              if (!res.subjectSource) {
                subjectSource = true
              }
              for (let j = 0; j < res.subjectLeverList.length; j++) {
                const lever = res.subjectLeverList[j]
                ruleDetailVOSArr.push({
                  ...res,
                  ruleDetailId: lever.ruleDetailId,
                  subjectLevel: lever.dictDataValue,
                  subjectAmount: lever.subjectAmount
                })
              }
              return res
            })
            element.ruleDetailVOS = ruleDetailVOSArr
          } else {
            element.ruleDetailVOS = []
            subject = true
          }
          element.orderFlag = vos.length - i
          if (this.$route.query.paperRuleId) {
            element.editRuleDetailDTOS = element.ruleDetailVOS
          } else {
            element.addRuleDetailDTOS = element.ruleDetailVOS
          }
          // delete element.ruleDetailVOS;
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
            message: '请选择题型!',
            type: 'info'
          })
          return
        }
        if (subjectNum) {
          this.$notify({
            title: '提示',
            message: '请输入抽题数量!',
            type: 'info'
          })
          return
        }
        if (scoreFlag) {
          this.$notify({
            title: '提示',
            message: '请输入每题分值!',
            type: 'info'
          })
          return
        }
        if (subjectSource) {
          this.$notify({
            title: '提示',
            message: '请选择抽题来源!',
            type: 'info'
          })
          return
        }
        this.form.testPaperCatId =
          typeof this.form.testPaperCatId === 'string'
            ? this.form.testPaperCatId
            : this.form.testPaperCatId[this.form.testPaperCatId.length - 1]
        if (this.$route.query.paperRuleId) {
          this.form.editPaperRuleStructDTOS = vos
        } else {
          this.form.addPaperRuleStructDTOS = vos
        }
        let updatetype
        if (this.$route.query.paperRuleId) {
          updatetype = 'editPaperRule'
        } else {
          updatetype = 'addPaperRule'
        }
        this.$api[updatetype]({
          ...this.form
        }).then(({ data }) => {
          this.$notify({
            title: '提示',
            message: '操作成功!',
            type: 'success'
          })
          localStorage.removeItem('chooseItem')
          const tagName = this.$route.fullPath
          this.close({ tagName }).then((item) => {
            this.$router.push({
              path: '/examination/paper_rules_manage'
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
    },
    doSet (part) {
      let partScore = 0
      for (
        let j = 0;
        j < this.paperRuleStructVOS[part].ruleDetailVOS.length;
        j++
      ) {
        this.paperRuleStructVOS[part].ruleDetailVOS[j].score =
          this.paperRuleStructVOS[part].setScore
        partScore += +this.paperRuleStructVOS[part].ruleDetailVOS[j].score
      }
      this.paperRuleStructVOS[part].partScore = partScore
      this.setData()
    },
    setData () {
      this.form.totalScore = 0
      this.form.totalItem = 0
      for (let k = 0; k < this.paperRuleStructVOS.length; k++) {
        this.form.totalScore += this.paperRuleStructVOS[k].partScore || 0
        this.form.totalItem += this.paperRuleStructVOS[k].ruleDetailVOS.length
      }
    },
    getLevel () {
      this.$api
        .DICT_LIST({
          typeCode: 'business_rules'
        })
        .then(({ data }) => {
          this.dynamicTags = data
        })
      this.$api
        .DICT_LIST({
          typeCode: 'test_subject_level'
        })
        .then(({ data }) => {
          this.dynamicTags1 = data
          if (this.$route.query.paperRuleId) {
            this.getDetail()
          }
        })
      this.$api
        .DICT_LIST({
          typeCode: 'test_subject_type'
        })
        .then(({ data }) => {
          data.shift()
          this.dynamicTags2 = data
        })
    },
    doAdd () {
      this.paperRuleStructVOS.push({
        partName: '',
        partNote: '',
        totalScore: 0,
        totalItem: 0
      })
    },
    delSubjectType (num, i, score, amount = 0) {
      if (this.paperRuleStructVOS[num].partScore) {
        this.paperRuleStructVOS[num].partScore -= score
      }
      if (this.paperRuleStructVOS[num].partNum) {
        this.paperRuleStructVOS[num].partNum -= amount
      }
      this.paperRuleStructVOS[num].ruleDetailVOS.splice(i, 1)
      this.form.totalScore -= score
      this.form.totalItem -= amount
      this.$forceUpdate()
    },
    delSubject (num) {
      if (this.paperRuleStructVOS[num].ruleDetailVOS) {
        this.form.totalItem -= this.paperRuleStructVOS[num].partNum || 0
        this.form.totalScore =
          (
            parseFloat(this.form.totalScore) -
            parseFloat(this.paperRuleStructVOS[num].partScore)
          ).toFixed(1) || 0
      }
      this.paperRuleStructVOS.splice(num, 1)
    },
    doClose () {
      this.dialog = false
    },
    choseSubject (num) {
      this.subjectType = ''
      this.dialog = true
      this.part = num
    }
  }
}
</script>

<style lang="scss"></style>
