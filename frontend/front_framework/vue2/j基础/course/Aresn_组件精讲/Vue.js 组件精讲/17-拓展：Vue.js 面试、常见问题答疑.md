# 拓展：Vue.js 面试、常见问题答疑

过去的面试中，我们经常会问面试者一些关于 Vue.js 的问题。这些问题从题面来看很简单，但仔细想又不是那么简单，不同的人，会答出不同的层次，从而展现对 VUe.js 的理解程度。

## 题目

### v-show 和 v-if 的区别

第一道题应该是最简单的，提这个问题，也是想让人不那么紧张，因为但凡用过 Vue.js 的，多少知道 `v-show` 和 `v-if` 的区别，不然也没得聊了。不过这是最简单的一题，有三个层次：

- `v-show` 只是 CSS 级别的 `display: none;` 和 `display: block;` 之间的切换，而 `v-if` 决定的是否选择代码块的内容（或组件）。

  回答到这些，已经可以得到 50 分了~

- 什么时候用 `v-show`，什么时候用 `v-if`？

  频繁操作的，使用 `v-show`，一次性渲染完的，使用 `v-if`，只要意思对就好。

  这样就可以拿到 80 分了~

- 那使用 `v-if` 在性能优化上有什么经验？这是个加分项目，要对 Vue.js 组件编译有一定的理解。

  因为当 `v-if="false"` 时，内部组件是不会渲染的，所以在特定条件下才渲染部分组件（或内容）时，可以将条件设置为 `false`，需要时（或异步，比如 $nextTick）再设置为 `true`，这样可以优化渲染重要的其他内容，合理利用，可以进行性能优化。

### 绑定 class 的数组用法

动态绑定 class 应该不陌生吧，这也是最基本的，但是这个问题却有点绕，什么叫**绑定 class 的数组用法？**我们来看一下，最常用的绑定 class 怎么写：

```html
<template>
	<div :class="{show: isShow}">内容</div>
</template>
<script>
	export default {
    data () {
      return {
        isShow: true
      }
    }
	}
</script>
```

绑定 class 的对象用法能满足大部分业务需求，不过，在复杂的场景下，会用到数组，来看示例：

```html
<template>
	<div :class="classes"></div>
</template>
<script>
  export default {
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          `${prefixCls}-${this.type}`,
          {
            [`${prefixCls}-long`]: this.long,
            [`${prefixCls}-${this.shape}`]: !!this.shape,
            [`${prefixCls}-${this.size}`]: this.size !== 'default',
            [`${prefixCls}-loading`]: this.loading != null && this.loading,
            [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
            [`${prefixCls}-ghost`]: this.ghost
          }
        ];
      }
    }
  }
</script>
```

示例来自 iView 的 Button 组件，可以看到，数组里，可以是固定的值，还有动态值（对象）的混合。

### 计算属性和 watch 的区别

回答该题前，一般都会思考一下。很多人会偏题，直接去答计算属性和 watch 怎么用，这是不得分的，因为题目是问区别，并不是用法。

 计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。

所以区别来源于用法，只是需要动态值，那就用计算属性；需要知道值的改变后执行业务逻辑，才用 watch，用反或混用虽然可行，但都是不正确的用法。

这个问题会延伸出几个问题：

1. computed 是一个对象时，它有哪些选项？
2. computed 和 methods 有什么区别？
3. computed 是否能依赖其它组件的数据？
4. watch 是一个对象时，它有哪些选项？

问题 1，已经在 16 小节介绍过，有 get 和 set 两个选项。

问题 2，methods 是一个方法，它可以接受参数，而 computed 不能；computed 是可以缓存的，methods 不会；一般在 `v-if` 中，需要根据当前项动态绑定值时，只能用 methods 不能用 computed，因为 computed 不能传参。

问题 3，computed 可以依赖其它 computed，甚至是其它组件的 data。

问题 4，第 16 小节也有提到，有以下常用的配置：

- handler 执行的函数
- deep 是否深度
- immediate 是否立即执行