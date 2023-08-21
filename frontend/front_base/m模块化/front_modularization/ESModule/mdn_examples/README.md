# [JavaScript模块的例子](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
modules”目录包含了一系列示例，解释了[JavaScript modules - JavaScript模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)是如何使用的。子目录如下:
* [basic-modules - ES Module基础导入导出](basic-modules):演示 ES Module基础简单示例，包括export default 默认导出 ([在线实例](http://mdn.github.io/js-examples/modules/basic-modules))。

* [renaming - 重名名模块](renaming): 演示如何重命名导出以避免冲突, 使用 `x as y` 语法 ([在线实例](http://mdn.github.io/js-examples/modules/renaming)).

* [module-objects](module-objects): 演示如何将整个模块作为对象导入 `import * as x from 'y.js'` syntax ([在线实例](http://mdn.github.io/js-examples/modules/module-objects)).


* [classes](classes): 导入类的示例 ([在线实例](http://mdn.github.io/js-examples/modules/classes)).

* [module-aggregation](module-aggregation): 演示如何将子模块特性聚合到父模块`export { x } from 'y.js'` syntax ([在线实例](http://mdn.github.io/js-examples/modules/module-aggregation)).
// main.js
import { Square, Circle, Triangle } from './modules/shapes.js';

// shapes.js
export { Square } from './shapes/square.js';
export { Triangle } from './shapes/triangle.js';
export { Circle } from './shapes/circle.js';
```

* [dynamic-module-imports](dynamic-module-imports): 演示动态模块加载 使用 `import().then()` ([在线实例](http://mdn.github.io/js-examples/modules/dynamic-module-imports)).

* [top-level-await](top-level-await)阻塞加载异步模块
```js
// main.js
import colors from './modules/getColors.js';

// getColor.js
const colors = fetch('https://mdn.github.io/js-examples/modules/top-level-await/data/colors.json')
  .then(response => response.json());

export default await colors;

```

# TODO
* 使用 ES Module的几种方式
* canvas
* 工程化.. babel .. ES6+ .. oop ..
* es6的class extends 和 es5区别
* svg和canvas
* 懒加载，按需加载原理
* 上传进度条