# cat-clicker

> MVP 架构模式简单示例

----

[演示地址](https://wingmeng.github.io/cat-clicker/)

## 一、MVP的作用

1. 对项目代码进行分层，使得整个项目的代码结构更清晰、易维护；

  - 模型（Model，提供数据）
  - 视图（View，显示数据）
  - 业务逻辑（Presenter，处理数据）

  > M 和 V 不直接通信，而是通过 P 来进行通信

2. 让 V 从特定的业务场景中脱离出来，可方便实现可复用的 View 组件，不用担心 UI 的频繁修改了。

## 二、当前项目 MVP 结构说明

1. **Model：** 提供基础数据，包含定义了猫的名称、图片路径和点击数的 cats 数组，以及当前索引和 admin 模式开关量。

2. **View：** 定义了三个 view 视图，分别为列表视图、详情视图和表单视图，各个视图负责包含自身的渲染逻辑以及事件绑定，并对外提供接口供上层操作。

3. **Presenter：** 负责对较为复杂的、高层次的 UI 操作进行响应，获取 Model 中的对应数据提供给 View。

## 相关

- [cat-clicker-react](https://github.com/wingmeng/cat-clicker-react)
- [cat-clicker-react-redux](https://github.com/wingmeng/cat-clicker-react-redux)
- [cat-clicker-vue](https://github.com/wingmeng/cat-clicker-vue)


