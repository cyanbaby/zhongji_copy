
# [Vue.js 实战系列](https://www.bilibili.com/video/BV1rs411u75R/)
[目录](https://ke.segmentfault.com/course/1650000011074057)
todo 视频目录里多了一个 Vue.js 实战之高阶用法
[pdf和ppt- 最下方](https://ke.segmentfault.com/course/1650000011074057/section/1500000009448056)
[作者GitHub](https://github.com/icarusion)
vue解放生产力
vue开发会忘掉很多原生js的东西，vue产生了一种开发模式，不能忘了网页是怎么工作的，比例spa原理，模块加载器，render函数，iview组件怎么写，很多原理需要知道。

## [todo iView 实战系列教程(21课时)](https://ke.segmentfault.com/course/1650000016424063#nav-section-list-title)
[bilibi](https://www.bilibili.com/video/BV1Qv411L7Gs?from=search&seid=6994962729185709652&spm_id_from=333.337.0.0)
[todo Aresn vue.js实战](baidu.com)

## 组件篇
* 组件需要注册才能使用: 全局注册和局部注册
* 组件和Vue实例类似，基本可以使用所有内容
* 使用props传递数据，单向数据流（demo01）、todo 组件v-model多个值
* 数据验证（props还可以要求必传或自定义验证）
* 经典父子通信props,$emit， todo 组件通信大全
* event bus 非父子组件通信
* 父链，子链 this.$parent，this.$children，不推荐直接使用太多，解耦，理想状态是组件自己的数据只能通过自己修改
  * 牛逼的人可以把bus封装成一个插件，this.$bus 比 vuex 爽的多
  * $refs访问区分子组件索引ref，字符集渲染完成后才填充，并且费响应式的，应急方案， 事实是大量在使用。iview虽然没用，但是封装了自己的dispatch和broadcast以及assist.js
* 使用slot分发内容
  *  ppt中的图
  *  app不知道自己的挂载点会有什么内容，因为可以自己定义、app可能有自己的模板，除了slot内容可能还有自己的内容
  *  app作用域
  * ..
* 动态组件 dynamic， todo .vue文件试试
* 异步组件
* ..
* todo [MutationObserver](https://juejin.cn/post/6984247319537385502)  [serImmediate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate
* todo [1:11:44 git相关](https://www.bilibili.com/video/BV1rs411u75R/)
* todo 方法论最小化复现问题
* todo $parent $refs.. 存在即合理
* watch和计算属性的区别，简单原理和其他技巧
* todo 不同框架生命周期这种东西，提出各种疑问，去证实即可
* 多找找[vue高级进阶 - 类似](https://juejin.cn/post/6844903838818779143)
* [segmentfault思否 - 知识标签例如：vuex](https://segmentfault.com/)
* todo 很多人不会提问
  * 提问首先定义清楚问题
  * 解决问题不是难事，但是如何定义问题，事实是定义问题比解决问题要难
  * 如果你能复现你的问题，问题已经解决80%了
  * 遇到问题或者bug一定要提供一个能复现问题的最好方式，最小化复现问题
* todo 移动端页面和app
* todo mixins混入非常有用
* todo 力扣数结构..基本的数据结构与算法
* todo vue插件，比如吧$ajax放到prototype
* todo imooc就业班 大量基础demo需要补充
* todo 大屏
* todo 根据html demo补充当前组件篇的大纲

## 工程篇
* 前端工程化与webpack
  * JavaScript、CSS代码的合并和压缩
  * CSS预处理器：Less、Sass、Stylus的编译
  * 生产雪碧图（CSS Sprite）
  * ES6 转 ES5
  * 模块化 todo 模块加载器
  * Single Page Application
  * ...
* todo .babelrc、eslint相对于package.json等等配置权重
* todo 一键换皮肤
* todo Electron
* todo 核心竞争力，表格回显，动态表单，lower code，node mock，更多


## 插件篇
* [Vue.js插件怎么写](https://files-static.segmentfault.com/773/934/773934289-598066fbc9647.pdf?_upt=d7f090141644461328)
* 什么是前端路由？前端维护路由规则
  * spa 单页面富应用
    * 播放歌曲时跳转到别的页面，音乐没有中断等等
  * 后端渲染，后端维护前端模板
    * jquery+模板引擎art-template 或者 seajs或者requirejs 最后用一下gulp打包，这一套开发模式可以说是万金油，这是nodejs出现之前的场景
  * http和浏览器渲染机制
* todo [PDF目录生成](https://www.zhihu.com/question/392666875) 
* todo [响应式和自适应网页](https://segmentfault.com/a/1190000021929510)
* todo 动画篇，vue进出场动画 & 其他框架
* todo 前端优化，很重要
* todo 免费在线的mock接口的网站，免费上传图片的网站。
* [todo 实现一个$ajax](https://files-static.segmentfault.com/773/934/773934289-598066fbc9647.pdf?_upt=4069e83c1644508439)
* todo history、hashChange原生api和事件

## [Render 函数](https://files-static.segmentfault.com/399/168/3991681090-59005e7d20c90.pdf?_upt=13dd95731644545953)
* 什么是虚拟DOM
* 使用render(虚拟DOM)和不使用的区别
* todo render和template的关系
* diff运算
* 原生DOM的api
* 重绘和回流
* 浏览器渲染机制
* 26:27 VNode说明，原生DOM节点说明
* VNode主要类型
* todo 组件外层必须包含一个无用的div
* createElement用法(h)
* todo 函数化组件
* todo vue也可以使用jsx
* todo 本章需要重学，pdf需要重新看
* todo less/sass/stylus 高级用法
* todo 虚拟DOM和DOM api操作DOM的熟练度和性能对比。