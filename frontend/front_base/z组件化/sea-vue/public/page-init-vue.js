+(function (win) {
  var staticPath = '';
  var scriptObj;

  if (document.currentScript) {
    scriptObj = document.currentScript;
  } else {
    var scripts = document.getElementsByTagName('script');
    scriptObj = scripts[scripts.length - 1];
  }

  if (/^file:\/{3}/.test(scriptObj.src)) { // 本地路径
    var srcStr = scriptObj.getAttribute('src');
    var endIdx = srcStr.lastIndexOf('/');

    staticPath = './' + (endIdx === -1 ? '' : srcStr.substring(0, endIdx) + '/');
  } else {
    // 匹配出资源路径
    // 注：page-init.js 需放在其他资源的上级文件下
    staticPath = scriptObj.src.substring(0, scriptObj.src.lastIndexOf('/') + 1);
  }

  /**
   * 初始化入口
   * @param {function} cb - 初始化完成后的回调函数
   */
  function init(cb) {
    if (window.parent.postMessage) {
      window.parent.postMessage({
        action: 'pageReady',
        value: location.href // 跨域传递当前页面地址
      }, '*');
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', function () {
        loadConfigs(cb)
      });
    } else {
      loadConfigs(cb)
    }
  }

  /**
   * 加载配置项
   * @param {function} cb - 配置项载入完成后的回调函数
   */
  function loadConfigs(cb) {
    if (!window.seajs) {
      throw new Error('页面必须先引入 seajs')
    }

    seajs.use([
      staticPath + 'configs/sea-config.js?' + (+new Date()), // 配置文件不缓存
      staticPath + 'frameworks/seajs/plugins/css.min.js',
      staticPath + 'frameworks/seajs/plugins/text.min.js'
    ], function (initSeaConfig) {
      initSeaConfig(staticPath);
      initMixin(cb);
    });
  }

  // 注入一些初始化库和配置
  function initMixin(cb) {
    seajs.use(['common-css', 'vue', 'axios'], function () {
      seajs.use('mixin-config-vue', function () {
        typeof cb === 'function' && cb(); // 执行回调
      })
    });
  }

  win.pageInit = init;
})(window);