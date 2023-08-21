window.afterResInit = function() {
  define('knockout',[], function () {
    return window.ko
  })
  define('jquery',[], function () {
    return window.$
  })
  define('lodash', [], function () {
    return window._
  })
  define('userContext', [], function () {
    return window.userContext
  })

  require([
    "jquery",
    "common",
    "js/widgets/fixtool/index",
    "knockout",
    "pages/purchaserportal",
    "js/core/bindingHandlers",
    "director",
    "bs",
    "slimscroll",
    "pace",
    "ycloud", 
    'i18nextko', 
    'js/main/languagecas'
  ], 
  function(
    $, 
    Common,
    fixtool,
    ko,
    purchaserportal
  ) {
    if (window.localStorage.getItem('user')) {
  
    } else {
      $.ajax({
        url: window.location.protocol+"//"+window.location.host + "/yuncai/ebvplogin",
        type: "get",
        async: false,
        success: function (data) {
          
          var userContext = JSON.parse(data)
          if (!userContext.needrelogin) {
            window.localStorage.setItem('user', data)
          }
        },
        error: function (error, a, b) {
          
        }
      })
    }
    if (window.userCtx) {
      Common.store.set("user",window.userCtx);
    }
    var locale = Common.cookie.get('u_locale') || 'zh_CN'
    window.i18nextko.init(window.languagetranslate, locale, ko)
    var router = Common.router();
    new purchaserportal();   
  
    var el_content = $('#fix-tools');
    ko.cleanNode($('#fix-tools')[0]);
    var viewmodel = new fixtool({el:el_content});
    // 别删 
    window.Common = Common;
  });
}