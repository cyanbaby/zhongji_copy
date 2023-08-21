# 流程控制

## foreach

foreach 主要作用于列表或是表格内数据的动态遍历。

```html
<table>
  <thead>
    <tr>
      <th>First name</th>
      <th>Last name</th>
    </tr>
  </thead>
  <tbody data-bind="foreach: people">
    <tr>
      <td data-bind="text: firstName"></td>
      <td data-bind="text: lastName"></td>
    </tr>
  </tbody>
</table>

<script type="text/javascript">
  var vm = {
    people: [
      { firstName: "Bert", lastName: "Bertington" },
      { firstName: "Charles", lastName: "Charlesforth" },
      { firstName: "Denise", lastName: "Dentiste" },
    ],
  };

  ko.applyBindings(vm);
</script>
```

### 上下文属性

#### $index

\$index 表示当前循环变量的索引值，从 0 开始

#### $data

\$data 表示当前循环变量

循环变量名称，可以通过 as 修改

```html
<ul data-bind="foreach: { data: people, as: 'person' }"></ul>
```

#### $parent

\$parent 可以访问循环之外的内容

```html
<h1 data-bind="text: blogPostTitle"></h1>
<ul data-bind="foreach: likes">
  <li>
    <b data-bind="text: name"></b> likes the blog post
    <b data-bind="text: $parent.blogPostTitle"></b>
  </li>
</ul>
```

### 注释语法

如果我们在元素外部遍历，可以通过注释的形式实现

> <!-- ko foreach: 表达式 --> 内容 <!-- /ko -->

```html
<ul>
  <li class="header">Header item</li>
  <!-- ko foreach: myItems -->
  <li>Item <span data-bind="text: $data"></span></li>
  <!-- /ko -->
</ul>

<script type="text/javascript">
  ko.applyBindings({
    myItems: ["A", "B", "C"],
  });
</script>
```

### 对生成的 DOM 元素进行后期处理或设置动画

当我们需要在生成的 DOM 元素上运行一些自定义的逻辑时，我们可以用到

- afterRender
- afterAdd
- beforeRemove
- beforeMove
- afterMove

## if

if 语句可以根据表达式的结果，来控制元素是否显示

```html
<!-- 例子1 -->
<label
  ><input type="checkbox" data-bind="checked: displayMessage" /> Display
  message</label
>
<div data-bind="if: displayMessage">Here is a message. Astonishing.</div>

<!-- 例子2 -->
<ul data-bind="foreach: planets">
  <li>
    Planet: <b data-bind="text: name"> </b>
    <div data-bind="if: capital">
      Capital: <b data-bind="text: capital.cityName"> </b>
    </div>
  </li>
</ul>

<script type="text/javascript">
  var vm = {
    displayMessage: ko.observable(false),
    planets: [
      { name: "Mercury", capital: null },
      { name: "Earth", capital: { cityName: "Barnsley" } },
    ],
  };

  // vm.people.pop();

  ko.applyBindings(vm);
</script>
```

### 注释语法

如果我们在元素外部遍历，可以通过注释的形式实现

> <!-- ko if: 表达式 --> 内容 <!-- /ko -->

```html
<ul>
  <li>This item always appears</li>
  <!-- ko if: someExpressionGoesHere -->
  <li>I want to make this item present/absent dynamically</li>
  <!-- /ko -->
</ul>
```

### ifnot

ifnot 是 if 的否定判断。以下两种写法等效

```html
<div data-bind="ifnot: someProperty">...</div>

<div data-bind="if: !someProperty()">...</div>
```

## with & using

我们可以使用 with 来重新定义一个上下文绑定。

```html
<h1 data-bind="text: city"></h1>
<!-- 原生方式，通过 coords.latitude 访问 -->
<p>
  Latitude: <span data-bind="text: coords.latitude"> </span>, Longitude:
  <span data-bind="text: coords.longitude"> </span>
</p>

<!-- 使用 with 改变绑定上下文（绑定上下文切换到 coords） -->
<p data-bind="with: coords">
  Latitude: <span data-bind="text: latitude"> </span>, Longitude:
  <span data-bind="text: longitude"> </span>
</p>

<!-- 使用 using 改变绑定上下文（绑定上下文切换到 coords） -->
<p data-bind="using: coords">
  Latitude: <span data-bind="text: latitude"> </span>, Longitude:
  <span data-bind="text: longitude"> </span>
</p>

<script type="text/javascript">
  var vm = {
    city: "London",
    coords: {
      latitude: 51.5001524,
      longitude: -0.1262362,
    },
  };

  ko.applyBindings(vm);
</script>
```

- 主参数
  用作子元素绑定的上下文的对象。这些绑定在处理 null 或 undefined 的方式上有所不同。
  - with：子元素将完全不绑定，而是从文档中删除。
  - using：提供 null 或 undefined 通常是不正确的，因为它将尝试使用该值作为子元素的上下文。
    如果您提供的表达式包含可观察值，当这些可观察值发生变化时，将重新计算表达式。
    这些绑定在绑定值发生变化时的反应不同:
  - with：将清除后代元素，并将标记的新副本添加到文档中，并绑定到新值的上下文中。
  - using：后代元素将保留在文档中，并使用新的上下文值重新评估它们的绑定。
- 其它参数
  - as
    as 选项允许为新上下文对象设置别名。虽然您可以使用$data 上下文变量引用对象，但是使用 as 选项为它提供一个更具描述性的名称，可能会很有用
    这在具有嵌套上下文的场景中特别有用。你需要在层次结构中，用更高一级的方式来指定明确的上下文
  ```html
    <!-- 任何后代绑定都指向 as 后面的 person -->
    <div data-bind="with: currentPerson, as: 'person'"></div>
    ```
  - noChildContext
    as 选项的默认行为是为提供的对象设置一个别名，同时仍然将内容绑定到对象。但是您可能更愿意保持上下文不变，只设置对象的名称。后一种行为可能是 Knockout 未来版本的默认行为。若要打开特定绑定，请将 noChildContext 选项设置为 true。当这个选项与 as 一起使用时，对对象的所有访问，都必须通过给定的名称，并且 $data 将保持设置为外部 viewmodel。

    对于 using 绑定，虽然您可以使用此选项，但使用 let binding 通常会更加高效和可描述。 而不是 using: currentPerson, as: 'person', noChildContext: true, 你要使用 let: { person: currentPerson }.

### 注释语法
<!-- ko with: 表达式 -->内容<!-- /ko -->
```html
<ul>
    <li>Header element</li>
    <!-- ko with: outboundFlight -->
        ...
    <!-- /ko -->
    <!-- ko with: inboundFlight -->
        ...
    <!-- /ko -->
</ul>
```
## let
let 绑定可以设置自定义绑定上下文，然后就可以在所有的后代元素中使用该上下文。
```html
<!-- ko let: {
    inventory: {suppliers: suppliers, bins: bins}, 
    calculatedDisplay: someCalculation
} -->
<div data-bind="foreach: {data: inventory.suppliers, as: 'supplier'}">
    <div data-bind="foreach: {data: inventory.bins, as: 'bin'}">
        <span data-bind="text: calculatedDisplay(supplier, bin)">
    </div>
</div>
<!-- /ko -->

<script type="text/javascript">
    var vm = {
        suppliers: [1, 2, 3],
        bins: ['a', 'b', 'c'],
        someCalculation: function (supplier, bin) {
            /* return some calculated value based on parameters */
            return supplier+bin;
        }
    }
    
    ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_10.png" align="left" />


## component
详情查看：[https://www.yuque.com/whoicliu/knockout/si2mxi](https://www.yuque.com/whoitao/knockout/si2mxi)
