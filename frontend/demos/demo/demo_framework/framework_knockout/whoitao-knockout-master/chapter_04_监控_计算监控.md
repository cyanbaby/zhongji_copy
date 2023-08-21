# 计算监控

## 使用计算监控
### 基本用法
如果您有一个用于 firstName 的 observable 对象，和一个用于 lastName 的可观察对象，并且您想显示全名，该怎么办？这就是计算监控的用武之地 - 这些函数依赖于一个或多个其他监控，并且当这些依赖关系中的任何一个发生变化时，都会自动更新。例如，给定以下 viewModel
```js
function AppViewModel() {
  this.firstName = ko.observable('Bob');
  this.lastName = ko.observable('Smith');
}
```
您可以添加一个 computed observable 来返回全名:
```js
function AppViewModel() {
  // ... 让 firstName 和 lastName 不变 ...

  this.fullName = ko.computed(function() {
    return this.firstName() + " " + this.lastName();
  }, this);
}
```
现在您可以将UI元素绑定到它，例如：
```js
The name is <span data-bind="text: fullName"></span>
```
当 firstName 或 lastName 发生更改时，fullName 将被更新（每当其依赖项发生更改时，您的计算函数将被调用一次，并且您返回的任何值都将传递给观察者，如 UI 元素或其他计算的观察者）。

### 依赖链是有效的
当然，如果您愿意，您可以创建整个 computed observables 链。例如，你可能有:
- 表示一组 items 的 observable 的称为项的 items
- 另一个 observable 称为 selectedIndexes，它存储用户选择的项索引
- 一个名为 selectedItems 的 computed observable，返回与所选索引对应的项对象数组
- 另一个 computed observable，返回 true 或 false，这取决于 selectedItems 是否具有某些属性(如 new 或unsaved)。一些 UI 元素，比如按钮，可能会基于这个值启用或禁用。

对 items 或 selectedIndexes 的更改将波及 computed observables 链，而 computed observables 链，又将更新绑定到它们的任何 UI 元素。

### 管理 this
ko.computed 的第二个参数（我们在上面的例子中我们传递 this 的位置）在计算 computed observable 时定义了 this 值。
如果不传递它，就不可能指向 this.firstName() 或 this.lastName()。
经验丰富的 JavaScript 程序员会认为这是显而易见的，但如果您仍然在学习 JavaScript，这可能看起来很奇怪。

**一种简化事物的流行惯例**

也有一种通用的简化方式，即将 this 在构造函数一开始就赋给另一个变量，这样在之后需要用到 this 的部分即可以通过调用另一个变量来实现：
```js
function MyViewModel() {
  var self = this;

  self.firstName = ko.observable("Chiaki");
  self.lastName = ko.observable("Izumi");
  self.fullName = ko.computed(function() {
    return self.firstName()+ " " + self.lastName();
  });
}
```

### 纯计算监控
如果 computed observable 只是基于一些 observable 的简单计算的话（其求值器不直接修改其他对象或状态），使用 pureComputed 会比 computed 更好，如下：
```js
self.fullName = ko.pureComputed(function() {
  return self.firstName()+ " " + self.lastName();
})
```
### notify
我们也可以对 computed 或是 pureComputed 进行强制订阅，如下：

当 computed observable 返回一个基本值（数字、字符串、布尔值或 null）时，通常只有当值实际更改时，才会通知可观察对象的依赖关系。
```js
this.fullName = ko.pureComputed(function() {
	return this.firstName() + " " + this.lastName();
}, this).extend({notify: "always"});
```
### rateLimit
同样的，可以通过调用 extend 方法中的 rateLimit 属性来指定响应的延时。
```js
// 50 毫秒响应一次，防止数据更新时，响应过于频繁
myViewModel.fullName.extend({ rateLimit: 50 });
```
### isComputed
在某些时候，我们可能需要判定某个变量到底是不是计算属性，这时可以用到 ko.isComputed 来进行判断。
```js
for (var prop in myObject) {
    if (myObject.hasOwnProperty(prop) && !ko.isComputed(myObject[prop])) {
        result[prop] = myObject[prop];
    }
}
```
类似的方法还包括 isObservable，isWritableObservable 等，其中
- isObservable 对于 observables、observable arrays、computed observables 均会返回 true；
- isWritableObservable 对于 observables、observable arrays、writable computed observables 均会返回true，这部分可以留作以后研究。

### 当计算监控属性仅在 UI 中使用时
当我们只需要在 UI 中使用计算属性时，我们可以将计算属性声明为普通函数。例如
```js
function AppViewModel() {
    // ... leave firstName and lastName unchanged ...
 
    this.fullName = function() {
        return this.firstName() + " " + this.lastName();
    };
}
```
然后 UI 中展示
```html
The name is <span data-bind="text: fullName()"></span>
```

## 可写的计算监控
初学者可能希望跳过这一节 - 可写的计算监控属性是相当高级的，在大多数情况下是不必要的。
通常，**computed observable 的值是从其他 observable 属性中计算出来的，**因此是只读的。但是，看起来令人惊讶的是，计算出的属性，可以是可写的。您只需要提供您自己的回调函数，该函数可以对编写的值执行一些合理的操作。
你可以像使用普通 observable 一样使用 computed observable，使用您自己的自定义逻辑，拦截所有读写操作。你可在模型对象上，通过链式写法，将数据写入多个 observable 或 computed observable 属性。例如：
```js
myViewModel.fullName('Joe Smith').age(50)
```

可写的计算监控是一个功能强大的特性，具有广泛的用途。

### 示例1：分解用户的输入
回到经典的“first name + last name = full name” 例子中，您可以将事情转回到前面：使 fullName 计算监控可写，这样用户就可以直接编辑全名，它们提供的值将被解析，并映射回底层的 firstName 和 lastName 监控。在本例中，write 回调通过将传入文本拆分为“firstName”和“lastName”组件，来处理输入内容，并将这些值写回底层的监控。
```html
<div>First name: <span data-bind="text: firstName"></span></div>
<div>Last name: <span data-bind="text: lastName"></span></div>
<div class="heading">Hello, <input data-bind="textInput: fullName"/></div>

<script type="text/javascript">
  function MyViewModel() {
    this.firstName = ko.observable('Planet');
    this.lastName = ko.observable('Earth');

    this.fullName = ko.pureComputed({
      read: function () {
        return this.firstName() + " " + this.lastName();
      },
      write: function (value) {
        var lastSpacePos = value.lastIndexOf(" ");
        if (lastSpacePos > 0) { // 忽略没有空格分隔的字符
          this.firstName(value.substring(0, lastSpacePos)); // 更新 "firstName"
          this.lastName(value.substring(lastSpacePos + 1)); // 更新 "lastName"
        }
      },
      owner: this
    });
  }

  ko.applyBindings(new MyViewModel());
</script>
```

<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_01_first_last_name.png" align="left" />

<div style="clear: both;"></div>

这里的 firstName 和 lastName 是不能编辑的，但是全名是可以编辑的。
上面的 viewModel 演示的是通过一个简单的参数，来初始化计算监控属性。你可以给下面的属性传入任何JavaScript 对象：
- read（必选），一个获取依赖监控属性当前值的函数。
- write（可选），如果声明将使你的依赖监控属性可写，通过自定义逻辑将值再写入各个基础的监控属性上。
- owner（可选），如果声明，它就是 KO 调用 read 或 write 的回调时用到的 this。

### 示例2：全选/反选
当向用户显示一个可选择列表时，包含一个选择或取消选择所有项的方法通常很有用。这可以非常直观地用一个布尔值表示，该值表示是否选择了所有项。当设置为 true，它将选择所有项目，当设置为 false，它将取消选择他们。

```html
<div>
  <input type="checkbox" data-bind="checked: selectedAllProduce" title="Select all/none"/> 商品
</div>
<hr />
<div id="listLabel" data-bind="foreach: produce">
  <label>
    <input type="checkbox" data-bind="checkedValue: $data, checked: $parent.selectedProduce"/>
    <span data-bind="text: $data"></span>
  </label>
</div>

<script type="text/javascript">
  function MyViewModel() {
    this.produce = [ 'Apple', 'Banana', 'Celery', 'Corn', 'Orange', 'Spinach' ];
    this.selectedProduce = ko.observableArray([ 'Corn', 'Orange' ]);
    this.selectedAllProduce = ko.pureComputed({
      read: function () {
        // 比较长度是快捷且安全的方式
        return this.selectedProduce().length === this.produce.length;
      },
      write: function (value) {
        // value 为 true 表示全选；value 为 false 表示反选
        this.selectedProduce(value ? this.produce.slice(0) : []);
      },
      owner: this
    });
  }

  ko.applyBindings(new MyViewModel());
</script>
```

<div style="display: flex;">
  <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_02_checkbox_00.png" align="left" />
  <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_02_checkbox.png" align="left" />
</div>

### 示例3：value 转换器
有时候你可能需要显示一些不同格式的数据，从基础的数据转化成显示格式。比如，你存储价格为 float 类型，但是允许用户编辑的字段，需要支持货币单位和小数点。你可以用可写的计算监控属性来实现，然后解析传入的数据到基本 float 类型里：
```html
<div>价格: <input data-bind="value: formattedPrice"/></div>
<div>(原始数据: <span data-bind="text: price"></span>)</div>

<script type="text/javascript">
  function MyViewModel() {
    this.price = ko.observable(25.99);

    this.formattedPrice = ko.pureComputed({
      read: function () {
        return '￥' + this.price().toFixed(2);
      },
      write: function (value) {
        // 去掉不想要的字符, 解析成浮点数, 然后将数据写回底层的 "price" observable
        value = parseFloat(value.replace(/[^\.\d]/g, ""));
        this.price(isNaN(value) ? 0 : value); // 写入底层存储
      },
      owner: this
    });
  }

  ko.applyBindings(new MyViewModel());
</script>
```
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_03_price.png" align="left" />

现在，无论用户何时输入新价格，文本框都会更新，以显示货币符号和两位小数的格式，无论他们以何种格式输入值。这提供了一个很好的用户体验，因为用户可以看到，软件是如何将数据输入理解为价格的。他们知道他们不能输入超过两个小数位，因为如果他们尝试输入，额外的小数位将被删除。类似地，它们不能输入负值，因为 write 回调去掉了负号。

### 示例4：过滤并验证用户输入
例1展示的是，可写计算监控如何高效地过滤输入数据，如果你写的值不符合条件的话，将不会被写入底层监控，它忽略所有不包括空格的全名。

再多走一步，你可以声明一个监控属性 isValid 来表示最后一次写入是否合法，然后根据真假值显示相应的提示信息。这是一个比较简单的验证功能，稍后仔细介绍，先参考如下代码：

```html
<div>输入数字: <input data-bind="textInput: attemptedValue"/></div>
<div class="error" data-bind="visible: !lastInputWasValid()">数字非法!</div>
<div>(合法的值): <span data-bind="text: acceptedNumericValue"></span>)</div>

<script type="text/javascript">
  function MyViewModel() {
    this.acceptedNumericValue = ko.observable(123);
    this.lastInputWasValid = ko.observable(true);

    this.attemptedValue = ko.pureComputed({
      read: this.acceptedNumericValue,
      write: function (value) {
        if (isNaN(value))
          this.lastInputWasValid(false);
        else {
          this.lastInputWasValid(true);
          this.acceptedNumericValue(value); // 写入底层存储
        }
      },
      owner: this
    });
  }

  ko.applyBindings(new MyViewModel());
</script>
```
<div style="display: flex;">
  <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_04.png" align="left" />
  <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_05.png" align="left" />
</div>

现在，acceptedNumericValue 将只接受数字，其它任何输入的值，都会触发显示验证信息，而会更新acceptedNumericValue。
> 备注：上面的例子显得杀伤力太强了，更简单的方式是在\<input\>上使用 jQuery Validation 和 number class。Knockout 可以和 jQuery Validation 一起很好的使用，参考例子：[grid editor](https://knockoutjs.com/examples/gridEditor.html) 。当然，上面的例子依然展示了一个如何使用自定义逻辑进行过滤和验证数据，如果验证很复杂而 jQuery Validation 很难使用的话，你就可以用 knockout。

## 依赖跟踪如何工作的
新手没必要知道太清楚，但是高级开发人员，可能需要知道为什么依赖监控属性能够自动跟踪，并且自动更新 UI，事实上，非常简单，甚至说可爱。跟踪的逻辑是这样的：
1. 当你声明一个计算监控属性的时候，KO 会立即调用执行函数并且获取初始化值
2. 当你的执行函数运行的时候，KO 会把所有需要依赖的依赖属性（或者监控依赖属性）都记录到一个 Log 列表里。
3. 执行函数结束以后，KO 会向所有 Log 里需要依赖到的对象进行订阅。订阅的 callback 函数是重新运行你的执行函数。然后回头重新执行上面的第一步操作（并且注销不再使用的订阅）。
4. 最后 KO 会通知上游所有订阅它的订阅者，告诉它们我已经设置了新值。

所以，KO 不仅仅是在第一次执行函数运行的时候探测你的依赖项，每次它都会探测。举例来说，你的依赖属性可以是动态的：依赖属性 A 可以检测计算监控是否依赖属性 B 或者 C，这时候只有当 A 或者你当前的选择 B 或者 C改变的时候，执行函数才重新执行。你不需要显式声明依赖：它们是在运行时根据代码的执行情况确定的。如果 evaluator 不访问任何 obsevable，则计算出的 obsevable 将没有依赖关系，并且永远不需要再次调用 evaluator 函数。在这种情况下，为了节省资源，计算监控将被自动“释放”
另一个巧妙的技巧是：将声明性绑定简单地实现为计算监控（computed observable）。因此，如果一个绑定读取一个 observable 的值，那么该绑定将依赖于该 observable 的值，这将导致在 observable 的值发生变化时重新评估该绑定。
纯计算监控的工作方式略有不同。有关更多详细信息，请参阅下方纯计算监控的文档

### 通过 peek 来控制依赖
通常 Knockout 的自动依赖项跟踪正是您想要的。但有时您可能需要控制哪些监控将更新您的计算监控，特别是当计算监控执行某种操作时，例如发出 Ajax 请求。peek 函数允许您访问监控或计算监控，而无需创建依赖项。
在下面的示例中，计算监控使用 Ajax 来重新为一个叫做 currentPageData 的监控加载数据，其中 params 包含两个监控的数据。当 pageIndex 发生变化时，计算监控会更新，也就是会运行 getJSON 请求，但它会忽略 selectedItem 的变化， 因为它是通过 peek 来访问的。在这种情况下，当一系列新的数据加载的时候，用户可能希望为了追踪的目的只使用 selectedItem 的当前值 。
```js
ko.computed(function() {
  var params = {
    page: this.pageIndex(),
    selected: this.selectedItem.peek()
  };
  $.getJSON('/Some/Json/Service', params, this.currentPageData);
}, this);
```
### 在计算中忽略依赖
ko.ignoreDependencies 函数可用于这样的场景：希望在计算中执行代码，但不希望代码影响计算的依赖。这在自定义绑定时会很有用。例如：当您想调用可能访问 observable 的代码，但又不希望重新触发，基于对这些 observable 的绑定时。
```js
ko.ignoreDependencies( callback, callbackTarget, callbackArgs );
```
示例
```js
ko.bindingHandlers.myBinding = {
  update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    var options = ko.unwrap(valueAccessor());
    var value = ko.unwrap(options.value);
    var afterUpdateHandler = options.afterUpdate;

    // 开发者提供了，绑定更新时需要调用的函数，
    // 但是我们不想跟踪任何（可能重新触发绑定）的依赖
    if (typeof afterUpdateHandler === "function") {
      ko.ignoreDependencies(afterUpdateHandler, viewModel, [value, color]);
    }

    $(element).somePlugin("value", value);
  }
}
```
### 注意：为什么循环依赖关系没有意义
计算监控被认为是将一组可观测的输入，映射成一个可观测的输出。因此，在依赖链中包含循环是没有意义的。循环不会类似于递归；它们类似于有两个电子表格单元格，它们作为彼此的函数进行计算。这将导致一个无限的评估循环。

那么，如果依赖关系图中有一个循环，那么 Knockout 会做什么呢？它通过强制执行以下规则来避免无限循环：当该对象正在评估时，Knockout 将不会重新开始对已计算对象的评估。这不太可能影响您的代码。这在两种情况下是相关的：当两个计算监控相互依赖时（仅当一个或两个使用 deferEvaluation 选项时才可能），或者当一个计算监控写入另一个它具有依赖关系的 observable 时（直接或通过依赖链）。如果您需要使用这些模式中的一种，并且希望完全避免循环依赖，那么可以使用上面描述的 peek 函数。
## 纯计算监控
纯计算监控相对于一般的计算监控，在性能和存储上有优势，这是因为纯计算监控，在不存在订阅者的时候是不会保持订阅关系的。这也使得纯计算监控有如下两点特点：
- 防止计算监控的内存泄露，某些计算监控不再使用，但其依赖任然存在。
- 通过降低对计算监控（其值是不可观察的）的重复计算，来减少计算过载。
一个纯计算监控能够依据它，是否拥有订阅者，而自动地在两种状态下切换：
1. 当不存在订阅者的时候，纯计算监控会进入休眠状态，此时的它，会关闭所有依赖于它的订阅关系，同时也不会再追踪它所关联的 observables。一旦处于休眠状态的计算监控的值被读取的话，它就需要重新计算以便以确保值得正确性。
2. 当它拥有订阅者的时候，纯计算监控会进入监听状态。一旦进入监听状态，它会立即调用它的函数和订阅程序来追踪它所关联的 observables。在这种状态下，纯计算监控和普通的计算监控无异。

按照文档的说明，选择纯计算监控有两条原则：
1. 一是计算监控在运算的时候，不能产生副作用（不能对其他的 observables 产生影响）；
2. 二是计算监控的值，应该仅仅依赖于它所关联的 observables 的值，而不是其他隐含的信息。

纯计算监控有两种定义方式：
```js
this.fullName = ko.pureComputed(function() {
  return this.firstName() + " " + this.lastName();
}, this);
```
或者
```js
this.fullName = ko.computed(function() {
  return this.firstName() + " " + this.lastName();
}, this, { pure: true });
```


### 什么时候使用纯计算监控
您可以对任何遵循纯函数准则的计算监控，使用纯函数特性。但是，当它应用于涉及，由临时视图和视图模型使用和共享的，持久视图模型的应用程序设计时，您将看到最大的好处。在持久性视图模型中使用纯计算监控，可以提高计算性能。在临时视图模型中使用它们可以提供内存管理好处。

下面的示例中 fullName 纯计算仅在最后一步中绑定到视图，因此仅在该步骤处于活动状态时更新。
```html
<div class="log" data-bind="text: computedLog"></div>
<!--ko if: step() == 0-->
<p>First name: <input data-bind="textInput: firstName" /></p>
<!--/ko-->
<!--ko if: step() == 1-->
<p>Last name: <input data-bind="textInput: lastName" /></p>
<!--/ko-->
<!--ko if: step() == 2-->
<div>Prefix: <select data-bind="value: prefix, options: ['Mr.', 'Ms.','Mrs.','Dr.']"></select></div>
<h2>Hello, <span data-bind="text: fullName"> </span>!</h2>
<!--/ko-->
<p><button type="button" data-bind="click: next">Next</button></p>

<script type="text/javascript">
  function AppData() {
    this.firstName = ko.observable('John');
    this.lastName = ko.observable('Burns');
    this.prefix = ko.observable('Dr.');
    this.computedLog = ko.observable('Log: ');
    this.fullName = ko.pureComputed(function () {
      var value = this.prefix() + " " + this.firstName() + " " + this.lastName();
      // 通常，我们会避免在纯计算监控中写监控（避免副作用）
      // 但本例是为了演示内部工作原理，写日志是一个好方法
      this.computedLog(this.computedLog.peek() + value + '; ');
      return value;
    }, this);

    this.step = ko.observable(0);
    this.next = function () {
      this.step(this.step() === 2 ? 0 : this.step()+1);
    };
  };

  ko.applyBindings(new AppData());
</script>
```
<div style="display: flex;">
  <div style="display: flex; flex-direction: column;">
    <div style="height: 40px;">第一步（first name）</div>
    <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_06.png" align="left" />
  </div>
  <div style="display: flex; flex-direction: column;">
    <div style="height: 40px;">第二步（last name）</div>
    <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_07.png" align="left" />
  </div>
  <div style="display: flex; flex-direction: column;">
    <div style="height: 40px;">第三步（full name）</div>
    <img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_08.png" align="left" />
  </div>
</div>
如上图。当我们重复上述步骤时，Log：不会发生追加（因为使用了 peek() 函数）。如果不适用 peek() 函数
> 将    this.computedLog(this.computedLog.peek() + value + '; '); 
> 改成 this.computedLog(this.computedLog() + value + '; ');

重复上述步骤，你会看到如下结果：
<img src="https://cyanbaby.github.io/blog-images/knockoutjs-chuliu/img_09.png" align="left" />

                             

### 为什么不使用纯计算监控
**副作用**

您不应该将纯功能用于计算监控中，这样会意味着在其依赖项发生变化时执行操作。例子包括：
- 使用计算监控来运行基于多个监控的回调。
```js
ko.computed(function () {
  var cleanData = ko.toJS(this);
  myDataClient.update(cleanData);
}, this);
```

- 在绑定的 init 函数中，使用计算监控来更新绑定元素
```js
ko.computed({
  read: function () {
    element.title = ko.unwrap(valueAccessor());
  },
  disposeWhenNodeIsRemoved: element
});
```
如果计算器有重要的副作用，那么不应该使用纯计算计算器的原因很简单，只要计算器没有活动订阅者（睡眠状态也是如此），计算器就不会运行。当依赖项发生变化时，如果 evaluator 始终运行很重要，请使用普通的计算

### 检测属性是否是纯计算监控
有时候，我们需要在程序中检测某个变量是否是纯计算监控，Knockout 提供了 ko.isPureComputed 来帮助我们实现这一判断。
```js
var result = {};
ko.utils.objectForEach(myObject, function (name, value) {
  if (!ko.isComputed(value) || ko.isPureComputed(value)) {
    result[name] = value;
  }
});
```

### 状态更改通知
纯计算监控通知一些事件，允许您响应监控状态的更改。
- awake（唤醒） — 当计算监控进入监听（listening）状态时, 它会用当前值，通知一个唤醒（awake ）事件。(awake 使用也可以应用于，通过 deferEvaluation 创建的普通的计算监控.) 你不需要了解监控的内部状态。但是，由于内部状态可以对应于监控是否绑定到视图，因此可以使用该信息进行一些 viewModel 初始化或清理。
```js
this.someComputedThatWillBeBound = ko.pureComputed(function () {
    ...
}, this);
 
this.someComputedThatWillBeBound.subscribe(function () {
    // do something when this is bound
}, this, "awake");
```

- asleep（睡眠） — 当计算监控进入睡眠（sleeping）状态时, 它用 undefined 的值通知休眠（asleep）事件。
- spectate（凝视） — 当计算监控记录到其值得变化时，即使在睡眠中，它会用新值通知一个凝视（spectate）事件。( spectate 事件应用于任何类型的监控，但通常对纯计算监控最有用) 此事件允许您跟踪监控的当前值，而不影响其睡眠/唤醒状态，同时记住，当使用速率限制和延迟更新时，“被凝视”的值可能包括更改通知未捕获的中间值。

### 已释放的纯计算监控的状态
您可以通过调用其 dispose 函数来手动处理计算监控，该函数将清除对其依赖项的所有订阅。

如果它的 evaluator 函数不访问任何观察值，它也会自动处理。

尽管您可以继续访问已释放的计算监控的最新值，但其 evaluator 函数将不会再次运行。

此外，被释放的纯计算监控既不处于唤醒状态，也不处于休眠状态，并且不会通知状态更改事件。

可以通过调用 myComputed.isActive() 函数来检测计算监控是否已经释放。

## 参考
下面的文档描述了如何构造和使用计算监控。

### 构造计算监控
计算监控可以通过一下几种形式进行构造：
1. ko.computed( evaluator [, targetObject, options] ) - 此表单支持创建计算监控的最常见情况。
    - evaluator - 用于计算监控值的当前值的函数
    - targetObject - 如果给定，则表示 KO 调用回调函数时定义 this 的值。
    - options - 一个对象，包含计算监控需要的其他属性。
2. ko.computed( options ) - 这种一个参数的形式用来创建计算监控，接受一个包含下面属性的 JS 对象
    - read — 必填。一个用于评估计算监控当前值的函数。
    - write — 可选. 如果给出，将是计算监控可写。这是一个函数，它接收，其他代码尝试写入计算监控的值。你可以提供自定义逻辑，来处理输入值，通常是将一些值写入底层监控。
    - owner — 可选. 如果给出，定义 KO 读或写回调对应的 this 的值。
    - pure — 可选. 如果该选项是 true, 计算监控将被设置为 [purecomputed observable](https://knockoutjs.com/documentation/computed-pure.html). 该选项相当于 ko.pureComputed 构造器
    - deferEvaluation — 可选。如果该选项是 true，然后计算监控的值将不会被评估，直到确实有人尝试去访问它的值，或手动订阅它。默认情况，在创建过程中，计算监控的值会立即确定。
    - disposeWhen — 可选. 如果给出，此函数在每次重新评估之前执行，以确定是否释放计算监控。一个为真的结果，会触发计算监控的释放
    - disposeWhenNodeIsRemoved — 可选。如果给出，当特定的 DOM 节点被 KO 移除时，计算监控的释放会被触发。当节点被模板和控制流绑定移除时，该特征会释放用于绑定的计算监控，
3. ko.pureComputed( evaluator [, targetObject] ) — 通过给定的评估器函数和用于 this 的可选项，来计算 [purecomputed observable](https://knockoutjs.com/documentation/computed-pure.html) 。与 ko.computed 不同，该方法不接受 options 参数。
4. ko.pureComputed( options ) — 通过 options 对象来构建纯计算监控. 该 options 接受 read, write 和 owner

### 使用计算监控
计算监控提供如下函数：
- dispose() — 手动释放计算监控，清除所有依赖的订阅。如果您希望停止更新计算监控，或者希望清除，与不可清除的监控具有依赖关系的计算监控的内存，则此函数非常有用。
- extend(extenders) — 在计算监控上应用给定的 [extenders](https://knockoutjs.com/documentation/extenders.html)
- getDependenciesCount() — 返回当前计算监控的依赖的数量。
- getDependencies() — 返回计算监控的当前依赖数组。依赖会按顺序返回，这里的顺序是指，评估计算监控的访问顺序。
- getSubscriptionsCount( [event] ) — 返回计算监控的订阅数量 （来自其他计算监控或手动订阅）。选择性地传入事件名称（"change"）可以返回该事件上的订阅数量。
- isActive() — 该计算监控将来是否会更新。如果计算监控没有依赖，则其不活跃
- peek() — 返回计算监控的当前值，而不创建依赖项
- subscribe( callback [,callbackTarget, event] ) — 注册一个手动订阅 [手动订阅](https://knockoutjs.com/documentation/observables.html#explicitly-subscribing-to-observables) 以通知对计算监控的更改。

### 决定监控类型
判断函数如下：
- ko.isObservable — 如果是 observables, observable arrays 或计算监控，返回 true
- ko.isWritableObservable — 如果是 observables, observable arrays 或可写的计算监控，返回 true （别名函数： ko.isWriteableObservable）
- ko.isComputed — 计算监控返回 true
- ko.isPureComputed — 纯计算监控返回 true

### 使用计算上下文
计算监控的评估器函数执行期间，你可以访问 ko.computedContext 来获取关于当前计算属性的信息。它提供了如下函数：
- isInitial() — 当前计算监控评估时，如果该函数第一次被调用，则返回 true，否则返回 false 对于纯计算监控isInitial() 总是 undefined。
- getDependenciesCount() — 返回当前评估期间，迄今为止，检测到的计算监控的依赖数
    - 注意：ko.computedContext.getDependenciesCount() 等同于在计算监控自身上调用 getDependenciesCount()。 在 ko.computedContext 之上也存在的原因是，会提供一个，在初次评估期间，甚至是在计算监控完成构造之前，计算依赖数的方法。
- getDependencies() — 返回当前评估期间，迄今为止检测到的计算监控的依赖数组。在评估计算监控时，依赖项将按访问顺序返回。

示例
```js
var myComputed = ko.computed(function() {
  // ... 省略: 读取一些可以观察到的数据 ...

  // 现在我们使用 ko.computedContext
  var isFirstEvaluation = ko.computedContext.isInitial(),
      dependencyCount = ko.computedContext.getDependenciesCount(),
      console.log("Evaluating " + (isFirstEvaluation ? "for the first time" : "again"));
  console.log("By now, this computed has " + dependencyCount + " dependencies");

  // ... 省略: 返回结果 ...
});
```

这些工具通常仅在高级场景中有用，例如，当您的计算监控的主要目的，是在其评估器期间触发一些副作用，并且，您希望仅在第一次运行期间执行一些设置逻辑，或者仅当它至少有一个依赖项时（因此可能在将来重新评估）。大多数计算属性不需要关心它们以前是否被评估过，或者它们有多少依赖项。