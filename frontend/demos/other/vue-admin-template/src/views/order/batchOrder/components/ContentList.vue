<template>
    <div>
        <div style="display: flex;align-items: baseline;justify-content: space-between;">
          <el-button type="primary" style="margin-bottom:15px;" @click="choseContent">选择课程</el-button>
          <span style="font-size: 14px;">注：如存在学员已购买以下内容，该学员的订单将开单不成功。</span>
        </div>
        <el-table
        :data="productList"
        border
        height="200"
        max-height="300"
        style="width: 100%"
        v-if="productList.length>0"
        >
        <el-table-column
            prop="goodsValue"
            label="商品名称"
        >
        </el-table-column>
        <el-table-column
            prop="businessType"
            label="业务类型"
            width="150"
            v-if="isShowBusinessType"
        >
            <template slot-scope="scope">
                <el-select v-model="scope.row.businessType">
                    <div v-for="(item,i) in businessTypesList" :key="i">
                    <el-option
                        v-if="scope.row.goodsBusinessTypeArr.includes(item.dictDataValue)"
                        :value="item.dictDataValue"
                        :label="item.dictDataName"
                    >
                    </el-option>
                    </div>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column
            prop="goodsYear"
            width="80"
            label="年度"
            v-if="isShowGoodsYear"
        >
        </el-table-column>
        <el-table-column
            prop="goodsContentType"
            label="类型"
            width="100"
            v-if="isShowGoodsContentType"
            >
            <template slot-scope="scope">
                <span v-for="(item,i) in typeList" :key="i">
                    <span v-if="scope.row.goodsContentType==item.dictDataValue&&item.dictDataValue!=0">{{item.dictDataName}}</span>
                </span>
            </template>
        </el-table-column>
        <el-table-column
            prop="productPrice"
            label="价格(元)"
            width="100"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="80">
        <template slot-scope="scope">
            <el-button type="text" @click="removeGoods(scope.$index)">删除</el-button>
        </template>
        </el-table-column>
        </el-table>
        <importDialog
        :dialogVisibleProp.sync="choseDialog"
        :ProductListes="selectedList"
        v-if="choseDialog"
        @SelectedProductList="getSelectedSub"
        ></importDialog>
    </div>
</template>
<script>
import importDialog from '@/components/Select-product/curriculum.vue'
export default {
  components: {
    importDialog
  },
  data () {
    return {
      productList: [],
      choseDialog: false,
      selectedList: [],
      businessTypesList: [],
      typeList: [],
      isShowBusinessType: false,
      isShowGoodsYear: false,
      isShowGoodsContentType: false
    }
  },
  // 监听
  watch: {
    productList: {
      handler () {
        const businessTypeList = this.productList.find(item => item.goodsBusinessTypeList && item.goodsBusinessTypeList.length > 0)
        if (businessTypeList) { // 所选课程业务类型全部为空，隐藏该列展示
          this.isShowBusinessType = true
        } else {
          this.isShowBusinessType = false
        }
        const goodsYearList = this.productList.find(item => item.goodsYear > 0)
        if (goodsYearList) { // 所选课程年度全部为空，隐藏该列展示
          this.isShowGoodsYear = true
        } else {
          this.isShowGoodsYear = false
        }
        const goodsContentTypeList = this.productList.find(item => item.goodsContentType > 0)
        if (goodsContentTypeList) { // 所选课程类型全部为空，隐藏该列展示
          this.isShowGoodsContentType = true
        } else {
          this.isShowGoodsContentType = false
        }
        this.$emit('getProductList', this.productList)
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.getDict()
  },
  methods: {
    getDict () {
      this.$api.DICT_LIST({
        typeCode: 'course_type' // 课程类型
      }).then(({ data }) => {
        this.typeList = data
        this.$api.DICT_LIST({
          typeCode: 'business_type' // 业务类型
        }).then(({ data }) => {
          data.forEach(item => {
            item.dictDataValue = parseInt(item.dictDataValue)
          })
          this.businessTypesList = data
        })
      })
    },
    getSelectedSub (data) {
      data.forEach(item => {
        item.normId = item.productNormInfoList[0].normId
        item.productPrice = item.productNormInfoList[0].productPriceYuan
        item.goodsBusinessTypeArr = []
        if (item.goodsBusinessTypeList && item.goodsBusinessTypeList.length >= 0) {
          item.goodsBusinessTypeList.forEach(res => {
            item.goodsBusinessTypeArr.push(res.businessType)
          })
          item.businessType = item.goodsBusinessTypeList[0].businessType
        }

        this.productList.push(item)
      })
    },
    choseContent () {
      this.selectedList = []
      this.productList.forEach(item => {
        this.selectedList.push(item.productId)
      })
      this.choseDialog = true
    },
    removeGoods (index) {
      this.productList.splice(index, 1)
    }
  }
}
</script>
