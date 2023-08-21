# 控制后代绑定
> 这是一种高级技术，通常仅在创建可重用绑定库时使用。在使用 Knockout 构建应用程序时，通常不需要这样做。

默认情况下，绑定只影响应用当前绑定的元素。但是，如果您也想影响所有的后代元素，该怎么办？这是可能的。您的绑定可以告诉 Knockout 不绑定后代，然后，您的自定义绑定可以以不同的方式绑定它们。
要实现后代绑定，你需要在自定义绑定的 init 方法中，添加 { controlsDescendantBindings: true }

## 使用应用后代绑定
一个非常简单的示例，这里有一个名为 allowBindings 的自定义绑定，它只允许在其值为 true 时应用后代绑定。如果该值为 false，则 allowBindings 告诉 Knockout 负责后代绑定，因此它们不会像往常一样绑定。
```html
<div data-bind="allowBindings: true">
  <!-- 绑定为 true，显示 Replacement 1，不显示 Original 1 -->
  <div data-bind="text: 'Replacement 1'">Original 1</div>
</div>

<div data-bind="allowBindings: false">
  <!-- 绑定为 false 不显示 Replacement 2，而显示 Original 2 -->
  <div data-bind="text: 'Replacement 2'">Original 2</div>
</div>

<script type="text/javascript">
  ko.bindingHandlers.allowBindings = {
    init: function(elem, valueAccessor) {
      // value 是 false 时，使用后代绑定
      var shouldAllowBindings = ko.unwrap(valueAccessor());
      return { controlsDescendantBindings: !shouldAllowBindings };
    }
  };

  var vm = {}

  ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_32.png" align="left" />
<div style="clear: both;"></div>

## 给后代绑定提供额外的值
通常，使用 controlsDescentBindings 的绑定会调用 ko.applyBindingsToDescients(someBindingContext，element) 来对某些修改的绑定上下文，应用后代绑定。例如，您可以有一个名为 withProperties 的绑定，该绑定将一些额外的属性附加到绑定上下文，然后所有后代绑定都可以使用这些属性：
```html
<div data-bind="withProperties: { emotion: 'happy' }">
  Today I feel <span data-bind="text: emotion"></span>. <!-- 显示: happy -->
</div>
<div data-bind="withProperties: { emotion: 'whimsical' }">
  Today I feel <span data-bind="text: emotion"></span>. <!-- 显示: whimsical -->
</div>

<script type="text/javascript">
  ko.bindingHandlers.withProperties = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      // 创建一个具有额外属性的修改绑定上下文，并将其应用于后代元素
      var innerBindingContext = bindingContext.extend(valueAccessor);
      ko.applyBindingsToDescendants(innerBindingContext, element);

      // 还要告诉 KO *不要* 绑定后代本身，否则它们将被绑定两次
      return { controlsDescendantBindings: true };
    }
  };

  var vm = {}

  ko.applyBindings(vm);
</script>
```

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_32_002.png" align="left" />
<div style="clear: both;"></div>

正如您所看到的，绑定上下文有一个 extend 函数，它生成具有额外属性的克隆。extend 函数接受一个需要复制0的，带有属性的对象，或者返回该对象的函数。函数语法是首选的，以便将来绑定值的更改，总是在绑定上下文中更新。这个过程不会影响原始绑定上下文，因此不会影响同级元素 - 它只会影响后代。


## 在绑定上下文层次结构中添加额外级别
with 和 foreach 等绑定会在绑定上下文层次结构中创建额外的级别。这意味着它们的后代可以通过使用 $parent、$parents、$root 或 $parentContext 在外部级别访问数据。
如果你想在自定义绑定中，实现这一功能，不要用  bindingContext.extend()，而是用 bindingContext.createChildContext(someData)。
这将返回一个新的绑定上下文，它的 viewModel 是 someData，$parentContext 是 bindingContext 。
如果你愿意，你还可以通过 ko.utils.extend 来创建带有额外属性的子上下文。例如：
```html
<div data-bind="withProperties: { displayMode: 'twoColumn' }">
  外部的显示方式是 <span data-bind="text: displayMode"></span>.
  <div data-bind="withProperties: { displayMode: 'doubleWidth' }">
    内部的显示方式是 <span data-bind="text: displayMode"></span>, 
    仍然能访问外部的显示方式 <span data-bind="text: $parentContext.displayMode"></span>.
  </div>
</div>

<script type="text/javascript">
  ko.bindingHandlers.withProperties = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      // 创建一个具有额外属性的修改绑定上下文，并将其应用于后代元素
      var childBindingContext = bindingContext.createChildContext(
        bindingContext.$rawData, 
        null, // 可选, 在此传递一个字符串作为后代上下文中数据项的别名
        function(context) {
          ko.utils.extend(context, valueAccessor());
        });
      ko.applyBindingsToDescendants(childBindingContext, element);

      // 还要告诉 KO *不要* 绑定后代本身，否则它们将被绑定两次
      return { controlsDescendantBindings: true };
    }
  };

  var vm = {}

  ko.applyBindings(vm);
</script>
```

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_33.png" align="left" />
<div style="clear: both;"></div>

此更新的 withProperties 绑定现在可以嵌套使用，每个嵌套级别都可以通过 \$parentContext 访问父级别。通过修改绑定上下文和控制后代绑定，您拥有一个强大而高级的工具，来创建自己的自定义绑定机制。
