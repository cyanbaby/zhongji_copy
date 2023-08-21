/* ------------------------- 接口扩展：接口可以继承接口 开始 ------------------------- */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function () {
    var Web = /** @class */ (function () {
        function Web(name) {
            this.name = name;
        }
        Web.prototype.eat = function () {
            console.log(this.name + '喜欢吃馒头');
        };
        Web.prototype.work = function () {
            console.log(this.name + '写代码');
        };
        return Web;
    }());
    var w = new Web('小李');
    w.eat();
});
/* ------------------------- 接口扩展：接口可以继承接口 结束 ------------------------- */
/* ------------------------- 接口扩展：接口可以继承接口 开始 ------------------------- */
(function () {
    var Programmer = /** @class */ (function () {
        function Programmer(name) {
            this.name = name;
        }
        Programmer.prototype.coding = function (code) {
            console.log(this.name + code);
        };
        return Programmer;
    }());
    var Web = /** @class */ (function (_super) {
        __extends(Web, _super);
        function Web(name) {
            return _super.call(this, name) || this;
        }
        Web.prototype.eat = function () {
            console.log(this.name + '喜欢吃馒头');
        };
        Web.prototype.work = function () {
            console.log(this.name + '写代码');
        };
        return Web;
    }(Programmer));
    var w = new Web('小李');
    // w.eat();
    w.coding('写ts代码');
});
/* ------------------------- 接口扩展：接口可以继承接口 结束 ------------------------- */ 
