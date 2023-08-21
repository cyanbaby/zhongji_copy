<template>
<d2-container class="specific" style="overflow: hidden;">
    <template slot="header">
      <span class="page-title">{{this.$route.meta.title}}</span>
      <d2-helper title='帮助文档'>
        <div>
            <d2-link-btn
            title='文档链接'
            link='http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html'
            />
        </div>
        </d2-helper>
    </template>
    <el-container style="height:100%">
        <el-aside width="210px" class="aside">
            <div style="width:178px;margin:0 auto;margin-top:23px">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤" style="margin-bottom: 10px;"></el-input>
            <el-tree
            :data="menu"
            :props="menuProps"
            node-key="id"
            :filter-node-method="filterNode"
            ref="classTree"
            style="overflow:auto;"
            @node-click="getMenu"
            :expand-on-click-node="false"
            :highlight-current="true"
            >
            <span class="custom-tree-node" slot-scope="{data}">
              <el-tooltip
                  :content="data.catValue"
                  :disabled="isShowTooltip"
                  :open-delay="300"
                  placement="top"
                  effect="light"
              >
                  <span @mouseover="mouseOver($event)" class="over-ellipsis">{{ data.catValue }}</span>
              </el-tooltip>
            </span>
            </el-tree>
            </div>
        </el-aside>
        <el-container class="main">
          <el-header style="height: 110px;margin-top: 10px;">
          <el-row>
              <el-form ref="searchForm" :model="searchForm" label-width="90px" :inline="true" @submit.native.prevent>
              <el-form-item label="班级名称">
                  <el-input v-model="searchForm.className" @keypress.13.native="queryClassListByName"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="queryClassListByName" size="medium">查询</el-button>
                  <el-button icon="el-icon-refresh-right" @click="reset" size="medium">重置</el-button>
              </el-form-item>
              </el-form>
          </el-row>
            <div class="opbutton">
              <el-button type="primary" @click="addClass" icon="el-icon-plus" style="margin-bottom: 15px;" size="medium">新建班级</el-button>
                  <el-radio-group v-model="classStatus" style="margin-bottom: 15px;" @change="queryClassListByState" size="medium">
                      <el-radio-button label="">全部</el-radio-button>
                      <el-radio-button label="2">已发布</el-radio-button>
                      <el-radio-button label="3">待发布</el-radio-button>
                      <el-radio-button label="1">未发布</el-radio-button>
                  </el-radio-group>
              </div>
            </el-header>
            <el-main>
                <el-row v-loading="mainLoading">
                   <el-empty description="暂无数据" v-if="total==0"></el-empty>
                   <el-col :span="12" v-for="(item,index) in classInfo" :key="index" class="peculiar">
                    <el-card class="box-card">
                      <el-row :gutter="10">
                            <el-col :span="8" style="height: 13vh;">
                              <div class="imgControl">
                                <img src="@/assets/images/released.png" class="state" v-if="item.classStatus==2"/><!-- 已发布 -->
                                <img src="@/assets/images/unreleased.png" class="state" v-if="item.classStatus==1"/><!-- 未发布 -->
                                <img src="@/assets/images/toBeReleased.png" class="state" v-if="item.classStatus==3"/><!-- 待发布 -->
                                <img :src=item.coverImgUrl style="width: 100%;height: 100%;object-fit: cover;"/>
                              </div>
                            </el-col>
                            <el-col :span="15" style="height: 12vh;display: flex;flex-direction:column;">
                              <div style="margin-bottom: 1.5vh;">
                                <span class="className">
                                  <el-tooltip class="item" effect="light" placement="bottom" :open-delay=500>
                                    <div slot="content">{{item.className}}</div>
                                    <span>{{item.className}}</span>
                                  </el-tooltip>
                                  </span>
                              </div>
                              <div style="margin-bottom: 0.1vh;">
                                <div class="fontCss">分类：
                                  <el-tooltip class="item" effect="light" placement="bottom" :open-delay=500>
                                    <div slot="content">{{item.classCategoryNames}}</div>
                                    <span>{{item.classCategoryNames}}</span>
                                  </el-tooltip>
                                </div>
                              </div>
                              <div style="margin-bottom: 0.1vh;">
                                <div class="fontCss" v-if="item.signUpEffectiveTime">报名有效期：
                                  <el-tooltip class="item" effect="light" placement="bottom" :open-delay=1000>
                                    <div slot="content">{{item.signUpEffectiveTime}}</div>
                                    <span>{{item.signUpEffectiveTime}}</span>
                                  </el-tooltip>
                                </div>
                              </div>
                              <div>
                                <div class="fontCss" v-if="item.studyEffectiveTime">学习有效期：
                                  <el-tooltip class="item" effect="light" placement="bottom" :open-delay=1000>
                                    <div slot="content">{{item.studyEffectiveTime}}</div>
                                    <span>{{item.studyEffectiveTime}}</span>
                                  </el-tooltip>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="1" style="margin-left:-9px">
                              <el-dropdown>
                                <span class="el-dropdown-link">
                                  <d2-icon-svg name="more" class="moreCss"/>
                                </span>
                                <el-dropdown-menu slot="dropdown" class="peculiar_menu">
                                  <el-dropdown-item>
                                    <div class="rankCss" @click="editClass(item.classId)">
                                      <d2-icon-svg name="edit" class="svgCss"></d2-icon-svg>
                                      <span class="describeCss">编辑</span>
                                    </div>
                                  </el-dropdown-item>
                                  <el-dropdown-item>
                                    <div class="rankCss" @click="modifState(item.classId,item.classStatus,item.publishTime)">
                                      <d2-icon-svg name="state" class="svgCss"/>
                                      <span class="describeCss">修改状态</span>
                                    </div>
                                  </el-dropdown-item>
                                  <!-- <el-dropdown-item>
                                    <div class="rankCss" @click="jumpTask(item.classId,item.className)">
                                      <d2-icon-svg name="task" class="svgCss"/>
                                      <span class="describeCss">班级任务</span>
                                    </div>
                                  </el-dropdown-item> -->
                                  <el-dropdown-item>
                                    <div class="rankCss" @click="jumpPreview(item.classId)">
                                      <d2-icon-svg name="link" class="svgCss"/>
                                      <span class="describeCss">预览</span>
                                    </div>
                                  </el-dropdown-item>
                                  <el-dropdown-item>
                                    <div class="rankCss" @click="jumpRoster(item.classId)">
                                      <d2-icon-svg name="roster" class="svgCss"/>
                                      <span class="describeCss">花名册</span>
                                    </div>
                                  </el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </el-col>
                        </el-row>
                        <el-row>
                          <div style="display:flex;margin: 1vh 0;align-items:center;">
                            <el-col :span="2" class="peculiar">
                              <el-button icon="el-icon-arrow-left"
                              @click="leftmove(item.classAppConfigVOList,index)"
                              size="mini"
                              v-if="item.classAppConfigVOList.filter(res=>res.confStatus == 1).length>=num"
                              :disabled="(moveObj[index] && moveObj[index].count)?false:true"
                              >
                              </el-button>
                            </el-col>
                            <el-col :span="20">
                              <el-row style="margin: 1vh 0;overflow: hidden;" :gutter="13">
                              <el-col v-for="(app,index) in item.classAppConfigVOList" :key="index" :span="3">
                                <div class="applicationCssAdd"  v-if="app.confStatus==1" @click="appConfig(app.appId,item.classId,item.className,item.coverImgUrl)">
                                <img :src="app.appIconUrl" class="application" style=""/>
                                <!-- <el-tooltip
                                    :content="app.appName"
                                    :disabled="appisShowTooltip"
                                    :open-delay="300"
                                    placement="bottom"
                                    effect="light"
                                >
                                    <span class="applyNameCss" @mouseover="mouseOver($event)">{{app.appName}}</span>
                                </el-tooltip> -->
                                <span class="applyNameCss" v-if="app.appName.length<=2">{{app.appName}}</span>
                                <el-tooltip
                                  v-else
                                  :content="app.appName"
                                  placement="bottom"
                                  effect="light"
                                >
                                  <span class="applyNameCss">{{app.appName.substring(0, 2) + "..."}}</span>
                                </el-tooltip>
                                </div>
                              </el-col>
                              </el-row>
                            </el-col>
                            <span class="given"><el-divider direction="vertical"></el-divider></span>
                            <el-col style="margin: 1vh 0;" :span="3">
                              <div>
                                <div class="applicationCss" @click="appManage(item.classId)">
                                <img src="@/assets/images/application.png" class="application"/>
                                <span class="applyNameCss">应用管理</span>
                                </div>
                              </div>
                            </el-col>
                            <el-col style="margin: 1vh 0;" :span="3">
                              <div>
                                <div class="applicationCss" @click="jumpTask(item.classId,item.className)">
                                <img src="@/assets/images/task.png" class="application"/>
                                <span class="applyNameCss">班级任务</span>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="2" class="peculiar">
                              <el-button icon="el-icon-arrow-right"
                              @click="rightmove(item.classAppConfigVOList,index)"
                              size="mini"
                              v-if="item.classAppConfigVOList.filter(res=>res.confStatus == 1).length>=num"
                              :disabled="(moveObj[index]?moveObj[index].count:0)+num == item.classAppConfigVOList.filter(res=>res.confStatus == 1).length"
                              >
                              </el-button>
                            </el-col>
                          </div>
                        </el-row>
                    </el-card>
                    </el-col>
                    <el-dialog
                    title="预览班级"
                    :visible.sync="previewDialog"
                    :close-on-click-modal=false
                    width="35%">
                    <div class="websiteCss">
                    <span>http://user.daxueyun.cn:82/#/classdetail?classId={{classId}}</span>
                    <el-button size="mini" style="margin-left:10px" @click="copyUrl">复制</el-button>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="previewDialog = false">取 消</el-button>
                    </span>
                    </el-dialog>
                </el-row>
                <el-row>
                  <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="total"
                  :page-size="paging.pageSize"
                  style="float:right"
                  @current-change="handleCurrentChange"
                  :hide-on-single-page="true"
                  >
                  </el-pagination>
                </el-row>
            </el-main>
            <el-dialog
            title="应用管理"
            :visible.sync="appManegeDialog"
            :close-on-click-modal=false
            width="20%"
            >
            <div class="manage_contanier">
              <div class="manage" v-for="(app,i) in appManegeShow" :key="i">
                <div class="appManege">
                <img :src="app.appIconUrl" class="applicationDialog"/>
                <span class="applyCss">{{app.appName}}</span>
                </div>
                <el-switch
                  v-model="app.confStatus"
                  active-value="1"
                  inactive-value="2"
                  >
                </el-switch>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="manegeAppSave" :loading="appLoading">保存</el-button>
            </span>
          </el-dialog>

          <el-dialog
            title="修改状态"
            :visible.sync="modifStateDialog"
            :close-on-click-modal=false
            width="45%"
            >
            <el-form ref="modifStateForm" :model="modifStateForm" label-width="90px" :rules="modifStateRules">
              <el-form-item label="修改状态" prop="classStatus">
                <el-radio-group v-model="modifStateForm.classStatus">
                  <div style="margin-top:15px">
                    <el-radio :label="2">立即发布</el-radio>
                    <el-checkbox v-model="modifStateForm.isSyncTask" v-if="modifStateForm.classStatus==2">影响到所有学员(如勾选此按钮，代表原先已入班学员的学习任务会进行同步更新)</el-checkbox>
                  </div>
                  <div style="margin-top:15px">
                    <el-radio :label="3">定时发布</el-radio>
                    <el-form-item prop="time" style="display: inline-block;" :required="isrequired">
                      <el-date-picker
                      v-model="modifStateForm.time"
                      type="datetime"
                      placeholder="选择日期时间"
                      :disabled="modifStateForm.classStatus!=3"
                      :clearable="false"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <div style="margin-top:15px"><el-radio :label="1">取消发布</el-radio></div>
                </el-radio-group>
                 <div class="notes">
                <i class="el-icon-warning-outline"></i>
                发布开关控制课程是否会在网站显示
              </div>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="modifStateBtn" :loading="stateloading">保存</el-button>
            </span>
          </el-dialog>
        </el-container>
    </el-container>
</d2-container>
</template>
<script>
import { parseTime } from '@/utils/index'
import { findAllItemInArrayByProperty2 } from '@/utils/array-utils'
export default {
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 18) {
        return value.slice(0, 18) + '...'
      }
      return value
    }
  },
  watch: {
    // 树形过滤
    filterText (val) {
      this.$refs.classTree.filter(val)
    }
  },
  data () {
    // 验证修改状态发布时间的函数
    const time = (rule, value, callback) => {
      // 当开始时间为空值且为必填时，抛出错误，反之通过校验
      if (this.modifStateForm.time === '' && this.isrequired) {
        callback(new Error('请选择日期'))
      } else {
        callback()
      }
    }
    return {
      filterText: '', // 树形过滤
      menu: [], // 班级分类
      menuProps: {
        label: 'catValue',
        value: 'catId',
        children: 'treeChild'
      },
      searchForm: {
        className: ''// 班级名称
      },
      classStatus: '',
      classInfo: [],
      previewDialog: false,
      total: 0,
      // currentPage: 1
      paging: {
        pageNum: 1,
        pageSize: 6
      },
      catId: '',
      appManegeDialog: false,
      appManegeShow: [],
      classId: '',
      moveIndex: '',
      modifStateDialog: false,
      modifStateForm: { // 修改状态表单
        classStatus: '',
        time: '',
        isSyncTask: false
      },
      modifStateRules: {
        classStatus: [
          { required: true, message: '请选择修改状态', trigger: 'change' }
        ],
        time: [{ validator: time }]
      },
      appLoading: false,
      stateloading: false,
      domain: '',
      mainLoading: true,
      // 选择开始时间大于等于当前时间
      pickerOptions: {
        disabledDate (time) {
          const dateTime = new Date()
          const startDateTime = dateTime.setDate(dateTime.getDate() - 1)
          const endDateTime = dateTime.setDate(dateTime.getDate() + 30000) // 30000为当前日期之后多少天
          return (
            time.getTime() < new Date(startDateTime).getTime() ||
            time.getTime() > new Date(endDateTime).getTime()
          )
        }
      },
      num: 9,
      moveObj: [],
      appisShowTooltip: false,
      isShowTooltip: false
    }
  },
  computed: {
    isrequired: function () {
      return this.modifStateForm.classStatus == 3
    }
  },
  created () {
    this.getMenuTree()
    this.queryClassList()
  },
  methods: {
    // 树形过滤
    filterNode (value, data) {
      if (!value) return true
      return data.catValue.indexOf(value) !== -1
    },
    // 查询班级分类目录
    getMenuTree () {
      this.$api.GET_CLASSIFY_LIST().then(res => {
        this.menu = res.data
      })
    },
    // 点击tree查询班级
    getMenu (val) {
      this.catId = val.catId
      this.paging.pageNum = 1
      this.queryClassList()
    },
    // 根据班级名查询
    queryClassListByName () {
      this.paging.pageNum = 1
      this.queryClassList()
    },
    // 根据状态查询
    queryClassListByState () {
      this.paging.pageNum = 1
      this.queryClassList()
    },
    // 分页查询班级信息
    queryClassList () {
      this.mainLoading = true
      this.$api.GET_CLASS_LIST({
        ...this.paging,
        catId: this.catId,
        ...this.searchForm,
        classStatus: this.classStatus
      }).then(res => {
        this.total = res.data.total
        this.paging.pageNum = res.data.currentPage
        this.classInfo = res.data.list
        this.mainLoading = false
      })
    },
    handleCurrentChange (val) {
      this.paging.pageNum = val
      this.queryClassList()
    },
    // 重置
    reset () {
      this.paging.pageNum = 1
      this.searchForm.className = ''
      this.queryClassList()
    },
    // 新增班级
    addClass () {
      this.$router.push({
        path: '/educational/addclass'
      })
    },
    // 编辑班级
    editClass (classId) {
      this.$router.push({
        path: '/educational/addclass',
        query: {
          classId: classId
        }
      })
    },
    /* // 删除班级
    deleteClass (item) {
      this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.DEL_CLASSINFO({
          classId: item.classId
        }).then(() => {
          this.queryClassList()
          this.$message({
            message: '班级删除成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }, */
    // 预览弹窗
    preview (classId) {
      this.classId = classId
      this.previewDialog = true
      const str = location.href
      const arr = str.split('/')
      let domain = location.host
      arr.forEach((item, index) => {
        if (item === 'd') {
          domain = arr[index + 1]
        }
      })
      this.domain = domain
    },
    // 复制链接按钮
    copyUrl () {
      const url = 'http://user.daxueyun.cn:82/#/classdetail?classId=' + this.classId
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
    // 预览直接跳转
    jumpPreview (classId) {
      const url = this.$router.resolve({
        path: '/detail',
        query: {
          classId: classId
        }
      })
      window.open(url.href)
    },
    // 应用管理弹窗
    appManage (classId) {
      this.classId = classId
      this.$api.GET_CLASS_APP({
        classId: classId
      }).then(res => {
        this.appManegeShow = res.data
      })
      this.appManegeDialog = true
    },
    // 保存应用设置
    manegeAppSave () {
      this.appLoading = true
      this.$api.MANAGEAPP({
        formList: this.appManegeShow
      }).then(() => {
        this.appManegeDialog = false
        this.queryClassList()
        this.$message({
          message: '应用设置成功',
          type: 'success'
        })
        this.appLoading = false
      }).catch(e => {
        this.appLoading = false
      })
    },
    // 跳转配置页面
    appConfig (appId, classId, className, coverImgUrl) {
      if (appId == '5007' || appId == '5052') { // 报名
        this.$router.push({
          path: '/educational/signupconfig',
          query: {
            classId: classId,
            activityName: className,
            bannerImgUrl: coverImgUrl
          }
        })
      }
      if (appId == '5014' || appId == '5103') { // 学习
        this.$router.push({
          path: '/educational/Learnconfig',
          query: {
            classId: classId,
            activityName: className
          }
        })
      }
      if (appId == '5016' || appId == '5107') { // 证书
        this.$router.push({
          path: '/educational/certificate',
          query: {
            classId: classId
          }
        })
      }
      if (appId == '5006' || appId == '5053' || appId == '5104') { // 考务&&考试
        this.$router.push({
          path: '/educational/examaffair',
          query: {
            classId: classId,
            examActivityName: className
          }
        })
      }
    },
    // 跳转花名册页面
    jumpRoster (classId) {
      this.$router.push({
        path: '/educational/studentroster',
        query: {
          classId: classId
        }
      })
    },
    // 跳转班级任务界面
    jumpTask (classId, className) {
      this.$router.push({
        path: '/educational/classtask',
        query: {
          classId: classId,
          className: className
        }
      })
    },
    // 修改状态弹窗
    modifState (classId, classStatus, publishTime) {
      console.log('modifState -> publishTime', publishTime)
      this.classId = classId
      this.modifStateForm.classStatus = classStatus
      this.modifStateForm.time = ''
      if (classStatus == 3) {
        this.$set(this.modifStateForm, 'time', new Date(publishTime))
      }
      this.modifStateDialog = true
    },
    // 保存修改状态
    modifStateBtn () {
      this.$refs.modifStateForm.validate((valid) => {
        if (valid) {
          const publishTime = parseTime(this.modifStateForm.time)
          this.stateloading = true
          this.$api.UPDATE_STATE({
            classId: this.classId,
            classStatus: this.modifStateForm.classStatus,
            publishTime: publishTime,
            isSyncTask: this.modifStateForm.isSyncTask
          }).then(() => {
            this.modifStateDialog = false
            this.queryClassList()
            this.$message({
              message: '状态修改成功',
              type: 'success'
            })
            this.stateloading = false
          }).catch(e => {
            this.stateloading = false
          })
        } else {
          console.log('校验失败，请按要求正确填写')
          return false
        }
      })
    },
    // 点击左箭头
    leftmove (arr, i) {
      this.moveObj[i].count -= 1
      const direction = 'left'
      this.scrollImg(direction, arr)
    },
    // 点击右箭头
    rightmove (arr, i) {
      if (!this.moveObj[i]) {
        this.moveObj[i] = {}
      }
      if (this.moveObj[i].count) {
        this.moveObj[i].count += 1
      } else {
        this.moveObj[i].count = 1
      }
      const direction = 'right'
      this.scrollImg(direction, arr)
    },
    scrollImg (direction, arr) {
      const newArr = findAllItemInArrayByProperty2(arr, '1', 'confStatus')
      // const spareArr = []
      if (direction === 'left') {
        const last = newArr.pop()
        newArr.unshift(last)
      } else {
        const first = newArr.shift()
        newArr.push(first)
      }
    },
    // 超出显示提示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
      // this.appisShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    }
  }
}
</script>
<style>
.el-tree-node__content{
  height: 40px;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    color: #1E90FF;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .el-tree-node__expand-icon {
    color: #1E90FF;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .el-tree-node__expand-icon.is-leaf {
    color: transparent;
}
.peculiar .box-card{
    margin-bottom: 3vh;
    width: 96%;
    height: 26vh;
}
.peculiar .el-card__body {
  padding: 2vh 1vw;
}
.given .el-divider--vertical{
  height: 7.5vh;
  margin: 1vh;
}
.peculiar_menu .el-dropdown-menu__item {
    padding: 0;
}
.peculiar .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    cursor: not-allowed;
    background-image: none;
    background-color: rgba(170, 170, 170, 0.1);
    border-color: #EBEEF5;
}
</style>

<style >
.specific .main{
  border: 1px solid #CFD7E5;
  padding-top:10px ;
  background: white;
  margin: 10px 10px 20px 10px;
}
.aside{
  border: 1px solid #CFD7E5;
  margin: 10px 0 20px 10px;
  background: white;
  overflow-x:hidden;
}
.el-radio-button__inner {
    background:rgba(30, 144, 255, 0.08)
}
.className{
    font-size: 2.6vmin;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #222222;
    max-width: 100%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.fontCss{
    font-size: 1.9vmin;
    font-weight: 400;
    color: #888888;
    line-height: 3vmin;
    max-width: 100%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.application{
    width: 34px;
    height: 34px;
    border-radius: 4px;
    object-fit: cover;
}
.applicationDialog{
  /* width: 70%; */
  width: 34px;
  height: 34px;
  border-radius: 4px;
}
.describeCss{
    font-size: 1.9vmin;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #666666;
}
.operationCss{
    display: flex;
    flex-direction: column;
    margin-left: 20%;
}

.moreCss{
    width: 2vw;
    height: 3vh;
    fill: #888888;
    cursor:pointer;
}
.moreCss:hover{
    fill: #1E90FF;
}
.svgCss{
    width: 1vw;
    height: 3vh;
    fill: #888888;
    margin-right: 3px;
    vertical-align:middle
}
.rankCss:hover .describeCss{
    color: #1E90FF;
    cursor:pointer;
}
.rankCss:hover .svgCss{
    fill: #1E90FF;
    cursor:pointer;
}
.applyCss{
    font-size: 1.9vmin;
    font-family: SimHei;
    font-weight: 400;
    color: #5C5C5C;
    margin-top: 1vh;
}
.applyNameCss{
    font-size: 14px;
    /* font-size: 1.9vmin; */
    font-family: SimHei;
    font-weight: 400;
    color: #5C5C5C;
    margin-top: 1vh;
    width: 100%;
    text-align: center;
    /* overflow: hidden; */
    white-space: nowrap;
    /* text-overflow: ellipsis; */
    display: block;
}
.applicationCss{
    width: 4vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor:pointer;
}
.applicationCssAdd{
    /* width: 4vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor:pointer;
}
.appManege{
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.manage_contanier{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 40vh;
}
.manage{
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
}
.state{
  position:absolute;
  top:5px;
  left: 15px;
  width: 10%;
}
.notes{
  color: #888888;
  margin-top: 15px;
}
.opbutton{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content:space-between;
}
.websiteCss{
  display: flex;
  flex-direction: row;
  align-items:center;
}
.imgControl{
  width: 100%;
  height: 100%;
}
.rankCss{
  padding: 0 20px;
  display: flex;
  align-items:center;
}
.over-ellipsis{
  width: 145px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
</style>
