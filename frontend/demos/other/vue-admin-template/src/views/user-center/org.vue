<template>
  <div class="page"
       style="padding:20px;margin-top: -10px;">
    <div class="page-header">
      <span class="page-title"> 我的{{ title }} </span>
      <!-- <el-button
        icon="el-icon-check"
        type="primary"
        @click="dialog = true"
      >
        创建{{ title }}
      </el-button> -->
    </div>
    <ul>
      <li v-for="(item, index) in list"
          :key="index"
          class="org-card">
        <div class="org-card_top">
          <div class="org-card_l">
            <img :src="item.orgIconUrl"
                 class="org-card_logo" />
            <div>
              <div class="org-title">
                {{ item.orgFullName }}
              </div>
              <el-tag>企业版</el-tag>
              <span class="org-id">{{ title }}ID：{{ item.orgId }}</span>
              <span class="org-statu">服务中</span>
            </div>
          </div>
          <div>
            <el-switch v-model="item.orgDefault"
                       active-text="设为默认组织"
                       :active-value="activeValue"
                       :inactive-value="inactiveValue"
                       @change="isSettingDefault(item)">
            </el-switch>
          </div>

        </div>

        <el-collapse-transition>
          <div>
            <div class="content">
              <div class="label">
                {{ title }}名片
              </div>
              <ul>
                <li>
                  <span class="label">{{ title }}类型</span> {{ item.orgType }}
                </li>
                <li>
                  <span class="label">管理员</span>
                  <a href="javascript:;"
                     @click="changeRole(item.orgFullName,item.managerMobile,item.orgId )"
                     style="margin-left: 20px;color: #409EFF;font-size: 14px;"
                     v-if="item.isAdminUser">更换管理员</a>
                </li>
                <li>
                  <span class="label">手机号</span> {{ item.managerMobile }}
                </li>
              </ul>
              <ul>
                <li>
                  <span class="label">创建时间</span> {{ item.createTime }}
                </li>
                <li><span class="label">角色</span> {{ item.roleName }}</li>
              </ul>
            </div>

            <div class="org-card_bottom">
              <el-button icon="el-icon-position"
                         type="text"
                         @click="enterSystem(item)">
                进入工作台
              </el-button>
            </div>
          </div>
        </el-collapse-transition>
      </li>
    </ul>
    <el-pagination @current-change="handleCurrentChange"
                   :current-page.sync="pageNum"
                   background
                   :page-size="10"
                   layout="total, prev, pager, next"
                   :total="total">
    </el-pagination>

    <el-drawer :wrapperClosable=false
               :visible.sync="dialog"
               direction="rtl"
               size="50%">
      <template slot="title">
        <strong>创建组织</strong>
      </template>
      <el-card shadow="never">
        <el-scrollbar>
          <el-form ref="form"
                   :model="form"
                   label-width="120px">
            <el-form-item label="全称：">
              <el-input v-model="form.orgFullName"
                        style="width:300px" />
            </el-form-item>
            <el-form-item label="简称：">
              <el-input v-model="form.orgShortName"
                        style="width:300px" />
            </el-form-item>
            <el-form-item label="地址：">
              <el-row>
                <el-col :span="24">
                  <el-cascader ref="manageArea"
                               v-model="form.checked"
                               :props="props"
                               :options="OptionS"
                               placeholder="选择单位所在地"
                               style="width:300px"
                               @change="handleChange"
                               filterable />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="组织类型：">
              <el-select v-model="form.orgType"
                         style="width:300px">
                <el-option v-for="item in types"
                           :key="item.value"
                           :label="item.label"
                           :value="Number(item.value)">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址：">
              <el-input v-model="form.addressDetail"
                        style="width:300px" />
            </el-form-item>
            <el-form-item label="机构logo：">
              <el-upload :show-file-list="false"
                         :action="url"
                         :headers="{
                  Authorization: token
                }"
                         :on-success="handleAvatarSuccess"
                         class="avatar-uploader">
                <img v-if="form.orgIconUrl"
                     :src="form.orgIconUrl"
                     width="100"
                     height="100" />
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="管理员姓名：">
              <el-input v-model="form.managerName"
                        style="width:300px" />
            </el-form-item>
            <el-form-item label="管理员手机号：">
              <el-input v-model="form.managerMobile"
                        style="width:300px" />
            </el-form-item>
          </el-form>
        </el-scrollbar>
        <div>
          <el-button icon="el-icon-check"
                     style="float: right; padding: 6px 9px;margin:10px 100px"
                     type="primary"
                     :loading="loading"
                     @click="submitCU">
            创建
          </el-button>
        </div>
      </el-card>
    </el-drawer>
    <el-dialog :visible.sync="dialog1"
               :title="'更换'+orgFullName+'管理员'"
               width="500px"
               :close-on-click-modal=false>
      <div>
        发送验证短信给原管理员（{{managerMobile}}）
        <el-button @click.stop="!loading ? getCode(form) : ''"
                   size="mini"
                   type="primary">
          发送短信
        </el-button>
      </div>
      <div style="margin-top:20px;display: flex;">
        <div style="width:100px;line-height: 40px;">
          <span style="color:red;">*</span>
          短信验证码
        </div>
        <el-input style="width:250px"
                  v-model="SNScode"
                  placeholder="请输入6位验证码">
          <el-button slot="suffix"
                     type="text"
                     :disabled="loading"
                     :loading="loading">
            <template v-if="loading">
              {{ count }} s
            </template>
          </el-button>
        </el-input>
      </div>
      <div slot="footer"
           style="text-align:right">
        <el-button @click="dialog1 = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="handleSubmit">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialog2"
               :title="'更换'+orgFullName+'管理员'"
               width="500px"
               :close-on-click-modal=false>
      <el-form ref="phoneForm"
               :model="phoneForm"
               :rules="phoneRules"
               label-width="170px">
        <el-form-item prop="phone"
                      label="请输入新手机账号">
          <el-input v-model="phoneForm.phone"
                    placeholder="请输入新手机账号" />
        </el-form-item>
        <el-form-item prop="rePhone"
                      label="请再次输入新手机账号">
          <el-input v-model="phoneForm.rePhone"
                    placeholder="请再次输入新手机账号" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           style="text-align:right">
        <el-button @click="dialog2 = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="handleSubmit1">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialog3"
               title="是否更换"
               width="500px"
               :close-on-click-modal=false>
      更换管理员后，原账号不再拥有任何角色权限，点击确认完成管理员更换。
      <div slot="footer"
           style="text-align:right">
        <el-button @click="dialog3 = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="handleSubmit2">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { isArray } from 'lodash'
import util from '@/libs/util.js'
import { mapState, mapActions } from 'vuex'
const { promiseBaseUrl } = document.querySelector('body').dataset
export default {
  data () {
    const rePhoneValide = (rule, value, callback) => {
      if (value != this.phoneForm.phone) {
        callback(new Error('再次输入的手机号和新手机号不一致'))
      } else {
        callback()
      }
    }
    const phoneValide = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (!value) {
        callback(new Error('请输入新手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      OptionS: '',
      token: util.cookies.get('token'),
      url: `${promiseBaseUrl || process.env.VUE_APP_API}/baseservice/upload/uploadimg`,
      options: [],
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      props: {
        // lazy: true,
        // expandTrigger: 'hover',
        checkStrictly: true,
        value: 'areaCode',
        label: 'name'
        // lazyLoad: this.lazyLoad
      },
      toggle: true,
      list: [],
      pageNum: 1,
      total: 0,
      title: '组织',
      orgFullName: '',
      managerMobile: '',
      orgId: '',
      SNScode: '',
      phoneForm: {
        phone: '',
        rePhone: ''
      },
      activeValue: 1,
      inactiveValue: 2,
      form: {
        orgIconUrl: '',
        addressCode: '',
        addressDetail: '',
        managerName: '',
        orgFullName: '',
        orgShortName: '',
        managerMobile: '',
        orgType: '',
        checked: []
      },
      rules: {},
      phoneRules: {
        rePhone: [{ required: true, message: '请再次输入新手机账号', trigger: 'blur', validator: rePhoneValide }],
        phone: [{ required: true, trigger: 'blur', validator: phoneValide }]
      },
      types: [],
      loading: false,
      timer: null,
      count: 0
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info', 'config'])
  },
  watch: {
    dialog (val) {
      if (val) {
        console.log(this.info)
        this.form.managerMobile = this.info.username
      } else {
        // 重置表单
        this.$refs.form.resetFields()
        Object.assign(this.$data.form, this.$options.data().form)
      }
    }
  },
  async mounted () {
    this.title = this.$route.query.type === 'my_plat' ? '平台' : '组织'

    this.getList()

    // 查询组织类型/全局字典
    this.$api.SETTING_GET_DICT({
      typeCode: 'org_type'
    }).then(res => {
      const list = res.data
      if (isArray(list)) {
        this.types = list.map(item => {
          return {
            value: Number(`${item.dictDataValue}`),
            label: `${item.dictDataName}`
          }
        })
      }
    })
  },
  created () {
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  methods: {
    // lazyLoad (node, resolve) {
    //   if(node.children && node.children.length>0){
    //     node.children=[]
    //   }
    //   setTimeout(() => {
    //     const { level } = node;
    //     if(level==0){
    //       node.value=0
    //     }
    //     this.$api.getArea({parentCode:node.value}).then(res=>{
    //       const province=res.data.map((value,i)=>({
    //         value:value.areaCode,
    //         label:value.name,
    //         leaf: level >= 3
    //       }))
    //       resolve(province);
    //     })
    //   })
    // },
    ...mapActions('d2admin/page', ['closeAll']),
    changeRole (orgFullName, managerMobile, orgId) {
      this.dialog1 = true
      this.orgId = orgId
      this.orgFullName = orgFullName
      this.managerMobile = managerMobile
    },
    handleSubmit () {
      this.$api.CHECKCODE({
        mobile: this.managerMobile,
        code: this.SNScode
      }).then(() => {
        this.dialog1 = false
        this.dialog2 = true
      })
    },
    handleSubmit1 () {
      this.$refs.phoneForm.validate(valid => {
        if (valid) {
          this.$api.ChangeorgAdmin({
            orgId: this.orgId,
            newMobile: this.phoneForm.phone,
            code: this.SNScode
          }).then(() => {
            this.dialog2 = false
            this.dialog3 = true
          })
        }
      })
    },
    handleSubmit2 () {
      this.dialog3 = false
      this.$router.replace({
        path: '/refresh',
        query: {
          t: Date.now()
        }
      })
    },
    getCode () {
      if (!this.managerMobile) {
        this.$notify({
          title: '提示',
          message: '没有可以发送短信的手机号！',
          type: 'warning'
        })
      } else {
        const TIME_COUNT = 60

        if (!this.timer) {
          this.$api.SENDORGCODE({
            orgId: this.orgId,
            sendType: '1',
            platformId: this.config.platformId
          }).then(() => {
            this.count = TIME_COUNT
            this.loading = true
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.loading = false
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
            // 自动销毁定时器
            this.$once('hook:beforeDestroy', () => {
              clearInterval(this.timer)
              this.timer = null
            })
          })
        }
      }
    },
    // 上传
    handleAvatarSuccess (val) {
      console.log('上传成功', val)
      if (val.code === '1') {
        this.form.orgIconUrl = val.data
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
    handleCurrentChange (page) {
      this.pageNum = page
      this.getList()
    },
    async getList () {
      const res = await this.$api.USER_APP_GET({
        pageNum: this.pageNum,
        pageSize: 10
      })

      console.log(res)
      this.total = res.data.total
      this.list = res.data.list
    },

    // 转省市区编码,只提交最后一位
    handleChange (val) {
      // const panelRefs = this.$refs.manageArea.$refs.panel
      // panelRefs.lazyLoad(panelRefs.getCheckedNodes()[0])
      this.form.addressCode = val[val.length - 1]
    },

    // 新增组织
    submitCU () {
      this.loading = true
      this.$api.USER_APP_ADD({ ...this.form }).then(() => {
        this.$notify({
          title: '提示',
          message: '新增组织成功!',
          type: 'success',
          duration: 5000
        })
        this.getList()
        this.dialog = false
      }).finally(() => {
        this.loading = false
      })
    },

    async initAppList (opOrgId) {
      const { data } = await this.$api.HEADE_GET({
        orgId: opOrgId
      })
      this.appList = []

      data.forEach(item => {
        // 个人中心不展示
        if (item.appCode !== 'my') {
          this.appList.push({
            title: item.appName,
            icon: item.appIconUrl,
            appId: item.appId,
            path: item.appCode || '/index'
          })
        }
      })
      // 初始化顶部应用 设置顶栏菜单
      await this.$store.dispatch(
        'd2admin/menu/appSet',
        [
          {
            title: '首页',
            icon: 'home',
            path: '/index'
          },
          ...this.appList
        ],
        { root: true }
      )

      // 清空侧栏
      this.$store.dispatch('d2admin/menu/funcSet', [])
      this.$router.push({
        path: '/index'
      })
    },

    enterSystem (row) {
      const { orgId, orgIconUrl, orgFullName } = row
      this.$router.push({
        path: '/index'
      })

      util.cookies.set('logo', orgIconUrl)
      util.cookies.set('orgFullName', orgFullName)
      this.closeAll()

      this.initAppList(orgId)
    },
    isSettingDefault (item) {
      console.log(item)
      if (item.orgDefault == '1') {
        item.orgDefault = 2
        this.$alert('设为默认组织后下次登录将直接进入该组织工作台，是否确定选中?', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              this.$api.SET_DEFAULT_ORG({
                setDefault: 1,
                orgId: item.orgId
              }).then(res => {
                if (res.code === '1') {
                  this.getList()
                  this.$message({
                    type: 'success',
                    message: '设置成功'
                  })
                }
              })
            }
          }
        })
      } else {
        item.orgDefault = 1
        this.$alert('取消选中后下次登录将不再直接进入该组织工作台，是否确定取消？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              this.$api.SET_DEFAULT_ORG({
                setDefault: 2,
                orgId: item.orgId
              }).then(res => {
                if (res.code === '1') {
                  this.getList()
                  this.$message({
                    type: 'success',
                    message: '取消成功'
                  })
                }
              })
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.org-card {
  width: 100%;
  margin-top: 30px;
  padding: 15px 20px;
  box-sizing: border-box;
  border: 1px solid #eaeaea;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    .org-card-title {
      height: 80px;
    }
    .org-card_l {
      display: flex;
    }
    .icon {
      font-size: 18px;
      color: #909399;
    }
    .org-card_logo {
      width: 120px;
      height: 60px;
      margin-right: 10px;
    }
    .org-title {
      font-size: 16px;
      font-weight: 700;
      color: #333;
      margin-bottom: 15px;
    }
    .org-id {
      margin-left: 20px;
      color: #909399;
    }
    .org-statu {
      color: #9e9e9e;
      margin-left: 30px;
    }
  }
  &_bottom {
    border-top: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    padding-top: 15px;
    justify-content: flex-start;
    margin-top: 30px;
  }

  .content {
    border-top: 1px solid #eaeaea;
    padding: 24px 0;
    box-sizing: border-box;
    display: flex;
    height: 120px;
    color: #333;
    .label {
      color: #757575;
      width: 80px;
      height: 20px;
      display: inline-block;
    }
    ul {
      // display: flex;
    }
    li {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
}
</style>
