# Knockout.js 教程



## 大纲

- 入门
  - 简介
  - Knockout 与 jQuery
  - 下载与使用
- 监控（Observable）
  - 监控属性（observable）
  - 显式订阅（subscribe）
  - 监控数组（observableArray）
  - 计算属性（computed | pureComputed）
- 绑定
  - 文本与外观
    - visible & hidden
    - text & html
    - class & css
    - style
    - attr
  - 控制流程
    - foreach
    - if & ifnot
    - with & using
    - let
    - component
    - 生命周期事件
  - 表单字段
    - click
    - event
    - submit
    - enable & disable
    - value
    - textInput
    - hasFocus
    - checked
    - options
    - selectedOptions
    - uniqueName
  - 模板渲染
    - template
  - 绑定语法
    - data-bind
    - 绑定上下文
- 自定义绑定
  - ko.bindingHandlers.绑定名称 = {  init: 初始回调,  update: 更新回调 }
  - 支持后代绑定
  - 支持虚拟元素
  - 自定义回收逻辑
  - 预处理：扩展绑定语法
- 组件
  - 定义和注册组件
    - ko.components.register(组件名,  {  viewModel: 视图模型,  template: 组件模板 })
    - viewModel
      - 构造函数
      - 共享对象实例
      - createViewModel 工厂函数
      - AMD 模块
    - template
      - 现有元素 ID
      - 现有元素实例
      - 一串字符串标记
      - 一组 DOM 节点
      - 一个文档片段
      - AMD 模块
    - 其他额外选项
  - 绑定组件
  - 使用自定义元素
  - 自定义组件加载器
- 深入
  - 加载和保存 JSON 数据
  - 扩展监控
  - 延迟更新
  - 速率限制监控更新
  - 不显眼的事件处理
  - 通过 fn 来添加自定义函数
  - 微任务
  - 异步报错处理
  - Mapping 插件
- 其他
  - 浏览器支持
  - 帮助信息
  - 教程与示例
  - 通过 Require.js 以 AMD 的方式使用 Knockout
  - ko.utils API



## 使用

直接下载代码，直接运行 html 文件即可。

