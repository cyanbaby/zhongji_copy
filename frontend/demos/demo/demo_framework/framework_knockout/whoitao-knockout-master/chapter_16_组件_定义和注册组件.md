# 定义和注册组件

要 Knockout 能够加载和实例化组件，必须使用 ko.components.register 注册它们，并提供如下所述的配置。

> 注意: 作为一种替代方法，可以实现一个自定义组件加载器，它根据您自己的约定而非显式配置，来获取组件。

## 将组件注册为 viewModel/template 对
你可以通过如下方式注册组件
```js
ko.components.register('some-component-name', {
  viewModel: <see below>,
  template: <see below>
});
```
- 组件名可以是任何非空字符串。建议（但不是强制性的）使用小写的命令分隔字符串（例如：your-component-name），以便组件名称可以有效地用作自定义元素(例如：\<your-component-name>)。
- viewModel 是可选的，并且可以采用下面描述的任何 [viewModel 格式](https://www.cnblogs.com/tangge/p/10857318.html#specifying-a-viewmodel)。
- template 是必须的, 并且可以采用 下面描述的任何 [template 格式](https://www.cnblogs.com/tangge/p/10857318.html#specifying-a-template)

如果没有给出 viewModel，则将组件视为一个简单的 HTML 块，它将绑定到传递给组件的任何参数。

### 指定 viewModel
视图模型可以用以下任何一种形式指定：

#### 构造函数
```js
function SomeComponentViewModel(params) {
  // 'params' 是一个对象，它的键值对是来自组件绑定或自定义元素的参数
  this.someProperty = params.something;
}
 
SomeComponentViewModel.prototype.doSomething = function() { ... };
 
ko.components.register('my-component', {
  viewModel: SomeComponentViewModel,
  template: ...
});
```
Knockout 将为组件的每个实例调用一次构造函数，为每个实例生成单独的 viewModel 对象。结果对象或其原型链上的属性（例如，上面示例中的 someProperty 和 doSomething ）可用于在组件视图中的绑定。


#### 共享对象实例
如果希望组件的所有实例，共享同一个 viewModel 对象实例（通常不希望这样），可以按如下方式实现：
```js
var sharedViewModelInstance = { ... };
 
ko.components.register('my-component', {
  viewModel: { instance: sharedViewModelInstance },
  template: ...
});
```
注意，需要指定 viewModel: { instance: object }，而不仅仅是 viewModel: object。这与下面的其他情况不同。

#### 一个 createViewModel 工厂函数
如果要在关联元素绑定到 viewModel 之前，对其运行任何设置逻辑，或者使用任意逻辑来决定实例化哪个viewModel 类:
```js
ko.components.register('my-component', {
  viewModel: {
    createViewModel: function(params, componentInfo) {
      // - 'params' 是一个对象，它的键值对是来自组件绑定或自定义元素的参数
      // - 'componentInfo.element' 是组件即将插入的元素，当 createViewModel 被调用时
      //   模板已经插入到元素中，但是还没有绑定。
      // - 'componentInfo.templateNodes' 是包含任意 DOM 节点的数组，
      //   这些 DOM 节点已经提供给组件

      // 返回想要的 viewModel 实例
      return new MyViewModel(params);
    }
  },
  template: ...
});
```
注意，通常，最好只通过 [custom bindings](https://www.cnblogs.com/tangge/p/10330719.html#t0) 执行直接 DOM 操作，而不是从 createViewModel 内部对 componentInfo.element 执行操作。这将产生更加模块化、可重用的代码。
如果您想要构建一个，接受任意标记以影响其输出的组件（例如，将提供的标记注入自身的网格、列表、对话框或选项卡集），componentInfo.templateNodes 数组非常有用。

#### 一个描述 viewModel 的 AMD 模块
如果您的页面中已经有一个 AMD 加载器（如 [require.js](http://requirejs.org/)），那么您可以用它来获取一个 viewModel。
有关如何工作的更多细节，请参见下面介绍 [如何通过 AMD 加载组件](https://knockoutjs.com/documentation/component-registration.html#how-knockout-loads-components-via-amd)。例子：
```js
ko.components.register('my-component', {
  viewModel: { require: 'some/module/name' },
  template: ...
});
```
返回的 AMD 模块对象可以是 viewModel 允许的任何形式。因此，它可以是一个构造函数，例如：
```js
// AMD 模块的值是一个组件的 viewModel 构造器
define(['knockout'], function(ko) {
  function MyViewModel() {
    // ...
  }

  return MyViewModel;
});
```
或共享对象实例，例如：
```js
// AMD 模块的值是一个共享组件的 viewmodel 实例
define(['knockout'], function(ko) {
  function MyViewModel() {
    // ...
  }

  return { instance: new MyViewModel() };
});
```
或 createViewModel 函数，例如：
```js
// AMD 模块的值是一个 'createViewModel' 函数
define(['knockout'], function(ko) {
  function myViewModelFactory(params, componentInfo) {
    // return something
  }

  return { createViewModel: myViewModelFactory };
});
```
或者，即使你不太可能想这样做，一个不同的 AMD 模块的引用，例如：
```js
// AMD 模块的值是对不同 AMD 模块的引用, 这反过来又可以是这些格式中的任何一种
define(['knockout'], function(ko) {
  return { module: 'some/other/module' };
});
```

### 指定 template
模板可以用以下任何一种形式指定。最常用的是现有的 [元素id](https://knockoutjs.com/documentation/component-registration.html#an-existing-element-id) 和 [AMD模块](https://knockoutjs.com/documentation/component-registration.html#an-amd-module-whose-value-describes-a-template)。

#### 现有元素 ID
例如，下面的元素
```html
<template id='my-component-template'>
  <h1 data-bind='text: title'></h1>
  <button data-bind='click: doSomething'>Click me right now</button>
</template>
```
可以通过指定 ID 将其用作组件的模板：
```js
ko.components.register('my-component', {
  template: { element: 'my-component-template' },
  viewModel: ...
});
```
注意，只有指定元素中的节点，才会被克隆到组件的每个实例中。容器元素（在本例中为\<template>元素）将不被视为组件模板的一部分。
您不局限于使用 \<template> 元素，但这些元素很方便（在支持它们的浏览器上），因为它们不会自己渲染。任何其他元素类型也适用。

#### 现有元素实例
如果代码中有对 DOM 元素的引用，可以将其用作模板标记的容器：
```js
var elemInstance = document.getElementById('my-component-template');

ko.components.register('my-component', {
  template: { element: elemInstance },
  viewModel: ...
});
```
同样，只有指定元素中的节点将被克隆，以用作组件的模板。

#### 一串字符串标记
```js
ko.components.register('my-component', {
  template: '<h1 data-bind="text: title"></h1>\
             <button data-bind="click: doSomething">Clickety</button>',
  viewModel: ...
});
```
当您以编程方式从某处获取标记时（例如，[AMD-请参见下文](https://knockoutjs.com/documentation/component-registration.html#a-recommended-amd-module-pattern)），或者作为打包组件，以供分发的构建系统输出时，这非常有用，因为手动将 HTML 编辑为 JavaScript 字符串文本不是很方便。
#### 一组 DOM 节点
如果你正在以编程方式来构建配置，并且有一个 DOM 节点数组，则可以将它们用作组件模板：
```js
var myNodes = [
  document.getElementById('first-node'),
  document.getElementById('second-node'),
  document.getElementById('third-node')
];
 
ko.components.register('my-component', {
  template: myNodes,
  viewModel: ...
});
```
在本例中，所有指定的节点（及其后代节点）都将被克隆，并连接到要实例化的，组件的每个副本中。

#### 一个文档片段
如果你正在以编程方式来构建配置，并且您有一个 DocumentFragment 对象，那么您可以将它用作组件模板：
```js
ko.components.register('my-component', {
  template: someDocumentFragmentInstance,
  viewModel: ...
});
```
由于文档片段可以有多个顶级节点，因此，整个文档片段（不仅仅是顶级节点的后代）被视为组件模板。

#### 一个描述 template 的 AMD 模块
如果您的页面中，已经有一个 AMD 加载器（如 require.js），那么您可以使用它来获取模板。
```js
ko.components.register('my-component', {
  template: { require: 'some/template' },
  viewModel: ...
});
```
返回的 AMD 模块对象，可以是 viewModel 允许的任何形式。因此，它可以是一个标记字符串，例如：使用 [require.js 的文本插件](https://requirejs.org/docs/api.html#text) 获取:
```js
ko.components.register('my-component', {
  template: { require: 'text!path/my-html-file.html' },
  viewModel: ...
});
```
或这里描述的任何其他形式，尽管在通过 AMD 获取模板时，其他形式会很有用，但这是不常见的做法。

### 指定额外的组件选项
除了(或代替) template 和 viewModel 之外，组件配置对象还可以具有任意其他属性。此配置对象，可用于您可能正在使用的任何[自定义组件加载器](https://knockoutjs.com/documentation/component-loaders.html)。

#### 控制同步/异步加载
如果组件配置具有一个 boolean 同步属性，则 Knockout 将使用此属性，确定是否允许同步加载和注入组件。默认值为 false（即，必须是异步的）。例如：
```js
ko.components.register('my-component', {
  viewModel: { ... anything ... },
  template: { ... anything ... },
  synchronous: true // 如果可能，同步注入，否则仍然异步
});
```


#### 为什么组件加载通常是异步的?
常，Knockout 确保了组件加载以及组件注入总是异步完成的，因为有时它别无选择，只能异步完成（例如，因为它涉及到对服务器的请求）。即使可以同步注入特定的组件实例（例如，因为组件定义已经被加载），它也会这样做。这种始终异步的策略是一个一致性问题，是从其他现代异步 JavaScript 技术（如AMD）继承而来的一个公认的惯例。约定是一个安全的缺省值 - 它减轻了潜在的错误，开发人员可能没有考虑到这种可能性，即，一个典型异步过程，有时候可能是同步完成的，反之亦然。

#### 为什么要启用同步加载?
如果要更改特定组件的策略，可以在该组件的配置中指定 synchronous: true。然后它可能在第一次使用时异步加载，随后在所有后续使用中同步加载。如果您这样做，那么您需要在任何等待组件加载的代码中，考虑这种可变行为。但是，如果您的组件总是可以同步加载和初始化，那么启用此选项，将确保一致的同步行为。如果您在foreach 绑定中使用组件，并且希望通过 afterAdd 或 afterRender 选项进行后续处理，这可能很重要。
在 Knockout 3.4.0 之前，您可能需要使用同步加载，来防止多个 DOM 在同时包含多个组件时发生回流（例如使用foreach绑定）。在 Knockout 3.4.0 中，组件使用 Knockout 的[微任务](https://knockoutjs.com/documentation/microtasks.html)来确保异步性，因此，通常会执行同步加载。

## KO 如何通过 AMD 加载组件
当您通过 require 声明加载 viewModel 或 template 时，例如:
```js
ko.components.register('my-component', {
  viewModel: { require: 'some/module/name' },
  template: { require: 'text!some-template.html' }
});
```
Knockout 所做的，是调用 require(['some/module/name'], callback) 和 require(['text!some-template.html'], callback)，并使用异步返回的对象，作为 viewModel 或 template 定义。 所以，
- 这并不严格依赖于 require.js 或任何其他特定的模块加载器。任何提供 AMD 风格的模块加载器都需要 API。如果希望与 API 不同的模块加载器集成，可以实现自定义组件加载器。
- Knockout 并不以任何方式解释模块名 - 它只是将模块名传递给 require()。因此，Knockout 当然不知道或不关心从哪里加载模块文件。这取决于你的 AMD 加载器和你如何配置它。
- Knockout 不知道或关心你的 AMD 模块是否匿名。通常，我们发现将组件定义为匿名模块是最方便的，但这与 KO 完全无关。

### AMD模块只按需加载
在组件实例化之前，Knockout 不会调用 require([moduleName], ...)。这是组件按需加载的方式，而不是预先加载。例如，如果组件位于具有 if 绑定（或另一个控制流绑定）的其他元素中，则在 if 条件为真之前，不会导致加载AMD 模块。当然，如果 AMD 模块已经加载（例如，在一个预加载包中），那么 require 调用将不会触发任何额外的 HTTP 请求，因此您可以控制什么是预加载的，什么是按需加载的。

## 将组件注册为单独的 AMD 模块
为了更好的封装，您可以将组件封装到一个自描述的 AMD 模块中。然后，您可以简单地引用组件：
```js
ko.components.register('my-component', { require: 'some/module' });
```

请注意，没有指定 viewModel/template 对。AMD 模块本身可以使用上面列出的任何定义格式提供 viewModel/template 对。例如，文件 some/module.js 可以声明为：
```js
// AMD 模块 'some/module.js' 封装组件的配置
define(['knockout'], function(ko) {
  function MyComponentViewModel(params) {
    this.personName = ko.observable(params.name);
  }

  return {
    viewModel: MyComponentViewModel,
    template: '用户名：<strong data-bind="text: personName"></strong>'
  };
});
```

### 推荐 AMD 的模块模式
在实践中最有用的是创建具有内联视图模型类的 AMD 模块，并显式地依赖于外部模板文件。
例如，如果以下内容在 path/my-component.js 的文件中，
```js
// 适用于 Knockout 组件的，推荐的 AMD 模块模式:
//  - 只需一个“require”声明即可引用
//  - 可以在包含在包中使用 r.js 优化器
define(['knockout', 'text!./my-component.html'], function(ko, htmlString) {
  function MyComponentViewModel(params) {
    // 设置属性, etc.
  }
 
  // 通过原型来声明任何公共方法
  MyComponentViewModel.prototype.doSomething = function() { ... };
 
  // 返回组件定义
  return { viewModel: MyComponentViewModel, template: htmlString };
});
```
模板标记在文件 path/my-component.html 中，那么您有以下好处:
- 应用程序可以简单地引用这一点，即 
ko.components.register('my-component', { require: 'path/my-component' });
- 组件只需要两个文件 - 一个 viewmodel（path/my-component.js）和一个 template （path/my-component.html），这是开发过程中非常自然的安排。
- 由于在 define 调用中显式地声明了对模板的依赖关系，这将自动与 [r.jsoptimizer](https://requirejs.org/docs/optimization.html) 或类似的捆绑工具一起工作。因此，在构建步骤中，整个组件（viewmodel + template）可以简单地包含在一个 bundle 文件中。
    - 注意：因为 r.js 优化器非常灵活，它有很多选项，所以可能需要一些时间来设置。您可能希望从一个现成的示例开始，该示例通过 r.js 对 Knockout 组件进行优化，在这种情况下，请参阅 [Yeoman](https://yeoman.io/) 和 [generator-ko](https://www.npmjs.org/package/generator-ko) 生成器。