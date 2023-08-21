# [Web全栈开发工程师 教程（共150小时）](https://www.youtube.com/playlist?list=PLkNxDxyJqb-xwnjm94_4EDgblU44-bRe5)
todo 百度云盘 => 架构师 => 开课吧web全栈架构师第16期(2020完结)

## 01 课vue组件化实践
### 课程目标
1. 深入理解Vue的组件化机制
2. 掌握Vue组件化常用技术
3. 能够设计并实现多种类型的组件
4. 加深对一些vue原理的理解
5. 学会看开源组件库源码

### 知识要点
1. 组件通信方式盘点
2. 组件符合
3. 递归组件
4. 组件构造函数和示例
5. 渲染函数
6. 组件挂载

### 运行环境
node 12.x
vue.js 2.6x
vue-cli 4.x
[npm依赖包版本号~和^和*的区别](https://blog.csdn.net/sndgv926468/article/details/124053502)
[@Vue/CLI 4 的配置方法](https://www.jianshu.com/p/2bd676a374ce/)
[vue脚手架创建项目时的 linter / formatter 配置选择](https://blog.csdn.net/weixin_42069147/article/details/114262216)

### 组件通信
> 没有iview的组件化可是讲得好
> todo 什么是vue的高阶组件 => [[vue] 你了解什么是高阶组件吗？可否举个例子说明下](https://blog.csdn.net/weixin_43392489/article/details/114180179)


- props(父传子)
- 自定义事件(子传父)
- eventbus(事件总线,Vue.prototype.$bus =>  发布订阅模式 源码很简单)
- vuex
- 边界情况
   -  $parent  => 最终的监听这还是子组件
   -  $children => UI库可选的方式(
      - $children不能保证顺序，
      - 某子组件可能是异步组件，
      - 异步加载进来的，声明在前，加载位置在后)
   -  $root
   -  $refs
- provide/inject => 业务中很少用，UI库常用
  - provide 定义的数据不是响应式的，但是传递一个引用类型也是可行的，还有传递this
  - inject可以起别名
- 非prop特性
   -  $attrs => 当前组件没有用props接受的剩余v-bind数据会被收集到$attrs里
   -  $listeners => 封装的一个组件，我还想给他一个回调函数去调用

### 复合组件，内容分发 =>  说白了就是插槽
- 作用域插槽 普通插槽
  - 插的template 里面的数据来自父组件还是子组件
  - 父组件使用子组件包括的插削 里面使用子组件的数据

### 通用表单组件 => 类el-form
- 实现KForm: 1. 指定数据， 2. 校验规则

- 通用组件注意事项：
  - 高内聚，低耦合

校验包： npm i async-validator -S


思维导图：
  Vue组件化
    常见的组件化技术：
      组件通信：..
      内容分发: ..
      组件实例创建和挂载：
        实例创建：
          通过Vue构造函数创建，此时组件实例作为根组件的孩子 
          new Vue({ render() { Component } })
          获得组件的构造函数并实例化
          const Ctor = Vue.extend(Component)
          const comp = new Ctor({ propsDate: props })
        挂载: 虚拟DOM转真是DOM & $mount
      递归组件
      混入mixins
      函数式组件
      抽象组件
    实战：
      Form FormItem Input => v-model,provide/inject,slot
      弹窗组件 => 
        创建指定组件实例
          extend 
          new Vue({ render(h) { retrun h() } })  
        $mount(dom)挂载 
        $el获取dom


```js
/*
  1. 尝试解决 Input 里面 $parent派发事件不够健壮的问题
      dispatch (iview组件化讲过)
      wathc value => this.dispatch('ElFormItem', 'el.form.change', [val])
  1.1 $children问题 => 多种方式
      课程里讲的push也可以
      (iview组件化获取组件)  

  2. 组件实例创建的另一种解决方案
        const Ctor = Vue.extend(Component)
        const comp = new Ctor({ propsDate: props })
        comp.$mount()
        document.body.appendChild(comp.$el)
        comp.remove = () => {
          // 移除dom
          document.body.removeChild(comp.$el)
          // 销毁组件
          comp.$destroy()
        }
  3. 使用插件进一步封装便于使用 create.js
        import Notice from "@/components/Notice.vue"
        // ..
        export default {
          install(Vue) {
            Vue.prototype.$notive = function(options) {
              retrun create(Notice, options)
            }
          }
        }
*/
```

### 百度云盘找到对应的课程了
D:\course\架构师\开课吧web全栈架构师第16期(2020完结)-20190-Web架构师\01.vue\

后续课程直接看本地视频

[课程少了一部分讲 弹窗组件的，找到类似的讲解，或者直接看课程代码](https://juejin.cn/post/6857041049413091335)
[Vue弹窗组件封装](https://wenku.baidu.com/view/2936c60232126edb6f1aff00bed5b9f3f90f723f.html)
[vue-组件挂载mount](https://juejin.cn/post/6857041049413091335)

注意：
  百度云盘下载的itspxx的 => 本地已删除
  [666java - 展辉大哥](https://666java.com)
    snnaenu
    snnaenue
666java 的课程:
  有kkb30期的比较新，可在线观看视频
  课程比较完整
