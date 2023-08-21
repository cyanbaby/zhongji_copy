define(['knockout', 'jquery'], function(ko, $) {
  // 自定义绑定
  ko.bindingHandlers.hasFocus = {
    init: function (element, valueAccessor) {
      console.log('hasFocus init');
      var value = valueAccessor();
      $(element).focus(function () {
        value(true);
      });
      $(element).blur(function () {
        value(false);
      });
    },
    update: function (element, valueAccessor) {
      var value = valueAccessor();
      console.log('hasFocus update');
      if (ko.utils.unwrapObservable(value)) {
        $(element).focus(function () {
          value(true);
        });
      }
      else {
        $(element).blur(function () {
          value(false);
        });
      }
    }
  }
})