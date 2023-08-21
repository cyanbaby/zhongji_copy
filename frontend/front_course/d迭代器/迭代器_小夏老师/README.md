# [【全网首发更新完】迭代器~生成器~promise~async、await](https://www.bilibili.com/video/BV1mp4y1z7KB?spm_id_from=333.337.search-card.all.click)

## 1_迭代器~生成器~
* 统一的方式，遍历所有数据类型（数组，字符串，对象，Map,Set,TypeArray, NodeList）的遍历
### todo
* 迭代器对象是什么
* 如何实现迭代
* 遍历和代码的区别

## 2_迭代器~生成器~
### todo
* MDN Map 和 红点工厂的Map学习
* HTMLCollection和NodeList

## 3_迭代器~生成器~promise~async、await_3
* 能不能通过一种方式（执行器函数），第一次调用next(参数) value1 就能接收？ 符合视觉逻辑
* async函数 = 生成器函数 + 执行器函数（tj大神的co.js）
  
### todo
* 原生JS 迭代器模式，生成器模式

## 4_迭代器~生成器~promise~async、await_4
* 高性能promise库 => blucBird
  * jQuery 也实现了 Promise
  * Promise A+ 规范
  * ECMA 集成了 Promise
  

## 5_JS的执行机制_5
回调函数 异步解决方案 事件轮询
1. 因为JS 是 单线程, 解决方式--异步;
2. 异步的解决方案是 事件轮询;
3. 事件轮询的核心是-- 回调函数;

### todo
* 什么是DOM冲突，假设是多线程的：线程A和线程B同时修改DOM
* [执行机制 - 6:00 ](https://www.bilibili.com/video/BV1mp4y1z7KB?p=5&spm_id_from=pageDriver)
  * 调用栈 === call stack === 宏任务
  * callback queue === 事件队列
  * 异步定时器 => web APIs  => 由浏览器来管控
  * 事件轮询的方式执行 web APIs 
    * 主线程没任务就会去看（循环看）=> callback queue(事件队列，回调队列)
    * 事件轮询机制的实现方式是回调函数

## 6_promise的理解方式&amp;调用机制

## 7_promise的特性&amp;微任务
浏览器常驻的线程：
* JS引擎线程（解释和执行JS代码，JS内核-V8引擎，JS引擎用来解释执行JS代码）
* GUI线程（绘制用户界面，与JS主线程是互斥的）
* http网络请求线程（处理用户get,post等请求，返回结果后回调函数推入到任务队列）
* 定时器触发线程（setTimeout,setInterval等待时间结束后把执行函数推入到任务队列中）
* 浏览器事件处理线程（将 click，mouse等交互事件发生后讲这些事件推入到事件队列中）

他还有其他的课程  线程相关
## 8_promise.solve&amp;thenable对象

## 9_promise正片(干货多不含水分的)

## 10_promisify&amp;race&amp;all

## 11_async~await

## todo
* 他的课程
  * 面试题
  * 文件操作  分片上传
  * 文件的下载和图片的预览
  * base64编码的原理
  * react
  * 源码
  * 重写
  * 浮点数
  * 瀑布流布局  
  * BFC
  * webpack
  * ES6
  * 网络核心
  * 数组
  * 闭包
  * 性能优化
  * 惰性函数
  * 网络爬虫
  * 模式
  * flex
  * 百度搜索调教指南
  * 树形结构
  * H5
  * 网络
  * typescript
  * vacode插件
  * react hook
  * 综合项目实战
  * html5和css3实战开发案例
  * ECMAScript全集
  * 提高学习效率