<template>
  <el-form
    ref="form"
    :model="form"
    label-width="140px"
    style="margin:50px 0;width:600px"
    :rules="rules"
    v-loading="step1Loading"
  >
    <el-form-item label="报名活动类型：" prop="activityType">
      <el-select v-model="form.activityType" :disabled="true">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="报名活动名称：" prop="activityName">
      <el-input v-model="form.activityName" />
    </el-form-item>
    <el-form-item label="封面：" prop="bannerImgUrl">
      <div @click="upload" style="width:200px;height:115px">
        <img :src="form.bannerImgUrl" style="width:200px;height:115px;object-fit: cover;">
      </div>
    </el-form-item>
    <el-form-item label="报名时间：" prop="isLimitedSignUpTime">
      <el-radio
        v-model="form.isLimitedSignUpTime"
        :label="1"
      >
        限制时间
      </el-radio>
      <el-radio
        v-model="form.isLimitedSignUpTime"
        :label="2"
      >
        不限制时间
      </el-radio>
    </el-form-item>
    <el-form-item v-if="form.isLimitedSignUpTime==1">
      <el-form-item
        prop="signTime"
        :required="isrequired"
      >
        <el-date-picker
        v-model="form.signTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="signTimeChange"
        :clearable="false"
        :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="是否审核" prop="isAudit">
      <el-radio
        v-model="form.isAudit"
        :label="1"
      >
        是
      </el-radio>
      <el-radio
        v-model="form.isAudit"
        :label="2"
      >
        否
      </el-radio>
    </el-form-item>
    <el-form-item label="审核时间：" v-if="form.isAudit==1" required>
      <div style="display:flex">
        <el-form-item
        prop="auditTime"
        :required="isrequiredaudit"
        >
          <el-date-picker
          v-model="form.auditTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="auditTimeChange"
          :clearable="false"
          :default-time="['00:00:00', '23:59:59']"
          >
          <!-- :picker-options="pickerOptions" -->
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form-item>

    <el-form-item label="价格" prop="isFree">
      <el-radio
        v-model="form.isFree"
        :label="1"
      >
        免费
      </el-radio>

      <el-radio
        v-model="form.isFree"
        :label="2"
      >
        收费
      </el-radio>
      <br />
      <span v-if="form.isFree==2">
        <el-input-number v-model="form.price" :controls=false :min="0" :precision="2"></el-input-number>
        元
      </span>
    </el-form-item>
    <el-form-item label="收费节点" prop="chargingNode">
      <el-radio
        v-model="form.chargingNode"
        :label="1"
      >
        审核后付费
      </el-radio>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="margin-left:100%"
        @click="next"
        :loading="loading"
      >
        下一步
      </el-button>
    </el-form-item>
    <el-dialog title="上传图片" :visible.sync="imgUploadDialog" width="800px" :close-on-click-modal=false>
          <resource-uploader-v2
            ref="pictureResourceUploader"
            v-model="form.bannerImgUrl"
            resource-name="图片"
            upload-code="Upload-file-img"
            resource-suffix=".jpg,.png,.ico"
            :show-upload-button="true"
            :show-select-dir="true"
            :select-dir-by-suffix="true"
            :show-label="true"
            file-type="img"
            resource-bind-id='test'
            @uploadComplete="uploadComplete"
          />
    </el-dialog>
  </el-form>
</template>
<script>
import { isArray } from 'lodash'
import util from '@/libs/util.js'
export default {
  data () {
    // 验证报名时间的函数
    const signTime = (rule, value, callback) => {
      // 当开始时间为空值且为必填时，抛出错误，反之通过校验
      if (!this.form.signTime && this.isrequired) {
        callback(new Error('请选择报名日期'))
      } else {
        callback()
      }
    }

    // 验证审核时间的函数
    const auditTime = (rule, value, callback) => {
      // 当开始时间为空值且为必填时，抛出错误，反之通过校验
      if (!this.form.auditTime && this.isrequiredaudit) {
        callback(new Error('请选择审核日期'))
      } else {
        callback()
      }
    }
    return {
      checkList: [],
      options: [],
      form: {
        activityType: '3',
        activityName: '',
        bannerImgUrl: '',
        isLimitedSignUpTime: '',
        signTime: [],
        startTime: '',
        endTime: '',
        isAudit: '',
        auditTime: [],
        auditStartTime: '',
        auditEndTime: '',
        isFree: '',
        price: '',
        chargingNode: 1
      },
      imgUploadDialog: false,
      menu: [],
      rules: {
        activityType: [
          { required: true, message: '请选择报名活动类型', trigger: 'change' }
        ],
        activityName: [
          { required: true, message: '请输入报名活动名称', trigger: 'blur' }
        ],
        bannerImgUrl: [
          { required: true, message: '封面不能为空', trigger: 'change' }
        ],
        isLimitedSignUpTime: [
          { required: true, message: '请选择报名时间', trigger: 'change' }
        ],
        isAudit: [
          { required: true, message: '请选择是否审核', trigger: 'change' }
        ],
        isFree: [
          { required: true, message: '请选择价格', trigger: 'change' }
        ],
        chargingNode: [
          { required: true, message: '请选择价格', trigger: 'change' }
        ],
        signTime: [{ validator: signTime }],
        auditTime: [{ validator: auditTime }]
      },
      loading: false,
      // 选择开始时间大于等于当前时间
      pickerOptions: {
        disabledDate (time) {
          const dateTime = new Date()
          const startDateTime = dateTime.setDate(dateTime.getDate() - 1)
          const endDateTime = dateTime.setDate(dateTime.getDate() + 30000) // 30000为当前日期之后多少天
          return (
            time.getTime() < new Date(startDateTime).getTime() ||
            time.getTime() > new Date(endDateTime).getTime()
          )
        }
      },
      step1Loading: false
    }
  },
  watch: {
  },
  mounted () {
    this.defaultDisplay()
  },
  created () {
    this.getDict()
    this.echo()
  },
  computed: {
    isrequired: function () {
      return this.form.isLimitedSignUpTime == 1
    },
    isrequiredaudit: function () {
      return this.form.isAudit == 1
    }
  },
  methods: {
    defaultDisplay () {
      this.form.activityName = this.$route.query.activityName
      this.form.bannerImgUrl = this.$route.query.bannerImgUrl
    },
    getDict () {
      this.$api.SETTING_GET_DICT({
        typeCode: 'signup_act_type'
      }).then(res => {
        const list = res.data
        if (isArray(list)) {
          this.options = list.map(item => {
            return {
              value: `${item.dictDataName}`,
              label: `${item.dictDataValue}`
            }
          })
        }
      })
    },
    upload () {
      this.imgUploadDialog = true
      this.$nextTick(params => {
        this.$refs.pictureResourceUploader.clearFiles()
      })
    },
    uploadComplete (params) {
      this.imgUploadDialog = false
      console.log('文件上传完成：{}', params)
    },
    signTimeChange (val) {
      this.form.startTime = val[0]
      this.form.endTime = val[1]
    },
    auditTimeChange (val) {
      this.form.auditStartTime = val[0]
      this.form.auditEndTime = val[1]
    },
    next () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.CREAT_SIGNUP_INFO({
            ...this.form,
            classId: this.$route.query.classId
          }).then(res => {
            if (this.form.activityId) { // 编辑
              // 缓存活动id
              util.cookies.set('activityId', res.data)
              this.$notify({
                title: '提示',
                message: '编辑活动成功!',
                type: 'success'
              })
              this.$emit('next', 1)
            } else { // 编辑
              // 缓存活动id
              util.cookies.set('activityId', res.data)
              this.$notify({
                title: '提示',
                message: '新增活动成功!',
                type: 'success'
              })
              this.$emit('next', 1)
            }
          }).catch(e => {
            this.loading = false
          })
        } else {
          console.log('校验错误')
          return false
        }
      })
    },
    // 回显
    echo () {
      this.step1Loading = true
      this.$api.GET_SIGNUP_INFO({
        classId: this.$route.query.classId
      }).then(res => {
        if (res.data.activityId) { // 编辑
          this.form = res.data
          if (res.data.startTime) {
            const signTime = []
            signTime.push(res.data.startTime)
            signTime.push(res.data.endTime)
            this.$set(this.form, 'signTime', signTime)
          }
          if (res.data.auditStartTime) {
            const auditTime = []
            auditTime.push(res.data.auditStartTime)
            auditTime.push(res.data.auditEndTime)
            this.$set(this.form, 'auditTime', auditTime)
          }
        }
        this.step1Loading = false
      })
    }
  }
}
</script>
