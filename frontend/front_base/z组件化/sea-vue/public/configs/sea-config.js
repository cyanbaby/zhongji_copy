defined(function(require, exports, module) {
  module.exports = function(path) {
    seajs.config({
      base: path,
      alias: {
        '组件名': '组件路径'
      },
      vars: {
        locale: 'zh-CN'
      },
      charset: 'utf-8',
      debug: true
    })
  }  
})