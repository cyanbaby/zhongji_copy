"use strict";
/*

export default    默认导出

每个模块都可以有一个default导出。 默认导出使用 default关键字标记；并且一个模块只能够有一个default导出。 需要使用一种特殊的导入形式来导入 default导出。

*/
exports.__esModule = true;
var db_1 = require("./modules/db");
(0, db_1["default"])();
(0, db_1.save)();
