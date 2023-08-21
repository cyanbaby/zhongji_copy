// 泛型：在定义 函数、接口、类 的时候不能预先确定要使用的数据类型，而是在使用 函数、接口、类 的时候才能确定数据的类型，就会用到泛型
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var UserCRUD = /** @class */ (function () {
    function UserCRUD() {
        // 保存多个User用户
        this.data = [];
    }
    // 存储用户信息对象
    UserCRUD.prototype.add = function (user) {
        user.id = Date.now() + Math.random();
        this.data.push(user);
        return user;
    };
    // 根据id查询指定的用户信息对象
    UserCRUD.prototype.getUserId = function (id) {
        return this.data.find(function (user) { return user.id === id; });
    };
    return UserCRUD;
}());
// tsc index.ts --watch --lib es2015
console.log(1111);
// tsc --help
// xxx.d.ts 声明无效
// declare var console: {
// 	log(message: any): void
// }
// https://blog.csdn.net/qq_40963664/article/details/124604167
// 10: 25
// https://www.youtube.com/watch?v=V-9ulTxXNH0&list=PLmOn9nNkQxJEfr-CKr9KoHWFoWj_7glnx&index=36
