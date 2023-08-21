<template>
  <div class="designer-container">
    <div class="designer-container__box">
      <div
        class="designer-container__box--size pdfDom"
        :style="{
          'background-image': `url(${bgCode})`,
          'width': pdfSize.width,
          'height': pdfSize.height
        }"
      >

        <div id="list" class="list" @click="handleClickList">
          <div style="position: absolute; left: 10px; top: 400px">
            activeRect: {{ activeRect }}
          </div>
          <template v-for="(rect, index) in rects">
            <VueDragResize
              v-if="rect.isShow"
              :key="index"
              :w="rect.width"
              :h="rect.height"
              :x="rect.left"
              :y="rect.top"
              :axis="rect.axis"
              :is-active="rect.active"
              :parent-w="listWidth"
              :parent-h="listHeight"
              :minw="rect.minw"
              :minh="rect.minh"
              :is-draggable="rect.draggable"
              :is-resizable="rect.resizable"
              :parent-limitation="rect.parentLim"
              :snap-to-grid="rect.snapToGrid"
              :aspect-ratio="rect.aspectRatio"
              :z="rect.zIndex"
              :content-class="rect.class"
              @activated="activateEv(index)"
              @deactivated="deactivateEv(index)"
              @dragging="changePosition($event, index)"
              @dragstop="dragStop($event, index)"
              @resizing="changeSize($event, index)"
              @resizestop="resizestop($event, index)"
              @clicked="handleClickDragElement"
            >
              <div
                v-show="!rect.active"
                class="showhtml-box"
                :style="{
                  width: rect.width+'px',
                  height: rect.height+'px'
                }"
                v-html="rect.text"
              ></div>
            </VueDragResize>
          </template>
          <div
            v-show="showTinyMCE"
            class="tinymce-box"
            :style="{
              position: 'absolute',
              width: tinyMceObject.width + 'px',
              height: tinyMceObject.height + 'px',
              left: tinyMceObject.left + 'px',
              top: tinyMceObject.top + 'px',
              'z-index': 1,
              'background-color': '#ccc',
              'border-radius': '8px'
            }"
            @click="handleClickTinymceBox($event)"
          >
            <tinymce
              v-show="showTinyMCE"
              :value="editorStr"
              :width="tinyMceObject.width"
              :height="tinyMceObject.height"
              @input="handleChangeEditValue"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueDragResize from 'vue-drag-resize'
import Tinymce from '../Tinymce'
import Bus from '../../bus'

import './icons'

function dotProduct(pointA, pointB, pointE) {
  return (
    (pointB.x - pointA.x) * (pointE.x - pointA.x) +
    (pointB.y - pointA.y) * (pointE.y - pointA.y)
  )
}

function isPointInFourPoints(pointE, pointA, pointB, pointC, pointD) {
  let AB = dotProduct(pointA, pointB, pointE)
  let BC = dotProduct(pointB, pointC, pointE)
  let CD = dotProduct(pointC, pointD, pointE)
  let DA = dotProduct(pointD, pointA, pointE)
  return AB >= 0 && BC >= 0 && CD >= 0 && DA >= 0
}

const closestReplenish = function (ele, tar) {
  var elArr = (function () {
    if (tar instanceof HTMLElement) return [tar]

    try {
      tar = document.querySelectorAll(tar)
    } catch (e) {
    } finally {
      var type = Object.prototype.toString.call(tar).slice(8, -1)
      if (['NodeList', 'HTMLCollection', 'Array'].indexOf(type) > -1)
        return [].slice.call(tar)
    }
  })()

  do {
    if (elArr.indexOf(ele) > -1) return ele

    ele = ele.parentElement
  } while (ele !== null)

  return null
}

export default {
  name: 'Designer',
  components: {
    VueDragResize,
    // editor: Editor,
    Tinymce
  },
  props: {
    bgCode: {
      type: String,
      default: ''
    },
    pdfSize: {
      type: Object,
      default: () => {
        return {
          width: '1123px',
          height: '794px'
        }
      }
    }
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
        top: 0
      },
      showTinyMCE: false,

      editorStr: '',
      editorStrCopy: '',
      pointE: {
        x: 0,
        y: 0
      },

      beforeDragLeft: 0,
      beforeDragTop: 0,

      onlyActive: -1,
      pointList: {
        x: 0,
        y: 0
      }
    }
  },
  mounted() {
    let listEl = document.getElementById('list')

    this.listWidth = listEl.clientWidth
    this.listHeight = listEl.clientHeight
    window.addEventListener('resize', () => {
      this.listWidth = listEl.clientWidth
      this.listHeight = listEl.clientHeight
    })

    // Bus.$on('show-right',() => {
    //   console.log('显示right')
    // })
    // Bus.$on('hide-right',() => {
    //   console.log('隐藏right')
    // })
  },
  computed: {
    rects() {
      return this.$store.state.rect.rects
    },

    activeRect() {
      return this.rects.findIndex((e) => e.active)
    }
  },
  methods: {
    handleClickList(e) {
      if (this.activeRect === -1) {
        const ractDom =
          closestReplenish(e.target, '.vdr') ||
          closestReplenish(event.target, '.tinymce-box')
        if (!ractDom) {
          this.showTinyMCE = false
        }
      }
    },

    handleMouseOverList(e) {
      this.pointList.x = e.offsetX
      this.pointList.y = e.offsetY
    },

    handleClickDragElement(e) {
      const currentElem = closestReplenish(e.target, '.vdr')
      const ev = {
        x: parseInt(currentElem.style.left, 10) + e.offsetX,
        y: parseInt(currentElem.style.top, 10) + e.offsetY
      }

      this.changePointE(ev)
    },

    handleClickTinymceBox(event) {
      const tinymceBox = closestReplenish(event.target, '.tinymce-box')

      const ev = {
        x: parseInt(tinymceBox.style.left, 10) + event.offsetX,
        y: parseInt(tinymceBox.style.top, 10) + event.offsetY
      }

      this.changePointE(ev)

      let id
      const result = this.rects.some((element, index) => {
        const r = this.isInner(element, ev)
        if (r) {
          id = index
        }
        return r
      })

      if (result && id != null) {
        this.$store.dispatch('rect/setActive', { id })
      }
    },

    isInner(element, event) {
      const pointA = { x: element.left, y: element.top }
      const pointB = { x: element.left + element.width, y: element.top }
      const pointC = {
        x: element.left + element.width,
        y: element.top + element.height
      }
      const pointD = { x: element.left, y: element.top + element.height }

      return isPointInFourPoints(event, pointA, pointB, pointC, pointD)
    },

    changePointE(e) {
      this.pointE.x = e.x
      this.pointE.y = e.y
    },

    setTinySizePosition(obj) {
      this.tinyMceObject.width = obj.width - 20
      this.tinyMceObject.height = obj.height - 20
      this.tinyMceObject.left = obj.left + 10
      this.tinyMceObject.top = obj.top + 10
    },

    // 点击拖拽元素激活事件
    activateEv(index) {
      const { left, top } = this.rects[index]
      this.beforeDragLeft = left
      this.beforeDragTop = top

      this.$store.dispatch('rect/setActive', { id: index })
      this.onlyActive = index

      this.setTinySizePosition(this.rects[index])

      this.showTinyMCE = true
      this.editorStr = this.rects[index].text
    },

    // 点击其他，激活元素的失去激活事件
    deactivateEv(index) {
      // 未设置的活动
      this.$store.dispatch('rect/unsetActive', { id: index })
    },

    // 每当拖动组件时调用
    changePosition(newRect, index) {
      this.$store.dispatch('rect/setTop', { id: index, top: newRect.top })
      this.$store.dispatch('rect/setLeft', { id: index, left: newRect.left })
      this.$store.dispatch('rect/setWidth', {
        id: index,
        width: newRect.width
      })
      this.$store.dispatch('rect/setHeight', {
        id: index,
        height: newRect.height
      })

      this.showTinyMCE = false
    },

    dragStop(newRect, index) {
      //  tip 同步 tinyMCE
      this.setTinySizePosition(newRect)

      const xx = newRect.left - this.beforeDragLeft
      const yy = newRect.top - this.beforeDragTop

      this.pointE.x = this.pointE.x + xx
      this.pointE.y = this.pointE.y + yy

      this.showTinyMCE = true
    },

    // 每当组件调整大小时调用
    changeSize(newRect, index) {
      console.group('resize')
      console.groupEnd()

      this.$store.dispatch('rect/setTop', { id: index, top: newRect.top })
      this.$store.dispatch('rect/setLeft', { id: index, left: newRect.left })
      this.$store.dispatch('rect/setWidth', {
        id: index,
        width: newRect.width
      })
      this.$store.dispatch('rect/setHeight', {
        id: index,
        height: newRect.height
      })

      // tip 同步 tinyMCE 宽高
      this.setTinySizePosition(newRect)
    },

    // 每当组件调整大小时调用
    resizestop(newRect, index) {},

    handleChangeEditValue(val) {
      this.$store.dispatch('rect/chnageText', {
        id: this.activeRect === -1 ? this.onlyActive : this.activeRect,
        text: val
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.designer-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 2px #aaa;
  background-color: #f1f3f8;

  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &--size {
      // width: 1123px;
      // height: 794px;
      position: relative;
      background-color: #ffffff;
      // background-image: url("tree.png");
      background-repeat: no-repeat;
      background-position: left top;
      background-size: 100%;
    }
  }
}

.list {
  width: 100%;
  height: 100%;
  // background-color: #fff;
}

.tinymce-container,
.tinymce-textarea {
  height: 100%;
}

.showhtml-box {
  word-break: break-word;
  padding: 10px;

}
</style>