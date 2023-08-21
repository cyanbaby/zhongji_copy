<template>
  <d2-container class="specific">
    <template slot='header'>
      <span class='page-title'>{{this.$route.meta.title}}</span>
      <d2-helper title='帮助文档'>
        <div>
          <d2-link-btn title='文档链接'
                       link='http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html' />
        </div>
      </d2-helper>
    </template>
    <el-container style="height: 100%;">
      <el-aside width="250px"
                class="aside">
        <!-- <div>
                    <el-button type="primary" size="medium" @click="addDepartment">新增组织</el-button>
                    <el-button type="primary" size="medium" style="margin-left: 30px;" @click="uncheck" v-if="orgId" plain>取消选中</el-button>
                </div> -->
        <el-input v-model="filterText"
                  placeholder="输入关键字过滤"
                  class="fiter"
                  suffix-icon="el-icon-search"
                  size="small">
        </el-input>
        <el-tree :data="menu"
                 :props="menuProps"
                 node-key="id1"
                 :filter-node-method="filterNode"
                 ref="categorytree"
                 style="padding: 0 12px;"
                 @node-click="getMenu"
                 :expand-on-click-node="false"
                 :highlight-current="true">
          <span class="custom-tree-node"
                slot-scope="{data}">
            <el-tooltip :content="data.orgFullName"
                        :disabled="isShowTooltip"
                        :open-delay="300"
                        placement="top"
                        effect="light">
              <span @mouseover="mouseOver($event)"
                    class="over-ellipsis">{{ data.orgFullName }}</span>
            </el-tooltip>
            <!-- <el-button type="text" @click="editBtn(data)">编辑</el-button> -->
            <!-- <el-button type="text" @click="deleteOrgById(data)">删除</el-button> -->
          </span>

        </el-tree>
      </el-aside>
      <el-main class="main"
               v-loading="maskLoading">
        <h2>组织信息</h2>
        <!-- 查看信息 -->
        <view-info v-if="isView"
                   @isChangeView="getisChangeView"
                   :selectOrgInfo="selectOrgInfo"
                   :optionsorgType="optionsorgType"
                   @changeRole="changeRole"
                   :orgId="orgId" />
        <!-- 编辑信息 -->
        <edit-info v-if="!isView"
                   @isChangeView="getisChangeView"
                   :selectOrgInfo="selectOrgInfo"
                   :optionsorgType="optionsorgType"
                   @changeRole="changeRole" />
      </el-main>
      <el-dialog :title="departMentTitle"
                 :visible.sync="departmentVisible"
                 width="40%"
                 :close-on-click-modal="false"
                 top="7vh"
                 @close="close">
        <el-form ref="departmentForm"
                 :model="formData"
                 :rules="rules"
                 size="medium"
                 label-width="117px">
          <el-form-item label="归属组织"
                        prop="parentOrgId">
            <el-select v-model="formData.parentOrgId"
                       :disabled='true'
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in parentOrgIdOptions"
                         :key="index"
                         :label="item.label"
                         :value="item.value"
                         :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织全称"
                        prop="orgFullName">
            <el-input v-model="formData.orgFullName"
                      placeholder="请输入组织全称"
                      :maxlength="25"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="组织简称"
                        prop="orgShortName">
            <el-input v-model="formData.orgShortName"
                      placeholder="请输入组织简称"
                      :maxlength="25"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="机构logo："
                        prop="orgIconUrl">
            <div class="avatar-uploader"
                 @click="upload"
                 v-if="!formData.orgIconUrl">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <div v-else>
              <img :src="formData.orgIconUrl"
                   style="width:90px;"
                   @click="upload" />
            </div>
          </el-form-item>
          <el-form-item label="地址"
                        prop="addressCode">
            <el-row>
              <el-col :span="24">
                <el-cascader v-model="formData.addressCode"
                             :props="manageAreaProps"
                             ref="manageArea"
                             :options="OptionS"
                             collapse-tags
                             filterable
                             :style="{width: '100%'}"
                             placeholder="请选择地址"
                             clearable
                             @change="handleChange"></el-cascader>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="详细地址"
                        prop="addressDetail">
            <el-input v-model="formData.addressDetail"
                      placeholder="请输入详细地址"
                      clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="组织类型"
                        prop="orgType">
            <el-select v-model="formData.orgType"
                       placeholder="请选择组织类型"
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in optionsorgType"
                         :key="index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理者姓名"
                        prop="managerName">
            <el-input v-model="formData.managerName"
                      placeholder="请输入管理者姓名"
                      clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="管理者手机号"
                        prop="managerMobile">
            <el-input v-model="formData.managerMobile"
                      placeholder="请输入管理者手机号"
                      clearable>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="departmentVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleConfirm">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="上传图片"
                 :visible.sync="imgUploadDialog"
                 width="800px"
                 :close-on-click-modal=false>
        <resource-uploader-v2 ref="pictureResourceUploader"
                              resource-name="图片"
                              upload-code="Upload-portal-cover"
                              :show-upload-button="true"
                              :show-select-dir="true"
                              :select-dir-by-suffix="true"
                              :show-label="true"
                              file-type="img"
                              @uploadComplete="uploadComplete" />
      </el-dialog>
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
    </el-container>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import viewInfo from './components/view.vue'
import editInfo from './components/edit.vue'
import { isArray } from 'lodash'
import { mapState } from 'vuex'
export default {
  components: {
    viewInfo,
    editInfo
  },
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
      maskLoading: false,
      filterText: '',
      menu: [],
      menuProps: {
        label: 'orgFullName',
        value: 'orgId',
        children: 'subOrgList'
      },
      isShowTooltip: false,
      isView: true,
      departMentTitle: '',
      departmentVisible: false,
      formData: {
        parentOrgId: '-1',
        orgFullName: '',
        orgShortName: '',
        orgIconUrl: '',
        addressCode: [],
        addressDetail: ''
      },
      rules: {
        parentOrgId: [{
          required: true,
          message: '请选择归属组织',
          trigger: 'blur'
        }],
        orgFullName: [{
          required: true,
          message: '请输入组织全程',
          trigger: 'blur'
        }],
        orgShortName: [{
          required: true,
          message: '请输入组织简称',
          trigger: 'blur'
        }],
        orgIconUrl: [{
          required: true,
          message: '请上传机构logo',
          trigger: 'change'
        }],
        addressCode: [{
          required: true,
          message: '请选择地址',
          trigger: 'change'
        }],
        orgType: [{
          required: true,
          message: '请选择组织类型',
          trigger: 'change'
        }],
        managerName: [{
          required: true,
          message: '请输入管理者姓名',
          trigger: 'blur'
        }],
        managerMobile: [{
          required: true,
          message: '请输入管理者手机号',
          trigger: 'blur'
        }]
      },
      defaultFormData: {},
      parentOrgIdOptions: [{
        label: '无上级组织',
        value: '-1'
      }],
      imgUploadDialog: false,
      manageAreaProps: {
        // lazy: true,
        // expandTrigger: 'hover',
        checkStrictly: true,
        value: 'areaCode',
        label: 'name'
        // lazyLoad: this.lazyLoad
      },
      optionsorgType: [],
      orgId: '',
      selectOrgInfo: {},
      dialog1: false,
      dialog2: false,
      dialog3: false,
      orgFullName: '',
      managerMobile: '',
      phoneForm: {},
      phoneRules: {
        rePhone: [{ required: true, message: '请再次输入新手机账号', trigger: 'blur', validator: rePhoneValide }],
        phone: [{ required: true, trigger: 'blur', validator: phoneValide }]
      },
      loading: false,
      count: 0,
      timer: null,
      SNScode: '',
      currentOrgName: '',
      currentOrgId: ''
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info', 'config'])
  },
  watch: {
    filterText (val) {
      this.$refs.categorytree.filter(val)
    },
    'formData.orgFullName': {
      handler (newval) {
        this.formData.orgShortName = newval
      }
    }
  },
  created () {
    this.defaultFormData = JSON.parse(JSON.stringify(this.formData))
    this.queryTree()
    this.$api.SETTING_GET_DICT({
      typeCode: 'org_type'
    }).then(res => {
      const list = res.data
      if (isArray(list)) {
        this.optionsorgType = list.map(item => {
          return {
            value: `${item.dictDataValue}`,
            label: `${item.dictDataName}`
          }
        })
      }
    })
    this.$api.ORG_BASE_GET().then(res => {
      this.currentOrgName = res.data.orgFullName
      this.currentOrgId = res.data.orgId
    })
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  methods: {
    // lazyLoad (node, resolve) {
    //   if (node.children && node.children.length > 0) {
    //     node.children = []
    //   }
    //   setTimeout(() => {
    //     const { level } = node
    //     if (level == 0) {
    //       node.value = 0
    //     }
    //     this.$api.getArea({ parentCode: node.value }).then(res => {
    //       const province = res.data.map((value, i) => ({
    //         value: value.areaCode,
    //         label: value.name,
    //         leaf: level >= 3
    //       }))
    //       resolve(province)
    //     })
    //   })
    // },
    // 目录超出显示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    },
    doRefresh () {
      this.queryTree()
      this.uncheck()
      this.selectOrgInfo = {}
    },
    filterNode (value, data) {
      if (!value) return true
      return data.depFullName.indexOf(value) !== -1
    },
    queryTree () {
      this.$api.QUERY_ORG_TREE().then(res => {
        this.menu = res.data
      })
    },
    // 转省市区编码,只提交最后一位
    handleChange (val) {
      // const panelRefs = this.$refs.manageArea.$refs.panel
      // panelRefs.lazyLoad(panelRefs.getCheckedNodes()[0])
      this.formData.addressCode = val[val.length - 1]
      const data = this.$refs.manageArea.getCheckedNodes()[0]
      data.path[0] ? this.formData.provinceCode = data.path[0] : ''
      data.path[1] ? this.formData.cityCode = data.path[1] : ''
      data.path[2] ? this.formData.areaCode = data.path[2] : ''
      data.path[3] ? this.formData.streetCode = data.path[3] : ''
      data.pathLabels[0] ? this.formData.province = data.pathLabels[0] : ''
      data.pathLabels[1] ? this.formData.city = data.pathLabels[1] : ''
      data.pathLabels[2] ? this.formData.area = data.pathLabels[2] : ''
      data.pathLabels[3] ? this.formData.street = data.pathLabels[3] : ''
    },
    getisChangeView (e) {
      this.isView = e
      this.getOrgInfo()
    },
    addDepartment () {
      this.departMentTitle = '新增组织'
      if (this.orgId) {
        this.formData.parentOrgId = this.orgId
      } else {
        this.formData.parentOrgId = this.currentOrgId
        this.parentOrgIdOptions.push({ value: this.currentOrgId, label: this.currentOrgName })
      }
      this.departmentVisible = true
    },
    close () {
      this.formData = JSON.parse(JSON.stringify(this.defaultFormData))
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
      this.formData.orgIconUrl = params.url
    },
    handleConfirm () {
      this.$refs.departmentForm.validate((valid) => {
        if (valid) {
          this.$api.USER_APP_ADD({
            ...this.formData
          }).then(() => {
            this.departmentVisible = false
            this.$message({
              message: '添加组织成功！',
              type: 'success'
            })
            this.doRefresh()
          })
        }
      })
    },
    deleteOrgById (val) {
      this.$confirm('是否删除此组织?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.DELETE_ORG_BY_ID({
          orgId: val.orgId
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.doRefresh()
        })
      }).catch(() => {
      })
    },
    uncheck () {
      this.$refs.categorytree.setCurrentKey(null)
      this.orgId = ''
    },
    // 选中目录树
    getMenu (val) {
      this.orgId = val.orgId
      this.getOrgInfo()
      this.isView = true
      this.parentOrgIdOptions.push({ value: val.orgId, label: val.orgFullName })
      this.orgId = val.orgId
    },
    // 根据选中的组织id查询右边的组织信息
    getOrgInfo () {
      this.maskLoading = true
      this.$api.GET_ORG_INFO_BY_ORGID({
        orgId: this.orgId
      }).then(res => {
        this.selectOrgInfo = res.data
        this.orgFullName = res.data.orgFullName
        this.managerMobile = res.data.managerMobile
        this.maskLoading = false
      }).catch(() => {
        this.maskLoading = false
      })
    },
    changeRole () {
      this.dialog1 = true
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
    }
  }
}
</script>
<style>
.specific .d2-container-full__body {
  padding: 0 !important;
}
</style>
<style scoped lang="scss">
.main {
  width: 90%;
  border: 1px solid #cfd7e5;
  margin: 10px;
  padding: 10px;
  background: white;
}
.aside {
  border: 1px solid #cfd7e5;
  margin: 10px 0 10px 10px;
  background: white;
  overflow-x: hidden;
  padding: 10px;
}
.fiter {
  /* width: 90%; */
  margin: 10px 0;
}
.over-ellipsis {
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
