## 开始
### 简介
Knockout.js （简称 KO）是微软推出的 MVVM 的 JS 库。
TODO Cyan: 推出时间，停更时间

#### 重要特性：
- 优雅的依赖跟踪 - 当数据模型发生变化时，能够自动更新 UI 的指定内容。
- 声明式绑定 - 通过简明扼要的方式，将你的 UI 与数据模型进行绑定。你可以使用任意嵌套的绑定上下文，来构建复杂的动态界面。
- 良好的可扩展性 - 通过简单的几行代码，就可以实现一个自定义行为，该行为用于新的，简单可重用的声明性绑定。

#### 其他优点：
- 纯 JavaScript 库 - 兼容任何服务器和客户端技术。
- 可以很好的应用到已有的应用程序中 - 而不需要程序主要架构发生变化。
- 极简 - 采用 Gzip 压缩之后只要 13K。
- 兼容任何主流浏览器 - (IE 6+, Firefox 2+, Chrome, Safari, 及其他)
- 一套全面完整的规范（采用行为驱动开发）- 这意味着在新的浏览器或平台中也能够很容易验证通过

### Knockout 与 jQuery
每个人都很喜欢 jQuery！在过去，我们不得不忍受各种不一致的 DOM 操作的 API 方法，jQuery 的出现，很出色的代替了以往种种笨拙的框架，显得灵活易用。jQuery 在 Web 页面元素操作和事件处理上，显得相当出色并且易用，而 KO 是解决另外不同的问题的。
当你的 UI 界面稍微复杂，且含有一些相同的行为的话，如果你仅仅只使用 jQuery，那么 UI 处理上会比你想象的要复杂棘手，同时会让维护费用相当昂贵。


思考这样一个例子：在一个表格里显示一个项目列表，统计表格中列表的数量，当项目列表数量小于 5 时启用“Add”按钮，否则就禁用。jQuery 没有基本的数据模型概念，所以你想要获取项目列表的数量，你需要从表格table/tr/div 这些数量上去进行推断才能知道。如果需要在某些 span 里显示数据的数量，当添加新数据的时候，你还要记得更新这个 span 的 text。当然，你还要记住当总数 >=5 条的时候，你需要禁用 Add 按钮。然后，如果还要实现 Delete 功能的时候，你不得不指出哪一个 DOM 元素，点击之后需要改变。

#### 用 Knockout 来实现又有何不同？
使用 KO 这一切都变得非常简单。它可以让你很轻易的扩展项目的复杂度，而不必担心由此产生的数据不一致问题。它仅仅只需要将你的数据转换成一个 JavaScript 数组，然后使用 foreach 将数据数组绑定到页面中的一个表格 table 或者一组 div 中。每当数据数组发生变化时，UI 界面会自动响应改变（你不需要指出如何插入新行或在哪里插入），剩下的就是 UI 界面数据同步了。例如：你可以声明绑定如下一个 span 显示数据数量：
```html
There are <span data-bind="text:myItems().count"></span>items
```
就是这些！你不需要写代码去更新它，它的更新依赖于数组 myItems 的改变。同样， Add 按钮的启用和禁用依赖于数组 myItems 的长度，如下：
```html
<button data-bind="enable: myItems().length < 5">Add</button>
```

之后，如果你需要实现“Delete”功能，你不必去指定如何操作UI元素，只需要修改数据模型就可以了。
总结：**KO 无意与 jQuery 这些类似的 DOM 操作框架进行竞争。KO 提供了一个数据模型与用户 UI 进行关联的高层次方式。KO 本身不依赖 jQuery，但是你可以一起同时使用 jQuery， 生动平缓的 UI 改变需要使用 jQuery。**

### 下载与安装
下载地址：https://knockoutjs.com/downloads/index.html
> Knockout 的核心类库是纯 JavaScript 代码实现的，不依赖任何其他类库。

下载后，直接在页面中引入
```html
<script type='text/javascript' src='knockout-3.5.1.js'></script>
```

### 资源地址
教学地址：http://learn.knockoutjs.com/
在线实例：https://knockoutjs.com/examples/
帮助文档：https://knockoutjs.com/documentation/introduction.html
学习文档：https://www.cnblogs.com/tangge/p/10333254.html#t1