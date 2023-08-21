# 异步报错处理
> 注意：本节内容适用于 knockout 3.4.0 或之后的版本

## ko.onError
如果遇到异常，则在抛出原始错误之前。Knockout 包装内部异步调用，并查找可选的 ko.onError 回调的执行。这使您有机会运行自定义逻辑，例如将错误传递给日志模块。此外，由于原始调用包装在 try/catch 中，因此，传递给 ko.onError 的错误包含 stack 属性。当使用 window.onerror 来处理错误时，在很多浏览器中都不返回 true
此功能适用于以下上下文中的错误：
- 作为 textInput 和 value 绑定的一部分的异步更新
- 未配置为同步加载时，通过缓存组件进行组件加载 
- [rate-limited](https://knockoutjs.com/documentation/rateLimit-observable.html) 和 [throttled](https://knockoutjs.com/documentation/throttle-extender.html) 计算
- 由 ko.utils.registerEventHandler 添加的事件处理器，包括来自 event 和 click 的绑定

## 示例
```js
ko.onError = function(error) {
    myLogger("knockout error", error);
};
```