<template>
  <div style="height:66vh">
    <d2-crud-x ref="d2Crud"
               v-bind="_crudProps"
               v-on="_crudListeners">
      <div slot="header">
        <crud-search ref="search"
                     :options="crud.searchOptions"
                     @submit="handleSearch"
                     @reset="resetSearch">
          <template slot="areaSearchSlot">
            <el-cascader v-if="isDataPermission"
                         v-model="address"
                         :options="options"
                         :props="props"
                         clearable
                         filterable>
            </el-cascader>
            <el-cascader v-if="!isDataPermission"
                         ref="manageArea"
                         v-model="address"
                         style="width:150px"
                         :options="OptionS"
                         :props="props"
                         filterable
                         clearable />
          </template>
        </crud-search>
        <div class="opbutton">
          <div class="opbutton-left">
            <el-button type="primary"
                       icon="el-icon-circle-plus-outline"
                       @click="importStudents('NEW')"
                       style="margin-right: 10px;">导入学员</el-button>
            <el-button type="primary"
                       icon="el-icon-circle-plus-outline"
                       @click="importStudents('OLD')"
                       style="margin-right: 10px;">导入老系统</el-button>
            <el-dropdown trigger="click"
                         @command="handleCommand">
              <el-button type="primary"
                         icon="el-icon-upload2"
                         v-popover:popover>导出</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="exportStudents">导出花名册</el-dropdown-item>
                <el-dropdown-item command="exportStudentsDetail">导出学员学习明细</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button type="primary" icon="el-icon-upload2" @click="exportStudents">导出学员</el-button> -->
          </div>
          <div class="right">
            <span @click="switchBtn">
              <d2-icon-svg name="switch"
                           class="svgCss" />
            </span>
            <el-radio-group v-model="isRemove"
                            @change="getRosterList">
              <el-radio-button label="2">在读学员</el-radio-button>
              <el-radio-button label="1">已移除</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
      <template slot="photoUrlSlot"
                slot-scope="scope">
        <div class="firstColumn">
          <el-avatar :size="50"
                     :src="scope.row.photoUrl">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-avatar>
          <span class="firstColumNname">{{scope.row.studentName}}</span>
        </div>
      </template>
      <template slot="learnedCourseCountSlot"
                slot-scope="scope">
        {{scope.row.learnedCourseCount}}/{{scope.row.totalCourseCount}}
      </template>
      <template slot="learnedLiveCountSlot"
                slot-scope="scope">
        {{scope.row.learnedLiveCount}}/{{scope.row.totalLiveCount}}
      </template>
      <template slot="testScoreSlot"
                slot-scope="scope">
        <span style="margin-right:10px">{{scope.row.testScore}}</span>
        <el-tag type="success"
                v-if="scope.row.isPass=='合格'"
                effect="plain">合格</el-tag>
        <el-tag type="danger"
                v-if="scope.row.isPass=='不合格'"
                effect="plain">不合格</el-tag>
      </template>
      <template slot="operationSlot"
                slot-scope="scope">
        <el-button type="text"
                   @click="detailBtn(scope.row)">详情</el-button>
        <el-button type="text"
                   @click="removeBtn(scope.row)"
                   v-if="isRemove==2">移除学员</el-button>
        <el-button type="text"
                   @click="renewBtn(scope.row)"
                   v-if="isRemove==1">恢复在读</el-button>
      </template>
    </d2-crud-x>
  </div>
</template>
<script>
/* eslint-disable */ 

import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { mapActions } from 'vuex'
import util from '@/libs/util'
export default {
  mixins: [d2CrudPlus.crud],
  props: {
    options: [],
    isDataPermission: false
  },
  data () {
    return {
      OptionS: [],
      className: '',
      isRemove: 2,
      classToCategoryVOList: [],
      importStudentsVisible: false,
      classId: '',
      innerVisible: false,
      props: {
        value: 'areaCode',
        label: 'name',
        // expandTrigger: 'hover',
        checkStrictly: true
      },
      address: [],
      addressCode: undefined,
      level: undefined,
      lazyProps: {
        lazy: true,
        checkStrictly: true,
        // expandTrigger: 'hover',
        lazyLoad: this.lazyLoad
      }
    }
  },
  created () {
    this.$api.getArea().then(res => {
      this.OptionS = res
    })
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    // lazyLoad (node, resolve) {
    //   if(node.children && node.children.length>0){
    //     node.children=[]
    //   }
    //   setTimeout(() => {
    //     const { level } = node;
    //     if(level==0){
    //       node.value=0
    //     }
    //     this.$api.getArea({parentCode:node.value}).then(res=>{
    //       const province=res.data.map((value,i)=>({
    //         value:value.areaCode,
    //         label:value.name,
    //         leaf: level >= 3
    //       }))
    //       resolve(province);
    //     })
    //   })
    // },
    // crud配置
    getCrudOptions () {
      return crudOptions(this)
    },
    // 查询
    pageRequest (query) {
      if (this.address.length > 0) {
        this.addressCode = this.address[this.address.length - 1]
        this.level = this.address.length - 1
        query.addressCode = this.addressCode
        query.level = this.level
      } else {
        query.addressCode = ''
        query.level = ''
      }
      query.classId = this.$route.query.classId
      query.isRemove = this.isRemove
      return this.$api.GET_ROSTER_LIST(query).then(item => {
        this.className = item.data.className
        this.classToCategoryVOList = item.data.classToCategoryVOList
        const data = item.data.studentInfoList
        return Promise.resolve({
          code: '1',
          data: data,
          msg: 'success'
        })
      })
    },
    switchBtn () {
      this.$emit('switchCard')
    },
    getRosterList () {
      this.doRefresh()
    },
    // 导入学员弹窗
    importStudents (e) {
      this.$emit('importStudents', e)
    },
    // 导出
    handleCommand (e) {
      if (e == 'exportStudents') {
        this.exportStudents()
      }
      if (e == 'exportStudentsDetail') {
        this.exportStudentsDetail()
      }
    },
    // 导出学员
    exportStudents () {
      const searchData = this.getSearch().getForm()
      searchData.addressCode = this.addressCode
      searchData.level = this.level
      this.$api.EXPORT_STUDENT_INFO({
        classId: this.$route.query.classId,
        isRemove: this.isRemove,
        needStudyTime: 1,
        appId: util.cookies.get('appId'),
        ...searchData
      }).then(res => {
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: '创建下载任务成功，请前往任务中心进行查看!'
          })
        }
      })
    },
    // 导出班级学员进度
    exportStudentsDetail () {
      const searchData = this.getSearch().getForm()
      searchData.addressCode = this.addressCode
      searchData.level = this.level
      this.$api.EXPORT_STUDENT_DETAIL({
        classId: this.$route.query.classId,
        appId: util.cookies.get('appId'),
        isRemove: this.isRemove,
        ...searchData
      }).then(res => {
        // window.location = res.data
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: '创建下载任务成功，请前往任务中心进行查看!'
          })
        }
      })
    },
    resetSearch () {
      this.address = []
      this.addressCode = undefined
      this.level = undefined
    },
    detailBtn (row) {
      this.$emit('jumpDetail', row.studentId)
    },
    removeBtn (row) {
      this.$emit('removeBtnList', row.studentId)
    },
    renewBtn (row) {
      this.$emit('renewBtnList', row.studentId)
    },
    isRenewShow () {
      if (this.isRemove == 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped>
.opbutton {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
}
.opbutton-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.svgCss {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
  fill: #888888;
}
.svgCss:hover {
  fill: #1e90ff;
}
.right {
  display: flex;
  align-items: center;
}
.firstColumn {
  display: flex;
  align-items: center;
}
.firstColumNname {
  margin-left: 10px;
}
</style>
