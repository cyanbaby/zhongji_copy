# review vue


## Vue2和Vue3响应式系统区别
for chatgpt3.5
```js
/*
问:  深入响应式系统原理Vue2和Vue3

Vue 2 和 Vue 3 都是流行的 JavaScript 框架，用于构建用户界面。它们在响应式系统的原理上有一些区别。下面我将分别介绍 Vue 2 和 Vue 3 的响应式系统原理。

Vue 2 的响应式系统原理：
在 Vue 2 中，响应式系统的核心是基于 Object.defineProperty。每个组件实例都有一个称为“观察者”（Watcher）的对象，它会跟踪组件中所有使用响应式数据的地方。当数据发生变化时，观察者会通知相应的依赖进行更新。

Object.defineProperty：Vue 2 使用 Object.defineProperty 来劫持对象的属性访问，从而在访问或修改属性时能够触发通知。当访问响应式对象的属性时，Vue 会将依赖收集起来，使得属性的变化能够被观察。

依赖收集：当模板中使用响应式数据时，模板编译器会在渲染函数中生成与数据相关的观察者。这些观察者会跟踪数据的变化，并将自身添加到属性的依赖列表中。

派发更新：当数据发生变化时，Vue 会通知相应的观察者进行更新。这将导致依赖的视图组件重新渲染。

Vue 3 的响应式系统原理：
Vue 3 对响应式系统进行了重写，引入了代号为“Reactivity”的新系统。这个新系统使用了 Proxy 来实现响应式，相较于 Object.defineProperty，Proxy 提供了更强大和灵活的劫持能力。

Proxy：Vue 3 使用 Proxy 对象来劫持响应式数据。Proxy 可以劫持对象的各种操作，包括属性的读取、写入、删除等，使得对数据的操作可以被捕获。

依赖跟踪：Vue 3 使用 Map 数据结构来存储属性和它们对应的依赖。当访问响应式数据时，会将正在运行的渲染函数（例如组件的 render 函数）与数据关联起来，从而建立依赖关系。

触发更新：当数据变化时，Vue 3 会通过 Proxy 捕获变化，并触发与数据相关联的依赖进行更新。这会导致渲染函数重新执行，从而更新视图。


需要注意的是，虽然 Vue 3 在响应式系统方面进行了升级，但它仍然保持了和 Vue 2 相似的编程模型和API，以便开发者能够平滑地从 Vue 2 迁移到 Vue 3。

*/
```

### TODO
- [细说 Vue 响应式原理的 10 个细节！](https://mp.weixin.qq.com/s/lSoUlgP5LXt12AUNGZqKUQ)
- [vue2-analysis](https://github.com/JsAaron/vue2-analysis/tree/master)
- [Ma63d/vue-analysis - 不在维护](https://github.com/Ma63d/vue-analysis)
- [vue-analysis - Vue.js 技术揭秘](https://github.com/ustbhuangyi/vue-analysis)
- [考拉勾教育「大前端高薪训练营」3天体验课](考拉勾教育「大前端高薪训练营」3天体验课)
- [一比一手写迷你版vue，彻底搞懂vue运行机制](https://segmentfault.com/a/1190000042546674#item-2-5)
- [learnVue](https://github.com/answershuto/learnVue/tree/master)

## TODO 
- Vue2 && Vue3 中是怎么监测数组的变化的？   
    - [蛮多问题](https://juejin.cn/post/7124351370521477128)

- Vue2和Vue3的区别
