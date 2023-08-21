# 支持虚拟元素

## 基本用法
```html
<div data-bind="randomOrder: true">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</div>

<script type="text/javascript">
  ko.bindingHandlers.randomOrder = {
    init: function(elem, valueAccessor) {
      // 将子元素添加到数组中
      var childElems = [];
      while (elem.firstChild) {
        childElems.push(elem.removeChild(elem.firstChild));
      }

      // 随机排序
      while (childElems.length) {
        var randomIndex = Math.floor(Math.random() * childElems.length),
            chosenChild = childElems.splice(randomIndex, 1);
        elem.appendChild(chosenChild[0]);
      }
    }
  };

  var vm = {}

  ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_34.png" align="left" />
<div style="clear: both;"></div>

你可以看到，子元素出现的顺序是随机的。但是，如果你使用虚拟元素语法（注释语法），你会发现不起作用：
```html
<!-- ko randomOrder: true -->
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
<!-- /ko -->
```
想要虚拟元素语法生效，我们需要通过下面的代码，告诉 KO：
```js
ko.virtualElements.allowedBindings.randomOrder = true;
```
添加上上面的代码之后，虽然没有报错，但虚拟元素语法仍然无效。
这是因为我们的 randomOrder 绑定使用的是常规的 DOM API（firstChild, appendChild），这些 DOM API 是不识别虚拟元素的。
这就是为什么 KO 要求显式声明支持虚拟元素的原因：除非您的自定义绑定使用虚拟元素API进行编码，否则它将无法正常工作！
让我们使用 KO 的虚拟元素 API 更新 randomOrder 的代码：
```html
<div data-bind="randomOrder: true">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</div>
<hr >

<!-- ko randomOrder: true -->
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
<!-- /ko -->

<script type="text/javascript">
  // 告知 ko 允许使用虚拟元素语法
  ko.virtualElements.allowedBindings.randomOrder = true;

  // 声明自定义绑定
  ko.bindingHandlers.randomOrder = {
    init: function(elem, valueAccessor) {
      // 构建子元素数组
      var child = ko.virtualElements.firstChild(elem),
          childElems = [];
      while (child) {
        childElems.push(child);
        child = ko.virtualElements.nextSibling(child);
      }

      // 先清空节点，然后再以随机的顺序添加到数组中
      ko.virtualElements.emptyNode(elem);
      while (childElems.length) {
        var randomIndex = Math.floor(Math.random() * childElems.length),
            chosenChild = childElems.splice(randomIndex, 1);
        ko.virtualElements.prepend(elem, chosenChild[0]);
      }
    }
  };

  var vm = {}

  ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_35.png" align="left" />
<div style="clear: both;"></div>

## 虚拟元素 API
Knockout 提供了以下用于处理虚拟元素的函数。
- ko.virtualElements.allowedBindings 
一个对象，其键确定哪些绑定可用于虚拟元素。
设置 ko.virtualElements.allowedBindings.mySuperBinding = true 来允许 mySuperBinding 使用虚拟元素。
- ko.virtualElements.emptyNode(containerElem)
删除真实或虚拟元素 containerElem 中的所有子节点（清除所有关联数据，防止内存泄漏）
- ko.virtualElements.firstChild(containerElem)
返回真实或虚拟元素 containerElem 中的第一个孩子，如果没有孩子则返回 null
- ko.virtualElements.insertAfter(containerElem, nodeToInsert, insertAfter)
向真实或虚拟元素 containerElem 中插入孩子节点 nodeToInsert，insertAfter 后立即定位（insertAfter 必须是 containerElem 的孩子）
- ko.virtualElements.nextSibling(node)
返回 node 的下一个兄弟，如果没有下一个兄弟，返回 null
- ko.virtualElements.prepend(containerElem, nodeToPrepend)
插入到 nodeToPrepend 前面，作为真实或虚拟元素 containerElem 的第一个孩子
- ko.virtualElements.setDomNodeChildren(containerElem, arrayOfNodes)
删除真实或虚拟元素 containerElem 的所有孩子节点（清除所有关联数据，防止内存泄漏）, 然后，插入来自 arrayOfNodes 的所有节点，作为新的孩子