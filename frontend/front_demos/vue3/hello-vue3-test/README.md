# Vue 3 + TypeScript + Vite

[如何编写.d.ts这样的类型定义文件](https://www.jianshu.com/p/c6745ff40497)
[类型定义文件不用引入吗 *.d.ts](https://coding.imooc.com/learn/questiondetail/176584.html)



## todo
### Vue2.js
* watch兼听对象，oldValue与newValue值相同
  * [用watch兼听对象时，oldValue与newValue值相同的问题](https://blog.csdn.net/m0_68938059/article/details/124017532)
  * [vue watch监听数据，新老值一样？让其不一样吧！](https://www.csdn.net/tags/MtTaEgzsNjkxMzUxLWJsb2cO0O0O.html)
* Vue 单向数据流，父子组件通信
  * 注意，在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，所以 props 是对象和数组时，在子组件内改变是会影响父组件的。
* 子组件如何监听父组件传递的对象的变化

### Vue3.js
* wachtEffect和watch区别
  * watch监听多个ref数据时，回调中如何区分是哪个ref数据改变了?  => √ 
    * todo 数组顺序，有没有更优雅的方式?
    * 多个watch分别监听不通的ref数据  => √ 
  * 如何移除某个ref的watch?   => √ 
    * [vue3的watch怎么进行终止监听，达到条件不让watch监听。](https://blog.csdn.net/qq_54753561/article/details/124439716)
  * 停止 watchEffect 侦听  => √ 
    * [手动停止，同 watch](https://www.csdn.net/tags/NtTaUgwsODQ5NjItYmxvZwO0O0OO0O0O.html)
  * 停止 watch 侦听  => √ 
    * 同watch方式
  * watchEffect副作用
    * [vue3 watchEffect用法以及清除副作用](https://blog.csdn.net/m0_60899441/article/details/125641636)
* ref和reactive区别 => √
  * [Vue3.0中Ref与Reactive的区别是什么](https://www.yisu.com/zixun/604877.html)
* ref和toRef区别 => √
  * [Vue3中ref与toRef的区别浅析](https://www.jb51.net/article/215670.htm)
  * [Vue3中ref toRef和toRefs的区别有哪些](https://www.yisu.com/zixun/624037.html)

toRef和toRefs区别
script lang="ts" setup\> 语法糖中的 reactive对象的数据，模块中如果不通过 reactive对象.属性的方式使用?
student = reactive({..}) 如何整个替换?
setup函数默认会执行吗? 执行时机是什么? 里面首付能执行console.log方法


## keywords
数据同源

## 参考
* [vue3中的watch的用法和几种常见情况](https://blog.csdn.net/weixin_44437816/article/details/124641625)
* [记录vue3.0的坑--watch新旧数据相同 - watch reactive对象时，新旧数据一样](https://segmentfault.com/a/1190000040346855?utm_source=sf-similar-article)


## todo
* withDefaults
  * [使用类型声明时的默认 props 值 - withDefaults - 官网](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E4%BB%85%E9%99%90-typescript-%E7%9A%84%E5%8A%9F%E8%83%BD)
  * [vue3+ts 绑定props 默认值的方式：withDefaults](https://blog.csdn.net/weCat_s/article/details/121990649)

* 父组件传递一个ref(对象) 子组件有必要用 computed 包裹一层吗？

* [unref](https://vimsky.com/examples/usage/vuejs-reactivity-utilities-unref-vu.html)

* 子组件获取父组件， 父组件获取子组件 ($parent, $child)

## v3 api
* [官网 - CSSProperties](https://vuejs.org/api/utility-types.html#cssproperties)
  * [vue 中 CSSProperties的使用](https://juejin.cn/post/7030404841857417252)

## echarts
* [ECharts X轴（xAxis）](jianshu.com/p/b649e8cbf2cd)

## 长线todo
* hook 是什么 vue react
  * [【框架对比】React和Vue的hook函数](https://juejin.cn/post/6878679053541310478)
* [Vue 3.x 响应式原理——reactive源码分析](https://zhuanlan.zhihu.com/p/89940326)
* [vue2.0与vue3.0响应式原理对比](https://juejin.cn/post/6960238878527586317)
* [vue3-setup语法糖 - 父子组件之间的传值](https://blog.csdn.net/weixin_48927323/article/details/125486312?spm=1001.2101.3001.6650.15&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-15-125486312-blog-116779549.pc_relevant_multi_platform_whitelistv2_ad_hc&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-15-125486312-blog-116779549.pc_relevant_multi_platform_whitelistv2_ad_hc&utm_relevant_index=20)
* [js中对象合并的4种方式，数组合并的4种方法](https://blog.csdn.net/m0_64346035/article/details/125355340#t2)
* import .. from 的路径 可以写成一个变量吗?   前端


## 已解决
[vue template 标签，这个#代表啥意思？](https://ask.csdn.net/questions/7694480)
[vue3使用 VueUse useVModel](https://www.cnblogs.com/-roc/p/16250690.html)
  * [文内搜索 - useVModel 简化 v-model 的绑定](https://www.vue-js.com/topic/6114829f120d99003158dad7)

## 文献
* [vueuse](https://juejin.cn/post/6974331681213775885)
* [lodash](http://lodash.think2011.net/custom-builds)
* [echarts](https://www.runoob.com/echarts/echarts-dataset.html)
* [echarts | 柱状图实用配置（持续更新）](https://juejin.cn/post/6971805520751493133)

## 工具
* [科学上最令人舒服的十种颜色（RGB）](https://blog.csdn.net/orange_man/article/details/38490429)
  * [console的颜色（适用谷歌浏览器）](https://www.jianshu.com/p/664c80115bfd)
  * [给console.log加点颜色](https://www.jianshu.com/p/d44c75c601b2)
  * [给 Console 来的颜色](https://gitchat.csdn.net/activity/5fea01bb6762e166605707bf)
  * todo 好用的包呢?
  ```js
  console.group('%c 组名', "color:#F4606C;font-weight:bold;font-size: 18px; font-family:roboto;")
  console.log(111)
  console.groupEnd()
  

  
  console.log('\r\n')
  console.log('%c dataSource', `color:${['#19CAAD','#8CC7B5','#A0EEE1','#BEE7E9','#BEEDC7','#D6D5B7','#D1BA74','#E6CEAC','#ECAD9E','#F4606C'][Math.floor( Math.random()*10 )]};font-weight:bold;font-size: 18px; font-family:roboto;`)
  console.log(JSON.stringify(dataSource.value))
  console.log('\r\n')

  ````