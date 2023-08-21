// 注意 'icon-[name]' 前缀需要跟Svg.vue中`#icon-${this.iconClass}`前缀一致
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    //   .use("svgo-loader")
    //   .loader("svgo-loader")
    //   .tap(options => ({
    //     ...options,
    //     plugins: [{ name: "removeAttrs", params: { attrs: "fill" } }]
    //   }))
    //   .end();
  }
}
