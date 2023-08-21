/*
 * @Author: jiangnan
 * @Email: hujiangnan@hatech.com.cn
 * @Date: 2021-07-15 14:19:24
 * @LastEditors: jiangnan
 * @LastEditTime: 2021-07-15 17:30:13
 * @Describle: 描述
 */
import Vue from 'vue'
import App from './App.vue'

import './icons'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')