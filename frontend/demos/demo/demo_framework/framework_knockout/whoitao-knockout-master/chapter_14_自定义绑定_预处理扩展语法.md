# 预处理：扩展绑定语法
> 注意：这是一种高级技术，通常仅在创建可重用绑定或扩展语法库时使用。在使用 Knockout 构建应用程序时，通常不需要这样做。

通过绑定预处理，开发人员可以在绑定过程中，定义自定义语法。这一过程，是通过提供重写 DOM 节点和绑定字符串的回调来实现的。

## 预处理绑定字符串
通过为特定绑定（如单击、可见或任何自定义绑定）提供绑定预处理器，可以理解到 Knockout 翻译 data-bind 属性的逻辑。为此，请将预处理函数附加到绑定处理程序对象上：
```js
ko.bindingHandlers.yourBindingHandler.preprocess = function(stringFromMarkup) {
  // 如果不做任何处理，则直接返回 stringFromMarkup
  // 或者返回其他字符串，如果您希望 Knockout 的行为就像原始 HTML 中提供的语法一样
}
```

### 给绑定设置默认值
如果不使用绑定的值，则默认情况下绑定为 undefined。如果希望为绑定使用不同的默认值，可以使用预处理器。例如，您可以给 uniqueName 设置一个默认值 true，当 uniqueName 没有值时，默认值就是 true：
```js
ko.bindingHandlers.uniqueName.preprocess = function(val) {
  return val || 'true';
}
```
然后，你就可以这样绑定了
```html
<!-- uniqueNmae 后面没有提供默认值，此时 uniqueName 的默认值是 true -->
<input data-bind="value: someModelProperty, uniqueName" />
```
如果绑定使用了预处理函数，但仍应将 undefined 作为默认值，则该函数应返回字符串“undefined”，而不是 undefined。直接返回 undefined 将删除绑定。

### 将表达式绑定到事件
如果您希望能够将表达式绑定到 click 事件（而不是 Knockout 期望的函数），你可以为 click 处理程序设置预处理器，以支持以下语法：
```js
ko.bindingHandlers.click.preprocess = function(val) {
  // 单击之前会执行下面的逻辑
  return 'function($data,$event){ ' + val + ' }';
}
```
然后，我们执行单击事件
```html
<button type="button" data-bind="click: myCount(myCount()+1)">Increment</button>
```

### 绑定预处理器参考
基本语法：ko.bindingHandlers.<name>.preprocess(value, name, addBindingCallback)
> 如果已定义，则在计算绑定之前，将为每个<name>绑定调用此函数

**参数：**
- value: 绑定值。 (例如, yourBinding: 1 + 1 中关联的值是 "1 + 1"). 

> 如果绑定没有指定具体的值, 则默认是 undefined.

- name: 绑定名称 (例如，yourBinding: 1 + 1 中的名称是 "yourBinding")
- addBinding: 一个可选的回调函数，该回调函数在当前元素上插入另一个绑定时调用。该函数需要两个参数：name 和 value. 例如, 在预处理函数中, 调用 addBinding('visible', 'acceptsTerms()'); 使 Knockout 的行为就像元素上有一个 visible: acceptsTerms() 绑定
**返回值**
预处理函数必须返回要解析，并传递给绑定的，新的字符串值，或者返回 undefined 以删除绑定。

例如：如果返回 value + ".toUpperCase()"  作为字符串，然后绑定 yourBinding: "Bert" 将会解析成 yourBinding: "Bert".toUpperCase()。Knockout 将以正常方式解析返回值，因此它必须是合法的 JavaScript 表达式。

不要返回非字符串值。这是没有意义的，因为标记总是一个字符串。

## 预处理 DOM 节点
通过提供一个节点预处理器，您可以理解 Knockout 遍历 DOM 的逻辑。这是一个函数，Knockout 将为它遍历的每个 DOM 节点调用一次，无论是在第一次绑定 UI 时，还是稍后在注入任何新的 DOM 子树时。
为此，请在绑定提供程序上定义 preprocessNode 函数：
```js
ko.bindingProvider.instance.preprocessNode = function(node) {
    // 通过 DOM APIs，例如 setAttribute 来修改 'node' 
    // 如果要在 DOM 中保留 'node' ，请返回 null 或不用“return”语句。
    // 如果你想用其他节点集合来替换 'node' 
    //    - 使用 insertChild 这样的 DOM APIs 在 'node' 之前立即注入新节点
    //    - 使用 removeChild 这样的 DOM APIs 来删除 'node'
    //    - 返回刚刚插入的新节点数组，然后 Knockout 可以在新节点上应用任何绑定
}
```

### 虚拟模板元素
如果您通常使用虚拟元素，来包含模板内容，那么正常语法可能会觉得有点冗长。使用预处理，可以添加使用单个注释的新模板格式：
```js
ko.bindingProvider.instance.preprocessNode = function(node) {
  // 只有是表单的注释节点时，才作出反应 <!-- template: ... -->
  if (node.nodeType == 8) {
    var match = node.nodeValue.match(/^\s*(template\s*:[\s\S]+)/);
    if (match) {
      // 创建一组注释来替换单行注释
      var c1 = document.createComment("ko " + match[1]),
          c2 = document.createComment("/ko");
      node.parentNode.insertBefore(c1, node);
      node.parentNode.replaceChild(c2, node);

      // 将新节点告诉 Knockout，然后才能在新节点上应用绑定
      return [c1, c2];
    }
  }
}
```
然后你可以在试图中，按照如下方式使用模板
```html
<!-- template: 'some-template' -->
```

### 预处理参考
ko.bindingProvider.instance.preprocessNode(node)
如果已定义，将在处理绑定之前为每个 DOM 节点调用此函数。该函数可以修改、删除或替换节点。任何新节点必须在 node 前插入，如果任何节点被添加了，或 node 被删除了，则函数必须返回一个新节点的数组，该数组现在位于文档中以代替 node。
