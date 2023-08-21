<!-- 单个组件引用的例子 -->
<template>
  <d2-container>
    <template slot="header">
      <span class="page-title">试题编辑器</span>
    </template>
    <div>
      <ul class="subject-type">
        <li
          v-for="(item, index) in typeArr"
          :key="index"
          @mouseenter="enters(index)"
          @mouseleave="leaver(index)"
        >
          {{ item.dictDataName }}
          <div v-if="item.isShow">
            <el-input
              v-model="item.addCount"
              style="width: 50px; margin-right: 20px"
              size="mini"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              @click="doOk(item.dictDataValue, item.dictDataName, index)"
              >确定</el-button
            >
          </div>
        </li>
      </ul>
      <div class="subject-main">
        <el-form ref="form" style="overflow: hidden;margin-top:10px;margin-bottom: -30px;" label-width="90px">
          <el-col :span="1" style="text-align: right;line-height: 45px;margin-left: 5px;">
            <span style="color: red">*</span>
          </el-col>
          <el-col :span="22">
            <el-form-item label="选择分类">
              <el-cascader
                v-model="testSubjectCatId"
                :options="typeList"
                style="width: 100%"
                :props="{
                  label: 'catValue',
                  value: 'testSubjectCatId',
                  children: 'treeChild',
                  checkStrictly: true,
                }"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-form>
        <div v-for="(data, i) in subjectData" :key="i" :id="'subject'+(i+1)" style="padding-top:5px;">
          <component v-if="data.showInList"
            :is="componentTypes[data.type-1]"
            :subject-data="data"
            @saveSubject="saveSubject"
            @deleteSubject="deleteSubject"
          ></component>
        </div>
      </div>
      <div class="subject-right">
        <div v-for="(item, i) in subjectData" :key="i" class="subject-wrap">
            <div class="subject-item subject-over" v-if="item.showInList">
              <a href="javascript:;" @click="toTegional(i + 1)">{{ i + 1 }}</a>
            </div>
          <div class="subject-item" v-else>
            <div>
              <span>{{ i + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import SingleSelectSubject from './components/single-select-subject.vue'
import MultipleSelectSubject from './components/multiple-select-subject.vue'
import JudgeSelectSubject from './components/judge-select-subject.vue'
import QuestionSelectSubject from './components/question-select-subject.vue'
export default {
  components: { SingleSelectSubject, MultipleSelectSubject, JudgeSelectSubject, QuestionSelectSubject },
  data () {
    return {
      currentEditIndex: -1, // 当前正在编辑的元素
      componentTypes: [
        SingleSelectSubject,
        MultipleSelectSubject,
        JudgeSelectSubject,
        QuestionSelectSubject
      ],
      typeArr: [
        {
          isShow: false,
          dictDataName: '单选题',
          dictDataValue: '1',
          addCount: '1'
        },
        {
          isShow: false,
          dictDataName: '多选题',
          dictDataValue: '2',
          addCount: '1'
        },
        {
          isShow: false,
          dictDataName: '判断题',
          dictDataValue: '3',
          addCount: '1'
        },
        {
          isShow: false,
          dictDataName: '问答题',
          dictDataValue: '4',
          addCount: '1'
        }
      ],
      justShow: true,
      answer: '',
      givenAnswer: '',
      givenAnswers: [],
      subjectData: [],
      content: '',
      givenExplain: '',
      typeList: [],
      testSubjectCatId: '',
      chooses: []
    }
  },
  created () {},
  mounted () {
    this.$api
      .GET_Subject_TREE()
      .then((res) => {
        this.typeList = this.putFirst(res.data)
        this.getType()
      })
  },
  computed: {},
  methods: {
    filterP (phtml) {
      if (phtml.substring(0, 3) == '<p>') {
        return phtml.substring(3, phtml.length - 4)
      } else {
        return phtml
      }
    },
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
    toTegional (index) {
      const id = '#subject' + index
      document.querySelector(id).scrollIntoView(true)
    },
    getType () {
      this.$api
        .DICT_LIST({
          typeCode: 'test_subject_type'
        })
        .then(({ data }) => {
          console.log('获取试题类型：', data)
          data.shift()
          // data.map(res => res.isShow = false)
          // this.typeArr = data
        })
    },
    doOk (value, label, index) {
      for (let i = 0; i < +this.typeArr[index].addCount; i++) {
        if (value === '1') {
          this.subjectData.push(this.produceSingleSubject(value))
        } else if (value === '2') {
          this.subjectData.push(this.produceMultipleSubject(value))
        } else if (value === '3') {
          this.subjectData.push(this.produceJudgeSubject(value))
        } else if (value === '4') {
          this.subjectData.push(this.produceQuestionSubject(value))
        }
      }
      this.assignSeqno(this.subjectData)
      if (this.isAddedFirstItemNeedShow(this.subjectData, this.typeArr[index].addCount)) {
        const idx = this.subjectData.length - this.typeArr[index].addCount
        if (this.subjectData[idx]) { this.$set(this.subjectData[idx], 'showInList', true) }
        this.currentEditIndex = 0
      }
      this.typeArr[index].addCount = '1'
    },
    isAddedFirstItemNeedShow (arr, lasstCount) {
      if (arr.length > lasstCount) {
        const element = arr[arr.length - lasstCount - 1]
        if (element.subjectId) {
          return true
        }
      } else {
        return true
      }
      return false
    },
    assignSeqno (arr) {
      arr.forEach((element, index) => {
        element.seqno = index + 1
      })
    },
    assignCatalog (arr, testSubjectCatId) {
      arr.forEach(element => {
        element.testSubjectCatId = testSubjectCatId
      })
    },
    produceSingleSubject (type) {
      const single = {
        type: type,
        seqno: 1,
        subjectId: '',
        scene: '1',
        content: '',
        answer: '',
        chooses: [{ flag: 'A', optContent: '' }, { flag: 'B', optContent: '' }, { flag: 'C', optContent: '' }, { flag: 'D', optContent: '' }],
        hardLevel: '',
        givenAnswer: '',
        givenExplain: '',
        testSubjectCatId: this.testSubjectCatId ? this.testSubjectCatId : '',
        showd: true,
        showInList: false // 是否能在列表中显示
      }
      return single
    },
    produceMultipleSubject (type) {
      const multiple = {
        type: type,
        seqno: 1,
        subjectId: '',
        scene: '1',
        content: '',
        answer: '',
        chooses: [{ flag: 'A', optContent: '' }, { flag: 'B', optContent: '' }, { flag: 'C', optContent: '' }, { flag: 'D', optContent: '' }],
        hardLevel: '',
        givenAnswers: [],
        givenExplain: '',
        testSubjectCatId: this.testSubjectCatId ? this.testSubjectCatId : '',
        showd: true,
        showInList: false // 是否能在列表中显示
      }
      return multiple
    },
    produceJudgeSubject (type) {
      const judge = {
        type: type,
        seqno: 1,
        subjectId: '',
        scene: '1',
        content: '',
        chooses: [],
        answer: '',
        hardLevel: '',
        givenAnswer: '',
        givenExplain: '',
        testSubjectCatId: this.testSubjectCatId ? this.testSubjectCatId : '',
        showd: true,
        showInList: false // 是否能在列表中显示
      }
      return judge
    },
    produceQuestionSubject (type) {
      const question = {
        type: type,
        seqno: 1,
        subjectId: '',
        scene: '1',
        content: '',
        chooses: [],
        answer: '',
        hardLevel: '',
        givenAnswer: '',
        givenExplain: '',
        testSubjectCatId: this.testSubjectCatId ? this.testSubjectCatId : '',
        showd: true,
        showInList: false // 是否能在列表中显示
      }
      return question
    },
    saveSubject (item) {
      const arrItem = this.subjectData[item.seqno - 1]
      if (arrItem) {
        this.subjectData[item.seqno - 1] = { ...arrItem, ...item }
        this.$set(this.subjectData[item.seqno], 'showInList', true)
      }
      console.log('保存后：', this.subjectData)
    },
    deleteSubject (idx) {
      console.log('删除：', idx)
      this.subjectData.splice(idx - 1, 1)
      this.assignSeqno(this.subjectData)
      // debugger
      console.log('删除后：', this.subjectData)
    },
    enters (index) {
      this.typeArr[index].isShow = true // 鼠标移入 首先是A先消失，然后B再出现的，写反就会疯狂闪。
    },
    leaver (index) {
      this.typeArr[index].isShow = false // 移出时也一样，先B消失 再出现A。
    }
  },
  watch: {
    'testSubjectCatId' (newVal) {
      this.assignCatalog(this.subjectData, newVal[newVal.length - 1])
    }
  }
}
</script>
<style lang='scss' scoped>
.subject-type {
  position: fixed;
  width: 240px;
  // border: 1px solid #ccc;
  li {
    height: 50px;
    padding: 0 5px;
    cursor: pointer;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
.subject-main {
  border: 1px solid #ccc;
  margin-left: 260px;
  margin-right: 260px;
  min-height: 400px;
}
.subject-right {
  border: 1px solid #ccc;
  height: 60%;
  overflow: auto;
  position: fixed;
  padding: 15px 15px;
  top: 180px;
  right: 55px;
  width: 240px;
  min-height: 200px;
  display: flex;
  flex-wrap:wrap;
  align-content:flex-start;

  .subject-item {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 5px;
    margin-top: 5px;
    background-color: #ccc;
    border-radius: 50%;
    text-align: center;
    color: #fff;
  }
  .subject-over {
    background-color: #9edc6c;
    a {
      display: inline-block;
      color: #fff;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
