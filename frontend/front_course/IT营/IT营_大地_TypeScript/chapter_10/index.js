var md5 = function (key, value) {
    return key + value; // 模拟操作
};
console.log(md5('name', 'zhangsan'));
var sha1 = function (key, value) {
    return key + '----' + value; // 模拟操作
};
console.log(sha1('name', 'lisi'));
