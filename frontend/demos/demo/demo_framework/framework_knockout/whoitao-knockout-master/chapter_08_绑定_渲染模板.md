# 渲染模板


## 目标
模板（template）绑定使用渲染模板的结果，填充相关的 DOM 元素。模板是根据 viewModel 数据构建复杂 UI 结构（可能带有重复块或嵌套块）的一种简单方便的方法。

使用模板有两种主要方式：
- 原生模板是支撑 foreach、if、with 和其他控制流绑定的机制。在内部，这些控制流绑定捕获元素中包含的 HTML 标记，并将其用作模板，以针对任意数据项进行呈现。此功能内置于 KO 中，不需要任何外部库。
- 基于字符串的模板是将 KO 连接到第三方模板引擎的一种方法。KO 将把模型值传递给外部模板引擎，并将生成的标记字符串，注入到文档中。有关使用 jquery 的示例，请参见下文。tmpl 和下划线模板引擎。

主参数
- 语法速记：如果你声明的仅仅是字符串（上个例子），KO 会将其翻译成要渲染模板的 ID 。应用在模板上的数据是你当前模型的对象。
- 更多控件，你可以传带有如下属性的 JavaScript 对象：
  - name（必选项） - 包含渲染模板的元素 ID
  - nodes（可选项）- 直接传递用作模板的 DOM 节点数组。这应该是一个不可观察的数组，请注意，如果元素具有父节点，则将从其当前父节点中删除。如果还为 name 传递了非空值，则忽略此选项。
  - data（可选项） - 需要render到模板的数据。如果你忽略整个参数，KO将查找foreach参数，或者是应用整个view model对象。
  - if - 如果提供了此参数，则仅在指定表达式的计算结果为 true 时，才会渲染模板。这对于防止在填充模板之前，将 null 可观察对象绑定到模板非常有用。
  - foreach（可选项） - 指定KO按照“foreach”模式render模板 – 参考 [注3](https://knockoutjs.com/documentation/template-binding.html#note-2-using-the-foreach-option-with-a-named-template)。
  - afterRender，afterAdd 或 beforeRemove（可选项） — 在foreach模式下使用callback函数。
  - templateOptions（可选项） - 在render模板的时候，传递额外数据以便使用。参考 注6。

## 命名模板
通常, 当您使用控制流绑定 (foreach, with, if 等) 时, 不需要为模板命名: 它们是由 DOM 元素中的标记以隐式和匿名方式定义的。但是, 如果需要, 可以将模板分解为一个单独的元素, 然后按名称引用它们:
```html
<h2>人员</h2>
  <div data-bind="template: { name: 'person-template', data: buyer }"></div>
  <div data-bind="template: { name: 'person-template', data: seller }"></div>
 
  <!-- id 为 person-template 的模板 -->
  <script type="text/html" id="person-template">
    <h3 data-bind="text: name"></h3>
    <p>年龄: <span data-bind="text: age"></span></p>
  </script>
 
  <script type="text/javascript">
     function MyViewModel() {
        this.buyer = { name: '张三', age: 18 };
        this.seller = { name: '李四', age: 36 };
     }

     ko.applyBindings(new MyViewModel());
  </script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_24.png" align="left" />
<div style="clear: both;"></div>

在该示例中 ，person-template 标记被使用两次 ： 分别用于 buyer 和 seller。注意 ， 模板标记包裹在\<script type="text/html"> type="text/html"属性是必需的, 以确保标记不会以 javascript 的形式执行。
通常不需要使用命名模板，但有时它可以帮助最小化标记的重复。

## foreach
```html
<h2>人员</h2>
<div data-bind="template: { name: 'person-template', foreach: people }"></div>

<script type="text/html" id="person-template">
    <h3 data-bind="text: name"></h3>
    <p>年龄: <span data-bind="text: age"></span></p>
</script>

<script>
  function MyViewModel() {
    this.people = [
      { name: '张三', age: 18 },
      { name: '李四', age: 36 }
    ]
  }
  ko.applyBindings(new MyViewModel());
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_25.png" align="left" />
<div style="clear: both;"></div>

使用 foreach，这提供了与直接在每个元素中嵌入匿名模板相同的结果, 即:

```html
<div data-bind="foreach: people">
  <h3 data-bind="text: name"></h3>
  <p>年龄: <span data-bind="text: age"></span></p>
</div>
```

## as 别名
```html
<ul data-bind="template: { name: 'seasonTemplate', foreach: seasons, as: 'season' }"></ul>
 
<script type="text/html" id="seasonTemplate">
  <li>
    <strong data-bind="text: name"></strong>
    <ul data-bind="template: { name: 'monthTemplate', foreach: months, as: 'month' }"></ul>
  </li>
</script>

<script type="text/html" id="monthTemplate">
  <li>
    <span data-bind="text: month"></span>
    属于
    <span data-bind="text: season.name"></span>季
  </li>
</script>

<script>
  var viewModel = {
    seasons: ko.observableArray([
      { name: '春', months: [ '一月', '二月', '三月' ] },
      { name: '夏', months: [ '四月', '五月', '六月' ] },
      { name: '秋', months: [ '七月', '八月', '九月' ] },
      { name: '东', months: [ '十月', '十一月', '十二月' ] }
    ])
  };

  ko.applyBindings(viewModel);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_26.png" align="left" />
<div style="clear: both;"></div>

## afterRender...
afterRender”, “afterAdd”, and “beforeRemove
```html
<div data-bind='template: { name: "personTemplate",
                            data: myData,
                            afterRender: myPostProcessingLogic }'> </div>

<script type="text/javascript">
  viewModel.myPostProcessingLogic = function(elements) {
    // "elements" 是 DOM 节点数组
    // 你可以添加自定义的后续渲染逻辑
  }
</script>
```

## 动态指定模板
有时候，我们可以根据某个属性的值，动态指定模板。
```html
<ul data-bind='template: { name: displayMode, foreach: employees }'> </ul>

<!-- active 模板 -->
<script type="text/html" id="active">
  <li data-bind="style: { color: 'green' } ">
    <strong data-bind="text: name"></strong>
  </li>
</script>

<!-- inactive 模板 -->
<script type="text/html" id="inactive">
  <li data-bind="style: { textDecoration: 'line-through', color: 'gray' } ">
    <span data-bind="text: name"></span>
  </li>
</script>

<script type="text/javascript">
  var vm = {
    employees: ko.observableArray([
      { name: "张三", active: ko.observable(true) },
      { name: "李四", active: ko.observable(false) },
      { name: "王二麻子", active: ko.observable(false) }
    ]),
    displayMode: function(employee) {
      // 动态指定模板
      return employee.active() ? "active" : "inactive";
    }
  };

  // ... then later ...
  vm.employees()[1].active(true); // 修改 active 的状态之，进而模板也会切换

  ko.applyBindings(vm)
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_27.png" align="left" />
<div style="clear: both;"></div>

## 集成第三方模板
### 使用 jQuery.tmpl
默认情况下，Knockout 支持 [jQuery.tmpl](https://www.cnblogs.com/zhuzhiyuan/p/3510175.html)。
jQuery.tmpl 详情查看：[http://github.com/jquery/jquery-tmpl](https://github.com/BorisMoore/jquery-tmpl)

要使用它，您需要按以下顺序引用库：
> 注意：文件引入的顺序不能改
```html
<!-- jQuery -->      <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<!-- jQuery.tmpl --> <script src="jquery.tmpl.js"></script>
<!-- Knockout -->    <script src="knockout-x.y.z.js"></script>
```
然后，你就可以在模板中使用 jQuery.tmpl 的语法了
```html
<h1>People</h1>
<div data-bind="template: 'peopleList'"></div>

<script type="text/html" id="peopleList">
  {{each people}}
    <p>
      <b>${name}</b> is ${age} years old
    </p>
  {{/each}}
</script>

<script type="text/javascript">
  var vm = {
    people: ko.observableArray([
      { name: 'Rod', age: 123 },
      { name: 'Jane', age: 125 },
    ])
  }

  ko.applyBindings(vm);
</script>
```

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_28.png" align="left" />
<div style="clear: both;"></div>

### 使用 Underscore.js 模板
Underscore.js 模板引擎，默认使用 ERB 样式分隔符 (<%= ... %>)，如下示例代码：
```html
<script type="text/html" id="peopleList">
  <% _.each(people(), function(person) { %>
    <li>
      <b><%= person.name %></b> is <%= person.age %> years old
    </li>
  <% }) %>
</script>
```

[在 KO 中集成 Underscore.js 模板](http://jsfiddle.net/rniemeyer/NW5Vn/)，如果你不想使用默认的分割符 <%= ... %>，你还可以自定义。