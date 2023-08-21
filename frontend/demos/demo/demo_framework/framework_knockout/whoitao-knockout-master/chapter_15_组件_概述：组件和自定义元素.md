# 概述：组件和自定义元素
Components 是将 UI 代码组织成自包含的、可重用的块的一种强大而干净的方法。他们：
- …可以表示单个控件/窗口小部件或应用程序的整个部分
- …包含它们自己的视图，并且通常(可选地)包含它们自己的视图模型
- …可以通过AMD或其他模块系统预加载，也可以(按需)异步加载
- …可以接收参数，并选择性地将更改写回参数或调用回调
- …可以组合在一起(嵌套)或从其他组件继承
- …可以轻松打包，以便在项目间重用
- …让您为配置和加载定义自己的约定/逻辑

这种模式对大型应用程序是有益的，因为它通过清晰的组织和封装简化了开发，并根据需要，增量地加载应用程序代码和模板，从而帮助提高运行时性能。

自定义元素是用于消费组件的可选但方便的语法。不需要使用占位符 \<div> 来将绑定注入组件，您可以使用更多带有自定义元素名称的自描述性标记（例如，\<voting-button> or \<product-editor>）。Knockout 会确保 IE 6 等老浏览器兼容。

## 基本语法
ko.components.register(组件名, 选项)，选项中有两个常用内容
- viewModel，指定数据和行为
- template，指定模板
```html
<ul data-bind="foreach: products">
  <li class="product">
    <strong data-bind="text: name"></strong>
    <like-widget params="value: userRating"></like-widget>
  </li>
</ul>

<script type="text/javascript">
  ko.components.register('like-widget', {
    viewModel: function(params) {
      // 数据：null, 'like', 'dislike'
      this.chosenValue = params.value;

      // 行为
      this.like = function() { this.chosenValue('like'); }.bind(this);
      this.dislike = function() { this.chosenValue('dislike'); }.bind(this);
    },
    template:
      '<div class="like-or-dislike" data-bind="visible: !chosenValue()">\
        <button data-bind="click: like">喜欢</button>\
        <button data-bind="click: dislike">不喜欢</button>\
          </div>\
        <div class="result" data-bind="visible: chosenValue">\
        You <strong data-bind="text: chosenValue"></strong> it\
      </div>'
    }
  );

  function Product(name, rating) {
    this.name = name;
    this.userRating = ko.observable(rating || null);
  }

  function MyViewModel() {
    this.products = [
      new Product('西红柿鸡蛋'),
      new Product('小鸡炖蘑菇'),
      new Product('糖醋里脊', 'like') // 标记 'liked'
    ];
  }

  ko.applyBindings(new MyViewModel());
</script>
```

<div style="display: flex;">
  <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_36.png" align="left" />
  <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_37.png" align="left" />
</div>

## 从外部文件加载内容
在大多数应用程序中，您都希望将组件 viewModel 和 template 保存在外部文件中。如果将 Knockout 配置为通过 AMD 模块加载器（如[require.js](http://requirejs.org/)）获取它们。
然后，它们可以预先加载（可能是绑定/缩小），也可以根据需要增量加载。
```js
ko.components.register('like-or-dislike', {
  viewModel: { require: 'files/component-like-widget' },
  template: { require: 'text!files/component-like-widget.html' }
});
```
必要条件
为了让它发挥作用,文件 [files/component-like-widget.js](https://knockoutjs.com//documentation/files/component-like-widget.js) 和[files/component-like-widget.html](https://knockoutjs.com//documentation/files/component-like-widget.html) 必须存在。此外，您还需要引用一个合适的模块加载器库（如 [require.js](http://requirejs.org/)），或者，实现一个知道如何获取文件的自定义组件加载器（[custom component loader](https://knockoutjs.com/documentation/component-loaders.html)）。
