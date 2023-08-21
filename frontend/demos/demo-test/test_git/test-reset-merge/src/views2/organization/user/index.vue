<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }" class="specific">
        <template slot='header'>
            <span class='page-title'>{{this.$route.meta.title}}</span>
            <d2-helper title='帮助文档'>
                <div>
                    <d2-link-btn
                    title='文档链接'
                    link='http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html'
                    />
                </div>
            </d2-helper>
        </template>
        <el-container style="height: 100%;">
            <el-aside width="250px" class="aside">
                <div style="display: flex;justify-content: space-between;">
                  <el-button type="primary" size="medium" @click="importMember">导入成员</el-button>
                  <el-button type="primary" size="medium" style="margin-left: 30px;" @click="uncheck" v-if="depId" plain>取消选中</el-button>
                </div>
                <el-input v-model="filterText"
                placeholder="输入部门名称过滤"
                class="fiter"
                suffix-icon="el-icon-search"
                size="small">
                </el-input>
                <el-tree
                :data="menu"
                :props="menuProps"
                node-key="id1"
                :filter-node-method="filterNode"
                ref="categorytree"
                style="padding: 0 12px;"
                @node-click="getMenu"
                :expand-on-click-node="false"
                :highlight-current="true"
                >
                    <span class="custom-tree-node" slot-scope="{data}">
                    <el-tooltip
                        :content="data.depFullName"
                        :disabled="isShowTooltip"
                        :open-delay="300"
                        placement="top"
                        effect="light"
                    >
                        <span @mouseover="mouseOver($event)" class="over-ellipsis">{{ data.depFullName }}</span>
                    </el-tooltip>
                    </span>

                </el-tree>
            </el-aside>
            <el-main class="main">
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
              <el-row style="height: calc(100% - 108px);">
                <el-col :span="24" style="height: 100%;">
                  <el-tabs v-model="activeName">
                      <el-tab-pane label="成员列表" name="1">
                        <div style="height:100%;">
                        <d2-crud-x
                         style="height: 100%;"
                          ref="d2Crud"
                          v-bind="_crudProps"
                          v-on="_crudListeners"
                          @customBtn="assigningRoles"
                          @removeBtn="removeBtn"
                        >
                          <div slot="header">
                            <crud-search
                              ref="search"
                              :options="crud.searchOptions"
                              @submit="handleSearch"
                            />
                            <el-button
                              size="small"
                              type="primary"
                              @click="increaseRow"
                            >
                              添加成员
                            </el-button>
                            <el-button
                              size="small"
                              type="primary"
                              @click="addRow"
                            >
                              创建成员
                            </el-button>
                            <crud-toolbar
                              v-bind="_crudToolbarProps"
                              v-on="_crudToolbarListeners"
                            />
                          </div>
                          <template slot="depIdFormSlot" slot-scope="scope">
                            <!-- <el-select v-model="scope.form.depId" disabled
                              :style="{width: '100%'}">
                              <el-option v-for="(item, index) in depIdOptions" :key="index" :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select> -->
                            <treeselect
                              v-model="scope.form.depId"
                              :options="options"
                              style="width: 420px"
                              placeholder="选择上级分类"
                              :clearable='false'
                              :noResultsText="'未搜索到匹配项...'"
                              :style="{width: '100%'}"
                            />
                          </template>
                          <template
                            slot="memberNameSlot"
                            slot-scope="scope"
                          >
                          <div style="display:flex;align-items: center;">
                            <span style="margin-right: 5px;">{{scope.row.memberName}}</span>
                            <div style="display:flex;flex-direction: column;">
                            <el-tag v-if="scope.row.depManager==1">部门管理员</el-tag>
                            <el-tag type="success" v-if="scope.row.orgManager==1" style="margin-top: 2px;">组织管理员</el-tag>
                            </div>
                          </div>
                          </template>
                          <template
                            slot="memberHeaderUrlSlot"
                            slot-scope="scope"
                          >
                            <el-image
                              class="user-logo"
                              :src="scope.row.memberHeaderUrl"
                            >
                              <img
                                slot="error"
                                class="user-logo"
                                src="@/assets/images/class_tch.png"
                              />
                            </el-image>
                          </template>
                          <template slot="memberHeaderUrlFormSlot" slot-scope="scope">
                            <div class="avatar-uploader" @click="upload" v-if="!scope.form.memberHeaderUrl">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </div>
                            <div v-else @click="upload" style="width:60px;">
                              <img :src="scope.form.memberHeaderUrl" style="width:60px;"/>
                            </div>
                          </template>
                          <template slot="depIdSlot" slot-scope="scope">
                            {{scope.row.depFullName}}
                          </template>
                        </d2-crud-x>
                        </div>
                      </el-tab-pane>
                  </el-tabs>
                </el-col>
              </el-row>
            </el-main>
        </el-container>
        <vxe-modal
          v-model="dialog"
          title="分配角色"
          width="800"
          height="600"
          resize
        >
          <vxe-grid
            ref="xGrid"
            v-bind="gridOptions"
            :data="data"
          >
            <template v-slot:operate="{ row, index }">
              <el-button
                type="text"
                @click="assigning(row, index)"
              >
                {{ row.isAuth | auth }}
              </el-button>
            </template>
          </vxe-grid>
        </vxe-modal>
        <increase-member
        :addDialogVisible.sync="addDialogVisible"
        @closeDialog="closeDialog"
        :depId="depId"
        v-if="addDialogVisible"
        ></increase-member>
        <import-dialog
        title="导入成员"
        :dialogVisible.sync="dialogVisible"
        :description="description"
        :Downtemplate="Downtemplate"
        @uplpadFile="uplpadFile"
        :importLoading.sync="importLoading"
        ></import-dialog>
        <el-dialog title="上传图片" :visible.sync="imgUploadDialog" width="800px" :close-on-click-modal=false>
            <resource-uploader-v2
            ref="pictureResourceUploader"
            resource-name="图片"
            upload-code="Upload-portal-cover"
            :show-upload-button="true"
            :show-select-dir="true"
            :select-dir-by-suffix="true"
            :show-label="true"
            file-type="img"
            @uploadComplete="uploadComplete"
            />
        </el-dialog>
    </d2-container>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import IncreaseMember from './components/increase-member.vue'
// doc: https://www.vue-treeselect.cn/
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    IncreaseMember,
    Treeselect
  },
  filters: {
    auth (val) {
      const status = {
        false: '分配',
        true: '取消分配'
      }
      return status[val]
    }
  },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      imgUploadDialog: false,
      dialog: false, // 分配角色
      gridOptions: {
        resizable: true,
        showOverflow: true,
        border: 'inner',
        height: 500,
        columns: [
          { type: 'seq', width: 60, title: '序号', fixed: 'left' },
          { field: 'appName', title: '应用名称', minWidth: 100 },
          { field: 'busiDomainName', title: '业务域名称', minWidth: 100 },
          { field: 'roleName', title: '角色名称', minWidth: 100 },
          {
            field: 'roleMemo',
            title: '角色说明',
            width: 150,
            showOverflow: true
          },
          { title: '操作', width: 140, slots: { default: 'operate' } }
        ]
      },
      data: [], // 角色列表
      memberId: '', // 当前成员ID
      orgMemberId: '', // 有部门的成员Id
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
      depId: '',
      currentDepDate: {},
      addDialogVisible: false, // 添加成员弹窗
      // depIdOptions:[
      //   {
      //     value:'',
      //     label:'无所属部门'
      //   }
      // ],
      dialogVisible: false,
      description: '',
      Downtemplate: 'https://static.peixunyun.cn/导入部门成员模板.xlsx',
      options: [],
      // disabledTree:false,
      importLoading: false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.categorytree.filter(val)
    }
  },
  created () {
    this.getDepTree()
  },
  methods: {
    resetRefresh () {
      this.getDepTree()
      this.uncheck()
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      if (this.depId) {
        query.depId = this.depId
        return this.$api.QUERY_PAGE_DEPMEMBER(query)
      } else {
        return this.$api.QUERY_NO_DEP_MEMBERS(query)
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.depFullName.indexOf(value) !== -1
    },
    // 超出显示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
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
        this.options.unshift({ id: '', label: '无' })
      }).catch(() => {
        this.options = [
          { id: '', label: '无' }
        ]
      })
    },
    // 选中目录树
    getMenu (val) {
      this.depId = val.depId
      this.doRefresh()
      this.getDepInfoByDepId()
      // this.depIdOptions.push({value:val.depId,label:val.depFullName})
    },
    // 获取右边部门
    getDepInfoByDepId () {
      this.$api.GET_DEP_INFO_BY_DEPID({
        depId: this.depId
      }).then(res => {
        this.currentDepDate = res.data
        this.currentDepDate.address = ''
        res.data.depManagerAreaNameList.forEach(item => {
          this.currentDepDate.address = this.currentDepDate.address + item + ';'
        })
        this.tableData = res.data.subDepInfoList
      })
    },
    updateRequest (row) {
      return this.$api.UPDATE_DEP_MEMBER(row)
    },
    // 成员分配角色弹窗
    assigningRoles ({ row }) {
      if (this.depId) {
        this.memberId = row.orgMemberId
      } else {
        this.memberId = row.memberId
      }
      // TODO 分页bug
      this.$api.ORG_USER_ROLE_ASSIGN({
        memberId: this.memberId,
        pageNum: 1,
        pageSize: 40
      }).then(({ data }) => {
        this.data = data.list
      })
      this.dialog = true
    },
    // 分配角色
    assigning (row) {
      this.$api.ORG_USER_ROLE({
        memberId: this.memberId,
        roleId: row.roleId,
        sourceType: row.sourceType
      }).then(() => {
        // TODO 一次性全部加载，待添加分页
        this.$api.ORG_USER_ROLE_ASSIGN({
          memberId: this.memberId,
          pageNum: 1,
          pageSize: 100
        }).then(({ data }) => {
          this.data = data.list
        })
        // 重载数据
        this.$notify({
          title: '提示',
          message: '分配角色成功',
          type: 'success'
        })
      })
    },
    // 添加成员
    increaseRow () {
      this.addDialogVisible = true
    },
    closeDialog () {
      this.doRefresh()
    },
    importMember () {
      this.dialogVisible = true
      this.description =
      '<p>1、新导入的部门成员，如未注册，则会默认以手机号创建一个账号，密码为123456。</p><p>2、手机号为唯一字段，不可重复导入。</p><p>3、如果数据错误，系统会提醒并且不导入任何数据，请核实数据准确性后再重新导入。</p>'
      // this.description=[]
      // this.description.push('1、新导入的部门成员，如未注册，则会默认以手机号创建一个账号，密码为123456。','2、手机号为唯一字段，不可重复导入。','3、如果数据错误，系统会提醒并且不导入任何数据，请核实数据准确性后再重新导入。')
    },
    removeBtn ({ row }) {
      this.$confirm('是否移除此成员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.DELETE_DEPMENT({
          memberId: row.memberId
        }).then(() => {
          this.$message({
            type: 'success',
            message: '移除成功!'
          })
          this.doRefresh()
        })
      }).catch(() => {
      })
    },
    delRequest (row) {
      return this.$api.ORG_USER_DEL({ memberId: row.memberId })
    },
    addRequest (row) {
      return this.$api.CREAT_DEP_MEMBER(row)
    },
    uncheck () {
      this.$refs.categorytree.setCurrentKey(null)
      this.depId = ''
      this.currentDepDate = {}
      this.doRefresh()
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
      this.getD2Crud().formData.memberHeaderUrl = params.url
    },
    doDialogOpened (val) {
      // if(val.mode=='add'){
      //   this.disabledTree=true
      // }else{
      //   this.disabledTree=false
      // }
      if (val.mode == 'add') {
        if (this.depId) {
          this.getD2Crud().formData.depId = this.depId
        } else {
          this.getD2Crud().formData.depId = ''
        }
      }
    },
    uplpadFile (file) {
      if (file) {
        this.importLoading = true
        this.$api.IMPORT_ORG_MEMBER({
          file: file
        }).then(() => {
          this.dialogVisible = false
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.importLoading = false
          this.resetRefresh()
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
.specific .d2-container-full__body{
  padding: 0 !important;
}
</style>
<style scoped lang="scss">
.main{
  width: 90%;
  border: 1px solid #CFD7E5;
  margin: 10px;
  padding: 10px;
  background: white;
  }
.aside{
  border: 1px solid #CFD7E5;
  margin:10px 0 10px 10px;
  background: white;
  overflow-x:hidden;
  padding: 10px;
}
.fiter{
  /* width: 90%; */
  margin: 10px 0;
}
.over-ellipsis{
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.user-logo {
  width: 60px;
  height: 60px;
  border-radius: 50% !important;
  object-fit: cover;
}
.avatar-uploader{
    width: 100px;
    height: 100px;
    margin-bottom: 38px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.eslip {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
