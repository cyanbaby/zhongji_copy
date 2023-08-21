<template>
  <div class="component-markdown">
    <div class="markdown-body" v-html="markedHTML"/>
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'github-markdown-css'

export default {
  name: 'd2-markdown',
  props: {
    source: {
      type: String,
      required: false,
      default: ''
    },
    highlight: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      markedHTML: '',
      renderer: new marked.Renderer()
    }
  },
  mounted () {
    if (this.source) {
      this.initWithMd()
    }
  },
  methods: {
    initWithMd () {
      this.markedHTML = this.marked(this.source)
    },
    marked (data) {
      return marked(data, {
        ...this.highlight ? { highlight: (code) => highlight.highlightAuto(code).value } : {},
        renderer: this.renderer
      })
    }
  }
}
</script>
