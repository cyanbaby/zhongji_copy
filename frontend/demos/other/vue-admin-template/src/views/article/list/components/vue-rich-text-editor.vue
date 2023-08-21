<template>
    <div>
        <vue-ueditor-wrap v-model="content" :config="editorConfig" @ready="ready" @beforeInit="addCustomButtom">
        </vue-ueditor-wrap>

          <!-- 上传 -->
    <el-dialog title="上传图片" :visible.sync="imgUploadDialog" width="800px" :close-on-click-modal=false>
          <resource-uploader ref="pictureResourceUploader"
          :memuData="menu"
          uploadCode="Upload-file-img"
          resourceName="本地图片"
          resourceSuffix=".jpg,.png"
          resourceType="img"
          @uploadComplete="uploadComplete"
           >
          </resource-uploader>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="submitUpload">确认上传</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
// import ResourceUploader from '../../../base/components/resource-uploader.vue'
import ResourceUploader from '@/views/base/components/resource-uploader.vue'

export default {
  components: {
    VueUeditorWrap,
    ResourceUploader
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {},
    maxWordCount: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      theEditor: null,
      menu: [],
      imgUploadDialog: false,
      editorId: '',
      content: '',
      editorConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 400, // 初始容器高度
        initialFrameWidth: '100%', // 初始容器宽度
        serverUrl: this.getBaseUrl() + '/baseservice/ueditor/ueditorConfig', // 上传文件的接口
        UEDITOR_HOME_URL: '/UE/', // UE根目录
        maximumWords: this.maxWordCount,
        autoFloatEnabled: false,
        // 图片上传配置区
        imageUrl: 'http://up.qiniu.com/', // 图片上传提交地址
        imagePath: 'http://duoduo.u.qiniudn.com/', // 图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
        // 七牛结合需要改成file
        imageFieldName: 'file',
        toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'emotion', 'map', 'insertframe', 'insertcode', 'pagebreak', 'template', 'background', '|',
          'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
          'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
          'print', 'preview', 'searchreplace'
        ]]
      }
    }
  },
  created () {
    this.editorConfig = Object.assign(this.editorConfig, this.config)
  },
  methods: {
    uploadComplete (params) {
      console.log('文件上传完成：{}', params)
      this.theEditor.execCommand('inserthtml', '<img src="' + params.url + '"/>')
    },
    submitUpload () {
      this.$refs.pictureResourceUploader.doUpload()
    },
    async queryMenu () {
      await this.$api
        .GET_Source_MENU({
          dictTypeCode: 'file',
          fileType: 'img'
        })
        .then(res => {
          this.menu = res.data
        })
    },
    ready (editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
      this.theEditor = editorInstance
      this.editorId = editorInstance.key
    },
    addCustomButtom () {
      const _this = this
      window.UE.registerUI('test-button', function (editor, uiName) {
        // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
          execCommand: function () {
            editor.execCommand('inserthtml', '<span>这是一段由自定义按钮添加的文字</span>')
          }
        })

        // 创建一个 button
        var btn = new window.UE.ui.Button({
          // 按钮的名字
          name: uiName,
          // 提示
          title: '鼠标悬停时的提示文字',
          // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
          // cssRules: "background-image: url('/images/upload.png') !important;background-size: cover;",
          // 点击时执行的命令
          onclick: function () {
            // 这里可以不用执行命令，做你自己的操作也可
            // editor.execCommand(uiName)
            _this.showUploadDialog()
          }
        })

        // 当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(uiName)
          if (state === -1) {
            btn.setDisabled(true)
            btn.setChecked(false)
          } else {
            btn.setDisabled(false)
            btn.setChecked(state)
          }
        })

        // 因为你是添加 button，所以需要返回这个 button
        return btn
      }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */,
      this.editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
      )
    },
    showUploadDialog () {
      this.queryMenu()
      this.imgUploadDialog = true
      this.$nextTick(params => {
        this.$refs.pictureResourceUploader.clearFiles()
      })
    },
    getBaseUrl () {
      const { promiseBaseUrl } = document.querySelector('body').dataset
      return promiseBaseUrl || process.env.VUE_APP_API
    },
    getContent () {
      return this.content
    }
  },
  watch: {
    content: {
      handler: function (newVal, oldVal) {
        this.$emit('input', newVal)
      }
    },
    value: {
      handler: function (newVal, oldVal) {
        this.content = newVal
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
