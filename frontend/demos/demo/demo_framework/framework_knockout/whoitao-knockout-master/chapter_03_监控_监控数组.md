## 监控数组

### 简介

如果你要探测和响应一个对象的变化，你应该用 observables。如果你需要探测和响应一个集合对象的变化，你应该用 observableArray 。在很多场景下，它都非常有用，比如你要在 UI 上需要**显示/编辑**的一个列表数据集合，然后对集合进行添加和删除。

#### 示例

```html
<script>
  // 声明 ViewModel
  var vm = {
    myObservableArray: ko.observableArray(), // 初始化一个空数组
  };

  vm.myObservableArray.push("Some value");

  // 激活 KnockOut
  ko.applyBindings(vm);
</script>
```

#### 关键点：监控数组跟踪的是数组里的对象，而不是对象属性。

简单说，**将一对象放在 observableArray 里不会使这个对象本身的属性变化可监控的**。当然，你自己也可以声明这个对象的属性为 observable 的，但它就成了一个依赖监控对象了。一个 observableArray 仅仅监控他拥有的对象，并在这些对象添加，或者删除的时候发出通知。

### 常规操作

#### 预填充监控数组

如果你想让你的监控数组，在开始的时候就有一些初始值，那么在声明的时候，你可以在构造器里加入这些初始对象。例如：

```js
// This observable array initially contains three objects
var anotherObservableArray = ko.observableArray([
  { name: "Bungle", type: "Bear" },
  { name: "George", type: "Hippo" },
  { name: "Zippy", type: "Unknown" },
]);
```

#### 从监控数组里读取信息

一个 observableArray 其实就是一个 observable 的监控对象，只不过他的值是一个数组（observableArray 还加了很多其他特性，稍后介绍）。所以，你可以像获取普通的 observable 的值一样，只需要调用无参函数，就可以获取自身的值了。 例如，你可以像下面这样获取它的值：

```js
alert("The length of the array is " + myObservableArray().length);
alert("The first element is " + myObservableArray()[0]);
```

理论上你可以使用任何原生的 JavaScript 数组函数来操作这些数组，但是 KO 提供了更好的功能等价函数，他们非常有用是因为：

1. 兼容所有浏览器。（例如 indexOf 不能在 IE8 和早期版本上使用，但 KO 自己的 indexOf 可以在所有浏览器上使用）
2. 在数组操作函数方面（例如 push 和 splice），KO 自己的方式可以自动触发依赖跟踪，并且通知所有的订阅者，然后让 UI 界面也相应的自动更新。
3. 语法更方便，调用 KO 的 push 方法，只需要这样写：myObservableArray.push(...)。 比如原生数组的 myObservableArray().push(...) 好用多了。

下面讲解的均是 observableArray 的读取和写入的相关函数。

- indexOf 
  - indexOf 函数，返回数组中，与给定参数相等的第一个元素的索引。
  - 例如：myObservableArray.indexOf('Blah') 将返回第一个等于 Blah 的元素的索引（索引值从 0 开始）。
  如果没有找到相等的，将返回 -1。
- slice
  - slice 函数是 observableArray 相当于 JavaScript 原生函数 slice 的等价函数（返回给定的从开始索引到结束索引之间所有的对象集合）。
  - 调用 myObservableArray.slice(...) 等价于调用 JavaScript 原生函数（例如：myObservableArray().slice(...)）。

#### 操作监控数组

监控数组暴露了一组相似的函数，用于修改数组内容和通知订阅者。
所有这些函数都是和 JavaScript 数组原生函数等价的，唯一不同的是，数组改变可以通知订阅者：
- myObservableArray.push('Some new value') 在数组末尾添加一个新项
- myObservableArray.pop() 删除数组最后一个项并返回该项
- myObservableArray.unshift('Some new value') 在数组头部添加一个项
- myObservableArray.shift() 删除数组头部第一项并返回该项
- myObservableArray.reverse() 翻转整个数组的顺序
- myObservableArray.sort() 给数组排序

- 默认情况下，是按照字符排序（如果是字符）或者数字排序（如果是数字）。
- 你可以排序传入一个排序函数进行排序，该排序函数需要接受 2 个参数（代表该数组里需要比较的项），
- 如果第一个项小于第二个项，返回-1，大于则返回1，等于返回0。例如：用 lastname 给 person 排序，你可以这样写：
```js
var mySortedArray = ko.pureComputed(function () {
    return myObservableArray.sorted(function (left, right) {
        return left.lastName === right.lastName ? 0
             : left.lastName < right.lastName ? -1
             : 1;
    });
});
```
- myObservableArray.splice() 删除指定开始索引和指定数目的数组对象元素。
例如 myObservableArray.splice(1, 3) 从索引1开始删除3个元素（第 2,3,4个元素）
然后将这些元素作为一个数组对象返回。
- myObservableArray.reversed() 返回倒叙数组的一个拷贝

代码示例
```js
var myArray = ko.observableArray(["Alpha", "Beta", "Gamma"]);
 
myArray.push("Delta");
// Changes: [{ index: 3, status: 'added', value: 'Delta' }]
// New value: ["Alpha", "Beta", "Gamma", "Delta"]
 
myArray.pop();
// Changes: [{ index: 3, status: 'deleted', value: 'Delta' }]
// New value: ["Alpha", "Beta", "Gamma"]
 
myArray.splice(1, 2, "Omega");
// Changes:
// [{ index: 1, status: 'deleted', value: 'Beta' },
//  { index: 1, status: 'added', value: 'Omega' },
//  { index: 2, status: 'deleted', value: 'Gamma' }]
// New value: ["Alpha", "Omega"]
 
myArray.reverse();
// Changes:
// [{ index: 0, moved: 1, status: 'deleted', value: 'Alpha' },
//  { index: 1, moved: 0, status: 'added', value: 'Alpha' }]
// New value: ["Omega", "Alpha"]
```

删除相关
- myObservableArray.remove(someItem) 删除所有等于someItem的元素并将被删除元素作为一个数组返回
- myObservableArray.remove(function(item) { return item.age < 18 }) 删除所有age属性小于18的元素并将被删除元素作为一个数组返回
- myObservableArray.removeAll(['Chad', 132, undefined]) 删除所有等于'Chad', 123, or undefined的元素并将被删除元素作为一个数组返回

#### 判断是否是监控数组
 KO 提供了一个工具函数，ko.isObservableArray 来判断某个变量是否是监控数组