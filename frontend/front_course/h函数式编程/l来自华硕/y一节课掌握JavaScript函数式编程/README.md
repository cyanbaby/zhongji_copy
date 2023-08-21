# 函数式编程

## 函数式编程含义

- 函数式编程是一种强调以函数使用为主的软件开发风格，也是一种范式
- 某些函数式编程语言 Haskell, lisp, Scheme 等

## js 中函数式编程

- 数学中的函数 f(x) = y
- js 中的函数

```js
let factor = 3
let totalNum = (num) => factor * num

console.log(totalNum(3))
```

- 对比两种函数，基于数学函数来修复 js 函数

```js
let totalNum = (num, factor) => factor * num

console.log(totalNum(3, 3))
```

- js 是多范式编程语言，但是函数作为一等公民，函数式编程具有天然优势。

## 函数式编程涉及到的概念

### 纯函数

- 函数式编程基于纯函数
  - 纯函数是对给定的输入返还相同输出的函数; 例如
  ```js
  let double = (value) => value * 2
  ```
- 纯函数意义
  - 纯函数可以产生可测试的代码
  - 不依赖外部环境计算，不会产生副作用，提高函数的复用性。
  ```js
  test('double(2) 等于 4', () => {
      expect(double(2)).toBe(4)
  })
  - 可读性更强，js函数不管是否是纯函数，都会有一个语义化的名称，更便于阅读。
  - 可以组装成复杂任务的可能性，符合模块化概念及单一职责原则。
  ```

### 高阶函数

- 高阶函数定义: 以函数作为输入或者输出的函数被称为高阶函数(Higher-Order Function)
- 高阶函数的抽象
  - 一般高阶函数用于抽象通用问题, 简而言之，高阶函数就是定义抽象。
    - 命令式循环（注重"如何"做，注重过程）
    ```js
    let arr = [1, 2, 3]
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i])
    }
    ```
    - 通过高阶函数抽象过程，声明式编程（注重做"什么"，注重结果）
    ```js
    
    ```

### 柯里化

### 组合(composition) 和 管道(pipe)

#### 组合 composition

#### 管道 pipe

### js 函数式编程库

## 函数式编程在 redux 中应用
