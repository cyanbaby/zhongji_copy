## [【跟山地人学Babel系列教程】课01.Babel课程体系介绍](https://www.bilibili.com/video/BV1jt411z7Wk?spm_id_from=333.337.search-card.all.click)
* todo 构建系统？
## [【跟山地人学Babel系列教程】课02.什么是Babel?](https://www.bilibili.com/video/BV1Et411z7ES/?spm_id_from=333.788.recommend_more_video.-1)
* todo ECMA 已经开发到多少版本呢？ ESMA 2019?
* todo [ESMAScript兼容性 - 写进简历](http://kangax.github.io/compat-table/es6/)
* Babel为解决兼容性而生（主要是转换代码，语法兼容，添加Polyfill垫片）  
* Babel通过语法变换器支持最新的语法（其实就是一堆插件 plugins）不用等待浏览器升级之后在支持
  * 还可以删除类型注释（Flow或者TypeScript）
  * Babel其实就是一堆插件的集合，可以编写自己的转换管道或者编写自己的插件，轻松使用一组插件。
  * 可调式 Source Map(写进简历)
  * .. todo Babel面试题

## [【跟山地人学Babel系列教程】课03.Babel使用指南(上)](https://www.bilibili.com/video/BV1Et411z7At/?spm_id_from=333.788.recommend_more_video.0)
lesson_03
* 工具链很多，使用情况很多：
* 插件 @babel/plugin-transform-arrow-fuctions 只能编译箭头函数
  * 可以用preset替代 => @babel/preset-env, preset包括支持现在JavaScript(ES2015,ES2016等)的所有插件。

demo01

```shell
yarn add  -D @babel/core @babel/cli @babel/preset-env
# 或者
npm i  -D @babel/core @babel/cli @babel/preset-env
# 安装的版本都课程里的版本对不上，我们且用自己安装的版本

yarn add @babel/polyfill
# 跟随源码

```

配置文件：
* .babelrc 是 Babel 7 之前的配置文件，我们用 babel.config.js

CLI用法:
* ./node_modules/.bin/babel src --out-dir dist
* npx babel src -d dist

你可以直接在 JavaScript 中 require使用：
* yarn网络不通，使用npm吧！
* build.js  => node build.js

demo02

单独转换箭头函数：
```shell
npm i -D @babel/plugin-transform-arrow-functions
npm i -D @babel/core @babel/cli

# 没有babel.config.js配置 箭头函数是不会被默认编译的
npx babel src -d dist

# 单独使用 plugins插件 @babel/plugin-transform-arrow-functions 编译
npx babel src -d dist --plugins=@babel/plugin-transform-arrow-functions

# 添加到package.json => scripts
npm run build:arrow
```

使用预设（预先设定的配置）：
* 我们可以使用一个 "preset"，其中包含着一组预先设定的插件，而不是逐一添加我们想要的所有插件。
```shell
npm i -D @babel/preset-env
```
* scripts 添加命令 babel src -d dist --presets=@babel/env
* scripts 不用额外的 npx
* npm run build:env
* 没有任何配置，这个 preset 包括支持现代 JavaScript（ES2015，ES2016 等）的所有插件。然而 presets 也可以接收配置选项。
* 相比从终端传入 cli 和 preset 选项，我们还可以使用另一种方式传入选项：通过配置文件。(下一章)


### [【跟山地人学Babel系列教程】课04.Babel使用指南(下)](https://www.bilibili.com/video/BV1Et411z7KA/?spm_id_from=333.788.recommend_more_video.-1)
lesson_04

demo01

```shell
npm i  -D @babel/core @babel/cli @babel/preset-env

# 添加script脚本 "build": "babel src -d dist --presets=@babel/env"
npm run build

```
通过配置文件配置 编译：
* 添加 babel.config.js
* 添加script脚本 "build:auto": "babel src -d dist"
* babel.config.js => targets => 添加 ie: "10"
* npm run build:auto

polyfill:
* @babel/polyfill 模块包括 core-js 和一个自定义 regenerator runtime，用于模拟完整的 ES2015+ 环境。
* Polyfill [看看文档](https://babel.docschina.org/docs/en/usage/), 它和 transform runtime插件，core-js的关系


demo02:

注意：使用 --save 选项，而不是 --save-dev，这是因为 polyfill 需要在运行时中在源代码之前执行。

幸运的是，对于我们来说，我们使用的是 env preset，其中有一个 "useBuiltIns" 选项，当设置为 "usage" 时，实际上针对最后一个版本的浏览器应用优化，只会包含你需要的 polyfill。

复制 dmeo01 开启 useBuiltIns

使用 polyfill:
```shell
npm install --save @babel/polyfill
# --save 跟随源代码 而不是 --save-dev

# src/index.js 添加promise相关代码，开启 ie:10

npm run build:auto
```

总结：
@babel/polyfill 用于 polyfill 所有新的 JavaScript 功能，env preset 只包含我们使用的功能的转换规则，polyfills 用于填充目标浏览器中缺少的功能。

todo promise示例，打包之后还是用的 require 语法

todo 一直有的 Warning 是什么？
```shell
WARNING (@babel/preset-env): We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.

You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:

  npm install --save core-js@2    npm install --save core-js@3
  yarn add core-js@2              yarn add core-js@3
```

### [【跟山地人学Babel系列教程】课05.如何配置Babel](https://www.bilibili.com/video/BV1Et411z7Ny/?spm_id_from=autoNext)

Babel配置文件多种形式：
* babel.cofnig.js
* babel.cofnig.json
* .babelrc
* .babelrc.js
* .babelrc.json
* package.json => "babel"
* 主要区别就是动态配置和静态配置 还有Babel不同的版本的推荐配置文件形式。

### [【跟山地人学Babel系列教程】课06.Babel中的ES3-ES5系列的插件Plugins](https://www.bilibili.com/video/BV17t411z7Xs/?spm_id_from=trigger_reload)
lesson_06

ES3和ES5插件还是很少的，主要还是ES6(ES 2015)的插件
[插件列表](https://babel.docschina.org/docs/en/plugins-list/)

demo01

babel-plugin-transform-member-expression-literals
* npm i -D @babel/core @babel/cli
* npm i -D babel-plugin-transform-member-expression-literals
  * todo [@babel/plugin-transform-member-expression-literals](https://juejin.cn/post/6898200535036329998)
* 添加命令： 


先命令行试试： 
```shell
npx babel --plugins babel-plugin-transform-member-expression-literals src/test-transform-member-expression-literals.js

# 输出：
# obj.foo = "isValid";
# obj.const = "isKeyword";
# obj.var = "isKeyword";
```

输出到目录：
```shell
npx babel --plugins babel-plugin-transform-member-expression-literals src -d dist
```

node build.js

参考：
* [babel-plugin-transform-member-expression-literals](https://github.com/babel/minify/tree/master/packages/babel-plugin-transform-member-expression-literals)
  * demo00_test 目录 => 关键字忽略，非关键字都会转为点属性语法
  * [JavaScript 保留关键字](https://www.runoob.com/js/js-reserved.html)
  * [其他插件用法](https://github.com/babel/minify/tree/master/packages)

babel-plugin-transform-property-literals
* npm i -D babel-plugin-transform-property-literals
* node build-02.js

scripts：
* 摘除对象里面的双引号属性
* "build:test2": "babel --plugins transform-property-literals src -d dist"
* npm run build:test2

@babel/plugin-transform-reserved-words
* 系统保留字
* npm i -D @babel/plugin-transform-reserved-words
* npm run build:test3

@babel/plugin-transform-property-mutators
* 生成get,set函数的
* npm i -D @babel/plugin-transform-property-mutators
* npm run build:test4

全部的scripts命令
* npm run build
* 配置 .babelrc 多个插件同事使用

## [【跟山地人学Babel系列教程】课07.Babel中的ES2015系列的插件Plugins(一)](https://www.bilibili.com/video/BV17t411z79n/?spm_id_from=333.788.recommend_more_video.-1)
lesson_07  

初始化:
```shell
npm init -y

npm i -D @babel/core @babel/cli

npm i -D @babel/plugin-transform-arrow-functions

# package.json => scripts 针对配置
npm run build:test-arrow-function

npm i -D @babel/plugin-transform-block-scoped-functions

# package.json => scripts 针对配置
npm run build:test-block-function

npm i -D @babel/plugin-transform-block-scoping

# package.json => scripts 针对配置
npm run build:test-block-scoping

# 其他的es 2015插件自己慢慢看吧
```

## [【跟山地人学Babel系列教程】课08.Babel中的ES2015系列的插件Plugins(二)](https://www.bilibili.com/video/BV1Jt411z7JN/?spm_id_from=autoNext)
lesson_08 

初始化:
```shell
npm init -y

npm i -D @babel/core @babel/cli

# 插件什么功能？
npm i -D @babel/plugin-transform-classes

# 配置scripts 
npm run build:test-class

# 插件什么功能？
npm i -D @babel/plugin-transform-computed-properties

npm run build:test-computed-prop

# 插件什么功能？
npm i -D @babel/plugin-transform-destructuring

npm run build:test-destructuring

```


## [【跟山地人学Babel系列教程】课08.Babel中的ES2015系列的插件Plugins(三)](https://www.bilibili.com/video/BV1Jt411z7LJ/?spm_id_from=333.788.recommend_more_video.2&vd_source=c17dd0ec8816e48357d2c9a7c827986c)
```shell
# lesson_09 本节介绍这些插件
  "@babel/plugin-transform-duplicate-keys": "^7.2.0",
  "@babel/plugin-transform-for-of": "^7.2.0",
  "@babel/plugin-transform-function-name": "^7.2.0",
  "@babel/plugin-transform-instanceof": "^7.2.0",
  "@babel/plugin-transform-literals": "^7.2.0"
```

## [【跟山地人学Babel系列教程】课08.Babel中的ES2015系列的插件Plugins(四)](https://www.bilibili.com/video/BV1Jt411z7se/?spm_id_from=333.788.recommend_more_video.3&vd_source=c17dd0ec8816e48357d2c9a7c827986c)
```shell
# lesson_10 本节介绍这些插件
  "@babel/plugin-transform-new-target": "^7.0.0",
  "@babel/plugin-transform-object-super": "^7.2.0",
  "@babel/plugin-transform-parameters": "^7.2.0",
  "@babel/plugin-transform-shorthand-properties": "^7.2.0",
  "@babel/plugin-transform-spread": "^7.2.2",
  "@babel/plugin-transform-sticky-regex": "^7.2.0",
  "@babel/plugin-transform-template-literals": "^7.2.0",
  "@babel/plugin-transform-typeof-symbol": "^7.2.0",
  "@babel/plugin-transform-unicode-regex": "^7.2.0"

```

## [【跟山地人学Babel系列教程】课11.Babel中的ES2016-2018系列的插件Plugins](https://www.bilibili.com/video/BV1Jt411z7TG/?spm_id_from=333.788.recommend_more_video.10&vd_source=c17dd0ec8816e48357d2c9a7c827986c)

```shell
# lesson_11 本节介绍这些插件
    "@babel/plugin-proposal-async-generator-functions": "^7.2.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.2.0",
    "@babel/plugin-proposal-optional-catch-binding": "^7.2.0",
    "@babel/plugin-proposal-unicode-property-regex": "^7.2.0",
    "@babel/plugin-transform-async-to-generator": "^7.2.0",
    "@babel/plugin-transform-dotall-regex": "^7.2.0",
    "@babel/plugin-transform-exponentiation-operator": "^7.2.0"

```


## [【跟山地人学Babel系列教程】课12.Babel中的模块化插件-amd&commonjs&systemjs-umd](https://www.bilibili.com/video/BV1Et411z7Xq/?spm_id_from=333.788.recommend_more_video.4&vd_source=c17dd0ec8816e48357d2c9a7c827986c)

[差点被SystemJs惊掉了下巴，解密模块加载黑魔法](https://segmentfault.com/a/1190000039305322)

```shell
# lesson_12 本节介绍这些插件
    "@babel/plugin-transform-modules-amd": "^7.2.0",
    "@babel/plugin-transform-modules-commonjs": "^7.2.0",
    "@babel/plugin-transform-modules-systemjs": "^7.2.0",
    "@babel/plugin-transform-modules-umd": "^7.2.0"
# 老外不认CMD?
```

## [【跟山地人学Babel系列教程】课17.Babel中的Presets预设](https://www.bilibili.com/video/BV1Gt411z7Jk?spm_id_from=333.999.0.0&vd_source=c17dd0ec8816e48357d2c9a7c827986c)
12 ~ 17 跳跃性学习了
@babel/preset-env
@babel/preset-flow
@babel/preset-react
@babel/preset-typescript

TC39将提案，ES发布过程 
Stage 0 稻草人 想法
Stage 1 提议：值得深入
Stage 2 草稿：初始规范
Stage 3 候选：完整的规范和初始浏览器实现
Stage 4 结束：将被添加到下一个年度版本中

自己都可以写一个预设：哈哈哈，presets倒序，plugins顺序
babel构建在插件体系之上

### todo
* eslint和per..写进简历
* 模块化 ES Module 编译
* todo [babel-plugin【member-expression-literals】 - 还有其他课程](https://www.bilibili.com/video/av289515609/)
* todo [前端科普系列-Babel：把 ES6 送上天的通天塔](https://zhuanlan.zhihu.com/p/129089156)  
  * [前端科普系列-Web：一路前行一路忘川](https://zhuanlan.zhihu.com/p/91842778)
    * todo 解析 html 文件构建 DOM 树，然后解析 CSS 文件构建渲染树  是同步运行的吗？
    * todo ExtJs
    * todo 感觉rxjs比vueuse好玩
    * todo Backbone.js
* todo Object.defineProperty
* todo [【面试题】babel是如何工作的？AST语法树是啥？Js为啥会报错？面试官震惊了！](https://www.bilibili.com/video/BV1kq4y1c7TK?spm_id_from=333.337.search-card.all.click)
* todo [当面试官问 Webpack5、Babel 的时候他想知道什么 （一）](https://www.bilibili.com/video/BV1AU4y1Z7f6?spm_id_from=333.337.search-card.all.click)