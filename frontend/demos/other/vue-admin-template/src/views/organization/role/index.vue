<!--
 * @Author: your name
 * @Date: 2021-04-08 14:59:52
 * @LastEditTime: 2021-06-03 14:28:38
 * @LastEditors: 姚文彬
 * @Description: In User Settings Edit
 * @FilePath: \d2-crud-plus-with-d2admin-starter\src\views\organization\role\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">角色管理</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper>
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @customBtn="authApi"
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
       <template slot="roleNameFormSlot" slot-scope="scope">

           <el-input
          v-model="scope.form.roleName"
          @input="roleNameInputValueChange(scope.form)"></el-input>

      </template>
      <template slot="roleCodeFormSlot" slot-scope="scope">
        <el-input
          v-model="scope.form.roleCode"
          @input="change($event)"
        ></el-input>
      </template>
    </d2-crud-x>

    <!-- 授权功能点 -->
    <Auth ref="Auth" />
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import Auth from './auth'
import pinyin from 'js-pinyin'
export default {
  components: { Auth },
  mixins: [d2CrudPlus.crud],
  methods: {
    roleNameInputValueChange (obj) {
      pinyin.setOptions({ checkPolyphone: false, charCase: 0 })
      const reg = RegExp('[\\u4E00-\\u9FFF]+', 'g')
      const arr = [...obj.roleName]
      const newArr = arr.filter((item) => {
        return reg.test(item) === true
      })
      if (newArr.length > 0) {
        const findIndex = arr.findIndex((item) => item === newArr[0])
        arr[findIndex] = pinyin.getFullChars(newArr[0]).toLowerCase()
        const newString = pinyin.getFullChars(arr.join(''))
        obj.roleCode = newString
      } else {
        obj.roleCode = obj.roleName
      }
    },
    change (e) {
      this.$forceUpdate()
    },
    // 授权功能点
    authApi ({ row }) {
      this.$refs.Auth.show(row)
    },

    handleCurrentChange (val) {
      this.currentRow = val
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return this.$api.ORG_ROLE_GET(query)
    },
    addRequest (row) {
      return this.$api.ORG_ROLE_ADD(row)
    },
    updateRequest (row) {
      return this.$api.ORG_ROLE_ADD({
        ...row,
        diyRoleId: row.roleId
      })
    },
    // TODO 应用角色不可删除，特殊
    delRequest (row) {
      if (row.appId) {
        this.$notify({
          message: '应用角色不可删'
        })
      } else {
        return this.$api.ORG_ROLE_DEL({ roleId: row.roleId })
      }
    }
  }
}
</script>
