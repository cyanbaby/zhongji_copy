
### 参考
[技术胖 - vuex](https://jspang.com/detailed?id=27)
[大数据最佳实践 - vuex](https://bigdata.bihell.com/language/javascript/vue/vuex.html)
[Vue Router - 官网](https://router.vuejs.org/zh/guide/essentials/named-routes.html)
[路由守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#组件内的守卫)
[生命周期](https://medium.com/小彥彥的前端五四三/vue-js-vue的生命周期-fc971fac8298)
[this.nextTick()](https://juejin.im/post/5a6fdb846fb9a01cc0268618)
[Vuex - 官网 - 搜preserveState](https://vuex.vuejs.org/zh/guide/modules.html)

### TODO
> 每一个 Vuex 应用的核心就是 store（仓库）。store 基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
* 项目结构参考vue-element-admin
* 什么是动态路由，路由传值方式有几种
* href为什么会刷新，to不会
* 路由相关 next()
* elementUI自带的导航 @select="handleSelect"
* vueRouter返回(go back)
* 路由相关(传参，嵌套，多视图) -> vuex相关(命名空间)
* 使用多个Store
* dispatch
* Getter 传参
* 动态给 state: { student: {name: '小明'} } student添加属性
* best-practice-06是否影响其他的jspang的组件的vuex
* 模块内部的 action、mutation 和 getter 默认可是注册在全局命名空间的，这样使得多个模块能够对同一 mutation 或 action 作出响应。
* 花裤衩 utils, directive, filters, vendor, icons
* 自动生成对应路由的导航栏，面包屑
* 切换路由过快，App.vue的settimeout还会不会执行
* 如何知道没有匹配到路由，踢404
* todo 嵌套路由和多视图
* vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起