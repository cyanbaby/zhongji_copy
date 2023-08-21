<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">{{this.$route.meta.title}}</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn title="文档链接"
                       link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html" />
        </div>
      </d2-helper>
    </template>
    <d2-crud-x ref="d2Crud"
               v-bind="_crudProps"
               v-on="_crudListeners"
               @editUserInfo="editUserInfo"
               @resetDialog="resetDialog">
      <div slot="header">
        <crud-search ref="search"
                     :options="crud.searchOptions"
                     @submit="handleSearch"
                     @reset="resetClick">
          <!-- <template slot="aliasValueSearchSlot" slot-scope="scope">
        <el-select v-model="scope.row.aliasValue" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template> -->
          <template slot="addressCodeSearchSlot">
            <el-row class="address-box-select">
              <el-col :span="24">
                <el-cascader ref="adressRef"
                             v-if="isDataPermission"
                             v-model="formAddress.addressCode"
                             style="width:100%"
                             :props="props"
                             :options="options"
                             placeholder="请选择地址"
                             @change="adressChange"
                             filterable />
                <el-cascader ref="adressRef"
                             v-if="!isDataPermission"
                             v-model="formAddress.addressCode"
                             style="width:100%"
                             :props="props"
                             :options="OptionS"
                             placeholder="请选择地址"
                             @change="adressChange"
                             filterable />
              </el-col>
            </el-row>
          </template>
        </crud-search>
        <!-- <el-button
            size="small"
            type="primary"
            @click="importAccountDialog = true"
            style="margin-bottom:10px"
          >
          <i class="el-icon-plus"></i>
          导入用户
          </el-button> -->
        <el-button size="medium"
                   type="primary"
                   @click="exportBtn">
          导出
        </el-button>
        <crud-toolbar v-bind="_crudToolbarProps"
                      v-on="_crudToolbarListeners" />
      </div>
      <template slot="citySlot"
                slot-scope="scope">
        <span>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.street}}</span>
      </template>
    </d2-crud-x>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :close-on-click-modal="false">
      <span style="padding:20px;line-height:30px;font-size:18px;letter-spacing:1px">您正在将用户{{nickName}}的账号密码重置为Aa123456，重置成功后将会以短信形式通知该用户。</span>
      <span slot="footer"
            style="text-align:center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="resetPassword">确 定</el-button>
      </span>
    </el-dialog>
    <div class="import-account-dialog">
      <el-dialog title="导入用户"
                 :visible.sync="importAccountDialog"
                 :close-on-click-modal=false
                 width="40%">
        <p>你正在批量新增用户</p>
        <p>规则说明：</p>
        <p>1.如果导入用户在平台已注册，则会跳过该用户，密码为原密码；如导入学员信息在平台未注册，则生成新账号</p>
        <p>2.新账号默认密码为123456，登录后可自行修改密码</p>
        <p>3.请严格按照模板说明填入信息，手机号为必填信息</p>
        <el-form ref="ruleForm"
                 class="margin-top"
                 :model="form"
                 style="width: 60%;display: inline-block;float: left;">
          <el-form-item label="请选择需要导入的文件"
                        prop="upload"
                        class="upload">
            <el-upload ref="upload"
                       class="upload-demo"
                       :action="importAccountApi"
                       :headers="{
            Authorization: jtoken,
            OpDomain:opDomain
          }"
                       accept=".xlsx, .xls"
                       :before-remove="beforeRemove"
                       :on-remove="handleRemove"
                       :before-upload="beforeUpload"
                       :on-change="handleChange"
                       :limit="1"
                       :on-exceed="handleExceed"
                       :on-success="handleSuccess"
                       :auto-upload="false"
                       :file-list="fileList">
              <el-button size="small">
                <i class="el-icon-upload2" />上传Excel
              </el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-link type="primary"
                 style="display:inline-block;float: left; margin-top: 17px;"
                 @click="downloade">
          点击下载模板
        </el-link>
        <el-dialog width="30%"
                   title="提示"
                   :visible.sync="innerVisible"
                   :close-on-click-modal="false"
                   append-to-body>
          数据导入需要时间，请稍后再来查看
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="innerVisible=false">确定</el-button>
          </span>
        </el-dialog>
        <div style="width:100px;margin:0 auto;margin-top:40px">
          <el-button @click="importStudent"
                     style="margin-right:40%">点击上传</el-button>
        </div>
      </el-dialog>
    </div>
    <edit-account ref="editAccountRef"
                  :info="info"
                  :major-select="majorSelect"
                  :address-options="addressOptions"
                  :city-options="cityOptions"
                  :area-options="areaOptions"
                  @save="editAccount"></edit-account>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import EditAccount from './editaccount.vue'
import { regionData } from 'element-china-area-data'
import { cloneDeep } from 'lodash'
import util from '@/libs/util'
import { globalOpdomain } from '@/utils/index'
const { promiseBaseUrl } = document.querySelector('body').dataset
// import { isArray } from 'lodash'
export default {
  mixins: [d2CrudPlus.crud],
  components: {
    EditAccount
  },
  data () {
    return {
      OptionS: '',
      isDataPermission: false,
      formAddress: {
        addressCode: '', // 省市区联动
        level: ''
      },
      props: {
        // lazy: true,
        checkStrictly: true,
        // expandTrigger: 'hover',
        value: 'areaCode',
        label: 'name'
        // lazyLoad: this.lazyLoad
      },
      options: [],
      // addressCode: '',

      dialogVisible: false,
      importAccountDialog: false,
      innerVisible: false,
      fileList: [],
      form: {
        file: '',
        id: ''
      },
      majorSelect: [],
      addressOptions: regionData,
      cityOptions: [],
      areaOptions: [],
      nickName: '',
      userId: '',
      opDomain: globalOpdomain(),
      importAccountApi: (promiseBaseUrl || process.env.VUE_APP_API) + '/usercenter/useroper/importuser',
      info: {
        headImg: '',
        username: '',
        nickname: '',
        gender: '',
        jobPosition: '',
        certNo: '',
        email: '',
        mobileNo: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        educationLevel: '',
        academicDegree: '',
        companyName: '',
        jobYear: '',
        major: '',
        title: ''
      }
    }
  },
  computed: {
    jtoken () {
      return util.cookies.get('token')
    }
  },
  created () {
    this.$api.CHECK_DATA_PERMISSION().then(res => {
      this.isDataPermission = res.data
    })
    this.$api.Get_All_Account_List({
      pageNum: 1,
      pageSize: 20
    }).then(res => {
      console.log(res)
    })
    this.$api.QUERY_ALL_MAJOR().then(({ data }) => {
      this.majorSelect = data
    })
    this.doRefresh()
    this.$api.GET_USER_AREA().then(res => {
      if (res.data && res.data.length > 0) {
        this.options = res.data
      }
    })
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  mounted () {
    // this.$api.GET_USER_AREA().then(res => {
    //   this.options = res.data
    // })
  },

  methods: {
    adressChange (val) {
      // const panelRefs = this.$refs.adressRef.$refs.panel
      // panelRefs.lazyLoad(panelRefs.getCheckedNodes()[0])
      // this.info.provinceCode=val[0]?val[0]:''
      // this.info.cityCode=val[1]?val[1]:''
      // this.info.areaCode=val[2]?val[2]:''
      // this.info.streetCode=val[3]?val[3]:''
      let pathLabels = []
      if (this.$refs.adressRef.getCheckedNodes()[0]) {
        pathLabels = this.$refs.adressRef.getCheckedNodes()[0].pathLabels
      }
      // this.info.province=pathLabels[0]?pathLabels[0]:''
      // this.info.city=pathLabels[1]?pathLabels[1]:''
      // this.info.area=pathLabels[2]?pathLabels[2]:''
      // this.info.street=pathLabels[3]?pathLabels[3]:''
      this.formAddress.level = Number(this.$refs.adressRef.getCheckedNodes()[0].level) - 1
      this.formAddress.addressCode = this.$refs.adressRef.getCheckedNodes()[0].value
    },
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
    //         leaf: level >= 3,
    //         level: value.level
    //       }))
    //       resolve(province)
    //       console.log('province哈哈', province)
    //     })
    //   })
    // },
    resetClick () {
      this.formAddress.addressCode = ''
      this.formAddress.level = ''
    },
    selectArea (val) {
      this.$nextTick(() => {
        console.log('getCheckedNodes', this.$refs.cascader.getCheckedNodes()[0].data.level)
        this.formAddress.level = this.$refs.cascader.getCheckedNodes()[0].data.level
      })
      this.formAddress.addressCode = val
      const code = this.formAddress.addressCode[this.formAddress.addressCode.length - 1]
      this.formAddress.addressCode = code || '' // 地址传参
      // console.log('val',val)
      //    console.log('this.formAddress.addressCode',this.formAddress.addressCode)
      // this.options.map((value, index, array)=>{
      // console.log('我是遍历',value)
      // })
    },
    // 取消
    cancel () {
      this.getMemberInfo()
    },
    getMemberInfo () {
      this.$api.ORG_BASE_GET().then(res => {
        this.formAddress = res.data || {}
        // this.form.addressCode = this.form.addressCode.split(',').map(Number)
      })
    },
    // 导出
    exportBtn () {
      const searchData = this.getSearch().getForm()
      console.log('searchData1', searchData)
      this.$api.EXPORT_USER_STUDENT({
        cardName: searchData.cardName,
        mobileNo: searchData.mobileNo,
        nickName: searchData.nickName,
        certNo: searchData.certNo,
        addressCode: this.formAddress.addressCode,
        level: this.formAddress.level
      }).then(res => {
        if (res.data) {
          window.location = res.data
          this.$message({
            message: '正在导出，请耐心等待浏览器响应！',
            type: 'success'
          })
        } else {
          this.$message({
            message: '系统异常，请稍后再试',
            type: 'warning'
          })
        }
      })
    },
    /**
     * 第一次请求页面数据
     * initColumns初始化完成后调用
     * 可以用一个空方法覆盖它，阻止初始化后请求数据
     */
    doLoad () { },
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      query.addressCode = this.formAddress.addressCode ? this.formAddress.addressCode : '' // 地址传参
      query.level = this.formAddress.level
      // query.goodsType = this.goodsCategory
      // query.catId = this.catId
      return this.$api.Get_All_Account_List(query)
    },
    editUserInfo ({ row }) {
      this.info = JSON.parse(JSON.stringify(row))
      this.$set(this.info, 'address', [])
      if (row.provinceCode) {
        this.info.address.push(parseInt(row.provinceCode))
      }
      if (row.cityCode) {
        this.info.address.push(parseInt(row.cityCode))
      }
      if (row.areaCode) {
        this.info.address.push(parseInt(row.areaCode))
      }
      if (row.streetCode) {
        this.info.address.push(parseInt(row.streetCode))
      }
      this.$refs.editAccountRef.editDialog = true
      // if (this.info.provinceCode) {
      //   this.cityOptions = this.addressOptions.find(item => item.value === this.info.provinceCode)
      // }
      // if (this.info.cityCode) {
      //   this.areaOptions = this.cityOptions.children.find(item => item.value === this.info.cityCode)
      // }
      // if (this.info.major) {
      //   const majorObj = this.majorSelect.find(item => item.majorId === this.info.major)
      //   this.info.majorName = majorObj.majorName
      // }
      // console.log('我要编辑用户信息')
    },
    resetPassword () {
      console.log(this.userId)
      console.log(typeof (this.userId))
      this.$api.Reset_Account_Password({
        userId: this.userId
      }).then(res => {
        if (res.code === '1') {
          this.$message.success('重置成功！')
        }
      })
      this.dialogVisible = false
      this.doRefresh()
    },
    resetDialog ({ row }) {
      this.userId = row.userId
      this.nickName = row.nickName
      console.log('nickName', row.userId)
      console.log('nickName', row.nickName)
      this.dialogVisible = true
    },
    editAccount (obj) {
      const copyObj1 = JSON.parse(JSON.stringify(cloneDeep(obj)).replace(/nickName/g, 'nickname'))
      const copyObj2 = JSON.parse(JSON.stringify(cloneDeep(copyObj1)).replace(/headPortraitUrl/g, 'headPortraitUrl'))
      this.$api.Edit_Account_Info({
        ...copyObj2
      }).then(res => {
        if (res.code === '1') {
          this.doRefresh()
          this.$refs.editAccountRef.editDialog = false
          this.$message.success('修改成功')
        }
      })
    },
    /**
     * 下载模板
     */
    downloade () {
      const getTimestamp = new Date().getTime()
      const url = 'https://static.peixunyun.cn/导入用户模板.xlsx?timestamp=' + getTimestamp
      window.location = url
    },
    // 删除前的判断
    beforeRemove (file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 删除成功的 文件列表清0
    handleRemove () {
      this.form.file = ''
      // this.errMsg = []
    },

    // 上传前的判断
    beforeUpload (file) {
      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.warning('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      this.form.file = file
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange (file, fileList) {
      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        return false
      }
      this.form.file = file.raw
      this.fileList = fileList.slice(-1)
      // this.fileName = file
    },

    // 上传成功的钩子函数
    handleSuccess (res) {
      console.log('导入用户上传:', res)
      const { code, msg } = res
      if (code === '1') {
        this.form.file = ''
        this.importAccountDialog = false
        this.innerVisible = true
        this.doRefresh()
        this.$notify({
          title: '提示',
          message: '导入用户成功！',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: msg,
          type: 'warning'
        })
      }
    },
    // 限制上传文件个数
    handleExceed (files, fileList) {
      console.log(files, fileList)
      this.$message.warning('当前只允许上传1个文件')
    },
    // 点击上传回调
    importStudent () {
      if (this.form.file === '') {
        this.$message.warning('请选择上传文件')
      } else {
        this.$nextTick(() => {
          this.$refs.upload.submit()
        })
      }
    }
  }
}
</script>

<style lang="scss">
.import-account-dialog {
  .el-dialog__body {
    padding-top: 0;
  }
}
.address-box-select {
  input {
    width: 280px !important;
  }
}
</style>
