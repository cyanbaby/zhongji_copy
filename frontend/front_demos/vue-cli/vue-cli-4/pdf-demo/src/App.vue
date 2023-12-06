<template>
  <div id="app">
    <!-- <pdf src="http://s4w6ysecl.hn-bkt.clouddn.com/Get_Started_With_Smallpdf.pdf?e=1701395835&token=x9VD8HHjuDcu4kdLeYrDtKFU264IGz3H9ZJvGS0l:f_K9UXZ11VoEbyV6amStHrOG83M=" /> -->
    
      <!-- <pdf src="http://s4w6ysecl.hn-bkt.clouddn.com/Get_Started_With_Smallpdf.pdf?e=1701395835&token=x9VD8HHjuDcu4kdLeYrDtKFU264IGz3H9ZJvGS0l:f_K9UXZ11VoEbyV6amStHrOG83M=" /> -->
      <!-- <pdf src="https://static.peixunyun.cn/%E8%83%A1%E7%A5%A5%E5%B9%B3cog8wa4d5a80-%E6%8A%A5%E5%90%8D%E8%A1%A8.pdf?t=1686725299936" :page=1 /> -->

      <div id="pdfID" style="width: 500px; height: 500px; border: 1px solid #000; overflow:hidden;">
        test pdf
        <div style="width: 500px; height: 500px; background: #ccc">111</div>
      </div>
      <br />
      <button @click="handleClickDownLoadPdf">点我下pdf</button>
      

  </div>
</template>

<script>
// import pdf from '@/components/pdf/vuePdfNoSss.vue'
// console.log(pdf)
// import pdf from '@/components/pdf-dist/pdf.umd.js'
// import pdf from '@/components/custom-pdf'

import ExportSavePdf from "@/utils/html2Pdf"


export default {
  name: 'App',
  components: {
    // 'vue-pdf': pdf.component
    // pdf
  },
  methods: {
    handleClickDownLoadPdf() {
      ExportSavePdf(`总结报告`, 'pdfID', '')
    }
  }
}
</script>