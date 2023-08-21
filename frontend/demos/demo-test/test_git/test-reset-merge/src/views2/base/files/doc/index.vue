<!--
 * @Author: 姚文彬
 * @Date: 2021-06-17 12:00:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 15:59:38
 * @FilePath: \o-front-admin\src\views\base\files\doc\index.vue
-->
<template>
  <div>
    <TreeContent
      class="tree"
      @refresh="refresh"
      :list="menu"
      @refreshTree="queryMenu"
      dictTypeCode="file"
      fileType="doc"
      title="文件"
    >
      <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @info="showInfo"
        @down="down"
        @preview="preview"
      >
        <div slot="header">
          <el-button type="primary" @click="addVideo">上传文件</el-button>

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

        <template slot="fileUrlSlot" slot-scope="scope">
          <div class="video-card">
            <!-- 不同类型显示不同文件类型图标 -->
            <!-- <img
              class="video-play"
              :src="scope.row.fileUrl"
              alt
              srcset
              style="object-fit:cover"
            /> -->
            <div class="video-r">
              <el-tooltip
                effect="dark"
                :content="scope.row.fileName"
                placement="top-start"
              >
                <div class="video-name">{{ scope.row.fileName }}</div>
              </el-tooltip>
              <!-- <div class="video-count">{{scope.row.fileSuffix}}</div> -->
            </div>
          </div>
        </template>

        <template slot="fileSizeSlot" slot-scope="scope">
          {{ Math.ceil(scope.row.fileSize / 1024) }}KB
        </template>
      </d2-crud-x>
    </TreeContent>

    <!-- 上传 -->
    <el-dialog
      title="上传文件"
      :visible.sync="docUploadDialog"
      width="800px"
      height="500px"
      destroy-on-close
      :close-on-click-modal=false
    >
    <resource-uploader-v2
      ref="fileResourceUploader"
      resource-name="文件"
      upload-code="Upload-file-enclosure"
      resource-suffix=".doc,.docx,.txt,.xls,.xlsx,.pdf"
      :show-upload-button="true"
      :show-select-dir="true"
      :select-dir-by-suffix="true"
      :show-label="true"
      :file-type='fileType'
      resource-bind-id='test'
      @uploadComplete="uploadComplete"
    />
     <!-- <resource-uploader
      ref="resourceUploader"
      :memuData="menu"
      uploadCode="Upload-file-enclosure"
      resourceName="本地文件"
      resourceSuffix=".doc, .docx, .pdf"
      resourceType="doc"
      @uploadComplete="uploadSuccess">
      </resource-uploader>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="submitUpload">确认上传</el-button>
      </div> -->
      <!-- <el-form :model="imgform" ref="form" label-width="80px">
        <el-form-item label="上传到">
          <el-cascader
            v-model="imgform.dirId"
            :options="menu"
            :props="{
              label: 'dirName',
              value: 'dirId',
              children: 'subDirList',
              checkStrictly: true
            }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="本地文件">

          <d2-upload
            :mergeData="{ dirId, dictTypeCode: 'file', fileType: 'doc', uploadCode:'Upload-file-enclosure' }"
            @success="uploadSuccess"
          />
        </el-form-item>
      </el-form> -->
      <!-- <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="submitUpload">确认上传</el-button>
      </div> -->
    </el-dialog>

    <!-- 详情 -->
    <BaseInfo ref="BaseInfo" />
  </div>
</template>
<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import TreeContent from '../../components/TreeContent.vue'

import { isArray } from 'lodash'
import { downFile } from '@/utils'
import BaseInfo from '../../components/BaseInfo.vue'

export default {
  components: { TreeContent, BaseInfo },
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      moveShow: false,
      form: {},
      fileList: [], // 文件列表
      row: {}, // 详情
      infoDialogVisible: false,
      imgform: {},
      docUploadDialog: false,
      menu: [], // 目录树

      // TODO: 基本配置参数配置化
      config: {
        dictTypeCode: 'file',
        fileType: 'doc'
      },
      fileType: 'doc'
    }
  },
  created () {
    this.queryMenu()
  },
  computed: {
    // 计算目录id
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
    // 调用office接口，预览多媒体资源:https://blog.csdn.net/weixin_44326007/article/details/99693479?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.base
    preview ({ row }) {
      if (!/\.(pdf|PDF)$/.test(row.wjYsmc)) {
        // 不是pdf格式
        window.open(
          'https://view.officeapps.live.com/op/view.aspx?src=' + row.fileUrl,
          '_blank'
        )
        return false
      } else {
        // pdf 格式
        const url = this.yuming + '/anli?id=' + row.id
        this.viewVisible = true
        this.pdfsrc = url
      }
    },

    /* uploadSuccess () {
      this.imgform.dirId = []
      this.doRefresh()
      this.docUploadDialog = false
    },
    // 合并上传，手动上传多图有点复杂。。。先用着。。。
    submitUpload () {
      // this.$refs['d2-upload'].submitUpload()
      this.$refs.resourceUploader.doUpload()
    }, */
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
          ...this.config
        })
        .then(res => {
          this.menu = res.data
        })
    },

    // 详情
    showInfo ({ row }) {
      this.$refs.BaseInfo.show(row)
    },

    // 搜索
    refresh (val) {
      this.doSearch({
        dirId: val
      })
    },

    // 上传弹窗
    addVideo () {
      this.docUploadDialog = true
    },
    uploadComplete (params) {
      this.docUploadDialog = false
      console.log('文件上传完成：{}', params)
      this.doRefresh()
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
      // system： 文件file，素材material
      query.dictTypeCode = 'file'
      query.fileType = 'doc'

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
    width: 80px;
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
