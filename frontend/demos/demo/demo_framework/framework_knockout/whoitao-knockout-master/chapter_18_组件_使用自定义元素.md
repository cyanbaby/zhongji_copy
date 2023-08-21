# 使用自定义元素
自定义元素是组件绑定的语法糖（实际上，自定义元素在幕后使用组件绑定）。
例如，组件绑定的写法:
```html
<div data-bind='component: { 
	name: "flight-deals", 
  params: { from: "lhr", to: "sfo" } }'></div>
```
自定义元素的写法（与上面的写法功能相同）：
```html
<flight-deals params='from: "lhr", to: "sfo"'></flight-deals>
```
这允许以一种非常现代的、类似于 web 组件的方式组织代码，同时保留对非常旧的浏览器的支持。

## 示例
```html
<h4>不传参的写法</h4>
<message-editor></message-editor>

<h4>传参的写法</h4>
<message-editor params='initialText: "Hello, world!"'></message-editor>


<script type="text/javascript">
  // 注册组件
  ko.components.register('message-editor', {
    viewModel: function(params) {
      this.text = ko.observable(params.initialText || '');
    },
    template: 'Message: <input data-bind="value: text" /> '
    + '(length: <span data-bind="text: text().length"></span>)'
  });

  ko.applyBindings();
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_40.png" align="left" />
<div style="clear: both;"></div>

## 传递参数
正如您在上面的示例中所看到的，您可以使用params属性向组件视图模型提供参数。params属性的内容被解释为JavaScript对象文本(就像data-bind 属性一样)，因此可以传递任何类型的任意值。例子：
```html
<unrealistic-component
  params='stringValue: "hello",
          numericValue: 123,
          boolValue: true,
          objectValue: { a: 1, b: 2 },
          dateValue: new Date(),
          someModelProperty: myModelValue,
          observableSubproperty: someObservable().subprop'>
</unrealistic-component>
```


### 父组件和子组件之间的通信
如果您在 params 属性中引用模型属性，那么您当然是在引用组件之外的 viewModel （父级或主机的 viewModel）上的属性，因为组件本身还没有实例化。在上面的例子中，myModelValue 将是父 viewModel 上的一个属性，子组件 viewModel 的构造函数将以 params.someModelProperty 的形式接收它。
这就是如何将属性从父 viewModel 传递到子组件。如果属性本身是可观察的，那么父 viewModel 将能够观察，并响应子组件插入到它们中的任何新值。

### 传递 observable 表达式
```html
<some-component
  params='simpleExpression: 1 + 1,
          simpleObservable: myObservable,
          observableExpression: myObservable() + 1'>
</some-component>
```

组件 viewModel 的 params 参数将包含三个值：
- simpleExpression
  - 其值为 2。它不是一个可观察值或计算值，因为不涉及可观察值。通常，如果参数的计算不涉及对可观察值的计算（在本例中，该值根本不涉及可观察值），则按字面意义传递该值。如果值是一个对象，那么子组件可以对它进行修改，但是由于它是不可观察的，所以父组件不会知道子组件已经这样做了。
- simpleObservable
  - 这将是在父 viewModel 上声明为 myObservable 的 ko.observable 实例。它不是包装器 - 它实际上与父级引用的实例相同。因此，如果子 viewModel 写入这个可观察到的内容，父 viewModel 将接收到这个更改。一般来说，如果一个参数的评估，不来自一个可观测值（在这种情况下，可观测值只是简单地传递而没有评估它），那么该值就按字面意义传递。
- observableExpression
  - 这个更棘手。表达式本身在计算时，读取一个可观察值。可 observable 的值会随时间变化，所以表达式结果也会随时间变化。为了确保子组件能够对表达式值的更改做出反应，Knockout 将自动将该参数升级为计算属性。因此，子组件将能够读取 params.observableExpression() 来获取当前值，或者使用 params.observableExpression(...) 等。通常，对于自定义元素，如果参数的计算涉及到计算一个可观察到的值，那么敲除将自动构造一个 ko.computed 值来给出表达式s的结果，并将其提供给组件。

**总之，总的规则是：**
1. 如果参数的评估，不涉及评估一个 observable/computed，那么它就是字面上传递的。
2. 如果参数的评估，涉及评估一个或多个 observables/computeds，它将作为计算属性传递，以便对参数值的变化做出反应。

## 将标记传递给组件
有时候，我们希望创建的组件能够接受标记（markup），并将其作为输出的一部分。例如：构建容器 UI，像是 grid，list dialog 或 tab 等，都可以接受并绑定任意标记（markup）。
考虑一系列特殊的列表组件，比如：
```html
<my-special-list params="items: someArrayOfPeople">
  <!-- 将标记放入自定义元素中 -->
  姓名：<em data-bind="text: name"></em>
  年龄：<em data-bind="text: age"></em>
</my-special-list>
```

默认情况下，\<my-special-list> 中的 DOM 节点会被剥离（不与任何 viewModel 绑定），并替换为组件的输出。然而，这些 DOM 节点不会丢失：它们会被记住，并以两种方式提供给组件：
- 作为数组, $componentTemplateNodes, 对于组件模板中的任意绑定表达式都可用（例如 [binding context](https://knockoutjs.com/documentation/binding-context.html) 属性）。通常这是使用提供的标记最方便的方法。
- 作为数组, componentInfo.templateNodes, 请查看 [createViewModelfunction](https://knockoutjs.com/documentation/component-registration.html#a-createviewmodel-factory-function)
然后，组件可以选择使用提供的 DOM 节点作为其输出的一部分。比如，在组件模板的任意元素中，使用 template: { nodes: $componentTemplateNodes } 。
例如 my-special-list 的组件模板可以使用 $componentTemplateNodes，因此，它的输出包含提供的标记。

完整示例：
```html
<!-- 模板也可以单独独立成文件 -->
<template id="my-special-list-template">
  <h3>用户列表</h3>

  <ul data-bind="foreach: { data: myItems, as: 'myItem' }">
    <li>
      <h4>当前用户</h4>
      <!-- $componentTemplateNodes 表示年龄和姓名节点 -->
      <!-- ko template: { nodes: $componentTemplateNodes, data: myItem } --><!-- /ko -->
    </li>
  </ul>
</template>

<my-special-list params="items: someArrayOfPeople">
  <!-- 自定义元素中，使用标记 -->
  姓名 <em data-bind="text: name"></em> 
  年龄 <em data-bind="text: age"></em>
</my-special-list>


<script type="text/javascript">
  ko.components.register('my-special-list', {
    template: { element: 'my-special-list-template' },
    viewModel: function(params) {
      // 组件参数 myitems
      this.myItems = params.items;
    }
  });

  var vm = {
    someArrayOfPeople: ko.observableArray([
      { name: '张三', age: 56 },
      { name: '李四', age: 34 }
    ])
  }

  ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_41.png" align="left" />
<div style="clear: both;"></div>

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_42.png" align="left" />
<div style="clear: both;"></div>


## 控制自定义元素的标签名称
默认情况下，自定义元素的标签名称就是通过 ko.components.register 注册的组件名称。但是，如果你不想使用默认的元素名称，你还可以通过覆写 getComponentNameForNode 来控制自定义元素的标签名
```js
// 控制自定义元素的标签名
ko.components.getComponentNameForNode = function(node) {
  var tagNameLower = node.tagName && node.tagName.toLowerCase();

  if (ko.components.isRegistered(tagNameLower)) {
    // 如果元素名与注册的组件名相同，则使用该组件名
    return tagNameLower;
  } else if (tagNameLower === "special-element") {
    // 对于元素 <special-element>, 我们使用 "MySpecialComponent" (不管它是否注册过)
    return "MySpecialComponent";
  } else {
    // 其他情况表示不是一个组件
    return null;
  }
}
```

## 注册自定义元素
如果你在使用默认的组件加载器，即，ko.components.register，你什么也不需要做。以这种方式注册的组件可以立即用作自定义元素。
如果你是通过 [自定义组件加载器](https://knockoutjs.com/documentation/component-loaders.html) 声明的组件，然后，您需要告诉 Knockout 您希望使用的，自定义元素的名称。你需要调用 ko.components.register - 但不需要传递任何参数，因为你的自定义组件加载器也不会使用这些配置
```js
ko.components.register('my-custom-element', { /* No config needed */ });
```
或者，您可以重写 getComponentNameForNode 以动态控制，哪些元素映射到哪些组件名称，而不依赖于预注册。

## 将定制元素与常规绑定组合在一起
如果需要，自定义元素可以具有常规数据绑定属性（除了任何 params 属性之外）。例如：
```html
<products-list params='category: chosenCategory'
               data-bind='visible: shouldShowProducts'>
</products-list>
```
但是，使用会修改元素内容的绑定（例如 text 或 template 绑定）是没有意义的，因为它们会覆盖组件注入的模板。
Knockout 会阻止采用 controlsDescentBindings 实现的任何绑定的使用。因为在尝试将其 viewModel 绑定到注入的模板时，这也会与组件发生冲突。因此，如果你想使用一个流程控制，比如 if 或 foreach。然后，而不是直接在自定义元素上使用。必须将自定义元素包裹起来，例如：
```html
<!-- ko if: someCondition -->
  <products-list></products-list>
<!-- /ko -->
```
或
```html
<ul data-bind='foreach: allProducts'>
  <product-details params='product: $data'></product-details>
</ul>
```
## 自定义元素不能自闭合
你必须写成 \<my-custom-element>\</my-custom-element>, 而不是自闭合的方式 \<my-custom-element />

## 自定义元素和Internet Explorer 6到8
Knockout 努力让开发人员，免于处理跨浏览器兼容性问题的痛苦，尤其是那些与旧浏览器相关的问题！尽管自定义元素提供了非常现代的 web 开发风格，但它们仍然适用于所有常见的浏览器：
- HTML5时代的浏览器，包括InternetExplorer9和更高版本，自动允许自定义元素，没有任何困难。
- IE 6 到 8 也支持自定义元素，但前提是它们是在 HTML 解析器遇到这些元素之前注册的。
IE 6-8的 HTML 解析器将丢弃任何无法识别的元素。为确保它不会抛出自定义元素，必须执行以下操作之一：
- 确保在 HTML 解析器见到 \<your-component> 元素之前调用 ko.components.register('your-component')
- 或者，在 HTML 解析器见到 \<your-component> 元素之前调用 document.createElement('your-component') 你可以忽略 createElement 的调用结果 - 重要的是你调用了它。

例如，如果您的页面结构如下所示，则一切正常：
```html
<!DOCTYPE html>
<html>
  <body>
    <script src='some-script-that-registers-components.js'></script>

    <my-custom-element></my-custom-element>
  </body>
</html>
```
如果您与 AMD 合作，那么您可能更喜欢这样的结构：
```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      // AMD 模块加载前，组件没有注册，加载是异步的。
      // 下面的代码防止 IE6-8's 解析器忽略自定义元素
      document.createElement('my-custom-element');
    </script>

    <script src='require.js' data-main='app/startup'></script>

    <my-custom-element></my-custom-element>
  </body>
</html>
```

或者你可以使用一个顶级组件，来代替自定义元素。只要其他组件在调用 ko.applyBindings 之前完成注册即可。它们可以作为 IE6-8 上的自定义元素使用，无需更多麻烦：

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- The startup module registers all other KO components before calling
             ko.applyBindings(), so they are OK as custom elements on IE6-8 -->
    <script src='require.js' data-main='app/startup'></script>

    <div data-bind='component: "my-custom-element"'></div>
  </body>
</html>
```
## 高级:访问$raw参数
考虑一下下面不太常见的例子，useObservable1, observable1 和 observable2 都是可观察的
```html
<some-component
  params='myExpr: useObservable1() ? observable1 : observable2'>
</some-component>
```
由于评估 myExpr 涉及读取一个可观测值（useObservable1），KO 将把参数作为计算属性提供给组件。

然而，计算属性的值本身是可观察的。这似乎会导致一个尴尬的场景，读取其当前值将涉及双重展开（即params.myExpr()() ，其中第一个括号给出表达式的值，第二个括号给出结果可观察实例的值）。

这种双重展开将是丑陋、不方便和意外的，因此 Knockout 会自动设置生成的计算属性（params.myExpr）来为您展开其值。也就是说，组件可以读取参数。params.myExpr() 获取已选择的任何可观测值（observable1 或observable2）的值，而无需双重展开。

在不希望自动展开的情况下，因为希望直接访问 observable1/observable2 实例，你可以从 params.$raw 中读取值。例如：
```js
function MyComponentViewModel(params) {
  var currentObservableInstance = params.$raw.myExpr();

  // Now currentObservableInstance is either observable1 or observable2
  // and you would read its value with "currentObservableInstance()"
}
```