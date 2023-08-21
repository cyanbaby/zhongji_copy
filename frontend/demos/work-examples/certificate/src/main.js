import Vue from 'vue'
import pdf from "./plugins/pdf";

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 注册插件
Vue.use(pdf);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
