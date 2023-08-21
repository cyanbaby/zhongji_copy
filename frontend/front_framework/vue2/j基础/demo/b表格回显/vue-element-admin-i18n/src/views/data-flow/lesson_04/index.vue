<template>
  <div class="outer">
    <dl>
      <dt style="margin-bottom: 8px;">单向数据流：</dt>
      <dd style="margin-bottom: 8px;">单向数据流（Unidirectional data flow）方式使用一个上传数据流和一个下传数据流进行双向数据通信，两个数据流之间相互独立。 --百度百科</dd>
      <dd style="margin-bottom: 8px;"><a href="https://blog.csdn.net/programme_/article/details/119869481">React的单向数据流与Vue的双向绑定 - 点击</a></dd>
      <dd style="margin-bottom: 8px;"><a href="https://www.php.cn/website-design-ask-493321.html">vue和react的数据流有什么区别 - 点击</a></dd>
    </dl>
    <dl>
      <dt style="margin-bottom: 8px;">目标</dt>

      <dd style="margin-bottom: 8px;">想要做到 父组件传递 数组||对象 给子组件，子组件更改 数组||对象 的内部对象 不影响父组件或者其他组件，只能深拷贝 或者 不这样去做</dd>

      <dd style="margin-bottom: 8px;">想要做到 父组件传递 普通数据 给子组件，子组件更改不影响父组件或者其他组件，默认就是这样，不可直接更改 props 数据</dd>

      <dd style="margin-bottom: 8px;">想要做到 父组件传递 普通数据 子组件会自动响应 父组件的变更，直接使用 props 里面的数据</dd>

      <dd>想要做到 父组件传递 普通数据 子组件会不自动响应 父组件的变更，用一个自身的属性初始化接收一下</dd>
      <dd>todo 那以什么方式响应?</dd>
      <dd>1. watch</dd>
      <dd>2. 发布订阅</dd>
    </dl>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.outer {
  background-color: #e6ceac;
  padding: 20px;
}
</style>
