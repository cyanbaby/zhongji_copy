# 自定义绑定

## 自定义绑定
你可以创建自己的自定义绑定 – 没有必要非要使用内嵌的绑定（像 click，value 等）。你可以封装复杂的逻辑或行为，自定义很容易使用和重用的绑定。例如，你可以在 form 表单里自定义像 grid，tabset 等这样的绑定。
基本语法：ko.bindingHandlers.绑定名称 = { init: 初始回调, update: 更新回调 }
```html
<div data-bind="hello: msg"></div>

<script type="text/javascript">
  ko.bindingHandlers.hello = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      /// 绑定时，设置任何初始状态，事件处理程序
      element.textContent = viewModel.msg()
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      /// 绑定之后应用于 DOM 元素上，然后观察 DOM 元素的变化，进行相应调用更新
    }
  };

  var vm = {
    msg: ko.observable('World')
  }

  ko.applyBindings(vm);
</script>
```
## update 回调

当管理的 observable 改变的时候，KO 会调用你的 update callback 函数，然后传递以下参数：
- element - 绑定的 DOM 元素
- valueAccessor - JavaScript 函数，通过 valueAccessor() 可以得到应用到这个绑定的，当前模型的属性值。要轻松接受可观察值和普通值，请在返回值上调用 ko.unwrap()
- allBindingsAccessor - JavaScript 函数，通过 allBindingsAccessor() 得到这个元素上所有模型的属性值。调用 allBindings.get('name') 来获取 name 绑定的值（如果没有 name 绑定，则返回 undefined），或者通过 allBindings.has('name') 来判断，当前元素上的 name 绑定是否存在。
- viewModel - 这个参数在 KO 3.x 中已被弃用，使用 bindingContext.$data 或 bindingContext.$rawData 来访问 viewModel
- bindingContext - 保持在对象绑定上下文这种元件的结合。此对象包括特殊特性包括 $parent，$parents 和 $root 可用于访问数据 ， 必然对这方面的祖先。

例如，你可能想通过 visible 绑定来控制一个元素的可见性，但是你想让该元素在隐藏或者显示的时候，可以加入动画效果。那你可以自定义自己的绑定来调用 jQuery 的 slideUp/slideDown 函数：
```html
<label><input type="checkbox" data-bind="checked: giftWrap" /> Gift wrap</label>
<div data-bind="slideVisible: giftWrap, slideDuration: 600">
  <p>You have selected the option</p>
  <p>You have selected the option</p>
  <p>You have selected the option</p>
  <p>You have selected the option</p>
</div>

<script type="text/javascript">
  // 自定义绑定 slideVisible
  ko.bindingHandlers.slideVisible = {
    update: function (element, valueAccessor, allBindings) {
      // 首先，获取最新的绑定数据，即 slideVisible: giftWrap 中的 giftWrap
      var value = valueAccessor();

      // 然后,模型属性是否是可观察的，获取当前值
      var valueUnwrapped = ko.unwrap(value);

      // 获取另一个绑定属性的值，即 slideDuration: 600
      var duration = allBindings.get('slideDuration') || 400; // 默认 400 毫秒

      // 操作 DOM 元素
      if (valueUnwrapped == true)
        $(element).slideDown(duration); // 显示元素
      else
        $(element).slideUp(duration);   // 显示元素
    }
  };

  var vm = {
    giftWrap: ko.observable(true)
  };

  ko.applyBindings(vm);
</script>
```


## init 回调
Knockout 在 DOM 元素使用自定义绑定的时候会调用你的 init 函数。init 有两个重要的用途：
- 为 DOM 元素设置初始值。
- 注册事件句柄，例如当用户点击或者编辑 DOM 元素的时候，你可以改变相关的 observable 值的状态。

KO 会传递和 update 回调函数一样的参数。
继续上面的例子，你可以像让 slideVisible 在页面第一次显示的时候，设置该元素的状态（但是不使用任何动画效果），而只是让动画在发生改变的时候再执行。你可以这样来做：

```js
ko.bindingHandlers.slideVisible = {
  init: function(element, valueAccessor) {
    var value = ko.unwrap(valueAccessor()); // 获取当前绑定属性的值
    $(element).toggle(value); // jQuery 会根据 value 的值来显示/隐藏元素
  },
  update: function (element, valueAccessor, allBindings) {
    // update 的代码与上面一致
  }
};
```
就是说 giftWrap 的初始值声明的是 false（例如 giftWrap: ko.observable(false)），div 的初始状态是隐藏，之后用户点击 checkbox 的时候会让元素显示出来。

## DOM 事件之后修改 observable 值
你已经知道了如何使用 update 回调，当 observable 值改变的时候，你可以更新相关的 DOM 元素。但是其它形式的事件怎么做呢？比如当用户对某个 DOM 元素有某些 action 操作的时候，你想更新相关的 observable 值。
你可以使用 init 回调来注册一个事件句柄，这样可以改变相关的  observable值，例如：
```html
<p>Name: <input data-bind="hasFocus: editingName" /></p>
<div data-bind="visible: editingName">You're editing the name</div>
<button data-bind="enable: !editingName(), click: function() { editingName(true) }">编辑</button>

<script type="text/javascript">
  // 声明自定义绑定
  ko.bindingHandlers.hasfocus = {
    init: function (element, valueAccessor) {
      $(element).focus(function () {
        var value = valueAccessor();
      });
      $(element).blur(function () {
        var value = valueAccessor();
        value(false);
      });
    },
    update: function (element, valueAccessor) {
      var value = valueAccessor();
      if (ko.utils.unwrapObservable(value)) {
        element.focus();
      }
      else {
        elemen.blur();
      }
    }
  };

  var vm = {
    editingName: ko.observable(true)
  };

  ko.applyBindings(vm);
</script>
```
<div style="display: flex;">
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_30.png" align="left" />
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_31.png" align="left" />
</div>

## 支持虚拟元素（注释语法）
```html
<!-- ko mybinding: somedata --> ... <!-- /ko -->
```