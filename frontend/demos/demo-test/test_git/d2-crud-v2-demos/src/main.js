import Vue from 'vue'
import App from './App.vue'
import router from './router'// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/components'
import open from '@/plugin/open'

Vue.use(ElementUI)
Vue.use(open)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
