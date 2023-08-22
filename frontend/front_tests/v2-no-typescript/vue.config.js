const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    onBeforeSetupMiddleware: require('./src/mock') // 引入mock/index.js
    // setupMiddlewares: require('./src/mock/index.js')
  }
})
