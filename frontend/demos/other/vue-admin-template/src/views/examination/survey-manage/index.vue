<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\paper-manage\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <TreeContent
      :list="menu"
      :parentList = "parentList"
      dictTypeCode="file"
      fileType=""
      @refresh="refresh"
      @refreshTree="queryMenu"
    >
      <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @toview="toview"
        @topublish="topublish"
        @showDetail="showDetail"
        @toshare="toshare"
        @toedit="toedit"
      >
        <div slot="header">
          <crud-search
            ref="search"
            :options="crud.searchOptions"
            @submit="handleSearch"
          />
          <el-button type="primary" @click="toadd">新增问卷</el-button>
        </div>
        <template slot="questionnaireSurveyNameSlot" slot-scope="scope">
          <div v-html="scope.row.questionnaireSurveyName"></div>
        </template>
      </d2-crud-x>
    </TreeContent>

    <el-dialog
      title="生成链接"
      :visible.sync="dialog"
      width="600px"
      append-to-body
      >
      <el-form label-width="80px" :model="form">
        <el-form-item label="限制条件">
          <el-radio-group v-model="form.limitCondition" size="small">
            <el-radio-button label="1">无限制</el-radio-button>
            <el-radio-button label="2">登录</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="门户">
          <el-select
            v-model="form.terminalCode"
            @change="changePortal"
            >
            <el-option
              v-for="(item, i) in domainData"
              :key="i"
              :label="item.terminalName"
              :value="item.terminalCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分享链接" v-if="isShow">
          <a :href="linkUrl" target="_blank">{{linkUrl}}</a>
          <el-button type="text" @click="doCopy(linkUrl)" style="margin-left: 10px;">复制</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import TreeContent from './components/TreeContent.vue'
import { globalBaseUrl } from '@/utils/index'

export default {
  components: {
    TreeContent
  },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      form: {
        limitCondition: 1
      },
      linkUrl: '',
      copyNum: 0,
      domainData: [],
      dialog: false,
      tabPosition: -1,
      questionnaireSurveyName: '',
      questionnaireSurveyCatId: '',
      questionnaireSurveyId: '',
      data: [],
      parentList: [],
      menu: [],
      isShow: false
    }
  },
  created () {
    this.queryMenu()
  },
  methods: {
    changePortal (data) {
      const row = this.domainData.filter(res => res.terminalCode == data)[0]
      this.$api.shareQuestionSurvey({
        questionnaireSurveyId: this.questionnaireSurveyId,
        limitCondition: this.form.limitCondition,
        terminalDomain: row.terminalDomain,
        protocolType: row.protocolType
      }).then((res) => {
        this.isShow = true
        this.linkUrl = res.data
        this.$message({
          message: '生成成功',
          type: 'success'
        })
      })
    },
    topublish ({ row }) {
      this.$api.publishQuestionSurvey({
        questionnaireSurveyId: row.questionnaireSurveyId,
        publishStatus: row.publishStatus == 1 ? 2 : 1
      }).then((res) => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.handleSearch()
      })
    },
    doCopy (url) {
      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
    },
    toshare ({ row }) {
      this.form = {
        limitCondition: 1
      }
      this.isShow = false
      this.$api.queryportalterminal({
        pageSize: 100,
        pageNum: 1,
        busiDomainCode: 'user'
      }).then((res) => {
        this.form.terminalCode = ''
        this.domainData = res.data.list
        this.questionnaireSurveyId = row.questionnaireSurveyId
        this.dialog = true
      })
    },
    toview ({ row }) {
      window.open(location.origin + `/#/pages/examination/survey-paper?scene=1&limitCondition=not_limite&questionnaireSurveyId=${row.questionnaireSurveyId}`, '_blank')
    },
    sortType (arr, prop, desc) {
      const props = []
      const ret = []; const results = []
      let i = 0
      const len = arr.length
      if (typeof prop == 'string') {
        for (; i < len; i++) {
          const oI = arr[i];
          (props[i] = new String(oI && oI[prop] || ''))._obj = oI
        }
      } else if (typeof prop == 'function') {
        for (; i < len; i++) {
          const oI = arr[i];
          (props[i] = new String(oI && prop(oI) || ''))._obj = oI
        }
      } else {
        throw '参数类型错误'
      }
      props.sort()

      for (i = 0; i < len; i++) {
        ret[i] = props[i]._obj
        if (props[i]._obj.childCategoryVOS.length) {
          ret[i].childCategoryVOS = this.sortType(props[i]._obj.childCategoryVOS, 'orderNum', true)[0]
        }
      }
      if (desc) ret.reverse()
      results.push(ret)
      return results
    },
    typesQuery () {
      this.handleSearch()
    },
    toadd () {
      this.$router.push({
        path: 'survey_edit'
      })
    },
    showDetail ({ row }) {
      this.$router.push({
        path: 'survey_detail',
        query: {
          questionnaireSurveyId: row.questionnaireSurveyId
        }
      })
    },
    refresh (val) {
      this.questionnaireSurveyCatId = val
      this.handleSearch({ questionnaireSurveyCatId: val })
    },
    toedit ({ row }) {
      this.$router.push({
        path: 'survey_edit',
        query: {
          id: row.questionnaireSurveyId
        }
      })
    },

    // 删除
    delRequest (row) {
      return this.$api.deleteSurvey({
        questionnaireSurveyId: row.questionnaireSurveyId
      })
    },
    getTwo (obj) {
      obj = obj.map(item => {
        let childCategoryVOS
        if (item.childCategoryVOS) {
          childCategoryVOS = item.childCategoryVOS.map(every => {
            if (item.childCategoryVOS[0]) {
              return {
                questionnaireSurveyCatName: every.questionnaireSurveyCatName,
                platformId: every.platformId,
                orgId: every.orgId,
                questionnaireSurveyCatId: every.questionnaireSurveyCatId,
                parentCatId: every.parentCatId,
                orderNum: every.orderNum
              }
            }
          })
        }
        return {
          ...item,
          childCategoryVOS: childCategoryVOS
        }
      })
      return obj
    },
    queryMenu () {
      this.$api
        .listQuestionnaireSurveyCategory()
        .then((res) => {
          localStorage.setItem('paperTree', JSON.stringify(res.data))
          this.menu = this.sortType(res.data, 'orderNum', true)[0]
          const defaultData = [{
            questionnaireSurveyCatId: '-1',
            questionnaireSurveyCatName: '顶级分类',
            parentCatId: -1
          }]
          this.parentList = defaultData.concat(
            this.getTwo(this.menu).filter((res) => res.questionnaireSurveyCatName != '默认分类')
          )
        })
    },

    pageRequest (query) {
      this.questionnaireSurveyName = query.questionnaireSurveyName || this.questionnaireSurveyName
      query.questionnaireSurveyName = this.questionnaireSurveyName
      query.questionnaireSurveyCatId = this.questionnaireSurveyCatId
      return this.$api.pageQueryQuestionSurvey(query)
    },
    getCrudOptions () {
      return crudOptions(this)
    }
  }
}
</script>
<style lang="scss" scoped>
.fixed-video {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);

  ::v-deep.el-tabs__item {
    font-size: 14px;
    color: #353535;
    line-height: 48px;
  }

  .video-player-box {
    position: absolute;
    width: 600px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -150px;
    background: #000;
  }

  .close-icon {
    position: absolute;
    font-size: 28px;
    color: #fff;
    right: 100px;
    top: 100px;
  }
}
.video-card {
  display: flex;
  .video-play {
    background: #000;
    width: 80px;
    height: 50px;
    border-radius: 2px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .video-r {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .video-name {
    width: 130px;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 3px;
  }
  .video-count {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }
}
.menu-content {
  height: 75vh;
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
</style>
