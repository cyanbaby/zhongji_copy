/* ------------------------- 静态属性 静态方法 ES5 开始 ------------------------- */

(() => {
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
  Person.run2();                     // 静态方法的调用 => 静态方法输出
});

/* ------------------------- 静态属性 静态方法 ES5 结束 ------------------------- */



/* ------------------------- 静态属性 静态方法 jQuery 演示 开始 ------------------------- */

// // todo 回看视频
// function $(element) {
//   return new Base(element)
// }

// $.get = function () { }

// function Base(element) {

//   this.element = '获取dom节点';

//   this.css = function (arr, value) {
//     this.element.style.arr = value;
//   }
// }


// $('#box').css('color', 'red')

// $.get('url', function () { })


/* ------------------------- 静态属性 静态方法 jQuery 演示 结束 ------------------------- */




/* ------------------------- 静态属性 静态方法 TS 开始 ------------------------- */

(() => {
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

  // var p=new Per('张三');

  // p.run();

  Per.print();

  console.log('直接输出静态属性 性别：' + Per.sex);
});

/* ------------------------- 静态属性 静态方法 TS 结束 ------------------------- */





/* ------------------------- 多态 初识 开始 ------------------------- */

(() => {
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
});

/* ------------------------- 多态 初识 结束 ------------------------- */




/* ------------------------- 抽象类 开始 ------------------------- */

(() => {
  // typescript中的抽象类：它是提供其他类继承的基类，不能直接被实例化。


  // 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。


  // abstract抽象方法只能放在抽象类里面


  // 抽象类和抽象方法用来定义标准 。   标准：Animal 这个类要求它的子类必须包含eat方法


  // 抽象类，用来定义标准:
  abstract class Animal {

    public name: string;

    constructor(name: string) {
      console.log('name', name)
      this.name = name;
    }

    abstract eat(): any;  // 抽象方法不包含具体实现并且必须在派生类中实现。

    run() {
      console.log('其他方法可以不实现')
    }
  }

  // var a = new Animal()  // 错误的写法  vscode => 飘红报错


  class Dog extends Animal {

    // 子类不写 constructor 默认会执行父类的 constructor
    constructor(name: any) { // 抽象类的子类必须实现抽象类里面的抽象方法
      super(name)
    }

    eat() {  // 这里不写的话，类 Dog 这里 vscode 会飘红报错
      console.log(this.name + '吃粮食')
    }
  }

  var d = new Dog('小花花');
  d.eat();




  // class Cat extends Animal {

  //   constructor(name: any) { // 抽象类的子类必须实现抽象类里面的抽象方法
  //     super(name)
  //   }

  //   run() {
  //   }

  //   eat() {
  //     console.log(this.name + '吃老鼠')
  //   }

  // }

  // var c = new Cat('小花猫');
  // c.eat();
});

/* ------------------------- 抽象类 结束 ------------------------- */
