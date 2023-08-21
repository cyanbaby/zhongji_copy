import Vue from 'vue'
import Svg from '@/components/Svg'
Vue.component('svg-icon', Svg)

/**
 * require.context 的参数说明
 * './svg' 代表要查找的文件路径
 * false 代表是否查找子目录
 * /\.svg$/ 代表要匹配文件的正则
 *
 */
const req = require.context('./svg', false, /\.svg$/)
// const reqa = require.context('./mainSvg', false, /\.svg$/)
// https://zhuanlan.zhihu.com/p/59564277
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
// requireAll(reqa)
