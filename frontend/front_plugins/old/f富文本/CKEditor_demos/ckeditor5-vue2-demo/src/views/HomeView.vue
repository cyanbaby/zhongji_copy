<template>
  <div>
    <!-- 工具栏容器 -->
    <div id="toolbar-container"></div>
    <!-- 编辑器容器 -->
    <div id="ykEditor"></div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
// import uploadImageAdapter from "@/static/uploadImageAdapter";
class uploadImageAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    //获取到用户上传的文件
    const image = await this.loader.file;
    const formData = new FormData();

    formData.append("file", image);
    /***
     * axios实现上传逻辑
     *
     */

    //返回的结果格式化一下,把url传到下面的json中
    let resultJson = { uploaded: 1, url: "/" };

    return resultJson;
  }

  abort() {}
}

export default {
  name: "ClassicEditor",

  // props: {
  //   content: {
  //     type: String,
  //     default: "",
  //   },
  // },

  data() {
    return {
      editor: null,
      content: ''
    };
  },

  mounted() {
    this.initEditor();
  },

  methods: {
    initEditor() {
      // console.log('ClassicEditor')
      // console.log(ClassicEditor.config)

      ClassicEditor.create(document.querySelector("#ykEditor"), {
        language: "zh-cn",
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "Link",
          "bulletedList",
          "numberedList",
          "|",
          "imageUpload",
          "blockQuote",
          "|",
          "undo", //撤销
          "redo", //重做
        ],
      })
        .then((editor) => {
          const toolbarContainer = document.querySelector("#toolbar-container");
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          //正式初始化编辑器
          this.editor = editor;

          //使用图片上传适配器
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new uploadImageAdapter(loader);
          };

          //监听数据变化
          editor.model.document.on("change:data", () => {
            this.content = editor.getData();
          });

          // console.log(editor.config._config.height = '100px')
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getContent() {
      return this.content;
    },

    setContent(val) {
      this.editor.setData(val);
    },
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 400px;
}
</style>
