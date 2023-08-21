# 组件绑定
组件绑定是指将特定的组件注入到元素中，并可选地向其传递参数。
```js
<h4>不传参: 简介语法</h4>
<!-- 绑定写法 -->
<div data-bind='component: "message-editor"'></div>
<!-- 自定义元素写法 -->
<message-editor></message-editor>

<h4>传参: 完全语法，包含 name 和 params 属性</h4>
<div data-bind='component: {
    name: "message-editor",
    params: { initialText: "Hello, world!" }
}'></div>
<message-editor params="initialText: 'Hello, world!'"></message-editor>


<script type="text/javascript">
  // 注册组件
  ko.components.register('message-editor', {
    // vm
    viewModel: function(params) {
      this.text = ko.observable(params && params.initialText || '');
    },
    // 模板
    template: 'Message: <input data-bind="value: text" /> '
    + '(length: <span data-bind="text: text().length"></span>)'
  });

  ko.applyBindings();
</script>
```
以上代码的执行效果如下
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_38.png" align="left" />
<div style="clear: both;"></div>

组件可以只包含模板，而没有 viewmodel
```js
ko.components.register('special-offer', {
  template: '<div class="offer-box" data-bind="text: productName"></div>'
});
```

## 组件的生命周期
1. 组件加载器被要求提供 viewModel 工厂和模板
  - 可以咨询多个组件加载程序，直到第一个加载程序识别组件名称，并提供 viewmodel 或模板。每个组件类型只发生一次此过程，因为 Knockout 将生成的定义缓存在内存中。
  - 默认组件加载器会根据你[注册的内容](https://knockoutjs.com/documentation/component-registration.html)提供 viewmodel 或模板。如果适用，这是它从您的 AMD 加载器请求任何指定 AMD 模块的阶段。
  通常，这是一个异步过程。 它可能涉及对服务器的请求。 对于API一致性，默认情况下 Knockout 确保加载过程作为异步回调完成，即使组件已经加载并缓存在内存中也是如此。 有关此内容以及如何允许同步加载的更多信息，请参阅[控制同步/异步加载](https://knockoutjs.com/documentation/component-registration.html#controlling-synchronousasynchronous-loading)。
2. 组件模板被克隆并注入容器元素
任何现有的内容将被移除和丢弃
3. 如果组件有一个视图模型 viewModel ，则实例化它
4. 视图模型 viewModel 绑定到视图
5. 组件被激活
6. 组件被拆除，viewModel 被释放

## 仅有模板的组件
组件通常有 viewModel，但不一定非得有。组件可以只指定模板。在本例中，组件视图绑定的对象是你传给组件的 params 对象。例子：
```js
ko.components.register('special-offer', {
  template: '<div class="offer-box" data-bind="text: productName"></div>'
});
```
可以注入
```html
<div data-bind='component: {
     name: "special-offer-callout",
     params: { productName: someProduct.name }
}'></div>
```
或者更方便 - 自定义元素的写法
```html
<special-offer params='productName: someProduct.name'></special-offer>
```

## 注释语法
```html
<!-- ko component: "message-editor" -->
<!-- /ko -->

<!-- ko component: {
    name: "message-editor",
    params: { initialText: "Hello, world!", otherParam: 123 }
} -->
<!-- /ko -->
```

## 将标记传递给组件
```html
<div data-bind="component: { name: 'my-special-list', params: { items: someArrayOfPeople } }">
  <!-- 任意的标记. 在浏览器上会正确展示为组件的输出. -->
  姓名：<em data-bind="text: name"></em>
  年龄：<em data-bind="text: age"></em>
</div>
```

## 独立模板
我们也可以将模板独立成文件，当然还可以在自定义元素中，添加标记（markup）信息
```html
<!-- 可以放在单独的文件中 -->
<template id="my-special-list-template">
  <h3>模板头部</h3>

  <ul data-bind="foreach: { data: myItems, as: 'myItem' }">
    <li>
      <h4>模板中的列表头部</h4>
      <!-- $componentTemplateNodes 表示自定义元素的模板节点 -->
      <!-- ko template: { nodes: $componentTemplateNodes, data: myItem } -->
      <!-- /ko -->
    </li>
  </ul>
</template>

<my-special-list params="items: someArrayOfPeople">
  <!-- 在自定义元素中，添加标记信息 -->
  The person <em data-bind="text: name"></em> is
  <em data-bind="text: age"></em> years old.
</my-special-list>

<script type="text/javascript">
  ko.components.register("my-special-list", {
    template: { 
      // 指定模板
      element: "my-special-list-template" 
    },
    viewModel: function(params) {
      this.myItems = params.items;
    }
  });

  ko.applyBindings({
    someArrayOfPeople: ko.observableArray([
      { name: "Lewis", age: 56 },
      { name: "Hathaway", age: 34 }
    ])
  });
</script>
```
以上代码的执行效果：
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_39.png" align="left" />
<div style="clear: both;"></div>

## 释放和内存管理
可选的，viewmodel 类可以具有释放（dispose）函数。如果启用了释放函数，那么每当组件被拆下，并从 DOM 中移除时，Knockout 就会调用它（例如：因为相应的项已从 foreach 中删除，或者 if 绑定已变为 false）
您必须使用 dispose 释放任何本质上不可垃圾回收的资源。例如：
- setInterval 回调将继续执行，直到显式清除。
  - 使用 clearInterval(handle) 来停止执行, 否则你的 viewModel 将一直在内存中
- ko.computed 属性继续接受来自依赖的通知，知道显式释放
  - 如果依赖是一个外部对象, 然后确保在计算属性上使用 .dispose() , 否则它（可能还有您的viewModel）会一直在内存中. 另外, 考虑使用  [purecomputed](https://knockoutjs.com/documentation/computed-pure.html) 以避免人工释放的需要。
- 对于可观察的订阅 将继续执行，直到显式清除
  - 如果您订阅了一个外部的 observable，请确保在订阅上使用 .dispose()。否则回调（可能还有您的viewModel）将保留在内存中。
- 在外部 DOM 元素上手动创建的事件处理器，如果是在 createViewModel 函数中创建的（甚至是在常规组件 viewModel 中创建的，尽管为了适应 MVVM 模式，您不应该这样做），则必须将其删除。
  - 当然，您不必担心在视图中，释放任何由标准 Knockout 绑定创建的事件处理程序，因为当元素被删除时，KO 会自动注销它们。

例如：
```js
var someExternalObservable = ko.observable(123);

function SomeComponentViewModel() {
  this.myComputed = ko.computed(function() {
    return someExternalObservable() + 1;
  }, this);

  this.myPureComputed = ko.pureComputed(function() {
    return someExternalObservable() + 2;
  }, this);

  this.mySubscription = someExternalObservable.subscribe(function(val) {
    console.log('外部的 observable 变成了 ' + val);
  }, this);

  this.myIntervalHandle = window.setInterval(function() {
    console.log('又过了一秒，组件仍处于活跃状态');
  }, 1000);
}

SomeComponentViewModel.prototype.dispose = function() {
  this.myComputed.dispose();
  this.mySubscription.dispose();
  window.clearInterval(this.myIntervalHandle);
  // this.myPureComputed 不需要手动释放
}

ko.components.register('your-component-name', {
  viewModel: SomeComponentViewModel,
  template: 'some template'
});
```
严格来说，不必处理，仅依赖于同一 viewModel 对象属性的计算和订阅，因为这只会创建一个循环引用，JavaScript 垃圾收集器知道如何释放该引用。然而，为了避免记住哪些东西需要处理，您可能更愿意尽可能使用pureComputed，并显式地处理所有其他计算/订阅，无论技术上是否必要。