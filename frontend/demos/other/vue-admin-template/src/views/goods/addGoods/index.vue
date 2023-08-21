<template>
<d2-container>
<!-- 步骤条 -->
    <el-tabs v-model="activeName" style="margin-left: 10px;">
      <el-tab-pane label="课程类目" name="1"  :disabled="disabled">
        <step-1
        class="unifiedCss"
        @activeNameChange="activeNameChange"
        :distinguish="distinguish"
        ref="step1"
        ></step-1>
      </el-tab-pane>

      <el-tab-pane label="基本信息" name="2" :disabled="disabled" lazy>
        <step-2
        class="unifiedCss"
        @activeNameChange="activeNameChange"
        @getGoodsId="getGoodsId"
        :distinguish="distinguish"
        @getCatIds="getCatIds"
        ref="step2"
        ></step-2>
      </el-tab-pane>

      <el-tab-pane label="课程规格" name="3" :disabled="disabled" lazy>
        <step-3
        class="unifiedCss"
        @activeNameChange="activeNameChange"
        :goodsId="goodsId"
        :distinguish="distinguish"
        :catIds="catIds"
        ref="step3"
        ></step-3>
      </el-tab-pane>

      <el-tab-pane label="课程设置" name="6" :disabled="disabled" lazy>
        <step-6
        class="unifiedCss"
        :goodsId="goodsId"
        :row="row"
        :distinguish="distinguish"
        @activeNameChange="activeNameChange"
        @setImg="setImg"
        >
        </step-6>
      </el-tab-pane>

      <el-tab-pane label="封面/视频" name="4" :disabled="disabled" lazy>
         <el-card v-loading="step4Mask">
             <el-form label-width="110px" ref="bannerInfoForm" :model="bannerInfoForm">
            <el-form-item prop="bannerImg" label="课程首图：" required="">
              <draggable v-model="bannerInfoForm.bannerImg"  forceFallback="true" animation="1000">
                  <transition-group>
                  <img v-for="(item,i) in bannerInfoForm.bannerImg" :key="i" :src="item" class="avatar" @dblclick="deleteImg(i)">
                  </transition-group>
              </draggable>
                <span
                v-if="bannerInfoForm.bannerImg.length<5"
                class="avatar-uploader"
                @click="uploadBanner"
                >
                <i class="el-icon-plus avatar-uploader-icon"></i>
                </span>
            </el-form-item>
            <div class="subTitle">建议尺寸：100*100像素，最多上传5张；调整图片顺序时直接拖拽即可；删除图片时请双击图片</div>
            <el-form-item label="主图视频：">
                <video :src="bannerInfoForm.bannerVedio" controls="controls" width="25%" v-if="bannerInfoForm.bannerVedio" class="vedio">
                您的浏览器不支持 video 标签，暂时无法播放视频。
                </video>
                <i class="el-icon-error" v-if="bannerInfoForm.bannerVedio" @click="removeVedio"></i>
                <span
                class="avatar-uploader"
                @click="uploadVedio"
                >
                <i class="el-icon-plus avatar-uploader-icon" v-if="!bannerInfoForm.bannerVedio"><span style="font-size: initial;">添加视频</span></i>
                <i class="el-icon-plus avatar-uploader-icon" v-if="bannerInfoForm.bannerVedio"><span style="font-size: initial;">替换视频</span></i>
                </span>
            </el-form-item>
            <div class="subTitle">目前仅支持在手机端播放，建议时长9-30秒，建议视频宽高比16:9</div>
            <el-button type="primary" @click="fouBtn" class="nextBtn">{{distinguish}}</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="课程详情" name="5" :disabled="disabled" lazy>
        <el-card v-loading="step5Mask">
          <el-form label-width="210px" ref="detailForm" :model="detailForm">
              <el-form-item prop="detailImg" label="请完善课程名称的详情描述：">
                <draggable v-model="detailForm.detailImg"  forceFallback="true" animation="1000">
                  <transition-group>
                  <img v-for="(item,i) in detailForm.detailImg" :key="i" :src="item" class="detailImg" @dblclick="deleteImg(i)">
                  </transition-group>
              </draggable>
                <span
                v-if="detailForm.detailImg.length<12"
                class="avatar-uploader"
                @click="uploadDetail"
                >
                <i class="el-icon-plus avatar-uploader-icon"></i>
                </span>
            </el-form-item>
            <div class="subTitle" style="margin-left: 16.5%;">建议尺寸375*375像素；最多不超过12张；支持批量上传；调整图片顺序时直接拖拽即可；删除图片时请双击图片</div>
            <el-button type="primary" @click="fivBtn" class="nextBtn">{{distinguish}}</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="课程任务" name="7" :disabled="disabled" lazy>
        <step-7
        :goodsId="goodsId"
        ></step-7>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="上传图片" :visible.sync="imgUploadDialog" width="800px" :close-on-click-modal=false>
      <resource-uploader-v2
        ref="pictureResourceUploader"
        resource-name="图片"
        upload-code="Upload-file-img"
        resource-suffix=".jpg,.png,.ico"
        :show-upload-button="true"
        :show-select-dir="true"
        :select-dir-by-suffix="true"
        :show-label="true"
        file-type="img"
        :resourceBindId="currentResourceBindId"
        @uploadComplete="uploadComplete"
        :limitResourceCount='number'
      />
    </el-dialog>

    <el-dialog title="上传视频" :visible.sync="vedioUploadDialog" width="800px" :close-on-click-modal=false>
          <resource-uploader-v2
            ref="videoResourceUploader"
            resource-name="视频"
            upload-code="Upload-file-video"
            resource-suffix=".mp4"
            :show-upload-button="true"
            :show-select-dir="true"
            :select-dir-by-suffix="true"
            :show-label="true"
            file-type="media"
            @uploadComplete="uploadVedioComplete"
          />
    </el-dialog>
</d2-container>
</template>
<script>
import Step1 from './step1.vue'
import Step2 from './step2.vue'
import Step3 from './step3.vue'
import Step6 from './step6.vue'
import Step7 from './step7.vue'
import draggable from 'vuedraggable'
export default {
  components: {
    Step1,
    Step2,
    Step3,
    Step6,
    Step7,
    draggable
  },
  // 监听
  watch: {
    activeName: {
      handler (newval) {
        if (newval == '4') {
          this.getBannerInfo()
        } else if (newval == '5') {
          this.getDetailInfo()
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      distinguish: '下一步',
      activeName: '1',
      disabled: true, // 新增时为true,编辑时为false
      row: {},
      goodsId: '',
      currentResourceBindId: '',
      menu: [],
      imgUploadDialog: false,
      vedioUploadDialog: false,

      categoryDic: [],
      // 控制按钮样式
      isActive: false,
      // 验证规则
      bannerInfoForm: {
        bannerImg: [],
        bannerVedio: ''
      },
      detailForm: {
        detailImg: []
      },
      number: 5,
      catIds: [],
      defaultImg: '',
      step4Mask: false,
      step5Mask: false
    }
  },
  created () {
    this.editShow()
  },
  methods: {
    editShow () {
      if (this.$route.query.goodsId) {
        this.$route.meta.title = '编辑课程'
        this.goodsId = this.$route.query.goodsId
        this.distinguish = '保存'
        this.disabled = false
      } else {
        this.$route.meta.title = '新建课程'
      }
    },
    activeNameChange (val) {
      this.activeName = val
    },
    getGoodsId (val) {
      this.goodsId = val
    },
    getCatIds (val) {
      this.catIds = val
    },
    getBannerInfo () {
      this.step4Mask = true
      this.$api.GET_BANNER_INFO(
        { goodsId: this.goodsId }
      ).then(res => {
        if (JSON.stringify(res.data) == '{}') {
          res.data.bannerImg = []
        }
        this.bannerInfoForm = res.data
        if (this.defaultImg) {
          console.log('TCL: getBannerInfo -> this.defaultImg', this.defaultImg)
          console.log('TCL: getBannerInfo -> this.bannerInfoForm.bannerImgafter', this.bannerInfoForm.bannerImg)
          this.bannerInfoForm.bannerImg.unshift(this.defaultImg)
          console.log('TCL: getBannerInfo -> this.bannerInfoForm.bannerImgbefor', this.bannerInfoForm.bannerImg)
          console.log('TCL: getBannerInfo -> new Set(this.bannerInfoForm.bannerImg)', new Set(this.bannerInfoForm.bannerImg))
          this.bannerInfoForm.bannerImg = [...new Set(this.bannerInfoForm.bannerImg)]
        }
        this.step4Mask = false
      }).catch(() => {
        this.step4Mask = false
      })
    },
    // 封面/视频
    fouBtn () {
      if (this.bannerInfoForm.bannerImg.length === 0) {
        this.$message.warning('请选择课程首图')
      } else if (this.bannerInfoForm.bannerImg.length > 5) {
        this.$message.warning('课程首图不能超过5张')
      } else {
        this.step4Mask = true
        this.$api.ADD_GOODSBANNER({
          goodsId: this.goodsId,
          bannerImg: this.bannerInfoForm.bannerImg,
          bannerVedio: this.bannerInfoForm.bannerVedio
        }).then(() => {
          if (this.$route.query.goodsId) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.activeName = '5'
          } else {
            this.activeName = '5'
          }
          this.step4Mask = false
        }).catch(() => {
          this.step4Mask = false
        })
      }
    },
    getDetailInfo () {
      this.step5Mask = false
      this.$api.GET_DETAIL_INFO(
        { goodsId: this.goodsId }
      ).then(res => {
        if (JSON.stringify(res.data) == '{}') {
          res.data.detailObjContent = []
        }
        this.detailForm.detailImg = res.data.detailObjContent
        if (this.defaultImg) {
          this.detailForm.detailImg.unshift(this.defaultImg)
          this.detailForm.detailImg = [...new Set(this.detailForm.detailImg)]
        }
        this.step5Mask = false
      }).catch(() => {
        this.step5Mask = false
      })
    },
    // 课程详情
    fivBtn () {
      // if (this.detailForm.detailImg.length === 0) {
      //   this.$message.warning('请完善课程名称的详情描述')
      // }else
      if (this.detailForm.detailImg.length > 12) {
        this.$message.warning('详情描述图不能超过12张')
      } else {
        this.step5Mask = true
        this.$api.ADD_GOODSDETAIL({
          goodsId: this.goodsId,
          detailObjContent: this.detailForm.detailImg
        }).then(() => {
          this.step5Mask = false
          if (this.$route.query.goodsId) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.activeName = '7'
            // const tagName = this.$route.fullPath
            // this.close({ tagName }).then(item => { this.$router.push({ path: '/goods/orgwarehouse' }) })
            // this.getCourserInfo()
          } else {
            this.activeName = '7'
            // this.$message({
            //   message: '课程新增成功',
            //   type: 'success'
            // })
            // const tagName = this.$route.fullPath
            // this.close({ tagName }).then(item => { this.$router.push({ path: '/goods/orgwarehouse' }) })
          }
        }).catch(() => {
          this.step5Mask = false
        })
      }
    },
    uploadBanner (row) {
      this.number = 5
      this.currentResourceBindId = row.id
      this.imgUploadDialog = true
      this.$nextTick(params => {
        this.$refs.pictureResourceUploader.clearFiles()
      })
    },
    uploadDetail (row) {
      this.number = 12
      this.currentResourceBindId = row.id
      this.imgUploadDialog = true
      this.$nextTick(params => {
        this.$refs.pictureResourceUploader.clearFiles()
      })
    },
    uploadComplete (params) {
      this.imgUploadDialog = false
      console.log('文件上传完成：{}', params)
      if (this.activeName === '4') {
        this.bannerInfoForm.bannerImg.push(params.url)
      }
      if (this.activeName === '5') {
        this.detailForm.detailImg.push(params.url)
      }
    },
    uploadVedio () {
      this.vedioUploadDialog = true
      this.$nextTick(params => {
        this.$refs.videoResourceUploader.clearFiles()
      })
    },
    uploadVedioComplete (params) {
      this.vedioUploadDialog = false
      console.log('文件上传完成：{}', params)
      if (this.activeName === '4') {
        this.bannerInfoForm.bannerVedio = params.url
      }
    },
    // 双击图片删除
    deleteImg (i) {
      if (this.activeName === '4') {
        this.bannerInfoForm.bannerImg.splice(i, 1)
      }
      if (this.activeName === '5') {
        this.detailForm.detailImg.splice(i, 1)
      }
    },
    // 删除视频
    removeVedio () {
      this.bannerInfoForm.bannerVedio = ''
    },
    // // 获取已选择的课件列表
    // getCourserInfo () {
    //   this.step6Mask=true
    //   this.$api.GET_COURSEWARE_INFO(
    //     { goodsId: this.goodsId }
    //   ).then(res => {
    //     if (res.data.courseWares) {
    //       console.log('getCourserInfo -> res', res)
    //       var wareValues = []
    //       var wareIds = []
    //       var sourceIds = []
    //       var wareSources = []
    //       this.cousreWareInfo.learnHour = res.data.learnHour
    //       res.data.courseWares.forEach(msg => wareIds.push(msg.wareId))
    //       res.data.courseWares.forEach(msg => wareValues.push(msg.wareValue))
    //       res.data.courseWares.forEach(msg => sourceIds.push(msg.sourceId))
    //       res.data.courseWares.forEach(msg => wareSources.push(msg.wareSource))
    //       this.cousreWareInfo.wareInfo = wareValues.map((wareValue, i) => ({ wareValue, wareId: wareIds[i], sourceId: sourceIds[i], wareSource: wareSources[i] }))
    //       this.cousreWareInfo.wareIds = wareIds
    //       console.log('getCourserInfo -> this.cousreWareInfo', this.cousreWareInfo)
    //     }
    //     this.step6Mask=false
    //   }).catch(()=>{
    //     this.step6Mask=false
    //   })
    // },
    // change (val) {
    //   if (val == 2) {
    //     this.$refs.step1.setcatInfo()
    //     this.$refs.step2.getDict()
    //   }
    //   if (val == 3) {
    //     this.$refs.step3.queryNormByCatId(this.catId)
    //   }
    //   if (val == 4) {
    //     this.getBannerInfo()
    //   }
    //   if (val == 5) {
    //     this.getDetailInfo()
    //   }
    //   if (val == 6) {
    //     this.getCourserInfo()
    //   }
    // },
    setImg (val) {
      if (JSON.stringify(val) != '{}') {
        this.bannerInfoForm.bannerImg.unshift(val)
        this.detailForm.detailImg.unshift(val)
        this.defaultImg = val
      } else {
        this.defaultImg = ''
      }
    }
  }

}
</script>

<style scoped>
.box-container{
  margin-top: 50px;
  display: flex;
}
.box{
  border: 1px solid #C0C0C0;
  width: 90px;
  height: 60px;
  margin: 0 10px;
}
.cascader{
  margin-top: 70px;
}
.unifiedCss>>>.nextBtn{
  display: block;
  margin-left: 40%;
  margin-top: 50px;
}
.nextBtn{
  display: block;
  margin-left: 40%;
  margin-top: 50px;
}
.subTitle{
  font-size: 10px;
  color:#C0C0C0;
  margin-left: 8%;
  margin-bottom: 30px;
}
.unifiedCss>>>.subTitle{
  font-size: 10px;
  color:#C0C0C0;
  margin-bottom: 30px;
}
.el-tabs__item .is-disabled{
  color: black !important;
}
.selClass{
  color:#6BC7FF ;
  margin-top: 10px;
  font-size: 14px;
}

.avatar-uploader {
    display: block;
    width: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 15px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
  }

  ul, li {
    margin: 10px;
    color: cornflowerblue;
  }
  .detailImg{
    display: block;
    width: 375px;
    margin-bottom: 20px;
  }
  .vedio{
    position: relative;
  }
  .el-icon-error{
    vertical-align: top;
    position: absolute;
    left: 260px;
    top:10px;
    color: white;
  }
  .el-tab-pane{
    overflow: auto;
  }
</style>
