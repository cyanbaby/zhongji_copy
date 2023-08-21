<template>
    <div>
        <el-dialog
            title="添加成员"
            :visible.sync="addDialogVisible"
            width="60%"
            top="5vh"
            @close="close"
            :close-on-click-modal=false
        >
            <el-container style="height:65vh;">
                <el-aside width="250px" class="aside">
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
                <!-- <p style="font-size:16px;font-weight: bold;">人员列表</p>
                <el-divider></el-divider> -->
                <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @increaseBtn="increaseBtn"
                >
                <div slot="header">
                    <crud-search
                    ref="search"
                    :options="crud.searchOptions"
                    @submit="handleSearch"
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
                </el-main>
            </el-container>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible=false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud],
  props: {
    addDialogVisible: {
      type: Boolean,
      default: false
    },
    depId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShowTooltip: false,
      filterText: '',
      menu: [],
      menuProps: {
        label: 'depFullName',
        value: 'depId',
        children: 'subDepList'
      },
      depId: ''
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
    close () {
      this.$emit('update:addDialogVisible', this.addDialogVisible)
      this.$emit('closeDialog', this.addDialogVisible)
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.depFullName.indexOf(value) !== -1
    },
    // 超出显示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    },
    pageRequest (query) {
      query.depId = this.depId
      return this.$api.QUERY_ORG_MEMBER(query).then(res => {
        return Promise.resolve({
          code: '1',
          data: {
            list: res.data
          },
          msg: 'success'
        })
      })
      // return this.$api.QUERY_ORG_MEMBER(query)
    },
    // 获取左边目录树
    getDepTree () {
      this.$api.QUERY_DEP_TREE().then(res => {
        this.menu = res.data
      })
    },
    // 选中目录树
    getMenu (val) {
      this.depId = val.depId
      this.doRefresh()
    },
    // 添加成员
    increaseBtn ({ row }) {
      this.$api.SAVE_DEP_MEMBER({
        memberName: row.memberName,
        memberMobile: row.memberMobile,
        userId: row.userId,
        memberSex: row.memberSex,
        memberHeaderUrl: row.memberHeaderUrl,
        depId: this.depId
      }).then(() => {
        this.$message({
          message: '成员添加成功！',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style scoped>
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
</style>
