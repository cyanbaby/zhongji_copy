<template>
  <div class="certificate-drag-ctrl">
    <!-- <el-button type="primary" class="switch-btn-fixed" @click="handleClickTest">显示</el-button> -->
    <div
      type="primary"
      class="switch-btn-fixed drawer-handle"
      @click="handleClickTest"
    >
      <i class="el-icon-arrow-left"></i>
    </div>

    <div class="toolbar-help" style="position: relative">
      <div>证书设计器</div>
      <div style="position: absolute; right: 0; top: 20px">
        <el-switch
          v-model="direction"
          active-color="#409eff"
          inactive-color="#409eff"
          size="mini"
          @change="$emit('pdf-direction', direction)"
        >
        </el-switch>
        <el-link type="primary" :underline="false" style="margin-left: 5px">{{
          direction ? '横屏' : '竖屏'
        }}</el-link>
      </div>
    </div>

    <div class="panel-controls">
      <div class="group-title">证书背景</div>

      <div v-if="bgCode" class="background-img">
        <img :src="bgCode" class="the_img" alt="" height="70" />
        <i class="el-icon-error" @click="handleRemoveBgImg"></i>
      </div>

      <div style="display: flex; margin-top: 12px">
        <input
          ref="iptRef"
          accept="image/*"
          style="display: none"
          type="file"
          @change="handleChangeBgImg"
        />
        <el-button
          style="flex: 1"
          type="primary"
          plain
          @click="handleClickChangeBg"
          >更换背景图片</el-button
        >
      </div>

      <br />
      <br />
      <br />

      <div class="group-title">添加元素</div>

      <el-row class="certificate-drag-ctrl__row">
        <div>
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            @click="handleClickAddBtn"
            >添加文字</el-button
          >
        </div>
        <div>
          <el-button
            type="primary"
            plain
            icon="el-icon-picture-outline"
            @click="handleClickAddBtn"
            >添加图片</el-button
          >
        </div>
      </el-row>

      <div class="group-title">证书信息</div>

      <el-row class="certificate-drag-ctrl__row">
        <div><el-button @click="zhengshu">证书编号</el-button></div>
        <div><el-button>发证日期</el-button></div>
      </el-row>

      <el-row class="certificate-drag-ctrl__row certificate-drag-ctrl__action">
        <div>
          <el-button type="success" round @click="handleClickReview"
            >预览</el-button
          >
        </div>
        <div>
          <!-- <el-button type="primary" round @click="handleClickSave"
              >保存</el-button
            > -->
          <el-button type="primary" round @click="handleClickTest"
            >插入变量</el-button
          >
        </div>
      </el-row>

      <!-- <el-button class="switch-btn" type="primary" @click="handleClickTest">隐藏</el-button> -->
      <div
        type="primary"
        class="switch-btn drawer-handle"
        @click="handleClickTest"
      >
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../bus'

function nodeToString(node) {
  var tmpNode = document.createElement('div')
  tmpNode.appendChild(node.cloneNode(true))
  var str = tmpNode.innerHTML
  tmpNode = node = null // prevent memory leaks in IE
  return str
}

export default {
  name: 'Control',
  data() {
    return {
      // drawer: false,
      drawer: true,

      bgCode: '', // 保存图片链接/base64字符串

      direction: true
    }
  },
  computed: {
    rects() {
      return this.$store.state.rect.rects
    },
    activeRect() {
      return this.$store.getters['rect/getActive']
    }
  },
  methods: {
    zhengshu() {
      Bus.$emit('insert-variable', '${证书编号}')
    },
    handleClickTest() {
      this.drawer = !this.drawer
      // if (this.drawer) {
      //   Bus.$emit('show-right')
      // }
    },
    handleClickRemoveBtn() {
      if (this.activeRect != null) {
        this.$store.dispatch('rect/removeElement', { id: this.activeRect })
      }
    },
    handleClickAddBtn() {
      const tempElement = {
        // id: nanoid(),
        isShow: true,
        width: 200,
        height: 150,
        top: 350,
        left: 10,
        draggable: true,
        resizable: true,
        minw: 10,
        minh: 10,
        axis: 'both',
        parentLim: true,
        snapToGrid: false,
        aspectRatio: false,
        zIndex: 1,
        color: '#EF9A9A',
        active: false,
        text: '我是标题 1'
      }

      this.$store.dispatch('rect/addElement', { elem: tempElement })
    },

    handleClickChangeBg() {
      this.$refs.iptRef.click()
    },
    handleChangeBgImg(e) {
      // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      if (files.length === 0) {
        this.bgCode = ''
      } else {
        // (默认只能选1个，如果选择多个你需要给input标签加额外原生属性)
        // 语法:URL.createobjectURL(文件)
        // 返回值:内存临时地址
        this.bgCode = URL.createObjectURL(files[0])

        // TODO Vuex or event
        this.$emit('change-bg-img', this.bgCode)
        console.log(this.bgCode)
      }
    },
    handleRemoveBgImg() {
      this.bgCode = ''
      // TODO Vuex or event
      this.$emit('remove-bg-img')
    },
    handleClose(done) {
      // Bus.$emit('hide-right')
      done()
    },
    handleClickSave() {
      const list = document.getElementById('list')
      list.click()
      // console.log(list)
      const listCopy = list.cloneNode(true)
      listCopy.removeChild(listCopy.lastElementChild)

      const listCopyCopy = listCopy.cloneNode(true)

      // console.log(listCopy)

      for (var i = 0, len = listCopyCopy.children.length; i < len; i++) {
        if (listCopyCopy.children[i].classList.contains('vdr')) {
          for (
            var j = 0, len2 = listCopyCopy.children[i].children.length;
            j < len2;
            j++
          ) {
            if (
              listCopyCopy.children[i].children[j] &&
              listCopyCopy.children[i].children[j].classList.contains(
                'vdr-stick'
              )
            ) {
              if (listCopy.children[i].children[1]) {
                listCopy.children[i].children[1].remove()
              }
            }
          }
        }
      }

      // console.log(listCopy)
      var escapedStr = nodeToString(listCopy)
        .replace('<', '<')
        .replace('>', '>')
      console.log(escapedStr)
    },
    handleClickReview() {
      this.$nextTick(() => {
        this.htmlToPdf('pdfDom', '个人报告')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.certificate-drag-ctrl {
    position: fixed;
    width: 100%;
    height: 100%;
    padding: 20px;
    width: 258px;
    right: 0;
    background: #fff;
    top: 75px;

  &__row {
    margin-bottom: 20px;
    display: flex;
    & > div {
      flex: 1;
      .el-button {
        width: 100%;
        padding: 10px 10px;
      }
    }
    & > div:first-child {
      margin-right: 5px;
    }
    & > div:last-child {
      margin-left: 5px;
    }
  }
  &__action {
    position: absolute;
    left: 10px;
    bottom: 50px;
    width: calc(100% - 20px);
  }
}

.switch-btn-fixed {
  position: fixed;
  right: -20px;
  top: 50%;
}

::v-deep {
  .el-drawer {
    overflow: visible;
  }
}
.panel-controls {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;

  .switch-btn {
    position: absolute;
    left: 0;
    top: calc(50% - 56px);
  }
}

.toolbar-help {
  height: 56px;
  width: 270px;
  padding: 20px 0 0 20px;
  text-align: LEFT;
  font-size: 14px;
  font-weight: 500;
  color: #27274a;
  cursor: pointer;
  border-bottom: 1px solid #ebeef6;
}

.drawer-handle {
  width: 20px;
  height: 80px;
  background: url('../../../../assets/toolbar.png');
  box-shadow: -4px 0px 4px 0px rgb(39 39 74 / 2%);
  background-size: 28px 88px;
  background-position: -8px center;
  background-repeat: no-repeat;
  color: #e6f4ff;
  font-size: 12px;
  line-height: 80px;
  // position: absolute;
  // top: 50%;
  // right: 250px;
  transform: translate(-100%, -50%);
  text-align: center;
  cursor: pointer;
  transition: right 500ms ease;
}

.toolbar-bg {
  width: 230px;
  max-height: 80px;
  background: #f7f8fa;
  border-radius: 4px;
  text-align: center;
  padding: 5px;
  position: relative;
  margin-top: 12px;
}
.group-title {
  margin-bottom: 12px;
  height: 18px;
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  color: #9090a4;
  line-height: 18px;
}
.background-img {
  max-height: 80px;
  background: #f7f8fa;
  border-radius: 4px;
  text-align: center;
  padding: 5px;
  position: relative;
  margin-top: 12px;
  .el-icon-error {
    color: #9090a4;
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
}
</style>
