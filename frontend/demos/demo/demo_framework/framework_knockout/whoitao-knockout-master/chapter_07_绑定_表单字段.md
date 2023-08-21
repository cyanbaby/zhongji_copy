# 表单字段

## click
基本语法：click: someObject.someFunction
```html
<div>
  购买 <span data-bind="text: number"></span> 件
  <button data-bind="click: increment">+</button>
</div>

<script type="text/javascript">
  var vm = {
    number: ko.observable(0),
    increment: function() {
      var previousCount = this.number();
      this.number(previousCount + 1);
    }
  };

  ko.applyBindings(vm);
</script>
```
click 绑定不仅仅可以绑定 viewModel 中的方法，也可以绑定其他任意的方法。

### 当前项 - $data
在调用 click 绑定的处理函数时，我们可以给它传递一个参数（$data）作为当前项，这种操作往往在处理集合或是数组时非常有用。
```html
<ul data-bind="foreach: people">
  <li>
    <span data-bind="text: $data"></span>
    <button data-bind="click: $parent.removePerson">Remove</button>
  </li>
</ul>

<script type="text/javascript">
  function MyViewModel() {
    var self = this;
    self.people = ko.observableArray(["张三", "李四", "王五"]);
    self.removePerson = function(person) {
      self.people.remove(person);
    };
  }

  ko.applyBindings(new MyViewModel());
</script>
```
注意上例中，关于 $parent 的使用，在使用 foreach 绑定或是 with 绑定时，一定要明确自己能够直接调用的viewModel 属性的范围，如果在更高的层次，则要考虑使用 $parent 或是 $root 这样的前缀。

### 访问 event 对象
在某些时候，我们需要获取与 click 事件相关的 DOM 事件对象，KO 将该事件作为处理函数的第二个参数传入。

> 比如：我们希望在按下 shift 键的 click 与一般的 click 有所区别，则可以利用这一参数在处理函数中进行区分
```html
<button data-bind="click: myFunction">
  Click me
</button>

<script type="text/javascript">
  var vm = {
    // 第二个参数传入 DOM event
    myFunction: function(data, event) {
      if (event.shiftKey) {
        //do something different when user has shift key down
        alert('ShiftKey');
      } else {
        //do normal action
        alert('click');
      }
    }
  };

  ko.applyBindings(vm);
</script>
```
如果我们需要传递更多的参数，有以下两种方式：
```html
<!-- 方法1 -->
<button data-bind="click: function(data, event) { myFunction('param1', 'param2', data, event) }">
    Click me
</button>

<!-- 方法2 -->
<button data-bind="click: myFunction.bind($data, 'param1', 'param2')">
    Click me
</button>
```
### 允许默认的单击操作
在默认情况下，使用 click 绑定，会屏蔽掉原先 click 的默认功能，比如对于一个 a 元素，在使用 click 绑定之后，并不会跳转到 href 所描述的地址。如果我们希望恢复默认的功能，只需要在 click 所绑定的处理函数的最后，返回一个 true 即可。
```html
<div>
  购买 <span data-bind="text: number"></span> 件
  <button data-bind="click: increment">+</button>
  <a href="https://www.baidu.com" data-bind="click: increment">百度</a>
</div>

<script type="text/javascript">
  var vm = {
    number: ko.observable(0),
    increment: function() {
      var previousCount = this.number();
      this.number(previousCount + 1);
      // return true // 返回 true 会执行跳转，不返回，只执行累加
    }
  };

  ko.applyBindings(vm);
</script>
```
### 防止事件冒泡
如下代码，如果我们点击页面上的 button，则会依次触发 function3、function2、function1。为了防止这种现象，我们可以在 data-bind 后附加 clickBubble：false 来阻止 click 事件继续向上传递。
```html
<div data-bind="click: function1">
  <div data-bind="click: function2">
    <button data-bind="click: function3, clickBubble: false">Click me</button>
  </div>
</div>
```

## event
event 绑定主要用于，为指定的事件添加相应的处理函数，可以作用于任意事件，包括 keypress、mouseover、mouseout 等（也包括之前提到的 click，根据后面的描述，click 绑定的内部机理其实就是 event 绑定，不过为何要把两者分开有待研究）。

基本语法：event: { mouseover: someObject.someFunction }

```html
<div>
  <div data-bind="event: { mouseover: enableDetails, mouseout: disableDetails }">
    Mouse over me
  </div>
  <div data-bind="visible: detailsEnabled">
    Details
  </div>
</div>

<script type="text/javascript">
  var vm = {
    detailsEnabled: ko.observable(false),
    enableDetails: function() {
      this.detailsEnabled(true);
    },
    disableDetails: function() {
      this.detailsEnabled(false);
    }
  };

  ko.applyBindings(vm);
</script>
```
event 的参数应当是一个 object，在该 object 中，属性名为指定的事件名称，值为触发的处理函数。该处理函数可以是 viewModel 中定义的函数，也可以是其他任意 object 内的函数。

### 当前项 - $data
```html
<ul data-bind="foreach: places">
  <!-- 显示内容用 text，绑定事件用 event -->
  <li data-bind="text: $data, event: { mouseover: $parent.logMouseOver }"> </li>
</ul>
<p>你感兴趣的是: <span data-bind="text: lastInterest"> </span></p>

<script type="text/javascript">
  function MyViewModel() {
    var self = this;
    self.lastInterest = ko.observable();
    self.places = ko.observableArray(['北京', '青岛', '台北']);

    // 当前项作为参数传入回调函数
    self.logMouseOver = function(place) {
      self.lastInterest(place);
    }
  }

  ko.applyBindings(new MyViewModel());
</script>
```

### 访问 event 事件
在某些时候，我们需要获取与 click 事件相关的 DOM 事件对象，KO 将该事件作为处理函数的第二个参数传入。
```html
<div data-bind="event: { mouseover: myFunction }">
  Mouse over me
</div>

<script type="text/javascript">
  var vm = {
    myFunction: function(data, event) {
      if (event.shiftKey) {
        // 按下 shift 键，然后鼠标滑过
        alert('ShiftKey');
      } else {
        // 普通的鼠标滑过
        alert('mouseover');
      }
    }
  };

  ko.applyBindings(vm);
</script>
```
如果我们需要传递更多的参数，有以下两种方式
```html
<!-- 方法1 -->
<div data-bind="event: { mouseover: function(data, event) { myFunction('param1', 'param2', data, event) } }">
    Mouse over me
</div>

<!-- 方法2 -->
<button data-bind="event: { mouseover: myFunction.bind($data, 'param1', 'param2') }">
    Click me
</button>
```

### 允许默认的单击操作
在默认情况下，使用 event 绑定会屏蔽掉原先 event 所触发的默认功能。如果我们希望恢复默认的功能，只需要在 event 所绑定的处理函数的最后返回一个 true 即可。详情参考 click 绑定

### 防止事件冒泡
为了防止事件冒泡，我们可以在 data-bind 后附加 mouseoverBubble：false 来阻止 mouseover 事件继续向上传递。
```html
<div data-bind="event: { mouseover: myDivHandler }">
  <button data-bind="event: { mouseover: myButtonHandler }, mouseoverBubble: false">
    Click me
  </button>
</div>
```

## submit
在表单上使用 submit 绑定时，KO 将阻止浏览器对该表单的默认提交操作。换句话说，浏览器将调用处理程序函数，而不会将表单提交给服务器。这是一个有用预设，因当您使用 submit 绑定时，您会将表单用作 viewModel 的接口，而不是常规 HTML 表单。如果您确实想让表单像普通 HTML 表单一样提交，只需在提交处理函数返回 true 即可
```html
  <form data-bind="submit: doSomething">
    <input type="text" name="username" placeholder="请输入用户名">
    ... form contents go here ...
    <button type="submit">Submit</button>
  </form>
 
  <script type="text/javascript">
    var vm = {
      doSomething : function(formElement) {
        // formElement 表单元素，用于其他操作，例如表单验证等
        // if ($(formElement).valid()) { /* do something */ }.
        console.log(formElement)
      }
    };

    ko.applyBindings(vm);
  </script>
```

## enable & disable
enable 绑定往往作用于表单元素，比如 input、select 和 textarea 等。包含 enable 绑定的 DOM 元素会依照enable 绑定参数的真假，来决定自己是否可用。
```html
<p>
  <input type="checkbox" data-bind="checked: hasCellphone" />
  我有手机
</p>

<p>
  手机号:
  <input type="text" data-bind="value: cellphoneNumber, enable: hasCellphone" />
</p>

<script type="text/javascript">
  function MyViewModel() {
    var self = this;

    self.cellphoneNumber = "";
    self.hasCellphone = ko.observable(false);
  }

  ko.applyBindings(new MyViewModel());
</script>
```
disable 的用法，可以参考 enable。用法一样，功能相反。

## value
value 绑定一般适用于 input、select、textarea 等表单元素，能够将 viewModel 中的属性和相关联的 DOM 元素的值连接起来。一般情况下，当用户修改 form 域中的值时，KO 会更新相关联的 viewModel 中的属性的值；同样的，当 viewModel 中的属性值发生变化时，KO 也会更新页面中相关联的 form 域内的值。

> 注意：当我们处理 checkboxs 或是 radio buttons 时，我们一般使用 checked 绑定，来读写元素的 checked 状态，而不是使用 value 绑定。

```html
<p>用户名: <input data-bind="value: userName" /></p>
<p>密  码: <input type="password" data-bind="value: password" /></p>

ViewModel:
<pre data-bind="text: ko.toJSON($root, null, 2)"></pre>

<script type="text/javascript">
  var vm = {
    userName: ko.observable('1111111'),
    password: ko.observable("abc"),
  };

  ko.applyBindings(vm);
</script>
```

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_11.png" align="left" />
<div style="clear: both;"></div>

> 如果参数是一个 observable，则绑定会在参数值改变的时候更新元素中的 value，否则，UI 只会设置一次 value 的内容，以后不再更新。

当用户修改 form 域内使用了 value 绑定的元素的 value 时，KO 会相应地更新 viewModel 内被绑定的属性，默认情况下这其实是借由 change 事件触发的，也就是在用户修改了这个值，并转而关注另一个 DOM 节点的时候触发。但是我们也能够借由 valueUpdate 这一参数来通过其他的事件触发更新。常用的参数包括："input", "keyup", "keypress", "afterkeydown" 等。
- valueUpdate
如果绑定还包括一个名为 valueUpdate 的参数，它将定义除 change 事件外的其他的浏览器事件。下列字符串是最常用的选择 ：
  - "change”（默认值） - 当失去焦点的时候更新view model的值，或者是\<select> 元素被选择的时候。
  - "input" - 当 \<input> 或 \<textarea> 元素发生变化时，更改 viewModel 的值。注意 ， 此事件只适用于现代浏览器 （ IE 9 +) 。
  - "keyup" 当用户敲完一个字符以后立即更新 viewModel.
  - "keypress"- 当用户键入时更新 viewModel。与 keyup 不同的是，它会在用户按住键时重复更新
  - "afterkeydown"- 当用户开始输入字符的时候就更新 viewModel。主要通过捕获浏览器的 keydown 事件并异步处理事件来实现。在某些移动浏览器中不能工作
- valueAllowUnset
  - 参见注 2下面。注意 ，valueAllowUnset 仅适用于使用 value 控制选择 \<select> 元件。对其他元素没有影响。

### 立即从输入值更新
如果我们希望绑定\<input type="text">或是\<textarea>以获取 viewModel 的即时更新，textInput 绑定相比于value 绑定会提供更好的支持

### 下拉列表（options）
KO 会为 select 元素提供特殊的支持，value 绑定协同 options 绑定能够让我们读写任意的 javascript 对象，而不仅仅是字符串的值。
```html
  <p>
    国家:
    <select data-bind="options: countries,
                       optionsCaption: '选国家',
                       value: selectedCountry,
                       valueAllowUnset: true"></select>
  </p>
 
  <script type="text/javascript">
    var vm = {
      countries: ['China', 'Japan', 'New Zealand'],
      selectedCountry: ko.observable('China')
    };

    ko.applyBindings(vm);
  </script>
```

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_12.png" align="left" />
<div style="clear: both;"></div>


### 可观察和不可观察属性值
- 双向绑定：如果我们使用 value 绑定的参数是一个 observable，那么 KO 会设定一个双向的绑定，即 form 元素会与 viewModel 属性互相影响；
- 单向绑定：如果参数是一个普通的 viewModel 属性（不是 observable），则 KO 会设定一个单向绑定，即每当用户相应的 viewModel 属性值时，form 表单中的数据会响应改变，反之则不会对 form 元素造成影响；
- 没有绑定：如果参数并不是一个简单的属性，而是一个函数或是比较判断语句，则 KO 只会利用这一语句返回的值来初始化form 元素的 value，之后并不会在两者之间建立联系。

```html
<!-- 双向绑定。文本框填充；同步两种方式。 -->
<p>First value: <input data-bind="value: firstValue" /></p>

<!-- 单向绑定。文本框填充；仅从文本框来同步模型。 -->
<p>Second value: <input data-bind="value: secondValue" /></p>

<!-- 没有绑定。文本框填充，但不应对任何变化。 -->
<p>Third value: <input data-bind="value: secondValue.length > 8" /></p>

ViewModel:
<pre data-bind="text: ko.toJSON($root, null, 2)"></pre>

<script type="text/javascript">
  var vm = {
    firstValue: ko.observable("hello"), // Observable
    secondValue: "hello, again" // Not observable
  };

  ko.applyBindings(vm);
</script>
```

## textInput
textInput 为所有类型的用户输入，提供来自DOM的即时更新，包括 autocomplete, 拖放和剪贴板事件。
- value 绑定的是 change 事件。只有失去焦点时，才触发 ViewModel 的属性更新
- textInput 绑定的是 onInput 事件。每当内容发生更改时，就触发 ViewModel 的属性更新
```html
<p>Login name: <input data-bind="textInput: userName" /></p>
<p>Password: <input type="password" data-bind="textInput: userPassword" /></p>

ViewModel:
<pre data-bind="text: ko.toJSON($root, null, 2)"></pre>

<script type="text/javascript">
  ko.applyBindings({
    userName: ko.observable(""),
    userPassword: ko.observable("abc")
  });
</script>
```

## hasFocus
如果当前文本框获取焦点，则显示一条消息。当然，也可以通过按钮，让文本框获取焦点。

```html
<input data-bind="hasFocus: isSelected" />
<button data-bind="click: setIsSelected">获取焦点</button>
<span data-bind="visible: isSelected">文本框获取焦点</span>

<script>
  var vm = {
    isSelected: ko.observable(false),
    setIsSelected: function() {
      this.isSelected(true);
    }
  };

  ko.applyBindings(vm);
</script>
```

### 点击编辑
这是切换 "编辑" 模式的一种方便方法。
在本例中, ui 要显示\<span>或者\<input>的元素, 取决于模型的编辑属性。
非聚焦的\<input>元素将editing设置为 false, ui 退出 "编辑" 模式。
```html
<p>
  Name: 
  <b data-bind="visible: !editing(), text: name, click: edit">&nbsp;</b>
  <input data-bind="visible: editing, value: name, hasFocus: editing" />
</p>
<p><em>单击姓名编辑，单击空白区域恢复</em></p>

<script type="text/javascript">
  function ViewModel(name) {
    // Data
    this.name = ko.observable(name);
    this.editing = ko.observable(false);

    // Behaviors
    this.edit = function() { this.editing(true) }
  }

  ko.applyBindings(new ViewModel("Bert Bertington"));

</script>
```
<div style="display: flex;">
  <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_13.png" align="left" />
  <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_14.png" align="left" />
</div>


## checked
checked 绑定是关联到 checkable 的 form 表单控件到 viewModel 上。例如 checkbox（\<input type='checkbox'>）或者 radio button（\<input type='radio'>） 。
当用户 check 关联的 form 表单控件的时候，viewModel 对应的值也会自动更新，相反，如果 viewModel 的值改变了，那控件元素的 check/uncheck 状态也会跟着改变。

> 注：对 text box，drop-down list 和所有 non-checkable 的表单控件，用 value 绑定来读取和写入是该元素的值，而不是 checked 绑定。
```html
<p>同意:<input type="checkbox" data-bind="checked:agree" /></p>
    
<script type="text/javascript">
  var vm = {
    agree: ko.observable(true)
  };

  vm.agree(false);

  ko.applyBindings(vm);
</script>
```


### 关联到数组
```html
<p>爱好: <input type="checkbox" data-bind="checked: hobby" /></p>
<div data-bind="visible: hobby">
  请选择您的爱好:
  <div><input type="checkbox" value="music" data-bind="checked: hobbies" /> 音乐</div>
  <div><input type="checkbox" value="shopping" data-bind="checked: hobbies" /> 购物</div>
  <div><input type="checkbox" value="fishing" data-bind="checked: hobbies" /> 钓鱼</div>
</div>

<script type="text/javascript">
  var vm = {
    hobby: ko.observable(true),
    hobbies: ko.observableArray(["music","shopping"]) // 初始化数组
  };
  ko.applyBindings(vm);

  // ... then later ...
  vm.hobby(false);
  vm.hobbies.push("fishing"); // 向数组中添加元素
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_15.png" align="left" />
<div style="clear: both;"></div>

### radio button
```html
<p>性别: <input type="checkbox" data-bind="checked: showGender" /></p>
<div data-bind="visible: showGender">
  <div><input type="radio" name="gender" value="male" data-bind="checked: selectedGender" /> 先生</div>
  <div><input type="radio" name="gender" value="female" data-bind="checked: selectedGender" /> 女士</div>
  <div><input type="radio" name="gender" value="unknown" data-bind="checked: selectedGender" /> 未知</div>
</div>

<script type="text/javascript">
  var vm = {
    showGender: ko.observable(true),
    selectedGender: ko.observable("male") // 初始化默认选中项
  };

  // 后期修改
  // vm.selectedGender("unknown");

  ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_16.png" align="left" />
<div style="clear: both;"></div>

如果参数是监控属性 observable 的，那元素的 checked 状态将根据参数值的变化而更新，如果不是，那元素的 value 值将只设置一次并且以后不在更新。

### checkedValue
如果你的绑定包括 checkedValue ， 这定义了 checked 绑定的值，而不是元素的 value 属性。如果你希望该值不是字符串 （而是整数或对象）, 或者希望动态设置值, 则此功能非常有用。对于通常为布尔值的复选框，此值用于表示选中状态（而不是 true），而未定义用于未选中状态。
在以下示例中 ， 当对应的复选框选中时，对象本身 (不是 itemName 字符串中) 将会包含在 chosenItems 中
```html
<!-- ko foreach: items -->
<input type="checkbox"
       data-bind="checkedValue: $data, checked: $root.chosenItems"
       />
<span data-bind="text: itemName"></span>
<!-- /ko -->

<script type="text/javascript">
  var vm = {
    items: ko.observableArray([
      { itemName: "Choice 1" },
      { itemName: "Choice 2" }
    ]),
    chosenItems: ko.observableArray()
  };

  ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_16_002.png" align="left" />
<div style="clear: both;"></div>

如果选中 value 参数是一个可观察值, 则每当值发生更改且当前检查元素时, 绑定都将更新选中的模型属性。对于复选框, 它将从数组中删除旧值并添加新值。对于单选按钮, 它将只更新模型值。


## options
options 绑定控制什么样的options在drop-down列表里（例如：<select>）或者 multi-select 列表里 （例如：<select size='6'>）显示。此绑定不能用于<select>之外的元素。关联的数据应是数组（或者是 observable 数组），<select>会遍历显示数组里的所有的项。
对于 multi-select 列表，设置或者获取选择的多项需要使用 selectedOptions 绑定。
对于 single-select 列表，你也可以使用 value 绑定读取或者设置元素的 selected 项。
```html
<p>目的地: <select data-bind="options: availableCountries"></select></p>

<script type="text/javascript">
  var vm = {        
    availableCountries: ko.observableArray(['中国', '法国', '德国'])  
  };
  ko.applyBindings(vm);

  vm.availableCountries.push('美国');
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_17.png" align="left" />
<div style="clear: both;"></div>
该参数是一个数组（或者observable数组）。对每个item，KO 都会将它作为一个<option> 添加到<select>里，之前的 options 都将被删除。
如果参数是一个 string 数组，那你不需要再声明任何其它参数。<select>元素会将每个 string 显示为一个 option。不过，如果你让用户选择的是一个 JavaScript 对象数组（不仅仅是 string），那就需要设置 optionsText 和 optionsValue 这两个参数了。
如果参数是监控属性 observable 的，那元素的 options 项将根据参数值的变化而更新，如果不是，那元素的 value 值将只设置一次并且以后不在更新。

### 下拉列表是对象（不是字符串）
```html
<p>
  <select data-bind="options: availableCountries,
                     optionsText: 'countryName',
                     value: selectedCountry,
                     optionsCaption: '选择国家...'"></select>
</p>

<div data-bind="visible: selectedCountry">
  <!-- 选择国家后显示 -->
  <span data-bind="text: selectedCountry() ? selectedCountry().countryName : 'unknown'"></span>的人口：
  <span data-bind="text: selectedCountry() ? selectedCountry().countryPopulation : 'unknown'"></span>.
</div>

<script type="text/javascript">
  // 对象构造器中包含两个属性
  var Country = function (name, population) {
    this.countryName = name;
    this.countryPopulation = population;
  };

  var vm = {
    availableCountries: ko.observableArray([
      new Country("英国", 65000000),
      new Country("美国", 320000000),
      new Country("瑞典", 29000000)
    ]),
    selectedCountry: ko.observable() // 默认不选中
  };

  ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_18.png" align="left" />
<div style="clear: both;"></div>
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_19.png" align="left" />
<div style="clear: both;"></div>
选择之后的代码结构

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_20.png" align="left" />
<div style="clear: both;"></div>

### 通过回调函数展示选项
```html
<select data-bind="options: availableCountries,
                   optionsText: function(item) {
                     return item.countryName + ' (人口: ' + item.countryPopulation + ')'
                   },
                   value: selectedCountry,
                   optionsCaption: 'Choose...'"></select>

```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_21.png" align="left" />
<div style="clear: both;"></div>

### 其他参数
**optionsText**
如果列表项是 JavaScript 对象（不仅仅是字符串），此时，你需要设置对象的属性，作为 drop-down 或 multi-select 的显示文本。（即，optionsText 将对象的属性名作为选项的显示文本）。另外，optionsText 后面可以跟回调函数，然后在函数中设置展示文本。
**optionsValue**
和 optionsText 类似, 你也可以通过 optionsValue 来声明对象的属性值作为该<option>的 value 值。
**selectedOptions**
对于 multi-select 列表，你可以用 selectedOptions 读取和设置多个选择项。请参考： selectedOptions 绑定。
**optionsCaption**
有时候，默认情况下，不想选择任何 option 项。但是单选列表由于每次都需要一个默认选项，怎么避免这个问题呢？常用的方案是加一个“请选择...”的提示语，optionsCaption 可以指定默认选项的名称
```html
<select data-bind='options: myOptions, 
                   optionsCaption: "请选择...", 
                   value: myChosenValue'></select>
```
KO 会在所有选项上加上这一个项，并且设置 value 值为 undefined。所以，如果 myChosenValue 被设置为undefined（默认是 observable 的），那么上述的第一个项就会被选中。
**optionsIncludeDestroyed**
有时，您可能希望将数组项标记为已删除，但实际上不会丢失其存在的记录。这称为非破坏性删除。默认情况下，选项绑定将跳过（即隐藏）标记为已销毁的任何数组项。如果要显示已销毁的条目，请指定以下附加参数
```html
<select data-bind='options: myOptions, optionsIncludeDestroyed: true'></select> 
```
**optionsAfterRender**
如果需要在生成的选项元素上，运行一些进一步的自定义逻辑。则可以使用 optionsAfterRender 回调。
```html
  <select size=3 data-bind="
    options: myItems,
    optionsText: 'name',
    optionsValue: 'id',
    optionsAfterRender: setOptionDisable">
  </select>
 
  <script type="text/javascript">
    var vm = {
      myItems: [
        { name: 'Item 1', id: 1, disable: ko.observable(false)},
        { name: 'Item 3', id: 3, disable: ko.observable(true)},
        { name: 'Item 4', id: 4, disable: ko.observable(false)}
      ],
      setOptionDisable: function(option, item) {
        ko.applyBindingsToNode(option, {disable: item.disable}, item);
      }
    };

    ko.applyBindings(vm);
  </script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_22.png" align="left" />
<div style="clear: both;"></div>

渲染完成后，在通过 setOptionsDisable 来设置选项是否可选，可以看到 item 3 的 disable 为 true。
**valueAllowUnset**
如果您希望 knockout 允许您的模型属性，获取在您的\<select>元素 (并通过使\<select>元素空白)

### selectedOptions
selectedOptions 用于指定多选列表中，已经选中的元素，用在使用options绑定的\<select>元素上。
当用户在多选列表选择或取消一个项时，会将 viewModel 的数组进行相应的添加或者删除。同样，如果 viewModel 上的这个数组是 observable 的话，你添加或者删除任何 item（通过push或者splice）时，相应的 UI 界面里的 option 项也会被选择上或者反选。即所谓的双向绑定
```html
<p>
  目的地:
  <select data-bind="options: availableCountries, selectedOptions: chosenCountries" 
          size="5" 
          multiple="true"></select>
</p>

<script type="text/javascript">
  var vm = {
    availableCountries: ko.observableArray(['中国', '德国', '美国']),
    chosenCountries: ko.observableArray(['中国']) // 默认选中中国
  };

  // ... then later ...
  vm.chosenCountries.push('德国'); // 然后选中德国

  ko.applyBindings(vm);
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_23.png" align="left" />
<div style="clear: both;"></div>

## uniqueName
uniqueName 绑定确保关联的 DOM 元素具有非空 name 属性。如果 DOM 元素没有 name 属性，则此绑定将为其提供一个，并将其设置为某个唯一的字符串值。
- 在使用 KO 的时候，一些技术可能依赖于某些元素的 name 属性，尽管他们没有什么意义。例如，jQuery Validation 验证当前只验证有 name 属性的元素。为配合 Knockout UI 使用，有些时候需要使用 uniqueName 绑定避免让 jQuery Validation 验证出错。
- IE 6下，如果 radio button 没有 name 属性是不能被 checked 的。大多数情况下，这是不相关的，因为您的具有名称属性的单选按钮元素，将放入互斥组中。不过，如果你没声明，KO 内部会在这些元素上使用 uniqueName ，以确保他们可以被 checked。
```html
<input data-bind="value: someModelProperty, uniqueName: true" />
```
就像上面的例子一样，传入 true（或者可以转成 true 的值）以启用 uniqueName 绑定。