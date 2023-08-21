/* ------------------------- 静态属性 静态方法 ES5 开始 ------------------------- */
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
    // ES5 静态属性 静态方法
    function Person() {
        this.run1 = function () { };
    }
    Person.name1 = '静态属性';
    Person.run2 = function () {
        console.log('静态方法输出');
    }; // 静态方法
    var p = new Person();
    console.log('输出' + Person.name1); // 访问静态属性 => 输出静态属性
    Person.run2(); // 静态方法的调用 => 静态方法输出
});
/* ------------------------- 静态属性 静态方法 ES5 结束 ------------------------- */
/* ------------------------- 静态属性 静态方法 jQuery 演示 开始 ------------------------- */
// // todo 回看视频
// function $(element) {
//   return new Base(element)
// }
// $.get = function () { }
// function Base(element) {
//   this.element = '获取dom节点';
//   this.css = function (arr, value) {
//     this.element.style.arr = value;
//   }
// }
// $('#box').css('color', 'red')
// $.get('url', function () { })
/* ------------------------- 静态属性 静态方法 jQuery 演示 结束 ------------------------- */
/* ------------------------- 静态属性 静态方法 TS 开始 ------------------------- */
(function () {
    var Per = /** @class */ (function () {
        function Per(name) {
            this.age = 20;
            this.name = name;
        }
        Per.prototype.run = function () {
            console.log("".concat(this.name, "\u5728\u8FD0\u52A8")); // 实例方法
        };
        Per.prototype.work = function () {
            console.log("".concat(this.name, "\u5728\u5DE5\u4F5C"));
        };
        Per.print = function () {
            console.log('print方法输出静态属性 性别：' + Per.sex);
        };
        Per.sex = "男"; // 静态属性
        return Per;
    }());
    // var p=new Per('张三');
    // p.run();
    Per.print();
    console.log('直接输出静态属性 性别：' + Per.sex);
});
/* ------------------------- 静态属性 静态方法 TS 结束 ------------------------- */
/* ------------------------- 多态 初识 开始 ------------------------- */
(function () {
    // 多态: 父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现
    // 多态属于继承,（有待考证）
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.eat = function () {
            console.log('吃的方法');
        };
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog(name) {
            return _super.call(this, name) || this;
        }
        Dog.prototype.eat = function () {
            console.log(this.name + '吃粮食');
        };
        return Dog;
    }(Animal));
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name) {
            return _super.call(this, name) || this;
        }
        Cat.prototype.eat = function () {
            console.log(this.name + '吃老鼠');
        };
        return Cat;
    }(Animal));
    var animal = new Animal('老虎');
    animal.eat(); // 吃的方法
    var dog = new Dog('小狗');
    dog.eat(); // 小狗吃粮食
    var cat = new Cat('小猫');
    cat.eat(); // 小猫吃吃老鼠
});
/* ------------------------- 多态 初识 结束 ------------------------- */
/* ------------------------- 抽象类 开始 ------------------------- */
(function () {
    // typescript中的抽象类：它是提供其他类继承的基类，不能直接被实例化。
    // 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
    // abstract抽象方法只能放在抽象类里面
    // 抽象类和抽象方法用来定义标准 。   标准：Animal 这个类要求它的子类必须包含eat方法
    // 抽象类，用来定义标准:
    var Animal = /** @class */ (function () {
        function Animal(name) {
            console.log('name', name);
            this.name = name;
        }
        Animal.prototype.run = function () {
            console.log('其他方法可以不实现');
        };
        return Animal;
    }());
    // var a = new Animal()  // 错误的写法  vscode => 飘红报错
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        // 子类不写 constructor 默认会执行父类的 constructor
        function Dog(name) {
            return _super.call(this, name) || this;
        }
        Dog.prototype.eat = function () {
            console.log(this.name + '吃粮食');
        };
        return Dog;
    }(Animal));
    var d = new Dog('小花花');
    d.eat();
    // class Cat extends Animal {
    //   constructor(name: any) { // 抽象类的子类必须实现抽象类里面的抽象方法
    //     super(name)
    //   }
    //   run() {
    //   }
    //   eat() {
    //     console.log(this.name + '吃老鼠')
    //   }
    // }
    // var c = new Cat('小花猫');
    // c.eat();
});
/* ------------------------- 抽象类 结束 ------------------------- */
