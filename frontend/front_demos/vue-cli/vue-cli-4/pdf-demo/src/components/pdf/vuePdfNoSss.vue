<style src="./annotationLayer.css"></style>
<script>
/* eslint-disable */
import componentFactory from './componentFactory.js'

if (process.env.VUE_ENV !== 'server') {
  var pdfjsWrapper = require('./pdfjsWrapper.js').default
  var pdfjsLib = require('pdfjs-dist/es5/build/pdf.js')

  if (
    typeof window !== 'undefined' &&
    'Worker' in window &&
    navigator.appVersion.indexOf('MSIE 10') === -1
  ) {
    var PdfjsWorker = require('worker-loader!pdfjs-dist/es5/build/pdf.worker.js')
    pdfjsLib.GlobalWorkerOptions.workerPort = new PdfjsWorker()
  }

  var component = componentFactory(pdfjsWrapper(pdfjsLib))
} else {
  var component = componentFactory({})
}

export default component
</script>