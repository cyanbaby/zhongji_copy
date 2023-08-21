<!--
 * @Author: 姚文彬
 * @Date: 2021-06-18 11:49:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-29 11:08:19
 * @FilePath: \o-front-admin\src\views\base\components\TreeContent.vue
-->
<template>
  <el-row>
    <el-col :span="6" :offset="0">
      <div class="menu-content">
        <div class="menu-top">
          <h3>{{ title }}目录</h3>
          <el-popover
            placement="right"
            v-model="addShow"
            width="400"
            trigger="click"
          >
            <h3 style="text-align:center">添加目录</h3>
            <el-form
              :model="menuForm"
              ref="form"
              :rules="rules"
              label-width="90px"
            >
              <el-form-item label="目录名称" prop="dirName">
                <el-input placeholder="" v-model="menuForm.dirName">
                  <em slot="suffix">{{ menuForm.dirName.length }} / 20</em>
                </el-input>
              </el-form-item>
              <el-form-item label="上级目录" prop="dirParentId">
                <el-cascader
                  v-model="menuForm.dirParentId"
                  :options="list"
                  style="width:100%"
                  :props="{
                    label: 'dirName',
                    value: 'dirId',
                    children: 'subDirList',
                    checkStrictly: true
                  }"
                ></el-cascader>
              </el-form-item>
            </el-form>
            <div style="text-align:center">
              <el-button size="small" @click="addShow = false">取消</el-button>
              <el-button size="small" type="primary" @click="creatMenu"
                >确定</el-button
              >
            </div>
            <el-button
              slot="reference"
              style="font-size:26px"
              icon="el-icon-circle-plus"
              type="text"
            ></el-button>
          </el-popover>
        </div>
        <el-tree
          :data="list"
          node-key="dirId"
          default-expand-all
          :props="props"
          :expand-on-click-node="false"
          @node-click="clickNode"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="node.level > 1">
              <el-button
                icon="el-icon-edit"
                type="text"
                size="mini"
                @click.stop="() => append(data)"
              >
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click.stop="() => remove(node, data)"
              >
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="18" :offset="0">
      <slot></slot>
    </el-col>

    <el-dialog title="编辑目录" :visible.sync="editShow" width="480px" :close-on-click-modal=false>
      <el-form
        :model="menuForm"
        ref="menuForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="目录名称" prop="dirName">
          <el-input placeholder="" v-model="menuForm.dirName">
            <em slot="suffix">{{ menuForm.dirName.length }} / 20</em>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="上级目录" prop="dirParentId">
          <el-cascader
            v-model="menuForm.dirParentId"
            :options="list"
            style="width:100%"
            :props="{
              label: 'dirName',
              value: 'dirId',
              children: 'subDirList',
              checkStrictly: true
            }"
          ></el-cascader>
        </el-form-item> -->
      </el-form>
      <span slot="footer">
        <el-button @click="editShow = false">取消</el-button>
        <el-button type="primary" @click="updateMenu">确定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import { isArray } from 'lodash'
export default {
  props: {
    title: {
      type: String,
      default: '图片'
    },
    dictTypeCode: {
      type: String,
      default: ''
    },
    fileType: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      rules: {
        dirName: [
          { required: true, message: '请输入目录名称', trigger: 'blur' }
        ],
        dirParentId: [
          { required: true, message: '请选择所属目录', trigger: 'blur' }
        ]
      },
      props: {
        label: 'dirName',
        value: 'dirId ',
        children: 'subDirList'
      },
      addShow: false,
      menuForm: {
        dirName: '',
        dirParentId: 0
      },
      editShow: false
    }
  },
  watch: {
    // 监听编辑目录弹窗
    dialog (val) {
      if (!val) {
        this.menuForm = {
          dirName: '',
          dirParentId: ''
        }
      }
    },
    // 监听新增目录弹窗
    addShow (val) {
      if (!val) {
        this.menuForm = {
          dirName: '',
          dirParentId: ''
        }
      }
    }
  },
  methods: {
    // 点击目录查询文件
    clickNode (data) {
      this.$emit('refresh', data.dirId, data.dirParentId)
    },

    // 新增目录
    creatMenu () {
      this.$api
        .ADD_Source_MENU({
          ...this.menuForm,
          dirParentId: this.menuForm.dirParentId ? this.menuForm.dirParentId[this.menuForm.dirParentId.length - 1] : null, // 后端只需要最后一级的id
          dictTypeCode: this.dictTypeCode,
          fileType: this.fileType
        })
        .then(() => {
          this.$notify({
            title: '提示',
            message: '新增目录成功!',
            type: 'success'
          })
          this.addShow = false
          // 更新
          this.$emit('refreshTree', true)
        })
    },

    // 更新目录
    updateMenu () {
      // 后端只存了一个id，所以这里存在两种情形，只修改了名称，此时id是string，修改了目录，此刻id是数组
      console.log('更新目录', this.menuForm)
      const _this = this
      let id = ''
      if (isArray(this.menuForm.dirParentId)) {
        id = this.menuForm.dirParentId[this.menuForm.dirParentId.length - 1]
      } else {
        id = this.menuForm.dirParentId
      }
      this.$api
        .UPDATE_Source_MENU({
          ...this.menuForm,
          dirParentId: id, // 后端只需要最后一级的id
          dictTypeCode: this.dictTypeCode,
          fileType: this.fileType
        })
        .then(() => {
          this.$notify({
            title: '提示',
            message: '更新成功!',
            type: 'success'
          })
          _this.$emit('refreshTree', true)
          _this.editShow = false
        })
    },

    // 编辑
    append (data) {
      console.log('编辑目录', data)
      const { dirName, dirParentId, dirId } = data
      this.menuForm = {
        dirName,
        dirParentId,
        dirId
      }
      this.editShow = true
    },

    // 移除
    remove (node, data) {
      console.log('移除', node, data)
      this.$alert('是否确认移除当前目录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            this.$api
              .DEL_Source_MENU({
                dirId: data.dirId
              })
              .then(() => {
                this.$notify({
                  title: '提示',
                  message: '移除成功!',
                  type: 'success'
                })
                const parent = node.parent
                const children = parent.data.subDirList || parent.data
                const index = children.findIndex(d => d.id === data.id)
                children.splice(index, 1)
              })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-content {
  height: 75vh;
  width: 100%;
  background: #fff;
  ::v-deep .el-menu {
    border-right: none;
  }
  .menu-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 15px;
  }
}
</style>
