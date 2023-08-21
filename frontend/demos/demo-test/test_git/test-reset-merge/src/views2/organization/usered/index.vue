<!--
 * @Author: your name
 * @Date: 2021-04-08 14:59:52
 * @LastEditTime: 2021-07-21 16:21:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \组织\src\views\organization\user\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">{{this.$route.meta.title}}</span>
      <!-- <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper> -->
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @customBtn="assigningRoles"
    >
      <div slot="header">
        <el-button
          size="small"
          type="primary"
          @click="addRow"
        >
          <i class="el-icon-plus" /> 新增
        </el-button>
        <crud-toolbar
          v-bind="_crudToolbarProps"
          v-on="_crudToolbarListeners"
        />
      </div>
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
    </d2-crud-x>

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
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
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
      memberId: '' // 当前成员ID
    }
  },
  methods: {
    // 成员分配角色弹窗
    assigningRoles ({ row }) {
      this.memberId = row.memberId
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
    assigning (row, index) {
      this.$api.ORG_USER_ROLE({
        memberId: this.memberId,
        roleId: row.roleId,
        sourceType: row.sourceType
      }).then(() => {
        // TODO 分页bug
        this.$api.ORG_USER_ROLE_ASSIGN({
          memberId: this.memberId,
          pageNum: 1,
          pageSize: 40
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

    handleCurrentChange (val) {
      this.currentRow = val
    },

    getCrudOptions () {
      return crudOptions(this)
    },

    pageRequest (query) {
      return this.$api.ORG_USER_GET(query)
    },

    // 接口校验平台/组织ID, 当后端返回异常code情况时，接口挂起
    addRequest (row) {
      return this.$api.ORG_USER_ADD(row)
    },

    /**
     * 编辑对话框取消,当接口异常时手动调用
     * @param done
     */
    doDialogCancel (done) {
      done() // 必须调用，否则无法关闭对话框
    },

    updateRequest (row) {
      return this.$api.ORG_USER_ADD(row)
    },

    delRequest (row) {
      return this.$api.ORG_USER_DEL({ memberId: row.memberId })
    }
  }
}
</script>
<style lang="scss">
.user-logo {
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
  object-fit: cover;
}
</style>
