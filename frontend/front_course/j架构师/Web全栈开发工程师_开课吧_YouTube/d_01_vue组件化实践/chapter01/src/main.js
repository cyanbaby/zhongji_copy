import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// https://www.npmjs.com/package/vue-bus => todo Vue.use(xxx)

import Bus from './Bus'
Vue.prototype.$bus = new Bus()

new Vue({
  render: h => h(App),
}).$mount('#app')
