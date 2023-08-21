/* ------------------------- 把类作为参数来约束数据传入的类型 结束 ------------------------- */
(function () {
    // 定义一个 User 的类这个类的作用就是映射数据库字段  
    // 然后定义一个 MysqlDb 的类这个类用于操作数据库   
    // 然后把 User类 作为参数 传入到 MysqlDb 中
    // var user = new User({
    //   username: '张三',
    //   password: '123456'
    // })
    // var Db = new MysqlDb();
    // Db.add(user);
    // 把类作为参数来约束数据传入的类型 
    var User = /** @class */ (function () {
        function User() {
        }
        return User;
    }());
    var MysqlDb = /** @class */ (function () {
        function MysqlDb() {
        }
        MysqlDb.prototype.add = function (user) {
            console.log(user); // User { username: '张三', pasword: '123456' }
            return true;
        };
        return MysqlDb;
    }());
    var u = new User();
    u.username = '张三';
    u.pasword = '123456';
    var Db = new MysqlDb();
    Db.add(u);
});
/* ------------------------- 把类作为参数来约束数据传入的类型 结束 ------------------------- */
/* ------------------------- 问题：代码重复，给文章表添加数据 开始 ------------------------- */
(function () {
    // 问题：代码重复  给文章表添加数据
    var ArticleCate = /** @class */ (function () {
        function ArticleCate() {
        }
        return ArticleCate;
    }());
    var MysqlDb = /** @class */ (function () {
        function MysqlDb() {
        }
        MysqlDb.prototype.add = function (info) {
            console.log(info);
            console.log(info.title);
            return true;
        };
        return MysqlDb;
    }());
    var a = new ArticleCate();
    a.title = "国内";
    a.desc = "国内新闻";
    a.status = 1;
    var Db = new MysqlDb();
    Db.add(a);
});
/* ------------------------- 问题：代码重复，给文章表添加数据 结束 ------------------------- */
/* ------------------------- 定义操作数据库的泛型类 开始 ------------------------- */
(function () {
    // 定义操作数据库的泛型类
    var MysqlDb = /** @class */ (function () {
        function MysqlDb() {
        }
        MysqlDb.prototype.add = function (info) {
            console.log('\r\n');
            console.group('MysqlDb 类 add 方法 输出：');
            console.log('info =>', info);
            console.groupEnd();
            return true;
        };
        MysqlDb.prototype.updated = function (info, id) {
            console.log('\r\n');
            console.group('MysqlDb 类 updated 方法 输出：');
            console.log('info =>', info);
            console.log('id =>', id);
            console.groupEnd();
            return true;
        };
        return MysqlDb;
    }());
    // 想给User表增加数据
    // 1、定义一个User类 和数据库进行映射
    var User = /** @class */ (function () {
        function User() {
        }
        return User;
    }());
    var u = new User();
    u.username = '张三';
    u.pasword = '123456';
    var Db = new MysqlDb();
    Db.add(u);
    // 2、相关ArticleCate增加数据  定义一个ArticleCate类 和数据库进行映射
    var ArticleCate = /** @class */ (function () {
        function ArticleCate(params) {
            this.title = params.title;
            this.desc = params.desc;
            this.status = params.status;
        }
        return ArticleCate;
    }());
    // 增加操作
    var a2 = new ArticleCate({
        title: '分类',
        desc: '1111',
        status: 1
    });
    console.log('\r\n');
    console.group('外部输出a, a 是 ArticleCate 的实例 ：');
    console.log(a2);
    console.groupEnd();
    // 类当做参数的泛型类
    var Db2 = new MysqlDb();
    Db2.add(a2);
    // 修改数据
    var a3 = new ArticleCate({
        title: '分类3333',
        desc: '33333'
    });
    a3.status = 0;
    var Db3 = new MysqlDb();
    Db3.updated(a3, 12);
});
/* ------------------------- 定义操作数据库的泛型类 结束 ------------------------- */ 
