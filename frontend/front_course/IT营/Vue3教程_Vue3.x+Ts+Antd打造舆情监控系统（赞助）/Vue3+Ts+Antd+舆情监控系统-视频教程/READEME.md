# [Vue3教程_Vue3.x+Ts+Antd打造舆情监控系统（赞助）](https://www.bilibili.com/video/BV1yt411e7xV?p=37&spm_id_from=pageDriver&vd_source=0efa2f40d2b0373aa1de4b8c7c1a372f)

[在线课件](http://bbs.itying.com/topic/5fbb17b95c155409a46e10ed)

[对比Vue2总结Vue3新特性(2022年最全，2.5w字！)](https://blog.csdn.net/weixin_38664300/article/details/124877908)

[windows下npm install报错node-sass无法下载安装解决笔记！](https://www.jianshu.com/p/61e7cc4ed2cf)
[npm简介和设置缓存路径](https://blog.csdn.net/niuba123456/article/details/81834889)
[浅谈node node-sass sass-loader版本对应问题](https://www.jb51.net/article/222847.htm)
[node node-sass sass-loader 版本对应](https://www.jianshu.com/p/e90b83b31f4b)
[npm install 指定版本 ^和~区别](https://blog.csdn.net/sinat_36728518/article/details/122583029)

// node -p \"[process.platform, process.arch, process.versions.modules].join('-')\" 
[win32-x64-83 - 控制台可以输出](https://github.com/sass/node-sass/releases/tag/v4.14.1)

```js
cnpm view node-sass versions
cnpm view sass-loader versions
确定 node-sass@4.12.0 之后查找对应的版本
https://blog.csdn.net/weixin_45807545/article/details/110877786
```

// 以上未解决 node-sass问题  智强博客：离线安装 node-sass
[sass-laoder 推荐使用 dart-sass](https://blog.csdn.net/weixin_42159569/article/details/121934334)


## 17、Vue3.x Teleport、使用Teleport自定义一个模态对话框的组件（19分42秒）
## 18、Vue3.x Composition API setup ref reactive toRefs 详解（上）（23分8秒）
## 19、Vue3.x Composition API setup ref reactive toRefs computed  watch watchEffect lifecycle详解（下）（35分19秒）

[vue3中ref和reactive的区别](https://blog.csdn.net/qq_36545656/article/details/123033196)
todo watch reactive方法定义响应式的数据 和  watch ref 方法定义响应式的数据 区别
[vue3: watch监听ref,reactive区别](https://blog.csdn.net/u013060778/article/details/121559668)

[v3文档 - 生命周期钩子](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)


[Vue3 理解 toRef 和 toRefs 的作用、用法、区别](https://blog.csdn.net/cookcyq__/article/details/121618833)
[Vue3开发：聊聊两兄弟toRef与toRefs的区别和应用](https://www.jiangweishan.com/article/vuejs20220324a1.html)

## 20、Vue3.x Composition API  以及 Provider Inject(18分46秒)

## 21、Vue3.x中集成Typescript 使用Typescript(上)（24分16秒）

* defineComponent中使用 data(){},  一直报这个错误，使用 setup 吧
```js
TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '{ data(): { title: string; userinfo: { username: string; }; age: number; sex: string; }; methods: { setTitle(): void; }; }' is not assignable to parameter of type 'ComponentOptionsWithObjectProps<readonly string[] | Readonly<ComponentObjectPropsOptions<Record<string, unknown>>>, unknown, unknown, {}, {}, ComponentOptionsMixin, ... 4 more ..., any>'.
      Object literal may only specify known properties, and 'data' does not exist in 
type 'ComponentOptionsWithObjectProps<readonly string[] | Readonly<ComponentObjectPropsOptions<Record<string, unknown>>>, unknown, unknown, {}, {}, ComponentOptionsMixin, ... 4 more ..., any>'.
    13 | let title: string = "我是一个home组件";
    14 | export default defineComponent({
  > 15 |   data() {
       |   ^^^^
    16 |     return {
    17 |       title,
    18 |       userinfo: {
```
[TypeScript 与选项式 API](https://www.lanmper.cn/vue/t9640.html)
[vue3中的 defineComponent与setup接收的两个参数](https://www.jianshu.com/p/50ab6ac2e3e7)




## todo
[小册上新｜玩转Vue3：升级你的前端框架](https://juejin.cn/book/7051153166443741188?utm_source=xiaocetuiwen&utm_medium=wenzhang&utm_campaign=xiaoce)