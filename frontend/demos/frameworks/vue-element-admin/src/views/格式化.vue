<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  @close="close">
        <div>
          <el-tree :data="menulist"
           :props="{
              label: 'catValue',
              children: 'childCatagorys',
              value: 'catId'
           }"
           node-key="id1"
           :filter-node-method="filterNode"
           ref="categorytree"
           style="padding: 0 12px;"
           @node-click="checkmenuoption"
           :expand-on-click-node="false"
           :highlight-current="true">
            <span class="custom-tree-node" slot-scope="{data}">
              <el-tooltip
                :content="data.catValue"
                :open-delay="300"
                placement="top"
                effect="light"
              >
                <span class="over-ellipsis">{{ data.catValue }}</span>
              </el-tooltip>
            </span>
           </el-tree>
        <div>
        <div>
          <div class="search-box">
            <span>课程名称</span>
            <el-input style="width: 150px" v-model="from.goodsValue" placeholder="请输入内容"></el-input>
            <el-button icon="el-icon-search" @click="search" type="primary">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="refresh">重置</el-button>
          </div>

          <el-table :cell-style="{'text-align': 'center'}" stripe :data="ProductList" ref="multipleTable"
            @selection-change="handleSelectionChange" style="width: 100%; border-left: 1px solid #ebeef5" border
            max-height="380px"  v-loading="loadingShow">
            <el-table-column type="selection" :selectable="selectDisable" label="" width="50"></el-table-column>
            <el-table-column prop="" label="课程封面">
              <template slot-scope="scope" style="text-align: center">
                <img :src="scope.row.productImg" alt="" style="width: 40px; height: 40px" />
              </template>
            </el-table-column>
            <el-table-column prop="goodsValue" label="课程名称"></el-table-column>
            <el-table-column prop="learnHour" label="课时"></el-table-column>
            <el-table-column prop="" label="价格">
               <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.productNormInfoList[0].productPriceYuan }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="goodsSource" label="来源"></el-table-column>
            <el-table-column prop="" label="所属类目" width="180px">
              <template slot-scope="scope">
                 <el-popover
                  placement="top-start"
                  trigger="click" v-if="scope.row.fullCatagoryNames.length>1">
                    <p v-for="(item, index) in scope.row.fullCatagoryNames" :key="index">
                      {{ item }}
                    </p>
                  <el-link :underline="false" type="primary" slot="reference">查看更多</el-link>
                </el-popover>
                <p v-else>{{ scope.row.fullCatagoryNames[0] }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
          </el-table>
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="this.from.currentPage" background :page-sizes="[5, 20, 30, 50]" :page-size="this.from.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        </div>

    </el-dialog>
  </div>
</template>
<script>
import GenerateFormItem from './GenerateFormItem'
import GenerateColItem from './GenerateColItem'
import GenerateTabItem from './GenerateTabItem'
import GenerateReport from './GenerateReport'
import GenerateInline from './GenerateInline'
import GenerateCollapse from './GenerateCollapse.vue'
import GenerateDialog from './GenerateDialog.vue'
import {
  loadJs,
  updateStyleSheets,
  splitStyleSheets,
  clearStyleSheets
} from '../util/index.js'
import { EventBus } from '../util/event-bus.js'
import _ from 'lodash'
import axios from 'axios'
import { initBaseOptions } from './QiniuUpload/fetch-token'
import FormTitle from './diy/FormTitle'
import { findItemInArrayByProperty } from '../util/array-utils'

export default {
  name: 'fm-generate-form',
  components: {
    GenerateFormItem,
    GenerateColItem,
    GenerateTabItem,
    GenerateReport,
    GenerateInline,
    GenerateCollapse,
    GenerateDialog,
    FormTitle
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'medium',
          customClass: '',
          ui: 'element',
          layout: 'horizontal'
        }
      })
    },
    remote: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: true
    },
    printRead: {
      type: Boolean,
      default: false
    },
    remoteOption: {
      type: Object,
      default: () => ({})
    },
    preview: {
      type: Boolean,
      default: false
    },
    platform: {
      type: String,
      default: 'pc'
    },
    baseUrl: {
      type: String,
      default: ''
    },
    baseHeaders: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      models: {},
      rules: {},
      blanks: [],
      displayFields: {},
      dataBindFields: [],
      generateShow: false,
      resetModels: {},
      formKey: Math.random().toString(36).slice(-8),
      formStyleKey: Math.random().toString(36).slice(-8),
      formValue: this.value,
      formShow: false,
      formRef: Math.random().toString(36).slice(-8) + 'Form',
      containerKey: Math.random().toString(36).slice(-8),
      dataSourceValue: [],
      eventFunction: {},
      instanceObject: {},
      dataSourceInterface: []
    }
  },
  computed: {
    formSize() {
      switch (this.data && this.data.config && this.data.config.size) {
        case 'large':
          return 'large'
        case 'default':
          return 'small'
        case 'small':
          return 'mini'
        default:
          return 'small'
      }
    }
  },
  created() {
    initBaseOptions(this.baseUrl, this.baseHeaders)
    this._initForm()
  },
  mounted() {
    console.log('展示表单的初始化参数：', this.data)
    const _this = this

    EventBus.$on(
      'on-change-' + this.containerKey,
      (value, field, containerKey) => {
        if (this.containerKey == containerKey) {
          _this.setData({
            [field]: value
          })
        }
        _this.$emit('on-change', field, value, _this.models)
        _this.$emit(`on-${field}-change`, value)
        _this.recalcSeqNo()
      }
    )

    this.$nextTick(() => {
      this.eventFunction.mounted && this.eventFunction['mounted']()
    })
  },
  beforeDestroy() {
    let head = '.fm-' + this.formStyleKey + ' '
    clearStyleSheets(head)
    EventBus.$off('on-change-' + this.containerKey)
  },
  provide() {
    return {
      generateComponentInstance: this.generateComponentInstance,
      deleteComponentInstance: this.deleteComponentInstance,
      eventScriptConfig: this.data?.config?.eventScript || []
    }
  },
  methods: {
    recalcSeqNo() {
      //按照填写的内容，进行题目重新编号
      let _this = this
      _this.getData(false).then((input) => {
        let seqno = 1
        //遍历所有的组件列表，对单选和多选的组件进行选定设置的判断
        for (let index = 0; index < _this.data.list.length; index++) {
          const element = _this.data.list[index]
          if (element.type === 'formtitle') {
            //标题直接跳过
            continue
          }
          //如果控件类型是单选或多选，则完成后续组件的显隐属性配置
          if (
            element.type === 'singleselect' ||
            element.type === 'singleselectselect' ||
            element.type === 'multiselect'
          ) {
            if (_this.haveShowConfig(element)) {
              //如果有依赖选项的显隐配置，则进行后续元素的hidden属性配置
              //根据组件类型确定显示的数组和隐藏的数组
              let showAndHide = _this.fetchShowAndHideItems(element, input)
              console.info('显隐结果：', showAndHide)
              //遍历剩余的组件，设置隐藏属性
              if (_this.data.list.length > index + 1) {
                for (let idx = index + 1; idx < _this.data.list.length; idx++) {
                  let item = _this.data.list[idx]
                  let isHidden = _this.isHidden(item, showAndHide)
                  if (isHidden !== item.options.hidden) {
                    _this.$set(item.options, 'hidden', isHidden)
                  }
                }
              }
              //控制显隐
              if (showAndHide.hide) {
                _this.hide(showAndHide.hide)
              }
              if (showAndHide.show) {
                _this.display(showAndHide.show)
              }
            }
          }
          //对非隐藏的控件进行编号
          // console.info('处理完成后的信息：控件=', element.options.title, ',是否隐藏：', element.options.hidden)
          // console.info('处理完成后的信息：控件=', element.options.title,',对应的值：', _this.models[element.model]);
          if (!element.options.hidden) {
            _this.$set(element.options, 'seqNo', seqno++)
            // console.info('显示的组件完成编号：控件=', element.options.title,',编号=',seqno-1);
            _this.$set(_this.models[element.model], 'hidden', false)
          } else {
            _this.$set(_this.models[element.model], 'hidden', true)
          }
        }
      })
    },
    isHidden(item, showAndHide) {
      let itemName = item.model
      if (showAndHide) {
        if (showAndHide.show && showAndHide.show.indexOf(itemName) >= 0) {
          //显示
          return false
        } else if (
          showAndHide.hide &&
          showAndHide.hide.indexOf(itemName) >= 0
        ) {
          return true
        } else {
          //不在设置里面
          return false
        }
      } else {
        return false
      }
    },
    haveShowConfig(element) {
      if (!element.options.relation) return false
      let beenSet = false
      for (let idx = 0; idx < element.options.relation.length; idx++) {
        let item = element.options.relation[idx]
        if (item.relative && item.relative.length > 0) {
          beenSet = true
          break
        }
      }
      return beenSet
    },
    fetchShowAndHideItems(element, input) {
      //根据组件类型确定显示的数组和隐藏的数组
      let showArr = []
      let hideArr = []
      if (element.options.relation) {
        if (
          element.type === 'singleselect' ||
          element.type === 'singleselectselect' ||
          element.type === 'multiselect'
        ) {
          let current = input[element.model]
          if (current && current.value) {
            //选定了值的情况
            element.options.relation.forEach((sel) => {
              if (this.isSelected(element.model, sel.value, input)) {
                showArr.push(...sel.relative)
              } else {
                hideArr.push(...sel.relative)
              }
            })
          } else {
            //未选定值
            element.options.relation.forEach((sel) => {
              hideArr.push(...sel.relative)
            })
          }
        }
      }
      return { show: showArr, hide: hideArr }
    },
    isSelected(name, value, input) {
      //判断指定字段的选项是否被选定
      let current = input[name]
      if (!current || !current.value) {
        return false
      }
      if (Array.isArray(current.value)) {
        return current.value.indexOf(value) >= 0
      } else {
        return current.value === value
      }
    },
    _initForm() {
      this.formShow = false

      this.models = {}
      this.rules = {}
      this.blanks = []
      this.displayFields = {}
      this.dataBindFields = []
      this.resetModels = {}
      this.dataSourceValue = []
      this.eventFunction = []
      this.dataSourceInterface = []

      if (Object.keys(this.data).length) {
        this.generateModel(this.data.list)
      } else {
        this.generateModel([])
      }

      this.resetModels = _.cloneDeep(this.models)

      this.models = { ...this.models }

      this.formShow = true

      if (this.data.config && this.data.config.styleSheets) {
        let head = '.fm-' + this.formStyleKey + ' '

        updateStyleSheets(splitStyleSheets(this.data.config.styleSheets), head)
      }

      this.loadDataSource()

      this.loadEvents()

      this.$nextTick(() => {
        this.eventFunction['refresh'] && this.eventFunction['refresh']()
      })
    },
    loadEvents() {
      if (this.data.config && this.data.config.eventScript) {
        for (let i = 0; i < this.data.config.eventScript.length; i++) {
          let currentScript = this.data.config.eventScript[i]

          this.eventFunction[currentScript.key] = Function(
            currentScript.func
          ).bind(this)
        }
      }
    },
    triggerEvent(eventName, args) {
      if (this.data.config && this.data.config.eventScript) {
        let eventScript = this.data.config.eventScript.find(
          (item) => item.name == eventName
        )

        if (eventScript) {
          return this.eventFunction[eventScript.key](args)
        }
      }
    },
    loadDataSource() {
      for (let i = 0; i < this.dataSourceInterface.length; i++) {
        let curRequest = this.dataSourceInterface[i]
        let requestObj = this.data.config.dataSource.find(
          (item) => item.key == curRequest.key
        )
        if (requestObj && requestObj.auto)
          requestObj.name &&
            this.sendRequest(requestObj.name, curRequest.args).then((data) => {
              curRequest.fields.forEach((field) => {
                let curKey = field + '.' + curRequest.key
                let sourceValue = this.dataSourceValue.find(
                  (item) => item.key === curKey
                )

                if (sourceValue) {
                  sourceValue.value = data
                } else {
                  this.dataSourceValue.push({
                    key: curKey,
                    value: data
                  })
                }
              })
            })
      }
      // 处理需要初始化请求但没有进行绑定的数据源
      if (this.data.config?.dataSource?.length > 0) {
        for (let i = 0; i < this.data.config.dataSource.length; i++) {
          let currentDataSource = this.data.config.dataSource[i]

          if (
            currentDataSource.auto &&
            this.dataSourceInterface.findIndex(
              (item) => item.key == currentDataSource.key
            ) < 0
          ) {
            this.sendRequest(currentDataSource.name, {})
          }
        }
      }
    },

    refreshFieldDataSource(field, args) {
      let curRequest = this.dataSourceInterface.find((item) =>
        item.fields.includes(field)
      )

      if (curRequest) {
        let requestName = this.data.config.dataSource.find(
          (item) => item.key == curRequest.key
        )?.name
        requestName &&
          this.sendRequest(requestName, { ...curRequest.args, ...args }).then(
            (data) => {
              let curKey = field + '.' + curRequest.key
              let sourceValue = this.dataSourceValue.find(
                (item) => item.key === curKey
              )

              if (sourceValue) {
                sourceValue.value = data
              } else {
                this.dataSourceValue.push({
                  key: curKey,
                  value: data
                })
              }
            }
          )
      }
    },
    sendRequest(name, args = {}) {
      return new Promise((resolve, reject) => {
        let currentDataSource = this.data.config.dataSource.find(
          (item) => item.name === name
        )

        if (currentDataSource) {
          let options = {
            method: currentDataSource.method,
            url: currentDataSource.url,
            headers: currentDataSource.headers,
            params: currentDataSource.params
          }

          //请求发送前处理函数
          if (currentDataSource.requestFunc) {
            const requestDynamicFunc = Function(
              'config',
              'args',
              currentDataSource.requestFunc
            ).bind(this)

            options = requestDynamicFunc(options, args)
          }

          axios(options)
            .then((res) => {
              let data = res

              if (currentDataSource.responseFunc) {
                const dynamicFunc = Function(
                  'res',
                  'args',
                  currentDataSource.responseFunc
                ).bind(this)

                data = dynamicFunc(res.data, args)

                resolve(data)
              } else {
                resolve(res.data)
              }
            })
            .catch((error) => {
              //请求错误处理函数
              if (currentDataSource.errorFunc) {
                const errorDynamicFunc = Function(
                  'error',
                  currentDataSource.errorFunc
                ).bind(this)

                errorDynamicFunc(error)
              }

              reject(error)
            })
        }
      })
    },
    generateSubformModel(subName, genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach((item) => {
            this.generateSubformModel(subName, item.list)
          })
        } else if (genList[i].type === 'tabs') {
          genList[i].tabs.forEach((item) => {
            this.generateSubformModel(subName, item.list)
          })
        } else if (genList[i].type === 'collapse') {
          genList[i].tabs.forEach((item) => {
            this.generateSubformModel(subName, item.list)
          })
        } else if (genList[i].type === 'report') {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this.generateSubformModel(subName, column.list)
            })
          })
        } else if (genList[i].type === 'inline') {
          this.generateSubformModel(subName, genList[i].list)
        } else {
          if (genList[i].type === 'blank') {
            this.blanks.push({
              name: genList[i].model
            })
          }

          // 处理 rules
          this._generateRules(
            `${subName}.${genList[i].model}`,
            genList[i].rules
          )

          // 处理子表单中的DataSource
          this._generateDataSource(genList[i], `${subName}.${genList[i].model}`)
        }
      }
    },
    generateDialogModel(dialogName, genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach((item) => {
            this.generateDialogModel(dialogName, item.list)
          })
        } else if (genList[i].type === 'tabs') {
          genList[i].tabs.forEach((item) => {
            this.generateDialogModel(dialogName, item.list)
          })
        } else if (genList[i].type === 'collapse') {
          genList[i].tabs.forEach((item) => {
            this.generateDialogModel(dialogName, item.list)
          })
        } else if (genList[i].type === 'report') {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this.generateDialogModel(dialogName, column.list)
            })
          })
        } else if (genList[i].type === 'inline') {
          this.generateDialogModel(dialogName, genList[i].list)
        } else {
          if (genList[i].type === 'blank') {
            this.blanks.push({
              name: genList[i].model
            })
          }

          if (genList[i].type == 'subform') {
            this.generateSubformModel(
              `${dialogName}.${genList[i].model}`,
              genList[i].list
            )
          }

          genList[i].tableColumns &&
            genList[i].tableColumns.length &&
            genList[i].tableColumns.forEach((item) => {
              if (item.type === 'blank') {
                this.blanks.push({
                  name: item.model
                })
              }

              // 处理 rules
              this._generateRules(
                `${dialogName}.${genList[i].model}.${item.model}`,
                item.rules
              )

              // 处理子表单中的DataSource
              this._generateDataSource(
                item,
                `${dialogName}.${genList[i].model}.${item.model}`
              )
            })

          this._generateRules(
            `${dialogName}.${genList[i].model}`,
            genList[i].rules
          )

          // 处理弹框中的DataSource
          this._generateDataSource(
            genList[i],
            `${dialogName}.${genList[i].model}`
          )
        }
      }
    },
    generateModel(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          this.displayFields[genList[i].model] = !genList[i].options.hidden

          genList[i].columns.forEach((item) => {
            this.generateModel(item.list)
          })
        } else if (genList[i].type === 'tabs') {
          genList[i].tabs.forEach((item) => {
            this.generateModel(item.list)
          })

          this.displayFields[genList[i].model] = !genList[i].options.hidden
        } else if (genList[i].type === 'collapse') {
          genList[i].tabs.forEach((item) => {
            this.generateModel(item.list)
          })

          this.displayFields[genList[i].model] = !genList[i].options.hidden
        } else if (genList[i].type === 'report') {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this.generateModel(column.list)
            })
          })

          this.displayFields[genList[i].model] = !genList[i].options.hidden
        } else if (genList[i].type === 'inline') {
          this.generateModel(genList[i].list)

          this.displayFields[genList[i].model] = !genList[i].options.hidden
        } else {
          if (Object.keys(this.formValue).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.formValue[genList[i].model]
            // 处理老版本没有dataBind值的情况，默认绑定数据
            if (
              (Object.keys(genList[i].options).indexOf('dataBind') < 0 ||
                genList[i].options.dataBind) &&
              genList[i].key &&
              genList[i].model
            ) {
              this.dataBindFields.push(genList[i].model)
            }

            this.displayFields[genList[i].model] = !genList[i].options.hidden

            if (genList[i].type === 'blank') {
              this.blanks.push({
                name: genList[i].model
              })
            }
          } else {
            if (genList[i].type === 'blank') {
              // bound the default value
              this.models[genList[i].model] =
                genList[i].options.defaultType === 'String'
                  ? ''
                  : genList[i].options.defaultType === 'Object'
                  ? {}
                  : []
              if (
                (Object.keys(genList[i].options).indexOf('dataBind') < 0 ||
                  genList[i].options.dataBind) &&
                genList[i].key &&
                genList[i].model
              ) {
                this.dataBindFields.push(genList[i].model)
              }
              this.displayFields[genList[i].model] = !genList[i].options.hidden

              this.blanks.push({
                name: genList[i].model
              })
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue
              if (
                (Object.keys(genList[i].options).indexOf('dataBind') < 0 ||
                  genList[i].options.dataBind) &&
                genList[i].key &&
                genList[i].model
              ) {
                this.dataBindFields.push(genList[i].model)
              }
              this.displayFields[genList[i].model] = !genList[i].options.hidden
            }
          }

          if (genList[i].type == 'subform') {
            this.generateSubformModel(genList[i].model, genList[i].list)
          }

          if (genList[i].type == 'dialog') {
            this.generateDialogModel(genList[i].model, genList[i].list)
          }

          genList[i].tableColumns &&
            genList[i].tableColumns.length &&
            genList[i].tableColumns.forEach((item) => {
              if (item.type === 'blank') {
                this.blanks.push({
                  name: item.model
                })
              }

              // 处理 rules
              this._generateRules(
                `${genList[i].model}.${item.model}`,
                item.rules
              )

              // 处理子表单中的DataSource
              this._generateDataSource(
                item,
                `${genList[i].model}.${item.model}`
              )
            })

          this._generateRules(genList[i].model, genList[i].rules)

          // 处理DataSource
          this._generateDataSource(genList[i], genList[i].model)
        }
      }
    },
    _generateDataSource(element, model) {
      if (
        element.options.remoteType === 'datasource' &&
        element.options.remoteDataSource
      ) {
        this._setDataSourceInterface(
          model,
          element.options.remoteArgs,
          element.options.remoteDataSource
        )
      }
      if (
        (element.type == 'imgupload' || element.type == 'fileupload') &&
        element.options.tokenType == 'datasource' &&
        element.options.tokenDataSource
      ) {
        this._setDataSourceInterface(
          model,
          element.options.remoteArgs,
          element.options.tokenDataSource
        )
      }
    },
    _generateRules(model, rules) {
      if (this.rules[model]) {
        this.rules[model] = [
          ...this.rules[model],
          ...(rules
            ? rules.map((im) => {
                if (im.pattern) {
                  return { ...im, pattern: eval(im.pattern) }
                } else if (im.func) {
                  const validatorFunc = Function(
                    'rule',
                    'value',
                    'callback',
                    im.func
                  ).bind(this)

                  return { ...im, validator: validatorFunc }
                } else {
                  return { ...im }
                }
              })
            : [])
        ]
      } else {
        this.rules[model] = [
          ...(rules
            ? rules.map((im) => {
                if (im.pattern) {
                  return { ...im, pattern: eval(im.pattern) }
                } else if (im.func) {
                  const validatorFunc = Function(
                    'rule',
                    'value',
                    'callback',
                    im.func
                  ).bind(this)

                  return { ...im, validator: validatorFunc }
                } else {
                  return { ...im }
                }
              })
            : [])
        ]
      }
    },
    _setDataSourceInterface(field, args, key) {
      let argsObj
      if (typeof args == 'string') {
        argsObj = new Function('"use strict";return (' + args + ')').bind(
          this
        )()
      } else {
        argsObj = args
      }

      let findCurInterfaceIndex = this.dataSourceInterface.findIndex(
        (item) => item.key == key && _.isEqual(item.args, argsObj)
      )

      if (findCurInterfaceIndex >= 0) {
        this.dataSourceInterface[findCurInterfaceIndex].fields.push(field)
      } else {
        this.dataSourceInterface.push({
          key: key,
          args: argsObj,
          fields: [field]
        })
      }
    },
    _setDisabled(genList, fields, disabled) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach((item) => {
            this._setDisabled(item.list, fields, disabled)
          })
        } else if (genList[i].type === 'tabs') {
          genList[i].tabs.forEach((item) => {
            this._setDisabled(item.list, fields, disabled)
          })
        } else if (genList[i].type === 'collapse') {
          genList[i].tabs.forEach((item) => {
            this._setDisabled(item.list, fields, disabled)
          })
        } else if (genList[i].type === 'report') {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this._setDisabled(column.list, fields, disabled)
            })
          })
        } else if (genList[i].type === 'inline') {
          this._setDisabled(genList[i].list, fields, disabled)
        } else {
          if (fields.indexOf(genList[i].model) >= 0) {
            this.$set(genList[i].options, 'disabled', disabled)
          }
        }
      }
    },
    _updateClassName(genList, fields, className, updateType) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach((item) => {
            this._updateClassName(item.list, fields, className, updateType)
          })
        } else if (genList[i].type === 'tabs') {
          genList[i].tabs.forEach((item) => {
            this._updateClassName(item.list, fields, className, updateType)
          })
        } else if (genList[i].type === 'collapse') {
          genList[i].tabs.forEach((item) => {
            this._updateClassName(item.list, fields, className, updateType)
          })
        } else if (genList[i].type === 'report') {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this._updateClassName(column.list, fields, className, updateType)
            })
          })
        } else if (genList[i].type === 'inline') {
          this._updateClassName(genList[i].list, fields, className, updateType)
        } else {
          if (fields.indexOf(genList[i].model) >= 0) {
            if (
              updateType == 'add' &&
              !genList[i].options.customClass.split(' ').includes(className)
            ) {
              this.$set(
                genList[i].options,
                'customClass',
                [...genList[i].options.customClass.split(' '), className].join(
                  ' '
                )
              )
            }

            if (
              updateType == 'remove' &&
              genList[i].options.customClass.split(' ').includes(className)
            ) {
              let originArray = genList[i].options.customClass.split(' ')
              originArray.splice(
                originArray.findIndex((item) => item == className),
                1
              )
              this.$set(
                genList[i].options,
                'customClass',
                originArray.join(' ')
              )
            }
          }
        }
      }
    },
    _setOptions(genList, fields, opts) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach((item) => {
            this._setOptions(item.list, fields, opts)
          })
        } else if (genList[i].type === 'tabs') {
          genList[i].tabs.forEach((item) => {
            this._setOptions(item.list, fields, opts)
          })
        } else if (genList[i].type === 'collapse') {
          genList[i].tabs.forEach((item) => {
            this._setOptions(item.list, fields, opts)
          })
        } else if (genList[i].type === 'report') {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this._setOptions(column.list, fields, opts)
            })
          })
        } else if (genList[i].type === 'inline') {
          this._setOptions(genList[i].list, fields, opts)
        } else {
          if (fields.indexOf(genList[i].model) >= 0) {
            Object.keys(opts).forEach((key) => {
              this.$set(genList[i].options, key, opts[key])
            })
          }
        }
      }
    },
    validate(fields) {
      return new Promise((resolve, reject) => {
        if (fields) {
          this.$refs[this.formRef].validateField(fields, (error) => {
            if (!error) {
              resolve()
            } else {
              reject(error)
            }
          })
        } else {
          this.$refs[this.formRef].validate((valid, error) => {
            if (valid) {
              resolve()
            } else {
              reject(error)
            }
          })
        }
      })
    },
    getData(isValidate = true) {
      return new Promise((resolve, reject) => {
        if (isValidate) {
          this.$refs[this.formRef].validate((valid) => {
            if (valid) {
              const resData = {}
              Object.keys(this.models).forEach((key) => {
                if (this.dataBindFields.indexOf(key) >= 0) {
                  resData[key] = this.models[key]
                }
              })
              resolve(JSON.parse(JSON.stringify(resData)))
            } else {
              reject(new Error(this.$t('fm.message.validError')).message)
            }
          })
        } else {
          const resData = {}
          Object.keys(this.models).forEach((key) => {
            if (this.dataBindFields.indexOf(key) >= 0) {
              resData[key] = this.models[key]
            }
          })
          resolve(JSON.parse(JSON.stringify(resData)))
        }
      })
    },
    reset() {
      this.setData(_.cloneDeep(this.resetModels))

      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs[this.formRef].clearValidate()
        })
      })
    },
    onInputChange(value, field) {
      this.$emit('on-change', field, value, this.models)
      this.$emit(`on-${field}-change`, value)
    },
    display(fields) {
      Object.keys(this.displayFields).forEach((key) => {
        if (fields.indexOf(key) >= 0) {
          this.$set(this.displayFields, key, true)
        }
      })

      this.displayFields = { ...this.displayFields }
    },
    hide(fields) {
      Object.keys(this.displayFields).forEach((key) => {
        if (fields.indexOf(key) >= 0) {
          this.$set(this.displayFields, key, false)
        }
      })

      this.displayFields = { ...this.displayFields }
    },
    disabled(fields, disabled) {
      this._setDisabled(this.data.list, fields, disabled)
    },
    addClassName(fields, className) {
      this._updateClassName(this.data.list, fields, className, 'add')
    },
    removeClassName(fields, className) {
      this._updateClassName(this.data.list, fields, className, 'remove')
    },
    refresh() {
      this._initForm()
    },
    setData(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this.models, item, value[item])
      })
    },
    getComponent(name) {
      return this.instanceObject[name]
    },
    getValues() {
      return this.models
    },
    getValue(fieldName) {
      return this.models[fieldName]
    },
    setRules(field, rules) {
      this.$set(this.rules, field, [...rules])

      this.$refs[this.formRef].clearValidate(field)
    },
    setOptions(fields, options) {
      this._setOptions(this.data.list, fields, options)
    },
    generateComponentInstance(key, instance) {
      if (this.instanceObject[key]) {
        if (Array.isArray(this.instanceObject[key])) {
          this.instanceObject[key] = [...this.instanceObject[key], instance]
        } else {
          this.instanceObject[key] = [this.instanceObject[key], instance]
        }
      } else {
        this.instanceObject[key] = instance
      }
    },
    deleteComponentInstance(key) {
      if (this.instanceObject[key]) {
        delete this.instanceObject[key]
      }
    },
    setOptionData(fields, data) {
      fields.forEach((field) => {
        const curRef = this.instanceObject[field]
        curRef?.$parent?.loadOptions(data)

        const mCurRef = this.instanceObject['m' + field]
        mCurRef?.$parent?.loadOptions(data)
      })
    }
  }
}
</script>

<style lang="scss"></style>
