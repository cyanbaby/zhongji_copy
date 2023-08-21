/* ------------------------- 类装饰器:普通装饰器（无法传参） 开始 ------------------------- */
// function logClass(params: any) {
//   console.log(params);  // [Function: HttpClient]
//   params.prototype.apiUrl = '动态扩展的属性'; // params 就是当前类
//   params.prototype.run = function () {
//     console.log('我是一个run方法');
//   }
// }
// @logClass
// class HttpClient {
//   constructor() { }
//   getData() { }
// }
// var http: any = new HttpClient();
// console.log(http.apiUrl);  //  态扩展的属性
// http.run();  // 我是一个run方法
/* ------------------------- 类装饰器:普通装饰器（无法传参） 结束 ------------------------- */
/* ------------------------- 类装饰器:装饰器工厂（可传参） 结束 ------------------------- */
// function logClass(params: string) {
//   return function (target: any) {
//     console.log(target);  // [Function: HttpClient]
//     console.log(params);  // http://www.itying.com/api
//     target.prototype.apiUrl = params;
//   }
// }
// @logClass('http://www.itying.com/api')
// class HttpClient {
//   constructor() { }
//   getData() { }
// }
// var http: any = new HttpClient();
// console.log(http.apiUrl);  // http://www.itying.com/api
/* ------------------------- 类装饰器:装饰器工厂（可传参） 结束 ------------------------- */
/* ------------------------- 重载构造函数示例 开始 ------------------------- */
// // 1、类装饰器
// //     下面是一个重载构造函数的例子。
// //     类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
// //     如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
// function logClass(target: any) {
//   console.log(target);  // [Function: HttpClient]
//   return class extends target {
//     apiUrl: any = '我是修改后的数据';
//     getData() {
//       this.apiUrl = this.apiUrl + '----';
//       console.log(this.apiUrl);
//     }
//   }
// }
// @logClass
// class HttpClient {
//   public apiUrl: string | undefined;
//   constructor() {
//     this.apiUrl = '我是构造函数里面的apiUrl';
//   }
//   getData() {
//     console.log(this.apiUrl);
//   }
// }
// var http = new HttpClient();
// http.getData();
/* ------------------------- 重载构造函数示例 结束 ------------------------- */
/* ------------------------- 属性装饰器 开始 ------------------------- */
// // 2. 属性装饰器
// //    属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
// //       1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// //       2、成员的名字。
// // 类装饰器
// function logClass(params: string) {
//   return function (target: any) {
//     console.group('类装饰器 logClass 返回的函数输出：')
//     console.log('target => ', target);
//     console.log('params => ', params);
//     console.groupEnd()
//     console.log('\r\n')
//   }
// }
// // 属性装饰器
// function logProperty(params: any) {
//   return function (target: any, attr: any) {
//     console.group('属性装饰器 logProperty 返回的函数输出：')
//     console.log('target => ', target);
//     console.log('attr => ',attr);
//     console.groupEnd()
//     console.log('\r\n')
//     target[attr] = params;
//   }
// }
// @logClass('xxxx')
// class HttpClient {
//   @logProperty('http://itying.com')
//   public url: any | undefined;
//   constructor() {
//   }
//   getData() {
//     console.group('类 HttpClient 中的 getData方法 输出：')
//     console.log(this.url);
//     console.groupEnd()
//     console.log('\r\n')
//   }
// }
// var http = new HttpClient();
// http.getData();
/* ------------------------- 属性装饰器 结束 ------------------------- */
/* ------------------------- 方法装饰器 1 开始 ------------------------- */
// // 3、方法装饰器
// // 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
// // 方法装饰会在运行时传入下列3个参数：
// //     1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// //     2、成员的名字。
// //     3、成员的属性描述符。
// // 方法装饰器一
// function get(params: any) {
//   return function (target: any, methodName: any, desc: any) {
//     console.group('方法装饰器一 get 返回的函数输出：')
//     console.log('params => ', params);
//     console.log('target => ', target);
//     console.log('methodName => ', methodName);
//     console.log('desc => ', desc);
//     console.groupEnd()
//     console.log('\r\n')
//     target.apiUrl = 'xxxx';
//     target.run = function () {
//       console.log('run');
//     }
//   }
// }
// class HttpClient {
//   public url: any | undefined;
//   constructor() {
//   }
//   @get('http://www.itying,com')
//   getData() {
//     console.group('类 HttpClient getData方法输出：')
//     console.log(this.url);
//     console.groupEnd()
//     console.log('\r\n')    
//   }
// }
// var http: any = new HttpClient();
// console.log(http.apiUrl);  // xxxx
// http.run();  // run
/* ------------------------- 方法装饰器 1 结束 ------------------------- */
/* ------------------------- 方法装饰器 2 开始 ------------------------- */
// // 方法装饰器二
// function get(params: any) {
//   return function (target: any, methodName: any, desc: any) {
//     console.group('方法装饰器一 get 返回的函数输出：')
//     console.log('params => ', params);
//     console.log('target => ', target);
//     console.log('methodName => ', methodName);
//     console.log('desc.value => ', desc.value);
//     console.groupEnd()
//     console.log('\r\n')
//     // 修改装饰器的方法  把装饰器方法里面传入的所有参数改为string类型
//     // 1、保存当前的方法
//     var oMethod = desc.value;
//     desc.value = function (...args: any[]) {
//       args = args.map((value) => {
//         return String(value);
//       })
//       oMethod.apply(this, args);
//     }
//   }
// }
// class HttpClient {
//   public url: any | undefined;
//   constructor() {
//   }
//   @get('http://www.itying,com')
//   getData(...args: any[]) {
//     console.group('HttpClient 类中 getData方法输出：')
//     console.log('args => ', args);
//     console.groupEnd()
//     console.log('\r\n')
//   }
// }
// var http = new HttpClient();
// http.getData(123, 'xxx');
/* ------------------------- 方法装饰器 2 结束 ------------------------- */
/* ------------------------- 方法参数装饰器 开始 ------------------------- */
// // 4、方法参数装饰器 
// // 参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据 ，传入下列3个参数：
// //     1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// //     2、方法的名字。
// //     3、参数在函数参数列表中的索引。
// function logParams(params: any) {
//   return function (target: any, methodName: any, paramsIndex: any) {
//     console.group('方法参数装饰器 logParams 返回的方法 输出：')
//     console.log('params =>', params);
//     console.log('target =>', target);
//     console.log('methodName =>', methodName);
//     console.log('paramsIndex =>', paramsIndex);
//     console.groupEnd()
//     console.log('\r\n')
//     target.apiUrl = params;
//   }
// }
// class HttpClient {
//   public url: any | undefined;
//   constructor() {}
//   getData(@logParams('xxxxx') uuid: any) {
//     console.group('HttpClient 类中 getData方法输出：')
//     console.log('uuid => ', uuid);
//     console.groupEnd()
//     console.log('\r\n')
//   }
// }
// var http: any = new HttpClient();
// http.getData(123456);
// console.log(http.apiUrl);
/* ------------------------- 方法参数装饰器 结束 ------------------------- */
/* ------------------------- 装饰器执行顺序 开始 ------------------------- */
// // 装饰器执行顺序
// // 属性》方法》方法参数》类
// // 如果有多个同样的装饰器，它会先执行后面的
// function logClass1(params: string) {
//   return function (target: any) {
//     console.log('类装饰器1')
//   }
// }
// function logClass2(params: string) {
//   return function (target: any) {
//     console.log('类装饰器2')
//   }
// }
// function logAttribute1(params?: string) {
//   return function (target: any, attrName: any) {
//     console.log('属性装饰器1')
//   }
// }
// function logAttribute2(params?: string) {
//   return function (target: any, attrName: any) {
//     console.log('属性装饰器2')
//   }
// }
// function logMethod1(params?: string) {
//   return function (target: any, attrName: any, desc: any) {
//     console.log('方法装饰器1')
//   }
// }
// function logMethod2(params?: string) {
//   return function (target: any, attrName: any, desc: any) {
//     console.log('方法装饰器2')
//   }
// }
// function logParams1(params?: string) {
//   return function (target: any, attrName: any, desc: any) {
//     console.log('方法参数装饰器1')
//   }
// }
// function logParams2(params?: string) {
//   return function (target: any, attrName: any, desc: any) {
//     console.log('方法参数装饰器2')
//   }
// }
// @logClass1('http://www.itying.com/api')
// @logClass2('xxxx')
// class HttpClient {
//   @logAttribute1()
//   @logAttribute2()
//   public apiUrl: string | undefined;
//   constructor() {}
//   @logMethod1()
//   @logMethod2()
//   getData() {
//     return true;
//   }
//   setData(@logParams1() attr1: any, @logParams2() attr2: any,) {
//   }
// }
// var http: any = new HttpClient();
/* ------------------------- 装饰器执行顺序 结束 ------------------------- */
