/* ------------------------- 错误写法 开始 ------------------------- */

// var flag = true;

// flag = 456;

/* ------------------------- 错误写法 结束 ------------------------- */




/* ------------------------- 尔类型（boolean） 开始 ------------------------- */

// var flag: boolean = true;

// // flag = 123;   // 错误
// flag = false;    //正确

// console.log(flag);

/* ------------------------- 布尔类型（boolean） 结束 ------------------------- */




/* ------------------------- 数字类型（number）开始 ------------------------- */

// var num: number = 123;

// num = 456;

// console.log(num);  // 正确


// // num = 'str';    //错误

/* ------------------------- 数字类型（number） 结束 ------------------------- */




/* ------------------------- 字符串类型(string) 开始 ------------------------- */

// var str: string = 'this is ts';

// str = 'haha';   // 正确

// // str = true;  // 错误

/* ------------------------- 字符串类型(string) 结束 ------------------------- */




/* ------------------------- 数组类型（array） 开始 ------------------------- */

(() => {

  // 1.第一种定义数组的方式
  var arr: number[] = [11, 22, 33];
  console.log(arr);

  // 2.第二种定义数组的方式
  var arr2: Array<number> = [11, 22, 33];
  console.log(arr2)


  // 3.第三种
  var arr3: any[] = ['131214', 22, true];
  console.log(arr3);

});

/* ------------------------- 数组类型（array） 开始 ------------------------- */




/* ------------------------- 元组类型（tuple） 开始 ------------------------- */

// // 数组类型
// var arr: Array<number> = [11, 22, 33];

// console.log(arr)


// // 元祖类型 => 属于数组的一种
// let tuple: [number, string] = [123, 'this is ts'];

// console.log(tuple);

/* ------------------------- 元组类型（tuple） 结束 ------------------------- */



/* ------------------------- 枚举类型（enum） 开始 ------------------------- */

// // 随着计算机的不断普及，程序不仅只用于数值计算，还更广泛地用于处理非数值的数据。
// // 例如：性别、月份、星期几、颜色、单位名、学历、职业等，都不是数值数据。

// // 在其它程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，易读性差。
// // 如果能在程序中用自然语言中有相应含义的单词来代表某一状态，则程序就很容易阅读和理解。
// // 也就是说，事先考虑到某一变量可能取的值，尽量用自然语言中含义清楚的单词来表示它的每一个值，
// // 这种方法称为枚举方法，用这种方法定义的类型称枚举类型。

// // enum 枚举名{
// //   标识符[=整型常数],
// //   标识符[=整型常数],
// //   ...
// //   标识符[=整型常数],
// // };


// enum Flag { success = 1, error = 2 };


// let s: Flag = Flag.success;

// console.log(s);



// enum Flag2 { success = 1, error = 2 };


// let f: Flag2 = Flag2.error;

// console.log(f);


// // 其他情况1

// enum Color { blue, red, 'orange' };

// var c: Color = Color.red;

// console.log(c);   // 1 => 如果标识符没有赋值 它的值就是下标


// // 其他情况2
// enum Color2 { blue, red = 3, 'orange' };


// // var c2: Color = Color2.red;

// // console.log(c2);   // 3

// var c2: Color2 = Color2.orange;

// console.log(c2);      // 4 => 因为：red = 3,


// // 正常使用
// enum Err { 'undefined' = -1, 'null' = -2, 'success' = 200 };

// var e: Err = Err.success;

// console.log(e);  // 200

/* ------------------------- 枚举类型（enum） 结束 ------------------------- */




/* ------------------------- 任意类型（any） 开始 ------------------------- */

// var num: any = 123;

// num = 'str';

// num = true;

// console.log(num)

// // 任意类型 使用场景1
// var oBox: any = document.getElementById('box');
// oBox.style.color = 'red';

/* ------------------------- 任意类型（any） 结束 ------------------------- */




/* ------------------------- 其他类型（never） 开始 ------------------------- */

// null 和 undefined  属于其他类型（never类型）的子类型

// 情况1 => 以前出现 undefined 的情况，变量定义没有赋值，就是 undefined
// var num: number

// console.log(num)  // 输出：undefined   但是飘红报错



// // 情况2 => 本身就定义类型 undefined
// var num2: undefined

// console.log(num2)  // 输出：undefined   正确，vscode 不飘红


// // 情况3 => 定义没有赋值就是 undefined
// var num3: number | undefined

// num3 = 123

// console.log(num3)  // 输出：123   正确


// // 空类型 => null
// var num4: null;

// // num4 = 123   // vscode 飘红报错，因为ts定义了他是 null 类型，是不能赋值 number 的
// num4 = null



// // 一个元素可能是 number类型 可能是null 可能是undefined
// var num5: number | null | undefined  // 也可以 any 呀！

// num5 = 12345

// console.log(num5)



// // void类型 typescript 中的 void 表示没有任何类型，一般用于定义方法的时候方法没有返回值

// // es5的定义方法
// function run() {
//   console.log('run')
// }

// run();

// // ts 写法 => 表示方法没有返回任何类型
// function run2(): void {
//   console.log('run2')
// }

// run2();

// // 错误写法 => vscode 飘红
// function run3(): undefined {
//   console.log('run3')
//   // return undefined
// }

// run3();


// // never类型：是其他类型 （包括 null 和 undefined）的子类型，代表从不会出现的值。
// // 这意味着声明 never 的变量只能被never类型所赋值。

// var a: never;     // 一般用不着，可以用any

// // a = 123        // 错误的写法

// a = (() => {
//   throw new Error('错误');
// })()

/* ------------------------- 其他类型（never） 结束 ------------------------- */