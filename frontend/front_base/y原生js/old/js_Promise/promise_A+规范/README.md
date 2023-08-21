# 异步编程
> 四种解决方案
1. callback 回调函数
2. generator + co库
3. promise 
4. asycn/await

##### A+规范译文术语
* 解决（fulfill）：指一个 promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 fulfill 来表示解决，但在后世的 promise 实现多以 resolve 来指代之。
* 拒绝（reject）：指一个 promise 失败时进行的一系列操作。
* 终值（eventual value）：所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。
* 据因（reason）：也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值。
* then方法: Promise 表示一个异步操作的最终结果，与之进行交互的方式主要是 then 方法，该方法注册了两个回调函数，用于接收 promise 的终值或本 promise 不能执行的原因。

##### 术语
* Promise: promise 是一个拥有 then 方法的对象或函数，其行为符合本规范；
* thenable: 是一个定义了 then 方法的对象或函数，文中译作“拥有 then 方法”；
* 值（value）: 指任何 JavaScript 的合法值（包括 undefined , thenable 和 promise）；
* 异常（exception）: 是使用 throw 语句抛出的一个值。
* 据因（reason）: 表示一个 promise 的拒绝原因

#####  Promise 的状态
> 一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。
* 等待态（Pending）
  - 处于等待态时，promise 需满足以下条件：
    - 可以迁移至执行态或拒绝态
* 执行态（Fulfilled）
  - 处于执行态时，promise 需满足以下条件：
    - 不能迁移至其他任何状态
    - 必须拥有一个不可变的终值
* 拒绝态（Rejected）
  - 处于拒绝态时，promise 需满足以下条件：
    - 不能迁移至其他任何状态
    - 必须拥有一个不可变的据因

##### Then 方法
* 一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因。
* promise 的 then 方法接受两个参数：
```js
  promise.then(onFulfilled, onRejected)
```
* 参数可选
```js
// onFulfilled 和 onRejected 都是可选参数。

// 如果 onFulfilled 不是函数，其必须被忽略(依然成功输出，用函数包装 return了值)
// 如果 onRejected 不是函数，其必须被忽略


```

##### [更多规范](https://www.ituring.com.cn/article/66566)



##### 开发过程结合promise/a+规范
1. index.js      进行原生的Promise演示
2. promise.js    进行自定义的Promise演示
3. test.js       是对promise.js进行测试

##### A+ 规范
* [译文](https://www.ituring.com.cn/article/66566)
* [史上最最最详细的手写Promise教程](https://juejin.im/post/5b2f02cd5188252b937548ab)
* [手写实现满足 Promise/A+ 规范的 Promise](https://www.jianshu.com/p/8d5c3a9e6181)

##### promise.js
* 它有一个一次性的特征，也就是必须是等待状态迁移至执行态或拒绝态, 就需要定义一些变量记录状态的改变
* state是不可逆的，所以resolve和reject中stat === 'pending'才可以继续下去 
* state === 'pending'; resolve和reject分别改变state等于'fulfilled'和'rejected'; 然后分别执行成功和失败回调 => 分别把终值和拒因赋值this.value和this.reason


##### vscode debug程序
* launch.json指定需要debug的js文件 => test.js
* TypeError: Cannot read property 'state' of undefined
* test.js => resovle(1) 作为一个匿名函数执行的 并没有谁调用它 es6严格模式下只想undefined(通过箭头函数改变就行了)


##### code 边写边优化
* 初始化状态和resolve和reject函数和then方法 分别作为Promise的方法
* 又报this的错误, 借用bind()


## lesson-01
resolve和reject函数分别传递给executor执行

## lesson-02
resolve和reject函数分别做了什么事呢？状态的改变回调的执行。
初始化值状态 this.value, this.reason, this.state
resolve和reject函数  分别 接受一个终值和拒因，负责更新状态。
resolve和reject函数 最终被构造器函数（executor(）执行，executor(resolve, reject)
所以我们new Promise的时候函数接收两个参数其实就是 我们定义好的resolve和reject

## lesson-03
new Promise执行了 resolve
promise中应该用箭头函数绑定resolve和reject函数
vscode 自带的 debuger 演示 this指向问题

## lesson-04
代码编写边写边优化
抽离 initBind， initValue，resolve，reject
this问题用bind解决

## lesson-05
完善then方法，接收两个参数 onFulfilled, onRejected, 添加参数判断, 如果onFulfilled, onRejected不是函数会有穿透效果，不管是resolve还是reject
判断 this.state 执行 onFulfilled(this.value) 或者 onRejected(this.reason)


```js
// 从这里开始分析，为什么 new Promise之后会执行then方法，并且把resolve(1)的1传递给then方法的回调参数里的呢？

// 测试代码
new Promise((resolve, reject) => {
  console.log('开始啦')
  resolve(1)
})
.then(value => {
  console.log('成功的回调vlaue:', value)        // 依赖输出 
}, reason => {
  console.log('失败的回调reason:', reason)
})


// tag1 
// new Promise(...) 会得到一个Promise实例
// 实例会拥有then方法

// tag2
// .then方法执行，是我们在外部就执行了

// tag3
// new Promise的执行函数会执行 => resolve|reject 执行 => 改变状态

// tag4 then方法执行具体响应哪个回调（onFulfilled|onRejected），是判断状态执行的，传递的参数也是根据状态传递的

```

todo 当前demo还没处理好    new...then().then(value =>..), lesson-10 解决了

## lesson-06
静态属性存放数据

## lesson-07
test.js的测试代码执行 lesson-06 的代码，输出顺序是  1, 2, 4, value 1, 3  和index.js对比顺序不太对
onFulfilled(this.value) 和 onRejected(this.reason) 立即执行了，用setTimeout模拟异步 => 有个异常捕获小问题下一个lesson解决

## lesson-08
try catch 捕获异常
还有个问题new Promise传递执行器里面异步调用 resolve(1)


## lesson-09
没有进入setTimeout里面 而是直接执行了then
此时的this.state等于pending，不等于fulfilled|reject,所以没有执行任何一个回调(onFulfilled(this.value)|onRejected(this.reason))
所以then方法里面的传入的函数参数没有执行

如何解决呢？
追加一个判断 this.state === 'pending'，我们可以把它保留到一个数组里，等待状态改变再重新调用
this.onFulfilledCallbacks = []  // 成功回调
this.onRejectedCallbacks = []  // 失败回调

当成功或者失败以后for这两个数组的执行， todo 不用清空吗？


## lesson-10
链式调用实现，then方法的返回值必定是一个新的Promise的实例


## lesson-12
当Promise不是基本值，而是promise实例的时候，必须等待这一个promise执行结束，才能下一步操作
resolvePromise 天才方案，避免循环调用的问题
```js
// TypeError: xxx，  我们的resolvePromise也要实现Promise的防止错误使用判断
let p1 = new Promise( resolve => {
  resolve(1)
})
let p2 = p1.then(() => {
  return p2
})
```

完善 Promise.resolvePromise

## lesson-13
递归 解决什么问题？

## lesson-14
继续完善 解决什么问题？

Promise.prototype.catch
Promise.all
Promise.race
后期不一定出，撒花结束