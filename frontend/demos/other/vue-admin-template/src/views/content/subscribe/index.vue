<template>
<d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">课件管理</span>
    </template>
    <!-- <el-row :gutter="20">
        暂时不做tree
        <el-col :span="5">
            <el-tree :data="menu" :props="menuProps" node-key="id1" :filter-node-method="filterNode" ref="tree1" style="margin-top:10px" @node-click="getMenu">
                        <span class="custom-tree-node" slot-scope="{data}">
                            <span>
                                <d2-icon-svg name="file" class="fileIcon"/><span style="margin-left:5px">{{ data.label }}</span>
                            </span>
                        </span>
            </el-tree>
        </el-col>
        <el-col :span="19"> -->
            <div style="height:100%">
            <d2-crud-x
            ref="d2Crud"
            v-bind="_crudProps"
            v-on="_crudListeners"
            @previewBtn='previewBtn'
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
                    @click="updateContent"
                    >更新订阅内容
                    </el-button>

                    <crud-toolbar
                    v-bind="_crudToolbarProps"
                    v-on="_crudToolbarListeners"
                    />
                </div>
                <template slot="courseWareToCategoryVOListSlot" slot-scope="scope">
                  <ul v-if="scope.row['courseWareToCategoryVOList'].length<2">
                    <li v-for="item in scope.row['courseWareToCategoryVOList']" :key='item.catId'>{{item.catValue}}</li>
                  </ul>
                <el-popover
                v-else
                placement="bottom-start"
                width="300"
                trigger="hover"
                >
                <ul>
                  <li v-for="item in scope.row['courseWareToCategoryVOList']" :key='item.catId'>{{item.catValue}}</li>
                </ul>
                <el-button slot="reference" type="text">查看更多</el-button>
                </el-popover>
                </template>
            </d2-crud-x>
            </div>
     <!--    </el-col>
    </el-row> -->
</d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      menu: [{
        label: '我的订阅',
        children: [{

        }]
      }],
      menuProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
    // TODO 待优化
    this.handleSearch({ ownerOrgId: localStorage.getItem('opOrgId') })
  },
  methods: {
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      return this.$api.GET_SUBSCRIBERECORD(query)
    },
    // 更新订阅内容
    updateContent () {
      return this.$api.UPDATECONTENT().then(res => {
        this.doRefresh()
      })
    },
    // 预览
    previewBtn ({ row }) {
      return this.$api.PREVIEW_JUMP({ wareId: row.wareId }).then((data) => {
        // console.log('返回的数据：', data)
        window.open(data.data)
        // window.location.href = data.data
      })
    }

  }
}
</script>
<style lang="scss">
  .fileIcon{
    width:15px;
    height:15px;
    float:left
  }
</style>
