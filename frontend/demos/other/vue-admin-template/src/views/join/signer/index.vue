<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">报名人管理</span>
      <!-- <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper> -->
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @toDownloadSignTable="downloadSignUpTable"
      @toDownloadExamTable="downloadExamTable"
    >
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
          @search-data-change="onPositionChange"
        />
         <!-- <el-cascader :options="atcivities" :props="activityProps"
          v-model="currentActivityId" :show-all-levels="false"
                @change="onActivityChange"
          ></el-cascader> -->
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
      </div>
      <template slot="positionIdSlot" slot-scope="scope">
            <ul v-if="scope.row['positionVOList'].length<2">
              <li v-for="(item,i) in scope.row['positionVOList']" :key='i'>{{item.positionName}}</li>
            </ul>
          <el-popover
          v-else
          placement="bottom-start"
          width="300"
          trigger="hover"
          >
          <ul>
            <li v-for="item in scope.row['positionVOList']" :key='item.catId'>{{item.positionName}}</li>
          </ul>
          <el-button slot="reference" type="text">查看更多</el-button>
          </el-popover>
        </template>
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      currentPositonName: ''
      // atcivities: [],
      // activityProps: {
      //   label: 'activityName',
      //   value: 'activityId'
      // }
    }
  },
  mounted () {
    // this.loadActivitys()
  },
  methods: {
    downloadExamTable ({ row }) {
      this.$api.DOWNLOAD_SIGNUP_ExamTable({
        recordId: row.recordId
      }).then(({ data }) => {
        window.open(data)
      })
    },
    downloadSignUpTable ({ row }) {
      this.$api.DOWNLOAD_SIGNUP_TABLE({
        recordId: row.recordId
      }).then(({ data }) => {
        window.open(data)
      })
    },
    onPositionChange (e) {
      if (e.key == 'positionName') {
        this.currentPositonName = e.value
      }
    },
    // async loadActivitys () {
    //   const { data } = await this.$api.GET_ACTIVITY_LIST({})
    //   this.atcivities = data.list
    // },
    getCrudOptions () {
      return crudOptions(this)
    },

    pageRequest (query) {
      query.positionName = this.currentPositonName
      const activityId = this.getParams('activityId')
      if (!query.activityId) {
        if (activityId && activityId.length) {
          query.activityId = activityId
        }
      }
      return this.$api.GET_ACTIVITY_SIGNERS_BY_USER_PAGE(query)
    },

    getParams (name) {
      var search = window.location.search.substring(1)
      if (!search) {
        search = window.location.hash.split('?')[1]
      }
      if (search) {
        var obj = JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        return name ? obj[name] : obj
      }
    }
  }
}
</script>
