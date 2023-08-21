# 通过 Require.js 以 AMD 的方式使用

首先，可以了解一下 [Require.js](http://www.ruanyifeng.com/blog/2012/11/require_js.html) 的用法。

另一个链接：[https://blog.csdn.net/qq_25905161/article/details/82688751](https://blog.csdn.net/qq_25905161/article/details/82688751)

## Require.js 的基本用法

### 引入

```html
<script src="js/require.js" data-main="js/main" defer async="true"></script>
```

### define 声明模块

基本语法：define(id?, dependencies?, factory)

- id：模块名称，一般不指定
- dependencies：当前模块的依赖，数组形式，没有依赖可以不写
- factory：工厂函数（或对象）

```js
// 1. 直接声明工厂函数
define(function () {
  var add = function (x, y) {
    return x + y;
  };

  return {
    add: add,
  };
});

// 2. 带有依赖的声明
define(["myLib"], function (myLib) {
  function foo() {
    myLib.doSomething();
  }

  return {
    foo: foo,
  };
});

// 3. 直接一个对象
define({
  data: [],
  ui: [],
});

// 4. 命名模块（以上三种都是匿名模块）
define("index", ["data", "base"], function (data, base) {
  // todo
});

// 包装模块 - 书写格式和nodeJS比较像，可以使用 require 获取模块，
// 使用 exports 或者 module.exports 导出 API
define(function (require, exports, module) {
  var base = require("base");
  exports.show = function () {
    // todo with module base
  };
});
```

### require 引入模块

```js
// main.js
require(["math"], function (math) {
  alert(math.add(1, 1));
});
```

### config 配置

```js
// main.js
require(["math"], function (math) {
  alert(math.add(1, 1));
});
```

### Require.js 插件

详情查看：[https://github.com/requirejs/requirejs/wiki/Plugins](https://github.com/requirejs/requirejs/wiki/Plugins)

我们可以下载常用的 require.js 插件，然后，将常用的 require.js 插件，添加到 paths 中。
下载地址：[https://github.com/millermedeiros/requirejs-plugins](https://github.com/millermedeiros/requirejs-plugins)

```js
require.config({
  paths: {
    //create alias to plugins (not needed if plugins are on the baseUrl)
    async: "lib/require/async",
    font: "lib/require/font",
    goog: "lib/require/goog",
    image: "lib/require/image",
    json: "lib/require/json",
    noext: "lib/require/noext",
    mdown: "lib/require/mdown",
    propertyParser: "lib/require/propertyParser",
    markdownConverter: "lib/Markdown.Converter",
  },
});

//use plugins as if they were at baseUrl
define([
  "image!awsum.jpg",
  "json!data/foo.json",
  "noext!js/bar.php",
  "mdown!data/lorem_ipsum.md",
  "async!http://maps.google.com/maps/api/js?sensor=false",
  "goog!visualization,1,packages:[corechart,geochart]",
  "goog!search,1",
  "font!google,families:[Tangerine,Cantarell]",
], function (awsum, foo, bar, loremIpsum) {
  //all dependencies are loaded (including gmaps and other google apis)
});
```

> 当我们说应用程序模块化时，我们通常是指它由一组高度解耦的、存储在模块中的不同功能组成。正如您可能知道的，松耦合通过尽可能地删除依赖项，简化了应用程序的可维护性。有效地实现这一点时，很容易看到对系统的一部分所做的更改，可能会影响到另一部分。
> 然而，与一些更传统的编程语言不同，当前的 JavaScript 迭代（ECMA-262）没有为开发人员提供干净、有组织的导入此类代码模块的方法。这是对规范的关注之一，直到最近几年，人们才开始关注规范，因为越来越明显地，需要有组织的 JavaScript 应用程序。
> 相反，目前开发人员只能依靠模块或对象文本模式的变体。有了其中许多，模块脚本在 DOM 中串连在一起，名称空间由单个全局对象描述，在您的体系结构中仍然可能引起命名冲突。如果没有一些手动工作或第三方工具，也没有干净的方法来处理依赖关系管理。
> 虽然这些问题的本机解决方案将在 ES Harmony 中实现，但好消息是编写模块化 JavaScript 从来都不是一件容易的事，现在就可以开始了。

## 通过 Require.js 来加载 Knockout.js 和 ### viewModel 类

HTML 代码

> 注意 require.js 的使用方式：

```html
<script type="text/javascript" data-main="scripts/init.js" src="scripts/require.js">
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>11.more_information | KnockOut</title>
    <script
      type="text/javascript"
      data-main="./module/init.js"
      src="../assets/require.js"
    ></script>
  </head>
  <body>
    <p>First name: <input data-bind="value: firstName" /></p>
    <p>
      First name capitalized: <strong data-bind="text: firstNameCaps"></strong>
    </p>
  </body>
</html>
```

scripts/init.js

```js
require.config({
  paths: {
    // 指定 ko 的名称，和所在路径
    knockout: "../../assets/knockout-3.5.1",
  },
});

// 未指定的 appViewModel 默认在当前目录下
require(["knockout", "appViewModel"], function (ko, appViewModel) {
  ko.applyBindings(new appViewModel());
});
```

scripts/appViewModel.js

```js
define(["knockout"], function (ko) {
  return function appViewModel() {
    this.firstName = ko.observable("Bert");
    this.firstNameCaps = ko.pureComputed(function () {
      return this.firstName().toUpperCase();
    }, this);
  };
});
```

## 通过 Require.js 来加载绑定处理器

```js
define(['knockout'], function(ko) {
  ko.bindingHandlers.hasFocus = {
    init: function(element, valueAccessor) { // ... },
    update: function(element, valueAccessor) { // ... }
  }
});
```

下面是一个具体的示例：

> 这里需要 jQuery，你可以按照之前的方式引入（在 require.config 的 paths 中指定 jQuery 所在的位置）

```js
// customBindings/hasFocus.js
define(["knockout", "jquery"], function (ko, $) {
  // 自定义绑定
  ko.bindingHandlers.hasFocus = {
    init: function (element, valueAccessor) {
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
      if (ko.utils.unwrapObservable(value)) {
        $(element).focus(function () {
          value(true);
        });
      } else {
        $(element).blur(function () {
          value(false);
        });
      }
    },
  };
});
```

这里需要一个可观察的变量，并引入上面的自定义绑定。

```js
// 添加自定义绑定的引入
define(["knockout", "customBindings/hasFocus"], function (ko) {
  return function appViewModel() {
    // 是否可编辑
    this.editingName = ko.observable(true); // 添加这一行

    this.firstName = ko.observable("Bert");
    this.firstNameCaps = ko.pureComputed(function () {
      return this.firstName().toUpperCase();
    }, this);
  };
});
```
