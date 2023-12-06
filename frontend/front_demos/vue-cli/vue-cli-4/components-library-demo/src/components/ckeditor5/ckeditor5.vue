<template>
    <div>
        <!-- templateContentOptions -->
        <div style="margin-bottom:10px;">
            <el-select v-model="templateContentOptions1" placeholder="请选择" style="margin-right: 10px;" @change="input1Change">
                <el-option
                    v-for="(item,index) in inputOption1"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="templateContentOptions2" placeholder="请选择" style="margin-right: 10px;">
                <el-option
                    v-for="(item,index) in inputOption2"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="templateContentChange()">插入字段值</el-button>
        </div>
        <div class="editor">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @ready="onReady"></ckeditor>
        </div>
    </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@/plugin/ckeditor/build/ckeditor'
import '../../plugin/ckeditor/build/translations/zh'
import UploadAdapter from './uploadAdapter1'
import Vue from 'vue'
Vue.use(CKEditor) // 全局注册

console.log('ClassicEditor')
console.log(ClassicEditor)

function uploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader, Vue)
}
export default {
  props: {
    inputOption1: {
      type: Array,
      default: () => []
    },
    inputOption2: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      templateContentOptions1: '',
      templateContentOptions2: '',
      // 编辑器对象
      editor: ClassicEditor,
      // 编辑内容
      editorData: '',
      // 编辑器配置
      editorConfig: {
        // 配置语言
        language: 'zh-cn',
        // ckfinder: {
        //   // 如果要使用图片上传功能，需填写后端图片上传url
        //   uploadUrl: `${(location.origin + "/api") || promiseBaseUrl || process.env.VUE_APP_API}/base-service/upload/uploadimg`
        // }
        extraPlugins: [ uploadAdapterPlugin ],
      }
    }
  },
  // 监听
  watch: {
    editorData: { // 实时将编辑器内数据传给父组件
      handler (newval) {
        this.$emit('getEditData', newval)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    
    onReady (editor) {
      // 获得编辑器对象做处理
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
      this.editor = editor
    },
    templateContentChange () {
      const _this = this
      _this.editor.model.change(writer => {
        const selection = _this.editor.model.document.selection
        const currentAttributes = selection.getAttributes()
        const insertPosition = selection.focus
        // writer.insertText( '${'+_this.templateContentOptions1+' | ' +_this.templateContentOptions2 + '}', currentAttributes, insertPosition );
        writer.insertText('{' + _this.templateContentOptions2 + '}', currentAttributes, insertPosition)
      })
    },
    input1Change (val) {
      this.templateContentOptions2 = ''
      this.$emit('input1Change', val)
    },
    // 清除所有显示
    setEditorData (val) {
      this.templateContentOptions1 = ''
      this.templateContentOptions2 = ''
      this.editorData = val
    }
  }
}

</script>

<style lang="scss" scoped>
    .editor {
        margin-bottom: 40px;
        border: 1px solid #ccc!important;
        background: #fafafa;
        ::v-deep .ck-toolbar {
            border: none;
            border-bottom: 1px solid #c4c4c4;
        }
        ::v-deep .ck-editor__editable {
            // width: 60%;
            min-height: 21cm;
            border: 1px hsl( 0,0%,82.7% ) solid;
            background: white;
            box-shadow: 0 0 5px hsl(0deg 0% 0% / 10%);
            margin: 0 auto;
            margin: calc( 2 * calc(0.6em * 1.5) )  auto;
        }
        ::v-deep .ck-content {
            li {
                list-style: auto;
            }
            ul {
                li {
                    list-style: inside;
                }
            }
        }
    }
</style>
