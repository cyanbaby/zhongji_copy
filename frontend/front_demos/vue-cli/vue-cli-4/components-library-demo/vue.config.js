const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


const { set, each, compact, map, keys } = require('lodash')
const cdnDependencies = require('./dependencies-cdn')

const pages = {
  index: {
    entry: 'src/main.js',
    template: 'public/index.html',
    filename: 'index.html'
  }
}

const cdn = {
  index: cdnDependencies
}

const externals = {}
// cdnDependencies.forEach(p => {
//   externals[p.name] = p.library
// })
keys(pages).forEach(name => {
  cdn[name].forEach(p => {
    externals[p.name] = p.library;
  });
});




module.exports = {

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 禁用 JS 和 CSS 压缩
      config.optimization.minimize = false;

      // 移除所有已配置的 minimizers
      config.optimization.minimizer = [];

      // 禁用 HTML 压缩
      if (config.plugins) {
        config.plugins.forEach(plugin => {
          if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            plugin.options.minify = false;
          }
        });
      }
      console.log('**************************** externals')
      console.log(externals)
      
      config.externals = externals
      
      config.plugins.push(new BundleAnalyzerPlugin())
    }

    // config.plugins = [new BundleAnalyzerPlugin(), new SpeedMeasurePlugin(), new HardSourceWebpackPlugin()]
    // config.plugins = [new SpeedMeasurePlugin(), new HardSourceWebpackPlugin()]
    // config.plugins = [new HardSourceWebpackPlugin()]

    config.devtool = "source-map";
  },

  chainWebpack: config => {

    if (process.env.NODE_ENV === 'production') {

      keys(pages).forEach(name => {
        // 为每个页面配置 HTMLWebpackPlugin
        config.plugin(`html`).tap(options => {
          const setting = {
            css: compact(map(cdn[name], 'css')),
            js: compact(map(cdn[name], 'js'))
          };
          set(options, '[0].cdn', setting);
          return options;
        });
      });
    }


  },

  productionSourceMap: true,
};
