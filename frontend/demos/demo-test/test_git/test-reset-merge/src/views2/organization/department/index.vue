<template>
  <!-- 组织管理--部门列表-->
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
        <div style="display: flex;justify-content: space-between;">
          <el-button type="primary"
                     size="medium"
                     @click="addDepartment">新增部门</el-button>
          <el-button type="primary"
                     size="medium"
                     style="margin-left: 30px;"
                     @click="importDepartment">导入部门</el-button>
        </div>
        <div v-if="depId">
          <el-button type="primary"
                     size="medium"
                     @click="uncheck"
                     style="margin-top: 5px;"
                     plain>取消选中</el-button>
        </div>
        <el-input v-model="filterText"
                  placeholder="输入部门名称过滤"
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
            <span>
              <el-tooltip :content="data.depFullName"
                          :disabled="isShowTooltip"
                          :open-delay="300"
                          placement="top"
                          effect="light">
                <span @mouseover="mouseOver($event)"
                      class="over-ellipsis">{{ data.depFullName }}</span>
              </el-tooltip>
            </span>
            <span>
              <el-button type="text"
                         @click="editBtn(data)">编辑</el-button>
              <el-button type="text"
                         style="margin-left: 1px;"
                         @click="deleteDepById(data)">删除</el-button>
            </span>
          </span>

        </el-tree>
      </el-aside>
      <el-main class="main"
               v-loading="maskLoading">
        <el-row>
          <el-col :span="24">
            <div class="DescriptionList">
              <table style="table-layout: fixed;">
                <tbody>
                  <tr>
                    <th>部门全称</th>
                    <td style="width: 18%;">
                      <span v-if="currentDepDate.depFullName">{{currentDepDate.depFullName}}</span>
                      <span v-else>暂无数据</span>
                    </td>
                    <th>部门简称</th>
                    <td style="width: 18%;">
                      <span v-if="currentDepDate.depShortName">{{currentDepDate.depShortName}}</span>
                      <span v-else>暂无数据</span>
                    </td>
                    <th>部门编码</th>
                    <td>
                      <span v-if="currentDepDate.depCode">{{currentDepDate.depCode}}</span>
                      <span v-else>暂无数据</span>
                    </td>
                  </tr>
                  <tr>
                    <th>上级部门</th>
                    <td>
                      <span v-if="currentDepDate.parentDepId==-1">无上级部门</span>
                      <span v-else-if="currentDepDate.parentDepId">{{currentDepDate.parentDepName}}</span>
                      <span v-else>暂无数据</span>
                    </td>
                    <th>部门负责人</th>
                    <td>
                      <span v-if="currentDepDate.managerName">{{currentDepDate.managerName}}</span>
                      <span v-else>暂无数据</span>
                    </td>
                    <th>管理地区</th>
                    <td class="eslip">
                        <el-tooltip :content="currentDepDate.address" placement="bottom" effect="light" v-if="currentDepDate.address">
                            <span>{{currentDepDate.address}}</span>
                        </el-tooltip>
                        <span v-else>暂无数据</span>
                    </td>
                  </tr>
                  <tr>
                    <th>部门备注</th>
                    <td colspan="5" class="eslip">
                        <el-tooltip :content="currentDepDate.memo" placement="bottom" effect="light" v-if="currentDepDate.memo">
                            <span>{{currentDepDate.memo}}</span>
                        </el-tooltip>
                        <span v-else>暂无数据</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName">
              <el-tab-pane label="子部门列表"
                           name="1">
                <el-table :data="tableData"
                          style="width: 100%;"
                          max-height="500"
                          border>
                  <el-table-column prop="depFullName"
                                   label="全称">
                  </el-table-column>
                  <el-table-column prop="depShortName"
                                   label="简称">
                  </el-table-column>
                  <el-table-column prop="depCode"
                                   label="编码">
                  </el-table-column>
                  <el-table-column prop="address"
                                   label="管理地区">
                  </el-table-column>
                  <el-table-column prop="managerName"
                                   label="负责人">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
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
               label-width="130px">
        <el-form-item label="部门全称"
                      prop="depFullName">
          <el-input v-model="formData.depFullName"
                    placeholder="请输入部门全称"
                    :maxlength="25"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="部门简称"
                      prop="depShortName">
          <el-input v-model="formData.depShortName"
                    placeholder="请输入部门简称"
                    :maxlength="25"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="排序值"
                      prop="depSort">
          <el-input-number v-model="formData.depSort"
                           placeholder="排序值越大越靠前"
                           :controls="false"
                           :precision="0"
                           :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="部门编码"
                      prop="depCode">
          <el-input v-model="formData.depCode"
                    placeholder="请输入部门编码"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="上级部门"
                      prop="parentDepId">
          <!-- <el-select v-model="formData.parentDepId" placeholder="请选择上级部门" :disabled='true'
                :style="{width: '100%'}">
                <el-option v-for="(item, index) in parentDepIdOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select> -->
          <treeselect v-model="formData.parentDepId"
                      :options="options"
                      placeholder="请选择上级部门"
                      :clearable='false'
                      :noResultsText="'未搜索到匹配项...'"
                      :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="选择部门负责人"
                      prop="managerValue">
          <el-autocomplete v-model="formData.managerValue"
                           :fetch-suggestions="querySearchAsync"
                           placeholder="请输入部门负责人"
                           @select="handleSelect"
                           :style="{width: '100%'}"></el-autocomplete>
        </el-form-item>
        <el-form-item label="管理地区"
                      prop="manageArea">
          <el-row>
            <el-col :span="24">
              <!-- <el-cascader v-model="formData.manageArea" :props="manageAreaProps" ref="manageArea" filterable
                  :style="{width: '100%'}" placeholder="请选择管理地区" clearable @change="change"></el-cascader> -->
              <el-cascader v-model="formData.manageArea"
                           :props="manageAreaProps"
                           :options="OptionS"
                           ref="manageArea"
                           :style="{width: '100%'}"
                           placeholder="请选择管理地区"
                           @change="choseChange"></el-cascader>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="部门备注"
                      prop="memo">
          <el-input v-model="formData.memo"
                    type="textarea"
                    placeholder="请输入部门备注"
                    show-word-limit
                    :autosize="{minRows: 4, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="departmentVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleConfirm">确定</el-button>
      </span>
    </el-dialog>
    <import-dialog title="导入部门"
                   :dialogVisible.sync="dialogVisible"
                   :description="description"
                   :Downtemplate="Downtemplate"
                   @uplpadFile="uplpadFile"
                   :importLoading.sync="importLoading"></import-dialog>
  </d2-container>
</template>
<script>
// doc: https://www.vue-treeselect.cn/
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { findItemIndexInArrayByProperty } from '@/utils/array-utils'
// import { lazyElCascaderEcho } from '@/utils/array-utils'
// import LazyCascader from '@/components/cascader/LazyCascader.vue'
export default {
  components: {
    Treeselect
    // LazyCascader
  },
  data () {
    return {
      maskLoading: false,
      filterText: '',
      menu: [],
      menuProps: {
        label: 'depFullName',
        value: 'depId',
        children: 'subDepList'
      },
      isShowTooltip: false,
      activeName: '1',
      tableData: [],
      departmentVisible: false,
      formData: {
        depFullName: '',
        depShortName: '',
        depSort: 0,
        depCode: '',
        parentDepId: '-1',
        managerValue: '',
        manageArea: [],
        memo: '',
        managerName: '',
        managerMobile: '',
        depManagerAreaList: [],
        memberSex: ''
      },
      defaultFormData: {},
      rules: {
        depFullName: [{
          required: true,
          message: '请输入部门全称',
          trigger: 'blur'
        }],
        depShortName: [{
          required: true,
          message: '请输入部门简称',
          trigger: 'blur'
        }],
        depSort: [{
          required: true,
          message: '请输入排序值',
          trigger: 'blur'
        }],
        depCode: [{
          required: true,
          message: '请输入部门编码',
          trigger: 'blur'
        },
        {
          pattern: /^[A-Za-z\0-9]+$/,
          message: '不能包含中文和特殊字符',
          trigger: 'blur'
        }
        ],
        parentDepId: [{
          required: true,
          message: '请选择上级部门',
          trigger: 'change'
        }]
      },
      // parentDepIdOptions: [{
      //   label: "无上级部门",
      //   value: '-1'
      // }],
      manageAreaProps: {
        // expandTrigger: 'hover',
        multiple: true,
        checkStrictly: true,
        value: 'areaCode',
        label: 'name'
        // leaf: "leaf",
        // lazyLoad: this.lazyLoad,
        // lazySearch: this.lazySearch
      },
      optionsList: [],
      orgMemberData: [],
      dialogVisible: false,
      description: '',
      Downtemplate: 'https://static.peixunyun.cn/导入部门模板.xlsx',
      depId: '',
      currentDepDate: {},
      departMentTitle: '',
      importLoading: false,
      options: [],
      defaultOptions: [],
      OptionS: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.categorytree.filter(val)
    },
    'formData.depFullName': {
      handler (newval) {
        this.formData.depShortName = newval
      }
    }
  },
  created () {
    this.defaultFormData = JSON.parse(JSON.stringify(this.formData))
    this.getDepTree()
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  methods: {
    choseChange () {
      // const panelRefs = this.$refs.manageArea.$refs.panel
      // panelRefs.lazyLoad(panelRefs.checkedValue[panelRefs.checkedValue.length-1])
    },
    // lazyLoad (nodeValue, resolve) {
    // if(node.children && node.children.length>0){
    //   node.children=[]
    // }
    // setTimeout(() => {
    // const level = nodeValue;
    // if(level==0){
    //   node.value=0
    // }

    // })
    // },
    // lazySearch(queryString, callback) {
    //   console.log("TCL: lazySearch -> this.optionsList", this.optionsList)
    //   setTimeout(() => {
    //     callback(this.optionsList);
    //   }, 200);
    // },
    doRefresh () {
      this.getDepTree()
      this.uncheck()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.depFullName.indexOf(value) !== -1
    },
    // 获取左边目录树
    getDepTree () {
      this.$api.QUERY_DEP_TREE().then(res => {
        this.menu = res.data
        // 遍历并写入treeselect
        const getTree = (tree = []) => {
          const arr = []
          if (!!tree && tree.length && tree.length !== 0) {
            tree.forEach(item => {
              const obj = {}
              obj.id = item.depId
              obj.label = item.depFullName
              if (item.subDepList && item.subDepList.length > 0) {
                obj.children = getTree(item.subDepList)
              }
              arr.push(obj)
            })
          }
          return arr
        }
        if (JSON.stringify(res.data) != '{}') {
          this.options = getTree(res.data)
        }
        this.options.unshift({ id: '-1', label: '无' })
        this.defaultOptions = JSON.parse(JSON.stringify(this.options))
      }).catch(() => {
        this.options.unshift({ id: '-1', label: '无' })
      })
    },
    // 目录超出显示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    },
    // 表格超出显示
    mouseOverTab (event, item) {
      // this.isShowTooltipTab = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    },
    addDepartment () {
      this.departMentTitle = '新增部门'
      if (this.depId) {
        this.formData.parentDepId = this.depId
      } else {
        this.formData.parentDepId = '-1'
      }
      this.departmentVisible = true
      this.queryOrgMember()
    },
    querySearchAsync (queryString, cb) {
      var orgMemberData = this.orgMemberData
      var results = queryString ? orgMemberData.filter(this.createStateFilter(queryString)) : orgMemberData
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 300)
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.indexOf(queryString) != -1)
      }
    },
    // 查询全量组织成员
    queryOrgMember () {
      this.orgMemberData = []
      this.$api.QUERY_ORG_MEMBER().then(res => {
        res.data.forEach(item => {
          this.orgMemberData.push({ value: item.memberMobile + '/' + item.memberName, memberMobile: item.memberMobile, memberName: item.memberName, managerUserId: item.userId })
        })
      })
    },
    handleSelect (item) {
      this.formData.managerName = item.memberName
      this.formData.managerMobile = item.memberMobile
      this.formData.managerUserId = item.managerUserId
    },
    handleConfirm () {
      if (!this.formData.managerValue) {
        this.formData.managerName = ''
        this.formData.managerMobile = ''
        this.formData.managerUserId = ''
      }
      this.$refs.departmentForm.validate((valid) => {
        if (valid) {
          this.change()
          if (this.formData.depId) { // 编辑
            this.$api.EDIT_DEPARTMENT_INFO({
              ...this.formData
            }).then(() => {
              this.$message({
                message: '部门编辑成功',
                type: 'success'
              })
              this.departmentVisible = false
              this.doRefresh()
            })
          } else { // 新增
            this.$api.DEPARTMENT_ADD({
              ...this.formData
            }).then(() => {
              this.$message({
                message: '部门创建成功',
                type: 'success'
              })
              this.departmentVisible = false
              this.doRefresh()
            })
          }
        } else {
          console.log('校验失败')
        }
      })
    },
    change () {
      this.formData.depManagerAreaList = []
      var data = this.$refs.manageArea.presentTags
      data.forEach(res => {
        this.formData.depManagerAreaList.push({
          addressCode: res.node.path[res.length - 1], codeList: res.node.path, nameList: res.node.pathLabels
        })
      })
    },
    close () {
      this.options = JSON.parse(JSON.stringify(this.defaultOptions))
      this.formData = JSON.parse(JSON.stringify(this.defaultFormData))
    },
    importDepartment () {
      this.dialogVisible = true
      this.description = '<p>1、标*为必填字符。</p><p>2、部门编码为部门校验字段，请不要输入除数字或者大小写以为的其它字符，请不要输入重复的编码。</p><p>3、管理地区请按行政编码导入<a style="color: #409EFF;cursor: pointer;" onclick="downCode()">（全国行政编码）</a>，多个管理地区请用”，“隔开。例如：00001，00002。</p><p>4、部门负责人请输入手机号（选填），如果该手机号未注册，则会默认以手机号创建一个成员账号，密码123456。</p><p>5、如果数据错误，系统会提醒并且不导入任何数据，请核实数据准确性后再重新导入。</p>'
      // this.description=[]
      // this.description.push('1、标*为必填字符。','2、部门编码为部门校验字段，请不要输入除数字或者大小写以为的其它字符，请不要输入重复的编码。','3、管理地区请按行政编码导入<el-link type="primary">（全国行政编码）</el-link>，多个管理地区请用”，“隔开。例如：00001，00002。','4、部门负责人请输入手机号（选填），如果该手机号未注册，则会默认以手机号创建一个成员账号，密码123456。','5、如果数据错误，系统会提醒并且不导入任何数据，请核实数据准确性后再重新导入。')
    },
    // 获取右边部门
    getDepInfoByDepId () {
      this.maskLoading = true
      this.$api.GET_DEP_INFO_BY_DEPID({
        depId: this.depId
      }).then(res => {
        this.currentDepDate = res.data
        this.currentDepDate.address = ''
        res.data.depManagerAreaNameList.forEach(item => {
          this.currentDepDate.address = this.currentDepDate.address + item + ';'
        })
        this.tableData = res.data.subDepInfoList
        this.tableData.forEach(res => {
          res.address = ''
          res.depManagerAreaNameList.forEach(item => {
            res.address = res.address + item + ';'
          })
        })
        this.maskLoading = false
      }).catch(() => {
        this.maskLoading = false
      })
    },
    // 选中目录树
    getMenu (val) {
      this.depId = val.depId
      this.getDepInfoByDepId()
      // this.parentDepIdOptions.push({value:val.depId,label:val.depFullName})
    },
    deleteDepById (val) {
      this.$confirm('是否删除此部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.DELETE_DEP_BY_ID({
          depId: val.depId
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
      this.depId = ''
      this.currentDepDate = {}
      this.tableData = []
    },
    editBtn (val) {
      this.$api.GET_DEP_INFO_BY_DEPID({
        depId: val.depId
      }).then(res => {
        this.departMentTitle = '编辑部门'
        this.formData = res.data
        let index = -1
        if (res.data.parentDepId == '-1') {
          console.log('tree第一级中包含此id,但父级为“无”')
        } else {
          index = findItemIndexInArrayByProperty(this.menu, res.data.depId, 'depId')
        }
        if (index != -1) {
          const children = this.options.splice(index + 1, 1)
          this.options.splice(index + 1, 0, { id: res.data.parentDepId, label: res.data.parentDepName, children: children })
        }
        if (res.data.managerMobile && res.data.managerName) {
          this.$set(this.formData, 'managerValue', res.data.managerMobile + '/' + res.data.managerName)
        }
        if (!res.data.managerMobile && res.data.managerName) {
          this.$set(this.formData, 'managerValue', res.data.managerName)
        }
        if (res.data.managerMobile && !res.data.managerName) {
          this.$set(this.formData, 'managerValue', res.data.managerMobile)
        }
        this.departmentVisible = true
        this.$set(this.formData, 'manageArea', [])
        res.data.depManagerAreaCodeList.forEach(item => {
          console.log(item.codeList)
          debugger
          this.formData.manageArea.push(item.codeList)
        })
        // this.$nextTick(function(){
        //   // this.formData.manageArea=[]
        //   this.$set(this.formData,'manageArea',[])
        //   res.data.depManagerAreaCodeList.forEach(item=>{
        //     this.formData.manageArea.push(item.codeList)
        //   })
        //   const panelRefs = this.$refs.manageArea.$refs.panel
        //   this.formData.manageArea.forEach(list=>{
        //     for(let i=0;i<list.length-1;i++){
        //       panelRefs.lazyLoad({value:list[i],level:i+1,children:[]})
        //     }
        //   })
        // })
        // this.cascaderEdit(this.formData.manageArea)
        // const noRepeatList=lazyElCascaderEcho(this.formData.manageArea)
        // this.$api.getArea({parentCode:0}).then(res=>{
        //   this.optionsList.push(res.data.map((value,i)=>({
        //     value:value.areaCode,
        //     label:value.name,
        //     leaf: false
        //   })))
        // })

        // noRepeatList.forEach(res=>{
        //   this.$api.getArea({parentCode:res}).then(val=>{
        //   this.optionsList.push(val.data.map((value,i)=>({
        //     value:value.areaCode,
        //     label:value.name,

        //   })))
        // })
        // })
        this.formData.depManagerAreaList = res.data.depManagerAreaCodeList
        this.queryOrgMember()
      })
    },
    // cascaderEdit(val){
    //   val.forEach(item=>{})
    // },
    // 最后一级面板禁止选中
    noElection (data) { // 接收的参数为Cascader Events —— expand-change —— 当展开节点发生变化时触发—— 各父级选项值组成的数组
      setTimeout(() => { // 延时器是为了拿到最新值
        // 获取已展开面板的所有DOM节点
        var hideNode = document.querySelectorAll('.el-cascader-menu__list .el-cascader-node')
        // 获取同时包含三个类名的节点
        var val = Array.from(hideNode).findIndex(item => {
          var str = item.classList.toString()
          return str.indexOf('in-active-path') != -1 && str.indexOf('in-checked-path') != -1 && str.indexOf('is-active') != -1
        })
        // 获取展开的面板
        var menu = document.querySelectorAll('.el-cascader-menu')
        // 用来存储对应的节点数据
        let label, span, input
        // 若存在
        if (val >= 0) {
          // 为对应的节点添加相应的类名及属性
          Array.from(data).forEach(item => {
            for (let i = 0; i < menu.length - item.length; i++) {
              label = menu[i + item.length].querySelectorAll('li label')
              span = menu[i + item.length].querySelectorAll('li label .el-checkbox__input')
              input = menu[i + item.length].querySelectorAll('li label .el-checkbox__input input')
              label.forEach((val) => {
                val.classList.add('is-disabled')
              })
              span.forEach((val) => {
                val.classList.add('is-disabled')
              })
              input.forEach((val) => {
                val.setAttribute('disabled', 'disabled')
              })
            }
          })
        } else {
          // 不存在，取消对应的类名及属性
          Array.from(data).forEach(item => {
            for (let i = 0; i < menu.length - item.length; i++) {
              label = menu[item.length].querySelectorAll('li label')
              span = menu[item.length].querySelectorAll('li label .el-checkbox__input')
              input = menu[item.length].querySelectorAll('li label .el-checkbox__input input')
              label.forEach((val) => {
                val.classList.remove('is-disabled')
              })
              span.forEach((val) => {
                val.classList.remove('is-disabled')
              })
              input.forEach((val) => {
                val.removeAttribute('disabled', 'disabled')
              })
            }
          })
        }
        // 为空时，取消对应的类名及属性
        if (data.length == 0 && val == -1) {
          for (let i = 0; i < menu.length; i++) {
            label = menu[i].querySelectorAll('li label')
            span = menu[i].querySelectorAll('li label .el-checkbox__input')
            input = menu[i].querySelectorAll('li label .el-checkbox__input input')
            label.forEach((val) => {
              val.classList.remove('is-disabled')
            })
            span.forEach((val) => {
              val.classList.remove('is-disabled')
            })
            input.forEach((val) => {
              val.removeAttribute('disabled', 'disabled')
            })
          }
        }
      }, 100)
    },
    // expandChange(val){
    //   this.noElection([val])
    // },
    uplpadFile (file) {
      if (file) {
        this.importLoading = true
        this.$api.IMPORT_DEP({
          file: file
        }).then(() => {
          this.dialogVisible = false
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.importLoading = false
          this.doRefresh()
        }).catch(() => {
          this.importLoading = false
        })
      } else {
        this.$message({
          message: '请正确上传文档！',
          type: 'warning'
        })
      }
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
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.eslip {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
