<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">选择组件
      <example-helper title="select" >
        <div>
          <link-button type="text" target="_blank" href="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/types.html#选择框">选择组件类型</link-button>
          <link-button type="text" href="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/components/dict-select.html">DictSelect组件</link-button>
        </div>
      </example-helper>
    </template>
    <d2-highlight :code="codeJavascript" />
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
          <el-button size="small" type="primary" @click="getXxxDict">根据dict获取字典data</el-button>
          <el-button size="small" type="primary" @click="getStatusDict">根据列key获取字典data</el-button>
          <el-button size="small" type="primary" @click="getXxxDictMap">获取字典map</el-button>
        </el-button-group>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" :text="toolbarText"/>

      </div>
    </d2-crud-x>

  </d2-container>
</template>

<script>
/* eslint-disable */
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formSelect',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      show: true,
      toolbarText: {
        compactBtn: 'compact',
        searchBtn: 'search hide',
        refreshBtn: 'refresh',
        exportBtn: 'export data',
        columnsSetBtn: 'columns set',
        columnsSet: {
          title: 'columns set',
          reset: 'reset',
          confirm: 'ok',
          fixed: 'fixed',
          order: 'sort'
        }
      },
      codeJavascript: `
      搜索
        多选搜索控件的事件 search.component.events: { clear, blur }
      表单
        viewOptions.componentType: 'form', // 查看时使用哪种组件展示【form=使用表单组件,row=使用行展示组件】
        新增 控件默认值得两种方式: form.component.props.onReady || form.component.value
        form.helper 可以是字符串 || { render(h) {} }
        select 禁用某个选项 form.component.props:.dict.onReady
        form.component.props element原始配置 也可以 events
      表格
        columns[x].dict.url || .data 配合type: select ===> tag展示， 可配置color
        columns[x].type
          枚举值?  字段类型背后代表了一段默认配置，当你配置了type时，你可以省略它代表的这部分默认配置
          component.name 可选值: el-input / dict-select / dict-radio / dict-checkbox 等任何支持v-model的表单组件
        component.on.click 列点击事件
        component.props.elProps 列适配的el组件的el配置
        columns[x].type 配置了 select, 如果表格列不想要select显示 需要单独覆盖配置 component.props.type: 'text'
        columns[x].disabled 不显示该列 add和edit还是有哒
      `,
    }
  },
  mounted () {
    console.log('dict cache：', d2CrudPlus.util.dict.getCache())
  },
  methods: {
    /**
     * 根据字典配置获取字典数据
     */
    getXxxDict () {
      this.getDictData({ url: '/dicts/OpenStatusEnum' }).then(data => {
        this.$alert(JSON.stringify(data), '根据dict获取数据字典', {
          confirmButtonText: '确定'
        }).catch(() => {})
      })
    },
    getXxxDictMap () {
      this.getDictData({ url: '/dicts/OpenStatusEnum' }, { returnType: 'dataMap' }).then(data => {
        this.$alert(JSON.stringify(data), '返回dataMap', {
          confirmButtonText: '确定'
        }).catch(() => {})
      })
    },
    /**
     * 根据字段key获取字典数据
     */
    getStatusDict () {
      this.getDictData('status').then(data => {
        this.$alert(JSON.stringify(data), '根据列key获取数据字典', {
          confirmButtonText: '确定'
        })
      })
    },
    getCrudOptions () {
      // 模拟异步从后台获取参数
      return crudOptions(this)
    },
    async pageRequest (query) {
      const ret = await GetList(query)
      console.log('ret', ret)
      return ret
    },
    addRequest (row) {
      return AddObj(row)
    },
    updateRequest (row) {
      console.log('----', row)
      return UpdateObj(row)
    },
    delRequest (row) {
      return DelObj(row.id)
    }
  }
}
</script>
