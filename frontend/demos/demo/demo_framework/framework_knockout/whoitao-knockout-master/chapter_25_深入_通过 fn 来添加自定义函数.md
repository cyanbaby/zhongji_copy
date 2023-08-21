# 通过 fn 来添加自定义函数
有时，您可能会发现，通过将新功能附加到 Knockout 的核心值类型来，可以简化代码。您可以在以下任何类型上定义自定义函数：

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_50.png" align="left" />
<div style="clear: both;"></div>

由于继承，如果您将一个函数附加到 ko.subscribable，它也会在所有其他函数上可用。如果将一个函数附加到ko.observable，它将被 ko.observableArray 继承，但不会被 ko.computed 继承。
要附加自定义函数，请将其添加到以下扩展点之一：
- ko.subscribable.fn
- ko.observable.fn
- ko.observableArray.fn
- ko.computed.fn

然后，您的自定义函数，将对从此以后创建的所有该类型的值可用。
> Note: 最好只将此可扩展性点用于真正适用于广泛场景的自定义函数。如果只打算使用一次，则不需要向这些名称空间添加自定义函数。

## 过滤可观察数组
以下是定义 filterByProperty 函数的方法，该函数将在所有后续创建的 ko.observableArray 实例中可用:
```js
ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
  return ko.pureComputed(function() {
    var allItems = this(), matchingItems = [];
    for (var i = 0; i < allItems.length; i++) {
      var current = allItems[i];
      if (ko.unwrap(current[propName]) === matchValue)
        matchingItems.push(current);
    }
    return matchingItems;
  }, this);
}
```
这将返回一个新的计算值，该值提供一个经过筛选的数组视图，同时保持原始数组不变。因为过滤后的数组是计算可监控到的，所以每当底层数组发生更改时，都会重新计算它。

完整示例代码：
```html
<h3>全部任务 (<span data-bind="text: tasks().length"> </span>)</h3>
<ul data-bind="foreach: tasks">
  <li>
    <label>
      <input type="checkbox" data-bind="checked: done" />
      <span data-bind="text: title"> </span>
    </label>
  </li>
</ul>

<h3>已完成 (<span data-bind="text: doneTasks().length"> </span>)</h3>
<ul data-bind="foreach: doneTasks">
  <li data-bind="text: title"></li>
</ul>

<script type="text/javascript">
  // 自定义函数
  ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
    return ko.pureComputed(function() {
      var allItems = this(), matchingItems = [];
      for (var i = 0; i < allItems.length; i++) {
        var current = allItems[i];
        if (ko.unwrap(current[propName]) === matchValue)
          matchingItems.push(current);
      }
      return matchingItems;
    }, this);
  }

  function Task(title, done) {
    this.title = ko.observable(title);
    this.done = ko.observable(done);
  }

  function AppViewModel() {
    this.tasks = ko.observableArray([
      new Task('吃饭', true),
      new Task('睡觉', false),
      new Task('打豆豆', true)
    ]);

    // 使用自定义函数
    this.doneTasks = this.tasks.filterByProperty("done", true);
  }

  ko.applyBindings(new AppViewModel());
</script>
```

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_51.png" align="left" />
<div style="clear: both;"></div>


已完成的任务，是由自定义函数 filterByProperty 过滤产生的。

## 这不是强制性的
如果您倾向于大量过滤可观察数组，那么全局地向所有可观察数组添加 filterByProperty 可能会使您的代码更整洁。但如果只是偶尔需要过滤，则可以选择不附加到 ko.observableArray.fn，而只是手工构造 doneTasks ，如下所示：
```js
this.doneTasks = ko.pureComputed(function() {
  var all = this.tasks(), done = [];
  for (var i = 0; i < all.length; i++)
    if (all[i].done())
      done.push(all[i]);
  return done;
}, this);
```