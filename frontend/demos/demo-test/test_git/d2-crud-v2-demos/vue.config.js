module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
  }
}
