/*

功能：定义一个操作数据库的库  支持 Mysql Mssql  MongoDb

要求1：Mysql MsSql  MongoDb功能一样  都有 add  update  delete  get方法

注意：约束统一的规范、以及代码重用

解决方案：需要约束规范所以要定义接口 ，需要代码重用所以用到泛型

    1、接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范

    2、泛型 通俗理解：泛型就是解决 类 接口 方法的复用性、


*/
// 定义一个操作mysql数据库的类       
//    注意：要实现泛型接口 这个类也应该是一个泛型类
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
        console.log('\r\n');
        console.log('Myyy Sql 数据库建立连接');
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MysqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype["delete"] = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.get = function (id) {
        var list = [
            {
                title: 'xxxx',
                desc: 'xxxxxxxxxx'
            },
            {
                title: 'xxxx',
                desc: 'xxxxxxxxxx'
            }
        ];
        return list;
    };
    return MysqlDb;
}());
// 定义一个操作mssql数据库的类  
var MsSqlDb = /** @class */ (function () {
    function MsSqlDb() {
        console.log('\r\n');
        console.log('Msss Sql 数据库建立连接');
    }
    MsSqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MsSqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MsSqlDb.prototype["delete"] = function (id) {
        throw new Error("Method not implemented.");
    };
    MsSqlDb.prototype.get = function (id) {
        // temp
        var list4 = [
            {
                title: 'xxxx',
                desc: 'xxxxxxxxxx'
            },
            {
                title: 'xxxx',
                desc: 'xxxxxxxxxx'
            }
        ];
        return list4;
    };
    return MsSqlDb;
}());
// 例1：操作用户表   定义一个User类和数据表做映射
var User_0 = /** @class */ (function () {
    function User_0() {
    }
    return User_0;
}());
var u_0 = new User_0();
u_0.username = '张三000';
u_0.password = '000000';
var oMysql = new MysqlDb(); //类作为参数来约束数据传入的类型 
oMysql.add(u_0);
// 例2：操作用户表   定义一个User类和数据表做映射
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var u = new User();
u.username = '张三2222';
u.password = '123456';
var oMssql = new MsSqlDb();
oMssql.add(u); // 类作为参数来约束数据传入的类型 
// 获取User表 ID=4的数据
var data = oMssql.get(4);
console.log(data);
