# 自定义释放逻辑
在典型的 Knockout 应用程序中，DOM 元素会被动态地添加和删除，例如使用模板绑定或通过控制流绑定（if、ifnot、with 和 foreach）。在创建自定义绑定时，通常需要添加清除逻辑，该逻辑会在与自定义绑定的关联元素被Knockout 移除时运行。

## 在释放元素时注册回调
为了注册一个用于节点删除的函数，你可以调用 ko.utils.domNodeDisposal.addDisposeCallback(node, callback)。例如，假设您创建一个自定义绑定，来实例化一个小部件。删除具有绑定的元素时，您可能希望调用小部件的 destroy 方法：
```js
ko.bindingHandlers.myWidget = {
  init: function(element, valueAccessor) {
    var options = ko.unwrap(valueAccessor()),
        $el = $(element);

    $el.myWidget(options);

    ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
      // 该还有有两个触发时机
      // 1. Knockout 删除元素时
      // 2. 其他的代码调用 ko.removeNode(element) 时
      $el.myWidget("destroy");
    });
  }
};
```

## 通过计算可观察对象和手动订阅来释放
如果在自定义绑定中，创建 computed observables，而不是使用自定义释放回调，则可以在节点删除时，自动释放 computed。构造计算的可观察对象时，使用 disposeWhenNodesRemoved 选项提供节点：
```js
ko.computed({
  read: function () {
    element.title = ko.unwrap(valueAccessor());
  },
  disposeWhenNodeIsRemoved: element
});
```
如果绑定包含手动订阅，可以通过调用其 DisposeWhenNodesRemoved 方法将其设置为自动释放：
```js
var titleSubscription = someObservable.subscribe(function (val) {
  element.title = val;
});
titleSubscription.disposeWhenNodeIsRemoved(element);
```

## 覆写外部数据的清理
删除元素时，Knockout 运行逻辑来清除与元素关联的任何数据。作为这一逻辑的一部分，如果页面中加载了 jQuery，Knockout 会调用 jQuery 的 cleanData 方法。在高级场景中，您可能希望防止或自定义，应用程序删除数据的具体方式。Knockout 暴露了一个函数 ko.utils.domNodeDisposal.cleanExternalData(node) ，它支持自定义逻辑的覆写。例如，防止 cleanData 调用，空函数可用于替换标准 cleanExternalData 实现：
```js
ko.utils.domNodeDisposal.cleanExternalData = function () {
  // 什么也不做，当在 DOM 中删除元素时，
  // 任何元素相关的 jQuery 数据都不会被清除
};
```