# 加载和保存JSON数据
Knockout 允许您实现复杂的客户端交互，但是几乎所有 web 应用程序还需要与服务器交换数据，或者至少要序列化数据以供本地存储。交换或存储数据最方便的方式是 JSON 格式 - 目前大多数 Ajax 应用程序都使用这种格式。

## 加载或保存数据
Knockout 并不强制您使用任何特定的技术来加载或保存数据。您可以使用适合您所选择的服务器端技术的任何方便的机制。最常用的机制是 jQuery 的 Ajax 助手方法，如 getJSON、post 和 Ajax。您可以从服务器获取数据：
```js
$.getJSON("/some/url", function(data) { 
    // Now use this data to update your view models, 
    // and Knockout will update your UI automatically 
})
```
… 或者可以将数据发送到服务器：
```js
var data = /* Your data in JSON format - see below */;
$.post("/some/url", data, function(returnedData) {
    // This callback is executed if the post was successful     
})
```
或者，如果不想使用 jQuery，可以使用任何其他机制来加载或保存 JSON 数据。因此，Knockout 需要帮助您做到的是：
- 为了保存，请将 viewModel 数据转换为简单的 JSON 格式，以便使用上述技术之一发送
- 对于加载，请使用通过上述技术之一收到的数据更新 viewModel

## 将 viewModel 数据转换为纯 JSON
viewModel 是 JavaScript 对象，因此在某种意义上，您可以使用任何标准的 JSON 序列化器将它们序列化为 JSON，例如 [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) (现代浏览器中的一个本机函数) 或 [json2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js) 库。然而，您的 viewModel 可能包含observables, computed observables 和 observable arrays，这些数组被实现为 JavaScript 函数，因此如果不进行额外的工作，就不能始终干净地序列化。
为了便于序列化包括可观察对象等的 viewModel 数据，Knockout 包括两个助手函数：
- ko.toJS — 这个克隆您的 viewMode 的对象图，替换每个可观察对象的当前值，这样您就得到了一个纯拷贝，它只包含您的数据，没有与 Knockout 相关的工件。
- ko.toJSON — 这将生成一个 JSON 字符串，表示 viewModel 的数据。在内部，它只是在 viewModel 上调用 ko.toJS 然后在结果上使用浏览器的原生 JSON 序列化器。注意：对于没有原生 JSON 序列化器的旧浏览器(如ie7或更早版本)，要使其工作，还必须引用 [json2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)  库。

例如，定义一个视图模型，如下所示：
```js
var viewModel = {
    firstName : ko.observable("Bert"),
    lastName : ko.observable("Smith"),
    pets : ko.observableArray(["Cat", "Dog", "Fish"]),
    type : "Customer"
};
viewModel.hasALotOfPets = ko.computed(function() {
    return this.pets().length > 2
}, viewModel)
```
这包含可观测值、计算的可观测值、可观测数组和普通值的混合。您可以使用 ko.toJSON 将其转换为适合发送到服务器的 JSON 字符串，如下所示：
```js
var jsonData = ko.toJSON(viewModel);
 
// Result: jsonData is now a string equal to the following value
// '{"firstName":"Bert","lastName":"Smith","pets":["Cat","Dog","Fish"],"type":"Customer","hasALotOfPets":true}'
```

或者，如果您只想在序列化之前得到简单的 JavaScript 对象图，请使用 ko.toJS，如下所示:

```js
var plainJs = ko.toJS(viewModel);
 
// Result: plain js现在是一个纯JavaScript对象，其中没有任何可观察的内容。这只是数据。
// The object is equivalent to the following:
//   {
//      firstName: "Bert",
//      lastName: "Smith",
//      pets: ["Cat","Dog","Fish"],
//      type: "Customer",
//      hasALotOfPets: true
//   }
```
请注意，ko.toJSON 接受与 JSON.stringify 相同的参数。例如，在调试 Knockout 应用程序时，拥有 viewModel 数据的“实时”表示，可能很有用。要生成格式良好的显示，您可以将 spaces 参数传递到 ko.toJSON 中，并绑定到您的 viewModel，如:
```html
<!--                  ko.toJSON(rootObject, replacer, space)      -->
<pre data-bind="text: ko.toJSON($root, null, 2)"></pre>
```
> 第三个参数 space 就是索引的空格数
> 2 个空格缩进
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_45.png" align="left" />
<div style="clear: both;"></div>

> 8 个空格缩进
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_46.png" align="left" />
<div style="clear: both;"></div>

## 使用 JSON 更新 viewModel 数据
如果您已经从服务器加载了一些数据，并且想要使用它来更新 viewModel，那么最直接的方法就是自己动手。例如,
```js
// Load and parse the JSON
var someJSON = /* 忽略: 从服务器上以您想要的方式获取它 */;
var parsed = JSON.parse(someJSON);
 
// 更新 viewModel 属性
viewModel.firstName(parsed.firstName);
viewModel.pets(parsed.pets);
```

在许多场景中，这种直接方法是最简单和最灵活的解决方案。当然，当您更新 viewModel 上的属性时，Knockout 将负责更新可视 UI 以匹配它。

然而，许多开发人员更喜欢基于约定的方法，通过传入数据，来更新 viewModel，而不需要为每个属性手动编写一行代码。如果 viewModel 具有许多属性，或是深度嵌套的数据结构，这将是有益的，因为它可以大大减少您需要编写的手工映射代码的数量。有关这项技术的更多细节，请参见 the knockout.mapping plugin 插件。
