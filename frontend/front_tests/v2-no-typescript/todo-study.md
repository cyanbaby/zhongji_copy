# study todo list


## pendding

### router中的魔法注释代码
```js
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
```
- [三种懒加载和区别](http://t.zoukankan.com/jiangxiaoming-p-13618833.html)
- [聊聊 webpack 异步加载（三）：webpack 如何做到持久化缓存](https://zhuanlan.zhihu.com/p/115100052)
- [webpack动态加载打包chunk命名](https://www.cnblogs.com/dahe1989/p/11543832.html)

### 地区树结构如何拍平
- 遍历呢，其他操作呢

### 虚拟列表
- 类似的前端技能原理都在此demo学习

### 模块化导入导出继承
- 例如 mixins


### 技术胖Vuex和变形，大地Vuex