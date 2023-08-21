/* ------------------------- 函数定义 开始 ------------------------- */

// // es5定义函数的方法

// // 函数声明法
// function run() {
//   return 'run';
// }
// // 匿名函数
// var run2 = function () {
//   return 'run2';
// }

// // TypeScript定义函数的方法

// // 正确写法
// function run3(): string {
//   return 'run3';
// }

// // 错误写法
// function run4(): string {
//   return 123;  // 错误 vscode 飘红
// }

// // 匿名函数 => 正确写法
// var fun5 = function (): number {
//   return 123;
// }
// console.log(fun5()); // 调用方法

/* ------------------------- 函数定义 结束 ------------------------- */




/* ------------------------- 函数传参 开始 ------------------------- */


// function getInfo(name: string, age: number): string {
//   return `${name} --- ${age}`;
// }
// console.log(getInfo('zhangsan', 20));


// var getInfo2 = function (name: string, age: number): string {
//   return `${name} --- ${age}`;
// }
// console.log(getInfo2('zhangsan', 40));


// // 没有返回值的方法
// function run6(): void {
//   console.log('run6')
// }
// run6();

/* ------------------------- 函数传参 结束 ------------------------- */




/* ------------------------- 可选参数 开始 ------------------------- */

// // es5里面方法的实参和行参可以不一样，但是ts中必须一样，如果不一样就需要配置可选参数

// function getInfo(name: string, age?: number): string {
//   if (age) {
//     return `${name} --- ${age}`;
//   } else {
//     return `${name} ---年龄保密`;
//   }
// }

// console.log(getInfo('zhangsan'))
// console.log(getInfo('zhangsan', 123))


// // 注意:可选参数必须配置到参数的最后面
// function getInfo2(name?: string, age: number): string {
//   if (age) {
//     return `${name} --- ${age}`;
//   } else {
//     return `${name} ---年龄保密`;
//   }
// }

// console.log(getInfo2('zhangsan'))  // vscode 飘红报错

/* ------------------------- 可选参数 结束 ------------------------- */




/* ------------------------- 默认参数 开始 ------------------------- */

// // es5里面没法设置默认参数，es6和ts中都可以设置默认参数

// function getInfo(name: string, age: number = 20): string {
//   if (age) {
//     return `${name} --- ${age}`;
//   } else {
//     return `${name} ---年龄保密`;
//   }
// }

// console.log(getInfo('张三'));
// console.log(getInfo('张三', 30));

// // todo 默认参数 也可以叫可选参数?

/* ------------------------- 默认参数 结束 ------------------------- */





/* ------------------------- 剩余参数 开始 ------------------------- */

// // 普通写法
// function sum(a: number, b: number, c: number, d: number): number {
//   return a + b + c + d;
// }
// console.log(sum(1, 2, 3, 4));  // 10


// // 剩余参数: 三点运算符 接受新参传过来的值
// function sum2(...result: number[]): number {
//   var sum = 0;
//   for (var i = 0; i < result.length; i++) {
//     sum += result[i];
//   }
//   return sum;
// }

// console.log(sum2(1, 2, 3, 4, 5, 6));  // 21


// // 剩余参数: 另外一种写法
// function sum3(a: number, b: number, ...result: number[]): number {
//   var sum = a + b;
//   for (var i = 0; i < result.length; i++) {
//     sum += result[i];
//   }
//   return sum;
// }

// console.log(sum3(1, 2, 3, 4, 5, 6));  // 21

/* ------------------------- 剩余参数 结束 ------------------------- */




/* ------------------------- 函数重载 开始 ------------------------- */

// java中方法的重载：
//    重载指的是两个或者两个以上同名函数，但它们的参数不一样，这时会出现函数重载的情况

// typescript中的重载：
//    通过为同一个函数提供多个函数类型定义来试下多种功能的目的

// ts为了兼容es5 以及 es6 重载的写法和java中有区别


// es5中出现同名方法，下面的会替换上面的方法
// function css(config) {
// }
// function css(config, value) {
// }


// ts中的重载1

function getInfo(name: string): string;
function getInfo(age: number): string;

function getInfo(str: any): any {
  if (typeof str === 'string') {
    return '我叫：' + str;
  } else {
    return '我的年龄是' + str;
  }
}

console.log(getInfo('张三'));   // 正确

console.log(getInfo(20));      // 正确

// console.log(getInfo(true));    // 错误写法 => 没传递 对的数量 和 对的类型 的参数



// ts中的重载2
function getInfo2(name: string): string;
function getInfo2(name: string, age: number): string;

function getInfo2(name: any, age?: any): any {
  if (age) {
    return '我叫：' + name + '我的年龄是' + age;
  } else {
    return '我叫：' + name;
  }
}

alert(getInfo2('zhangsan'));  // 正确

// alert(getInfo2(123));         // 错误 => 没传递 对的数量 和 对的类型 的参数

alert(getInfo2('zhangsan', 20));

/* ------------------------- 函数重载 结束 ------------------------- */