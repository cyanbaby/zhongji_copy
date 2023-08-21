<!-- 课程详情页 -->
<template>
  <el-container>
    <el-header style="padding:0px;height:80px">
      <div class="subMenu"></div>
    </el-header>
    <el-main style="width: 100%;padding-top:0px;">
      <div class="class-detail-page">
      <div class="class-header">
          <el-image :src="classInfo.coverImgUrl" class="class-image">
            <div slot="error" class="image-slot">
              <el-empty description="图片加载失败"></el-empty>
            </div>
          </el-image>
        <ul class="header-center">
          <li class="title">{{ classInfo.className }}</li>
          <li class="header-content">
            <div>
              <span style="width: 300px;display: inline-block;">
                <span>报名时间</span>
                {{ classInfo.signUpEffectiveTime }}
              </span>
              <span>
                <span>学习时间</span>
                {{ classInfo.studyEffectiveTime }}
              </span>
            </div>
            <div>
              <span v-if="classInfo.classHour>0" style="width: 300px;display: inline-block;">
                <span style="padding-left:24px">课时</span>
                {{ classInfo.classHour }} 课时
              </span>
              <span>
                <span>所属分类</span>
                {{ classInfo.classCategoryNames }}
              </span>
            </div>
          </li>

          <li class="header-right">
          <div>
            <div v-if="classInfo.isConfigSignUp==1"><!-- 配置了报名才显示价格 -->
              <span
              class="study-price"
              v-if="classInfo.activityPrice && classInfo.activityPrice > 0">
              ￥{{ classInfo.activityPrice }}
              <!-- <span style="font-size:16px; color: #FF9428;">起</span> -->
              </span>
              <span class="study-price" v-else>免费</span>
            </div>
          </div>
          <div>
            <el-button
              v-if="(!classInfo.isSignUpSuccess)&&(classInfo.isConfigSignUp==1)"
              type="primary"
              @click="signup"
              disabled
              >立即报名</el-button
            >
            <el-button v-if="classInfo.isSignUpSuccess"  type="primary" @click="signup" disabled
              >马上学习</el-button
            >
          </div>

          </li>
        </ul>
      </div>
      <div class="class-content">
        <el-tabs v-model="activeName">
          <el-tab-pane label="班级介绍" name="first">
            <div style="color:#666666;padding-left:10px;" v-html="classInfo.classMemo">
            </div>
          </el-tab-pane>
          <el-tab-pane label="学习日程" name="second">
            <div v-for="(item, idx) in classInfo.studyPlan" :key="idx" style="padding-left:10px;">
              <h4 >{{ item.itemName }}</h4>
              <div v-if="item.showInfo">
                <li
                  class="show-item"
                  v-for="(kv, kIdx) in item.showInfo"
                  :key="sKey('p', idx, kIdx)"
                >
                  <span class="show-item"> {{ getPairKey(kv) }}</span
                  >: <span> {{ getPairValue(kv) }}</span>
                </li>
              </div>
              <!-- 学习任务 -->
              <div v-if="item.studyPlanType==2&&item.studyTaskDetails.length>0" class="studyTask">
                <div v-if="gropCourse.length>0">
                  <span class="taskName">课程</span>
                  <span v-if="gropCourse.length>1">
                    <span v-for="(item,i) in gropCourse" :key="i" class="group"
                    @click="doSelect(i, item)"
                    :class="{ blue: i == couSelectIndex }"
                    >
                      <span>{{item.classificationName}}({{item.gropArr.length}})</span>
                      <el-divider direction="vertical" v-if="i!=gropCourse.length-1"></el-divider>
                    </span>
                  </span>
                  <div class="choseCourse" v-if="isChoseCourse">自由选课</div>
                  <ul style="border:1px #EEEEEE solid;margin:20px 0">
                    <li
                      v-for="(s, sIdx) in courseArr" :key="sIdx"
                      :class="[{'show-border-bottom':sIdx != courseArr.length-1}]"
                      style="line-height:68px;font-size:16px;padding-left:17px;color:#444"
                    >
                      <div class="detail-index">{{sIdx+1}}</div>
                      {{ s.studyContentName }}
                    </li>
                  </ul>
                </div>
                <div v-if="liveArr.length>0">
                  <span class="taskName">直播</span>
                    <span v-if="gropLive.length>1">
                      <span v-for="(item,i) in gropLive" :key="i" class="group"
                      @click="doSelectLive(i, item)"
                      :class="{ blue: i == livSelectIndex }"
                      >
                        <span>{{item.classificationName}}({{item.gropArr.length}})</span>
                        <el-divider direction="vertical" v-if="i!=gropLive.length-1"></el-divider>
                      </span>
                    </span>
                  <ul style="border:1px #EEEEEE solid;margin:20px 0">
                    <li
                      v-for="(s, sIdx) in liveArr" :key="sIdx"
                      :class="[{'show-border-bottom':sIdx != liveArr.length-1}]"
                      style="line-height:68px;font-size:16px;padding-left:17px;color:#444"
                    >
                      <div class="detail-index">{{sIdx+1}}</div>
                      {{ s.studyContentName }}
                      <span class="time" v-if="s.startTime">{{ s.startTime }}开播</span>
                    </li>
                  </ul>
                </div>
                <div v-if="articleArr.length>0">
                  <span class="taskName">文章</span>
                    <span v-if="gropArticle.length>1">
                      <span v-for="(item,i) in gropArticle" :key="i" class="group"
                      @click="doSelectArticle(i, item)"
                      :class="{ blue: i == acrSelectIndex }"
                      >
                        <span>{{item.classificationName}}({{item.gropArr.length}})</span>
                        <el-divider direction="vertical" v-if="i!=gropArticle.length-1"></el-divider>
                      </span>
                    </span>
                  <ul style="border:1px #EEEEEE solid;margin:20px 0">
                    <li
                      v-for="(s, sIdx) in articleArr" :key="sIdx"
                      :class="[{'show-border-bottom':sIdx != articleArr.length-1}]"
                      style="line-height:68px;font-size:16px;padding-left:17px;color:#444"
                    >
                      <div class="detail-index">{{sIdx+1}}</div>
                      {{ s.studyContentName }}
                    </li>
                  </ul>
                </div>
                </div>
              <div v-else-if="item.detailList&&item.detailList.length>0">
                <ul style="border:1px #EEEEEE solid;margin-top:10px">
                  <li
                    v-for="(s, sIdx) in item.detailList"
                    :key="sKey('s', idx, sIdx)"
                    :class="[{'show-border-bottom':sIdx != item.detailList.length-1},{'show-background':(sIdx+1)%2 === 1}]"
                    style="line-height:68px;font-size:16px;padding-left:17px;color:#444"
                  >
                    <div class="detail-index">{{sIdx+1}}</div>
                    {{ s }}
                  </li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    </el-main>
  </el-container>
</template>

<script>
import { toPairs } from 'lodash'
import { globalUserDomainPrefix } from '@/utils/index'
export default {
  components: {},
  data () {
    return {
      classId: '',
      classInfo: {},
      activeName: 'first',
      loading: false,
      courseArr: [],
      liveArr: [],
      articleArr: [],
      gropCourse: [],
      gropLive: [],
      gropArticle: [],
      couSelectIndex: 0,
      livSelectIndex: 0,
      acrSelectIndex: 0,
      isChoseCourse: false
    }
  },
  created () { },
  mounted () {
    this.fetchInitData()
  },
  computed: {

  },
  methods: {
    getPairKey (kv) {
      const arr = toPairs(kv)
      return arr[0][0]
    },
    getPairValue (kv) {
      const arr = toPairs(kv)
      return arr[0][1]
    },
    fetchInitData () {
      this.loading = true
      this.$api.CLASSES_DETAIL({ classId: this.$route.query.classId }).then(({ data }) => {
        this.classInfo = data
        this.courseArr = []
        this.liveArr = []
        this.articleArr = []
        let gropCourseArr = []
        let gropLiveArr = []
        let gropArticleArr = []
        this.classInfo.studyPlan.forEach(res => {
          if (res.studyPlanType == 2) {
            res.studyTaskDetails.forEach(item => {
              if (item.studyContentType == 1) {
                // 课程
                if (item.isOpenFreeSelection == 1) {
                  this.isChoseCourse = true
                } else {
                  this.isChoseCourse = false
                }
                item.studyContentVOS.forEach(arr => {
                  this.courseArr.push(arr)
                })
                gropCourseArr = this.grouping(this.courseArr)
                gropCourseArr.forEach(data => {
                  this.gropCourse.push({ classificationName: data[0].classificationName, gropArr: data })
                })
                this.gropCourse.unshift({ classificationName: '全部', gropArr: this.courseArr })
              } else if (item.studyContentType == 2) {
                // 直播
                item.studyContentVOS.forEach(arr => {
                  this.liveArr.push(arr)
                })
                gropLiveArr = this.grouping(this.liveArr)
                gropLiveArr.forEach(data => {
                  this.gropLive.push({ classificationName: data[0].classificationName, gropArr: data })
                })
                this.gropLive.unshift({ classificationName: '全部', gropArr: this.liveArr })
              } else if (item.studyContentType == 3) {
                // 文章
                item.studyContentVOS.forEach(arr => {
                  this.articleArr.push(arr)
                })
                gropArticleArr = this.grouping(this.articleArr)
                gropArticleArr.forEach(data => {
                  this.gropArticle.push({ classificationName: data[0].classificationName, gropArr: data })
                })
                this.gropArticle.unshift({ classificationName: '全部', gropArr: this.articleArr })
              }
            })
          }
        })
        const content = document.getElementById('memo-content')
        content.innerHTML = this.classInfo.classMemo
        this.loading = false
      })
    },
    grouping (arrayFirst) {
      let arrayTwo = []
      arrayTwo = Object.values(arrayFirst.reduce((res, item) => {
        if (item.classificationName) {
          res[item.classificationName] ? res[item.classificationName].push(item) : res[item.classificationName] = [item]
        }
        return res
      }, {}))
      return arrayTwo
    },
    sKey (preffix, pIdx, sIdx) {
      return preffix + pIdx + '_' + sIdx
    },
    goToStudy () {
      window.location.href = globalUserDomainPrefix() + '/#/personal?componentId=StudyList&type=study_list'
    },
    doSelect (i, item) {
      this.courseArr = item.gropArr
      this.couSelectIndex = i
    },
    doSelectLive (i, item) {
      this.liveArr = item.gropArr
      this.livSelectIndex = i
    },
    doSelectArticle (i, item) {
      this.articleArr = item.gropArr
      this.acrSelectIndex = i
    }
  }
}

</script>
<style lang='scss'>
.class-content{
  .el-tabs__item{
    font-size:18px;
  }
  .el-tabs__content{
    margin-top:-10px
  }
}
</style>
<style lang='scss' scoped>
.subMenu{
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
}
.class-detail-page {
  width:100%;
  margin:20px 0;
  font-family: Source Han Sans CN;
}
.class-header {
 width:1200px;
 margin:0 auto;
  padding:20px;
  border:1px #EAEAEA solid;
  box-sizing:border-box;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  background-color: white;
}
.class-content {
   width:1200px;
 margin:0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
  border:1px #EAEAEA solid;
  padding:20px;
  background-color: white;
  box-sizing: border-box;
}
.show-item{
  font-size:14px;
  color:#666;
  margin-top:20px
}
.show-border-bottom{
  border-bottom:1px #EEEEEE solid
}
.show-background{
  background-color: #F8F8F8;
}
.detail-index{
  display:inline-block;
  width:30px;
  height:30px;
  border-radius:50%;
  border:2px #4598F9 solid;
  line-height:26px;
  text-align:center;
  color:#303133;
  margin-right:15px
}
.class-image {
  width: 400px;
  height: 225px;
}
.header-center {
  width:710px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 28px;
  }
  .header-content{
    font-size:12px;
    height:82px;
    background:#f8f8f8;
    padding:20px 0 20px 45px;
    display:flex;
    flex-direction:row;
    box-sizing:border-box;
   div:first-child{
     margin-right:82px;
   }
    div{
      display:flex;
      flex-direction:column;
      justify-content: space-between;
      span{
        span{
          color:#888;
          padding-right:10px
        }
      }
    }
  }
}
.header-right {
    display:flex;
    flex-direction:row;
    justify-content: space-between;
}
.study-price {
  color: #FF9428;
  font-size: 24px;
}
.show-item {
  margin-top: 10px;
}
.studyTask{
  width: 1074px;
  background: rgba(255, 255, 255, 0.39);
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  margin: 20px 0;
  padding: 23px;
  .taskName{
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 27px;
    color: #222222;
    margin-right: 10px;
  }
  .group{
  font-size: 16px;
  font-family: Source Han Sans CN;
  line-height: 27px;
  color: #444444;
  margin: 0 10px;
  cursor: pointer;
  }
  .blue{
  font-size: 16px;
  font-family: Source Han Sans CN;
  line-height: 27px;
  color: #4598F9;
  margin: 0 10px;
  cursor: pointer;
  }
  .time{
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 24px;
  color: #666666;
  float: right;
  line-height: 69px;
  margin-right: 20px;
  }
  .choseCourse{
    width: 80px;
    height: 30px;
    background: #9FA5AD;
    border-radius: 16px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 30px;
    color: #FFFFFF;
    display: inline-block;
    text-align: center;
  }
}
</style>
