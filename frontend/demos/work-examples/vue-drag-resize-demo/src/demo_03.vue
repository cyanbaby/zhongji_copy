<template>
  <div id="app">
      <div class="list" id="list">
          <VueDragResize v-for="(rect, index) in rects"
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
                         v-on:resizing="changeSize($event, index)"
          >
            <div class="filler" :style="{backgroundColor:rect.color}">
              <h1>{{ rect.text }}, z-index: {{ rect.zIndex }}</h1>
            </div>
          </VueDragResize>
      </div>

      <bullet></bullet>
  </div>
</template>

<style>
  body {
      height: 100vh;
      width: 100vw;
      background-color: #ECECEC;
  }
  #app {
      margin: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: relative;
      font-family: 'Lato', sans-serif;
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
      box-shadow: 0 0 2px #AAA;
      background-color: white;
  }
  .box-shaddow {
      box-shadow:  10px 10px 15px 0px rgba(125,125,125,1);
  }
</style>

<script>
  // import VueDragResize from '../components/vue-drag-resize.vue';
  import VueDragResize from 'vue-drag-resize';
  import bullet from './components/bullet/bullet.vue';


  import './icons';
  export default {
    name: 'app',
    components: {
      VueDragResize,
      bullet
    },
    data() {
      return {
        listWidth: 0,
        listHeight: 0
      }
    },
    mounted() {
      let listEl = document.getElementById('list');
      this.listWidth = listEl.clientWidth;
      this.listHeight = listEl.clientHeight;
      window.addEventListener('resize', () => {
        this.listWidth = listEl.clientWidth;
        this.listHeight = listEl.clientHeight;
      })
    },
    computed: {
      rects() {
        return this.$store.state.rect.rects
      }
    },
    methods: {
      // 点击拖拽元素激活事件
      activateEv(index) {
        console.group('激活拖拽元素的 index => activateEv(index)')
        console.log(index)
        console.groupEnd()

        this.$store.dispatch('rect/setActive', { id: index });
      },

      // 点击其他，激活元素的失去激活事件
      deactivateEv(index) {
        console.group('失去激活元素的 index => deactivateEv(index)')
        console.log(index)
        console.groupEnd()

        // 未设置的活动
        this.$store.dispatch('rect/unsetActive', { id: index });
      },

      // 每当拖动组件时调用
      changePosition(newRect, index) {

        console.group('拖动组件 => changePosition(newRect, index) ')
        console.log(newRect)
        console.log(index)
        console.groupEnd()

        this.$store.dispatch('rect/setTop', { id: index, top: newRect.top });
        this.$store.dispatch('rect/setLeft', { id: index, left: newRect.left });
        this.$store.dispatch('rect/setWidth', { id: index, width: newRect.width });
        this.$store.dispatch('rect/setHeight', { id: index, height: newRect.height });
      },

      // 每当组件调整大小时调用
      changeSize(newRect, index) {
        console.group('调整大小 => changeSize(newRect, index) ')
        console.log(newRect)
        console.log(index)
        console.groupEnd()

        this.$store.dispatch('rect/setTop', { id: index, top: newRect.top });
        this.$store.dispatch('rect/setLeft', { id: index, left: newRect.left });
        this.$store.dispatch('rect/setWidth', { id: index, width: newRect.width });
        this.$store.dispatch('rect/setHeight', { id: index, height: newRect.height });
      }
    }
}
</script>