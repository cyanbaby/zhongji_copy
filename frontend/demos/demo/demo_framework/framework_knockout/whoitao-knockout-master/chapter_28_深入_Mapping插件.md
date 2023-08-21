# Mapping 插件

Knockout 设计成允许你使用任何 JavaScript 对象作为 viewModel。只要 viewModel 的某些属性是可观察的，就可以使用 KO 将它们绑定到 UI，并且只要可观察属性发生更改，UI 就会自动更新。
大多数应用程序，需要从后端服务器获取数据。因为服务器没有任何 observable 的概念，所以它只提供一个普通的 JavaScript 对象（通常序列化为 JSON）。Mapping 插件为您提供了一种简单的方法，可以将普通 JavaScript 对象映射到，具有合适可观察值的 viewModel 中。这是手动编写自己的 JavaScript 代码的替代方法，JavaScript 代码，基于从服务器获取的一些数据来构建 viewModel。

下载：[Version 2.0](https://github.com/SteveSanderson/knockout.mapping/tree/master/build/output)（最小版本 8.6kb）

## 手动映射

您希望显示当前服务器时间和网页上的用户数。可以使用以下 viewModel 表示此信息：

```js
var viewModel = {
  serverTime: ko.observable(),
  numUsers: ko.observable(),
};
```

然后，可以将 viewModel 绑定到 HTML 上

```html
The time on the server is: <span data-bind="text: serverTime"></span> and
<span data-bind="text: numUsers"></span> user(s) are connected.
```

由于 viewModel 属性是可观察的，所以只要这些属性发生更改，KO 就会自动更新 HTML 元素。
接下来，你想从服务器上获取最新数据。每五分钟发送一个 Ajax 请求（例如，使用 jQuery 的 $.getJSON 或 $.ajax 函数）：

```js
var data = getDataUsingAjax(); // 从服务器上获取数据
```

服务器返回如下的 JSON 数据（data）

```js
{
  serverTime: '2010-01-07',
  numUsers: 3
}
```

最后，要使用此数据（不使用映射插件）更新 viewModel，您需要编写：

```js
// data 是服务器返回的数据
viewModel.serverTime(data.serverTime);
viewModel.numUsers(data.numUsers);
```

对于要在页面上显示的每个变量，都必须这样做。如果您的数据结构变得更加复杂（例如，它们包含子级或数组），手动处理会变得非常麻烦。映射插件允许您创建，从常规 JavaScript 对象（或 JSON 结构）到可观察的 viewModel 的映射。

## 通过 ko.mapping 映射

想要通过映射插件创建 viewModel，直接使用 ko.mapping.fromJS 函数来创建：

```js
var viewModel = ko.mapping.fromJS(data);
```

它会自动将 data 里所有的属性创建成 observable 类型的属性。你可以通过 ko.mapping.fromJS 函数定期从服务器获取数据，然后更新你的 viewModel：

```js
// data 是从服务器获取的数据
ko.mapping.fromJS(data, viewModel);
```

## 如何映射

- 对象的所有属性都被转换成 observable 类型，如果对象的值改变了，就会更新对应的 observable 的值.
- 数组也被转换成了 observableArray，如果数组的个数变了，映射插件会相应地执行添加，或删除操作，也会尽量保持和原生 JavaScript 数组相同的顺序。

## 取消映射

如果要将映射对象转换回常规 JS 对象，请使用：

```js
var unmapped = ko.mapping.toJS(viewModel);
```

这将创建一个未映射的对象，其中只包含作为原始 JS 对象一部分的，映射对象的属性。因此，换句话说，手动添加到 viewModel 中的任何属性或函数都将被忽略。默认情况下，此规则的唯一例外是\_destroy 属性，该属性也将被映射回去。因为，当你销毁来自 ko.observableArray 的选项时，这是 Knockout 可能生成的属性。有关如何配置的更多详细信息，请参阅“高级用法”部分。

## 与 JSON 字符串一起使用

如果你的 Ajax 调用返回的是 JSON 字符串（而不是反序列化后的 JavaScript 对象），你可以使用 ko.mapping.fromJSON 函数来创建和更新你的 viewModel。用 ko.mapping.toJSON 实现 unmap 操作。
除了使用 JSON 字符串（而不是 JS 对象）之外，这些函数与 \*JS 对应的内容完全相同。

## 高级用法

有时候，我们可以通过 mapping options 来对 mapping 的执行方式进行更多的控制。我们可以在调用 ko.mapping.fromJS 的时候声明 mapping options，后续调用无需再次声明。
这里有一些情形，你可能需要使用这些 options。

### 用法 1：使用 keys 来唯一标识对象

假定你有如下结构的对象：

```js
var data = {
  name: "Scot",
  children: [{ id: 1, name: "Alicw" }],
};
```

然后，可以将其映射成 viewModel

```js
var viewModel = ko.mapping.fromJS(data);
```

假定数据更新了

```js
var data = {
  name: "Scott", // name 从 Scot 变成了 Scott
  children: [
    { id: 1, name: "Alice" }, // name从Alicw变成了Alice
  ],
};
```

这里发生了两件事：name 从 Scot 变成了 Scott，children[0].name 从 Alicw 变成了 Alice。你可以用如下代码更新 viewModel：

```js
ko.mapping.fromJS(data, viewModel);
```

于是，name 像我们期望的一样更新了，但是在 children 数组里，子项 Alicw 被删除，而新项 Alice 被添加到数组里。这不是我们所期望的，我们期望的是只是把 name 从 Alicw 更新成 Alice，不是替换整个 item 项。
发生的原因是，默认情况下 mapping 插件，只是简单地比较，数组里的两个对象是否相等。 因为 JavaScript 里 { id : 1, name : 'Alicw' } 和 { id : 1, name : 'Alice' } 是不相等的，所以它认为整个孩子需要被移除，并替换成新的。要解决这个问题，您可以指定映射插件，应该使用哪个 key 来确定，对象是新的还是旧的。您可以这样设置它：

```js
var mapping = {
  children: {
    key: function (data) {
      return ko.utils.unwrapObservable(data.id);
    },
  },
};
var viewModel = ko.mapping.fromJS(data, mapping);
```

这样，每次映射插件检查 children 数组中的项目时，它只会查看 id 属性，以确定对象是否已完全替换，或仅需要更新。

### 用法 2：用 create 自定义对象的构造器

如果您想自己处理 mapping 的一部分，还可以使用 create 回调。如果存在此回调，映射插件将允许您自己完成这部分映射。
举例，假定你有如下 JS 对象

```js
var data = {
  name: "Graham",
  children: [{ id: 1, name: "Lisa" }],
};
```

如果你想自已映射 children 数组，你可以这样做：

```js
var mapping = {
  children: {
    create: function (options) {
      return new myChildModel(options.data);
    },
  },
};
var viewModel = ko.mapping.fromJS(data, mapping);
```

create 回调中的 options 参数是一个 JavaScript 对象，包含如下：

- data： JavaScript 对象，包含 child 用到的数据
- parent：child 对象所属的父对象或者数组
  当然，在内部的 create 回调里，你也可以再次调用 ko.mapping.fromJS。一个例子就是：如果你想通过额外的计算属性，来增强初始的 JavaScript 对象：

```js
var myChildModel = function (data) {
  ko.mapping.fromJS(data, {}, this);

  this.nameLength = ko.computed(function () {
    return this.name().length;
  }, this);
};
```

### 用 update 自定义对象的更新

你也可以使用 update 回调来自定义一个对象如何更新。它接受一个需要替代的对象，以及和 create 回调一样的 options 参数，你应该 return 更新后的值。
update 回调使用的 options 参数是一个 JavaScript 对象，包含如下内容：

- data：JavaScript 对象，包含 child 用到的数据
- parent：child 对象所属的父对象或者数组
- observable：如果属性是 observable 的，这将会写入到实际的 observable 里

这里有一个配置示例，该配置将在更新前，向传入数据添加一些文本：

```js
var data = {
  name: "Graham",
};

var mapping = {
  name: {
    update: function (options) {
      return options.data + "foo!";
    },
  },
};
var viewModel = ko.mapping.fromJS(data, mapping);
alert(viewModel.name());
```

alert 的结果是：Grahamfoo!。

### 通过 ignore 忽略特定属性

如果在 map 的时候，你想忽略一些属性，你可以使用 ignore 来声明需要忽略的属性名称集合：

```js
var mapping = {
  ignore: ["propertyToIgnore", "alsoIgnoreThis"],
};
var viewModel = ko.mapping.fromJS(data, mapping);
```

你在映射选项中声明的 ignore 数组，会被编译到默认的 ignore 数组里。你可以像下面代码一样来操作它：

```js
var oldOptions = ko.mapping.defaultOptions().ignore;
ko.mapping.defaultOptions().ignore = ["alwaysIgnoreThis"];
```

### 通过 include 包含特定属性

将 viewModel 转换成 JS 对象时，默认情况下，映射插件将只包含原始 viewModel 部分的属性，除此之外，它还将包括 knockout 生成的 \_destroy 属性（虽然它不是原始对象的一部分）。然而，你可以选择自定义该数组。

```js
var mapping = {
  include: ["propertyToInclude", "alsoIncludeThis"],
};
var viewModel = ko.mapping.fromJS(data, mapping);
```

你在映射选项中指定的 include 数组，与默认的 include 数组结合，默认情况下，该数组只包含 \_destroy。你可以按照如下方式操作该默认数组：

```js
var oldOptions = ko.mapping.defaultOptions().include;
ko.mapping.defaultOptions().include = ["alwaysIncludeThis"];
```

### 通过 copy 复制特定属性

当我们把 viewModel 转成 JS 对象的时候，默认情况下，映射插件会给予以上规则来创建 observable。如果你只是想简单的复制某个属性（而不是将属性置成 observable ）。你可以将属性名称添加到 copy 数组中：

```js
var mapping = {
  copy: ["propertyToCopy"],
};
var viewModel = ko.mapping.fromJS(data, mapping);
```

你在映射选项中指定的 copy 数组，与默认的 copy 数组结合，默认情况下，该数组是空的。你可以按照如下方式操作该默认数组：

```js
var oldOptions = ko.mapping.defaultOptions().copy;
ko.mapping.defaultOptions().copy = ["alwaysCopyThis"];
```

### 通过 observe 观察特定属性

如果你希望映射插件，只需要将 JS 对象中的某些属性创建为 observable，剩余属性只需要复制，那你可以通过 observe 来指定属性名数组。

```js
var mapping = {
  observe: ["propertyToObserve"],
};
var viewModel = ko.mapping.fromJS(data, mapping);
```

你在映射选项中指定的 observe 数组，与默认的 observe 数组结合，默认情况下，该数组是空的。你可以按照如下方式操作该默认数组：

```js
var oldOptions = ko.mapping.defaultOptions().observe;
ko.mapping.defaultOptions().observe = ["onlyObserveThis"];
```

数组的 ignore 和 include 仍然正常工作，为了提高复制数组或对象属性（包括子属性）的效率，可以使用数组 copy。如果在“copy”或“observe”中未指定数组或对象属性，则会递归映射该属性：

```js
var data = {
  a: "a",
  b: [{ b1: "v1" }, { b2: "v2" }],
};

var result = ko.mapping.fromJS(data, { observe: "a" });
var result2 = ko.mapping.fromJS(data, { observe: "a", copy: "b" }); // 比 map 更快
```

a 和 b 如下：

```js
{
  a: observable("a"),
  b: [{ b1: "v1" }, { b2: "v2" }]
}
```

深入研究数组/对象是可行的，但复制和观察可能会发生冲突：

```js
var data = {
  a: "a",
  b: [{ b1: "v1" }, { b2: "v2" }],
};
var result = ko.mapping.fromJS(data, { observe: "b[0].b1" });
var result2 = ko.mapping.fromJS(data, { observe: "b[0].b1", copy: "b" });
```

result 是：

```js
{
  a: "a",
  b: [{ b1: observable("v1") }, { b2: "v2" }]
}
```

result 2 是（copy 覆盖了 observe）：

```js
{
  a: "a",
  b: [{ b1: "v1" }, { b2: "v2" }]
}
```

### 指定更新目标

如上例所示，如果在类内部执行映射，则希望将 this 作为映射操作的目标。可以通过 ko.mapping.fromJS 的第三个参数指定目标。

```js
ko.mapping.fromJS(data, {}, someObject); // 覆写 someObject 上的属性
```

所以，如果把 JS 对象映射到 this，你可以将 this 作为第三个参数传入。

```js
ko.mapping.fromJS(data, {}, this);
```

### 从多数据源映射

通过使用多个 ko.mapping.fromJS 调用，你可以把多个 JS 对象合并到一个 viewModel 上，例如：

```js
var viewModel = ko.mapping.fromJS(alice, aliceMappingOptions);
ko.mapping.fromJS(bob, bobMappingOptions, viewModel);
```

你在每次调用中使用的映射选项，将会合并。

### 已映射的可观察数组
通过映射插件生成的可观察数组，可以同通过一些函数来增强，这些函数可以利用 key 映射。
- mappedRemove
- mappedRemoveAll
- mappedDestroy
- mappedDestroyAll
- mappedIndexOf

他们的功能与常规的 ko.observableArray 相同，但可以根据对象的键进行操作。例如，这将起作用
```js
var obj = [
  { id : 1 },
  { id : 2 }
]
 
var result = ko.mapping.fromJS(obj, {
  key: function(item) {
    return ko.utils.unwrapObservable(item.id);
  }
});
 
result.mappedRemove({ id : 2 });
```
已经映射的可观察数组，还会暴露一个 mappedCreate 函数：
```js
var newItem = result.mappedCreate({ id : 3 });
```
它将首先检查 key 是否已经存在，如果已经存在，将抛出异常。接下来，它将调用 create 和 update 回调（如果有）来创建新对象。最后，它将把这个对象添加到数组中并返回它。