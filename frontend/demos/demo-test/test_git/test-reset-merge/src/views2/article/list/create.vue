<!--
 * @Author: 姚文彬
 * @Date: 2021-06-16 14:21:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 17:54:36
 * @FilePath: \o-front-admin\src\views\article\list\create.vue
-->
<template>
  <div>
    <el-row class="add_content">
      <el-col :span="16">
        <div>
          <h3 style="padding-left: 7px">新增文章</h3>
          <el-form label-width="90px" :model="form">
            <el-form-item label="文章标题:">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要:">
              <el-input
                v-model="form.contentAbstract"
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
            <el-form-item label="文章正文:">
              <!-- <d2-tinymce v-model="form.contentBody" :height="400" /> -->
              <vue-rich-text-editor v-model="form.contentBody" >
              </vue-rich-text-editor>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8" style="padding: 20px 0 0 20px">
        <div>
          <el-tabs v-model="form.contentType" type="card">
            <el-tab-pane
              v-for="(item, index) in dynamicTags"
              :key="index"
              :label="item.dictDataName"
              :name="item.dictDataValue"
            >
            </el-tab-pane>
          </el-tabs>
          <el-form label-width="90px" :model="form">
            <el-form-item label="选择频道:">
              <el-tag
                :key="index"
                closable
                @close="handleCloseChannel(index)"
                v-for="(item, index) in channelIds"
                :disable-transitions="false"
              >
                {{ item.name }}
              </el-tag>
              <el-popover
                placement="left"
                v-model="channelShow"
                width="400"
                trigger="click"
              >
                <h3 style="text-align:left">选择频道</h3>
                <div style="text-align:center">
                  <el-tree
                    :data="channelList"
                    node-key="channelId"
                    ref="channelTree"
                    :props="channelprops"
                    show-checkbox
                    :expand-on-click-node="false"
                    accordion
                    >
                  </el-tree>
                  <el-button size="small" @click="channelShow = false">取消</el-button>
                  <el-button size="small" type="primary" @click="getChannelCheckedNodes">确定</el-button>
                </div>
                <el-button
                  slot="reference"
                  style="font-size:26px"
                  icon="el-icon-circle-plus"
                  type="text"
                ></el-button>
              </el-popover>
            </el-form-item>
            <el-form-item label="选择栏目:">
              <el-tag
                :key="index"
                closable
                v-for="(item, index) in columnIds"
                :disable-transitions="true"
                @close="handleCloseColumn(index)"
              >
                {{ item.columnName }}
              </el-tag>
              <el-popover
                placement="left"
                v-model="columnShow"
                width="400"
                trigger="click"
              >
                <h3 style="text-align:left">选择栏目</h3>
                <div style="text-align:center">
                  <el-tree
                    :data="columnList"
                    node-key="columnId"
                    ref="columnTree"
                    :props="columnprops"
                    show-checkbox
                    :expand-on-click-node="false"
                    accordion
                  >
                      <span class="custom-tree-node" slot-scope="{ node }">
                        <span>{{ node.label }}</span>
                      </span>
                  </el-tree>
                  <el-button size="small" @click="columnShow = false">取消</el-button>
                  <el-button size="small" type="primary" @click="getColumnCheckedNodes">确定</el-button>
                </div>
                <el-button
                  slot="reference"
                  style="font-size:26px"
                  icon="el-icon-circle-plus"
                  type="text"
                ></el-button>
              </el-popover>
            </el-form-item>
            <el-form-item label="显示样式:">
              <el-radio-group v-model="form.coverStyle">
                <el-radio
                  :label="item.dictDataValue"
                  v-for="(item, index) in coverStyleList"
                  :key="index"
                  >{{ item.dictDataName }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="文章封面:">
              <el-upload
                ref="upload"
                class="upload-demo"
                :action="action"
                :data="postData"
                multiple
                :before-upload="beforeUpload"
                :on-success="successUpload"
                :on-remove="removeUpload"

              >
                <el-button size="small" type="primary">本地上传</el-button>
              </el-upload>
              <div class="el-upload__tip">
                {{remark1.remark}}
              </div>
              <el-button size="small" type="primary" @click="coverUpload()">去选择</el-button>
            </el-form-item>
            <el-form-item label="是否原创:">
              <el-radio-group
                v-model="form.isOriginal"
                @change="changeOriginal"
              >
                <el-radio
                  :label="item.value"
                  v-for="(item, index) in isOriginalList"
                  :key="index"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
              <el-input
                placeholder="请输入文章网址"
                :disabled="flag"
                v-model="form.originalUrl"
                style="width: 500px; margin-left: 20px"
              ></el-input>
            </el-form-item>
            <el-form-item label="选择附件:">
              <el-upload
                ref="upload"
                class="upload-demo"
                :action="action1"
                :data="postData1"
                multiple
                :before-upload="beforeUpload1"
                :on-success="successUpload1"
              >
                <el-button size="small" type="primary">本地上传</el-button>
              </el-upload>
              <div class="el-upload__tip">
                {{remark2.remark}}
              </div>
              <el-button size="small" type="primary" @click="annexUpload()">去选择</el-button>
            </el-form-item>
          </el-form>
          <div style="margin:100px auto;">
            <el-button>取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 封面去选择 -->
    <el-dialog
      title="去选择"
      :visible.sync="coverDialog"
      width="980px"
      :close-on-click-modal=false
    >
      <el-tabs v-model="dictTypeCode" @tab-click="coverhandleClick">
        <el-tab-pane
          v-for="(item, index) in tab_plane"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-row :gutter="20" style="min-width: 300px">
            <el-col :span="6" :offset="0">
              <div class="menu-content">
                <div class="menu-top">
                  <h3>图片分类</h3>
                </div>
                <el-tree
                  :data="coverList"
                  node-key="dirId"
                  default-expand-all
                  :props="coverprops"
                  :expand-on-click-node="false"
                  @node-click="clickNodeCover"
                >
                  <span class="custom-tree-node" slot-scope="{ node }">
                    <span>{{ node.label }}</span>
                  </span>
                </el-tree>
              </div>
            </el-col>
            <el-col :span="18" :offset="0">
              <el-table
                ref="multipleTable"
                :data="coverFileList"
                tooltip-effect="dark"
                style="width: 100%"
                height="400"
                @select="coverHandleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="图片"
                  width="120">
                  <template slot-scope="scope">
                    <a :href="scope.row.fileUrl" target="_blank">
                      <img :src="scope.row.fileUrl" alt="" style="width:100px; height:100px;">
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  label="名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="fileSize"
                  label="文件大小"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="fileLocation"
                  label="文件存储位置"
                  width="120"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="coverDialog = false">取 消</el-button>
        <el-button type="primary" @click="coverCloud">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 附件去选择 -->
    <el-dialog
      title="去选择"
      :visible.sync="annexDialog"
      width="980px"
      :close-on-click-modal=false
    >
      <el-tabs v-model="dictTypeCode" @tab-click="annexhandleClick">
        <el-tab-pane
          v-for="(item, index) in tab_plane"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-row :gutter="20" style="min-width: 300px">
            <el-col :span="6" :offset="0">
              <div class="menu-content">
                <div class="menu-top">
                  <h3>附件分类</h3>
                </div>
                <el-tree
                  :data="annexList"
                  node-key="dirId"
                  default-expand-all
                  :props="coverprops"
                  :expand-on-click-node="false"
                  @node-click="clickNodeAnnex"
                >
                  <span class="custom-tree-node" slot-scope="{ node }">
                    <span>{{ node.label }}</span>
                  </span>
                </el-tree>
              </div>
            </el-col>
            <el-col :span="18" :offset="0">
              <el-table
                ref="multipleTable"
                :data="annexFileList"
                tooltip-effect="dark"
                style="width: 100%"
                height="400"
                @select="annexHandleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="图片"
                  width="120">
                  <template slot-scope="scope">
                    <a :href="scope.row.fileUrl" target="_blank">
                      <img :src="scope.row.fileUrl" alt="" style="width:100px; height:100px;">
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  label="名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="fileSize"
                  label="文件大小"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="fileLocation"
                  label="文件存储位置"
                  width="120"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="annexDialog = false">取 消</el-button>
        <el-button type="primary" @click="annexCloud">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vueRichTextEditor from '@/components/rich-editor/vue-rich-text-editor.vue'
import { mapActions } from 'vuex'
export default {
  components: { vueRichTextEditor },
  data () {
    return {
      // 需要取字典数据
      dynamicTags: [],
      active: '',
      channelIds: [], // 频道信息
      columnIds: [], // 栏目信息
      coverUrls: [], // 封面信息
      coverCloudList: [], // 封面弹框列表选择
      attachmentUrls: [], // 附件信息
      annexCloudList: [], // 封面弹框列表选择
      form: {
        title: '',
        contentAbstract: '',
        contentBody: '',
        contentType: '文章',
        coverStyle: '',
        isOriginal: true,
        originalUrl: ''
      },
      // 需要查字典
      coverStyleList: [],

      isOriginalList: [
        {
          value: true,
          label: '原创'
        },
        {
          value: false,
          label: '转载'
        }
      ],
      // 判断是转载还是原创
      flag: true,
      // 封面弹框
      coverDialog: false,
      // 附件左侧目录
      annexList: [],
      // 封面左侧目录
      coverList: [],
      coverprops: {
        label: 'dirName',
        value: 'dirId',
        children: 'subDirList'
      },
      dictTypeCode: 'file',
      // 弹框标签
      tab_plane: [
        {
          label: '文件库',
          name: 'file'
        },
        {
          label: '素材库',
          name: 'material'
        }
      ],
      // 封面弹框列表
      coverFileList: [],
      // 附件弹框列表
      annexFileList: [],
      // 附件弹框
      annexDialog: false,
      // 选择频道
      channelprops: {
        label: 'name',
        value: 'channelId',
        children: 'treeChildren'
      },
      channelList: [],
      channelShow: false,
      // 选择栏目
      columnprops: {
        label: 'columnName',
        value: 'columnId',
        children: 'childrenColumnList'
      },
      arrColumn: [],
      columnList: [],
      columnShow: false,
      // 封面上传
      postData: {
        key: '',
        host: '',
        policy: '',
        OSSAccessKeyId: '',
        signature: '',
        expire: -1,
        callback: ''
      },
      // 上传地址
      action: '',
      // 查看文件路径
      domain: '',
      // 封面上传
      postData1: {
        key: '',
        host: '',
        policy: '',
        OSSAccessKeyId: '',
        signature: '',
        expire: -1,
        callback: ''
      },
      // 上传地址
      action1: '',
      // 查看文件路径
      domain1: '',
      remark1: '',
      remark2: ''
    }
  },
  created () {
    this.grtDict()
    this.grtcoverStyleList()
    this.getcolumnList()
    this.getchannelList()
    this.$api.INIT_CONFIG().then(({ data }) => {
      this.getUploadCode1(data)
      this.getUploadCode2(data)
    })
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    // 上传说明
    queryByFileUploadCode (data) {
      this.$api.GET_queryByFileUploadCode({
        uploadCode: 'Upload-content-cover',
        consumerId: data.platformId,
        consumerType: '1'
      }).then(({ data }) => {
        console.log(data)
      })
    },
    // 查询封面上传配置信息
    getUploadCode1 (data) {
      this.$api.GET_UPLOADCODE({
        uploadCode: 'Upload-content-cover',
        consumerId: data.platformId,
        consumerType: '1'
      }).then(({ data }) => {
        this.remark1 = data
      })
    },
    // 查询附件上传配置信息
    getUploadCode2 (data) {
      this.$api.GET_UPLOADCODE({
        uploadCode: 'Upload-content-attachment',
        consumerId: data.platformId,
        consumerType: '1'
      }).then(({ data }) => {
        this.remark2 = data
      })
    },
    // 删除选择频道标签
    handleCloseChannel (index) {
      this.channelIds.splice(index, 1)
    },
    // 删除选择栏目标签
    handleCloseColumn (index) {
      this.columnIds.splice(index, 1)
    },
    // 封面上传
    async beforeUpload (file) {
      await this.$api.GETTOKEN({
        fileSize: file.size,
        fileName: file.name,
        fileType: 'img',
        dictTypeCode: 'material',
        uploadCode: 'Upload-content-cover' // TODO需产品确认
      }).then(({ data }) => {
        if (data.ossType === 'ALI_YUN') {
          this.postData = data.aliYun
          this.action = data.aliYun.host
          this.domain = data.aliYun.host
        } else {
          this.postData = data.qiniu
          this.action = data.qiniu.host
          this.domain = data.qiniu.domain
        }
      })
      return true
    },
    successUpload () {
      this.coverUrls.push(this.domain + '/' + this.postData.key)
    },
    // 封面弹框选择文件
    coverHandleSelectionChange (val) {
      this.coverCloudList = val
    },
    // 封面去选择
    coverCloud () {
      this.coverDialog = false
    },

    // 附件上传
    async beforeUpload1 (file) {
      await this.$api.GETTOKEN({
        fileSize: file.size,
        fileName: file.name,
        fileType: 'doc',
        dictTypeCode: 'file',
        uploadCode: 'Upload-content-attachment' // TODO需产品确认
      }).then(({ data }) => {
        if (data.ossType === 'ALI_YUN') {
          this.postData1 = data.aliYun
          this.action1 = data.aliYun.host
          this.domain1 = data.aliYun.host
        } else {
          this.postData1 = data.qiniu
          this.action1 = data.qiniu.host
          this.domain1 = data.qiniu.domain
        }
      })
      return true
    },
    successUpload1 (response, file, fileList) {
      fileList.forEach(item => {
        item.attachmentUrl = item.response.data
        item.attachmentName = item.name
      })
      this.attachmentUrls = fileList
    },
    // 移除上传的文件
    removeUpload (file, fileList) {
      const url = file.response.data
      const index1 = this.coverUrls.findIndex(item1 =>
        item1 == url
      )
      const index2 = this.coverCloudList.findIndex(item2 =>
        item2.fileUrl == url
      )
      if (index1 >= 0) {
        this.coverUrls.splice(index1, 1)
      }
      if (index2 >= 0) {
        this.coverCloudList.splice(index2, 1)
      }

      console.log(file, fileList)
      console.log(this.coverUrls)
    },
    // 附件弹框选择文件
    annexHandleSelectionChange (val) {
      val.forEach(item => {
        item.attachmentUrl = item.fileUrl
        item.attachmentName = item.fileName
      })
      this.annexCloudList = val
    },
    // 附件去选择
    annexCloud () {
      this.annexDialog = false
    },

    changeOriginal (val) {
      if (!val) {
        this.flag = false
      } else {
        this.flag = true
      }
    },
    // 获取内容类型
    grtDict () {
      this.$api.DICT_LIST({
        typeCode: 'content_type'
      }).then(({ data }) => {
        this.dynamicTags = data
      })
    },
    // 获取封面样式
    grtcoverStyleList () {
      this.$api.DICT_LIST({
        typeCode: 'cover_style'
      }).then(({ data }) => {
        this.coverStyleList = data
      })
    },

    // 选择栏目列表
    getcolumnList () {
      this.$api.COLUMN_LIST().then(({ data }) => {
        this.columnList = data
      })
    },
    // 确定选择栏目
    getColumnCheckedNodes () {
      this.columnIds = this.$refs.columnTree.getCheckedNodes().concat(this.$refs.columnTree.getHalfCheckedNodes())
      this.columnShow = false
    },

    // 选择频道列表
    getchannelList () {
      this.$api.CHANNEL_LIST().then(({ data }) => {
        this.channelList = data.list
      })
    },
    // 确定选择频道
    getChannelCheckedNodes () {
      this.channelIds = this.$refs.channelTree.getCheckedNodes().concat(this.$refs.channelTree.getHalfCheckedNodes())
      this.channelShow = false
    },

    // 去选择封面
    coverUpload () {
      console.log('去选择封面')
      this.coverDialog = true
      this.getCover()
      this.getCoverFileList()
    },
    // 去选择附件
    annexUpload () {
      console.log('去选择附件')
      this.annexDialog = true
      this.getAnnex()
      this.getAnnexFileList()
    },
    // 封面弹框左侧目录
    getCover () {
      this.$api
        .GET_Source_MENU({
          opDomainCode: 'baseService',
          dictTypeCode: this.dictTypeCode,
          fileType: 'img'
        })
        .then(({ data }) => {
          this.coverList = data
        })
    },
    // 附件弹框左侧目录
    getAnnex () {
      this.$api
        .GET_Source_MENU({
          opDomainCode: 'baseService',
          dictTypeCode: this.dictTypeCode,
          fileType: 'doc'
        })
        .then(({ data }) => {
          this.annexList = data
        })
    },
    // 封面弹框tab栏切换
    coverhandleClick (val) {
      console.log(val.name)
      this.dictTypeCode = val.name
      this.getCover()
      this.getCoverFileList()
    },
    // 封面左侧目录切换
    clickNodeCover (val) {
      this.getCoverFileList(val.dirId)
    },
    getCoverFileList (id) {
      this.$api.GetSourceList({
        opDomainCode: 'baseService',
        dictTypeCode: this.dictTypeCode,
        file_type: 'img',
        dirId: id || '',
        pageNum: '1',
        pageSize: '1000',
        fileSize: this.remark1.uploadLimitSize,
        fileSuffixs: this.remark1.fileFormat
      }).then(({ data }) => {
        this.coverFileList = data.list
      })
    },

    // 附件弹框tab栏切换
    annexhandleClick (val) {
      console.log(val.name)
      this.dictTypeCode = val.name
      this.getAnnex()
      this.getAnnexFileList()
    },
    // 附件左侧目录切换
    clickNodeAnnex (val) {
      this.getAnnexFileList(val.dirId)
    },
    getAnnexFileList (id) {
      this.$api.GetSourceList({
        opDomainCode: 'baseService',
        dictTypeCode: this.dictTypeCode,
        file_type: 'doc',
        dirId: id || '',
        pageNum: '1',
        pageSize: '1000',
        fileSize: this.remark2.uploadLimitSize,
        fileSuffixs: this.remark2.fileFormat
      }).then(({ data }) => {
        this.annexFileList = data.list
      })
    },

    submit () {
      // // 选择栏目处理
      const columnArr = []
      this.columnIds.map(item => {
        columnArr.push(item.columnId)
      })

      // // 选择频道处理
      const channelArr = []
      this.channelIds.map(item => {
        channelArr.push(item.channelId)
      })

      // // 去选择封面处理
      const coverCloudArr = []
      this.coverCloudList.forEach(item => {
        coverCloudArr.push(item.fileUrl)
      })
      // 去除coverUrls里面的null值
      const urlArr = this.coverUrls.concat(coverCloudArr).filter(elem => {
        return elem && elem.trim()
      })
      this.$api.ADD_CONTENT({
        channelIds: channelArr, // 频道
        columnIds: columnArr, // 栏目
        // coverUrls: [this.coverUrls[this.coverUrls.length - 1]].concat(coverCloudArr), // 封面
        coverUrls: urlArr, // 封面
        contentAttachmentFormList: this.attachmentUrls.concat(this.annexCloudList), // 附件
        ...this.form
      }).then(() => {
        this.$notify({
          title: '提示',
          message: '新增文章成功',
          type: 'success'
        })
        const tagName = this.$route.fullPath
        this.close({ tagName }).then(item => { this.$router.push({ path: '/article/list' }) })
      })
    }
  }
}
</script>

<style lang="scss">
.add_content {
  background: #fff;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 100px;
}
.tag {
  display: flex;
  li {
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    width: 150px;
    line-height: 40px;
    text-align: center;
    margin-right: 10px;
    &:hover {
      color: #fff;
      background: #409eff;
      cursor: pointer;
    }
    &.active {
      color: #fff;
      background: #409eff;
    }
  }
}
</style>
