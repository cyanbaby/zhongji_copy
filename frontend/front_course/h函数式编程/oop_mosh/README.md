
# [[JavaScript系列][主课中文完结] JavaScript OOP 面向对象编程 - Mosh](https://www.bilibili.com/video/BV1gb411w7eW?p=2)
[其他up主](https://www.bilibili.com/video/BV1gb411w7eW?p=48)

## TODO
* todo 面向切面编程 小野老师
* todo 元编程 书籍和文献
* todo 面试imooc相关，讲的input.value property和属性 特性？
## 中文 CH1 - Getting Start - 1- What is OOP（什么是面向编程编程）
OOP是一种编程范式(编程范例) 或者一种 编程风格(编码风格)  
围绕对象而不是函数  70年代就不是什么新鲜事了  
JS还是多范式的编程语言  

## 中文 CH1 - Getting Start - 2- Four Pillars of OOP（面向对象编程的四大支柱）
> p02

面向对象编程中的四个核心概念
1. 封装 Encapsulation
2. 抽象 Abstraction
3. 继承 Inheritance
4. 多态 Polymorphism

学生编程
意大利面条代码   
函数之间深层次的关联，变成了各种问题的根源
* 改变一个函数，其他的函数就崩溃了

OOP应运而生
OOP将一组相关的变量和函数组合成一个单元，称为对象，变量叫属性，函数叫方法


## 中文 CH1 - Getting Start - 3- Setting Up the Development Environment（建立开发环境）
插件 live-server

## 中文 CH1 - Getting Start - 4- Course Structure（课程结构）
Objects  OOP
Prototypes 原型
Protypical Inheritance 原型继承
ES6 Classes
Modules 模块化

## 中文 CH2 - Objects - 1- Introduction（介绍）
Creating Objects 创建对象
Factories and Constructors  工厂构造函数  
Primitives and Reference Types 值类型和引用类型
Working with Properties 增减属性，枚举属性 
Private Properties 私有属性
Getters/Setters  读取器（get方法）和设置其（set方法）

## 中文 CH2 - Objects - 2- Object Literals（对象字面量）
```js
const circle = {
  redius: 1,
  location: {
    x:1,
    y:1
  },
  draw: function() {
    console.log('draw')
  }
};

circle.drwa();
```

## 中文 CH2 - Objects - 3- Factories（工厂函数）
```js
// 难道手动复制一个circle吗？
// 解决：工厂函数 或者 构造函数

// Factory Function
function createCircle(redius) {
  return {
    redius,
    draw: function() {
      console.log('draw')
    }
  };
}

const circle = createCircle(1);
circle.draw();

```
## 中文 CH2 - Objects - 4- Constructors（构造函数）
```js
// 难道手动复制一个circle吗？
// 解决：工厂函数 或者 构造函数

// Constructors
function Circle(redius) {
  // console.log('this', this)  // => 删除new 就会指向window
  this.redius = redius;
  this.draw =  function() {
    console.log('draw')
  }
}
const another = new Circle(1); // new关键字会创建一个空对象{}，然后设置this执向这个对象
another.draw()

// todo 无new化创建对象 急速飙车函数式编程
// 别纠结于关于工厂函数和构造函数的派系争论
// 都学了！

```

## 中文 CH2 - Objects - 5- Constructor Property（构造函数属性）
> p9
todo 每个JavaScript中的对象都有一个叫构造函数的属性， 这句话迁移到imooc面试技巧的规则里去
```js
another.constructor
```
## 中文 CH2 - Objects - 7- Value vs Reference Types（值与引用类型）
```js
let obj = {value: 10 }
function increase(o) {
  o.value++
}
increase(obj)
console.log(obj)  // {value: 11}
```

## 中文 CH2 - Objects - 8- Adding or Removing Properties（添加或删除属性）
> p11

## 中文 CH2 - Objects - 9- Enumerating Properties（枚举属性）
> p12
## 中文 CH2 - Objects - 10- Abstraction（抽象）
> p13

## 中文 CH2 - Objects - 11- Private Properties and Methods（私有属性和方法）
> p14
## 中文 CH2 - Objects - 12- Getters and Setters（getter和setter）

CH2 - Objects - 14- Exercise- Stopwatch
CH2 - Objects - 15- Solution- Stopwatch
## 中文 CH4 - Prototypes - 1- Inheritance
## 中文 CH4 - Prototypes - 2- Prototypes and Prototypical Inheritance_bilibili
## 中文 CH4 - Prototypes - 3- Multilevel Inheritance_bilibili
## 中文 CH4 - Prototypes - 4- Property Descriptors_bilibili
## 中文 CH4 - Prototypes - 5- Constructor Prototypes_bilibili
## 中文 CH4 - Prototypes - 6- Prototype vs Instance Members_bilibili
## 中文 CH4 - Prototypes - 7- Iterating Instance and Prototype Members_bilibili
## 中文 CH4 - Prototypes - 8- Avoid Extending the Built-in Objects_bilibili
CH4 - Prototypes - 10- Exercise
CH4 - Prototypes - 11- Solution
## 中文 CH5 - Prototypes Inheritance - 1- Creating Your Own Prototypical Inheritance
## 中文 CH5 - Prototypes Inheritance - 2- Resetting the Constructor_bilibili
## 中文 CH5 - Prototypes Inheritance - 3- Calling the Super Constructor_bilibili
## 中文 CH5 - Prototypes Inheritance - 4- Intermediate Function Inheritance_bilibili
## 中文 CH5 - Prototypes Inheritance - 5- Method Overriding_bilibili
## 中文 CH5 - Prototypes Inheritance - 6- Polymorphism_bilibili
## 中文 CH5 - Prototypes Inheritance - 7- When to Use Inheritance_bilibili
## 中文 CH5 - Prototypes Inheritance - 8- Mixins_bilibili
CH5 - Prototypes Inheritance - 9- Exercise- Prototypical Inheritance
CH5 - Prototypes Inheritance - 10- Solution- Prototypical Inheritance
CH5 - Prototypes Inheritance - 11- Exercise- Polymorphism
CH5 - Prototypes Inheritance - 12- Solution- Polymorphism
## 中文 CH6 - ES6 Classes - 1- ES6 Classes_bilibili
## 中文 CH6 - ES6 Classes - 2- Hoisting_bilibili
## 中文 CH6 - ES6 Classes - 3- Static Methods_bilibili
## 中文 CH6 - ES6 Classes - 4- The This Keyword_bilibili
## 中文 CH6 - ES6 Classes - 5- Private Members Using Symbols_bilibili
## 中文 CH6 - ES6 Classes - 6- Private Members Using WeakMaps_bilibili
## 中文 CH6 - ES6 Classes - 7- Getters and Setters_bilibili
## 中文 CH6 - ES6 Classes - 8- Inheritance_bilibili
## 中文 CH6 - ES6 Classes - 9- Method Overriding_bilibili
CH6 - ES6 Classes - 11- Exercise
CH6 - ES6 Classes - 12- Solution
## 中文 CH7 - ES6 Tooling - 1- Modules_bilibili
## 中文 CH7 - ES6 Tooling - 2- CommonJS Modules_bilibili
## 中文 CH7 - ES6 Tooling - 3- ES6 Modules_bilibili
## 中文 CH7 - ES6 Tooling - 4- ES6 Tooling_bilibili
## 中文 CH7 - ES6 Tooling - 5- Babel_bilibili
## 中文 CH7 - ES6 Tooling - 6- Webpack_bilibili