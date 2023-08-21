
# 使用扩展器来增强监控
Knockout observables 提供支持读/写值所需的基本功能，并在该值发生变化时通知订阅者。 但是，在某些情况下，您可能希望向监控对象添加其他功能。 这可能包括向监控对象添加附加属性，或者通过在监控对象前面放置可写的计算监控对象来拦截写入。 Knockout 扩展器提供了一种简单灵活的方法，来对监控数据进行增强。

## 如何创建扩展程序
通过向 ko.extenders 对象添加函数的方式来创建扩展器。该函数将监控对象本身作为第一个参数，将任何选项作为第二个参数。然后它可以返回 observable，或者返回一些新的东西，比如一个 computed observable。
这个简单的 logChange 扩展器订阅监控对象，并使用控制台，编写任何更改以及可配置消息。
```js
ko.extenders.logChange = function(target, option) {
    target.subscribe(function(newValue) {
       console.log(option + ": " + newValue);
    });
    return target;
};
```
您可以通过调用一个监控对象的 extend 函数，并传递一个包含 logChange 属性的对象，来使用这个扩展程序。
```js
this.firstName = ko.observable("Bob").extend({logChange: "first name"});
```
如果 firstName observable 的值被更改为 Ted，那么控制台将显示 firstName: Ted

## 示例1：强制输入是数字
本例创建了一个扩展器，该扩展器强制将写入到监控对象的数据，四舍五入到可配置的精度级别。在这种情况下，扩展器将返回一个新的可写计算监控对象，该可写计算监控对象将位于，实际监控的拦截写入之前。
```html
<p><input data-bind="value: myNumberOne" /> (保留整数)</p>
<p><input data-bind="value: myNumberTwo" /> (保留小数点后两位)</p>

<script type="text/javascript">
ko.extenders.numeric = function(target, precision) {
  // 创建一个可写的计算可观察对象，以拦截对我们的可观察对象的写入
  var result = ko.pureComputed({
    read: target,  // 一直返回原始 observable 值
    write: function(newValue) {
      var current = target(),
          roundingMultiplier = Math.pow(10, precision),
          newValueAsNum = isNaN(newValue) ? 0 : +newValue,
          valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

      // 发生改变时，才写入
      if (valueToWrite !== current) {
        target(valueToWrite);
      } else { // 如果写入了不同的值，则强制为当前字段发出通知
        if (newValue !== current) {
          target.notifySubscribers(valueToWrite);
        }
      }
    }
  }).extend({ notify: 'always' });

  result(target()); // 使用当前值初始化，以确保它已适当舍入

  return result; // 返回新的计算属性
};

function AppViewModel(one, two) {
  this.myNumberOne = ko.observable(one).extend({ numeric: 0 });
  this.myNumberTwo = ko.observable(two).extend({ numeric: 2 });
}

ko.applyBindings(new AppViewModel(221.2234, 123.4525));
</script>
```
注意，为了自动从 UI 中删除被拒绝的值，必须在计算的观察对象上使用 .extend({notify: 'always'})。如果没有这个，用户可能会输入一个无效的 newValue，当四舍五入时，它会给出一个未更改的 valueToWrite。然后，由于模型值不会更改，所以不会有更新 UI 中的文本框的通知。使用 {notify: 'always'} ，即使计算的属性没有更改值，也会导致文本框刷新（删除被拒绝的值）。

## 示例2：给监控对象添加验证
这个例子创建了一个扩展器，它允许根据需要对监控对象进行标记。该扩展器不返回新对象，而只是向现有的监控对象，添加额外的子监控对象。由于监控对象是函数，它们实际上可以有自己的属性。
然而，当 viewModel 被转换成 JSON 时，子监控对象将被删除，只剩下实际监控对象的值。这是一种添加仅与 UI 相关且不需要发送回服务器的，附加功能的好方法。
```html
<p data-bind="css: { error: firstName.hasError }">
  <input data-bind='value: firstName, valueUpdate: "afterkeydown"' />
  <span data-bind='visible: firstName.hasError, text: firstName.validationMessage'> </span>
</p>
<p data-bind="css: { error: lastName.hasError }">
  <input data-bind='value: lastName, valueUpdate: "afterkeydown"' />
  <span data-bind='visible: lastName.hasError, text: lastName.validationMessage'> </span>
</p>

<script type="text/javascript">
  ko.extenders.required = function(target, overrideMessage) {
    // 给 observable 添加一些 sub-observable
    target.hasError = ko.observable();
    target.validationMessage = ko.observable();

    // 定义执行验证的函数
    function validate(newValue) {
      target.hasError(newValue ? false : true);
      target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
    }

    // 初始化验证
    validate(target());

    // 当数据变化时，执行验证
    target.subscribe(validate);

    // 返回最初的 observable
    return target;
  };

  function AppViewModel(first, last) {
    this.firstName = ko.observable(first).extend({ required: "Please enter a first name" });
    this.lastName = ko.observable(last).extend({ required: "" });
  }

  ko.applyBindings(new AppViewModel("Bob","Smith"));
</script>
```


## 应用多个扩展程序
在对可观察对象的 .extend 方法的一次调用中可以应用多个扩展程序。
```js
this.firstName = ko.observable(first).extend({ 
  required: "Please enter a first name", 
  logChange: "first name" 
});
```
在这种情况下，required 和 logChange 扩展器都将针对我们的 observable 执行。