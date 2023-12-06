import Vue from 'vue'
import App from './App.vue'
import i18n from './jjy_lang'

if (process.env.NODE_ENV  === 'development') {
  import('element-ui/lib/theme-chalk/index.css')
  // import('@jjy-npm/form-making-advanced/dist/FormMaking.css')
}

import ElementUI from 'element-ui'
console.log('ElementUI', ElementUI)

ElementUI.TableColumn.props.showOverflowTooltip = { type: Boolean, default: true }
ElementUI.Dialog.props.closeOnClickModal.default = false
ElementUI.Table.props.size = { type: String, default: 'mini' }
ElementUI.Table.props.headerCellStyle = {
  default: () => ({
      'height': '60px'
  })
}

Vue.use(ElementUI);


// import FormMaking from '@jjy-npm/form-making-advanced'
// if (process.env.NODE_ENV === 'development') {
//   Vue.use(FormMaking)
// }

// vxtable
import 'xe-utils'
import './plugin/vxe-table/vxe-table-variables.scss'
import VXETable from 'vxe-table'

Vue.use(VXETable)


import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
