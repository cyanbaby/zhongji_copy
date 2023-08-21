<!--
 * @Author: 姚文彬
 * @Date: 2021-06-17 12:00:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 14:55:38
 * @FilePath: \o-front-admin\src\views\base\folder\video\index.vue
-->
<template>
  <div>
    <TreeContent
      title="视频"
      class="tree"
      :list="menu"
      dictTypeCode="material"
      fileType="media"
      @refresh="refresh"
      @refreshTree="queryMenu"
    >
      <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @info="showInfo"
      >
        <div slot="header">
          <el-button type="primary" @click="addVideo">上传视频</el-button>

          <el-button
            @click="batchDelete"
            style="margin-right:10px"
            :disabled="!multipleSelection || multipleSelection.length == 0"
            >批量删除</el-button
          >

          <el-popover
            placement="right"
            v-model="targetShow"
            width="400"
            trigger="click"
          >
            <h3 style="text-align:center">移动分组</h3>
            <el-form :model="targetForm" ref="targetForm" label-width="80px">
              <!-- <el-form-item label="上级分组">
                <el-select style="width:100%" v-model="targetForm.dirId">
                  <el-option
                    v-for="item in menu"
                    :key="item.dirId"
                    :label="item.dirName"
                    :value="item.dirId"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="上级分组">
                <el-cascader
                  v-model="targetForm.dirId"
                  :options="menu"
                  style="width:100%"
                  :props="{
                    label: 'dirName',
                    value: 'dirId',
                    children: 'subDirList',
                    emitPath:false,
                    checkStrictly: true
                  }"
                ></el-cascader>
              </el-form-item>
            </el-form>
            <div style="text-align:center">
              <el-button size="small" @click="targetShow = false"
                >取消</el-button
              >
              <el-button size="small" type="primary" @click="moveFile"
                >确定</el-button
              >
            </div>

            <el-button
              slot="reference"
              :disabled="!multipleSelection || multipleSelection.length == 0"
              >移动到</el-button
            >
          </el-popover>
           <crud-search
          style="width:450px;margin-left:20vw;margin-top:-38px"
            ref="search"
            :options="crud.searchOptions"
            @submit="handleSearch"
          />
          <crud-toolbar
          style="margin-top:-40px"
            v-bind="_crudToolbarProps"
            v-on="_crudToolbarListeners"
          />
        </div>

        <!-- 自定义视频展示、悬浮可播放 -->
        <template slot="filePathSlot" slot-scope="scope">
          <div class="video-card">
           <el-tooltip
              effect="dark"
              content="点击视频预览"
              placement="top-start"
            >
              <div class="video-play" @click="showVide(scope.row)">
                <i
                  style="color:#fff;font-size:18px"
                  class="el-icon-video-play"
                ></i>
              </div>
            </el-tooltip>
            <div class="video-r">
              <el-tooltip
                effect="dark"
                :content="scope.row.fileName"
                placement="top-start"
              >
                <div class="video-name">{{ scope.row.fileName }}</div>
              </el-tooltip>
              <!-- TODO 像素、时长等信息 -->
              <!-- <div class="video-count">00:30:10</div> -->
            </div>
          </div>
        </template>

        <template slot="fileSizeSlot" slot-scope="scope">
          {{ Math.ceil(scope.row.fileSize / 1024/1024) }}MB
        </template>
      </d2-crud-x>
    </TreeContent>

    <!-- 上传视频 -->
    <el-dialog title="上传视频" :visible.sync="videoUploadShow" width="800px" :before-close="colseUploadDialogHandler" :close-on-click-modal=false>
      <video-uploader ref="theVideoUploader"
      :memuData="menu"
      uploadCode="Upload-material-video"
      @refresh="uploadComplete"
      @dirSelect="changeCurrentDir"
      @changeFileList="fileListChanged"></video-uploader>
      <div slot="footer" style="text-align:center">
        <!-- 开始上传 -->
        <el-button type="primary" @click="uploadVideo">确认上传</el-button>
      </div>
    </el-dialog>

    <!-- 预览视频 -->
    <div v-show="videoShow" class="fixed-video">
      <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
      ></video-player>
      <i @click="videoShow = false" class="close-icon el-icon-circle-close"></i>
    </div>

    <BaseInfo ref="baseInfo" />
  </div>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
// doc: https://github.com/dream2023/vue-ele-upload-video
import 'video.js/dist/video-js.css'
import TreeContent from '../../components/TreeContent.vue'
import { videoPlayer } from 'vue-video-player'
import BaseInfo from '../../components/BaseInfo.vue'
import VideoUploader from '../../components/video-uploader.vue'

export default {
  props: {
    sourceType: {
      type: String,
      default: 'media'
    }
  },
  components: {
    videoPlayer,
    TreeContent,
    BaseInfo,
    VideoUploader
  },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      videoShow: false,
      targetForm: {
        dirId: '',
        fileIds: []
      },
      targetShow: false, // 移动
      infoVisible: false, // 详情
      videoUploadShow: false, // 视频预览
      // 样式调整：https://blog.csdn.net/qq_37720933/article/details/105185712
      playerOptions: {
        width: 800,
        height: 400,
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:10', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              src: '', // 路径
              type: 'video/mp4' // 类型
            }
          ],
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        }
      },
      menu: [], // 分组信息
      videoUrl: '', // 上传得视频链接
      fileSelected: [], //
      currentDirId: ''
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    },
    // 上传视频时勾选的目标目录
    dirId () {
      return this.videoform.dirId[this.videoform.dirId.length - 1]
    }
  },
  created () {
    this.queryMenu()
  },
  methods: {
    changeCurrentDir (dirId) {
      this.currentDirId = dirId
    },
    // 详情
    showInfo ({ row }) {
      this.$refs.baseInfo.show(row)
    },
    fileListChanged (files) {
      this.fileSelected = files
    },

    // 上传
    uploadVideo () {
      if (this.fileSelected !== null && this.fileSelected.length > 0) {
        this.$refs.theVideoUploader.doUpload()
      } else {
        this.$message({
          message: '请先选择文件!',
          type: 'warning',
          duration: '2000'
        })
      }
    },

    // 查询视频目录
    queryMenu () {
      this.$api
        .GET_Source_MENU({
          dictTypeCode: 'material',
          fileType: 'media'
          // opDomainCode: 'baseService',
          // opUserId: '8002',
          // opPlatformId: '8002',
          // opOrgId: '8002'
        })
        .then(res => {
          // 增加根目录
          this.menu = res.data
        })
    },
    colseUploadDialogHandler (done) {
      this.doSearch({
        dirId: this.currentDirId
      })
      done()
    },
    refresh (val, parentId) {
      // 搜索
      this.currentDirId = val
      this.doSearch({
        dirId: this.currentDirId
      })
    },
    // 添加视频
    addVideo () {
      this.fileSelected = []
      this.videoUploadShow = true
      this.$nextTick(function () {
        this.$refs.theVideoUploader.clearFiles()
      })
    },
    uploadComplete (theUplaodDirId) {
      this.videoUploadShow = false
      this.currentDirId = theUplaodDirId
      this.refresh(this.currentDirId)
    },
    // 批量删除
    batchDelRequest (ids) {
      this.$api
        .DEL_SOURCE({
          fileIds: this.multipleSelection.map(v => v.fileId)
        })
        .then(res => {
          this.$notify({
            title: '提示',
            message: '删除成功!',
            type: 'success'
          })
          this.doRefresh()
        })
    },

    // 预览视频
    showVide (row) {
      this.videoShow = true
      this.player.src(row.fileUrl)
    },

    // 移动文件
    moveFile () {
      const fileIds = this.multipleSelection.map(v => v.fileId)

      console.log(this.targetForm, fileIds, this.multipleSelection)

      this.$api
        .MOVE_FILE({
          ...this.targetForm,
          fileIds
        })
        .then(res => {
          this.$notify({
            title: '提示',
            message: '移动文件成功',
            type: 'success'
          })
          this.targetForm.dirId = []
          this.targetShow = false
          this.doRefresh()
        })
    },

    getCrudOptions () {
      return crudOptions(this)
    },

    pageRequest (query) {
      // 业务类型、资源类型两个入参
      // system： 文件file，素材material
      query.dictTypeCode = 'material'
      query.fileType = 'media'

      // query.opDomainCode = 'baseService'
      // query.opUserId = '8002'
      // query.opPlatformId = '8002'
      // query.opOrgId = '8002'

      return this.$api.GetSourceList(query)
    },

    // 删除
    delRequest (row) {
      return this.$api.DEL_SOURCE({
        fileIds: [row.fileId]
      })
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
