## [2分钟了解 JavaScript Event Loop | 面试必备](https://www.bilibili.com/video/BV1kf4y1U7Ln/?spm_id_from=333.788.recommend_more_video.-1&vd_source=c17dd0ec8816e48357d2c9a7c827986c)
调用栈 call stack

消息队列 Message Queue
微任务队列 Microatsk Queue


JS异步的操作，例如：Fetch, 事件回调，setTimeout/setInterval的回调函数会入队消息队列叫做"消息"，"消息"会在调用栈清空的时候执行

使用Promise，async/await 创建的异步操作会被压入到 微任务队列中，会在调用栈清空的时候立即执行，并且处理期间加入的微任务也会一同执行


todo setTimeout延迟参数只是最小延迟时间，不是实际延迟时间，传参0，实际延迟多少毫秒？
todo 消息队列 和 微任务队列？那宏任务，宏任务队列是啥？
todo 什么操作加入什么队列？
todo 队列之间有执行优先级吗？


## [lesson_02 全面彻底掌握Javascript面试重点 Event loop 事件轮询以及微任务和宏任务](https://www.bilibili.com/video/BV1Si4y1c7rh/?spm_id_from=333.788.recommend_more_video.4&vd_source=c17dd0ec8816e48357d2c9a7c827986c)
### JS异步进阶 先看两个面试题
面试题：
  请描述Event Loop(事件循环/事件轮询)的机制，可画图
  什么是宏任务和微任务，两者有什么区别？
  Promise有哪三种状态？如何变化？
  todo 题的截图
### event loop是什么
  JS是单线程的
  异步要基于回调来实现
  Event Loop 就是异步回调的实现原理

JS 如何执行？
先把同步代码执行完，在执行异步



### event loop 的执行过程
图
browser console      Call Stack     Web APIS



                      Event Loop     Callback Queue

todo 多个定时任务，时间同时到了之后 往 Callback Queue 入回调队列的时候会不会有竞态？
todo 什么时机执行 Callback Queue 回调队列里面的函数？


遇到异步代码，会先"记录"下，等待时机（定时，网络请求等），时机到了
就移动到回调队列 Callback Queue
然后继续轮询查找（永动机一样）


### event loop和DOM事件的关系
DOM 时间也是使用回调，基于 Event Loop

todo DOM渲染是异步还是同步的？
todo Click事件的回调何时入队？入什么队列？

### 什么是宏任务和微任务

宏任务 macro task 和 微任务 micro task
    宏任务： setTimeout, setInterval, Ajax, DOM事件
    微任务： Promise, async/await


Event Loop 和 DOM渲染
    JS是单线程的，而且和DOM渲染共用一个线程
    JS执行的时候，得留一些时机供DOM渲染

微任务和宏任务区别
    微任务执行时机比宏任务要早(先记住)
    其他呢？

### event loop和DOM渲染的关系

### 为什么微任务比宏任务更早

每次Call Stack清空(及每次轮询结束)，即同步任务执行完【确定不是这个"及"？】
都是DOM重新渲染的机会，DOM结构如有改变则重新传染
然后再去触发下一次Event Loop

课件正确性，有待考证。

todo 正确的轮询机制
todo 为什么微任务比宏任务更早

### 微任务和宏任务的根本区别

### 解答异步问题
### 总结


## [lesson_03 -【面试题】JavaScript 宏任务、微任务和DOM渲染的顺序](https://www.bilibili.com/video/BV1uq4y1u7H7/?spm_id_from=333.788.recommend_more_video.2&vd_source=c17dd0ec8816e48357d2c9a7c827986c)

JavaScript宏任务，微任务和DOM渲染的顺序
  
  微任务 > DOM 渲染 > 宏任务

结论：
  不要在.then()中进行耗时的DOM操作
  会影响后续其他的DOM渲染和宏任务  => 但不是阻塞，阻塞是另外一个概念

  如果你想尽快的在某个时间之后更新DOM，
  那么应该卸载 .then() 里面

todo 他的课程 微任务和宏任务





## [图解：深入理解JavaScript事件循环，宏任务与微任务执行顺序 （#js）](https://www.bilibili.com/video/BV1Dr4y167MK/?spm_id_from=333.788.recommend_more_video.-1&vd_source=c17dd0ec8816e48357d2c9a7c827986c)

用户点击和JS执行click() 得到结果是不一样的。



## 其他
初学者可能会感觉难，尽量深入浅出
不要抠细节，不要扩大范围，核心是 event loop的过程
有些知识点，先记住，先不要问为什么