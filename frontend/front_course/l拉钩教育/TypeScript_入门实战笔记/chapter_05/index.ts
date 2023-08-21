// TypeScript 中定义函数
{
  function add() { }

  const add = () => { }

}

// 显式指定函数参数和返回值的类型
{
  // 基本格式
  {
    const add = (a: number, b: number): number => {
      return a + b;
    }
  }

  // ts 无返回值要指定  void
  {
    function fn1(): void { }
  }
}


// 我们可以使用类似定义箭头函数的语法来表示函数类型的参数和返回值类型，此时 => 类型仅仅用来定义一个函数类型而不用实现这个函数。
{
  // 需要注意的是，这里的 => 与 ES6 中箭头函数的 => 有所不同。   ES6 中的=>是函数的实现。
  // TypeScript 函数类型中的=>用来表示函数的定义，其左侧是函数的参数类型，右侧是函数的返回值类型；
  {
    type Adder = (a: number, b: number) => number; // TypeScript 函数类型定义

    const add: Adder = (a, b) => a + b; // ES6 箭头函数
    // 这里请注意：右侧的箭头函数并没有显式声明类型注解，不过可以根据 04 讲中提到的上下文类型进行推断
  }

  // 在对象（即接口类型，详见 07 讲）中，除了使用这种声明语法，我们还可以使用类似对象属性的简写语法来声明函数类型的属性
  {
    interface Entity {
      add: (a: number, b: number) => number;
      del(a: number, b: number): number;
    }

    const entity: Entity = {
      add: (a, b) => a + b,
      del(a, b) {
        return a - b;
      },
    }
    // 在某种意义上来说，这两种形式都是等价的。但是很多时候，我们不必或者不能显式地指明返回值的类型，这就涉及可缺省和可推断的返回值类型的讲解
  }

}

// 可缺省和可推断的返回值类型
{
  // 函数返回值可缺省
  {
    function computeTypes(one: string, two: number) {

      const nums = [two];

      const strs = [one]

      return {

        nums,

        strs

      } // 返回 { nums: number[]; strs: string[] } 的类型 

    }
  }

  // 请记住：这是一个很重要也很有意思的特性，函数返回值的类型推断结合泛型（我们会在 10 讲中详细介绍）
  // 可以实现特别复杂的类型计算（本质是复杂的类型推断，这里称之为计算是为了表明其复杂性），
  // 比如 Redux Model 中 State、Reducer、Effect 类型的关联。
}


// Generator 函数的返回值 
{
  // Generator 函数返回的是一个 Iterator 迭代器对象，我们可以使用 Generator 的同名接口泛型或者 Iterator 的同名接口泛型（在 10 讲会介绍）表示返回值的类型（Generator 类型继承了 Iterator 类型）
  type AnyType = boolean;

  type AnyReturnType = string;

  type AnyNextType = number;

  function* gen(): Generator<AnyType, AnyReturnType, AnyNextType> {

    const nextValue = yield true; // nextValue 类型是 number，yield 后必须是 boolean 类型

    return `${nextValue}`; // 必须返回 string 类型

  }

  // 之前的版本不支持指定 next、return 的类型，所以在某些有点历史的代码中，我们可能会看到 Generator 和 Iterator 类型不一样的表述

}


// 参数类型
{
  // 可选参数和默认参数
  {
    // 语法   :前添加?表示 log 函数的参数 x 就是可缺省的
    function log(x?: string) {

      return x;

    }

    log(); // => undefined

    log('hello world'); // => hello world

  }

  // 那是不是意味着可缺省和类型是 undefined 等价呢？
  {
    function log0(x?: string) {

      console.log(x);

    }

    function log1(x: string | undefined) {

      console.log(x);

    }

    log0();

    log0(undefined);

    // 如果我们声明了参数类型为 xxx | undefined     就表示函数参数是不可缺省且类型必须是 xxx 或者 undfined
    // log1(); // ts(2554) Expected 1 arguments, but got 0

    log1(undefined);

  }

  // 参数默认值
  {
    function log3(x: string = 'hello') {

      console.log(x);

    }

    // 函数的默认参数类型必须是参数类型的子类型   
    // ts(2322) Type 'string' is not assignable to type 'number'
    // function log4(x: number = 'hello') {

    //   console.log(x);

    // }

    // log4();

    // log4(1);

    // log4('1'); // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number | undefined'

  }

  // 剩余参数
  {
    // ts也可以收集
    {
      function sum1(...nums: number[]) {

        return nums.reduce((a, b) => a + b, 0);

      }

      sum1(1, 2); // => 3

      sum1(1, 2, 3); // => 6

      // sum(1, '2'); // ts(2345) Argument of type 'string' is not assignable to parameter of type 'number'
    }

    // 聚合类型
    {
      function sum2(...nums: (number | string)[]): number {

        return nums.reduce<number>((a, b) => a + Number(b), 0);

      }

      sum2(1, '2', 3); // 6
    }


  }


}

// 严格模式下，必须显式指定 this 的类型
{
  // function say() {

  //   console.log(this.name); // ts(2683) 'this' implicitly has type 'any' because it does not have a type annotation

  // }

  // say();

}

// 显示指定this
{
  function say(this: Window, name: string) {

    console.log(this.name);

  }

  window.say = say;

  window.say('hi');  // ok

  const obj = {

    say

  };

  // obj.say('hi'); // ts(2684) The 'this' context of type '{ say: (this: Window, name: string) => void; }' is not assignable to method's 'this' of type 'Window'.

  // 接调用 say()，this 实际上应该指向全局变量 window，但是因为 TypeScript 无法确定 say 函数被谁调用，所以将 this 的指向默认为 void，也就提示了一个 ts(2684) 错误。
  // say('captain'); // ts(2684) The 'this' context of type 'void' is not assignable to method's 'this' of type 'Window'

}


// ts能发现this指向错误
{
  interface Person {

    name: string;
    // 注意：显式注解函数中的 this 类型，它表面上占据了第一个形参的位置，但并不意味着函数真的多了一个参数，
    // 因为 TypeScript 转译为 JavaScript 后，“伪形参” this 会被抹掉，这算是 TypeScript 为数不多的特有语法。
    say(this: Person): void;

  }

  const person: Person = {

    name: 'captain',

    say() {

      console.log(this.name);

    },

  };

  const fn = person.say;

  // fn(); // ts(2684) The 'this' context of type 'void' is not assignable to method's 'this' of type 'Person'

}

// 同样，我们也可以显式限定类（class 类的介绍详见 06 讲）函数属性中的 this 类型，TypeScript 也能检查出错误的使用方式，如下代码所示：
{
  class Component {

    onClick(this: Component) { }

  }

  const component = new Component();

  interface UI {

    addClickListener(onClick: (this: void) => void): void;

  }

  const ui: UI = {

    addClickListener() { }

  };

  // ui.addClickListener(new Component().onClick); // ts(2345)
  // 面示例中，我们定义的 Component 类的 onClick 函数属性（方法）显式指定了 this 类型是 Component，在第 14 行作为入参传递给 ui 的 addClickListener 方法中，它指定的 this 类型是 void，两个 this 类型不匹配，所以抛出了一个 ts(2345) 错误。

}



// 在链式调用风格的库中，使用 this 也可以很方便地表达出其类型
{
  class Container {

    private val: number;

    constructor(val: number) {

      this.val = val;

    }

    map(cb: (x: number) => number): this {

      this.val = cb(this.val);

      return this;

    }

    log(): this {

      console.log(this.val);

      return this;

    }

  }

  const instance = new Container(1)

    .map((x) => x + 1)

    .log() // => 2

    .map((x) => x * 3)

    .log(); // => 6  

}



// 函数重载
{
  // JavaScript 是一门动态语言，针对同一个函数，它可以有多种不同类型的参数与返回值，这就是函数的多态。
  // 而在 TypeScript 中，也可以相应地表达不同类型的参数和返回值的函数，如下代码所示：
  {
    function convert0(x: string | number | null): string | number | -1 {

      if (typeof x === 'string') {

        return Number(x);

      }

      if (typeof x === 'number') {

        return String(x);

      }

      return -1;

    }

    const x1 = convert0('1'); // => string | number

    const x2 = convert0(1); // => string | number

    const x3 = convert0(null); // => string | number

  }

  // 函数重载
  {
    // 注意：函数重载列表的各个成员（即示例中的 1 ~ 3 行）必须是函数实现（即示例中的第 4 行）的子集，
    // 例如 “function convert(x: string): number”是“function convert(x: string | number | null): any”的子集。
    function convert(x: string): number;

    function convert(x: number): string;

    function convert(x: null): -1;

    function convert(x: string | number | null): any {

      if (typeof x === 'string') {

        return Number(x);

      }

      if (typeof x === 'number') {

        return String(x);

      }

      return -1;

    }

    // 在 convert 函数被调用时，TypeScript 会从上到下查找函数重载列表中与入参类型匹配的类型，并优先使用第一个匹配的重载定义。因此，我们需要把最精确的函数重载放到前面。
    const x1 = convert('1'); // => number

    const x2 = convert(1); // => string

    const x3 = convert(null); // -1

  }

  // 重载示例
  {
    interface P1 {
      name: string;
    }

    interface P2 extends P1 {
      age: number;
    }

    function convert3(x: P1): number;

    function convert3(x: P2): string;

    function convert3(x: P1 | P2): any { }

    const x1 = convert3({ name: "" } as P1);          // => number

    const x2 = convert3({ name: "", age: 18 } as P2); // => number

  }

  // 对比优先匹配
  {
    interface P1 {
      name: string;
    }

    interface P2 extends P1 {
      age: number;
    }
    function convert4(x: P2): string;

    function convert4(x: P1): number;

    function convert4(x: P1 | P2): any { }

    const x1 = convert4({ name: '' } as P1); // => number

    const x2 = convert4({ name: '', age: 18 } as P2); // => string

  }
}


// 类型谓词（is）
// https://www.jianshu.com/p/57df3cb66d3d
// https://juejin.cn/post/6867441512049803278#heading-3
// https://juejin.cn/post/7061556434692997156
{
  // 在 TypeScript 中，函数还支持另外一种特殊的类型描述，如下示例 ：
  {
    // prop is type
    function isString(s: unknown): s is string { // 类型谓词
      return typeof s === 'string';
    }

    function isNumber(n: number) {
      return typeof n === 'number';
    }

    function operator(x: unknown) {

      if (isString(x)) { // ok x 类型缩小为 string
      }

      if (isNumber(x)) { // ts(2345) unknown 不能赋值给 number
      }

    }


  }
}




