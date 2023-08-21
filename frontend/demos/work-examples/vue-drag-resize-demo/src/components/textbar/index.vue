<template>
  <div v-show="isShowBar" class="textbar">
    <div style="position: relative">
      <span>选字体</span>
      <div
        v-show="showFontFamilyDropdown"
        style="
          width: 100px;
          height: 200px;
          position: absolute;
          z-index: 9;
          background-color: #fff;
        "
        
      >
        下拉<br />
        下拉<br />
        下拉<br />
        下拉<br />
        下拉<br />
      </div>
    </div>
    <input type="text" name="lname"><br>
    <i class="el-icon-delete"></i>
  </div>
</template>

<script>
export default {
  name: "textBar",
  props: {
    index: {
      type: Number,
    },
  },
  data() {
    return {
      msg: "",
      // todo isShow delteBtn

      fontFamily: "Arial,Helvetica,sans-serif",
      showFontFamilyDropdown: false,
      fontFamilyList: [
        {
          label: "Arial",
          value: "Arial,Helvetica,sans-serif",
        },
        {
          label: "黑体",
          value: "SimHei,STHeiti",
        },
        {
          label: "宋体",
          value: "font-family: SimSun,STSong",
        },
      ],

      fontSize: 1,
    };
  },
  computed: {
    activeRect() {
      return this.$store.getters["rect/getActive"];
    },
    isShowBar() {
      // todo && 控件类型
      return this.activeRect === this.index;
    },
  },
  methods: {
    preventSuffix(e) {
      e.stopPropagation();
    },
  },
};
</script>

<style lang="scss" scoped>
.textbar {
  position: absolute;
  width: 450px;
  height: 34px;
  top: -60px;

  padding: 6px 16px;
  border-top: 0;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 0px rgb(39 39 74 / 10%);

  display: flex;
  // justify-content: center;
  align-items: center;

  .el-icon-delete {
    margin-left: auto;
    &:hover {
      color: #409eff;
      // border-color: #c6e2ff;
      background-color: #ecf5ff;
      cursor: pointer;
    }
  }
}
</style>
