
// #ifndef VUE3
import Vue from 'vue'
// css样式引入
// import 'element-ui/lib/theme-chalk/index.css'
// import element from './element/index'
// Vue.use(element)

import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif