<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 17:13:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 17:13:19
 * @FilePath: \o-front-admin\src\views\examination\question-manage\index.vue
-->
<template>
  <el-row style="height:100%">
    <el-col :span="6" :offset="0">
      <div class="menu-content">
        <div class="menu-top">
          <h3>全部</h3>
          <el-button
            v-if="!isChoose"
            slot="reference"
            type="text"
            style="font-size: 26px"
            icon="el-icon-circle-plus"
            @click.stop="() => append()"
          ></el-button>
        </div>
        <el-tree
          :data="list"
          node-key="testSubjectCatId"
          default-expand-all
          :props="props"
          :expand-on-click-node="false"
          @node-click="clickNode"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.catValue }}</span>
            <span v-if="!isChoose && data.catValue!='默认分类'">
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
    <el-col :span="18" :offset="0" style="height:100%">
      <slot></slot>
    </el-col>

    <el-dialog :title="title" :visible.sync="editShow" width="480px" :close-on-click-modal=false>
      <el-form :model="menuForm" ref="form" :rules="rules" label-width="90px">
        <el-form-item label="分类标题" prop="catValue">
          <el-input placeholder="" v-model="menuForm.catValue" @input="doValide()">
            <em slot="suffix">{{ menuForm.catValue.length }} / 15</em>
          </el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number
            v-model="menuForm.orderNum"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="上级分类" prop="parentCatId">
          <el-cascader
            v-model="menuForm.parentCatId"
            :options="parentList"
            style="width: 100%"
            :props="{
              label: 'catValue',
              value: 'testSubjectCatId',
              children: 'treeChild',
              checkStrictly: true
            }"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editShow = false">取消</el-button>
        <el-button type="primary" @click="updateMenu">确定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  props: {
    isChoose: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    parentList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    var parentCatIdValid = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入上级分类'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      rules: {
        catValue: [
          { required: true, message: '请输入分类标题', trigger: 'blur' },
          { required: true, message: '不能超过15个字符', trigger: 'blur', max: 15 }
        ],
        parentCatId: [
          { required: true, message: '请输入上级分类', trigger: 'change', validator: parentCatIdValid }
        ]
      },
      addShow: false,
      props: {
        label: 'catValue',
        value: 'testSubjectCatId',
        children: 'treeChild'
      },
      menuForm: {
        catValue: '',
        orderNum: 0,
        parentCatId: 0
      },
      editShow: false
    }
  },
  created () {
  },
  methods: {
    doValide () {
      if (this.menuForm.catValue.length > 15) {
        this.menuForm.catValue = this.menuForm.catValue.slice(0, 15)
      }
    },
    copyArr (obj) {
      var newobj = obj.constructor === Array ? [] : {}
      if (typeof obj !== 'object') {
        return
      }
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? this.copyArr(obj[i]) : obj[i]
      }
      return newobj
    },
    clickNode (data) {
      this.$emit('refresh', data.testSubjectCatId, data.catValue)
    },
    // 更新目录
    updateMenu () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.menuForm.parentCatId =
            typeof (this.menuForm.parentCatId) === 'object'
              ? this.menuForm.parentCatId[
                this.menuForm.parentCatId.length - 1
              ] : this.menuForm.parentCatId
          const _this = this
          this.$api
            .ADD_Subject_TYPE({
              ...this.menuForm
            })
            .then(() => {
              this.$notify({
                title: '提示',
                message: '操作成功!',
                type: 'success'
              })
              _this.$emit('refreshTree', true)
              _this.editShow = false
            })
        }
      })
    },

    // 编辑
    append (data) {
      this.title = data ? '编辑' : '添加'
      if (data) {
        const { catValue, parentCatId, testSubjectCatId, orderNum } = data
        this.menuForm = {
          catValue,
          parentCatId,
          orderNum,
          testSubjectCatId
        }
      } else {
        this.menuForm = {
          catValue: '',
          orderNum: 0,
          parentCatId: 0
        }
      }
      this.editShow = true
    },

    // 移除
    remove (node, data) {
      this.$confirm('是否确认移除当前目录', '提示', {
        confirmButtonText: '确定',
        callback: (action) => {
          if (action === 'confirm') {
            this.$api
              .DEL_Subject_TYPE({
                testSubjectCatId: data.testSubjectCatId
              })
              .then(() => {
                this.$notify({
                  title: '提示',
                  message: '移除成功!',
                  type: 'success'
                })
                this.$emit('refreshTree', true)
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
