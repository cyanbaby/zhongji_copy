// import colors from './modules/getColors.js';
// console.log(colors)

// import a from './modules/a.js';
// console.log(a)

// 或

import a from './modules/a.js';
console.log(a)

import colors from './modules/getColors.js';
console.log(colors)


// 似乎 top-level await 新特性，直接在 getColor.js 模块导出的时候 await 也行。
// https://segmentfault.com/a/1190000025184719
// https://www.jianshu.com/p/22468f8e969e
// https://juejin.cn/post/6878441223951122446