"use strict";
exports.__esModule = true;
// 操作用户表   定义一个User类和数据表做映射
var db_1 = require("./modules/db");
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var u = new User();
u.username = '张三2222';
u.password = '123456';
var oMssql = new db_1.MsSqlDb();
oMssql.add(u);
