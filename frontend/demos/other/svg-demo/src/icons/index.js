/*
 * @Author: jiangnan
 * @Email: hujiangnan@hatech.com.cn
 * @Date: 2021-07-15 15:36:50
 * @LastEditors: jiangnan
 * @LastEditTime: 2021-07-15 17:48:16
 * @Describle: 描述
 */
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
const reqa = require.context('./mainSvg', false, /\.svg$/)
    // https://zhuanlan.zhihu.com/p/59564277
    // console.log("req->", req.keys())
    // console.log("req->", reqa.keys())
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
requireAll(reqa)