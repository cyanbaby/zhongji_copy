# Express
[express 4.x 中文文档](http://expressjs.jser.us/4x_zh-cn/api.html)

[express 4.x 中文文档 - 菜鸟](https://www.runoob.com/w3cnote/express-4-x-api.html)

[Express.js 中文文档 - 面圈网](https://www.mianshigee.com/tutorial/ExpressJS-zh-doc)

[Express.js 5.x - 官网](https://www.expressjs.com.cn/5x/api.html#app.get.method)

## server.js

### issues

- AOP 面向切片编程  √ demo_01_AOP

- 前面的req对象上可以扩展属性，后面的req可以获取， 不同的路由就不能获取了 √


- TODO zg: next 函数的作用?
  - get请求中有无next()执行的区别是什么?

- [TODO zg: 什么是中间件?](https://juejin.cn/post/7051476167836041246#heading-20)
  - 了解express中间件之前一定要先弄清楚，express 路由匹配规则

- TODO zg: 洋葱模型怎么理解?
  - TODO zg: get post .. use 执行顺序

### 文献
* express 路由匹配规则

  - 两个相同get('/a') 路由，哪个响应? √
    ```js
      nodemon server.js
      curl localhost:8080/a
    ```
    - 前面的先输出，后面也会输出 
    - 前面排除错误，后面不会执行了

  - [express 的app.use()和app.all()的区别](https://segmentfault.com/q/1010000017355709)
    - keyword: all是路由中指代所有的请求方式
    - keyword: app.all('*',callback)

### other
- [express路由的几种匹配模式](https://blog.csdn.net/liangzhenmeng/article/details/126807444?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EAD_ESQUERY%7Eyljh-1-126807444-blog-119336295.pc_relevant_aa2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EAD_ESQUERY%7Eyljh-1-126807444-blog-119336295.pc_relevant_aa2&utm_relevant_index=2)
- [Express的使用方法，路由的匹配与使用](https://blog.csdn.net/TangJing_/article/details/119336295)
- [GOF的23种设计模式](https://www.jianshu.com/p/da3ffb955a93)



## TODO 

* [InversifyJS](http://febeacon.com/inversifyjs_docs_cn/routes/wiki/support_for_classes.html)
  * [InversifyJS 中文文档](https://dev.to/jefftian/inversifyjs-2de0)
  * [InversifyJS 是一个工具，它能帮助 JavaScript 开发者，写出出色的面向对象设计的代码。](https://doc.inversify.cloud/zh_cn/)

* 相关小册
  * [ 基于 Node 的 DevOps 实战](https://juejin.cn/book/6948353204648148995?utm_source=web_article&enter_from=article_detail)
  * [从 0 到 1 实现一套 CI/CD 流程](https://juejin.cn/book/6897616008173846543?utm_source=web_article&enter_from=article_detail)

- 什么是中间件？
  * [什么是中间件 FE](https://www.google.com) 
  * [大厂面试题每日一题 - express 中间件的原理是什么](https://q.shanyue.tech/fe/node/492.html)
  * [中间件模式.md](https://github.com/chijitui/fe-learning/blob/master/Node.js/%E4%B8%AD%E9%97%B4%E4%BB%B6%E6%A8%A1%E5%BC%8F.md)
  * [中间件一词的由来](https://www.zhihu.com/question/19730582)

- express和koa中间件的区别？
  - 什么是洋葱模型？什么是线性模型，线性模型？

  * [对于express VS koa 中间件机制的理解](https://juejin.cn/post/7127195653884608549)
    - todo coding
    - keyword: 其实这种输出的结果是由于代码的同步运行导致的，并不是说 Express 不是线性的模型。

  * [Koa之洋葱模型分析](https://juejin.cn/post/7095566716347875336)
    - keyword: 洋葱模型，源码分析

  * [Node 小册 ｜ Express 入门 ](https://juejin.cn/post/6942499936516702221)
    - todo 文件上传，处理异步场景

  * [express分析和对比](https://segmentfault.com/a/1190000013710406)
    - keyword: 网上很多文章都说一个是线性的,一个是洋葱模型。因为两个我都研究过,我觉的这种说法不对,其实执行的时候都是洋葱形。

  * [koa与express的中间件机制揭秘](https://cloud.tencent.com/developer/article/1467268)
    - todo coding
    - keyword: 什么情况，彻底懵逼状态，这和koa好像没哈区别吗，express按照这个结果也是洋葱型啊。
    - keyword: express是在调用res.send就结束响应了，而koa则是在中间件调用完成之后，在洋葱的最外层，由koa调用res.send方法。

  * [多维度分析 Express、Koa 之间的区别](https://zhuanlan.zhihu.com/p/115339314)
    - keyword: Koa1 是一个过度版，因此也有必要了解下，它是利用 generator 函数生成器 + co 来实现的 “协程响应”
    - keyword: 不也是洋葱模型吗？
    - todo co.js
    - todo coding

  * [深入了解express 框架中间件](https://blog.csdn.net/weixin_43288714/article/details/115260518)
    - keyword: 线性中间件
    - keyword: 洋葱模型
    - keyword: express的中间件，next()之后不要再写任何东西，因为是没有意义的
    - todo coding

  * [详细解析koa洋葱模型的设计思想](https://juejin.cn/post/7140860497330438181#heading-7)
    - keyword: 中间件在前端业务场景的应用
    - todo 职责链模式

  * [express 路由，中间件 - 中文文档](https://learnku.com/docs/express/4/route/5100)

  * [koa和express有哪些不同？](https://fe.ecool.fun/topic-answer/bce43604-1941-4945-bade-2e6622f4420f)

  * [express 和 koa 的前世今生](https://www.jianshu.com/p/d83c3e6ba7f9)
    - todo 如何查看一个技术的发展简史
  
- [前端性能优化设计12问](https://ke.segmentfault.com/course/1650000037651959?utm_source=segmentfault&utm_medium=banner_Tlink)
  - [前端性能优化设计12问 - google](https://www.google.com/search?q=%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E8%AE%BE%E8%AE%A112%E9%97%AE&oq=%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E8%AE%BE%E8%AE%A112%E9%97%AE&aqs=chrome..69i57j69i61l2.444j0j7&sourceid=chrome&ie=UTF-8)