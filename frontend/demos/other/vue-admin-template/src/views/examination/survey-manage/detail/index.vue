<!--
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\paper-manage\index.vue
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">问卷详情</span>
      <el-button type="primary" style="float: right;" size="mini" @click="back">返回</el-button>
    </template>
    <d2-crud-x
      style="height: 75vh"
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
        <el-button type="primary" @click="tooutput">导出</el-button>
      </div>
      <template slot="paperNameSlot" slot-scope="scope">
        <div v-html="scope.row.paperName"></div>
      </template>
    </d2-crud-x>
  </d2-container>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      paperName: '',
      data: [],
      parentList: [],
      menu: [],
      isShow: false
    }
  },
  methods: {
    back () {
      this.$router.push({
        path: '/examination/survey_manage'
      })
    },
    pageRequest (query) {
      query.questionnaireSurveyId = this.$route.query.questionnaireSurveyId
      return this.$api.questionSurveyDetail(query)
    },
    tooutput () {
      this.$api.exportQuestionSurvey({
        questionnaireSurveyId: this.$route.query.questionnaireSurveyId
      }).then((res) => {
        location.href = res.data
      })
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
