# [第十七章 手写PROMISE核心代码，提升JAVASCRIPT编程能力，加深JS..](https://www.bilibili.com/video/BV137411e7KA?p=1)
[文档 - Promise](https://doc.houdunren.com/js/15%20Promise.html#promise)

## 1 课程介绍
## 2 声明PROMISE类并绑定THIS
## 3 状态保护与执行者异步捕获
demo_03_01.html 合并

## 4 THEN的基础构建
demo_04_01.html

## 5 实现THEN的异步操作与异常捕获
demo_05_01.html

## 6 PROMISE的PENDDING状态处理
demo_06_01.html

## 7 PENDING状态异常处理
demo_07_01.html

## 8 PENDING的异步任务处理技巧
demo_08_01.html

## 9 THEN链式操作原理分析
demo_09_01.html

## 10 实现PROMISE链式操作
## 11 THEN新增PROMISE异常处理
demo_10_01.html 合并

## 12 实现THEN的穿透传递
demo_12_01.html 合并  
then方法return一个Promise对象，下一次.then就能继续符合Promise/A+设计规范的调用
then(缺省)，空then()执行后能把上一次promise返回的value,接力传递下一个then，是因为then方法里判断function类型，帮我们填补了缺省的onFulfilled & onRejected，这两个方法接收和返回了value，并且在return新的Promise的构造器函数里执行了，拿到返回值之后resolve(value)了

## 13 THEN返回PROMISE的处理
demo_13_01.html onFulfilled & onRejected 中判断上一个then中返回的什么类型的数据，是否是Promise 如果是就得处理一下，简化写法就是继续传递

## 14 THEN代码冗余优化
demo_14_01.html 封装parse公共方法

## 15 PROMISE返回类型约束
demo_15_01

## 16 实现RESOLVE与REJECT
demo_16_01

## 17 PROMISE的ALL方法实现
demo_17_01

## 18 PROMISE的RACE静态方法实现