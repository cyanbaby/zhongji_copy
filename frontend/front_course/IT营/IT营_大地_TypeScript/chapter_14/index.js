/* ------------------------- 函数类型接口 结束 ------------------------- */
(function () {
    var setData = function (value1, value2) {
        return value1 + value2;
    };
    setData('name', '张三');
})();
/* ------------------------- 函数类型接口 结束 ------------------------- */
/* ------------------------- 泛型接口 1 结束 ------------------------- */
(function () {
    var getData2 = function (value) {
        return value;
    };
    getData2('张三');
    // getData2<string>(1243);  // 错误 vscode 飘红，tsc编译报错
    // 函数另外一种规定类型的写法
    function tmpFunc_22(value) {
        return value;
    }
    var getData_22 = tmpFunc_22;
    var res_22 = getData_22('张三');
    console.log(res_22);
    // getData_22<string>(1243);  // 错误 vscode 飘红，tsc编译报错
    // 还可以继续拆
    function tmpFunc_33(value) {
        return value;
    }
    var getData_33;
    getData_33 = tmpFunc_33;
    var res_33 = getData_33('张三');
    console.log(res_33);
})();
/* ------------------------- 泛型接口 1 结束 ------------------------- */
/* ------------------------- 泛型接口 2 结束 ------------------------- */
(function () {
    function getData3(value) {
        return value;
    }
    var myGetData3 = getData3;
    myGetData3('20'); // 正确
    // myGetData3(20)  // 错误 vscode 飘红，tsc编译报错
})();
/* ------------------------- 泛型接口 2 结束 ------------------------- */ 
