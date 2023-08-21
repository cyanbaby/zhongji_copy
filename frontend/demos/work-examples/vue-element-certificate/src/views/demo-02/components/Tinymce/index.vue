<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <div :id="tinymceId" class="tinymce-textarea" @click="handleClick"></div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import plugins from './plugins'
// import toolbar from './toolbar'
import load from './dynamicLoadScript'
const tinymceCDN = '/tinymce/tinymce.min.js'
// const tinymceCDN = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js'

import Bus from '../../bus'

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function () {
        return (
          'vue-tinymce-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      // default: 360
      default: '100%'
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      // if (!this.hasChange && this.hasInit) {
      //   this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val || ''))
      // }

      if (this.hasInit) {
        this.$nextTick(() => {
          window.tinymce.get(this.tinymceId).setContent(val || '')
          window.tinymce.activeEditor.selection.select(
            window.tinymce.activeEditor.getBody(),
            true
          )
          window.tinymce.activeEditor.selection.collapse(false)
        })
      }
    }
  },
  mounted() {
    this.init()
    /*
    
    setInterval(() => {
      try {
        let editor = window.tinymce.get(this.tinymceId)
        // console.log(this.tinymceId)
        // console.log(editor.selection)
        // console.log(editor.selection.getBookmark)
        // let cursorPos = editor.selection.getCursorLocation()
        // console.log('cursorPos', cursorPos)

        const tinyBookmark = editor.selection.getBookmark(2)
        // console.log('tinyBookmark')
        // console.log(tinyBookmark)
      } catch (e) {
        console.log('e', e)
      }
    }, 1000)

    */

    Bus.$on('insert-variable', this.test)
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    test() {
      try {
        const editor = window.tinymce.get(this.tinymceId)
        const tinyBookmark = editor.selection.getBookmark(2)
        editor.selection.moveToBookmark(tinyBookmark)
        window.tinymce.execCommand('mceInsertContent', false, "${变量}");
      } catch (error) {
        console.log(error)
      }
    },
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        // auto_focus: true,
        // language: this.language,
        selector: `#${this.tinymceId}`,
        inline: true,
        language_url: '/tinymce/langs/zh_CN.js',
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        // toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        // menubar: this.menubar,
        fontsize_formats: '12px 14px 16px 18px 20px 24px 36px 48px 56px 72px',
        toolbar: 'fontselect fontsizeselect bold italic forecolor',
        font_formats:
          '宋体=SimSun;黑体=SimHei;新宋体=NSimSun;仿宋=FangSong;仿宋_GB2312=FangSong_GB2312;华文宋体=STSong;华文仿宋=STFangsong;楷体=KaiTi;华文楷体=STKaiti;隶书=LiSu;',

        menubar: false,
        // statusbar: false,

        resize: 'both',

        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: (editor) => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
          editor.on('init', function (e) {
            this.getBody().style.fontSize = '16px'
            this.getBody().style.color = '#000'
            this.getBody().style.fontFamily = '宋体'
          })
          editor.on('onBlur', function() {
            alert(1)
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    handleClick(e) {
      this.$emit('click', {
        x: e.x,
        y: e.y
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

// TODO 写成配置
.tinymce-textarea {
  // visibility: hidden;
  // z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
