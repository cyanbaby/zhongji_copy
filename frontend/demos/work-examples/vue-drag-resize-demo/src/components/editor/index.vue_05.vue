<template>
  <div>
    <Editor id="tinymce" v-model="value" :init="init"> </Editor>
    <div v-html="value"></div>
  </div>
</template>

<script>
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
// import "tinymce/themes/silver/theme";
// 这里引入报错可以替换成
// import 'tinymce/themes/modern/theme'
// import "tinymce/icons/default";
//显示富文本图标，如果不加富文本图标显示会变成 !not found

export default {
  components: { Editor },
  data() {
    return {
      value: "111",
      init: {
        language_url: "/zh-Hans.js", // 语言包位置，因为放在public下所以可以省略public
        selector: "#tinymce", //tinymce的id
        language: "zh_CN", //语言类型
        skin_url: "/skins/ui/oxide",
        height: 500, // 编辑器高度
        branding: false, //是否禁用“Powered by TinyMCE”
      },
    };
  },
  mounted() {
    tinymce.init({});
  },
};
</script>

<style></style>
