## 纯函数
> 可预测性，无副作用

1. 给定相同的输入，始终返回相同的输出。
2. 函数执行期间没有副作用。
   - 函数不依赖于或修改全局状态。纯函数应该是独立的、自包含的，不依赖于外部状态，也不会修改它。
   - 函数执行过程中不会对程序的状态造成任何影响，例如修改全局变量、修改传递给函数的参数或执行 I/O 操作等。
   - 函数不会抛出异常或错误。纯函数应该是可靠和可预测的，因此不应该引发任何异常或错误。
2. 书里提到的副作用可能包含，但不限于：
- 更改文件系统
- 往数据库插入记录
- 发送一个 http 请求
- 可变数据
- 打印/log
- 获取用户输入
- DOM 查询
- 访问系统状态

```js
// 不纯的
var minimum = 21;

var checkAge = function(age) {
  return age >= minimum;
};


// 纯的
var checkAge = function(age) {
  var minimum = 21;
  return age >= minimum;
};
```

这并不是说，要禁止使用一切副作用，而是说，要让它们在可控的范围内发生。后面讲到 functor 和 monad 的时候我们会学习如何控制它们，目前还是尽量远离这些阴险的函数为好。

### 八年级数学
如果输入直接指明了输出，那么就没有必要再实现具体的细节了。因为函数仅仅只是输入到输出的映射而已，所以简单地写一个对象就能“运行”它，使用 [] 代替 () 即可。
```js
var toLowerCase = {"A":"a", "B": "b", "C": "c", "D": "d", "E": "e", "D": "d"};

toLowerCase["C"];
//=> "c"

var isPrime = {1:false, 2: true, 3: true, 4: false, 5: true, 6:false};

isPrime[3];
//=> true
```

### 可移植性／自文档化（Portable / Self-Documenting）
在 JavaScript 的设定中，可移植性可以意味着把函数序列化（serializing）并通过 socket 发送。也可以意味着代码能够在 web workers 中运行。总之，可移植性是一个非常强大的特性。


### 可测试性（Testable）
但是我强烈推荐你去试试 Quickcheck——一个为函数式环境量身定制的测试工具。


### 合理性（Reasonable）
很多人相信使用纯函数最大的好处是引用透明性（referential transparency）

### 并行代码
纯函数也不会因副作用而进入竞争态（race condition）。

并行代码在服务端 js 环境以及使用了 web worker 的浏览器那里是非常容易实现的，因为它们使用了线程（thread）。不过出于对非纯函数复杂度的考虑，当前主流观点还是避免使用这种并行。

## 术语
- 系统状态（system state）
- 负荷（cognitive load）
- 不可变（immutable）对象
- 可缓存性（Cacheable）
- 记忆函数（memoize）
- 可移植性／自文档化（Portable / Self-Documenting）
- 函数序列化（serializing）
- web workers
- 断言状态（assert the state）
- 引用透明性（referential transparency）
- “等式推导”（equational reasoning）
- 怪异行为（quirks of programmatic evaluation）
- 竞争态（race condition）
- 线程（thread）



## [What is a Function?](https://www.mathsisfun.com/sets/function.html)