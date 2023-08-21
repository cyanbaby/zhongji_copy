## jspang vue no1 season
> Vue学习的Demo，供以后下载学习。
> jspang的github: https://github.com/shenghy
> 当前课程地址：https://github.com/shenghy/VueDemo
> 其他基础课程：https://www.bilibili.com/video/BV1Zb411T7dm?p=27
> jspang实时更新，请追逐上他的脚步
> jspang的博客: https://jspang.com/detailed?id=21
> [官方文档](https://cn.vuejs.org/v2/guide/)
> [全局-配置](https://cn.vuejs.org/v2/api/#全局配置)
> [全局-API](https://cn.vuejs.org/v2/api/#全局-API)
> [选项-数据](https://cn.vuejs.org/v2/api/#选项-数据)
> [选项-DOM](https://cn.vuejs.org/v2/api/#选项-DOM)
> [选项-生命周期钩子](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)
> [实例-property](https://cn.vuejs.org/v2/api/#实例-property)
> ..

> Vue.js in the course: v2.1.10

### computed
* 操作同一个地址数组; push之后又trigger，又映射到同一个地址 - computed-lesson02.html

### 什么是计算属性？
> https://blog.csdn.net/DDDDDecade/article/details/109853415
>  computend-lesson03.html
> 在模板中可以直接通过插值语法显示一些data中的数据。
> 但是在某些情况，我们可能需要对数据进行一些转化后再显示，或者需要将多个数据结合起来进行显示

### 计算属性的复杂操作
>  computend-lesson04.html

### 计算属性的setter和getter
>  computend-lesson05.html
> 每个计算属性都包含一个getter和一个setter
> >  在上面的例子中，我们只是使用getter来读取。
> >  在某些情况下，你也可以提供一个setter方法（不常用）。

### 计算属性和methods都对比
> methods和computed看起来都能实现相似的功能，但他们有个根本区别：计算属性会进行缓存，如果多次使用，计算属性只会调用一次，大大提升了效率


### v-on指令 绑定事件监听器 & 语法糖@
* once 冒泡等其他原生操作呢?
* v-on:keyup.enter="onEnter"  键盘回车按下事件
* v-on:click="test" === @click="test" 

### v-model指令 数据双向绑定
> v-model-lesson01.html
> v-model-lesson02.html
> v-model-lesson03.html  
> > [一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model)
> > [原生DOM事件](https://www.runoob.com/jsref/dom-obj-event.html)

> interview(原生JS实现数据双向绑定, 开课吧)
#### 修饰符
  * .lazy：取代 input 监听 change 事件。
  * .number：输入字符串转为数字。
  * .trim：输入去掉首尾空格。
  * .. 去看文档
#### 多选按钮绑定一个值
#### 多选按钮绑定一数组
#### 单选按钮绑定数据
### v-bind是处理HTML中的标签属性的 & 语法糖 冒号'':"
### 自定义指令


## jspang vue no2 season

### 自定义指令
#### 注册或获取全局指令 
  * 注册 Vue.directive(id, [definition])
  * 获取 var myDirective = Vue.directive('my-directive')
#### 局部指令
```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```
#### Vue.js 自定义指令使用场景及案例
> https://juejin.cn/post/6844903508785758215

### Vue构造器
#### 什么是Vue.extend
* Vue.extend返回的是一个扩展实例构造器，也就是预设了部分选项的Vue实例构造器
* 其主要用来服务于Vue.component，用来生成组件。
* 可以简单的理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用扩展实例构造器来生产组件实例，并挂载到自定义元素上。

#### 创建一个Vue.extend
* Vue中创建一个Vue实例，大致经会经历四个过程
  * new Vue({})
  * 挂载元素 el:"#app"
  * 设置数据 data: {}
  * 模板渲染 \<h1>{{ title }}\</h1>
#### 当Vue实例创建之后，可以看到Vue实例预设了很多参数
* vm实例  和 vue.extend.html 中 new authorExtend()类似
#### Vue.extend的作用
* vue.extend-lesson03.html
* **Vue.extend是构造一个组件的语法器**，你给这个构造器预设一些参数，而这个构造器给你一个组件，
* 然后这个组件你就可以用到Vue.component这个全局注册方法里，也可以在任意Vue模板里使用这个构造器。

#### Vue.extend()和Vue.component()的区别
> Vue允许你将注册的ViewModel构造函数视为可重用的组件，这些组件在概念上与Web组件相似，不需要任何Polyfill。
* 要注册一个组件，首先使用Vue.extend()创建一个Vue的子类构造函数，然后使用Vue.component()方法注册该构造函数