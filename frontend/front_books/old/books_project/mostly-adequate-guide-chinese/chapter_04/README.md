## 柯里化
当然你也可以在能够使用 lodash 或 ramda 的网页中运行它们。

### 不仅仅是双关语／咖喱
curry 的用处非常广泛，就像在 hasSpaces、findSpaces 和 censored 看到的那样，只需传给函数一些参数，就能得到一个新函数。
```js
var getChildren = function(x) {
    return x.childNodes;
  };
  
  var allTheChildren = map(getChildren);
```

只传给函数一部分参数通常也叫做局部调用（partial application），能够大量减少样板文件代码（boilerplate code）。
考虑上面的 allTheChildren 函数，如果用 lodash 的普通 map 来写会是什么样的（注意参数的顺序也变了）：
```js
var allTheChildren = function(elements) {
  return _.map(elements, getChildren);
};
```

通常我们不定义直接操作数组的函数，因为只需内联调用 map(getChildren) 就能达到目的。这一点同样适用于 sort、filter 以及其他的高阶函数（higher order function）（高阶函数：参数或返回值为函数的函数）。

```js
// 当我们谈论纯函数的时候，我们说它们接受一个输入返回一个输出。
// curry 函数所做的正是这样：每传递一个参数调用函数，就返回一个新函数处理剩余的参数。这就是一个输入对应一个输出啊。

// 哪怕输出是另一个函数，它也是纯函数。
// 当然 curry 函数也允许一次传递多个参数，但这只是出于减少 () 的方便。
```

[课后练习](https://github.com/llh911001/mostly-adequate-guide-chinese/tree/master/code/part1_exercises/answers)

## TODO
- 初看练习题，还没领悟到柯里化的精髓
- 手写 curry 函数