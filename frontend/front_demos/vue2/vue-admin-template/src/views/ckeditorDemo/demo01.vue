<template>
  <div class="demo">
    <div class="editor">
      <ckeditor :editor="editorPackage" v-model="editorData" :config="editorConfig"  @ready="onReady"></ckeditor>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import CKEditor from "@ckeditor/ckeditor5-vue2"
// import editorPackage from './ckeditor-01/build/ckeditor'
import editorPackage from './ckeditor-02/build/ckeditor'
import Vue from 'vue'
Vue.use(CKEditor) // 全局注册


export default {
  data() {
    return {
      editor: null,
      // 编辑器对象
      editorPackage: editorPackage,
      // 编辑器配置
      editorConfig: {
      },
      editorData: '你好富文本'
    }
  },
  methods: {
    onReady(editor) {
      // 获得编辑器对象做处理
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
      this.editor = editor
    },
  }
}
</script>

<style lang="scss">
.demo {
  margin: 20px;
}
.ck-content.ck-editor__editable {
  border: 1px solid #e3e8ed;
}
</style>
