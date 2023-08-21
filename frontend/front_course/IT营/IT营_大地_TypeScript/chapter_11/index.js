/* ------------------------- 可索引接口：数组、对象的约束  （不常用） 开始 ------------------------- */
// // ts定义数组的方式
// // var arr: number[] = [2342, 235325]
// // var arr1: Array<string> = ['111', '222']
// // 可索引接口 对数组的约束
// interface UserArr {
//   [index: number]: string
// }
// var arr: UserArr = ['aaa', 'bbb'];
// console.log(arr[0]);
// // var arr2: UserArr = [123, 'bbb'];  //  错误 vscode 飘红报错
// // console.log(arr2[0]);
// //可索引接口 对对象的约束
// interface UserObj {
//   [index: string]: string
// }
// var arr3: UserObj = { name: '张三' };
/* ------------------------- 可索引接口：数组、对象的约束  （不常用） 结束 ------------------------- */
/* ------------------------- 类类型接口:对类的约束 开始 ------------------------- */
// // 类类型接口: 对类的约束  和   抽象类抽象有点相似    
// interface Animal {
//   name: string;
//   eat(str: string): void;
// }
// class Dog implements Animal {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   eat() {
//     console.log(this.name + '吃粮食')
//   }
// }
// var d = new Dog('小黑');
// d.eat();
// class Cat implements Animal {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   eat(food: string) {
//     console.log(this.name + '吃' + food);
//   }
// }
// var c = new Cat('小花');
// c.eat('老鼠');
/* ------------------------- 类类型接口:对类的约束 结束 ------------------------- */ 
