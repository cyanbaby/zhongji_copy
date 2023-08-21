/* ------------------------- 函数定义 开始 ------------------------- */
function getInfo(str) {
    if (typeof str === 'string') {
        return '我叫：' + str;
    }
    else {
        return '我的年龄是' + str;
    }
}
console.log(getInfo('张三')); // 正确
console.log(getInfo(20)); // 正确
function getInfo2(name, age) {
    if (age) {
        return '我叫：' + name + '我的年龄是' + age;
    }
    else {
        return '我叫：' + name;
    }
}
alert(getInfo2('zhangsan')); // 正确
// alert(getInfo2(123));         // 错误 => 没传递 对的数量 和 对的类型 的参数
alert(getInfo2('zhangsan', 20));
/* ------------------------- 函数重载 结束 ------------------------- */ 
