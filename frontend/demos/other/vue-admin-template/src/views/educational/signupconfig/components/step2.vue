<template>
    <el-form
    ref="form"
    :model="form"
    label-width="140px"
    style="margin:50px 0;width:600px"
    >
        <el-form-item label="选择单位">
              <el-select
                v-model="form.orgId"
                filterable
                :disabled="true"
              >
                <el-option
                  v-for="item in options"
                  :key="item.orgId"
                  :label="item.orgFullName"
                  :value="item.orgId"
                />
              </el-select>
        </el-form-item>
        <el-form-item>
        <el-button
          type="primary"
          @click="next"
          style="margin-left:100%"
          :loading="loading"
        >
          下一步
        </el-button>
      </el-form-item>
    </el-form>
</template>
<script>
import util from '@/libs/util.js'
export default {
  data () {
    return {
      form: {
        orgId: ''
      },
      options: [],
      loading: false
    }
  },
  mounted () {
    /* // 查询招考单位
    this.$api.EXAM_GET_ORG({

    }).then(res => {
      this.options = res.data.list
    }) */
    this.init()
  },
  methods: {
    next () {
      const params = {
        activityId: util.cookies.get('activityId'),
        orgId: this.form.orgId
      }
      this.loading = true
      this.$api.SAVE_UNIT(params).then(() => {
        this.$notify({
          title: '提示',
          message: '关联招考单位成功!',
          type: 'success'
        })
        this.$emit('next', 2)
      }).catch(e => {
        this.loading = false
      })
    },
    // 初始回显
    init () {
      this.$api.GET_SIGNUP_INFO({
        classId: this.$route.query.classId
      }).then(res => {
        this.$api.GET_ORGID({
          orgId: res.data.orgId
        }).then(item => {
          const obj = {}
          obj.orgId = item.data.orgId
          obj.orgFullName = item.data.orgFullName
          this.options.push(obj)
          this.form.orgId = res.data.orgId
        })
      })
    }
  }
}
</script>
