# 绑定语法

# data-bind
Knockout 的声明性绑定系统提供了，将数据链接到 UI 的简洁而强大的方法。绑定到简单的数据属性或使用单个绑定，通常是简单而明显的。更复杂的绑定，有助于更好地理解 Knockout 绑定系统的行为和语法。

## 绑定语法
绑定由两个项组成，绑定名称和值由冒号分隔。以下是单个简单绑定的示例：
基本语法：data-bind="绑定名称: 绑定值"
```html
<span data-bind="text: myMessage"></span>
```
一个元素可以包含多个绑定（相关或不相关），每个绑定用逗号分隔。以下是一些例子：
```html
<!-- 关联绑定: valueUpdate 是 value 的参数 -->
<input data-bind="value: someValue, valueUpdate: 'afterkeydown'" />
 
<!-- 非关联绑定 -->
<input data-bind="value: cellphoneNumber, enable: hasCellphone" />
```
绑定名称通常应与已注册的绑定（内置或自定义）匹配，或者是另一个绑定的参数（例如：valueUpdate）。如果名称与这两个都不匹配，Knockout 将忽略它（没有任何错误或警告）。因此，如果绑定似乎不起作用，首先检查名称是否正确。

## 绑定值
value 绑定可以是值，变量或字面量，更有甚者，可以是任意合法的 JS 表达式
```html
<!-- 是否显示（通常是当前 viewModel 的属性） -->
<div data-bind="visible: shouldShowMessage">...</div>
 
<!-- 比较和条件 -->
<span data-bind="text: price() > 50 ? `expensive` : `cheap`"></span>.
 
<!-- 函数回调 -->
<button data-bind="enable: parseAreaCode(cellphoneNumber()) != '555'">...</button>
 
<!-- 函数表达式 -->
<div data-bind="click: function (data) { myFunction('param1', data) }">...</div>
 
<!-- 对象字面量 (蛇形命名的属性名，需要用引号包裹) -->
<div data-bind="with: {emotion: 'happy', 'facial-expression': 'smile'}">...</div>
```

## 空格
绑定可以包含任意数量的空格（空格、制表符和换行符）。即空格和换行等格式，不会影响代码执行：
```html
<!-- 没有空格 -->
<select data-bind="options:availableCountries,optionsText:'countryName',value:selectedCountry,optionsCaption:'Choose...'"></select>
 
<!-- 空格 -->
<select data-bind="options : availableCountries, optionsText : 'countryName', value : selectedCountry, optionsCaption : 'Choose...'"></select>
 
<!-- 空格加换行 -->
<select data-bind="
    options: availableCountries,
    optionsText: 'countryName',
    value: selectedCountry,
    optionsCaption: 'Choose...'"></select>
```


## 注释
JS 的注释语法，在 KO 中仍然有效
```html
<select data-bind="
    options: availableCountries,  // Only list countries that are available
    optionsText: 'countryName',
    /* optionsValue: 'countryId',
    value: selectedCountry, */    // These two bindings are not processed
    optionsCaption: 'Choose...'"></select>
```

## 跳过绑定值
如果指定的绑定没有值，则 Knockout 将为绑定提供一个未定义的值。例如：
```html
<span data-bind="text">Text that will be cleared when bindings are applied.</span>
```
当与绑定预处理（可以为绑定指定默认值）结合使用时，此功能尤其有用。

# 绑定上下文
绑定上下文是一个对象，它保存了可以从绑定中引用的数据。应用绑定时，Knockout 会自动创建和管理绑定上下文的层次结构。层次结构的根级别指向您通过 ko.applyBindings(viewModel) 绑定的 viewModel。然后，每次使用控制流绑定（如 with 或 foreach）时，都会创建指向嵌套 viewModel 数据的，子绑定上下文。
绑定上下文提供了以下特殊属性，您可以在任何绑定中引用这些属性：

## $parent
这是父上下文中的 viewModel 对象，即当前上下文之外的对象。在根上下文中，这是未定义的。例子：
```html
<h1 data-bind="text: name"></h1>
 
<div data-bind="with: manager">
  <!-- 现在处于嵌套绑定中 -->
  <span data-bind="text: name"></span> is the
  manager of <span data-bind="text: $parent.name"></span>
</div>

<script type="text/javascript">
  function MyViewModel() {
    this.name = '张三'
    this.manager = { name: '李四', age: 36 }
  }

  ko.applyBindings(new MyViewModel());
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_29.png" align="left" />
<div style="clear: both;"></div>

## $parents
这是一个表示所有父级 viewModel 的数组：
\$parents[0] 是父亲上下文中的 viewModel（即，它与 $parent 相同）
\$parents[1] 是祖父上下文中的 viewModel
\$parents[2] 是曾祖父上下文中的 viewModel
\$parents[n] 以此类推...

## $root
这是根上下文中的 viewModel，例如：最顶层的父级上下文，通常是传递给 ko.applyBindings 的对象。
\$root 等价于 \$parents[\$parents.length - 1]

## $component
如果你处在一个特定组件模板的上下文中，\$component 会指向特定组件下的 viewModel。这等同于特定组件下的 \$root。在嵌套组件中，\$component 指向最近的组件。
有时候 \$component 很有用。例如，如果组件的模板包含一个或多个 foreach 块，您希望在遍历中，引用组件的（而不是当前数据项的）viewModel 上的某些属性或函数。

## $data
这是当前上下文中的 viewModel 对象。在根上下文中，\$data 与 \$root 是相同的；在嵌套绑定上下文中，\$data 指向当前数据项（在 with: person 绑定中, \$data 指向 person）。当我们需要使用 viewModel 本身，而非 view Model 下的属性时，\$data 非常有用。
```html
<ul data-bind="foreach: ['cats', 'dogs', 'fish']">
  <li><span data-bind="text: $data"></span></li>
</ul>
```
## $index
仅在 foreach 中可用。
\$index 表达 foreach 中的索引值（从 0 开始），与其他绑定上下文属性不同，\$index 是 observable，并且在项目的索引更改时更新（例如：在数组中添加或移除元素）

## $parentContext
指向父级绑定上下文对象，\$parentContext 与 \$parent 不同，\$parent 指向父级中的数据，而非绑定上下文。例如：如果需要从内部上下文访问外部 foreach 项的索引值，就可以通过 \$parentContext.\$index 实现。
\$parentContext 在根上下文中是没有定义的。

## $rawData
这是当前上下文中的原始 viewModel 值。通常这与 \$data 相同，但是如果提供给 Knockout 的 viewModel 被包装在一个可观察的 viewModel 中，\$data 将是未包装的 viewModel，\$rawData 将是可观察的本身。

## $componentTemplateNodes
如果你处在一个特定组件模板的上下文中，\$componentTemplateNodes 是一个包含传递给该组件的 DOM 节点的数组。这使得构建接收模板的组件变得容易，例如，网格组件接受模板来定义其输出行。[查看完整的例子](https://knockoutjs.com/documentation/component-custom-elements.html#passing-markup-into-components)

## $context
这是指当前绑定上下文对象。如果您希望访问上下文的属性，而这些属性可能也存在于 viewModel 中，或者希望将上下文对象传递给 viewModel 中的助手函数，则 \$context 可能非常有用。

## $element
这是当前绑定的元素 DOM 对象（对于虚拟元素，它将是注释 DOM 对象）。如果绑定需要访问当前元素的属性，那么这将非常有用。例子：
```html
<!-- $element.id 访问的是当前 div 的 id -->
<div id="item1" data-bind="text: $element.id"></div>
```