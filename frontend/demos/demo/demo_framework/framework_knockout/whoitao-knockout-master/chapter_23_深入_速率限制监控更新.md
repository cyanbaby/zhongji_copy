# 速率限制监控更新
> 注：此速率限制 API 是在 Knockout 3.1.0 中添加的。对于以前的版本，[throttle](https://knockoutjs.com/documentation/throttle-extender.html) 扩展器提供类似的功能。

通常，一个被更改的可观察对象会立即通知其订阅者，以便同步更新任何依赖于该可观察对象的计算或绑定。但是，rateLimit 扩展器会使可观察对象，在指定的时间段内抑制并延迟更改通知。因此，速率受限的可观察对象异步更新依赖项。
rateLimit 扩展器可以应用于任意类型的可观察者。包括 [observable arrays](https://knockoutjs.com/documentation/observableArrays.html) 和 [computed observables](https://knockoutjs.com/documentation/computedObservables.html)，速度限制的主要应用场景有：
- 使事情在一定的延迟后作出反应
- 将多个更改合并到单个更新中

如果只需要合并更新而不增加延迟，则[延迟更新](https://www.yuque.com/whoitao/knockout/zzs83l)提供了一种更有效的方法。


## 使用 rateLimit 扩展器
支持两种形式的参数：
```js
// 速记方式: 仅指定超时时间（以毫秒为单位）
someObservableOrComputed.extend({ rateLimit: 500 });
 
// 非速记方式: 指定超市时间和方法
someObservableOrComputed.extend({ rateLimit: { 
  timeout: 500, 
  method: "notifyWhenChangesStop" 
} });
```
method 选项控制何时触发通知，并接受以下任何值：
1. "notifyAtFixedRate" — 如未指定 method，则该项为默认值. 通知发生在第一次更改 observable 的时候（最初或自上次通知之后）
2. "notifyWhenChangesStop" — 在指定的时间段内，即使 observable 未发生任何更改，也将发出通知。每次 observable 更改时，计时器都会重置，因此，如果 observable 连续更改频率高于超时时间，则不会发生通知。
3. 处理通知调度的自定义函数. 例如, 你使用了 Underscore 的 throttle 方法: myObservable.extend({ rateLimit: { timeout: 500, method: _.throttle } }); 

### 例1：基本用法
考虑如下场景：
```js
var name = ko.observable('Bert');
 
var upperCaseName = ko.computed(function() {
    return name().toUpperCase();
});
```
如果名称是
```js
name('The New Bert');
```

运行下一行代码之前， upperCaseName 将会立即重新计算。但如果你通过 rateLimit 来定义 name

```js
var name = ko.observable('Bert').extend({ rateLimit: 500 });
```
然后，upperCaseName 即使发生变化，也不会立即计算 - 相反地，在新值通知到 upperCaseName 之前，name 将会等待 500 毫秒。然后 upperCaseName 会重新计算值。在 500 毫秒内，不管 name 变化多少次。upperCaseName 只会使用最新的值执行一次更新。

### 例2：用户停止输入时做点什么
在这个活生生的例子中，有一个可观察到的 instantaneousValue ，当你按下一个键时，它会立即做出反应。然后将其包装在计算属性 delayedValue 中，该值配置为仅在更改停止至少400毫秒时，使用 notifyWhenChangesStop 的限速方法进行通知。
```html
<p>输入的值: <input data-bind='textInput: instantaneousValue' /></p>
<p>当前延迟值: <b data-bind='text: delayedValue'> </b></p>

<div data-bind="visible: loggedValues().length > 0">
  <h3>你已经输入的值:</h3>
  <ul data-bind="foreach: loggedValues">
    <li data-bind="text: $data"></li>
  </ul>
</div>

<script type="text/javascript">
  function AppViewModel() {
    this.instantaneousValue = ko.observable();
    this.delayedValue = ko.pureComputed(this.instantaneousValue)
      .extend({ rateLimit: { 
        method: "notifyWhenChangesStop", 
        timeout: 400 
      } });

    // 记录限流值的日志
    this.loggedValues = ko.observableArray([]);
    this.delayedValue.subscribe(function (val) {
      if (val !== '') this.loggedValues.push(val);
    }, this);
  }

  ko.applyBindings(new AppViewModel());
</script>
```

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_48.png" align="left" />
<div style="clear: both;"></div>


## 自定义限制方法
Knockout 3.5 引入了通过向 rateLimit extender 传递函数（而不仅仅是字符串），来指定自定义速率限制方法的功能。使用三个参数（函数、超时、选项）调用该函数，并且必须返回一个新的速率受限函数。每当可观察对象有一个可能的新值要通知时，它将调用返回的函数，然后该函数将根据自定义方法的规则，在延迟一段时间后调用原始函数。例如，下面是一个函数，它实现了防抖，但也立即通知初始值：
```js
function debounceSubsequentChanges(action, timeout) {
  var timeoutInstance;
  return function () {
    if (!timeoutInstance) {
      action();
      timeoutInstance = setTimeout(function () {
        timeoutInstance = undefined;
      }, timeout);
    } else {
      clearTimeout(timeoutInstance);
      timeoutInstance = setTimeout(function() {
        timeoutInstance = undefined;
        action();
      }, timeout);
    }
  };
}
```
您的函数还可以接受第三个参数，即包含传递给 rateLimit 扩展器的任何附加参数的对象。

## 计算监控（computed observable）的特殊考量
对于 computed observable，当它的一个依赖项发生变化（而不是其值发生变化）时，只有在变更通知超时时间之后，或者直接访问 computed observable 时，才需要重新评估 computed observable。如果需要访问计算出的最新计算值，可以使用 peek 方法进行访问。

## 强制速率受限的观察对象始终通知订阅者
当任何可观察对象的值为基本值（数字、字符串、布尔值或null）时，默认情况下，仅当可观察对象的依赖项设置为与以前实际不同的值时，才会通知该依赖项。因此，原始值速率限制的观测值仅在，超时时间结束时其值实际不同时才发出通知。换句话说，如果一个原始值的速率限制可观测值被更改为一个新值，然后在超时时间结束之前更改回原始值，则不会发生通知。
如果要确保，始终向订阅者通知更新，即使值相同，除了 rateLimit 之外，您还可以使用 notify 扩展器：
```js
myViewModel.fullName = ko.computed(function() {
    return myViewModel.firstName() + " " + myViewModel.lastName();
}).extend({ notify: 'always', rateLimit: 500 });
```

## 与延迟更新的比较
Knockout 3.4.0 添加了对[延迟更新](https://www.yuque.com/whoitao/knockout/zzs83l)的支持，这与速率限制类似。但与速率限制使用定时延迟不同，延迟更新会在当前任务完成后，在I/O、回流或重绘之前，尽快处理。如果您正在升级到 3.4.0，并且代码使用短速率限制超时（例如，0毫秒），您可以将其修改为使用延迟更新：
```js
ko.computed(function() {
    // ....
}).extend({ deferred: true });
```

## 与限流扩展器的比较
如果您想从使用不推荐使用的限流扩展器迁移代码，您应该注意 rateLimit 扩展器与限流扩展器的不同之处。
当使用 rateLimit 时
1. 写入 observables 不会延迟; observable 的值会立即更新. 对于可写的 computed observables 来说, 这将意味着写函数永远会立即执行.
2. 所有的变更通知都会延迟, 包括手动调用 valueHasMutated 时. 这将意味着你不能使用 valueHasMutated 来强制限速一个 observable 来通知未发生变化的值。
3. 默认的限速方法与 throttle 的算法不同. 要匹配 throttle 的行为, 使用 notifyWhenChangesStop 方法.
4. 速率受限计算可观测的评估不是速率受限的；如果您读取它的值，它将重新计算。
