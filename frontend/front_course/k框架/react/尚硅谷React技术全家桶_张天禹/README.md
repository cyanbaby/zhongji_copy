# [尚硅谷React技术全家桶全套完整版（零基础入门到精通男神天禹老师亲授） - 2020年10月28日](https://www.bilibili.com/video/BV1wy4y1D7JT?spm_id_from=333.337.search-card.all.click)

## 001_尚硅谷react教程_react简介

React 是什么？
  React 用于构建用户界面的 JavaScript 库
  - react 是一个将数据渲染为HTML视图的开源 JavaScript 库

  FaceBook 2013年5月正式开源 React

TODO 主流版本有哪些？

为什么要学 React？
1. 原生 JavaScript 操作DOM繁琐，效率低（DOM-API 操作 UI）
2. 使用 JavaScript 直接操作DOM，浏览器会进行大量重绘和回流
 - TODO 浏览器的重绘（Repaint）和回流（Reflow）
 - GPT: 请帮我详细介绍一下浏览器的重绘和回流，我是一个前端开发者
3. 原生JavaScript 并没有组件化编码方案，代码复用率低。

React 的特点有哪些？
1. 采用组件化模式、声明式编码，提高开发效率及组件复用率
2. 在React Native中可以使用React语法进行移动端开发
3. 使用虚拟DOM+优秀的Diffing 算法，尽量减少与真实DOM的交互

学习React之前你要掌握的JavaScript基础知识
- 判断this的指向
- class(类)
- ES6语法规范
- npm包管理器
- 原型、原型链数组常用方法
- 模块化

## 002_尚硅谷react教程_hello_react案例
read:
源码\react全家桶资料\01_课件\尚硅谷react全家桶.docx
源码\react全家桶资料\03_依赖包\旧版本
源码\react全家桶资料\03_依赖包\新版本

babel.min.js - 解析JSX语法代码转为JS代码的库
react.development.js - 核心库
react-dom.development.js - 提供操作DOM的react扩展库
prop-types.js

run:
源码\chapter1_react_basic\01_hello_react\hello_react.html

虚拟DOM示例：
```js
const VDOM = React.createElement('xx',{id:'xx'},'xx')
```

## 003_尚硅谷react教程_虚拟DOM的两种创建方式
## 004_尚硅谷react教程_虚拟DOM与真实DOM
run:
源码\chapter1_react_basic\02_虚拟DOM的两种创建方式


## 005_尚硅谷react教程_jsx语法规则
run:
源码\chapter1_react_basic\03_jsx语法规则

1.全称:  JavaScript XML

TODO XML

## 006_尚硅谷react教程_jsx小练习
run:
源码\chapter1_react_basic\04_jsx的小练习
- 演示了JSXz中映射列表数据


001~006合并了
### todo
* vue 有没有虚拟Dom
* react和vue 脚手架搭建过程
* react navtive学习
* 重绘 回流， 重排 重绘
* 最小化拆分模块和组件？
* react新旧版本？使用区别开始分新旧？
* 在线版本babel能转换import语法？
* diff算法实在核心库还是在Dom扩展库？
* React.createElement()是不是创建虚拟Dom？ 和jsx关系
* 真实dom加debugger对比虚拟Dom 轻重
* xml语法学习过了哦 对比JSON
* jsx语法规则  react开发者工具
* 组件多包裹一层div盒子  vue怎么处理的呢？ 比如父子多个属性 合并？

## 007_尚硅谷react教程_组件与模块
typora 泰 po ra

read:
源码\react全家桶资料\01_课件\尚硅谷react全家桶.docx

### todo
* GPT: 前端模块化常见高频的面试题有哪些？
* GPT: 前端组件化常见高频的面试题有哪些？
* GPT: 前端模块化和组件化区别
* GPT: 软件开发模块化和组件化区别

* GPT: 什么是前端工程化

## 008_尚硅谷react教程_开发者工具的安装
react dev tools
没打包上线，chrome插件图标显示红色

react dev tools 在chrome控制台中的 Profiler 面板是什么

### todo
* vue开发者工具使用
* chrome性能面板使用
* 前端debugger技巧，浏览器啊，node啊

## 009_尚硅谷react教程_函数式组件
* [babel/repl](https://babeljs.io/repl)

### todo
* GPT: JS严格模式相关面试题
  - 禁止自定义的函数里this指向window
* GPT: babel学习和面试题

run:
源码\chapter1_react_basic\05_react中定义组件

## 010_尚硅谷react教程_复习类相关知识

run:
源码\chapter1_react_basic\复习\1_类的基本知识.html

### todo
* ES6其他新特性学习
* 面试题：ES6的 class 和 extends 继承是ES5的哪种继承？
* 面试题：imooc继承的6条规则，ES5的多种继承方式

## 011_尚硅谷react教程_类式组件
* [React中文网](https://react.docschina.org/)
* 要不要写构造器？如何写构造器？

read:
源码\react全家桶资料\01_课件\尚硅谷react全家桶.docx

### todo
* 如何区分React简单组件和复杂组件
  - 有状态的是复杂组件

## 012_尚硅谷react教程_对state的理解

### todo
* 最新版本的React 推出的 hooks 可以让函数式组件拥有三大属性？
* iview课程：如何写一个iview组件（vue的UI组件）

## 013_尚硅谷react教程_初始化state
run:
源码\chapter1_react_basic\06_组件实例三大属性1_state

## 014_尚硅谷react教程_react中的事件绑定

run:
源码\chapter1_react_basic\复习\2_原生事件绑定.html

* React推荐使用第三种绑定click方式  html里指令绑定

### todo
* 自己写过的原生click事件  zhongji

## 015_尚硅谷react教程_类中方法中的this
### todo
* this和执行上下文 对复习中的 3_类方法中的this指向.html 展开学习
  * this等于调用者所在..

## 016_尚硅谷react教程_解决类中this指向问题

## 017_尚硅谷react教程_setState的使用
* 构造器调用几次？ ———— 1+n次（几处使用了组件）
* render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数

### todo
* 1_state_self2.html setState可以更改this.test吗？ 可以


## 018_尚硅谷react教程_state的简写方式
* 3_类方法中的this指向.html
* demo01 demo02.. 90%都是和人交互的，都是作为事件在使用
* 箭头函数解决 constructor中大量的 demo01.bind.this
  * 直接 change = function() {} 等于不是放在当前构造函数的原型上了 而是一个属性了
* 初始化state简写，省略 constructor
  * 如果想给每个实例添加一个轮子属性，而且值也是固定的，没必要往constructor里写，简写即可 state = xxx

### todo
* 研究一下ES6 class  参考这个 3_类方法中的this指向.html
  * 原型方法 自己属性（方法）
  * 私有变量
  * 简写？

## 019_尚硅谷react教程_总结state



### todo
* 看一下word文件的总结：例如：组件就是状态机
* class没有一种方式把run(){} 函数放到原型上的时候 放一个箭头函数？不行的


## 020_尚硅谷react教程_props的基本使用
* 组件传值和"..."扩展简写传值给组件

## 021_尚硅谷react教程_批量传递props
* 4_展开运算符.html
### todo
* 后盾人 海豚日记 ES6课程

## 022_尚硅谷react教程_对props进行限制  
* 传递Number age={19}
* prop-types.js => Person.propTypes
  * prop-types.js 是什么？
  * prop-types.js 其他使用，例如默认值 多类型 对规则呢？

## 023_尚硅谷react教程_props的简写方式
* props是只读的
### todo
* ES6的class的static  A.xxx静态属性？

## 024_尚硅谷react教程_类式组件中的构造器与props
### todo 
* constructor可以省略
  * 没省略的话形参接不接，super传不传的影响呢？

## 025_尚硅谷react教程_函数式组件使用props
* 函数式组件接受props
### todo
* React函数式组件一般咋用？  Vue2.x有没有函数式组件？
  * state? refs? 事件呢？  hooks例外？

## 026_尚硅谷react教程_总结props

## 027_尚硅谷react教程_字符串形式的ref

## 028_尚硅谷react教程_回调形式的ref
* 字符串的ref值不被React所推荐了
  * 推荐使用 React.createRef 和 回调函数形式的
  * 过时的API：String类型的Refs
    * 字符串的ref存在效率问题 => 效率不高 => why?
    * 未来会被移除，16.8还没移除呢

## 029_尚硅谷react教程_回调ref中调用次数的问题
* ref回调函数 内联函数 更新会被执行两次 第一次是 @ => null  第二次才是DOM
  * 之前的函数被释放了
  * React不确定之前的函数（旧的函数要释放呀）是否被完美的清空，所以React帮我们清空了一次之后，在调用第二次
* 避免这个问题
  * ref={this.saveInput}

## 030_尚硅谷react教程_createRef的使用

## 031_尚硅谷react教程_总结ref

## 032_尚硅谷react教程_react中的事件处理
* 不要过度使用 Refs
### todo
* 事件委托&事件代理

## 033_尚硅谷react教程_非受控组件
* 表单内输入类控件的 现用现取 属于非受控组件

## 034_尚硅谷react教程_受控组件
* 受控类组件一个ref都没用，能不写就不写ref
### todo
* 复习Vue单项数据流
* 复习Vue双向数据绑定 控件类
  * JS赋值input 的 change 会被触发

## 035_尚硅谷react教程_高阶函数_函数柯里化
* 面试：高阶函数的概念 跟面试官拽概念
  * 函数作为参数传递
  * 函数返回值是函数
  * 任满足一
* 面试：柯里化
  * 函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 
### todo
* 腾讯课堂买的函数式编程的课程 => 开课吧 手机App
* Vue & React 函数式组件

## 036_尚硅谷react教程_不用柯里化的写法
* 其实还是用了 老师不知道而已

## 037_尚硅谷react教程_引出生命周期
透明度1 慢慢变成 透明度0
透明度0 瞬间变成 透明度1
点击按钮 所有DOM消失

### todo
* Vue & React 进出场动画
* Vue 自定义指令  itying大地 & jspang技术胖
* imooc2019就业班 jQuery组件化实战里的事件 动画相关

[CPU监测](http://www.winwin7.com/JC/19065.html)

## 038_尚硅谷react教程_生命周期(旧)_组件挂载流程
### todo
* React旧生命周期和新生命周期
* React & Vue 组件挂载时 更新时 卸载时 生命周期执行顺序
  * 嵌套呢

## 039_尚硅谷react教程_生命周期(旧)_setState流程
* 生命周期三条线

## 040_尚硅谷react教程_生命周期(旧)_forceUpdate流程
### todo
* forceUpdate()  正常是setState就去更新啦， 不想对状态更改，就想更新一下（有哪些业务场景？）
  * Vue的呢？

## 041_尚硅谷react教程_生命周期(旧)_父组件render流程
* componentWillReceiveProps
  * React 其他每个生命周期也要像componentWillReceiveProps一样仔细学习 & 还有Vue

## 042_尚硅谷react教程_总结生命周期(旧)

## 043_尚硅谷react教程_对比新旧生命周期
* react-dom.development 和 react.development 版本一般是对应的
* 17新版本：所有带will的都得加UNSAFE（除了 componentWillUnmout） 新版本应该避免使用他们
  * 警告componentWillMount           =>  提示18版本 必须这样写才能工作的 UNSAFE_componentWillMount
  * 警告componentWillUpdate          =>  提示18版本 必须这样写才能工作的 UNSAFE_componentWillUpdate
  * 警告componentWillReceiveProps    =>  提示18版本 必须这样写才能工作的 UNSAFE_componentWillReceiveProps
  * 未来版本异步渲染 滥用上面3个会出现bug
  * 总结： 废弃了3个，新增了两个（getDerivedStateFormPros, getSnapshotBeforeUpdate），剩下的都是一样的

## 044_尚硅谷react教程_getDerivedStateFromProps
### todo
* getDerivedStateFromProps(props,state)  => 得到一个状态 从props得到的（组件使用时传递）  这就是派生状态
  * 官网的罕见用例
  * 若state的值在任何时候时候都取决去props，可以使用（非必须，constructor也可以啊）

## 045_尚硅谷react教程_getSnapshotBeforeUpdate
* 在最近一次渲染输出（提交到 DOM 节点）之前调用
  * 它使得组件能在发生更改之前从DOM中获取一些信息（例如：滚动位置）
  * getSnapshotBeforeUpdate返回值传递给 componentDidUpdate
    * 应用场景：ul 10个项目 添加一个之后获取不到原来10个的高度了

## 046_尚硅谷react教程_getSnapshotBeforeUpdate举例
### todo
* 三大家族 => 
  * 控制台list.scrollTop = 30; list.scrollHeight 
* DOM循环key到底怎么去取值 React & Vue
* 更多的原生小功能学习 HTML/CSS/JS

## 047_尚硅谷react教程_总结生命周期(新)

## 048_尚硅谷react教程_DOM的diffing算法
### todo
* 虚拟DOM 数据结构样子
* 对比最小粒度是\<span\>
  * Diffing算法规则 还得重温一下
* 统计Vue组件通信所有方式
  * iview组件课程里面的技巧   解决多层组件嵌套 孙子，子..组件多次emit相同事件到最外层组件

## 049_尚硅谷react教程_初始化react脚手架

* [脚手架 create-react-app 创建报错](https://github.com/facebook/create-react-app/issues/11816)
  * 用npm，把config-overrides.js 照搬进去
  * [热更新报错](https://blog.csdn.net/qq_19689967/article/details/122209465)

### todo
* 从零开始搭建React脚手架
* angular是啥？是不是webpack？
* npm相关学习：
  * 切换不通node相关全局包共享吗？
  * config相关配置 => 流程？
  * 子目录会自动向外层目录查找node_modules?
* yarn
  * yarn如何安装制定版本的React？
* react脚手架如何配置webpack.config.js?
* TS+React  TS+Vue
* 工程化项目
  * 用了全自动构建工具 例如：webpack
  * 我们写了代码，项目会自动 语法检查，代码压缩，语法转换，兼容性处理..

```shell
npm i -g create-react-app@4.0.0
# 您正在运行的是“create-react-app”4.0.0，它落后于最新版本(5.0.1)。
# 我们不再支持全局安装Create React App。

npm i create-react-app@4.0.0
npx create-react-app lesson_49
# 您正在运行的是“create-react-app”4.0.0，它落后于最新版本(5.0.1)。
# 我们不再支持全局安装Create React App。

# 直接copy目录吧

# yarn eject
# 暴露所有 webpack.config.js 并不可逆
```



## 050_尚硅谷react教程_脚手架文件介绍_public

热更新报错
npm install react-error-overlay@6.0.9

todo 课件：3.1. 使用create-react-app创建react应用

### todo
* 16.8和17区别 和 18区别
  * 如何用 create-react-app@4.0.0 创建17.1 React?
* yarn 好快！ 比 npm 快多了？
* 前端方向
  * web端
    * 移动网页？
    * PC网页？
  * 移动端
    * android  java
    * ios oc(object-c) swift
    * manifest.json 加壳？ 混合App？原生？多端uniapp？科多瓦？
  * 什么是webapp？
* VueCli新版本 单组件？

## 051_尚硅谷react教程_脚手架文件介绍_src
* \<React.StrictMode> 严格模式： 例如不可 ref="demo"
* reportWebVitals() 用于记录页面性能的，页面性能监测
* setupTests.js 代码测试

## 052_尚硅谷react教程_一个简单的Hello组件
* public_bak和src_bak都是最新的
* config-overrides.js等配置也是最新的
* 直接copy对应目录 02_src_hello_react 改成src 新增一个实时的public目录 去跑项目
  * npm install react-error-overlay@6.0.9
```js
// 这不属于对象结构赋值，这是ES Module 引入统一暴露，分别暴露
// 错误示例：
import React, { ReactDOM } from 'react';
// 正确示例：
import React from 'react';
import ReactDOM from 'react-dom'

// 解释：
const React = { a: 1, b: 2 }

export class Component {}

React.Component = Component

export default React
```

### todo
* config-overrides.js 这玩意怎么回事？如何去掉，不影响项目
* [b站留言仓库](https://github.com/xzlaptt/React)
* 模块化语法必须过关，CommonJS和ES Mudles
  * 这里不是ES6的结构赋值
  * 这里是React模块分别暴露和统一暴露的区别
  * import React,{Component} from 'react'

## 053_尚硅谷react教程_样式的模块化
* 这里为什么是 index.module.css
  * 通class CSS选择器会冲突，index.js中后引入的会覆盖之前的同名样式
    * import hello from './index.module.css' （用变量接一下，然后用hello.title） 
    * 替换 import './index.module.css'
  * lsss/sass 顶层div.class区分他们 然后嵌套

## 054_尚硅谷react教程_vscode中react插件的安装
* 课程推荐 ES7 React/Redux/GraphQL/React-Native snippets
  * imp->  还有很多快捷方式
* 搜出来推荐 ES7+ React/Redux/React-Native snippets
* imp，rcc，rfc等快捷键

## 055_尚硅谷_react教程_组件化编码流程
* 拆分组件讲的真好  比imooc2019就业班的jQuery组件化讲的好
### todo
* Header => 新增form控件
* List => 列表展示
* state放在哪儿比较合适？

## 056_尚硅谷_react教程_TodoList案例_静态组件

课件\react全家桶资料\04_静态页面\todos_page

* React重构原生页面
  * class替换className="btn btn-danger" style={{display:"none"}}
  * 很经典的一步，直接copy html到父组件(App.jsx) 然后分配给子组件；  样式也是一样的，一把梭(App.css)，然后拆

### todo
* 复习开课吧Vue重构原生页面
* todo cyan笔记本的vscode的markdown插件  可以折叠markdown标题

静态组件拆分完成！html/css

## 057_尚硅谷_react教程_TodoList案例_动态初始化列表

目前还没学兄弟组件通信，暂时把todos数据放到app组件
header和list都用todos数据

List中使用Item时，扩展传值 {...todo}

input 添加  checked={done} 属性之后，会有警告，提示没有onChange
暂时用defaultChecked,后期会有bug，先用着。


## 058_尚硅谷_react教程_TodoList案例_添加todo
header组件（子）想给app组件（父），父组件传给子组件传递一个函数，函数参数可以接收数据
结合render函数，好好理解一下react数据交互模型

todo Vue组件通信的规范，单项数据流,iview的课程

## 059_尚硅谷_react教程_TodoList案例_鼠标移入效果
onMouseEnter={this.handleMouse(true)} 绑定时候可以执行某个函数并传值，但是执行后必须返回一个函数

## 060_尚硅谷_react教程_TodoList案例_添加一个todo

勾选todo 标识已完成

app传递 updateTodo 给list  list组件转手传给item

状态在哪里，操作状态的方法就在哪里（组件）

```js
let obj = { a:1, b:2 }
// 拷贝对象，重写属性值
let obj2 = {...obj, b:3}
console.log(obj2)
```


## 061_尚硅谷_react教程_TodoList案例_对props进行限制
对接收的props进行：类型、必要性的限制

## 062_尚硅谷_react教程_TodoList案例_删除一个todo

高阶函数直接写在html里，也是一样的


## 063_尚硅谷_react教程_TodoList案例_实现底部功能

reduce引用，统计真的很常用，todo 智强的文章迁移

defaultChecked只在第一次起作用，只能指定一次

## 064_尚硅谷_react教程_TodoList案例_总结TodoList案例
> 状态在哪里，操作状态的方法就在哪里（哪一层组件）

合并
2022-05-15

拆分组件 重构传统网页 提现bem规范重要性

todolist的例子 list数据放哪儿？ head和list组件都有用到就放他们共同的父组件（假设兄弟组件不能直接交互）

数组对象传递对象 子组件用扩展符...

checked和defultCheckked区别  checked必须配合
onChange 然后呢
defultChecked只能指定一次 后续无效

ToDo 表单控件如何数据交互

react子组件想要改变父组件数据  父组件传递一个人方法给子组件调用即可  还可以继续
传递给孙子组件

状态在哪里 操作状态的方法就在哪里 哪里=哪个，哪层组件

react有没有其他方式传递数据给父组件呢 例如vue的emit

uuid库专门生产唯一id  nanoid体积更小  他们原理是什么？

第三方的往上靠  自己的包往下靠  样式最后

组件状态中维护一个变量（数据）很有意思的一句话   看看之前b站异步编程课的各种技巧

es6用id加...方式更新数组对象

 vue react angular 都是解放生产力和性能之类的优点集合  react有哪些UI框架 有哪些类似于 vue-element-admin的框架（它本身有哪些同类产品）  

微服务和微前端  关系型数据库 radius呢  为何而生

去到新公司不懂的技术点 一定一定拆分单练 快手上手 快乐接受新知识

react vue angular 开发者工具至关重要

defaultChecked 不影响 onChange事件  但就是不能再更新选中了 
有onChange checked才能点击

封装一个极简Ajax 支持promise

axios支持feth了吗

微信收藏clear一下文章

课件  测试代理服务器
原来学过的node express koa 都整理一下  快速复用 和 复习

FeHelper 谷歌插件

package.json里proxy可以数组吗  对vue项目有效果吗  npm其他配置呢

代理成功之后 Chrome查看请求地址是哪儿 猜测是 webpackDevServer

react和vue配置多个代理服务器
一个服务器配置指定path 多个path

代理配置规则讲的真好
还得单独学习 对比vue的 找找规则更多情况

restful api学习  写进简历

changeOrigin配置有什么用 控制服务器获取请求头的Host字段  可以欺骗服务器 Chrome可以查看吗？
changeOrigin有对应http请求字段吗

代理配置课件有文档

书签 GitHub搜索


## 065_尚硅谷_react教程_脚手架配置代理_方法1
> 源码\react全家桶资料\06_其他\测试代理服务器\server1.js
todo word课件

服务器： 06_其他/测试代理服务器

Chrome插件：FeHelper 前端组手

方法1： 
  package.json =>  "proxy": "http://localhost:5000"
  重启react，并且所有不带主机的请求都会代理到 "http://localhost:5000"
缺陷：
  只能配置一个代理地址

## 066_尚硅谷_react教程_脚手架配置代理_方法2
* react底层会遍历它，setupProxy.js
4:50
## 067_尚硅谷_react教程_github搜索案例_静态组件
* 连续解构赋值
  * 连续结构赋值，还能改名 const { a: { b:b_value } }
  * bizlofw里面的 _.get() ? 路径赋值呢？
* 后端解决跨域 CORS 例如github

## 068_尚硅谷_react教程_github搜索案例_axios发送请求
### todo
* spes设置了代理之后，win10设置里有代理可以复制，[复制到PostMan设置proxy](https://blog.csdn.net/SjwFdb_1__1/article/details/109535643)里就可以直接用PostMan请求  https://api.github.com/search/users?q=cucurbitbaby
  * 自己的电脑的SSR呢？如何解决这个问题？ 或者问题本身就不存在？
  * nodejs(express)服务器如何设置代理请求 和 PostMan一样成功请求github接口呢
  * [http-proxy-middleware  - nodejs 未解决 - 可能是华为系统的原因](https://blog.csdn.net/Jie0817/article/details/122505898)
  * [http-proxy-middleware  - nodejs 未解决 - 可能是华为系统的原因](https://www.jianshu.com/p/a248b146c55a)
  * 回家试试，是不是华为系统限制（或者http相关的限制）
    * setupProxy.js 或者
    * nodejs 直接请求
* 正向代理，反向代理
* CORS跨域方案
* express 的 get和use的区别？

## 069_尚硅谷_react教程_github搜索案例_展示数据
* 各个组件数据利用开发者工具

## 070_尚硅谷_react教程_github搜索案例_完成案例
* React如何实现Vue的动态组件？
* saveUsers, changeLoading, ... 无数个fn传递给Search组件， 或者 简化成一个方法就updateAppState   内部的各种fn逻辑分发到Search组件内部消化
* 给List传递多个状态，可以直接 {...this.state}
* 不能写if else语句？  三元表达式， 多个状态咋办？三元表达式可以连着写
* server_bak.js

```jsx
// 连续的三元
import React, { Component } from 'react'
import './index.css'

export default class List extends Component {
	render() {
		const {users,isFirst,isLoading,err} = this.props
		return (
			<div className="row">
				{
					isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
					isLoading ? <h2>Loading......</h2> :
					err ? <h2 style={{color:'red'}}>{err}</h2> :
					users.map((userObj)=>{
						return (
							<div key={userObj.id} className="card">
								<a rel="noreferrer" href={userObj.html_url} target="_blank">
									<img alt="head_portrait" src={userObj.avatar_url} style={{width:'100px'}}/>
								</a>
								<p className="card-text">{userObj.login}</p>
							</div>
						)
					})
				}
			</div>
		)
	}
}

```

## 071_尚硅谷_react教程_消息订阅与发布技_pubsub
```js
import PubSub from 'pubsub-js'
```

### todo
* 自己写过的观察者模式和发布订阅模式&取消订阅。

## 072_尚硅谷_react教程_fetch发送请求
### todo
* promise风格 封装原生 xhr ajax请求
* huawei学习平台 chrome性能面板的课程
* fetch和Ajax区别是什么？

## 073_尚硅谷_react教程_总结github搜索案例

## 074_尚硅谷_react教程_对SPA应用的理解
history.js源码值得一学。

### todo
* 前端路由的基石_history.html
  * 前端路由原理  使用的 history.js  跟location没关系？
  * [前端路由](https://juejin.cn/post/6993840419041706014) 
  * [原生js实现](https://blog.51cto.com/u_15047485/3716413)
* hash模式兼容性好 老浏览器不支持history对象


## 075_尚硅谷_react教程_对路由的理解
## 076_尚硅谷_react教程_前端路由原理

## 077_尚硅谷_react教程_路由的基本使用
* react-router 多平台包: 
  * web,     => react-router-dom
  * native, 
  * any
* react-router-dom 和 type-props react脚手架默认不会帮我们下载需要单独安装
  * react-router-dom 是@5 2021-11月就升级到@6了 127集会说
* 印记中文

### todo
* 多个传统相同页面，用React(OR Vue & angular)组件化思维重构 抽离组件技巧 => 2023-07-31 技巧都是一样的，框架不一样而已

## 078_尚硅谷_react教程_路由组件与一般组件
* 区别 & Vue comopnent动态组件？

## 079_尚硅谷_react教程_NavLink的使用
* 和bootstarp添加class  active 碰巧了
  * activeClassName

## 080_尚硅谷_react教程_封装NavLink组件
* children 属性也可以指定xxx  \<route\>xxx\<route\>
  * 二次封装的话可以配合...写法

## 081_尚硅谷_react教程_Switch的使用
* 多一个匹配/home的Route 会继续匹配
  * Switch包裹即可

## 082_尚硅谷_react教程_解决样式丢失问题
* React脚手架默认配置 如果请求一个了不存在的资源会返回index.html
  * 直接刷新脚手架会认为这是一个请求 localhost:3000/atguigu/about， 并且返回 index.html
* 解决方案：
  1. ./css/bootstrap.css  改成 /css/bootstrap.css  改成 
  2. %PUBLIC_URL%/css/bootstrap.css  推荐用这个原理和方案1一样
  3. 使用 HashRouter

## 083_尚硅谷_react教程_路由的模糊匹配与严格匹配
* npm 和 yarn 不要混用
* Route path="/home/a/b"  Link 用 /home 精确匹配 匹配不到
* Link to="/home/a/b" Route 用 /home 模糊匹配 匹配得到
* exact={true} 或者 exact 开启严格匹配（精确匹配）
* 严格匹配的原则 不要随便开

## 084_尚硅谷_react教程_Redirect的使用
* \<Redirect to="/home" /\>

## 085_尚硅谷_react教程_嵌套路由
* home开启了 exact  嵌套路由就不行了

## 086_尚硅谷_react教程_向路由组件传递params参数
## 086_尚硅谷_react教程_向路由组件传递params参数

## 087_尚硅谷_react教程_向路由组件传递search参数

## 088_尚硅谷_react教程_向路由组件传递state参数

## 089_尚硅谷_react教程_总结路由参数
TODO 不限于 Vue和React params参数和query参数区别
TODO state参数呢?
  - history里有一个location属性
  - location还和history并级

[vue-router paramas刷新参数丢失的场景](https://blog.csdn.net/qq_41992943/article/details/115914788)

## 090_尚硅谷_react教程_push与repalce

## 091_尚硅谷_react教程_编程式路由导航

## 092_尚硅谷_react教程_withRouter的使用

## 093_尚硅谷_react教程_BrowserRouter与HashRouter

## 094_尚硅谷_react教程_antd的基本使用
[element-react](https://elemefe.github.io/element-react/index#/zh-CN/input)

## 095_尚硅谷_react教程_antd样式的按需引入

## 096_尚硅谷_react教程_antd自定义主题

## 097_尚硅谷_react教程_redux简介

## 098_尚硅谷_react教程_redux工作流程

## 099_尚硅谷_react教程_求和案例_纯react版

## 100_尚硅谷_react教程_求和案例_redux精简版

## 101_尚硅谷_react教程_求和案例_redux完整版

## 102_尚硅谷_react教程_求和案例_异步action版

## 103_尚硅谷_react教程_对react-redux的理解

## 104_尚硅谷_react教程_连接容器组件与UI组件

## 105_尚硅谷_react教程_react-redux基本使用

## 106_尚硅谷_react教程_优化1_简写mapDispatch

## 107_尚硅谷_react教程_优化2_Provider组件的使用

## 108_尚硅谷_react教程_优化3_整合UI组件与容器组件

## 109_尚硅谷_react教程_数据共享_编写Person组件

## 110_尚硅谷_react教程_数据共享_编写Person组件的reducer

## 111_尚硅谷_react教程_数据共享_完成数据共享

## 112_尚硅谷_react教程_纯函数

## 113_尚硅谷_react教程_redux开发者工具

## 114_尚硅谷_react教程_最终版

## 115_尚硅谷_react教程_项目打包运行

## 116_尚硅谷_react教程_扩展1_setState

## 117_尚硅谷_react教程_扩展2_lazyLoad

## 118_尚硅谷_react教程_扩展3_stateHook

## 119_尚硅谷_react教程_扩展4_EffectHook

## 120_尚硅谷_react教程_扩展5_RefHook

## 121_尚硅谷_react教程_扩展6_Fragment

## 122_尚硅谷_react教程_扩展7_Context

## 123_尚硅谷_react教程_扩展8_PureComponent

## 124_尚硅谷_react教程_扩展9_renderProps

## 125_尚硅谷_react教程_扩展10_ErrorBoundary

## 126_尚硅谷_react教程_组件间通信方式总结

## 127_尚硅谷_ReactRouter6教程_课程说明

## 128_尚硅谷_ReactRouter6教程_一级路由

## 129_尚硅谷_ReactRouter6教程_重定向

## 130_尚硅谷_ReactRouter6教程_NavLink高亮

## 131_尚硅谷_ReactRouter6教程_useRoutes路由表

## 132_尚硅谷_ReactRouter6教程_嵌套路由

## 133_尚硅谷_ReactRouter6教程_路由的params参数

## 134_尚硅谷_ReactRouter6教程_路由的search参数

## 135_尚硅谷_ReactRouter6教程_路由的state参数

## 136_尚硅谷_ReactRouter6教程_编程式路由导航

## 137_尚硅谷_ReactRouter6教程_useInRouterContext

## 138_尚硅谷_ReactRouter6教程_useNavigationType

## 139_尚硅谷_ReactRouter6教程_useOutlet

## 140_尚硅谷_ReactRouter6教程_useOutletuseResolvedPath

## 141_尚硅谷_ReactRouter6教程_总结