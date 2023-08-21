<template>
    <el-card v-loading="mask">
        <el-row :gutter="24">
            <el-col :span="2" v-for="(item, index) in this.categoryDic" :key="index">
            <el-radio-group v-model="baseInfo.goodsType" @change="radioGroupChange(item.label)" style="min-width:300px">
            <el-radio-button :label="item.label">{{item.value}}</el-radio-button>
            </el-radio-group>
            </el-col>
        </el-row>
        <el-form
        class="cascader"
        :model="addGoodInfo">
        <el-form-item label="请选择您发布的课程类目" prop="selectedKeys">
            <el-cascader-panel
                ref="cateRef"
                style="width:542px; margin-top:40px"
                :key="isResouceShow"
                :options="goodsCateList"
                v-model="selectedKeys"
                :props="{
                  multiple:true,
                  checkStrictly: true,
                  emitPath:false,
                  expandTrigger:'hover',
                  value:'catId',
                  label:'catValue',
                  children:'childCatagorys'}"
                @change="handleChange"
            ></el-cascader-panel>
        </el-form-item>
        <el-form-item label="您当前选择的课程类别是：">
            <span style="display: flex;flex-direction: column;">
              <span v-for="(item,i) in cascaderLabel" :key="i" class="cateText">{{item}}</span>
            </span>
        </el-form-item>
        </el-form>
        <el-button type="primary" @click="firBtn" class="nextBtn">下一步</el-button>
    </el-card>
</template>
<script>
import { isArray } from 'lodash'
import { mapActions } from 'vuex'
export default {
  props: {
    /* catInfo: {
      type: Object,
      default: () => { return {} }
    }, */
    distinguish: {
      type: String,
      default: ''
    }
  },
  watch: {
  },
  data () {
    return {
      list: [],
      categoryDic: [],
      addGoodInfo: {},
      selectedKeys: [],
      // 类目菜单数据源
      goodsCateList: [],
      cascaderLabel: [],
      activeName: '1',
      baseInfo: {},
      isResouceShow: 0,
      mask: false
    }
  },
  created () {
    this.$api.SETTING_GET_DICT({
      typeCode: 'plant_goods_category'
    }).then(res => {
      this.list = res.data.reverse()
      if (isArray(this.list)) {
        this.categoryDic = this.list.map(item => {
          return {
            value: `${item.dictDataName}`,
            label: `${item.dictDataValue}`
          }
        })
        this.baseInfo.goodsType = this.categoryDic[0].label
        this.getBaseInfoByGoodsId()
      }
    })
  },
  methods: {
    ...mapActions('d2admin/goods', ['setGoodsInfo']),
    getBaseInfoByGoodsId () {
      if (this.$route.query.goodsId) { // 编辑
        this.mask = true
        this.$api.GET_BY_GOODSID({
          goodsId: this.$route.query.goodsId,
          goodsType: this.$route.query.goodsType
        }).then(res => {
          this.baseInfo.goodsType = this.$route.query.goodsType
          this.getCateList(this.baseInfo.goodsType)
          this.selectedKeys = res.data.catIds
          this.cascaderLabel = res.data.fullCatagoryNames
          this.mask = false
          /* console.log("getBaseInfoByGoodsId -> util.cookies.get('baseInfo')1", util.cookies.get('baseInfo'))
          if (util.cookies.get('baseInfo')) {
            util.cookies.remove('baseInfo')
            console.log("getBaseInfoByGoodsId -> util.cookies.get('baseInfo')2", util.cookies.get('baseInfo'))
          }
          util.cookies.set('baseInfo', res.data)
          console.log("getBaseInfoByGoodsId -> util.cookies.get('baseInfo')3", util.cookies.get('baseInfo')) */
        })
      } else { // 新增
        this.getCateList(this.baseInfo.goodsType)
      }
    },
    radioGroupChange (value) {
      this.$refs.cateRef.clearCheckedNodes()
      this.cascaderLabel = []
      this.getCateList(value)
    },
    // 面板内的课程类目值
    getCateList (goodsType) {
      this.$api.GET_CATEGORY_LIST_TREE({
        goodsType: goodsType
      }).then(res => {
        ++this.isResouceShow
        this.goodsCateList = res.data
      })
    },
    handleChange () {
      this.cascaderLabel = []
      const arr = this.$refs.cateRef.checkedNodePaths
      arr.forEach(data => {
        let labelStr = ''
        data.forEach((item, i) => {
          if (data.length - 1 == i) {
            labelStr = labelStr + item.label
          } else {
            labelStr = labelStr + item.label + '>'
          }
        })
        this.cascaderLabel.push(labelStr)
      })
    },
    // 暂存最新的用户点击更新
    setcatInfo () {
      this.setGoodsInfo({ catIds: this.selectedKeys, goodsType: this.baseInfo.goodsType })
    },
    // 课程类目
    firBtn () {
      if (this.activeName === '1' && !this.selectedKeys) {
        this.activeName = '1'
        this.$message.warning('请选择课程类目')
      } else {
        this.$emit('activeNameChange', '2')
        this.setcatInfo()
      }
    }
  }
}
</script>
<style scoped>
.cateText{
  color: rgb(64,158,255);
  font-size: 14px;
  }
</style>
