# [最新6小时TypeScript精讲视频教程-IT营（大地老师）](https://www.bilibili.com/video/BV1W54y1p7t9?spm_id_from=333.337.search-card.all.click)

[TypeScript 中文文档](https://www.tslang.cn/docs/handbook/basic-types.html)


## 安装

```shell
# 使用 npm 全局安装
npm install -g typescript

# 查看typescript版本
tsc --version  

# 或 tsc -v
```

## chapter_01 初见

### 尝试使用

```shell
tsc chapter_01/index.ts

# 或 

# cd chapter_01
# tsc index.ts
```

### 自动编译
```shell
cd chapter_01

tsc --init

# tsconfig.json
# 更改输出目录 => "outDir": "./"

# vscode
# tsc: 监视 - tsconfig.json
# 有可能 git bash 不支持，vscode配置..cmd.exe

# 或
tsc chapter_01/index.ts
# 连 tsc --init 都不需要，或许 tsc 默认配置就是生成 tsconfig.json 里的配置
```

## chapter_02 类型
> 合并了视频 第二节和第三节

### typeScript中的数据类型

typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，  
在typescript中主要给我们提供了以下数据类型   

* 布尔类型（boolean）
* 数字类型（number）
* 字符串类型(string)
* 数组类型（array）
* 元组类型（tuple）
* 枚举类型（enum）
* 任意类型（any）
* null 和 undefined
* void类型
* never类型

### 没有类型声明，错误写法：
```ts
var flag = true;

flag = 456;  // flag 会飘红
```

### 具有类型声明，正确写法：

#### 布尔类型（boolean）
```ts
var flag: boolean = true;

// flag = 123;   // 错误
flag = false;    //正确

console.log(flag);
```

#### 数字类型（number）
```ts
var num: number = 123;

num = 456;

console.log(num);  // 正确


// num = 'str';    //错误
```

#### 字符串类型(string)
```ts
var str: string = 'this is ts';

str = 'haha';   // 正确

// str = true;  // 错误
```

#### 数组类型（array）
```ts
// 1.第一种定义数组的方式
var arr: number[] = [11, 22, 33];
console.log(arr);

// 2.第二种定义数组的方式
var arr2: Array<number> = [11, 22, 33];
console.log(arr2)

// 3.第三种
var arr3: any[] = ['131214', 22, true];
console.log(arr3);
```

#### 元组类型（tuple）
```ts
// 数组类型
var arr: Array<number> = [11, 22, 33];

console.log(arr)


// 元祖类型 => 属于数组的一种
let tuple: [number, string] = [123, 'this is ts'];

console.log(tuple);
```


#### 枚举类型（enum）
```ts
// 随着计算机的不断普及，程序不仅只用于数值计算，还更广泛地用于处理非数值的数据。
// 例如：性别、月份、星期几、颜色、单位名、学历、职业等，都不是数值数据。  

// 在其它程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，易读性差。
// 如果能在程序中用自然语言中有相应含义的单词来代表某一状态，则程序就很容易阅读和理解。
// 也就是说，事先考虑到某一变量可能取的值，尽量用自然语言中含义清楚的单词来表示它的每一个值，
// 这种方法称为枚举方法，用这种方法定义的类型称枚举类型。

// enum 枚举名{ 
//   标识符[=整型常数], 
//   标识符[=整型常数], 
//   ... 
//   标识符[=整型常数], 
// };


enum Flag { success = 1, error = 2 };


let s: Flag = Flag.success;

console.log(s);



enum Flag2 { success = 1, error = 2 };


let f: Flag2 = Flag2.error;

console.log(f);


// 其他情况1

enum Color { blue, red, 'orange' };

var c: Color = Color.red;

console.log(c);   // 1 => 如果标识符没有赋值 它的值就是下标


// 其他情况2
enum Color2 { blue, red = 3, 'orange' };


// var c2: Color = Color2.red;

// console.log(c2);   // 3

var c2: Color2 = Color2.orange;

console.log(c2);      // 4 => 因为：red = 3,


// 正常使用
enum Err { 'undefined' = -1, 'null' = -2, 'success' = 200 };

var e: Err = Err.success;

console.log(e);  // 200
```

#### 任意类型（any）
```ts
var num: any = 123;

num = 'str';

num = true;

console.log(num)

// 任意类型 使用场景1
var oBox: any = document.getElementById('box');
oBox.style.color = 'red';
```

#### todo [never 是任何类型的子类型，也就是说 never 可以赋值给任何类型](https://www.cnblogs.com/zhangguicheng/p/15733416.html)

#### 其他类型（never）
```ts
// null 和 undefined  属于其他类型（never类型）的子类型

// 情况1 => 以前出现 undefined 的情况，变量定义没有赋值，就是 undefined
var num: number

console.log(num)  // 输出：undefined   但是飘红报错



// 情况2 => 本身就定义类型 undefined
var num2: undefined

console.log(num2)  // 输出：undefined   正确，vscode 不飘红


// 情况3 => 定义没有赋值就是 undefined
var num3: number | undefined

num3 = 123

console.log(num3)  // 输出：123   正确


// 空类型 => null
var num4: null;

// num4 = 123   // vscode 飘红报错，因为ts定义了他是 null 类型，是不能赋值 number 的
num4 = null



// 一个元素可能是 number类型 可能是null 可能是undefined
var num5: number | null | undefined  // 也可以 any 呀！

num5 = 12345

console.log(num5)



// void类型 typescript 中的 void 表示没有任何类型，一般用于定义方法的时候方法没有返回值

// es5的定义方法
function run() {
  console.log('run')
}

run();

// ts 写法 => 表示方法没有返回任何类型
function run2(): void {
  console.log('run2')
}

run2();

// 错误写法 => vscode 飘红
function run3(): undefined {
  console.log('run3')
  // return undefined
}

run3();


// never类型：是其他类型 （包括 null 和 undefined）的子类型，代表从不会出现的值。
// 这意味着声明 never 的变量只能被never类型所赋值。

var a: never;     // 一般用不着，可以用any

// a = 123        // 错误的写法

a = (() => {
  throw new Error('错误');
})()
```


## chapter_04 函数
> 函数和方法是一样的，知识叫法不一样而已，把函数添加到对象属性上，它就叫做方法。 

TypeScript中的函数
  3.1、函数定义
      函数传参
  3.2、可选参数
  3.3、默认参数
  3.4、剩余参数
  3.5、函数重载
  3.6、箭头函数  es6

### 函数定义
```ts
// es5定义函数的方法

// 函数声明法
function run() {
  return 'run';
}
// 匿名函数
var run2 = function () {
  return 'run2';
}

// TypeScript定义函数的方法

// 正确写法
function run3(): string {
  return 'run3';
}

// 错误写法
function run4(): string {
  return 123;  // 错误 vscode 飘红
}

// 匿名函数 => 正确写法
var fun5 = function (): number {
  return 123;
}
console.log(fun5()); // 调用方法
```


### 函数传参
```ts
function getInfo(name: string, age: number): string {
  return `${name} --- ${age}`;
}
console.log(getInfo('zhangsan', 20));


var getInfo2 = function (name: string, age: number): string {
  return `${name} --- ${age}`;
}
console.log(getInfo2('zhangsan', 40));


// 没有返回值的方法
function run6(): void {
  console.log('run6')
}
run6();
```


### 可选参数
```ts
// es5里面方法的实参和行参可以不一样，但是ts中必须一样，如果不一样就需要配置可选参数

function getInfo(name: string, age?: number): string {
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} ---年龄保密`;
  }
}

console.log(getInfo('zhangsan'))
console.log(getInfo('zhangsan', 123))


// 注意:可选参数必须配置到参数的最后面
function getInfo2(name?: string, age: number): string {
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} ---年龄保密`;
  }
}

console.log(getInfo2('zhangsan'))  // vscode 飘红报错
```




### 默认参数
```ts
// es5里面没法设置默认参数，es6和ts中都可以设置默认参数

function getInfo(name: string, age: number = 20): string {
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} ---年龄保密`;
  }
}

console.log(getInfo('张三'));
console.log(getInfo('张三', 30));

// todo 默认参数 也可以叫可选参数?
```



### 剩余参数
```ts
// 普通写法
function sum(a: number, b: number, c: number, d: number): number {
  return a + b + c + d;
}
console.log(sum(1, 2, 3, 4));  // 10


// 剩余参数: 三点运算符 接受新参传过来的值
function sum2(...result: number[]): number {
  var sum = 0;
  for (var i = 0; i < result.length; i++) {
    sum += result[i];
  }
  return sum;
}

console.log(sum2(1, 2, 3, 4, 5, 6));  // 21


// 剩余参数: 另外一种写法
function sum3(a: number, b: number, ...result: number[]): number {
  var sum = a + b;
  for (var i = 0; i < result.length; i++) {
    sum += result[i];
  }
  return sum;
}

console.log(sum3(1, 2, 3, 4, 5, 6));  // 21
```


### 函数重载
```ts
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
```


### 箭头函数
[ES6箭头函数及面试题](https://blog.csdn.net/m0_55990909/article/details/124752014)

## chapter_05 类
> 合并了视频 第五节和第六节

4.1 类的定义
4.2 继承
4.3 类里面的修饰符
4.4 静态属性 静态方法
4.5 抽象类 继承 多态


### 类的定义
```ts
class Person {
  
  name: string;  // 定义属性，前面省略了 public 关键字

  constructor(name: string) {  // 构造函数   实例化类的时候触发的方法
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

}

var p = new Person('张三');

console.log(p.getName());


p.setName('李四');


console.log(p.getName());
```


### 继承
```ts
class Person {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  run(): string {
    return `${this.name}在运动`
  }
}
// var p=new Person('王五');
// console.log(p.run())


class Web extends Person {  // extends 和 constructor 一起出现时， super 是必备的，否则会报错
  constructor(name: string) {
    super(name);  // 初始化父类的构造函数
  }
}


var w = new Web('李四');
console.log(w.run());  //  李四在运动
```


### 类里面的修饰符

```ts
// 类里面的修饰符  typescript里面定义属性的时候给我们提供了 三种修饰符
//     public :公有          在当前类里面、 子类  、类外面都可以访问
//     protected：保护类型    在当前类里面、子类里面可以访问 ，在类外部没法访问
//     private ：私有         在当前类里面可以访问，子类、类外部都没法访问
//     属性如果不加修饰符 默认就是 公有 （public）
```

#### 公有属性
```ts
// 在类里面、 子类  、类外面都可以访问
class Person {

  public name: string;  // 公有属性

  constructor(name: string) {
    this.name = name;
  }

  run(): string {
    return `${this.name}在运动`
  }
}
// var p=new Person('王五');
// console.log(p.run())


class Web extends Person {
  constructor(name: string) {
    super(name);  // 初始化父类的构造函数
  }
  run(): string {
    return `${this.name}在运动-子类`
  }
  work() {
    console.log(`${this.name}在工作`)
  }
}

var w = new Web('李四');

w.work();



// 类外部访问公有属性
class Person2 {

  public name: string;  // 公有属性

  constructor(name: string) {
    this.name = name;
  }

  run(): string {

    return `${this.name}在运动`
  }
}

var p = new Person2('哈哈哈');

console.log(p.name);  // 哈哈哈
```

#### 保护类型属性
```ts
// protected：保护类型    在类里面、子类里面可以访问 ，在类外部没法访问
class Person {

  protected name: string;  // 公有属性

  constructor(name: string) {
    this.name = name;
  }

  run(): string {
    return `${this.name}在运动`
  }
}
var p = new Person('王五');
console.log(p.run())    // 王五在运动
// console.log(p.name)  // vscode 飘红 报错

class Web extends Person {
  constructor(name: string) {
    super(name);  // 初始化父类的构造函数
  }
  work() {
    console.log(`${this.name}在工作`)
  }
}

var w = new Web('李四11');

w.work();  // 李四11在运动

console.log(w.run());  // 李四11在运动
```

#### 私有属性
```ts
// private ：私有        在类里面可以访问，子类、类外部都没法访问
class Person {

  private name: string;  // 私有

  constructor(name: string) {
    this.name = name;
  }

  run(): string {
    return `${this.name}在运动`   // p1.run() => vscode 飘红 报错
  }
}

var p1 = new Person('嘿嘿嘿');
console.log(p1.run());

class Web extends Person {

  constructor(name: string) {
    super(name)
  }

  work() {
    console.log(`${this.name}在工作`)  // p2.run() => vscode 飘红 报错
  }
}


var p2 = new Web('哈哈哈');

console.log(p2.run());
```

## chapter_07 类
4.4 静态属性 静态方法
4.5 抽象类 多态

### 静态属性 静态方法 - ES5
```ts
// ES5 静态属性 静态方法
function Person() {
  this.run1 = function () { }
}
Person.name1 = '静态属性';

Person.run2 = function () {
  console.log('静态方法输出')
} // 静态方法

var p = new Person();

console.log('输出' + Person.name1) // 访问静态属性 => 输出静态属性
Person.run2();     
```


### 静态属性 静态方法 - jQuery 演示
```ts
// todo 回看视频
function $(element) {
  return new Base(element)
}

$.get = function () { }

function Base(element) {

  this.element = '获取dom节点';

  this.css = function (arr, value) {
    this.element.style.arr = value;
  }
}


$('#box').css('color', 'red')

$.get('url', function () { })   
```

### 静态属性 静态方法 - TS
```js
// TS
class Per {
  public name: string;
  public age: number = 20;


  static sex = "男"; // 静态属性

  constructor(name: string) {
    this.name = name;
  }

  run() {
    console.log(`${this.name}在运动`) // 实例方法
  }

  work() {
    console.log(`${this.name}在工作`)
  }

  static print() {  // 静态方法  里面没法直接调用类里面的属性
    console.log('print方法输出静态属性 性别：' + Per.sex);
  }
}

// var p = new Per('张三');
// p.run();

Per.print();

console.log('直接输出静态属性 性别：'+Per.sex);
```


### 多态
```ts
// 多态: 父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现
// 多态属于继承,（有待考证）

class Animal {

  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {   // 具体吃什么  不知道   ，  具体吃什么?继承它的子类去实现 ，每一个子类的表现不一样
    console.log('吃的方法')
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  eat() {
    console.log(this.name + '吃粮食')
  }
}


class Cat extends Animal {

  constructor(name: string) {
    super(name)
  }

  eat() {
    console.log(this.name + '吃老鼠')
  }
}

const animal = new Animal('老虎')
animal.eat()  // 吃的方法

const dog = new Dog('小狗')
dog.eat()  // 小狗吃粮食


const cat = new Cat('小猫')
cat.eat()  // 小猫吃吃老鼠
```

### 抽象类
```ts
// typescript中的抽象类：它是提供其他类继承的基类，不能直接被实例化。

// 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。

// abstract抽象方法只能放在抽象类里面

// 抽象类和抽象方法用来定义标准 。   标准：Animal 这个类要求它的子类必须包含eat方法

// 用来定义标准:

abstract class Animal {

  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract eat(): any;  // 抽象方法不包含具体实现并且必须在派生类中实现。

  run() {
    console.log('其他方法可以不实现')
  }
}

// var a = new Animal()  // 错误的写法  vscode => 飘红报错


class Dog extends Animal {

  constructor(name: any) { // 抽象类的子类必须实现抽象类里面的抽象方法
    super(name)
  }

  eat() {  // 这里不写的话，类 Dog 这里 vscode 会飘红报错
    console.log(this.name + '吃粮食')
  }
}

var d = new Dog('小花花');
d.eat();




class Cat extends Animal {

  constructor(name: any) { // 抽象类的子类必须实现抽象类里面的抽象方法
    super(name)
  }
  
  run() {
  }

  eat() {
    console.log(this.name + '吃老鼠')
  }

}

var c = new Cat('小花猫');
c.eat();
```


## chapter_08 接口
> 合并了视频 第8节和第9节($ajax 案例)

1. typeScript中的接口
5.1 属性类接口
5.2 函数类型接口
5.3 可索引接口
5.4 类类型接口
5.5 接口扩展

```js
// 接口的作用：
//    在面向对象的编程中，接口是一种规范的定义，
//    它定义了行为和动作的规范，在程序设计里面，
//    接口起到一种限制和规范的作用。
//
//    接口定义了某一批类所需要遵守的规范，
//    接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，
//    它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。
//
//    typescrip中的接口类似于java，同时还增加了更灵活的接口类型，
//    包括属性、函数、可索引和类等。
// 也是定义标准。
```

### 属性类接口

#### ts中自定义方法传入参数,对json进行约束
```ts
// ts中定义方法
function printLabel(): void {  // 函数返回值接口，不写（: void）也不会报错
  console.log('printLabel');
  // return 1 => vscode 飘红报错
}
printLabel();


// ts中定义方法传入参数
function printLabel2(label: string): void {  // 参数接口不写（: string）不会报错，但是删除整个label后，调用初就会 飘红报错
  console.log('printLabel2');
}
printLabel2('hahah');


// 属性接口， ts中自定义方法传入参数,对json进行约束
function printLabel3(labelInfo: { label: string }): void {
  console.log('printLabel3');
}

printLabel3('hahah');           // 错误写法

printLabel3({ name: '张三' });   // 错误的写法

printLabel3({ label: '张三' });  // 正确的写法
```

#### 批量方法进行约束
```ts
//  接口：行为和动作的规范，对批量方法进行约束
interface FullName {
  firstName: string;   //注意;结束
  secondName: string;
}

function printName(name: FullName) {
  // 必须传入对象  firstName  secondName
  console.log(name.firstName + '--' + name.secondName);
}



function printInfo(info: FullName) {
  // 必须传入对象  firstName  secondName
  console.log(info.firstName + info.secondName);
}

var obj = {   // 传入的参数必须包含 firstName  secondName，多一个也没报错，用变量obj装载
  age: 20,
  firstName: '张',
  secondName: '三'
};

printName(obj);

// 正确
printInfo({
  firstName: '李',
  secondName: '四'
})

// 直接传递没有变量装载，比接口多一个属性，vscode 飘红报错
printInfo({
  age: 50,
  firstName: '王',
  secondName: '五'
})


// 接口 ：顺序可以不一致
interface FullName_22 {
  firstName: string;
  secondName: string;
}

function getName_22(name: FullName_22) {
  console.log(name)
}

getName_22({  // 参数的顺序可以不一样
  secondName: 'secondName',
  firstName: 'firstName'
})
```

### $ajax 案例
```ts

//*

// 需要实现的代码示例
// $.ajax({
//   type: "GET",
//   url: "test.json",
//   data: { username: $("#username").val(), content: $("#content").val() },
//   dataType: "json"
// });

//*/

// 在浏览器跑编译好的代码

interface Config {
  type: string;
  url: string;
  data?: string;
  dataType: string;
}

function ajax(config: Config) { // 原生js封装的ajax 

  var xhr = new XMLHttpRequest();

  xhr.open(config.type, config.url, true);

  xhr.send(config.data);

  xhr.onreadystatechange = function () {

    if (xhr.readyState == 4 && xhr.status == 200) {

      console.log('成功');

      if (config.dataType == 'json') {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(xhr.responseText)
      }

    }
  }
}


ajax({
  type: 'get',
  data: 'name=zhangsan',
  url: 'http://a.itying.com/api/productlist', //api
  dataType: 'json'
})

```

## chapter_10 
5.2 函数类型接口

### 函数类型接口
> 函数类型接口: 对方法传入的参数 以及返回值进行约束 & 批量约束
[【TypeScript】04：函数类型接口](https://zhuanlan.zhihu.com/p/538918764)


```ts
 // 加密的函数类型接口
interface encrypt {
  (key: string, value: string): string;
}


var md5: encrypt = function (key: string, value: string): string {
  return key + value; // 模拟操作
}

console.log(md5('name', 'zhangsan'));


var sha1: encrypt = function (key: string, value: string): string {
  return key + '----' + value; // 模拟操作
}

console.log(
  sha1('name', 'lisi')
);
```

## chapter_11
5.3 可索引接口
5.4 类类型接口

### 可索引接口
> 数组、对象的约束  （不常用）
>
```ts
// ts定义数组的方式
// var arr: number[] = [2342, 235325]
// var arr1: Array<string> = ['111', '222']



// 可索引接口 对数组的约束
interface UserArr {
  [index: number]: string
}


var arr: UserArr = ['aaa', 'bbb'];
console.log(arr[0]);



// var arr2: UserArr = [123, 'bbb'];  //  错误 vscode 飘红报错
// console.log(arr2[0]);


//可索引接口 对对象的约束
interface UserObj {
  [index: string]: string
}


var arr3: UserObj = { name: '张三' };
```

### 类类型接口
> 类类型接口:对类的约束 和 抽象类抽象有点相似

```ts
// 类类型接口: 对类的约束  和   抽象类抽象有点相似    
interface Animal {
  name: string;
  eat(str: string): void;
}

class Dog implements Animal {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat() {
    console.log(this.name + '吃粮食')
  }
}


var d = new Dog('小黑');
d.eat();


class Cat implements Animal {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat(food: string) {
    console.log(this.name + '吃' + food);
  }
}

var c = new Cat('小花');
c.eat('老鼠');
```

## chapter_12
5.5 接口扩展
    接口继承
[typescript接口的扩展](https://www.jianshu.com/p/0c54fb71f479)

#### 接口继承
```ts
interface Animal {
  eat(): void;
}

interface Person extends Animal {
  work(): void;
}

class Web implements Person {

  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat() {
    console.log(this.name + '喜欢吃馒头')
  }

  work() {
    console.log(this.name + '写代码');
  }

}

var w = new Web('小李');

w.eat();
```


#### 接口继承 & 类继承
```ts
interface Animal {
  eat(): void;
}

interface Person extends Animal {
  work(): void;
}


class Programmer {

  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  coding(code: string) {
    console.log(this.name + code)
  }
}


class Web extends Programmer implements Person {

  constructor(name: string) {
    super(name)
  }

  eat() {
    console.log(this.name + '喜欢吃馒头')
  }

  work() {
    console.log(this.name + '写代码');
  }

}

var w = new Web('小李');

// w.eat();

w.coding('写ts代码');
```


## chapter_13 泛型
6. typeScript中的泛型
6.1 泛型的定义
6.2 泛型函数
6.3 泛型类
6.4 泛型接口

6.1 泛型的定义
```js
/*
泛型：
  软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 
  组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 
这样用户就可以以自己的数据类型来使用组件。


通俗理解：泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持(类型校验)
*/
```

### 泛型函数

#### 代码冗余
```ts
// 同时返回 string类型 和number类型  （代码冗余）
function getData1(value: string): string {
  return value;
}

function getData2(value: number): number {
  return value;
}
```

#### any 解决
```ts
function getData(value: string): string;
function getData(value: number): number;

function getData(value: any): any {
  return '哈哈哈';
}

getData(123);

getData('str');

// any放弃了类型检查, 传入什么 返回什么。
//    比如: 传入number 类型必须返回number类型  传入 string类型必须返回string类型
//    但是：any传入的参数类型和返回的参数类型可以不一致
```

#### 泛型 解决
> 泛型：可以支持不特定的数据类型，传入的参数和返回的参数一致

```ts
// T表示泛型，具体什么类型是调用这个方法的时候决定的
function getData3<T>(value: T): T {
  return value;
}

getData3<number>(123);

getData3<string>('1214231');

// getData3<number>('2112');       // 错误的写法


// 例2：函数返回值 any 类型， todo 应用场景
function getData4<T>(value: T): any {
  return '2145214214';
}

getData4<number>(123);  //参数必须是number

getData4<string>('这是一个泛型');
```

### 泛型类

#### 最小堆算法 普通类实现
```ts
// 泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串 a  -  z两种类型。  通过类的泛型来实现
class MinClass {

  public list: number[] = [];

  add(num: number) {
    this.list.push(num)
  }

  min(): number {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }

}

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
```

#### 最小堆算法 泛型实现
```ts
class MinClas<T>{

  public list: T[] = [];

  add(value: T): void {
    this.list.push(value);
  }

  min(): T {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

var m1 = new MinClas<number>();   // 实例化类 并且制定了类的T代表的类型是number
m1.add(11);
m1.add(3);
m1.add(2);
console.log(m1.min())


var m2 = new MinClas<string>();   // 实例化类 并且制定了类的T代表的类型是string
m2.add('c');
m2.add('a');
m2.add('v');
console.log(m2.min())
```

#### 最小堆算法 直接改类(不推荐)
```ts
class MinClass {

  public list: Array<number | string> = [];

  add(num: number | string) {
    this.list.push(num)
  }

  min(): number | string {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }

}

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
console.log(m2.min())

```

## chapter_14 泛型接口
6.4 泛型接口
      函数类型接口
      泛型类接口 => 泛型类的接口

### 函数类型接口
```ts
interface ConfigFn {
  (value1: string, value2: string): string;
}


var setData: ConfigFn = function (value1: string, value2: string): string {
  return value1 + value2;
}


setData('name', '张三');
```

### 泛型接口 1
```ts
interface ConfigFn2 {
  <T>(value: T): T;
}

var getData2: ConfigFn2 = function <T>(value: T): T {
  return value;
}

getData2<string>('张三');
// getData2<string>(1243);  // 错误 vscode 飘红，tsc编译报错
```

### 泛型接口 2
```ts
interface ConfigFn3<T> {
  (value: T): T;
}


function getData3<T>(value: T): T {
  return value;
}


var myGetData3: ConfigFn3<string> = getData3;


myGetData3('20');  // 正确
// myGetData3(20)  // 错误 vscode 飘红，tsc编译报错
```


## chapter_15
> 合并了视频的16节 => 综合使用

### 把类作为参数来约束数据传入的类型
```ts
// 定义一个 User 的类这个类的作用就是映射数据库字段  
// 然后定义一个 MysqlDb 的类这个类用于操作数据库   
// 然后把 User类 作为参数 传入到 MysqlDb 中
// var user = new User({
//   username: '张三',
//   password: '123456'
// })

// var Db = new MysqlDb();
// Db.add(user);


// 把类作为参数来约束数据传入的类型 
class User {
  username: string | undefined;
  pasword: string | undefined;
}


class MysqlDb {

  add(user: User): boolean {
    console.log(user);  // User { username: '张三', pasword: '123456' }
    return true;
  }

}

var u = new User();
u.username = '张三';
u.pasword = '123456';

var Db = new MysqlDb();
Db.add(u);
```

### 问题：代码重复，给文章表添加数据
class MysqlDb {} 重复  

```ts
// 问题：代码重复  给文章表添加数据
class ArticleCate {
  title: string | undefined;
  desc: string | undefined;
  status: number | undefined
}


class MysqlDb {

  add(info: ArticleCate): boolean {
    console.log(info);
    console.log(info.title);
    return true;
  }

}

var a = new ArticleCate();
a.title = "国内";
a.desc = "国内新闻";
a.status = 1;

var Db = new MysqlDb();
Db.add(a);
```

### 定义操作数据库的泛型类
```ts
// 定义操作数据库的泛型类
class MysqlDb<T>{

  add(info: T): boolean {
    console.log('\r\n')
    console.group('MysqlDb 类 add 方法 输出：')
    console.log('info =>', info);
    console.groupEnd()
    return true;
  }

  updated(info: T, id: number): boolean {
    console.log('\r\n')
    console.group('MysqlDb 类 updated 方法 输出：')
    console.log('info =>', info);
    console.log('id =>', id);
    console.groupEnd()
    return true;
  }
}


// 想给User表增加数据

// 1、定义一个User类 和数据库进行映射
class User {
  username: string | undefined;
  pasword: string | undefined;
}

var u = new User();
u.username = '张三';
u.pasword = '123456';


var Db = new MysqlDb<User>();
Db.add(u);






// 2、相关ArticleCate增加数据  定义一个ArticleCate类 和数据库进行映射
class ArticleCate {
  title: string | undefined;
  desc: string | undefined;
  status: number | undefined;

  constructor(params: {
    title: string | undefined,
    desc: string | undefined,
    status?: number | undefined
  }) { // 实例化的时候给属性传值
    this.title = params.title;
    this.desc = params.desc;
    this.status = params.status;
  }

}


// 增加操作
var a2 = new ArticleCate({
  title: '分类',
  desc: '1111',
  status: 1
});

console.log('\r\n')
console.group('外部输出a, a 是 ArticleCate 的实例 ：')
console.log(a2);
console.groupEnd()

// 类当做参数的泛型类
var Db2 = new MysqlDb<ArticleCate>();
Db2.add(a2);





// 修改数据
var a3 = new ArticleCate({
  title: '分类3333',
  desc: '33333'
});

a3.status = 0;

var Db3 = new MysqlDb<ArticleCate>();
Db3.updated(a3, 12);
```

### 综合使用
16 TypeScript 类型、接口、类 、泛型 综合使用--TypeScript封装统一操作Mysql Mongodb Mssql的底层类库（14分31秒）

```ts
/*

功能：定义一个操作数据库的库  支持 Mysql Mssql  MongoDb

要求1：Mysql MsSql  MongoDb功能一样  都有 add  update  delete  get方法    

注意：约束统一的规范、以及代码重用

解决方案：需要约束规范所以要定义接口 ，需要代码重用所以用到泛型

    1、接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范

    2、泛型 通俗理解：泛型就是解决 类 接口 方法的复用性、


*/

interface DBI<T> {
  add(info: T): boolean;
  update(info: T, id: number): boolean;
  delete(id: number): boolean;
  get(id: number): any[];
}

// 定义一个操作mysql数据库的类       
//    注意：要实现泛型接口 这个类也应该是一个泛型类

class MysqlDb<T> implements DBI<T>{

  constructor() {
    console.log('\r\n')
    console.log('Myyy Sql 数据库建立连接');
  }

  add(info: T): boolean {
    console.log(info);
    return true;
  }

  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }

  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }

  get(id: number): any[] {
    var list = [
      {
        title: 'xxxx',
        desc: 'xxxxxxxxxx'
      },
      {
        title: 'xxxx',
        desc: 'xxxxxxxxxx'
      }
    ]

    return list;
  }

}

// 定义一个操作mssql数据库的类  

class MsSqlDb<T> implements DBI<T>{

  constructor() {
    console.log('\r\n')
    console.log('Msss Sql 数据库建立连接');
  }

  add(info: T): boolean {
    console.log(info);
    return true;
  }

  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }

  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }

  get(id: number): any[] {

    // temp
    var list4 = [
      {
        title: 'xxxx',
        desc: 'xxxxxxxxxx'
      },
      {
        title: 'xxxx',
        desc: 'xxxxxxxxxx'
      }
    ]

    return list4;
  }

}

// 例1：操作用户表   定义一个User类和数据表做映射
class User_0{
    username:string | undefined;
    password:string | undefined;
}


var u_0=new User_0();
u_0.username='张三000';
u_0.password='000000';


var oMysql=new MysqlDb<User>(); //类作为参数来约束数据传入的类型 
oMysql.add(u_0);



// 例2：操作用户表   定义一个User类和数据表做映射
class User {
  username: string | undefined;
  password: string | undefined;
}


var u = new User();
u.username = '张三2222';
u.password = '123456';

var oMssql = new MsSqlDb<User>();
oMssql.add(u);  // 类作为参数来约束数据传入的类型 


// 获取User表 ID=4的数据
var data = oMssql.get(4);
console.log(data);
```



## chapter_17 模块
17 TypeScript 模块 以及模块化封装DB库 封装类似Mongoose风格的类库（25分22秒）
[命令行 - 编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

8.1 模块的的概念
8.2 模块导出的几种方法
  8.2.1 export 导出声明  
  8.2.2 export 导出语句
  8.2.3 export default
  8.2.4 import导入模块
8.3 模块化封装上一讲的DB库

8.1 模块的的概念
```js
/*

    模块的的概念（官方）:

         关于术语的一点说明: 请务必注意一点，TypeScript 1.5里术语名已经发生了变化。 “内部模块”现在称做“命名空间”。
         “外部模块”现在则简称为“模块” 模块在其自身的作用域里执行，而不是在全局作用域里；
         这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确地使用export形式之一导出它们。 
         相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用 import形式之一。

    模块的概念（自己理解）：

        我们可以把一些公共的功能单独抽离成一个文件作为一个模块。
        模块里面的变量 函数 类等默认是私有的，如果我们要在外部访问模块里面的数据（变量、函数、类），
        我们需要通过export暴露模块里面的数据（变量、函数、类...）。
        暴露后我们通过 import 引入模块就可以使用模块里面暴露的数据（变量、函数、类...）。    
*/
```

调试方法
```shell
tsc chapter_17/demo_01/index.ts --watch  
# 因为没有 tsc --init 生成 tsconfig.json 文件，tsc编译默认 xxx.ts 同目录编译 xxx.js

# 没有用cmd.exe 下面注释的操作是不行的，用 --outDir 命令行参数吧
# cd chapter_17/demo_01
# tsc --init
# 修改 tsconfig.json 里面的配置 "outDir": "./js",   打包输出目录

tsc chapter_17/demo_01/index.ts --watch --outDir chapter_17/demo_01/js
nodemon chapter_17/demo_01/js/index.js

```

### demo_01
```shell
tsc chapter_17/demo_01/index.ts --watch --outDir chapter_17/demo_01/js

nodemon chapter_17/demo_01/js/index.js
```

### demo_02
```shell
tsc chapter_17/demo_02/index.ts --watch --outDir chapter_17/demo_02/js

nodemon chapter_17/demo_02/js/index.js
```

### demo_03
```shell
tsc chapter_17/demo_03/index.ts --watch --outDir chapter_17/demo_03/js

nodemon chapter_17/demo_03/js/index.js
```

### demo_04_db
```shell
tsc chapter_17/demo_04_db/index.ts --watch --outDir chapter_17/demo_04_db/js

nodemon chapter_17/demo_04_db/js/index.js
```

### demo_05_db
```shell
tsc chapter_17/demo_05_db/index.ts --watch --outDir chapter_17/demo_05_db/js

nodemon chapter_17/demo_05_db/js/index.js
```

## chapter_18 命名空间

## chapter_19 装饰器
> 合并了第20节
19 装饰器定义 类装饰器  属性装饰器 装饰器工厂（23分17秒）
20 装饰器 方法装饰器  方法参数装饰器 装饰器的执行顺序（28分39秒）

ES5 装饰器模式
  DecoratorMode.js
装饰器定义 
类装饰器  
属性装饰器 
装饰器工厂

### 装饰器定义
```js
/*
  装饰器:装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为。


  通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。


  常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器


  装饰器的写法：普通装饰器（无法传参） 、 装饰器工厂（可传参）


  装饰器是过去几年中js最大的成就之一，已是Es7的标准特性之一js
*/
```

### 类装饰器
[装饰器报错](https://blog.csdn.net/logic_c/article/details/104021103)
tsc 加上参数
tsc chapter_19/index.ts --watch --outDir chapter_19/js --experimentalDecorators

#### 类装饰器:普通装饰器（无法传参）
```ts
function logClass(params: any) {

  console.log(params);  // [Function: HttpClient]

  params.prototype.apiUrl = '动态扩展的属性'; // params 就是当前类

  params.prototype.run = function () {
    console.log('我是一个run方法');
  }

}

@logClass
class HttpClient {

  constructor() { }

  getData() { }

}

var http: any = new HttpClient();

console.log(http.apiUrl);  //  态扩展的属性

http.run();  // 我是一个run方法
```


#### 类装饰器:装饰器工厂（可传参）
```ts
function logClass(params: string) {

  return function (target: any) {
    console.log(target);  // [Function: HttpClient]
    console.log(params);  // http://www.itying.com/api
    target.prototype.apiUrl = params;
  }

}

@logClass('http://www.itying.com/api')
class HttpClient {

  constructor() { }

  getData() { }
}

var http: any = new HttpClient();

console.log(http.apiUrl);  // http://www.itying.com/api
```


#### 重载构造函数示例
```ts
function logClass(target: any) {

  console.log(target);  // [Function: HttpClient]

  return class extends target {

    apiUrl: any = '我是修改后的数据';

    getData() {
      this.apiUrl = this.apiUrl + '----';
      console.log(this.apiUrl);
    }

  }
}


@logClass
class HttpClient {

  public apiUrl: string | undefined;

  constructor() {
    this.apiUrl = '我是构造函数里面的apiUrl';
  }

  getData() {
    console.log(this.apiUrl);
  }

}

var http = new HttpClient();
http.getData();
```

### 属性装饰器
```ts
// 2. 属性装饰器
//    属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
//       1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
//       2、成员的名字。

// 类装饰器
function logClass(params: string) {
  return function (target: any) {
    
    console.group('类装饰器 logClass 返回的函数输出：')
    console.log('target => ', target);
    console.log('params => ', params);
    console.groupEnd()
    console.log('\r\n')

  }
}

// 属性装饰器
function logProperty(params: any) {
  return function (target: any, attr: any) {

    console.group('属性装饰器 logProperty 返回的函数输出：')
    console.log('target => ', target);
    console.log('attr => ',attr);
    console.groupEnd()
    console.log('\r\n')

    target[attr] = params;
  }
}

@logClass('xxxx')
class HttpClient {

  @logProperty('http://itying.com')
  public url: any | undefined;

  constructor() {
  }

  getData() {
    console.group('类 HttpClient 中的 getData方法 输出：')
    console.log(this.url);
    console.groupEnd()
    console.log('\r\n')
  }

}
var http = new HttpClient();
http.getData();
```


### 方法装饰器 1
[typescript编辑tsc时报错Unable to resolve signature of method decorator when called as an expression.](https://blog.csdn.net/weixin_39460408/article/details/88838080)
tsc chapter_19/index.ts --watch --outDir chapter_19/js --target ES5 --experimentalDecorators
nodemon chapter_19//js/index.js

```ts
// 3、方法装饰器
// 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。

// 方法装饰会在运行时传入下列3个参数：
//     1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
//     2、成员的名字。
//     3、成员的属性描述符。


// 方法装饰器一
function get(params: any) {

  return function (target: any, methodName: any, desc: any) {

    console.group('方法装饰器一 get 返回的函数输出：')
    console.log('params => ', params);
    console.log('target => ', target);
    console.log('methodName => ', methodName);
    console.log('desc => ', desc);
    console.groupEnd()
    console.log('\r\n')

    target.apiUrl = 'xxxx';

    target.run = function () {
      console.log('run');
    }

  }

}

class HttpClient {

  public url: any | undefined;

  constructor() {
  }

  @get('http://www.itying,com')
  getData() {
    console.group('类 HttpClient getData方法输出：')
    console.log(this.url);
    console.groupEnd()
    console.log('\r\n')    
  }

}

var http: any = new HttpClient();

console.log(http.apiUrl);  // xxxx

http.run();  // run
```

### 方法装饰器 2
```ts
// 方法装饰器二
function get(params: any) {
  return function (target: any, methodName: any, desc: any) {

    console.group('方法装饰器一 get 返回的函数输出：')
    console.log('params => ', params);
    console.log('target => ', target);
    console.log('methodName => ', methodName);
    console.log('desc.value => ', desc.value);
    console.groupEnd()
    console.log('\r\n')

    // 修改装饰器的方法  把装饰器方法里面传入的所有参数改为string类型

    // 1、保存当前的方法
    var oMethod = desc.value;

    desc.value = function (...args: any[]) {
      args = args.map((value) => {
        return String(value);
      })
      oMethod.apply(this, args);
    }

  }
}

class HttpClient {
  public url: any | undefined;
  constructor() {
  }
  @get('http://www.itying,com')
  getData(...args: any[]) {
    console.group('HttpClient 类中 getData方法输出：')
    console.log('args => ', args);
    console.groupEnd()
    console.log();
    console.log('\r\n')
  }
}

var http = new HttpClient();
http.getData(123, 'xxx');
```

### 方法参数装饰器
```ts
// 4、方法参数装饰器 

// 参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据 ，传入下列3个参数：

//     1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
//     2、方法的名字。
//     3、参数在函数参数列表中的索引。


function logParams(params: any) {

  return function (target: any, methodName: any, paramsIndex: any) {

    console.group('方法参数装饰器 logParams 返回的方法 输出：')
    console.log('params =>', params);
    console.log('target =>', target);
    console.log('methodName =>', methodName);
    console.log('paramsIndex =>', paramsIndex);
    console.groupEnd()
    console.log('\r\n')

    target.apiUrl = params;

  }

}

class HttpClient {

  public url: any | undefined;

  constructor() {}

  getData(@logParams('xxxxx') uuid: any) {
    console.group('HttpClient 类中 getData方法输出：')
    console.log('uuid => ', uuid);
    console.groupEnd()
    console.log('\r\n')
  }
}


var http: any = new HttpClient();
http.getData(123456);
console.log(http.apiUrl);
```


### 装饰器执行顺序
```ts
// 装饰器执行顺序

// 属性》方法》方法参数》类

// 如果有多个同样的装饰器，它会先执行后面的


function logClass1(params: string) {
  return function (target: any) {
    console.log('类装饰器1')
  }
}

function logClass2(params: string) {
  return function (target: any) {
    console.log('类装饰器2')
  }
}


function logAttribute1(params?: string) {
  return function (target: any, attrName: any) {
    console.log('属性装饰器1')
  }
}

function logAttribute2(params?: string) {
  return function (target: any, attrName: any) {
    console.log('属性装饰器2')
  }
}


function logMethod1(params?: string) {
  return function (target: any, attrName: any, desc: any) {
    console.log('方法装饰器1')
  }
}

function logMethod2(params?: string) {
  return function (target: any, attrName: any, desc: any) {
    console.log('方法装饰器2')
  }
}


function logParams1(params?: string) {
  return function (target: any, attrName: any, desc: any) {
    console.log('方法参数装饰器1')
  }
}

function logParams2(params?: string) {
  return function (target: any, attrName: any, desc: any) {
    console.log('方法参数装饰器2')
  }
}



@logClass1('http://www.itying.com/api')
@logClass2('xxxx')
class HttpClient {
  @logAttribute1()
  @logAttribute2()
  public apiUrl: string | undefined;
  
  constructor() {}

  @logMethod1()
  @logMethod2()
  getData() {
    return true;
  }

  setData(@logParams1() attr1: any, @logParams2() attr2: any,) {

  }
}

var http: any = new HttpClient();

```

# 其他 & 文献
* [TypeScript 之 Record](https://www.jianshu.com/p/ff5ee22b2053?u_atoken=527878a6-f346-44cf-8706-d04f3bc37289&u_asession=01Rr1BjgzCqJHXODV7u0H8Za_LCvB1gSIXZkWzLFl3U_rApoyMri0A6Qt55D09inXNX0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K8yNoL0gI6fQcQslm-ykUNPnHmbkqVcEgdObpAroqY1_GBkFo3NEHBv0PZUm6pbxQU&u_asig=05aKhHCfLIMI7ffgmH0YvZE-4ScuXT3nwEfp95WQ0FP8JpYBdpXQz46YTnOSEQV7WU6pK4RAEXoXmDJzTChgymkomCItilcw7AxOXzTOrPoHKKE8hMEHI5l1eo9gsogvHLesA5s_O_ufpejzcLFDStni0bDEC4iVaT4XEbFYvkNAj9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzR3yh8FE1OoA2FiVG076NCR02zFfJRytyX0-EuHXf56W6xbSxAaWh9ph0bRUFW-6vO3h9VXwMyh6PgyDIVSG1W9xje09eO18A4W9RvqVP9j22anoXy5jXgsUqSf53wA3-3tAo4jgsgwTwCBNM1bWVp6lWryaxSsvSOGu6b3ZpWacmWspDxyAEEo4kbsryBKb9Q&u_aref=M07M0guUj%2FIH3JnM87rPkKKkAp0%3D)
* [内置类型ReturnType](https://blog.csdn.net/m0_45406092/article/details/106903935)

* abstract 和 public 不能混用吗?
  * [无法在构造函数中访问类中的抽象属性](https://cloud.tencent.com/developer/ask/sof/344486)
  * [typescript - 为什么我不能访问基本抽象类的属性？](https://www.nuomiphp.com/eplan/408486.html)
  * [typescript抽象类 abstract](https://blog.csdn.net/glorydx/article/details/111321401)
  * [说说abstract与private能不能同时使用?](https://blog.csdn.net/qq_37325859/article/details/121075418)
  * [为何么不能用public修饰abstract ?](https://m.imooc.com/qadetail/62881)