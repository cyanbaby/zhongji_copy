# Vue 的构造器—extend 与手动挂载—$mount

本节介绍两个 Vue.js 内置但却不常用的 API——extend 和 $mount，它们经常一起使用。不常用，是因为在业务开发中，基本没有它们的用武之地，但在独立组件开发时，在一些特定的场景它们是至关重要的。

所以，我们不关注他们。

### [Vue.extend( options )](https://cn.vuejs.org/v2/api/index.html#Vue-extend)

- **参数**：

  - `{Object} options`

- **用法**：

  使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

  `data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数

  ```
  <div id="mount-point"></div>
  ```

  ```js
  // 创建构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  // 创建 Profile 实例，并挂载到一个元素上。
  new Profile().$mount('#mount-point')
  ```

  结果如下：

  ```
  <p>Walter White aka Heisenberg</p>
  ```



