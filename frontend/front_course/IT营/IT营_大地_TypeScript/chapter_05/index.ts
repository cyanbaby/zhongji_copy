/* ------------------------- 类的定义 开始 ------------------------- */

(() => {
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
});

/* ------------------------- 类的定义 结束 ------------------------- */




/* ------------------------- 实现继承 开始 ------------------------- */

(() => {
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
});


/* ------------------------- 实现继承 结束 ------------------------- */




/* ------------------------- 类里面的修饰符 公有属性 开始 ------------------------- */

(() => {
  // 类里面的修饰符  typescript里面定义属性的时候给我们提供了 三种修饰符
  //     public :公有          在当前类里面、 子类  、类外面都可以访问
  //     protected：保护类型    在当前类里面、子类里面可以访问 ，在类外部没法访问
  //     private ：私有         在当前类里面可以访问，子类、类外部都没法访问
  //     属性如果不加修饰符 默认就是 公有 （public）
  //     非ts的 还有static哦！！！


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

});

/* ------------------------- 类里面的修饰符 公有属性 结束 ------------------------- */





/* ------------------------- 类里面的修饰符 保护类型属性 开始 ------------------------- */

(() => {
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

});


/* ------------------------- 类里面的修饰符 保护类型属性 结束 ------------------------- */




/* ------------------------- 类里面的修饰符 私有属性 开始 ------------------------- */

(() => {
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
});

/* ------------------------- 类里面的修饰符 私有属性 结束 ------------------------- */