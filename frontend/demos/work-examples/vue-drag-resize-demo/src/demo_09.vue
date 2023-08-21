<template>
  <div id="app">
    <div class="list" id="list">
      
  
        <!-- 
          width: tinyMceObject.width+'px',
          height: tinyMceObject.height+'px', 
        -->
        <div
          v-show="showTinyMCE"
          class="test"
          :style="{
            position: 'absolute',
            width: tinyMceObject.width+'px',
            height: tinyMceObject.height+'px',
            left: tinyMceObject.left+'px',
            top: tinyMceObject.top+'px',
            'z-index': 10,
            border: '1px solid #000'
          }"
        >
          <tinymce v-model="editorStr"  :width="'200px'" :height="'150px'" />
        </div>
        
      <template v-for="(rect, index) in rects">
          <!-- 
            :isDraggable="rect.draggable" 
            

          -->
        <VueDragResize
          v-if="rect.isShow"
          :key="index"
          :w="rect.width"
          :h="rect.height"
          :x="rect.left"
          :y="rect.top"
          :axis="rect.axis"
          :isActive="rect.active"
          :parentW="listWidth"
          :parentH="listHeight"
          :minw="rect.minw"
          :minh="rect.minh"
          :isDraggable="rect.draggable"
          :isResizable="rect.resizable"
          :parentLimitation="rect.parentLim"
          :snapToGrid="rect.snapToGrid"
          :aspectRatio="rect.aspectRatio"
          :z="rect.zIndex"
          :contentClass="rect.class"
          v-on:activated="activateEv(index)"
          v-on:deactivated="deactivateEv(index)"
          v-on:dragging="changePosition($event, index)"
          v-on:dragstop="dragStop($event, index)"
          v-on:resizing="changeSize($event, index)"
          v-on:resizestop="resizestop($event, index)"
          v-on:clicked="clickHandle"
        >
          <!-- <textbar :index="index" /> -->
          <!-- <div class="filler" :style="{ backgroundColor: rect.color }">
            <h1>
                text: {{ rect.text }} <br /><br />
                z-index: {{ rect.zIndex }}<br /><br />
                left: {{ rect.left }}, top: {{ rect.top }}<br /><br />
                width: {{ rect.width }}, height: {{ rect.height }}<br /><br />
              </h1>
           
          </div> -->
          <!-- <div v-if="rect.showHtml" class="test-class" v-html="rect.text" :style="{ backgroundColor: rect.color }"></div> -->
          <div v-show="!rect.active" class="test-class" v-html="rect.text" :style="{ backgroundColor: rect.color }"></div>

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


/* .tinymce-container,
.tinymce-textarea {
  height: 100%;
} */

.test-class {
  word-break: break-word;
}
</style>

<script>
// import VueDragResize from '../components/vue-drag-resize.vue';
import VueDragResize from "vue-drag-resize";
import bullet from "@/components/bullet/bullet.vue";
import textbar from '@/components/textbar'
// import Editor from "@tinymce/tinymce-vue";
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

      tinyMceObject: {
        position: 'absolute',
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      // showTinyMCE: false,

      editorStr: 'hhhhhhhhhhhhhhhhhhhhhhhhh'
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
    showTinyMCE() {
      return this.rects.some(element => element.active)
    }
  },
  methods: {
    
    clickHandle(e) {
      
      // e.target.focus()
      // console.log(e.target)

      // if (e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA") {
      //   e.target.focus();
      // }


      console.log('我先执行', e)

    },
    // 点击拖拽元素激活事件
    activateEv(index) {
      console.log('我后执行', index)

      console.group("激活拖拽元素的 index => activateEv(index)");
      console.log(index);
      

      this.$store.dispatch("rect/setActive", { id: index });

      // console.log(this.rects[this.activeRect]);
      const { left, top, width, height } = this.rects[this.activeRect]
      this.tinyMceObject.width = width
      this.tinyMceObject.height = height
      this.tinyMceObject.left = left
      this.tinyMceObject.top = top
      
      // this.rects[this.activeRect].showHtml = false
      // if(this.activeRect != null) {
     
      // }
      // this.$store.dispatch("rect/changeShowHtml", { id: index, showHtml: false });
      // this.showTinyMCE = true


      // console.log('this.rects[index].showHtml', this.rects[index].showHtml)
      console.groupEnd();


      // this.editorStr = this.rects[index].text
      this.editorStr = '哈哈哈哈'


      // this.resizeElement
      // this.$nextTick(() => {
      //   const width = document.querySelector('.tinymce-container').offsetWidth
      //   const height = document.querySelector('.tinymce-container').offsetHeight
      //   // console.log(width)
      //   // console.log(height)
      //   this.$store.dispatch("rect/resizeElement", { id: index, width, height });
      // })
      console.log('22222', this.editorStr)
    },

    // 点击其他，激活元素的失去激活事件
    deactivateEv(index) {

      // let doubleClick = false

      // if(index === this.activeRect) {
      //   doubleClick = true
      // }

      console.group('失去激活元素的 index => deactivateEv(index)')
      console.log(index)
      console.groupEnd()


      // 未设置的活动
      this.$store.dispatch("rect/unsetActive", { id: index });
      
      // console.group('失去激活元素的后 当前激活元素')
      // console.log(this.activeRect)
      // console.groupEnd()






      // if(this.activeRect == null) {
      //   this.$store.dispatch("rect/changeShowHtml", { id: index, showHtml: false });
      // } else {
      //   this.$store.dispatch("rect/changeShowHtml", { id: index, showHtml: true });
      // }

      
      // if(doubleClick) {
      //   // console.log('this.activeRect', this.activeRect)
      //   // console.log('index', index)
      //   if(this.activeRect != null) {
      //     this.$store.dispatch("rect/changeShowHtml", { id: this.activeRect, showHtml: false });
      //   } else {
      //     this.$store.dispatch("rect/changeShowHtml", { id: index, showHtml: true });
      //   }
        
      // } else {
      //   this.$store.dispatch("rect/changeShowHtml", { id: index, showHtml: true });
      // }
      

      // console.log(this.rects[index].showHtml)
      // console.groupEnd()

      // console.log(this.activeRect)
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
      
      // this.showTinyMCE = false
    },

    dragStop(newRect, index) {
      this.tinyMceObject.top = newRect.top
      this.tinyMceObject.left = newRect.left

      console.log(newRect.top)
      console.log(newRect.left)

      // this.showTinyMCE = true
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


      this.tinyMceObject.width = newRect.width
      this.tinyMceObject.height = newRect.height

      // this.$store.dispatch("rect/changeShowHtml", { id: index, showHtml: false });
    },

    // 每当组件调整大小时调用
    resizestop(newRect, index) {
      
    },
  },
};
</script>
