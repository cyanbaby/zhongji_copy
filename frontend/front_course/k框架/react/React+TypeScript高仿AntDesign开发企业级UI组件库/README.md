# [React+TypeScript高仿AntDesign开发企业级UI组件库](https://www.youtube.com/watch?v=FUy3LCzfaoo&list=PL5FIFxLsMtxTr1sCkaEOc_M6OmbTCV03A&index=20)
> 我的网盘> 杨展辉vReact+TypeScript高仿AntDesign开发企业级UI组件库

# 第1章 课程导学（此章节必看）

1-1  导学（不看错过1个亿） (16:40)试看

1-2  代码库使用注意事项（必看） (04:33)

1-3  2022年更新说明 (04:25)

# 第2章 欢迎来到类型的世界 - Typescript

2-1  什么是 Typescript (05:46)试看

2-2  为什么要使用 Typescript (04:56)

2-3  安装和初试 Typescript (07:06)

2-4  基础类型 (05:54)

2-5  any 类型和联合类型 (04:25)

2-6  Array 和 Tuple (06:05)

2-7  interface 初探 (06:32)

2-8  函数和类型推断 (08:06)

2-9  枚举（Enum） (07:08)

2-10  泛型（Generics） 第一部分 (07:30)

2-11  泛型（Generics） 第二部分 - 约束泛型 (06:23)

2-12  泛型（Generics） 第三部分 - 类和接口 (12:37)

2-13  类型别名和类型断言 (08:57)

2-14  声明文件 第一部分 (13:34)

## 2-15  声明文件 第二部分 (10:43)

xxx.d.ts 文件放置何处?
  - 任意位置
  - tsconfig.json => "include": ["**/*"]

高质量 xxx.d.ts
  - DefintelyTyped


2-16  内置类型 (08:36)

2-17  配置文件 (10:43)

# 第3章 神奇的 React 配合 typescript，完美输出

3-1  React简介和基础知识回顾 (14:39)

## 3-2  配置 react 开发环境 (08:50)
Mocha
 - 搜索关联出来的: 大前端的自动化工厂(5)—— 基于Karma+Mocha+Chai的单元测试


3-3  第一个组件 - ts为组件助力 (06:26)

3-4  关于 React18 FC 升级后 children 属性

React18 FC => Function Component

## 3-5  什么是 和 为什么要使用 React Hook (07:25)
React 16.8 带来的全新特性，即将替代 class 组件的写法

组件很难复用状态逻辑 - hook能解决这个问题

使用Hook之前: 使用HOC或者是 render props

复杂组件难以理解，尤其是生命周期函数，逐渐各种逻辑，副作用充斥。

```js
const some = {
  // 没法拆分，hook可以将相互关联的部分拆分为更小的函数
  componentDidMount() {
    // 组件A
    const { id } = this.props
    fetch(`xxx?id=${id}`)
    // 组件B
    document.addEveentListenner('keypress', callback)
  },
  componentDidUpdate() {
    // 组件A
    const { id } = this.props
    fetch(`xxx?id=${id}`)
  },
  componentWillUnmount() {
    const { id } = this.props
    fetch(`xxx?id=${id}`)
    // 组件B
    document.removeEveentListenner('keypress', callback)
  }
}
```


## 3-6  在函数组件使用 state - useState Hook (09:10)

hook 是一个特殊的函数，可以勾入react特性。

```js
// LikeButton.tsx
import React, { useState } from "react";

const LikeButton: React.FC = () => {
  const [obj, setObj] = useState({
    like: 0,
    on: true,
  });
  return (
    // 这里的setObj是替换整个obj对象，而不是修改obj对象的某个属性
    <>
      <button
        onClick={() => {
          setObj({ like: obj.like + 1, on: obj.on });
        }}
      >
        {obj.like}
      </button>
      <button
        onClick={() => {
          setObj({ like: obj.like, on: !obj.on });
        }}
      >
        {obj.on ? "ON" : "OFF"}
      </button>
    </>
  );
};

export default LikeButton;

```

```js
import React, { useState } from 'react'

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  return (
    <>
      <button onClick={() => { setLike(like + 1) }}>
        {like}
      </button>
      <button onClick={() => { setOn(!on) }}>
        {on ? 'ON': 'OFF'}
      </button>
    </>
  )
}
export default LikeButton
```


## 3-7  useEffect 第一部分 - 初出茅庐 (05:31)
网络请求，dom操作，订阅数据来源..等等，和纯函数界面渲染不相关的事情，成为函数的副作用

react 副作用:
- 无需清除的副作用(Effect)
  - 只想在react更新dom之后运行一些额外的代码，发送一个网络请求、手动变更dom、记录日志
- 需清除的副作用(Effect)

```js
import React, { useState, useEffect } from 'react'

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)

  useEffect(() => {
    document.title = `点击了${like}次`
  })

  return (
    <>
      <button onClick={() => { setLike(like + 1) }}>
        {like}
      </button>
      <button onClick={() => { setOn(!on) }}>
        {on ? 'ON': 'OFF'}
      </button>
    </>
  )
}
export default LikeButton


```

## 3-8  useEffect 第二部分 - 有始有终 (08:18)

```js
// 在 class 中怎样实现
const something = {
  componentDidMount() {
    document.addEventListener('click'， this.updateMouse
  },
  componentwillUnmount() {
    document.removeEventListener('click', this.updateMouse)
  }
}
```


```js
  document.addEventListener("click", updateMouse);
  return () => {
    // todo 此处有无 updateMouse 引用的区别什么？
    document.removeEventListener("click", updateMouse);
  }
```

## 3-9  useEffect 第三部分 - 控制运行 (06:52)
useEffect
  - return 函数
  - 空数组
  - 数组依赖项

## 3-10  自定义 Hook - 重构 MouseTracker (06:48)
提取组件逻辑到函数

目前两种流行的方式来共享组件之间的状态逻辑
  - render props
  - 高阶组件

## 3-11  自定义 Hook 第二部分 - HOC的劣势 (08:10)

没有hook之前基本用HOC(HOC - Higher order component 高阶组件)
 - 高阶组件就是一个函数，接受一个组件作为参数，返回一个新的组件;只是一种模式，并不是react的api

[狗狗图片接口](https://dog.ceo/api/breeds/image/random)


3-12  自定义 hook 第三部分 - 正确的方式完成 URLLoader (07:39)

3-13  useRef - state遇到的难题 (05:08)

3-14  useRef - 多次渲染之间的纽带 (07:30)

3-15  useContext - 解决多层传递属性的灵丹妙药 (10:27)

3-16  hook 规则和其他 hook (03:52)

3-17  React18 更新总览 (06:00)

3-18  React18- createRoot 以及 自动批处理 (12:22)

3-19  Concurrent 并发的概念 (07:47)

3-20  TransitionAPI的用法 (13:04)

3-21  Suspense 的概念 (11:09)

3-22  实践 Suspense (10:50)

# 第4章 组件库起航 - 你真的能写的好看起来简单的 Button 组件吗？

4-1  组件库开始起航 - 需求分析 (05:28)

4-2   文件结构和代码规范 (09:17)

## 4-3  样式解决方案分析 (07:37)
- inline css
- 使用class比行内性能好很多
- css in js 有60多种解决方案，style component 比较高
- ..

4-4  做一次设计师 - 添加自己的色彩体系 (07:02)

4-5  更多样式变量 - 添加字体变量解决方案 (07:10)

4-6  初次亮相 - 添加 normalize.css (09:06)

4-7  Button 组件需求分析 (04:58)

4-8  小试牛刀 - Button 组件编码 第一部分 (14:18)

4-9  添加 Button 基本样式 (10:07)

4-10  升级 Button 组件样式 (12:32)

4-11  精益求精 - Buton 组件编码第二部分 (08:01)试看

4-12  【学习任务】完成 Alert 组件

# 第5章 组件测试

5-1  为什么要有测试 (07:26)

5-2  通用测试框架 Jest 出场 (09:36)

5-3  React 测试工具 - react-testing-library (09:17)

5-4  添加Button 测试代码 第一部分 (10:33)

5-5  添加Button 测试代码 第二部分 (10:49)

5-6  【学习任务】给 Alert 组件添加测试用例

# 第6章 更上一层楼 - 完成 Menu 组件

6-1  Menu 组件需求分析 (07:17)

6-2  基础架构 - Menu组件编码第一部分 (10:35)

6-3  需求升级 - Menu 组件编码第二部分 (11:09)

6-4  添加 Menu 样式 (10:21)

6-5  测试驱动 - Menu 测试添加 (17:32)

6-6  日趋完美 - Menu 组件编码第三部分 (09:15)

6-7  功能继续升级 - SubMenu 下拉菜单编码第一部分 (10:39)

6-8  添加交互 - SubMenu下拉菜单编码第二部分 (09:29)

6-9  大功告成 - SubMenu 下拉菜单编码第三部分 (10:18)

6-10  完美组件 - SubMenu 组件添加测试 (13:51)

6-11  Tabs 组件

6-12  Tabs 组件

# 第7章 他山之石 - Icon 组件 和 Transition 组件

7-1  图标解决方案简介 (07:41)

7-2  他山之石 - Icon组件编码第一部分 (10:12)

7-3  Icon 组件样式添加 (06:00)

7-4  让图标动起来 - 动画效果第一种实现方法 (08:19)

7-5  React Transition Group 简介 (07:59)

7-6  React Transition Group 实践 - 动画效果第二种实现方式 (06:52)

7-7  尽善尽美 - React Transition Group 添加菜单消失的动画 (06:12)

7-8  拿来主义 - 自定义 Transition 组件编码第一部分 (10:42)

7-9  拿来主义 - 自定义 Transition 组件编码第二部分 (07:16)

7-10  使用 Icon 和 Transition 改造 Alert

# 第8章 Storybook - 本地调试组件和生成文档页面的利器

8-1  什么是 Storybook (06:49)

8-2  安装 Storybook (06:41)

8-3  Storybook 创建第一个 story (09:59)

8-4  storybook 中的 args 的概念 (08:19)

8-5  argTypes 的功能和用法 (10:17)

8-6  学习使用 parameter 修改插件的配置 (08:39)

8-7  注释生成文档以及Decorators (08:02)

8-8  使用 MDX 书写 Story (10:11)

8-9  CSF 结合 MDX 完成终极目标 (08:31)

8-10  完成的 storybook 的架构，给剩下的组件添加 stories

# 第9章 进入表单的世界 - Input 组件和 AutoComplete 组件

9-1  知己知彼 -Input 组件需求分析 (06:09)

9-2  抛砖引玉 - Input 组件伪代码实现 (08:48)

9-3  持续优化 - Input组件代码实现和优化过程 (12:11)

9-4  新的挑战 - AutoComplete组件分析 (09:29)

9-5  基本骨架 - AutoComplete 编码第一部分 (14:09)

9-6  AutoComplete 支持自定义模版 (11:21)

9-7  异步来了 - AutoComplete 支持异步请求编码 (09:42)

9-8  老瓶新酒 - 使用自定义Hook实现 函数防抖 (11:51)

9-9  AutoComplete 支持键盘事件 (10:11)

9-10  妙用 useRef - 实现 clickOutSide 功能- (10:57)

9-11  完美收尾 - AutoComplete 添加单元测试 (14:08)

9-12  Select 组件

# 第10章 终极任务 - Upload 组件

10-1  最终任务 - Upload组件需求分析 (06:22)

10-2  下一代 HTTP 库 - axios (05:54)

10-3  在线 mock server 和 axios 简单使用 (09:29)

10-4  上传文件的基本方式 (09:39)

10-5  完成基本流程 - Upload 组件编码第一部分 (13:23)

10-6  完善生命周期 - Upload 组件编码第二部分 (08:00)

10-7  创建列表数据 - UploadList 组件编码第一部分 (13:36)

10-8  显示上传数据 - UploadList 组件编码第二部分 (11:59)

10-9  显示上传进度 - 添加 Progress 组件 (10:29)

10-10  精益求精 - 再次分析 Upload 组件更近一步需求 (06:33)

10-11  Upload 增强交互第一部分 (08:50)

10-12  拖动上传 - 支持 Drag and Drop (10:05)

10-13  异步怎样测试？ - Upload 测试第一部分 (12:29)

10-14  拖动事件怎样测试？ - Upload 测试第二部分 (11:20)

10-15  dragAndDrop 测试升级

# 第11章 终极大考 - Form 表单组件

11-1  分析 Form 组件的需求 (09:16)

11-2  创建基本的表单静态展示 (14:07)

11-3  分析数据交互的思路 (10:07)

11-4  初始化 useStore (14:12)

11-5  注册对应的 Item 到 store (09:29)

11-6  使用黑科技自动更新 store 中的数据 (13:02)

11-7  更新值第二部分：自定义对应字段 (10:17)

11-8  更新值第三部分：完善默认值以及修改对应的类型 (12:00)

11-9  添加验证第一部分：单个 Item 验证 (17:28)

11-10  验证第二部分：展示错误信息 (10:51)

11-11  验证第三部分：添加自定义规则 (12:39)

11-12  验证第四部分：表单整体验证 (18:01)

11-13  验证第五部分：表单整体验证第二部分 (10:15)

11-14  使用 renderProps 自定义展示 (08:15)

11-15  添加组件实例方法第一部分 (06:52)

11-16  添加组件实例方法第二部分 (14:48)

11-17  Form表单总结 (05:12)

# 第12章 Javascript 模块打包 - 需要什么类型的模块供各种环境使用？

12-1  Javascript模块化发展历史 (07:19)

12-2  webpack 到底完成什么任务？ - bundler的神奇功效 (06:36)

12-3  怎样选择 Javascript 模块格式？ (06:38)

12-4  创建组件库模块入口文件 (08:23)

12-5  驯服tsc - tsconfig 编写第一部分 (08:08)

12-6  驯服 tsc - tsconfig 编写第二部分 (06:28)

12-7  生成最终使用的样式文件 (06:09)

12-8  使用 npm link 本地测试组件库 第一部分 (06:28)

12-9  使用 npm link 本地测试组件库 第二部分 (05:14)

# 第13章 大功告成 - 发布到 Npm，以及添加 CI/CD 支持

13-1  Npm 简介 (05:31)

13-2  发布组件库到 npm (07:37)

13-3  瘦身任务 - 精简 package.json 依赖 (07:12)

13-4  万无一失 - 添加发布和 commit 前检查 (09:17)

13-5  使用 Storybook 生成静态文档页面 (07:40)

13-6  CI CD 简介 (04:59)

13-7  使用 travis 自动运行测试 (08:02)

13-8  使用 travis 自动发布文档页面 (06:31)

# 第14章 使用 Rollup 打包多种模块格式

14-1  Rollup 简介 (08:41)

14-2  Rollup 插件的简单使用 (09:38)

14-3  Rollup 打包 ES 格式第一部分 (08:49)

14-4  Rollup 打包 ES 格式第二部分 (08:53)

14-5  Rollup 打包 UMD 格式第一部分 (12:22)

14-6  Rollup 打包 UMD 格式第二部分 (08:05)

14-7  整合最终的打包配置文件 (07:37)

# 第15章 课程总结

15-1  课程总结 (08:20)