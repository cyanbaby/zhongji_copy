<!--
 * @Author: 姚文彬
 * @Date: 2021-04-25 21:05:14
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-06-03 20:45:03
 * @FilePath: \p-front-admin\src\views\organization\role\auth.vue
-->
<template>
  <el-drawer
    :with-header="false"
    :visible.sync="dialog"
    direction="rtl"
    size="50%"
  >
    <el-card shadow="never">
      <div slot="header" class="drawer-title">
        <span class="page-title">{{ menuTitle }}</span>
        <el-button
          :loading="menuLoading"
          icon="el-icon-check"
          style="padding: 6px 9px"
          type="primary"
          @click="saveMenu"
        >
          保存
        </el-button>
      </div>
      <el-scrollbar style="height: 600px">
        <ul>
          <li
            v-for="(item, index) in apis"
            :key="index"
            style="margin-bottom:15px"
          >
            <p class="app-name">应用名称：{{ item.appName }}</p>
            <el-tree
              ref="tree"
              :data="item.functionInfoList"
              show-checkbox
              node-key="functionId"
              default-expand-all
              :default-checked-keys="checked"
              :props="defaultProps"
              :check-strictly="true"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <template>
                  <span v-if="!data.functionType">
                    <i class="el-icon-folder-opened" style="color:yellow" />
                    {{ node.label }}
                  </span>
                  <span v-else>
                    <d2-icon v-if="data.iconUrl" :name="data.iconUrl" />
                    {{ data.functionName }}
                  </span>
                </template>
              </span>
            </el-tree>
          </li>
        </ul>
      </el-scrollbar>
    </el-card>
  </el-drawer>
</template>
<script>
import { removeEmpty } from '@/utils'
export default {
  data () {
    return {
      form: {
        roleId: '',
        functionIdList: []
      },
      dialog: false,
      menuTitle: '给【XX角色】授权新功能',
      menuLoading: false,
      apis: [], // api列表
      apisId: [], // 已选择的api
      defaultProps: {
        children: 'children',
        label: 'functionName',
        value: 'functionId'
      },
      checked: [] // 已勾选节点
    }
  },

  methods: {
    show (row) {
      this.form.roleId = row.roleId

      // 回显数据
      this.checked = row.interfaceIdList
      this.dialog = true
      this.menuTitle = `给【${row.roleName}角色】授权新功能`
      this.getMenuDatas(row)
    },

    // 设置已勾选，通过row获取
    setCheckedKeys (ids) {
      this.$refs.asyncTree.setCheckedKeys(ids)
    },

    async getMenuDatas (row = {}) {
      const { roleId } = row

      const { data } = await this.$api.ORG_ROLE_FUNC_TREE({
        roleId
      })
      this.apis = data.trees
    },

    // 授权api
    async saveMenu () {
      let ids = []
      this.apis.forEach((item, index) => {
        ids = [...ids, ...this.$refs.tree[index].getCheckedKeys()]
      })

      this.menuLoading = true
      // 前端对roleId去空、null、undefined，不然后端会报错
      try {
        await this.$api.ORG_ROLE_FUNC_AUTH({
          roleId: this.form.roleId,
          funtionIdList: removeEmpty(ids)
        })
        this.menuLoading = false

        this.$notify({
          title: '提示',
          message: '分配功能成功!',
          type: 'success'
        })
        this.dialog = false
      } catch (error) {
        this.menuLoading = false
      }
    }
  }
}
</script>
<style lang="scss">
.app-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
}
</style>
