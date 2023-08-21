# 微任务
> 注意：本节内容适用于 knockout 3.4.0 或之后的版本

## Knockout 微任务队列
Knockout 的微任务队列，支持在异步的情况下尽可能快地安排任务运行，努力将任务安排在 I/O、回流或重绘之前。它用于 Knockout 组件内部，以维护异步行为，并用于为 observable 安排延迟更新。
```js
ko.tasks.schedule(function () {
    // ...
});
```
这将向微任务队列添加提供的回调函数。Knockout 包括一个快速任务队列，它以 FIFO 顺序运行任务，直到队列为空。安排第一个任务时，如果可能，Knockout 将使用浏览器的微任务，来安排刷新事件。这确保了第一个任务和后续任务的表现相似。

可以使用 ko.tasks.schedule 返回的句柄值取消微任务。如果任务已运行或以前已取消，则“cancel”不做任何处理。
```js
var handle = ko.tasks.schedule(/* ... */);
ko.tasks.cancel(handle);
```

### 错误处理
如果任务抛出异常，它将不会中断任务队列，任务队列将一直持续到它为空为止。该异常将不会被推迟到后续的事件，而是通过 [ko.onError](https://knockoutjs.com/documentation/asynchronous-error-handling.html) 和 window.onerror 来处理

### 递归任务限制
由于 Knockout 会处理微任务队列直到其为空，而不会产生外部事件，因此大量或冗长的任务可能会导致浏览器页面变得无响应。如果 Kouckout 检测到高级别的递归，则通过取消所有剩余任务来防止无限递归。例如，以下操作，最终将停止并抛出错误：
```js
function loop() {
    ko.tasks.schedule(loop);
}
loop();
```

### 执行
当计划第一个任务时（最初以及前一个刷新事件完成后），Knockout 将计划一个刷新事件来处理微任务队列。如果可能，它将尝试使用浏览器自己的微任务功能。在现代浏览器中，将使用 [DOM mutation observer](https://dom.spec.whatwg.org/#mutation-observers)。在比较老的 IE 中，使用 \<script> onreadystatechange 事件。这些方法允许它在任何回流或重绘之前，开始处理队列。他将重新使用 setTimeout。

### 高级队列控制
Knockout 提供了一些高级方法，来控制微任务队列的处理时间。如果您想将 Knockout 的微任务系统与另一个库集成，或者添加对其他环境的支持，这些工具非常有用。
- ko.tasks.runEarly() — 调用此方法，立即按需处理当前微任务队列，直到其为空。除了库集成之外，如果您的代码安排了许多任务，但需要同步处理这些任务的结果，则可以使用此方法。
- ko.tasks.scheduler — 重写此方法可以重新定义或增加， Knockout 如何安排事件去处理和刷新队列。Knockout 在调度第一个任务时调用此方法，因此它必须调度事件并立即返回。例如，如果你的应用正在 Node.js 中运行，你可能会使用 process.nextTick 来刷新事件: ko.tasks.scheduler = process.nextTick;.