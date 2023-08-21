"use strict";
exports.__esModule = true;
exports.ArticleModel = exports.ArticleClass = void 0;
var db_1 = require("../modules/db");
//定义数据库的映射
var ArticleClass = /** @class */ (function () {
    function ArticleClass() {
    }
    return ArticleClass;
}());
exports.ArticleClass = ArticleClass;
var ArticleModel = new db_1.MsSqlDb();
exports.ArticleModel = ArticleModel;
