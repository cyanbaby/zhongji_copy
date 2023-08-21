<template>
  <el-card v-loading="mask">
    <el-form label-width="110px" :rules="addGoodsRules" ref="baseInfoForm" :model="baseInfoForm">
    <el-form-item prop="goodsValue" label="课程名称：">
        <el-col :span="8">
        <el-input v-model="baseInfoForm.goodsValue"></el-input>
        <!-- <div class="subTitle">建议名称最长不超过8个字符</div> -->
        </el-col>
    </el-form-item>
    <el-form-item label="分享描述：">
        <el-col :span="8">
        <el-input
        type="textarea"
        :autosize="{ minRows: 4}"
        v-model="baseInfoForm.shareMemo"
        maxlength="38"
        show-word-limit>
        </el-input>
        <div class="subTitle">微信分享给好友时会显示,建议38个字以内</div>
        </el-col>
    </el-form-item>
    <el-form-item label="课程来源：" prop="goodsSource">
        <el-radio-group v-model="baseInfoForm.goodsSource">
        <el-radio v-for="item in sourceDic" :label="item.label" :key="item.label">{{item.value}}</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-button type="primary" @click="secBtn" class="nextBtn">{{distinguish}}</el-button>
    </el-form>
  </el-card>
</template>
<script>
import { isArray } from 'lodash'
import { mapActions } from 'vuex'
export default {
  props: {
    distinguish: {
      type: String,
      default: ''
    }
  },
  watch: {
  },
  data () {
    return {
      sourceDic: [],
      goodsId: '',
      baseInfoForm: {
        goodsValue: '',
        shareMemo: '',
        goodsSource: ''
      },
      // 验证规则
      addGoodsRules: {
        goodsValue: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        goodsSource: [
          { required: true, message: '请选择课程来源', trigger: 'blur' }
        ]
      },
      catInfo: {},
      mask: false
    }
  },
  created () {
    this.getDict()
  },
  methods: {
    ...mapActions('d2admin/goods', ['getGoodsInfo']),
    getDict () {
      this.$api.SETTING_GET_DICT({
        typeCode: 'content_source'
      }).then(res => {
        const list = res.data
        if (isArray(list)) {
          this.sourceDic = list.map(item => {
            return {
              value: `${item.dictDataName}`,
              label: `${item.dictDataValue}`
            }
          })
        }
        this.getBaseInfoByGoodsId()
      })
    },
    getBaseInfoByGoodsId () {
      /*  console.log("getBaseInfoByGoodsId -> util.cookies.get('baseInfo')4", util.cookies.get('baseInfo'))
        const baseInfo = JSON.parse(util.cookies.get('baseInfo'))
        this.baseInfoForm.goodsValue = baseInfo.goodsValue
        this.baseInfoForm.shareMemo = baseInfo.shareMemo
        this.baseInfoForm.goodsSource = baseInfo.goodsSource.toString() */
      if (this.$route.query.goodsId) {
        this.goodsId = this.$route.query.goodsId
        this.mask = true
        this.$api.GET_BY_GOODSID({
          goodsId: this.$route.query.goodsId,
          goodsType: this.$route.query.goodsType
        }).then(res => {
          this.baseInfoForm.goodsValue = res.data.goodsValue
          this.baseInfoForm.shareMemo = res.data.shareMemo
          this.baseInfoForm.goodsSource = res.data.goodsSource.toString()
          this.mask = false
        }).catch(() => {
          this.mask = false
        })
      }
    },
    async getNewCatInfo () {
      const catInfo = await this.getGoodsInfo()
      this.catInfo = catInfo
    },
    // 基本信息
    async secBtn () {
      await this.getNewCatInfo()
      this.$refs.baseInfoForm.validate((valid) => {
        if (valid) {
          this.mask = true
          if (!this.goodsId) { // 新增
            this.$api.BASEINFOPRE({
              ...this.baseInfoForm,
              ...this.catInfo
            }).then(res => {
              this.$emit('activeNameChange', '3')
              this.$emit('getGoodsId', res.data)
              this.$emit('getCatIds', this.catInfo.catIds)
              this.mask = false
            }).catch(() => {
              this.mask = false
            })
          } else { // 编辑
            this.$api.EDIT_BASEINFOPRE({
              goodsId: this.goodsId,
              ...this.baseInfoForm,
              ...this.catInfo
            }).then(res => {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.$emit('activeNameChange', '3')
              this.mask = false
            }).catch(() => {
              this.mask = false
            })
          }
        } else {
          console.log('校验失败')
          return false
        }
      })
    }
  }
}
</script>
