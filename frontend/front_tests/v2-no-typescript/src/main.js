import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
// import './test1'  // 测试模块加载顺序 例: router
import store from './store'

// TODO form-making vue-form-making form-making-advanced 区别
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
// TODO form-making vue-form-making form-making-advanced 区别
Vue.use(FormMaking)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
