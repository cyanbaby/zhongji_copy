<!--
 * @Author: your name
 * @Date: 2021-04-14 12:42:54
 * @LastEditTime: 2021-07-05 19:49:59
 * @LastEditors: 姚文彬
 * @Description: In User Settings Edit
 * @FilePath: \o-front-admin\src\views\user-center\base.vue
-->
<template>
  <el-card
    style="margin-top: -10px;"
    shadow="never"
    :body-style="{ padding: '20px 40px' }"
  >
    <div class="base-top">
      <!-- TODO 默认头像 -->
      <img
        :src="info.headUrl"
        alt=""
      />
      <div class="name">
        {{ info.username }}
      </div>
    </div>

    <el-row :gutter="20">
      <el-col
        :span="12"
        :offset="0"
      >
        <h3>详细资料</h3>
        <div class="content">
          <ul>
            <li><span class="label">姓名</span> {{ info.nickname }}</li>
            <li>
              <span class="label">性别</span>
              <template v-if="info.gender === '1'">
                男
              </template>
              <template v-if="info.gender === '0'">
                女
              </template>
            </li>
            <li><span class="label">职位</span> 未填写</li>
            <li>
              <span class="label" />
              <el-button
                type="text"
                @click="edit"
              >
                编辑
              </el-button>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col
        :span="12"
        :offset="0"
      >
        <h3>联系信息</h3>
        <div class="content">
          <ul>
            <li><span class="label">邮箱</span> {{ info.email }}</li>
            <li><span class="label">手机</span> {{ info.mobile }}</li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <vxe-modal
      v-model="dialog"
      title="编辑个人信息"
      width="580"
      resize
      :show-footer="true"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="90px"
        :inline="false"
        style="margin:10px auto"
      >
        <el-form-item label="头像：">
          <!-- 坑爹啊。独立组件只有裁剪？？？ -->
          <el-upload
            :show-file-list="false"
            :action="url"
            :headers="{
              Authorization: token
            }"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            class="avatar-uploader"
          >
            <img
              v-if="form.headUrl"
              :src="form.headUrl"
              width="100"
              height="100"
            />
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input
            v-model="form.nickname"
            style="width:300px"
          />
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio
            v-model="form.gender"
            label="1"
          >
            男
          </el-radio>
          <el-radio
            v-model="form.gender"
            label="0"
          >
            女
          </el-radio>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input
            v-model="form.email"
            style="width:300px"
          />
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            v-model="form.mobile"
            disabled
            style="width:300px"
          />
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button
          type="text"
          @click="dialog = false"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click="submitCU"
        >
          确认
        </el-button>
      </div>
    </vxe-modal>
  </el-card>
</template>
<script>
import util from '@/libs/util'
const { promiseBaseUrl } = document.querySelector('body').dataset
export default {
  data () {
    return {
      form: {
        headUrl: '',
        email: '',
        mobile: '',
        gender: '',
        nickname: ''
      },
      dialog: false,
      info: {},
      token: util.cookies.get('token'),
      url: `${promiseBaseUrl || process.env.VUE_APP_API}/baseservice/upload/uploadimg`
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$api.SYS_USER_INFO().then(res => {
        this.info = res.data
      })
    },

    edit () {
      this.dialog = true
      this.form = JSON.parse(JSON.stringify(this.info))
    },

    // 上传
    handleAvatarSuccess (val) {
      console.log('上传成功', val)
      if (val.code === '1') {
        this.form.headUrl = val.data
        this.$notify({
          title: '提示',
          message: '上传成功!',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: val.msg,
          type: 'warning'
        })
      }
    },
    handleAvatarError (val) {
      console.log('上传失败', val)
    },

    submitCU () {
      this.$api.SYS_USER_EDITINFO({
        ...this.form
      }).then(() => {
        this.dialog = false
        this.$notify({
          title: '提示',
          message: '更新用户信息成功!',
          type: 'success',
          duration: 5000
        })
        this.getInfo()
      })
    }
  }
}
</script>
<style lang="scss">

.base-top {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 20px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .name {
    font-size: 17px;
    color: #333;
  }
}
.content {
  box-sizing: border-box;
  display: flex;
  color: #333;
  .label {
    color: #757575;
    width: 80px;
    height: 20px;
    display: inline-block;
  }
  li {
    width: 100%;
    display: inline-block;
    margin-bottom: 10px;
  }
}
</style>
