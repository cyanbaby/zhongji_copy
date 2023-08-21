# 文本与外观

## visible & hidden
### 基本用法
```html
<div data-bind="visible: shouldShowMessage">
    You will see this message only when "shouldShowMessage" holds a true value.
</div>
 
<script type="text/javascript">
    var viewModel = {
        shouldShowMessage: ko.observable(true) // Message initially visible
    };
    viewModel.shouldShowMessage(false); // ... now it's hidden
    viewModel.shouldShowMessage(true); // ... now it's visible again
</script>
```
- 主参数
  - 当参数设置为一个假值(例如: bool 型值 false、整型值 0、null 或者 undefined ) 时，
该绑定会设置 yourElement.style.display为none，让元素隐藏。
它的优先级高于任何你在 CSS 中定义的隐藏样式。
  - 当参数设置为一个真值(例如: bool 型值 true、不等于 null、Object 对象或数组) 时，
该绑定会去掉yourElement.style.display值，让元素显示。
注意，任何你在 CSS 中定义的样式会立即应用生效。
- 其他参数
无

### 通过函数或表达式来控制显示或隐藏
```html
<div data-bind="visible: myValues().length > 0">
    You will see this message only when 'myValues' has at least one member.
</div>
 
<script type="text/javascript">
    var viewModel = {
        myValues: ko.observableArray([]) // 初始化数组为空，所以内容隐藏
    };
    viewModel.myValues.push("some value"); // 向数组中添加元素，现在内容显示
</script>
```

## 内容

### text
#### 基本用法
```html
Today's message is: <span data-bind="text: myMessage"></span>
 
<script type="text/javascript">
    var viewModel = {
        myMessage: ko.observable() // Initially blank
    };
    viewModel.myMessage("Hello, world!"); // Text appears
</script>
```
- 主参数
KO 将参数值设置为元素内容。元素之前的内容将会被覆盖。
  - 如果参数是一个 observable 值，text 绑定将会在值变化时，更新元素 text 内容。
  - 如果参数不是 observable 值，text 绑定仅仅会设置元素内容一次，以后不会再更新。
如果你传入的不是一个值，或者一个字符串（比如：你传入一个对象或者数组）
那么显示的文本将是 yourParameter.toString() 的结果。
- 其他参数
None

#### 通过函数和表达式来确定文本内容
```html
The item is <span data-bind="text: priceRating"></span> today.
 
<script type="text/javascript">
    var viewModel = {
        price: ko.observable(24.95)
    };
    viewModel.priceRating = ko.pureComputed(function() {
        return this.price() > 50 ? "expensive" : "affordable";
    }, viewModel);
</script>

<!-- 或者 -->
The item is <span 
                  data-bind="text: price() > 50 ? 'expensive' : 'affordable'"
            ></span> today.
```
#### 关于 HTML 编码
由于 text 绑定是利用元素的 text 节点属性来设置文本值，你可以很安全的设置任何内容, 而不用担心 HTML 和脚本注入风险。例如，如果你输入以下内容：
```js
viewModel.myMessage("<i>Hello, world!</i>");
```

它将不会显示一个斜体文本，而是按原样进行标签输出。

#### 不通过容器元素展示 text
有时候，声明 text 绑定时，不能写外部容器。例如，在 option 元素中是不允许存在其他元素的，所以下面的绑定是**无法正常工作**的。
```html
<select data-bind="foreach: items">
    <option>Item <span data-bind="text: name"></span></option>
</select>
```
这种情况，我们可以通过注释标签来解决
```html
<select data-bind="foreach: items">
    <option>Item <!--ko text: name--><!--/ko--></option>
</select>
```

#### 关于 IE6 的白空格
IE6 有一个奇怪的现象，如果 span 有空格的话，它会变成一个空 span，如果你编写以下代码，KO 不会起任何作用。
```html
Welcome, <span data-bind="text: userName"></span> to our web site.
```
IE6 不会显示 span 中间的那个空格，如果你想避免这个问题，你可以在<span>中输入任意内容。比如：
```html
Welcome, <span data-bind="text: userName">&nbsp;</span> to our web site.
```

### html
#### 基本用法
```html
<div data-bind="html: details"></div>
 
<script type="text/javascript">
    var viewModel = {
        details: ko.observable() // Initially blank
    };
    viewModel.details("<em>For further details, view the report <a href='report.html'>here</a>.</em>"); // HTML content appears
</script>
```
- 主参数
  - KO 设置该参数值到元素的 innerHTML 属性上，元素之前的内容将被覆盖。
如果参数是监控属性 observable 的，那元素的内容将根据参数值的变化而更新，
如果不是，那元素的内容，将只设置一次并且以后不在更新。
如果你传的是不是数字或者字符串（例如一个对象或者数组），
那显示的文本将是 yourParameter.toString() 的等价内容。
- 其它参数
  - 无

#### 关于 HTML 编码
因为该绑定设置元素的 innerHTML，你应该注意不要使用不安全的HTML代码，因为有可能引起脚本注入攻击。

如果你不确信是否安全（比如显示用户输入的内容），那你应该使用 text 绑定，因为这个绑定只是设置元素的 text 值 innerText 和textContent。

## 样式
### class
class 可以用来设置类名称
```html
<!-- 样式类 -->
<div data-bind="class: profitStatus">
    Profit Information
</div>
    
<script type="text/javascript">
    var vm = {
        currentProfit: ko.observable(150000)
    };
    
    // 动态控制样式类
    vm.profitStatus = ko.pureComputed(function() {
            return this.currentProfit() < 0 ? "profitWarning" : "profitPositive";
    }, vm);
    
    // 修改值，导致类名变更
    vm.currentProfit(-50);

    ko.applyBindings(vm);
</script>
```

### css
css 可以用来控制类名称是否显示
```html
<!-- 样式 -->
<div data-bind="css: { profitWarning: currentProfit() < 0 }">
    Profit Information
</div>
    
<script type="text/javascript">
    var vm = {
        currentProfit: ko.observable(150000)
    };
    
    // 修改值，导致类名变更
    vm.currentProfit(-50);

    ko.applyBindings(vm);
</script>
```

 css 可以设置多个类名
 > 例如：通过 isSevere 来控制 majorHighlight 类的显示

```html
<div data-bind="css: { profitWarning: currentProfit() < 0, majorHighlight: isSevere }">
```

而且，可以通过一个变量来控制多个样式类
> 例如：通过 isSevere 来控制 major highlight 这两个类的显示

```html
<div data-bind="css: { profitWarning: currentProfit() < 0, 'major highlight': isSevere }">
```

同时使用 class 和 css
```html
<div data-bind="css: { highlight: isSelected }, class: profitStatus">...</div>
```

**注意：烤串式命名的类（例如：my-class），需要引号包裹**
```html
<!-- 非法，会导致后续代码不执行 -->
<div data-bind="css: { my-class: someValue }">...</div>

<!-- 合法 -->
<div data-bind="css: { 'my-class': someValue }">...</div>
```


### style
style 可以用来设置具体样式。

> 注意：烤串式样式名称需要转成小驼峰（font-size => fontSize），或用引号引起来（font-size => 'fontSize'）
```html
<!-- 基本用法 -->
<div data-bind="style: { color: currentProfit() < 0 ? 'red' : 'black' }">
  基本用法
</div>

<!-- 设置多个样式 -->
<div data-bind="style: { 
                color: currentProfit() < 0 ? 'red' : 'black', 
                fontWeight: isSevere() ? 'bold' : '',
                'font-size': '32px'
                }">
  设置多个样式
</div>

<script type="text/javascript">
  var vm = {
    currentProfit: ko.observable(150000), // 初始值为正数，字体是黑色
    isSevere: ko.observable(true)
  };
  vm.currentProfit(-50); // 内容变成红色

  ko.applyBindings(vm);
</script>
```


## 属性
### attr
attr 绑定提供了一种方式，可以设置 DOM 元素的任何属性值。你可以设置 img 的 src 属性，连接的 href 属性。使用绑定，当模型属性改变的时候，它会自动更新。
```html
<a data-bind="attr: { href: url, title: details, target: ways }">
    百度
</a>
    
<script type="text/javascript">
    var vm = {
        url: ko.observable("https:www.baidu.com"),
        details: ko.observable("百度一下，你就知道了"),
        ways: ko.observable('_blank')
    };
        
    ko.applyBindings(vm);
</script>
```
> 注意：蛇形命名的属性（data-toggle => 'data-toggle'），需要用引号引起来。