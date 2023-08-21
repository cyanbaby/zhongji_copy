import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import * as svgicon from 'vue-svgicon'
import App from './App.vue'
import 'reset-css'

// import 'froala-editor/css/froala_editor.pkgd.min.css'
// import 'froala-editor/css/froala_style.min.css'
// import 'froala-editor/js/froala_editor.pkgd.min.js'
// import 'froala-editor/js/languages/zh_cn.js'
// import 'froala-editor/js/plugins.pkgd.min.js'
// import VueFroala from 'vue-froala-wysiwyg'



Vue.use(ElementUI)

Vue.use(svgicon, {
  tagName: 'svgicon'
})

// Vue.use(VueFroala)


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
