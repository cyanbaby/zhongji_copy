"use strict";
exports.__esModule = true;
var user_1 = require("./model/user");
var article_1 = require("./model/article");
//增加数据
var u = new user_1.UserClass();
u.username = '张三';
u.password = '12345655654757';
user_1.UserModel.add(u);
//获取user表数据
var res = user_1.UserModel.get(123);
console.log(res);
//获取文章表的数据
var aRes = article_1.ArticleModel.get(1);
console.log(aRes);
