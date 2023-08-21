# 低调事件处理器
在大多数情况下，数据绑定属性，提供了一种简洁明了的方式来绑定到 viewModel。然而，事件处理是一个经常导致，详细数据绑定属性的领域，因为匿名函数是一种典型的，推荐的传参技术。例如：
```html
<a href="#" data-bind="click: function() { viewModel.items.remove($data); }">
    remove
</a>
```
作为替代方案，Knockout 提供了两个助手函数，允许您识别与 DOM 元素关联的数据：
- ko.dataFor(element) - 返回可用于绑定元素的数据
- ko.contextFor(element) - 返回 DOM 元素可用的整个绑定上下文。

这些助手函数可以在事件处理程序中使用，这些事件处理程序使用 jQuery 的 bind 或 click 之类的东西，以低调的方式连接。上述函数可以通过 remove 类附加到每个链接，如：
```js
$(".remove").click(function () {
    viewModel.items.remove(ko.dataFor(this));
});
```
更好的是，这种技术可以用来支持事件委派。jQuery 的 live/delegate/on 函数是实现这一点的简单方法：
```js
$(".container").on("click", ".remove", function() {
    viewModel.items.remove(ko.dataFor(this));
});
```
现在，在更高的级别上附加了一个事件处理程序，并使用 remove 类处理针对任何链接的单击。此方法还具有自动处理其他链接的好处。这些链接动态添加到文档中（可能是添加到 observableArray 的项目的结果）

## 示例 - 嵌套孩子链接
此示例显示了在多个级别的父级和子级上的“添加”和“删除”链接，并为每种类型的链接悄悄地附加了一个处理程序。
```html
<ul id="people" data-bind='template: { name: "personTmpl", foreach: people }'>
</ul>

<script id="personTmpl" type="text/html">
  <li>
    <a class="remove" href="#"> x </a>
    <span data-bind='text: name'></span>
    <a class="add" href="#"> add child </a>
    <ul data-bind='template: { name: "personTmpl", foreach: children }'></ul>
  </li>
</script>

<script type="text/javascript">
  var Person = function(name, children) {
    this.name = ko.observable(name);
    this.children = ko.observableArray(children || []);
  };

  var PeopleModel = function() {
    this.people = ko.observableArray([
      new Person("Bob", [
        new Person("Jan"),
        new Person("Don", [
          new Person("Ted"),
          new Person("Ben", [
            new Person("Joe", [
              new Person("Ali"),
              new Person("Ken")
            ])
          ]),
          new Person("Doug")
        ])
      ]),
      new Person("Ann", [
        new Person("Eve"),
        new Person("Hal")
      ])
    ]);

    this.addChild = function(name, parentArray) {
      parentArray.push(new Person(name));
    };
  };

  ko.applyBindings(new PeopleModel());

  // 添加事件处理器
  $("#people").on("click", ".remove", function() {
    // 获取上下文
    var context = ko.contextFor(this),
        parentArray = context.$parent.people || context.$parent.children;

    // 从其父级上的相应数组 (context.$parent) 中删除数据 (context.$data)
    parentArray.remove(context.$data);

    return false;
  });

  $("#people").on("click", ".add", function() {
    // 获取上下文
    var context = ko.contextFor(this),
        childName = context.$data.name() + " child",
        parentArray = context.$data.people || context.$data.children;

    // 将孩子添加到相应的父节点中, 调用主 viewModel 中的方法 (context.$root)
    context.$root.addChild(childName, parentArray);

    return false;
  });
</script>
```
> 注意：上面的代码用到了 jQuery，所以页面中需要引入 jQuery

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_49.png" align="left" />
<div style="clear: both;"></div>

无论链接的嵌套程度如何，处理程序始终能够识别并操作适当的数据。使用这种技术，我们可以避免将处理程序附加到每个单独链接的开销，并且可以保持标记干净简洁。