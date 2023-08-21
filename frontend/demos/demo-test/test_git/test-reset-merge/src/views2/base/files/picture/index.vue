<!--
 * @Author: 姚文彬
 * @Date: 2021-06-17 12:00:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 14:59:11
 * @FilePath: \o-front-admin\src\views\base\files\picture\index.vue
-->
<template>
  <div>
    <TreeContent
      @refresh="refresh"
      class="tree"
      :list="menu"
      @refreshTree="queryMenu"
      dictTypeCode="file"
      fileType="img"
    >
      <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @info="showInfo"
        @down="down"
      >
        <div slot="header">

          <el-button type="primary" @click="addVideo">上传图片</el-button>

          <el-button
            @click="batchDelete"
            :disabled="!multipleSelection || multipleSelection.length == 0"
            style="margin-right:10px"
            >批量删除</el-button
          >
          <el-popover
            placement="right"
            v-model="moveShow"
            width="400"
            trigger="click"
          >
            <h3 style="text-align:center">移动分组</h3>
            <el-form :model="form" ref="form" label-width="80px">
              <el-form-item label="选择分组">
                <el-cascader
                  v-model="form.dirId"
                  :options="menu"
                  :props="{
                    label: 'dirName',
                    value: 'dirId',
                    children: 'subDirList',
                    checkStrictly: true
                  }"
                ></el-cascader>
              </el-form-item>
            </el-form>
            <div style="text-align:center">
              <el-button size="small" @click="moveShow = false">取消</el-button>
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

        <span slot="PaginationPrefixSlot" class="prefix"></span>

        <template slot="fileUrlSlot" slot-scope="scope">
          <div class="video-card">
            <el-tooltip
              class="item"
              effect="dark"
              content="点击图片预览"
              placement="top-start"
            >
              <el-image
                class="video-play"
                :src="scope.row.fileUrl"
                :preview-src-list="[scope.row.fileUrl]"
                fit="cover"
              >
              </el-image>
            </el-tooltip>
            <div class="video-r">
              <el-tooltip
                effect="dark"
                :content="scope.row.fileName"
                placement="top-start"
              >
                <div class="video-name">{{ scope.row.fileName }}</div>
              </el-tooltip>
              <div class="video-count">200*200</div>
            </div>
          </div>
        </template>

        <template slot="fileSizeSlot" slot-scope="scope">
          {{ Math.ceil(scope.row.fileSize / 1024) }}KB
        </template>
      </d2-crud-x>
    </TreeContent>

    <!-- 上传 -->
    <el-dialog title="上传图片" :visible.sync="imgUploadDialog" width="800px"
    :before-close="colseUploadDialogHandler" :close-on-click-modal=false
    >
          <resource-uploader ref="pictureResourceUploader"
          :memuData="menu"
          uploadCode="Upload-file-img"
          resourceName="本地图片"
          resourceSuffix=".jpg,.png"
          resourceType="img"
          @changeFileList="fileListChanged"
          @dirSelect="changeCurrentDir"
           >
          </resource-uploader>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="submitUpload">确认上传</el-button>
      </div>
    </el-dialog>

    <BaseInfo ref="baseInfo" />
  </div>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import TreeContent from '../../components/TreeContent.vue'
import { isArray } from 'lodash'
import { downFile } from '@/utils'
import BaseInfo from '../../components/BaseInfo.vue'
import ResourceUploader from '@/components/resource-uploader/resource-uploader.vue'

export default {
  components: { TreeContent, BaseInfo, ResourceUploader },
  mixins: [
    d2CrudPlus.crud
  ],
  data () {
    return {
      moveShow: false,
      form: {},
      fileSelected: [], // 图片列表
      infoDialogVisible: false,
      imgform: {},
      imgUploadDialog: false,
      menu: [], // 目录树
      row: {}, // 详情
      currentDirId: ''
    }
  },
  created () {
    this.queryMenu()
  },
  computed: {
    dirId () {
      console.log(this.imgform.dirId)
      if (isArray(this.imgform.dirId)) {
        return this.imgform.dirId[this.imgform.dirId.length - 1]
      } else {
        return ''
      }
    }
  },
  methods: {
    changeCurrentDir (dirId) {
      this.currentDirId = dirId
    },
    colseUploadDialogHandler (done) {
      this.doSearch({
        dirId: this.currentDirId
      })
      done()
    },
    uploadSuccess () {
      this.imgUploadDialog = false
      this.imgform.dirId = []
      this.doRefresh()
    },
    // 下载文件
    down ({ row }) {
      downFile(row.fileUrl)
    },
    // 移动文件
    moveFile () {
      this.$api
        .MOVE_FILE({
          ...this.form,
          dirId: this.form.dirId[this.form.dirId.length - 1], // 后端只需要最后一级的id
          fileIds: this.multipleSelection.map(v => v.fileId)
        })
        .then(res => {
          this.$notify({
            title: '提示',
            message: '移动文件成功',
            type: 'success'
          })
          this.moveShow = false
          this.form.dirId = []
          this.doRefresh()
        })
    },

    // 查询目录
    queryMenu () {
      this.$api
        .GET_Source_MENU({
          dictTypeCode: 'file',
          fileType: 'img'
        })
        .then(res => {
          this.menu = res.data
        })
    },

    // 详情
    showInfo ({ row }) {
      this.$refs.baseInfo.show(row)
    },

    refresh (val) {
      // 搜索
      this.doSearch({
        dirId: val
      })
    },

    addVideo () {
      this.fileSelected = []
      this.imgUploadDialog = true
      this.$nextTick(function () {
        this.$refs.pictureResourceUploader.clearFiles()
      })
    },
    fileListChanged (files) {
      this.fileSelected = files
    },
    // 合并上传
    submitUpload () {
      if (this.fileSelected !== null && this.fileSelected.length > 0) {
        this.$refs.pictureResourceUploader.doUpload()
      } else {
        this.$message({
          message: '请先选择文件!',
          type: 'warning',
          duration: '2000'
        })
      }
    },

    // 批量删除
    batchDelRequest () {
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

    getCrudOptions () {
      return crudOptions(this)
    },

    // 删除
    delRequest (row) {
      return this.$api.DEL_SOURCE({
        fileIds: [row.fileId]
      })
    },

    // 列表查询
    pageRequest (query) {
      // system： 文件file，素材file
      query.dictTypeCode = 'file'
      query.fileType = 'img'

      return this.$api.GetSourceList(query)
    }
  }
}
</script>
<style lang="scss" scoped>
.info-content {
  line-height: 28px;
  font-size: 16px;
  font-weight: 600;

  em {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
}
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
    width: 100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border-radius: 4px;
    margin-right: 10px;
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
</style>
