## 监控属性（observable）
### 监控（Observables）
Knockout 由三个核心概念组成:
- 监控属性（Observables）和依赖跟踪（Dependency tracking）
- 声明式绑定（Declarative bindings）
- 模板（Templating）

在正式开始之前，我们先来学习一下 MVVM 和试图模型（ViewModel）
### MVVM 和视图模型
Model-View-View Model (MVVM) 是一种创建用户界面的设计模式。通过它只要将 UI 界面分成以下 3 个部分，就可以使复杂的界面变得简单：
- Model，应用存储的数据，这些数据表示业务领域的对象和操作（例如：银行可以进行资金转账），并且独立于任何界面。当使用 KO 的时候，通常是使用 Ajax 向服务器发送请求，来实现模型中数据的读写。
- View Model，UI 上数据和操作的纯代码表示。例如，如果您正在实现一个列表编辑器，那么 viewModel 将是一个包含项目列表的对象，并公开用于添加和删除项目的方法。
- View，代表 viewModel 状态的一个可见、互动的 UI 界面。它主要用于显示 viewModel 的数据信息、发送用户命令（例如，当用户点击按钮）以及在 viewModel 发生变化时保持自动更新。

使用 KO 时，视图只是 HTML 文档，带有声明性绑定，将其链接到 viewModel。或者，您可以通过使用 viewModel 中的数据生成 HTML 的模板。



#### View Model
```js
// 声明 viewModel 就是声明一个 JavaScript 对象
var myViewModel = {
  personName: 'Bob',
  personAge: 123
};
```
#### View
```html
The name is <span data-bind="text: personName"></span>
```
> data-bind 属性不是 HTML 的固有属性，尽管它完全正常（它在 HTML5 中严格兼容，并且不会导致 HTML4 出现问题，即使验证器会指出它是一个无法识别的属性）。但是由于浏览器不知道它的意思，所以需要激活Knockout使其生效。
#### 激活 Knockout
data-bind 属性尽管好用，但它不是 HTML 的原生属性（它严格遵从 HTML5 语法， 虽然 HTML4 验证器提示有不可识别的属性，但依然可用）。由于浏览器不识别它是什么意思，所以你需要激活 Knockout 来让他起作用。
激活Knockout，需要添加如下的 \<script\> 代码块：
```js
// 只需要在 <script> 标签内，添加如下一行
ko.applyBindings(myViewModel);
```

```shell
applyBindings 的第二个参数，可以指定具体的 DOM 元素。然后在指定的 DOM 元素中搜索 data-bind
```
```js
ko.applyBindings(myViewModel, document.getElementById('someElementId'))
```
你可能奇怪ko.applyBindings使用的是什么样的参数,
- 第一个参数 是你想用于声明式绑定的 viewModel
- 第二个参数（可选），可以声明成使用 data-bind 的 HTML 元素或者容器。例如， ko.applyBindings(myViewModel, document.getElementById('someElementId'))。它的现在是只有作为someElementId 的元素和子元素才能激活KO功能。 好处是你可以在同一个页面声明多个view model，用来区分区域。

然后你的试图将显示成
```html
The name is <span>Bob</span>
```

### 监控（observable）
上面，你已经看到如何创建一个基本的数据模型，以及如何利用绑定来显示它的属性。但是 KO 最重要的一个特征就是，当 viewModel 发生变化时，能够自动的更新 UI 界面。KO 是如何能够知道你的 viewModel 已经发生改变了呢？答案是：你需要将你的 model 属性声明成 observable 的，因为它是非常特殊的 JavaScript 对象，能够通知用户它的改变，以及自动检测依赖关系。
重写监控信息
```js
var myViewModel = {
    personName: ko.observable('Bob'),
    personAge: ko.observable(123)
};
```
> 你根本不需要对 View 进行更改，所有的 data-bind 语法依然正常工作。所不同的是，现在它能够自动检测变化，并通知它自动更新界面（View）。

#### 读写监控属性
并不是所有的浏览器都支持 JavaScript 的 getters 和 setters（比如IE），所以，为了兼容，ko.observable 监控的对象实际上是方法。
- 读取，只需要直接调用 observable（不需要参数），在这个例子当中，
    - 调用 myViewModel.personName() 将会返回 'Bob'，
    - 调用 myViewModel.personAge() 将会返回 '123'。
- 写入，调用 observable 方法，将要写的值作为一个参数传入即可。例如，
    - 调用 myViewModel.personName('Mary') 将会把名称改变成 'Mary'。
- 写多个值，你可以使用链式写法。
    - 例如：myViewModel.personName('Mary').personAge(50) 会把名称改变成 'Mary'，将年龄设置为 50。

监控属性最重要的一点就是可以随时监控，也就是说，其他代码可以告诉它，哪些是需要通知发生变化的。这就是为什么 KO 会有如此多的内置绑定语法。所以，当你在页面中编写 data-bind="text: personName"，text 会绑定注册到自身，当 personName 发生变化时，它能够立即得到通知。
当你通过调用 myViewModel.personName('Mary') 将名称的值改变成为 'Mary' 时，text 绑定会自动更新新值到其对应的 DOM 对象元素上，这就是为什么改变数据模型，能够自动刷新 View 页面。

#### 显式订阅监控属性（subscribe）
通常情况下，你不需要手动订阅。对于高级用户，你可以通过注册自己的订阅，来通知监控属性的变化，此时，你可以使用 subscribe 方法。例如：
```js
myViewModel.personName.subscribe(function(newValue) {
  alert("The person's new name is " + newValue);
});
```

subscribe 方法在 KO 内部很多地方都有用到。你也可以终止自己的订阅：首先获取到这个订阅，然后调用 dispose 方法即可。例如：
```js
var subscription = myViewModel.personName.subscribe(function(newValue) { /* do stuff */ });
// ... 然后 ...
subscription.dispose(); // 终止订阅
```
如果想在数据变化之前进行订阅，我们可以使用第三个参数，例如：'beforeChange'
> subscribe 有三个参数
> - callback：通知发生时的回调函数
> - target(可选)：定义回调函数中 this 的值
> - event(可选)：接收通知的事件。默认是 change

```js
myViewModel.personName.subscribe(function(oldValue) {
    alert("The person's previous name is " + oldValue);
}, null, "beforeChange");
```

> 注意：KO 并不能保证 beforeChange 和 Change 同时发生，因为其他代码，也可能会触发这两个事件。如果您需要跟踪一个可观察对象的先前值，那么您可以使用订阅来捕获和跟踪它。

#### 用“ko.when”对特定监控事件作出反应
```js
ko.when(function () {
    return myViewModel.personName() !== undefined;
}, function (result) {
    myViewModel.isInitialized(true);
});
```

#### 强制监控对象始终通知订阅者
```js
myViewModel.personName.extend({ notify: 'always' });
```

#### 延迟 和/或 抑制更改通知
```js
// 每 50 毫秒更新一次 - 限流
myViewModel.personName.extend({ rateLimit: 50 });
```