<template>
  <div ref="pdfViewer" class="pdf-container"></div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist';

export default {
  props: ['src', 'page'],
  data() {
    return {
      pdfDoc: null,
      pageNum: this.page || 1,
    };
  },
  mounted() {
    window.addEventListener('resize', this.adjustScale);
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//fefile.peixunyun.cn/admin/plugins/pdfjs-dist/pdf.worker.min.js?v=2.5.207';
    this.loadPdf();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustScale);
  },
  methods: {
    loadPdf() {
      const loadingTask = pdfjsLib.getDocument(this.src);
      loadingTask.promise.then(pdf => {
        this.pdfDoc = pdf;
        this.renderPage(this.pageNum);
      });
    },
    renderPage(pageNum) {
      this.pdfDoc.getPage(pageNum).then(page => {
        const containerWidth = this.$refs.pdfViewer.clientWidth;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale: scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        this.$refs.pdfViewer.innerHTML = '';
        this.$refs.pdfViewer.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };
        page.render(renderContext);
      });
    },
    adjustScale() {
      if (this.pdfDoc) {
        this.renderPage(this.pageNum);
      }
    },
  },
};
</script>

<style scoped>
.pdf-container {
  width: 100%;
  overflow: auto;
}
</style>
