<template>
  <div>
    <TinymceEditor :value="content" @input="newContent"></TinymceEditor>
  </div>
</template>

<script>
import TinymceEditor from "@/components/editor";
export default {
  components: {
    TinymceEditor,
  },
  data() {
    return {
      content: "222222222",
    };
  },
  methods: {
    //获取富文本的内容
    newContent(val) {
      this.$set(this.currInfo, "content", val);
    },
  },
};
</script>

<style></style>
