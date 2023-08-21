<template>
  <div id="app">
    <froala
      id="edit"
      :tag="'textarea'"
      :config="froalaConfig"
      v-model="froalaData"
    ></froala>
  </div>
</template>

<style>
body {
  height: 100vh;
  width: 100vw;
  background-color: #ececec;
}
#app {
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  font-family: "Lato", sans-serif;
}
.filler {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
}
.list {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 30px;
  right: 300px;
  box-shadow: 0 0 2px #aaa;
  background-color: white;
}
.box-shaddow {
  box-shadow: 10px 10px 15px 0px rgba(125, 125, 125, 1);
}
</style>

<script>

export default {
  name: "app",
  components: {
    
  },
  data() {
    return {
      froalaData: "",
      froalaConfig: {
        toolbarInline: true,
        //自定义工具栏
        toolbarButtons: [
          'undo',
          // 'redo',
          // 'clearFormatting',
          // 'bold',
          // 'italic',
          // 'underline',
          // 'strikeThrough',
          // 'fontFamily',
          // 'fontSize',
          // 'color',
          // 'inlineStyle',
          // 'paragraphFormat',
          // 'align',
          // 'formatOL',
          // 'formatUL',
          // 'outdent',
          // 'indent',
          // 'quote',
          // 'insertLink',
          // 'insertImage',
          // 'insertVideo',
          // 'embedly',
          // 'insertFile',
          // 'insertTable',
          // 'emoticons',
          // 'specialCharacters',
          // 'insertHR',
          // 'selectAll',
          // 'print',
          // 'spellChecker',
          // 'html',
          // 'help',
          // 'fullscreen',
        ],
        // theme: "dark",//主题
        placeholderText: "请在此输入",
        language: "zh_cn", //语言
        imageUploadURL: "http://i.froala.com/upload", //上传url
        imageUploadParams: { token: "", i: "", ak: "", f: 9 },
        fileUploadURL: "http://i.froala.com/upload",
        fileUploadParams: { token: "", i: "", ak: "", f: 9 },
        videoUploadURL: "http://i.froala.com/upload",
        videoUploadParams: { token: "", i: "", ak: "", f: 9 },
        // quickInsertButtons: ["image", "video", "table", "ul", "ol", "hr"], //快速插入项
        // toolbarVisibleWithoutSelection: true,//是否开启 不选中模式
        // disableRightClick: true,//是否屏蔽右击
        colorsHEXInput: true, //关闭16进制色值
        toolbarSticky: false, //操作栏是否自动吸顶,
        zIndex: 2501,
        height: "400",
        // autofocus: true,
        events: {
          initialized: function () {
            console.log(1);
          },
          blur: () => {
            console.log(123);
          },
          "image.beforeUpload": function (images) {
            console.log(images);
            return true;
          },
          "file.beforeUpload": function () {
            console.log(this.froalaData);
            return true;
          },
          "video.beforeUpload": function () {
            console.log(this.froalaData);
            return true;
          },
          contentChanged: () => {},
        },
      },
    }
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>
