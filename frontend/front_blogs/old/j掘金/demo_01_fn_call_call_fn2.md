---
theme: smartblue
highlight: monokai
---
## 一道面试题
```js
  function fn1(arg) {
    console.log(1)
  }

  function fn2(arg) {
    console.log(1)
  }

  // 输出什么?
  fn1.call(fn2)

  fn1.call.call(fn2)

  fn1.call.call.call(fn2)
```


## es3Call 模拟实现 call 完整代码
```js
  // 完整代码： 后续会逐行分析
  Function.prototype.es3Call = function (ctx) {

    var content = ctx || window;

    content.fn = this;

    var args = [];

    for (var i = 1; i < arguments.length; i++) {
      args.push('arguments[' + i + ']');
    }

    var result = eval('content.fn(' + args + ')');
    
    delete content.fn;

    return result;
  }
```

## 大致原理

### JS的方法执行方式
JS的方法执行方式之一: 对象.方法()    例如: user.sayName()
 - 此时调用者是对象，通常情况下方法内部的this指向调用者
 - 本文实现的 es3Call 代码中亦是通过巧用 对象.方法() 的执行方式， 通过改变调用者 从而改变被执行方法中的this指向的

### 借用其他对象当做自身this
```js
  // 将函数设置为对象属性
  // 执行该函数属性
  // 删除该属性

  var obj = {
      cn_name: '张三'
  }
  function test() {
      console.log(this.cn_name)
  }

  obj.fn = test
  obj.fn()
  delete obj.fn
```

### 参数 & 返回值

#### es3Call 的参数
- es3Call 的参数，es3Call 只需一个参数 ctx 
- 最终会成为调用者，因为 call 设计不是为了本文面试的连续调用而设计的

#### 业务方法 参数
- 业务方法指的 fn1，JS的方法可以有参数，也可以没有参数

- es3Call 中直接忽略 arguments 中的“第 0 位” 收集后继续传递【实现细节 中 有解释】
- 再次强调：call 设计不是为了本文面试的连续调用而设计的，而是为了改变 this 指向



#### es3Call 返回值
- JS的方法可以有返回值，也可以没有返回值, 如果没有默认返回 undefined

- es3Call 中用 result 接收业务方法的执行结果，然后继续返回

**用了 es3Call 之后，我们实际的执行方法(业务方法: fn1)的 参数 & 返回值 都被 es3Call 转接**


## 执行过程

### 1个 call
```js

  Function.prototype.es3Call = function (ctx) {

    var content = ctx || window;

    content.fn = this;

    var args = [];

    for (var i = 1; i < arguments.length; i++) {
      args.push('arguments[' + i + ']');
    }

    var result = eval('content.fn(' + args + ')');
    
    delete content.fn;

    return result;
  }

  function fn1(arg) {
    console.log(1)
    console.log(this)
  }

  function fn2(arg) {
    console.log(2)
    console.log(this)
  }

  fn1.es3Call(fn2)


  /*

    es3Call 执行并传递 fn2

    进入 es3Call 内部 ctx === fn2

    content 用来存储方法的调用者

    args 用来存储 es3Call 的 arguments 

    for 循环收集 arguments 并且忽略 第1位调用者，因为第一位我们已经用 ctx 接收了

    eval 执行 content.fn(args)  
      
      后续会解释参数 args 是如何被转接的，eval会隐式toString()
      
      此时的调用者 content 是我们传入的 ctx 来自 es3Call执行时传入的 fn2    content === ctx === fn2

      content.fn 表示:  content【调用者对象】   fn【业务方法】  
        content === fn2;  content 来自 ctx, ctx 是我们传入的 fn2
        fn === fn1;  fn 来自 this, this 来自外部实际调用者 fn1.es3Call(fn2)
        注意此时 content.fn 也就是  fn1 内部的 this 已经改变，因为 content === fn2


    result 接收被改变this的业务方法【fn1】本身的返回值

    delete content.fn 因为 content.fn 的 fn 是我们扩展的私有方法【更严谨一些的话，要先判断fn是否存在】
      因为我们只是临时给某个对象【content】扩展一个方法【fn】用一下，
      调用【content.fn】，通过这个对象【content】改变业务方法内部this而已
      所以要删除
    
    返回 result
  */
```

![es3Call_01.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/249e8e20b49d4dce8ebcd64817501602~tplv-k3u1fbpfcp-watermark.image?)
### 2个 call & 更多call
```js

  Function.prototype.es3Call = function (ctx) {

    var content = ctx || window;

    content.fn = this;

    var args = [];

    for (var i = 1; i < arguments.length; i++) {
      args.push('arguments[' + i + ']');
    }

    var result = eval('content.fn(' + args + ')');
    
    delete content.fn;

    return result;
  }

  function fn1(arg) {
    console.log(1)
    console.log(this)
  }

  function fn2(arg) {
    console.log(2)
    console.log(this)
  }

  fn1.es3Call.es3Call(fn2)


  /*
    
    同上 1个 call 基本相同
    
    2个 call 第一遍执行时  
      content === ctx === fn2
      this === fn1.es3Call
      所以 content.fn 执行的时候 实际执行的是 fn1.es3Call， 请注意注意：fn1.es3Call 只是一个地址而已  fn1.es3Call === Function.prototype.es3Call
      真实执行情况是  content.fn  === fn2.es3Call()


    所以会执行 第二遍， 第二遍 es3Call 执行内部：
      此时的 ctx 是没有的 所以 content 会等于 window
      此时的 this 我们要看 第一遍执行时 content.fn 的 content是谁，很明显是fn2
      所以 content.fn 执行的时候 实际执行的是 fn2
      真实执行情况是  content.fn  === window.fn2()

  */

```

![es3Call_02.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb7c3145a8cf4621be8a13d2ff9b41be~tplv-k3u1fbpfcp-watermark.image?)



## 实现细节

### call 基本用法
> 功能：改变函数, 方法内部 this 指向
```js
  // 例 1
  var obj_01 = {
      cn_name: '张三'
  }

  var obj_02 = {
      cn_name: '李四',
      sayName: function() {
          console.log(this.cn_name)
      }
  }

  obj_02.sayName()  // => 李四
  obj_02.sayName.call(obj_01) // => 张三


  // 例 2
  function sayName() {
      console.log(this.cn_name)
  }

  sayName()  // => undefined
  sayName.call(obj_01) // => 张三
  sayName.call(obj_02) // => 李四

  // 例 3 传递参数 省略了，看官请移步菜鸟教程。
```


###  简单版本 
> 至于为什么放置到 Function 对象的原型上，后续会出一期:《JS原型链》
- 该版本未处理参数，我们通常的函数和参数都是有参数的!!!
```js
Function.prototype.es3Call = function(context){
 
    context.fn = this; 
    
    context.fn(); 
    
    delete context.fn;
}

function fn1() {
  console.log('fn1 输出 this:', this)
  console.log('fn1 输出 this.customName:', this.customName)
}

fn1.customName = 'FN 1'

function fn2() {
  console.log('fn2 输出 this:', this)
  console.log('fn2 输出 this.customName:', this.customName)
}
fn2.customName = 'FN 2'

fn1.es3Call(fn2)
/*
fn1 输出 this: ƒ fn2() {
      console.log('fn2 输出 this:', this)
      console.log('fn2 输出 this.customName:', this.customName)
    }
fn1 输出 this.customName: FN 2
*/
```

### 参数处理

#### 转接参数
```js
function foo() {}  // 没意义函数，站位用

//  模拟 arguments 类数组对象
var myArguments = {
    0: foo,
    1: '张三',
    2: 18,
    length: 3
}

// 因为类数组对象是一个可迭代对象，所以可以用for循环， 后续会出一期《Generator & Iterator》
var args = [];
for (var i = 1, len = myArguments.length; i < len; i++) {
    // 过滤出第一个传参
    args.push('myArguments[' + i + ']');
}

console.log(args)  // ['myArguments[1]', 'myArguments[2]']

// eval('context.fn(' + args +')')  // 后续会用到，再解释
// 实际执行了 context.fn(args.toString())

// 后续解释
console.log(args.toString())          // myArguments[1],myArguments[2]
console.log(typeof(args.toString()))  // string
```

#### eval 隐式 toString()
```js
function foo () {}
var myArguments = {
     0: foo,
     1: '张三',
     2: 18,
     length: 3
}

// 因为myArguments是类数组对象，所以可以用for循环
var args = [];
// 过滤出第一个传参
for (var i = 1, len = myArguments.length; i < len; i++) {
  args.push('myArguments[' + i + ']');
}

function es3Call(arg1, args2) {  // args3, args4 ..  至于为什么模拟 ES3 的 es3Call方法只有一个参数? 因为只要一个this，其他的参数直接代理传递给其他方法, 例如：fn1, fn2 他们有多少个参数都行，都是通过平铺的方式传递过去的
  console.log('es3Call 中输出 arg1:', arg1)
  console.log('es3Call 中输出 args2:', args2)
}

eval('es3Call(' + args +')')   
// es3Call 中输出 arg1: 张三
// es3Call 中输出 args2: 18

// 相当于代理传递参数， 等同于：  
var arr = ['张三', 18]

function test(name, age) {
    console.log(name)
    console.log(age)
} 

test(...arr)
// 张三
// 18
```



## 测试 完整代码
```js
Function.prototype.es3Call = function (ctx) {
  var content = ctx || window;
  content.fn = this;

  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  var result = eval('content.fn(' + args + ')');
  delete content.fn;
  return result;
}

// 测试代码:
function fn1(arg) {
  console.group('fn 111 中顺序输出 arg, this, this.customName:')
  console.log(arg)
  console.log(this)
  console.log(this.customName)
  console.groupEnd()
}
fn1.customName = '我是自定义函数 FN 111'

function fn2(arg) {
  console.group('fn 222 中顺序输出 arg, this, this.customName:')
  console.log(arg)
  console.log(this)
  console.log(this.customName)
  console.groupEnd()
}
fn2.customName = '我是自定义函数 FN 222'


// 对比原生的call:

fn1.call(fn2)       // 执行fn1 => 分别输出 =>  undefined    fn2    我是自定义函数 FN 222
fn1.es3Call(fn2)    // 同上，完全一致


fn1.call(fn2, ['我是一个数组参数'])      // 执行fn1 => 分别输出 =>  ['我是一个数组参数']    fn2    我是自定义函数 FN 222
fn1.es3Call(fn2, ['我是一个数组参数'])   // 同上，完全一致



fn1.call.call(fn2)         // 执行fn2 => 分别输出 =>  undefined    window    undefined
fn1.es3Call.es3Call(fn2)   // 同上，完全一致


// 特别注意： 
// 此处 this 变成了 我们传递进去的参数了!!!
// 原生 call 方法也是有问题的，因为不是为了连续call而设计的!!!  连续调用call没有意义
fn1.call.call(fn2, ['我是一个数组参数'])             // 执行fn2 => 分别输出 =>  undefined    ['我是一个数组参数']    undefined
fn1.es3Call.es3Call(fn2, ['我是一个数组参数'])       // 同上，完全一致
```
