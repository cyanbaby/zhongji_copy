 // 加密的函数类型接口
interface encrypt {
  (key: string, value: string): string;
}


var md5: encrypt = function (key: string, value: string) {
  return key + value; // 模拟操作
}

console.log(md5('name', 'zhangsan'));


var sha1: encrypt = function (key: string, value: string): string {
  return key + '----' + value; // 模拟操作
}

console.log(
  sha1('name', 'lisi')
);