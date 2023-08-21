## 第 5 章: 代码组合（compose）

如果不用组合，shout 函数将会是这样的：
```js

var shout = function(x){
  return exclaim(toUpperCase(x));
};

```

让代码从右向左运行，而不是由内而外运行，我觉得可以称之为“左倾”（吁——）。我们来看一个顺序很重要的例子：
```js
var head = function(x) { return x[0]; };
var reverse = reduce(function(acc, x){ return [x].concat(acc); }, []);
var last = compose(head, reverse);

last(['jumpkick', 'roundhouse', 'uppercut']);
//=> 'uppercut'
```

### 结合律
```js
// 结合律（associativity）
var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// true

// 例2:
compose(toUpperCase, compose(head, reverse));
// 或者
compose(compose(toUpperCase, head), reverse);
```


### 最佳实践
关于如何组合，并没有标准的答案——我们只是以自己喜欢的方式搭乐高积木罢了。通常来说，最佳实践是让组合可重用，就像 last 和 angry 那样。如果熟悉 Fowler 的《重构》一书的话，你可能会认识到这个过程叫做 “extract method”——只不过不需要关心对象的状态。


### pointfree 模式
源自 1970 年的电影 Love Story 里的一句著名台词“Love means never having to say you're sorry”。紧接着作者又说了一句“Excuse me”，大概是一种幽默）。它的意思是说，函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化（curry）以及组合协作起来非常有助于实现这种模式。

### debug
组合的一个常见错误是，在没有局部调用之前，就组合类似 map 这样接受两个参数的函数。

```js
// 错误做法：我们传给了 `angry` 一个数组，根本不知道最后传给 `map` 的是什么东西。
var latin = compose(map, angry, reverse);

latin(["frog", "eyes"]);
// error


// 正确做法：每个函数都接受一个实际参数。
var latin = compose(map(angry), reverse);

latin(["frog", "eyes"]);
// ["EYES!", "FROG!"])
```


TODO trace 函数允许我们在某个特定的点观察数据以便 debug。像 haskell 和 purescript 之类的语言出于开发的方便，也都提供了类似的函数。

TODO 范畴学