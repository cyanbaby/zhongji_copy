<!--
 * @Author: 姚文彬
 * @Date: 2021-06-18 11:49:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 15:37:02
 * @FilePath: \o-front-admin\src\views\folder\components\TreeContent.vue
-->
<template>
  <el-row :gutter="20" style="min-width:300px">
    <el-col :span="6" :offset="0">
      <div class="menu-content">
        <div class="menu-top">
          <h3>所有栏目</h3>
          <el-popover
            placement="right"
            v-model="addShow"
            width="400"
            trigger="click"
          >
            <h3 style="text-align:center">新建栏目</h3>
            <el-form :model="menuForm" ref="form" label-width="90px" :rules="rules">
              <el-form-item label="栏目名称" prop="columnName">
                <el-input placeholder="" v-model="menuForm.columnName">
                  <em slot="suffix">{{ menuForm.columnName.length }} / 20</em>
                </el-input>
              </el-form-item>
              <el-form-item label="上级栏目" prop="parentColumnId">
                <el-select style="width:100%" v-model="menuForm.parentColumnId">
                  <el-option label="无上级栏目" value="-1"> </el-option>
                  <el-option
                    v-for="item in list"
                    :key="item.columnId"
                    :label="item.columnName"
                    :value="item.columnId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="栏目说明">
                <el-input type="textarea" :rows="3" v-model="menuForm.remark"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align:center">
              <el-button size="small" @click="addShow = false">取消</el-button>
              <el-button size="small" type="primary" @click="creatMenu">确定</el-button>
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
          node-key="columnId"
          default-expand-all
          :props="props"
          :expand-on-click-node="false"
          @node-click="clickNode"
        >
          <span class="custom-tree-node onlyThree" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span style="text-align:right; width:50px;">
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

    <el-dialog title="编辑栏目" :visible.sync="dialog" width="480px" :close-on-click-modal=false>
      <el-form :model="menuForm" ref="form" label-width="80px">
        <el-form-item label="栏目名称">
          <el-input placeholder="" v-model="menuForm.columnName">
            <em slot="suffix">{{ menuForm.columnName.length }} / 20</em>
          </el-input>
        </el-form-item>
        <el-form-item label="栏目说明">
          <el-input type="textarea" :rows="3" v-model="menuForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="noUpdate">取消</el-button>
        <el-button type="primary" @click="updateMenu">确定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  props: {
    // 目录类型，字典值后端定义
    type: {
      type: String,
      default: '1'
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
      form: {},
      props: {
        label: 'columnName',
        value: 'columnId',
        children: 'childrenColumnList'
      },
      addShow: false,
      menuForm: {
        columnName: '',
        parentColumnId: '',
        remark: ''
      },
      dialog: false,
      rules: {
        columnName: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' }
        ],
        parentColumnId: [
          { required: true, message: '请选择上机栏目', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'dialog' (val) {
      if (!val) {
        this.menuForm = {
          columnName: '',
          parentColumnId: '',
          remark: ''
        }
      }
    },
    addShow (val) {
      if (!val) {
        this.menuForm = {
          columnName: '',
          parentColumnId: '',
          remark: ''
        }
      }
    }
  },
  methods: {
    noUpdate () {
      this.dialog = false
      // this.$emit('refreshTree', true)
    },
    clickNode (data) {
      this.$emit('refresh', data.columnId)
    },
    updateMenu () {
      this.$api.UPDATE_COLUMN({
        ...this.menuForm
      }).then(() => {
        this.$notify({
          title: '提示',
          message: '更新成功!',
          type: 'success'
        })
        this.$emit('refreshTree', true)
        this.dialog = false
      })
    },
    append (data) {
      this.dialog = true
      this.menuForm = JSON.parse(JSON.stringify(data))
    },

    remove (node, data) {
      this.$alert('是否确认移除当前目录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            this.$api.DEL_COLUMN({
              columnId: data.columnId
            }).then(() => {
              this.$notify({
                title: '提示',
                message: '移除成功!',
                type: 'success'
              })
              // 更新
              this.$emit('refreshTree', true)
            })
          }
        }
      })
    },
    creatMenu () {
      this.$api.CREATE_COLUMN({
        ...this.menuForm
      })
        .then(() => {
          this.$notify({
            title: '提示',
            message: '新增栏目成功!',
            type: 'success'
          })
          this.addShow = false
          // 更新
          this.$emit('refreshTree', true)
        })
    }

  }
}
</script>
<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 15px;
}
.menu-content {
  height: 100%;
  width: 300px;
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
}
.onlyThree{
  overflow:hidden;
  text-overflow:ellipsis;//显示为省略号
  white-space:nowrap;//不换行
  text-align: left;
  padding-bottom: 2%;
  span{
    width: calc(100% - 24px);
    overflow:hidden;
    text-overflow:ellipsis;//显示为省略号
    white-space:nowrap;
  }
}
</style>
