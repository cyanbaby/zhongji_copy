<!--
 * @Author: 姚文彬
 * @Date: 2021-06-16 14:07:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-29 10:50:30
 * @FilePath: \o-front-admin\src\views\file\column\index.vue
-->
<template>
  <d2-container>
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
    <div class="box">
      <TreeColumn :list="menu" @refreshTree="getColumn" @refresh="refresh" />
      <div class="right">
        <el-form label-width="100px" :model="columnform">
          <el-form-item label="栏目名称:">
            <el-input disabled v-model="columnform.columnName" style="width:600px;"></el-input>
          </el-form-item>
          <el-form-item label="栏目说明:">
            <el-input disabled v-model="columnform.remark" type="textarea" :rows="10"></el-input>
          </el-form-item>
          <el-form-item label="含文章数:">
            <el-input disabled v-model="columnform.contentCount"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </d2-container>
</template>

<script>
import TreeColumn from './components/TreeColumn.vue'
export default {
  components: { TreeColumn },
  data () {
    return {
      menu: [],
      columnform: {
        columnName: '',
        remark: '',
        contentCount: ''
      }
    }
  },
  created () {
    this.getColumn()
  },
  methods: {
    getDetail (val) {
      this.$api.COLUMN_BY_ID({
        columnId: val
      }).then(({ data }) => {
        this.columnform = data
      })
    },
    refresh (val) {
      this.getDetail(val)
    },
    getColumn () {
      this.$api.COLUMN_LIST().then(({ data }) => {
        this.menu = data
      })
    }
  }
}
</script>

<style lang="scss">
  .box{
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    background: #fff;
  }
</style>
