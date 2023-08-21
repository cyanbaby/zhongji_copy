# 后续整理一下 reactive, ref, toRef, toRef 在组件通信中的作用
主要测试 源数据，数据发送方(组件) 和 目标数据，数据接收方(组件)  
单方数据变更后，自身（组件的数据，视图）的变化，和对方（组件）的变化（组件的数据，视图）


## provide/inject

## 父子组件通信

## 其他


## 文献
[defineEmits is not defined](https://segmentfault.com/q/1010000042009773/a-1020000042012492)
[Vue3.2单文件组件setup的语法糖总结](https://blog.csdn.net/Mr_JavaScript/article/details/124554063#t10)
[Vue3全局组件通信之provide / inject](https://www.jianshu.com/p/e97612cd437d)
[Vue3中setup语法糖学习](https://blog.csdn.net/pdd11997110103/article/details/121438090)

## todo 
子组件主动调用父组件方法，访问数据呢?
父组件主动调用子组件方法，访问数据呢?

Vue2.x 的 $attrs和$listeners