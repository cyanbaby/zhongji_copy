

/* ------------------------- 属性接口 对 json 的约束 开始 ------------------------- */

// // ts中定义方法
// function printLabel(): void {  // 函数返回值接口，不写（: void）也不会报错
//   console.log('printLabel');
//   // return 1 => vscode 飘红报错
// }
// printLabel();


// // ts中定义方法传入参数
// function printLabel2(label: string): void {  // 参数接口不写（: string）不会报错，但是删除整个label后，调用初就会 飘红报错
//   console.log('printLabel2');
// }
// printLabel2('hahah');


// // 属性接口， ts中自定义方法传入参数,对json进行约束
// function printLabel3(labelInfo: { label: string }): void {
//   console.log('printLabel3');
// }

// printLabel3('hahah');           // 错误写法

// printLabel3({ name: '张三' });   // 错误的写法

// printLabel3({ label: '张三' });  // 正确的写法

/* ------------------------- 属性接口 对 json 的约束 结束 ------------------------- */





/* ------------------------- 属性接口 对 批量方法进行约束 开始 ------------------------- */


// //  接口：行为和动作的规范，对批量方法进行约束
// interface FullName {
//   firstName: string;   //注意;结束
//   secondName: string;
// }

// function printName(name: FullName) {
//   // 必须传入对象  firstName  secondName
//   console.log(name.firstName + '--' + name.secondName);
// }



// function printInfo(info: FullName) {
//   // 必须传入对象  firstName  secondName
//   console.log(info.firstName + info.secondName);
// }

// var obj = {   // 传入的参数必须包含 firstName  secondName，多一个也没报错，用变量obj装载
//   age: 20,
//   firstName: '张',
//   secondName: '三'
// };

// printName(obj);

// // 正确
// printInfo({
//   firstName: '李',
//   secondName: '四'
// })

// // 直接传递没有变量装载，比接口多一个属性，vscode 飘红报错
// printInfo({
//   age: 50,
//   firstName: '王',
//   secondName: '五'
// })


// // 接口 ：顺序可以不一致
// interface FullName_22 {
//   firstName: string;
//   secondName: string;
// }

// function getName_22(name: FullName_22) {
//   console.log(name)
// }

// getName_22({  // 参数的顺序可以不一样
//   secondName: 'secondName',
//   firstName: 'firstName'
// })

/* ------------------------- 属性接口 对 批量方法进行约束 结束 ------------------------- */