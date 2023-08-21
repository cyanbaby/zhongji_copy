<!-- 课程详情页 -->
<template>
  <el-container>
    <el-header style="padding:0px;height:80px">
      <div class="subMenu"></div>
    </el-header>
    <el-main style="width: 100%;padding-top:0px;">
        <!-- 课程详情页 -->
        <div class="class-detail-page">
        <div class="class-header">
          <el-image :src="classInfo.bannerImg" class="class-image">
            <div slot="error" class="image-slot">
              <el-empty description="图片加载失败"></el-empty>
            </div>
          </el-image>
          <ul class="header-center">
            <div>
              <li style="font-size: 28px;font-family: 'Source Han Sans CN';font-weight: 500;color: #444444;margin-bottom: 25px;">{{ classInfo.goodsValue }}</li>
              <li class="header-content">
                <div v-if="classInfo.learnHours>0">
                  <span>
                    <span>课时</span>{{ classInfo.learnHours }}课时
                  </span>
                </div>
                <div>
                <span>
                  <span> 所属分类</span>
                  <span v-if="classInfo.fullCatagoryNames">
                    <span v-if="classInfo.fullCatagoryNames.length<2">
                      <span v-for="(item,i) in classInfo.fullCatagoryNames" :key="i" style="color: #444444;">{{item}}</span>
                    </span>
                    <el-popover
                    v-else
                    placement="bottom-start"
                    width="300"
                    trigger="hover"
                    >
                    <ul>
                      <li v-for="(item,i) in classInfo.fullCatagoryNames" :key="i">{{item}}</li>
                    </ul>
                    <!-- <el-button slot="reference" type="text">{{classInfo.fullCatagoryNames[0]}}</el-button> -->
                    <span slot="reference" style="color: #444444;">{{classInfo.fullCatagoryNames[0]}}</span>
                    </el-popover>
                  </span>
                </span>
              </div>
              </li>
            </div>
            <li class="norms-box" v-show="norms.length>1">
              <span class="title">选择规格：</span>
              <ul class="norms-list">
                <li
                  v-for="(item, i) in norms"
                  :key="i"
                  @click="doSelect(i, item)"
                  :class="{ blue: i == selectIndex }"
                >
                  <img :src="item.normImgUrl" v-if="item.normImgUrl"/>
                  <div>
                    <span style="margin-right: 5px">{{ item.normName }}</span>
                    <span v-if="item.productPrice">{{ item.productPrice }}元</span>
                  </div>
                  <div class="icon">
                    <i class="el-icon-check"></i>
                  </div>
                </li>
              </ul>
            </li>
            <li class="header-right">
              <div>
                <span
                  class="study-price"
                  v-if="classInfo.activityPrice && classInfo.activityPrice > 0"
                >
                  ￥{{ classInfo.activityPrice }}元
                </span>
                <span class="study-price" v-else>免费</span>
              </div>
              <div>
                <span>
                  <el-button round class="whiteBtn" @click="addCart" disabled>加入购物车</el-button>
                  <el-button @click="signup" round class="blueBtn" disabled>立即购买</el-button>
                </span>
                <!-- <el-button @click="goToStudy" round class="blueBtn" v-else>马上学习</el-button> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="class-content">
          <el-tabs v-model="activeName">
            <el-tab-pane label="课程介绍" name="first">
              <div
                style="color: #666666; padding-left: 10px"
                v-for="(img, i) in classInfo.classMemo"
                :key="i"
              >
                <img
                  :src="img"
                  alt=""
                  style="margin: 10px 10px 10px 0; max-width: 820px"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="章节目录" name="secend">
              <!-- <ul class="contents">
                <li class="chapter">章节</li>
                <div style="background: #FFFFFF;padding:22px 20px;">
                  <li class="subsection">
                    <div>第一章 国际贸易学导论</div>
                    <div class="">第一章 国际贸易学导论</div>
                    <div>第一章 国际贸易学导论</div>
                    <div class="line"></div>
                  </li>
                  <li class="subsection">
                    <div>第一章 国际贸易学导论</div>
                    <div>第一章 国际贸易学导论</div>
                    <div>第一章 国际贸易学导论</div>
                    <div class="line"></div>
                  </li>
                </div>
              </ul> -->
              <div v-for="(item,i) in chapterInfoList" :key="i">
                <div class="courseName">{{item.coursename}}</div>
                <div class="chapterContanier" v-for="(data) in item.chapters" :key="data.id">
                  <div class="chapter">{{data.name}}</div>
                  <div v-for="(res) in data.sections" :key="res.id">{{res.name}}</div>
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
import util from '@/libs/util'
import { toPairs } from 'lodash'
import { globalUserDomainPrefix } from '@/utils/index'

import { encodeObjToHex } from '@/utils/hex-2-str'
export default {
  components: {},
  data () {
    return {
      norms: [],
      selectIndex: -1,
      classInfo: {},
      activeName: 'first',
      chapterInfoList: []
    }
  },
  created () {},
  mounted () {
    this.fetchInitData()
    this.getChapterInfo()
  },
  computed: {},
  methods: {
    doSelect (i, item) {
      this.selectIndex = i
      this.classInfo.normId = item.normId
      this.classInfo.productNormId = item.productNormId
      this.classInfo.coverImgUrl = item.normImgUrl
      this.classInfo.activityPrice = item.productPrice
    },
    getPairKey (kv) {
      const arr = toPairs(kv)
      return arr[0][0]
    },
    getPairValue (kv) {
      const arr = toPairs(kv)
      return arr[0][1]
    },
    fetchInitData () {
      this.status = this.$route.query.status
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(220, 220, 220, 0.96)'
      })
      this.$api
        .PreviewGoodsInfo({ goodsId: this.$route.query.goodsId, type: '2' })
        .then(({ data }) => {
          this.classInfo = data
          this.norms = data.goodsNormPreInfoVOS
          let minPrice
          for (let i = 0; i < this.norms.length; i++) {
            const element = this.norms[i]
            if (minPrice) {
              if (minPrice > element.price) {
                minPrice = element.price
                this.selectIndex = i
                this.classInfo.normId = element.normId
                this.classInfo.productNormId = element.productNormId
                this.classInfo.coverImgUrl = element.normImgUrl
                this.classInfo.activityPrice = element.productPrice
              }
            } else {
              minPrice = element.price
              this.selectIndex = i
              this.classInfo.normId = element.normId
              this.classInfo.productNormId = element.productNormId
              this.classInfo.coverImgUrl = element.normImgUrl
              this.classInfo.activityPrice = element.productPrice
            }
          }
          this.classInfo.classMemo = data.goodsDetailInfoVO.detailObjContent
          if (!data.classMemo) {
            this.activeName = 'secend'
          } else {
            this.activeName = 'first'
          }
          loading.close()
        }).catch(() => {
          loading.close()
        })
    },
    sKey (preffix, pIdx, sIdx) {
      return preffix + pIdx + '_' + sIdx
    },
    goToStudy () {
      // this.$api.QUERY_DOMAIN_URL().then(({ data }) => {
      const param = {
        componentId: 'StudyList',
        courseId: this.classInfo.productId,
        normId: this.classInfo.productNormId,
        type: 'study_list',
        token: util.cookies.get('token'),
        backUrl: location.href,
        flag: 1
      }
      let url
      if (process.env.NODE_ENV === 'development') {
        url = globalUserDomainPrefix()
        // url= 'http://localhost:84'
      } else {
        url = '/d'
      }
      window.location.href =
          url +
          '/#/index?info=' +
          encodeObjToHex(param)
      // });
    },
    getChapterInfo () {
      this.$api.QUERT_STUDY_CONTENT_CHAPTER_INFO_BY_GOODSID({
        goodsId: this.$route.query.goodsId
      }).then(res => {
        this.chapterInfoList = res.data.list
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.subMenu{
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
}
.class-content {
  .el-tabs__item {
    font-size: 18px;
  }
  .el-tabs__content {
    margin-top: -10px;
  }
}
</style>
<style lang='scss' scoped>
.class-detail-page {
  width: 100%;
  margin: 20px 0;
  font-family: Source Han Sans CN;
}
.class-header {
  width: 1200px;
  margin:0 auto;
  padding: 25px 31px 21px 30px;
  border: 1px #eaeaea solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  background-color: white;
}
.class-content {
  width: 1200px;
  padding:20px;
  margin:0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
  border: 1px #eaeaea solid;
  // padding: 20px 20px 30px 20px;
  background-color: white;
  box-sizing: border-box;
}
.show-item {
  font-size: 14px;
  color: #666;
  margin-top: 20px;
}
.class-image {
  width: 400px;
  height: 225px;
}
.header-center {
  width: 710px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .norms-box {
    display: flex;
    flex-shrink: 0;
    .title {
      margin-right: 10px;
      font-size: 14px;
      font-family: 'Source Han Sans CN';
      font-weight: 400;
      color: #606266;
      flex-shrink: 0;
      margin-top: 15px;
    }
    .norms-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 28px;
      li {
        border: 1px solid #cbcbd1;
        margin-right: 15px;
        padding: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        margin: 5px;
        font-size: 14px;
        font-family: 'Source Han Sans CN';
        font-weight: 400;
        color: #606266;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        .icon {
          display: none;
        }
      }
      .blue {
        font-size: 14px;
        font-family: 'Source Han Sans CN';
        font-weight: 400;
        border: 1px solid #4598f9;
        color: #4598f9;
        .icon {
          display: block;
          width: 30px;
          height: 33px;
          background: #4598f9;
          transform: rotateZ(45deg);
          position: absolute;
          right: -17px;
          bottom: -17px;
          i {
            width: 19px;
            height: 9px;
            color: #fff;
            transform: rotateZ(-53deg) translateX(-8px);
          }
        }
      }
    }
  }
  .title {
    font-size: 28px;
  }
  .header-content {
    background: #f8f8f8;
    padding: 14px 20px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    font-size: 14px;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #444444;
    margin-bottom: 20px;
    div:first-child {
      margin-right: 150px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span {
        span {
          color: #888;
          padding-right: 10px;
        }
      }
    }
  }
}
.header-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.study-price {
  font-size: 24px;
  font-family: 'Arial';
  font-weight: bold;
  color: #FF9428;
}
.show-item {
  margin-top: 10px;
}
.courseName{
  background: #FAFAFA;
  padding: 14px 20px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #444444;
  margin-top: 21px;
}
.chapterContanier{
  padding: 23px 20px 14px 20px;
  font-size: 12px;
  font-family: 'Source Han Sans CN';
  font-weight: 400;
  color: #888888;
  line-height: 12px;
  border-bottom: 1px solid #DFE6EC;
  div{
    margin-bottom: 8px;
  }
  .chapter{
    font-size: 14px;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #444444;
    line-height: 14px;
  }
}
.blueBtn{
  background: #4598F9;
  font-size: 14px;
  font-family: 'Source Han Sans CN';
  font-weight: 400;
  color: #FFFFFF;
}
.whiteBtn{
  border: 1px solid #4598F9;
  font-size: 14px;
  font-family: 'Source Han Sans CN';
  font-weight: 400;
  color: #4598F9;
}
</style>
