# Vue2.7 升级 Vue3

## 目标

1. 增量升级 TypeScript Vue3 语法
2. TODO Vite?

## 拆分
1. 确认目标
  - 只做增量升级 TypeScript Vue3 语法
2. 拆分目标
  - Vue2 项目增量升级引入 TypeScript
  - Vue2 项目增量使用 Composition API

## 涉及

### 新事物

- @vue/compat
  - 它的大部分 API 和 Vue 2 保持了一致。当使用那些在 Vue 3 中发生变化或者废弃的特性时，这个版本会提出警告，从而避免兼容性问题的发生，帮助你很好地迁移项目。并且通过升级的提示信息，@vue/compat 还可以很好地帮助你学习版本之间的差异。

- gogocode
  - 阿里妈妈出品的 gogocode

- vueuse


### 风险

- d2-admin d2-crud 相关
- 主题相关(强依赖 webpack?)

## 测试

### 待测试

- Vue2.7 支持 Composition API 语法吗
  - Composition API 有哪些?
  - 如果不支持如何拓展 Composition API

- d2-admin 没有Vue 3版本，在Vue3中能否使用 d2-admin?


- ElementPlus 和 Element-ui 同时使用

### 已测试

## Todo List
## Todo Study
* [什么Vue单文件组件（SFC）?](https://blog.csdn.net/qq_20173195/article/details/126604245)
* [回首Vue的单文件组件(SFC),探索新的模式,然后一起飙车?(Vue2)](http://www.pipipi.net/14718.html/amp)
* vue.config.js => configureWebpack和chainWebpack
  * chainWebpack添加loader
    * [如何使用 webpack-chain 给 ts-loader 添加 appendTsSuffixTo 选项?  - 对比下面的文章里的 ts-loader](https://devpress.csdn.net/vue/632bdbd12b9e466d077a9dd1.html)
    * [在Vue2项目中引入typescript流程](https://juejin.cn/post/6927882445261914126)

## 参考
- [官网迁移指南](https://v3-migration.vuejs.org/zh/)
- [Vue2 大型项目升级 Vue3 详细经验总结 - √](https://blog.csdn.net/Kevinblant/article/details/126238184)
 - 可得出admin项目的升级目标可行性评测

- [手把手教你使用 Vue2 代码改成 Vue3（图文详解） - √](https://www.php.cn/vuejs/482097.html)
  - 这个可以作为一个升级手册查询
- [vue2 升级 vue3 方案](https://blog.csdn.net/majing0520/article/details/111996685)

- [应该从 vue2 升级到 vue3 吗，到底该怎么升级呢？ - √](https://cloud.tencent.com/developer/article/2144230)
  - 对于构建工具，个人没啥好的建议，你可以继续使用Webpack。毕竟现在主流还是Webpack，但是呢，如果你想使用一下Vite也是不错的选择。个人现在用的是Vite。要是时间充足学习一下Vite也挺好的，比较看好Vite
- [Vue 2 项目如何升级到 Vue 3？ - √](https://blog.csdn.net/fd2025/article/details/124860573)
- [vue2 升级 vue3 指南（二）—— 语法 warning&error 篇 ](https://www.cnblogs.com/xsilence/p/16466500.html)
- [VUE2 升级成 VUE3 的优化与区别](http://events.jianshu.io/p/65643ca9a3f2)
- [项目框架 vue2.x 版本升级到 vue3.0 版本](https://www.jianshu.com/p/9e0cf2e23602)

- [5分钟为vue-cli2构建项目添加typescript - √](https://juejin.cn/post/6844903972365402126)

- [Vite 2 + Vue 3 引入 TypeScript (和 JavaScript 混合开发)](https://www.jianshu.com/p/f8d4637320db)
- [vue2.x老项目typescript改造过程经验总结](https://zhuanlan.zhihu.com/p/384050126)
- [5分钟为vue-cli2构建项目添加typescript](https://juejin.cn/post/6844903972365402126)
- [向着Vue3进发，Vue2.7升级指南](https://juejin.cn/post/7115688305215143949)
  - TODO 但@vue/composition-api里的一些API，如createApp，并未完全在Vue2.7里移植  有哪些?

- [Vue2项目引入Typescript记录](https://juejin.cn/post/7043999977680404488)
  - [在Vue2项目中引入typescript流程](https://juejin.cn/post/6927882445261914126)
  - 报错解决
    - ...vue?vue&type=script&lang=ts&setup=true&
    - ...Non-string value passed to `ts.resolveTypeReferenceDirective`, likely by a wrapping package working with an outdated `resolveTypeReferenceDirectives` signature. This is probably not a problem in TS itself.
    — 上面两个错误通过  npm i ts-node@latest -D 解决
	
- [](https://github.com/vuejs/composition-api/blob/HEAD/README.zh-CN.md)
