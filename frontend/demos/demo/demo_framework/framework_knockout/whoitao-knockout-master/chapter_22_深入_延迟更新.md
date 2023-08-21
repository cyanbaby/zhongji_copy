# 延迟更新
> 注：本文件适用于 Knockout 3.4.0 及更高版本。对于以前的版本，延迟更新插件提供了类似的支持。

在具有多个相互交织的依赖项的复杂应用程序中，更新单个 observable 可能会触发一系列 computed observable、手动订阅 和 UI 绑定更新。如果将不必要的中间值推送到视图中，或导致额外的计算可观察评估，则这些更新可能代价高昂且效率低下。即使在一个简单的应用程序中，多次更新相关的可观测值或单个可观测值（例如填充可观测数组）也会产生类似的效果。

使用延迟更新可确保，仅在依赖关系稳定后，才更新计算的可观测值和绑定。即使一个可观察对象可能经过多个中间值，也只使用最新的值来更新其依赖项。为了便于实现这一点，所有通知都变为异步的，使用 Knockout 微任务队列进行调度。这听起来可能与速率限制非常相似，速率限制也有助于防止额外通知，但延迟更新可以在不增加延迟的情况下，跨整个应用程序提供这些好处。以下是标准模式（Standard）、延迟模式（Deferred）和速率限制模式（Rate-limited）之间通知调度的区别：
- Standard – 通知会立即同步发生。依赖项通常会被通知中间值。
- Deferred – 通知会以异步地方式，在当前任务之后和任何 UI 重绘之前发生。
- Rate-limited – 通知在指定的时间段后发生（根据浏览器的不同，至少 2-10 毫秒）。

## 启用延迟（Deferred）更新
默认情况下，将关闭延迟更新，以提供与现有应用程序的兼容性。若要对应用程序使用延迟更新，必须在初始化viewModels 之前通过设置以下选项启用它：
```js
ko.options.deferUpdates = true;
```
当“deferUpdates”选项处于启用状态时，所有可观察对象、计算可观察对象和绑定，都将设置为使用延迟更新和通知。在创建基于 Knockout 的应用程序时，启用此功能意味着您无需担心解决中间值问题，因此可以实现更干净、纯粹的反应式设计。但在为现有应用程序启用延迟更新时，您应该小心，因为它会破坏依赖于同步更新，或中间值通知的代码（尽管您可以解决这些问题）

### 避免多 UI 更新
下面是一个精心设计的示例，演示了延迟更新，消除中间值的 UI 更新的能力，以及这如何提高性能。
```html
<!--ko foreach: $root-->
<div class="example">
  <table>
    <tbody data-bind='foreach: data'>
      <tr>
        <td data-bind="text: name"></td>
        <td data-bind="text: position"></td>
        <td data-bind="text: location"></td>
      </tr>
    </tbody>
  </table>
  <button data-bind="click: flipData, text: 'Flip ' + type"></button>
  <div class="time" data-bind="text: (data(), timing() + ' ms')"></div>
</div>
<!--/ko-->

<script type="text/javascript">
  function AppViewModel(type) {
    this.type = type;
    this.data = ko.observableArray([
      { name: 'Alfred', position: 'Butler', location: 'London' },
      { name: 'Bruce', position: 'Chairman', location: 'New York' }
    ]);
    this.flipData = function () {
      this.starttime = new Date().getTime();
      var data = this.data();
      for (var i = 0; i < 999; i++) {
        this.data([]);
        this.data(data.reverse());
      }
    }
    this.timing = function () {
      return this.starttime ? new Date().getTime() - this.starttime : 0;
    };
  }

  ko.options.deferUpdates = true;
  var vmDeferred = new AppViewModel('deferred');

  ko.options.deferUpdates = false;
  var vmStandard = new AppViewModel('standard');

  ko.applyBindings([vmDeferred, vmStandard]);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_47.png" align="left" />
<div style="clear: both;"></div>

由此，我们可以看到，延迟（Deferred）更新的执行时间更短。

## 为具体的 observable 启用延迟（Deferred）更新
即使您没有为整个应用程序启用延迟更新，您仍然可以为某些具体的可观察项启用延迟更新。这是使用延迟扩展器完成的：
```js
this.data = ko.observableArray().extend({ deferred: true });
```
现在，我们可以将一组选项推送到 data 数组中，而不用担心会导致过多的 UI 或计算更新。延迟扩展器可以应用于任何类型的可观测数据，包括可观测数组和计算可观测数据。

### 避免多 Ajax 请求
以下模型表示可以呈现为分页网格的数据：
```js
function GridViewModel() {
  this.pageSize = ko.observable(20);
  this.pageIndex = ko.observable(1);
  this.currentPageData = ko.observableArray();

  // 当 pageIndex 或 pageSize 变化时，请求 /Some/Json/Service,
  // 并使用结果更新 currentPageData
  ko.computed(function() {
    var params = { page: this.pageIndex(), size: this.pageSize() };
    $.getJSON('/Some/Json/Service', params, this.currentPageData);
  }, this);
}
```
因为计算监控的结果，依赖 pageIndex 和 pageSize 这两个字段。因此，这段代码会使用 jQuery 的 [$.getJSON](https://api.jquery.com/jQuery.getJSON/) 函数，在 GridViewModel 第一次初始化以及 pageIndex 或 pageSize 属性发生变化时，来重新加载 currentPageData。

这是非常简单和优雅的（添加更多可观察的查询参数也很简单，只要这些参数发生变化，就会自动触发刷新），但存在一个潜在的效率问题。假设将以下函数添加到 GridViewModel，该函数同时更改 pageIndex 和 pageSize：
```js
this.setPageSize = function(newPageSize) {
  // 每次修改 pageSize 时，都将 pageIndex 重置为 1
  this.pageSize(newPageSize);
  this.pageIndex(1);
}
```

问题是，这将导致两个 Ajax 请求：第一个将在更新 pageSize 时启动，第二个将在更新 pageIndex 后立即启动。这是对带宽和服务器资源的浪费，也是不可预测的竞争条件的来源。

当应用于 computed observable 时，延迟扩展程序还将避免对计算函数进行过度计算。使用延迟更新可以确保当前任务中，对依赖项的任何更改序列，都只会触发对计算出的可观察项的一次重新评估。例如：

```js
ko.computed(function() {
  // 这里的计算逻辑与之前一样
  var params = { page: this.pageIndex(), size: this.pageSize() };
  $.getJSON('/Some/Json/Service', params, this.currentPageData);
}, this).extend({ deferred: true });
```
现在，您可以随意多次更改 pageIndex 和 pageSize，Ajax 调用只会在您将线程释放回 JavaScript 运行时后，发生一次。

## 强制延迟通知提前发生
虽然延迟的异步通知通常更好，因为 UI 更新更少，但如果需要立即更新 UI，则可能会出现问题。有时，为了实现适当的功能，需要将中间值推送到 UI。你可以通过使用 [ko.tasks.runEarly](https://knockoutjs.com/documentation/microtasks.html#advanced-queue-control)() 方法来实现。例如：
```js
// 在数组中删除一个选项
var items = myArray.splice(sourceIndex, 1);
 
// 强制更新，UI 会看到删除/添加而不是移动
ko.tasks.runEarly();
 
// 将选项添加到新的位置
myArray.splice(targetIndex, 0, items[0]);
```

## 强制延迟监控始终通知订阅者
当任何可观察对象的值为基本值（数字、字符串、布尔值或null）时，默认情况下，仅当可观察对象的依赖项设置为，与以前实际不同的值时，才会通知该依赖项。因此，只有在当前任务结束时，基本值发生变化了，才会延迟 observable 通知，换句话说，如果一个基本值的延迟 observable 被更改为一个新值，然后又更改回原始值，则不会发生通知。

要确保始终向订阅者通知更新，即使值相同，也可以使用 notify 扩展器：
```js
ko.options.deferUpdates = true;
 
myViewModel.fullName = ko.pureComputed(function() {
  return myViewModel.firstName() + " " + myViewModel.lastName();
}).extend({ notify: 'always' });
```