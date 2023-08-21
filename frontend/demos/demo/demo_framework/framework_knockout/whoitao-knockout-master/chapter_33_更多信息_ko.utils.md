# ko.utils

每一套框架基本上都会有一个工具类，如：Vue 中的 Vue.util、Knockout 中的 ko.utils、jQuery 直接将一些工具类放到了 $ 里面，如果你还需要更多的工具类可以试试 [lodash](https://lodash.com/)。本文只介绍一下 Knockout 中 ko.utils 中处理数组的一些方法。

## ko.utils.arrayForEach(array, callback)

与 Array.prototype.forEach 作用一致。提供函数（回调函数）对数组的每个元素执行一次。使用方法：

```js
var arr = [1, 2, 3, 4];
ko.utils.arrayForEach(arr, function (el, index) {
  console.log(el);
});
```

> 上面分别输出：1、2、3、4

ko.utils.arrayForEach 源码：

```js
ko.utils.arrayForEach = function (array, action) {
  for (var i = 0, j = array.length; i < j; i++) action(array[i], i);
};
```

## ko.utils.arrayMap(array, callback)

与 Array.prototype.map 作用一致。返回一个由原数组中的每个元素，调用一个指定方法后的返回值组成的新数组。使用方法：

```js
var arr = [1, 2, 3, 4];
var newArr = ko.utils.arrayMap(arr, function (el, index) {
  return el + 1;
});
```

> 上面得到的 newArr 为：[2, 3, 4, 5]

ko.utils.arrayMap 源码：

```js
ko.utils.arrayMap = function (array, mapping) {
  array = array || [];
  var result = [];
  for (var i = 0, j = array.length; i < j; i++)
    result.push(mapping(array[i], i));
  return result;
};
```

## ko.utils.arrayFilter(array, callback)

与 Array.prototype.filter 作用一致。使用指定的函数测试所有元素，并创建一个包含所有通过测试元素的新数组。使用方法：

```js
var arr = [1, 2, 3, 4];
var newArr = ko.utils.arrayFilter(arr, function (el, index) {
  return el > 2;
});
```

> 上面得到的 newArr 为：[3, 4]

ko.utils.arrayFilter 源码：

```js
ko.utils.arrayFilter = function (array, predicate) {
  array = array || [];
  var result = [];
  for (var i = 0, j = array.length; i < j; i++)
    if (predicate(array[i], i)) result.push(array[i]);
  return result;
};
```

## ko.utils.arrayIndexOf(array, item)

与 Array.prototype.indexOf 作用一致。返回给定元素在数组中找到的第一个索引值，否则返回 -1。使用方法：

```js
var arr = [1, 2, 3, 4];
var index = ko.utils.arrayIndexOf(arr, 2);
```

> 上面得到的 index 值为 1

ko.utils.arrayIndexOf 源码

```js
ko.utils.arrayIndexOf = function (array, item) {
  if (typeof Array.prototype.indexOf == "function")
    return Array.prototype.indexOf.call(array, item);
  for (var i = 0, j = array.length; i < j; i++) if (array[i] === item) return i;
  return -1;
};
```

## ko.utils.arrayRemoveItem(array, itemToRemove)

从数组中删除一个指定值的元素。使用方法：

```js
var arr = [1, 2, 3, 4, 2];
ko.utils.arrayRemoveItem(arr, 2);
```

> 上面 arr 现在为 [1, 3, 4, 2]

ko.utils.arrayRemoveItem 源码：

```js
ko.utils.arrayRemoveItem = function (array, itemToRemove) {
  var index = ko.utils.arrayIndexOf(array, itemToRemove);
  if (index > 0) {
    array.splice(index, 1);
  } else if (index === 0) {
    array.shift();
  }
};
```

## ko.utils.arrayGetDistinctValues(array)

对数组进行去重（如果数组长度很大效率会很低），返回去重之后的新数组。使用方法：

```js
var arr = [1, 2, 3, 4, 2, 4, "1"];
var newArr = ko.utils.arrayGetDistinctValues(arr);
```

> 得到的 newArr 值为 [1, 2, 3, 4, '1']

ko.utils.arrayGetDistinctValues 源码：

```js
ko.utils.arrayGetDistinctValues = function (array) {
  array = array || [];
  var result = [];
  for (var i = 0, j = array.length; i < j; i++) {
    if (ko.utils.arrayIndexOf(result, array[i]) < 0) result.push(array[i]);
  }
  return result;
};
```

## ko.utils.arrayFirst(array, callback[, thisArg])

与 Array.prototype.find 方法类似（命名与 find 偏差太大了）。返回第一个满足条件的元素。使用方法：

```js
var arr = [{ name: "apple" }, { name: "banana" }, { name: "cherries" }];
var item = ko.utils.arrayFirst(arr, function (el, index) {
  return el.name === "banana";
});
```

ko.utils.arrayFirst 源码：

```js
ko.utils.arrayFirst = function (array, predicate, predicateOwner) {
  for (var i = 0, j = array.length; i < j; i++)
    if (predicate.call(predicateOwner, array[i], i)) return array[i];
  return null;
};
```

## ko.utils.arrayPushAll(array, valuesToPush)

将数组 valuesToPush 合并到数组 array 中。使用方法：

```js
var arr = [1, 2, 3];
ko.utils.arrayPushAll(arr, [4, 5]);
```

> 最后 arr 的值为 [1, 2, 3, 4, 5]

ko.utils.arrayPushAll 源码：

```js
ko.utils.arrayPushAll = function (array, valuesToPush) {
  if (valuesToPush instanceof Array) array.push.apply(array, valuesToPush);
  else
    for (var i = 0, j = valuesToPush.length; i < j; i++)
      array.push(valuesToPush[i]);
  return array;
};
```

## ko.utils.addOrRemoveItem(array, value, included)

included 为 true，则 array 中含有 value 不处理，没有则添加；
included 为 false，则 array 中含有 value 删除，没有则不处理。 使用方法：

```js
var arr = [1, 2, 3];

ko.utils.addOrRemoveItem(arr, 4, true); /// arr为[1, 2, 3, 4]

// 或者
ko.utils.addOrRemoveItem(arr, 4, false); /// arr为[1, 2, 3]

// 或者
ko.utils.addOrRemoveItem(arr, 2, true); /// arr为[1, 2, 3]

// 或者
ko.utils.addOrRemoveItem(arr, 2, false); /// arr为[1, 3]
```

ko.utils.addOrRemoveItem 源码：

```js
addOrRemoveItem: function(array, value, included) {
    var existingEntryIndex = ko.utils.arrayIndexOf(ko.utils.peekObservable(array), value);
    if (existingEntryIndex < 0) {
        if (included)
            array.push(value);
    } else {
        if (!included)
            array.splice(existingEntryIndex, 1);
    }
}
```

ko 中基本上就这些处理数组的方法了，如果你知道 ko 中有这些方法，那么在做兼容比较旧的浏览器（IE8 及以下）的开发能让你轻松很多。
