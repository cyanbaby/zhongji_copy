<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <el-form ref="form"
             :model="form"
             label-width="110px"
             style="width:62%"
             :rules="rules">
      <el-form-item label="直播场景"
                    prop="newScene">
        <ul class="live-list"
            v-if="$route.query.id">
          <li v-for="(item,i) in livescene"
              :key="i"
              :class="{blue:item.sceneCode==selectIndex}">
            <div class="title">{{item.sceneName}}</div>
            <div class="tip">{{item.description}}</div>
            <div class="icon">
              <i class="el-icon-check"></i>
            </div>
          </li>
        </ul>
        <ul class="live-list"
            v-else>
          <li v-for="(item,i) in livescene"
              :key="i"
              @click="doSelect(item.sceneCode,item)"
              :class="{blue:item.sceneCode==selectIndex}">
            <div class="title">{{item.sceneName}}</div>
            <div class="tip">{{item.description}}</div>
            <div class="icon">
              <i class="el-icon-check"></i>
            </div>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="直播间名称"
                    prop="name">
        <el-input v-model="form.name"
                  @input="validName">
          <em slot="suffix">{{ form.name.length }} / 50</em>
        </el-input>
      </el-form-item>

      <el-form-item label="讲师"
                    prop="userId">
        <el-select filterable
                   v-model="form.userId"
                   placeholder="请选择讲师"
                   style="width:100%">
          <el-option v-for="(t,i) in teacherArr"
                     :key="i"
                     :label="t.memberName"
                     :value="t.userId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="直播分类">
        <el-cascader v-model="form.categoryIds"
                     :options="typeList"
                     style="width:100%"
                     :props="{
            label: 'categoryName',
            value: 'categoryId',
            emitPath: false,
            children: 'childrenLiveCategoryVO',
            multiple: true,
            checkStrictly: true,
          }"></el-cascader>
      </el-form-item>

      <el-form-item label="观看模板">
        <ul class="live-list add-pic"
            v-if="$route.query.id">
          <li v-for="(item,i) in tempData"
              class="temp"
              :key="i"
              :class="{blue:item.dictDataValue==tempIndex}">
            <img v-if="item.dictDataValue=='ppt'"
                 class="pic"
                 src="@/assets/images/ptt_video.png" />
            <img v-if="item.dictDataValue=='alone'"
                 class="pic"
                 src="@/assets/images/video.png" />
            <div class="title">{{item.dictDataName}}</div>
            <div class="icon">
              <i class="el-icon-check"></i>
            </div>
          </li>
        </ul>
        <ul class="live-list add-pic"
            v-else>
          <li v-for="(item,i) in tempData"
              class="temp"
              :key="i"
              @click="doTemp(item.dictDataValue)"
              :class="{blue:item.dictDataValue==tempIndex}">
            <img v-if="item.dictDataValue=='ppt'"
                 class="pic"
                 src="@/assets/images/ptt_video.png" />
            <img v-if="item.dictDataValue=='alone'"
                 class="pic"
                 src="@/assets/images/video.png" />
            <div class="title">{{item.dictDataName}}</div>
            <div class="icon">
              <i class="el-icon-check"></i>
            </div>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="直播延迟">
        <div style="color: #949494;">
          无延迟直播为付费功能请 联系客服 开通
        </div>
        <ul class="live-list">
          <li @click="doDelay(1)"
              class="temp"
              :class="{blue:1==delayIndex}">
            <div class="title">正常延迟3s</div>
            <div class="icon">
              <i class="el-icon-check"></i>
            </div>
          </li>
          <li class="temp"
              @click="vipClick">
            <div class="title">无延迟&lt;0.4s</div>
            <div class="icon">
              <i class="el-icon-check"></i>
            </div>
            <div class="no-open">未开通</div>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="连麦人数">
        <el-select v-model="form.linkMicLimit"
                   placeholder="请选择活动区域"
                   style="width:100%">
          <el-option v-for="(l,i) in linkArr"
                     :key="i"
                     :label="l.label"
                     :value="l.value"></el-option>
        </el-select>
        <div style="color: #949494;">
          不使用连麦则无法创建嘉宾角色
        </div>
      </el-form-item>
      <el-form-item label="开播时间">
        <el-date-picker class="date-picker"
                        :editable="false"
                        v-model="form.startTime"
                        type="datetime"
                        style="width:100%"
                        placeholder="选择开播时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format='yyyy-MM-dd HH:mm:ss'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预计时长"
                    prop="planDuration">
        <el-input v-model="form.planDuration">
          <span slot="append">分钟</span>
        </el-input>
      </el-form-item>
      <el-form-item label="直播封面"
                    prop="coverImg">
        <el-upload :show-file-list="false"
                   :action="url"
                   :before-upload="beforeUpload"
                   accept=".png, .gif, .jpg, .jpeg, .webp, .bmp, .svg, .ico"
                   :headers="{
                  Authorization: token,
                   OpDomain:opDomain
              }"
                   :on-success="handleAvatarSuccess"
                   class="avatar-uploader">
          <img v-if="form.coverImg"
               :src="form.coverImg"
               width="100"
               height="100" />
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <div class="flex-box">
        <el-form-item label="课时"
                      prop="courseHour">
          <el-input v-model="form.courseHour" />
        </el-form-item>
        <el-form-item class="courseRules"
                      label="课时认定规则"
                      prop="courseFinishRatio">
          <div style="display: flex;align-items: center;">
            <el-input type="tel"
                      v-model="form.courseFinishRatio" />
            <div style="padding-left: 12px;">%&nbsp;&nbsp;直播时长</div>

          </div>

        </el-form-item>
        <div style="position: absolute; right: 0; top:55px">（注：学员观看时长达到实际直播的时长的{{form.courseFinishRatio}}%，则视作完成该次直播学习）</div>
      </div>
      <el-form-item>
        <el-button type="primary"
                   style="margin-top: 30px"
                   @click="onSubmit">{{$route.query.id?"保存":"保存并创建直播间"}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import {
  globalOpdomain
} from '@/utils/index'
import {
  mapActions
} from 'vuex'
import {
  d2CrudPlus
} from 'd2-crud-plus'
import util from '@/libs/util'
const {
  promiseBaseUrl
} = document.querySelector('body').dataset
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    const sceneCodeValid = (rule, value, callback) => {
      if (!this.form.newScene) {
        callback(new Error('请选择直播场景'))
      } else {
        callback()
      }
    }
    const coverImgValid = (rule, value, callback) => {
      if (!this.form.coverImg) {
        callback(new Error('请选择直播封面'))
      } else {
        callback()
      }
    }
    return {
      Status: true,
      opDomain: globalOpdomain(),
      token: util.cookies.get('token'),
      url: `${promiseBaseUrl || process.env.VUE_APP_API}/baseservice/upload/uploadimg`,
      form: {
        name: '',
        courseHour: 0, // 课时
        courseFinishRatio: 80, // 课时认定规则
        coverImg: '', // 直播封面
        planDuration: 60, // 预计时长
        startTime: '', // 开播时间
        linkMicLimit: 0, // 连麦人数
        isDelay: 1, // 直播延时
        template: 'ppt', // 观看模板
        categoryIds: ['2022011905010000000112'], // 直播分类
        newScene: 'topclass' // 直播场景
      },
      linkArr: [{
        label: '不使用连麦',
        value: 0
      }, {
        label: '1v1',
        value: 1
      }, {
        label: '1v2',
        value: 2
      }, {
        label: '1v3',
        value: 3
      }],
      rules: {
        newScene: [{
          required: true,
          message: '请选择直播场景',
          trigger: 'click',
          validator: sceneCodeValid
        }],
        name: [{
          required: true,
          message: '请输入直播间名称',
          trigger: 'blur'
        }],
        userId: [{
          required: true,
          message: '请选择讲师',
          trigger: 'change'
        }],
        coverImg: [{
          required: true,
          message: '请选择直播封面',
          trigger: 'click',
          validator: coverImgValid
        }],
        courseHour: [{
          required: true,
          message: '请输入课时',
          trigger: 'blur'
        }],
        courseFinishRatio: [{
          pattern: /^[1-9]([0-9])*$/,
          message: '请输入整数',
          trigger: ['blur', 'change']
        }, {
          required: true,
          message: '请输课时认定规则',
          trigger: 'blur'
        }]
      },
      tempIndex: 'ppt', // ppt 文档加视频  alone 纯视频
      selectIndex: 'topclass', // train 企业培训   alone活动营销
      delayIndex: 1,
      livescene: [],
      tempData: [],
      teacherArr: [],
      typeList: []

    }
  },
  mounted () {
    this.getDict()
    this.getlivescene()
    this.ORG_USER_GET()
    this.getColumn()
    if (this.$route.query.id) {
      this.queryChannelAllInfo()
      this.$route.meta.title = '编辑直播间'
    } else {
      this.$route.meta.title = '创建直播间'
    }
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    queryChannelAllInfo () {
      this.$api.queryChannelAllInfo({
        liveChannelId: this.$route.query.id
      }).then(({
        data
      }) => {
        this.form = data
        this.selectIndex = data.newScene
        this.tempIndex = data.template
        this.delayIndex = data.isDelay
        this.form.liveChannelId = this.$route.query.id
        this.form.userId = data.teacher.userId
        this.form.categoryIds = data.categoryIdList
      })
    },
    beforeUpload (file) {
      const suffix = this.getFileType(file.name) // 获取文件后缀名
      const suffixArray = ['jpg', 'png', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'ico'] // 限制的文件类型，根据情况自己定义
      if (suffixArray.indexOf(suffix) === -1) {
        this.$message({
          message: '文件格式错误',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      return suffixArray
    },
    getFileType (name) {
      const startIndex = name.lastIndexOf('.')
      if (startIndex !== -1) {
        return name.slice(startIndex + 1).toLowerCase()
      } else {
        return ''
      }
    },
    getColumn () {
      this.$api.QUERY_LIVE_MENU().then(({
        data
      }) => {
        this.typeList = data
      })
    },
    ORG_USER_GET () {
      this.$api.ORG_USER_GET({
        pageNum: 1,
        pageSize: 1000
      }).then(res => {
        this.teacherArr = res.data.list
      })
    },
    getlivescene () {
      this.$api.getlivescene().then(res => {
        this.livescene = res.data
      })
    },
    onSubmit () {
      if (!this.Status) {
        return
      }
      this.Status = false
      const selectTeacher = this.teacherArr.filter(res => res.userId == this.form.userId)[0]
      this.form.teacher = {
        userId: selectTeacher && selectTeacher.userId,
        userName: selectTeacher && selectTeacher.memberName,
        roleHeadImg: selectTeacher && selectTeacher.memberHeaderUrl
      }
      const tagName = this.$route.fullPath
      this.$refs.form.validate((valid, data) => {
        if (valid) {
          if (this.form.liveChannelId) {
            this.$api.editchannel({
              ...this.form,
              startTime: new Date(this.form.startTime).getTime()
            }).then(res => {
              if (res.code == 1) {
                this.$notify({
                  title: '提示',
                  message: '修改成功!',
                  type: 'success'
                })
                if (this.$route.query.jumpUrlType == 1) {
                  this.close({
                    tagName
                  }).then(item => {
                    this.$router.push({
                      path: 'live_setting',
                      query: {
                        id: this.$route.query.id,
                        releaseStatus: 0
                      }
                    })
                  })
                } else {
                  this.close({
                    tagName
                  }).then(item => {
                    this.$router.push({
                      path: '/live/list'
                    })
                  })
                }
              } else {
                this.$message.warning(res.msg)
              }
            })
          } else {
            this.$api.addchannel({
              ...this.form,
              startTime: new Date(this.form.startTime).getTime()
            }).then(res => {
              if (res.code == 1) {
                this.$notify({
                  title: '提示',
                  message: '保存成功!',
                  type: 'success'
                })
                this.close({
                  tagName
                }).then(item => {
                  this.$router.push({
                    path: '/live/live_setting',
                    query: {
                      id: res.data,
                      releaseStatus: 0
                    }

                  })
                })
              } else {
                this.$message.warning(res.msg)
              }
            })
          }
        } else {
          return false
        }
      })
      setTimeout(() => {
        this.Status = true
      }, 5000)
    },
    // 上传
    handleAvatarSuccess (val) {
      if (val.code === '1') {
        this.form.coverImg = val.data
        this.$forceUpdate()
        this.$refs.form.clearValidate('coverImg')
        this.$notify({
          title: '提示',
          message: '上传成功!',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: val.msg,
          type: 'warning'
        })
      }
    },
    validName () {
      if (this.form.name.length > 50) {
        this.form.name = this.form.name.slice(0, 50)
      }
    },
    doDelay (i) {
      this.form.isDelay = i
      console.log(this.form.isDelay)
      this.delayIndex = i
    },
    vipClick () {
      this.$notify({
        title: '提示',
        message: '无延迟直播为付费功能,请联系客服开通',
        type: 'warning'
      })
    },
    doTemp (value) {
      this.form.template = value
      console.log(this.form.template)
      this.tempIndex = value
    },
    doSelect (i, item) {
      this.form.newScene = item.sceneCode
      this.$refs.form.clearValidate('newScene')
      this.selectIndex = i
    },
    getDict () {
      this.$api.SETTING_GET_DICT({
        typeCode: 'live_template'
      }).then(res => {
        this.tempData = res.data
      })
    }
  }
}
</script>

<style lang="scss">
.el-picker-panel__footer .el-button--text {
  display: none !important;
}

.live-list {
  display: flex;

  .no-open {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 2px;
    line-height: auto;
    border-radius: 2px;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
  }

  li {
    position: relative;
    overflow: hidden;
    min-width: 250px;
    height: 100px;
    padding: 15px;
    margin-right: 20px;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid #cfd8dc;

    .title {
      font-weight: bold;
      font-size: 18px;
    }

    .tip {
      color: #757575;
    }
  }

  .icon {
    display: none;
  }

  li.temp {
    height: 60px;
    padding: 0;
    display: flex;
    align-items: center;

    .title {
      width: 100%;
      text-align: center;
      font-weight: normal;
    }
  }
}

.add-pic {
  li.temp {
    // display: inline-block;
    // //height: auto;
    // text-align: center;
    .pic {
      width: 80px;
      display: inline-block;
      padding-left: 30px;
    }
  }
}

.blue {
  border: 2px solid #4598f9 !important;

  .icon {
    display: block !important;
    width: 30px;
    height: 33px;
    background: #4598f9;
    transform: rotateZ(45deg);
    position: absolute;
    right: -15px;
    bottom: -15px;

    i {
      width: 12px;
      height: 9px;
      color: #fff;
      transform: rotateZ(-60deg) translateX(-1px);
    }
  }
}

.flex-box {
  display: flex;
  align-items: center;
  position: relative;
  .el-form-item {
    flex: 2;
  }

  .courseRules {
    flex: 2;
    margin-left: 20px;

    .el-form-item__label {
      width: auto !important;
    }

    .el-input {
      width: 50%;
    }
  }
}
</style>
