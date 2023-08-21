/* ------------------------- 代码冗余 开始 ------------------------- */
(function () {
    // 同时返回 string类型 和number类型  （代码冗余）
    function getData1(value) {
        return value;
    }
    function getData2(value) {
        return value;
    }
});
/* ------------------------- 代码冗余 结束 ------------------------- */
/* ------------------------- any可以解决这个问题 结束 ------------------------- */
(function () {
    // 定义函数实现
    function getData(value) {
        return '哈哈哈';
    }
    getData(123);
    getData('str');
    // any放弃了类型检查, 传入什么 返回什么。
    //    比如: 传入number 类型必须返回number类型  传入 string类型必须返回string类型
    //    但是：any传入的参数类型和返回的参数类型可以不一致
});
/* ------------------------- any可以解决这个问题 结束 ------------------------- */
/* ------------------------- 泛型函数：可以支持不特定的数据类型，传入的参数和返回的参数一致 开始 ------------------------- */
(function () {
    // T表示泛型，具体什么类型是调用这个方法的时候决定的
    function getData3(value) {
        return value;
    }
    getData3(123);
    getData3('1214231');
    // getData3<number>('2112');       // 错误的写法
    // 例2：函数返回值 any 类型， todo 应用场景
    function getData4(value) {
        return '2145214214';
    }
    getData4(123); //参数必须是number
    getData4('这是一个泛型');
});
/* ------------------------- 泛型函数：可以支持不特定的数据类型，传入的参数和返回的参数一致 结束 ------------------------- */
/* ------------------------- 泛型类 最小堆算法 普通类实现 开始 ------------------------- */
(function () {
    // 泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串 a  -  z两种类型。  通过类的泛型来实现
    var MinClass = /** @class */ (function () {
        function MinClass() {
            this.list = [];
        }
        MinClass.prototype.add = function (num) {
            this.list.push(num);
        };
        MinClass.prototype.min = function () {
            var minNum = this.list[0];
            for (var i = 0; i < this.list.length; i++) {
                if (minNum > this.list[i]) {
                    minNum = this.list[i];
                }
            }
            return minNum;
        };
        return MinClass;
    }());
    var m = new MinClass();
    m.add(3);
    m.add(22);
    m.add(23);
    m.add(6);
    m.add(7);
    console.log(m.min());
    // var m2 = new MinClas<string>();   // 不能这样写，需要改类或者使用泛型类
    // m2.add('c');
    // m2.add('a');
    // m2.add('v');
    // console.log(m2.min())
});
/* ------------------------- 泛型类 最小堆算法 普通类实现 结束 ------------------------- */
/* ------------------------- 泛型类 最小堆算法 泛型类实现 开始 ------------------------- */
(function () {
    var MinClas = /** @class */ (function () {
        function MinClas() {
            this.list = [];
        }
        MinClas.prototype.add = function (value) {
            this.list.push(value);
        };
        MinClas.prototype.min = function () {
            var minNum = this.list[0];
            for (var i = 0; i < this.list.length; i++) {
                if (minNum > this.list[i]) {
                    minNum = this.list[i];
                }
            }
            return minNum;
        };
        return MinClas;
    }());
    var m1 = new MinClas(); // 实例化类 并且制定了类的T代表的类型是number
    m1.add(11);
    m1.add(3);
    m1.add(2);
    console.log(m1.min());
    var m2 = new MinClas(); // 实例化类 并且制定了类的T代表的类型是string
    m2.add('c');
    m2.add('a');
    m2.add('v');
    console.log(m2.min());
});
/* ------------------------- 泛型类 最小堆算法 泛型类实现 结束 ------------------------- */
//
/* ------------------------- 泛型类 最小堆算法 不推荐方式实现，直接改类 结束 ------------------------- */
(function () {
    var MinClass = /** @class */ (function () {
        function MinClass() {
            this.list = [];
        }
        MinClass.prototype.add = function (num) {
            this.list.push(num);
        };
        MinClass.prototype.min = function () {
            var minNum = this.list[0];
            for (var i = 0; i < this.list.length; i++) {
                if (minNum > this.list[i]) {
                    minNum = this.list[i];
                }
            }
            return minNum;
        };
        return MinClass;
    }());
    var m = new MinClass();
    m.add(3);
    m.add(22);
    m.add(23);
    m.add(6);
    m.add(7);
    console.log(m.min());
    var m2 = new MinClass();
    m2.add('c');
    m2.add('a');
    m2.add('v');
    console.log(m2.min());
});
/* ------------------------- 泛型类 最小堆算法 不推荐方式实现，直接改类 结束 ------------------------- */ 
