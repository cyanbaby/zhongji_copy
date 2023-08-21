<template>
  <div id="app">
    <div class="list" id="list">
      <template v-for="(rect, index) in rects">
          <!-- :isDraggable="rect.draggable" -->
        <VueDragResize
          v-if="rect.isShow"
          :key="index"
          :w="rect.width"
          :h="rect.height"
          :x="rect.left"
          :y="rect.top"
          :parentW="listWidth"
          :parentH="listHeight"
          :axis="rect.axis"
          :isActive="rect.active"
          :minw="rect.minw"
          :minh="rect.minh"
          :isDraggable="false"
          :isResizable="rect.resizable"
          :parentLimitation="rect.parentLim"
          :snapToGrid="rect.snapToGrid"
          :aspectRatio="rect.aspectRatio"
          :z="rect.zIndex"
          :contentClass="rect.class"
          v-on:activated="activateEv(index)"
          v-on:deactivated="deactivateEv(index)"
          v-on:dragging="changePosition($event, index)"
          v-on:resizing="changeSize($event, index)"
          v-on:clicked="clickHandle"
        >
          <!-- <textbar :index="index" /> -->
          <!-- <div class="filler" :style="{ backgroundColor: rect.color }">
            <h1>
              text: {{ rect.text }} <br /><br />
              z-index: {{ rect.zIndex }}<br /><br />
              left: {{ rect.left }}, top: {{ rect.top }}
            </h1>
    
          </div> -->

          <div class="filler" :style="{ backgroundColor: rect.color }">
            <tinymce v-model="testStr" :height="300" />
          </div>
      
        </VueDragResize>
      </template>
    </div>

    <bullet></bullet>
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


.tinymce-container,
.tinymce-textarea {
  height: 100%;
}
</style>

<script>
// import VueDragResize from '../components/vue-drag-resize.vue';
import VueDragResize from "vue-drag-resize";
import bullet from "@/components/bullet/bullet.vue";
import textbar from '@/components/textbar'
import Editor from "@tinymce/tinymce-vue";
import Tinymce from '@/components/Tinymce'

import "./icons";
export default {
  name: "app",
  components: {
    VueDragResize,
    bullet,
    textbar,
    // editor: Editor,
    Tinymce
  },
  data() {
    return {
      listWidth: 0,
      listHeight: 0,
      testStr: '你好世界'
    };
  },
  mounted() {
    let listEl = document.getElementById("list");
    this.listWidth = listEl.clientWidth;
    this.listHeight = listEl.clientHeight;
    window.addEventListener("resize", () => {
      this.listWidth = listEl.clientWidth;
      this.listHeight = listEl.clientHeight;
    });
  },
  computed: {
    rects() {
      return this.$store.state.rect.rects;
    },
    activeRect() {
      return this.$store.getters["rect/getActive"];
    },
  },
  methods: {
    clickHandle(e) {
      e.target.focus()

      console.log(e.target)
      // if (e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA") {
      //   e.target.focus();
      // }
    },
    // 点击拖拽元素激活事件
    activateEv(index) {
      console.group("激活拖拽元素的 index => activateEv(index)");
      console.log(index);
      console.groupEnd();

      this.$store.dispatch("rect/setActive", { id: index });
      console.log(this.rects[this.activeRect]);
    },

    // 点击其他，激活元素的失去激活事件
    deactivateEv(index) {
      // console.group('失去激活元素的 index => deactivateEv(index)')
      // console.log(index)
      // console.groupEnd()

      // 未设置的活动
      this.$store.dispatch("rect/unsetActive", { id: index });
    },

    // 每当拖动组件时调用
    changePosition(newRect, index) {
      // console.group('拖动组件 => changePosition(newRect, index) ')
      // console.log(newRect)
      // console.log(index)
      // console.groupEnd()

      this.$store.dispatch("rect/setTop", { id: index, top: newRect.top });
      this.$store.dispatch("rect/setLeft", { id: index, left: newRect.left });
      this.$store.dispatch("rect/setWidth", {
        id: index,
        width: newRect.width,
      });
      this.$store.dispatch("rect/setHeight", {
        id: index,
        height: newRect.height,
      });
    },

    // 每当组件调整大小时调用
    changeSize(newRect, index) {
      console.group("调整大小 => changeSize(newRect, index) ");
      console.log(newRect);
      console.log(index);
      console.groupEnd();

      this.$store.dispatch("rect/setTop", { id: index, top: newRect.top });
      this.$store.dispatch("rect/setLeft", { id: index, left: newRect.left });
      this.$store.dispatch("rect/setWidth", {
        id: index,
        width: newRect.width,
      });
      this.$store.dispatch("rect/setHeight", {
        id: index,
        height: newRect.height,
      });
    },
  },
};
</script>
