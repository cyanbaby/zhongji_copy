<template>
  <el-card v-loading="mask">
    <span>课件信息</span>
    <br>
    <el-button type="text" @click="choseCouse">+ 选择课件</el-button>
    <ul style="color: #40aaff;">
        <li v-for="(item,i) in cousreWareInfo.wareInfo" :key="i"><span>{{item.wareValue}}</span> <span style="cursor:pointer; font-size:20px;margin-top:5px;" @click="deleteChose(item.wareId)">x</span></li>
    </ul>
    <el-dialog title="选择课件" width="80%" :visible.sync="selClassDialogVisible" center :close-on-click-modal=false v-if="selClassDialogVisible">
        <course-select
        ref="couserSelectRef"
        :cousreWareInfo="cousreWareInfo"
        >
        </course-select>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectConfirm">确 定</el-button>
    </span>
    </el-dialog>
    <br>
    课时：
    <el-input-number v-model="cousreWareInfo.learnHour" :precision="2" :step="0.01" :min="0"></el-input-number>
    <div style="margin-top: 50px;">
      课程类型：
      <el-radio-group v-model="courseType">
         <el-radio
         v-for="(item) in typeList"
         :key="item.dictDataValue"
         :label="item.dictDataValue"
         >{{item.dictDataName}}</el-radio>
       </el-radio-group>
    </div>
     <div style="margin-top: 30px;display: flex;align-items: center;">
       业务类型：
      <el-checkbox-group v-model="businessTypes">
        <el-checkbox :label="item.dictDataValue" v-for="(item,i) in businessTypesList" :key="i">{{item.dictDataName}}</el-checkbox>
      </el-checkbox-group>
     </div>
     <div style="margin-top: 30px;">
       年度：
      <el-date-picker
        v-model="goodsYear"
        type="year"
        value-format="yyyy"
        placeholder="选择年度">
      </el-date-picker>
     </div>
    <el-button type="primary" @click="saveBtn" class="nextBtn">{{distinguish}}</el-button>
  </el-card>
</template>
<script>
/* eslint-disable */ 

import CourseSelect from './course-select.vue'
export default {
  components: {
    CourseSelect
  },
  props: {
    goodsId: {
      type: String,
      default: ''
    },
    // cousreWareInfo: {
    //   type: Object,
    //   default: () => { return {
    //     learnHour: 0,
    //     wareIds: [],
    //     wareInfo: []
    //   } }
    // },
    distinguish: {
      type: String,
      default: ''
    },
    mask: false
  },
  watch: {
  },
  data () {
    return {
      cousreWareInfo: {
        learnHour: 0,
        wareIds: [],
        wareInfo: []
      },
      // 选择课件弹出框的显示
      selClassDialogVisible: false,
      typeList: [],
      courseType: '0',
      businessTypes: [],
      goodsYear: '',
      businessTypesList: []
    }
  },
  created () {
    this.grtDict()
  },
  methods: {
    // 获取内容类型
    grtDict () {
      this.$api.DICT_LIST({
        typeCode: 'course_type'
      }).then(({ data }) => {
        this.typeList = data
        this.$api.DICT_LIST({
          typeCode: 'business_type'
        }).then(({ data }) => {
          data.forEach(item => {
            item.dictDataValue = parseInt(item.dictDataValue)
          })
          this.businessTypesList = data
          if (this.$route.query.goodsId) {
            this.getCourserInfo()
          }
        })
      })
    },
    getCourserInfo () {
      this.mask = true
      this.$api.GET_COURSEWARE_INFO(
        { goodsId: this.$route.query.goodsId }
      ).then(res => {
        console.log('TCL: getCourserInfo -> res', res)
        this.courseType = res.data.courseType ? String(res.data.courseType) : ''
        this.cousreWareInfo.wareInfo = res.data.courseWares
        this.cousreWareInfo.learnHour = res.data.learnHour
        this.goodsYear = String(res.data.goodsYear)
        this.businessTypes = res.data.businessTypes ? res.data.businessTypes : []
        this.cousreWareInfo.wareIds = []
        res.data.courseWares.forEach(msg => this.cousreWareInfo.wareIds.push(msg.wareId))
        this.mask = false
      }).catch(() => {
        this.mask = false
      })
    },
    deleteChose (wareId) {
      this.cousreWareInfo.wareIds.splice(this.cousreWareInfo.wareIds.indexOf(wareId), 1)
      this.cousreWareInfo.wareInfo.forEach((res, index, arr) => {
        if (res.wareId == wareId) {
          arr.splice(index, 1)
        }
      })
    },
    // 选择课件弹窗
    choseCouse () {
      this.selClassDialogVisible = true
      this.$nextTick(() => {
        this.$refs.couserSelectRef.initSelectedWares()
      })
    },
    // 选择课件保存
    selectConfirm () {
      var wares = this.$refs.couserSelectRef.getSelectedWares()
      var wareValues = []
      var wareIds = []
      for (const item in wares) {
        wareValues.push(wares[item])
        wareIds.push(item)
      }
      this.cousreWareInfo.wareIds = wareIds
      this.cousreWareInfo.wareInfo = wareValues.map((ware) => (
        { wareValue: ware.wareValue, wareId: ware.wareId, sourceId: ware.sourceId, wareSource: ware.wareSource }
      ))
      this.selClassDialogVisible = false
    },
    saveBtn () {
      if (this.cousreWareInfo.wareIds.length === 0) {
        this.$message.warning('请选择课件')
      } else {
        this.mask = true
        this.$api.SELECTCOURSE({
          courseInfos: this.cousreWareInfo.wareInfo,
          goodsId: this.goodsId,
          learnHour: this.cousreWareInfo.learnHour,
          courseType: parseInt(this.courseType),
          businessTypes: this.businessTypes,
          goodsYear: this.goodsYear
        }).then(res => {
          if (this.$route.query.goodsId) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.$emit('activeNameChange', '4')
          } else {
            this.$emit('activeNameChange', '4')
          }
          this.$emit('setImg', res.data)
          this.mask = false
        }).catch(() => {
          this.mask = false
        })
      }
    }
  }
}
</script>
