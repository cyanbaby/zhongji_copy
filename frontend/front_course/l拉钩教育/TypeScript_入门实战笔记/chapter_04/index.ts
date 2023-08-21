// TypeScript 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解
{
  {
    let str: string = 'this is string';
    let num: number = 1;
    let bool: boolean = true;
  }
  {
    let str = 'this is string'; // 等价
    let num = 1; // 等价
    let bool = true; // 等价
  }
}


// 类型推断
{
  // 例 1
  {
    let x1 = 42; // 推断出 x1 的类型是 number
    let x2: number = x1; // ok
  }

  // 例 2
  {

    /** 根据参数的类型，推断出返回值的类型也是 number */
    function add1(a: number, b: number) {
      return a + b;
    }
    const x1 = add1(1, 1); // 推断出 x1 的类型也是 number



    /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
    function add2(a: number, b = 1) {
      return a + b;
    }

    const x2 = add2(1);
    // const x3 = add2(1, '1'); // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number | undefined

  }
}


// 上下文推断
{
  // TODO 定义的 Adder 类型使用了 type 类型别名
  type Adder = (a: number, b: number) => number;

  const add: Adder = (a, b) => {
    return a + b;
  }

  const x1 = add(1, 1); // 推断出 x1 类型是 number

  // const x2 = add(1, '1');  // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number

}

// 通过 let 和 const 定义的赋予了相同值的变量，其推断出来的类型不一样
{
  {

    let str = 'this is string'; // str: string

    let num = 1; // num: number

    let bool = true; // bool: boolean

  }

  {

    const str = 'this is string'; // str: 'this is string'

    const num = 1; // num: 1

    const bool = true; // bool: true

  }

}


// 字面量类型
{
  // TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，对应的三个字面量：字符串字面量、数字字面量、布尔字面量
  {

    let specifiedStr: 'this is string' = 'this is string';

    let specifiedNum: 1 = 1;

    let specifiedBoolean: true = true;

  }


  // 字面量类型是集合类型的子类型，它是集合类型的一种更具体的表达。
  // 比如 'this is string' （这里表示一个字符串字面量类型）类型是 string 类型（确切地说是 string 类型的子类型），
  // 而 string 类型不一定是 'this is string'（这里表示一个字符串字面量类型）类型，如下具体示例：
  {

    let specifiedStr: 'this is string' = 'this is string';

    let str: string = 'any string';

    specifiedStr = str; // ts(2322) 类型 '"string"' 不能赋值给类型 'this is string'

    str = specifiedStr; // ok 

  }


  // 字符串字面量类型
  {
    // 一般来说，我们可以使用一个字符串字面量类型作为变量的类型
    {
      let hello: 'hello' = 'hello';

      hello = 'hi'; // ts(2322) Type '"hi"' is not assignable to type '"hello"'
    }

    // 它真正的应用场景是可以把多个字面量类型组合成一个联合类型（详见 08 讲），用来描述拥有明确成员的实用的集合。
    {
      type Direction = 'up' | 'down';

      function move(dir: Direction) {
        // ...
      }

      move('up'); // ok

      move('right'); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'
    }
  }

  // 数字字面量类型及布尔字面量类型
  {
    // 数字字面量类型和布尔字面量类型的使用与字符串字面量类型的使用类似，
    // 我们可以使用字面量组合的联合类型将函数的参数限定为更具体的类型，
    // 比如声明如下所示的一个类型 Config：
    {
      interface Config {

        size: 'small' | 'big';

        isEnable: true | false;

        margin: 0 | 2 | 4;

      }

    }
  }



}


// 介绍完三种字面量类型后，我们再来看看通过 let 和 const 定义的变量的值相同，而变量类型不一致的具体原因。
{

  // 不可变更的常量，在缺省类型注解的情况下，TypeScript 推断出它的类型直接由赋值字面量的类型决定，这也是一种比较合理的设计。
  {

    const str = 'this is string'; // str: 'this is string'

    const num = 1; // num: 1

    const bool = true; // bool: true

  }

  // 可变更的变量，缺省显式类型注解的可变更的变量的类型转换为了赋值字面量类型的父类型
  {

    let str = 'this is string'; // str: string

    let num = 1; // num: number

    let bool = true; // bool: boolean

  }

  // 扩展
  {

    let str = 'this is string'; // 类型是 string

    let strFun = (str = 'this is string') => str; // 类型是 (str?: string) => string;

    const specifiedStr = 'this is string'; // 类型是 'this is string'

    let str2 = specifiedStr; // 类型是 'string'

    let strFun2 = (str = specifiedStr) => str; // 类型是 (str?: string) => string;

  }

  // 扩展
  {

    const specifiedStr: 'this is string' = 'this is string'; // 类型是 '"this is string"'

    let str2 = specifiedStr;   // 即便使用 let 定义，类型是 'this is string'
    // str2 = '111'            // 不能将类型“"111"”分配给类型“"this is string"”
    // str2 = 'this is string' // ok

  }

}


// Type Widening,  比如对 null 和 undefined 的类型进行拓宽，通过 let、var 定义的变量如果满足未显式声明类型注解且被赋予了 null 或 undefined 值，则推断出这些变量的类型是 any
{

  let x = null; // 类型拓宽成 any

  let y = undefined; // 类型拓宽成 any

  /** -----分界线------- */

  const z = null; // 类型是 null

  /** -----分界线------- */

  let anyFun = (param = null) => param; // 形参类型是 null

  let z2 = z; // 类型是 null

  let x2 = x; // 类型是 null

  let y2 = y; // 类型是 undefined

}


// Type Narrowing, 我们可以通过某些操作将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合
{

  // 比如，我们可以使用类型守卫（详见 11 讲的内容）将函数参数的类型从 any 缩小到明确的类型
  {
    let func = (anything: any) => {
      if (typeof anything === 'string') {

        return anything; // 类型是 string 

      } else if (typeof anything === 'number') {

        return anything; // 类型是 number

      }

      return null;

    }

  }

  // 使用类型守卫将联合类型（详见 08 讲 内容）缩小到明确的子类型
  {

    let func = (anything: string | number) => {

      if (typeof anything === 'string') {

        return anything; // 类型是 string 

      } else {

        return anything; // 类型是 number

      }

    }

  }

  // 也可以通过字面量类型等值判断（===）或其他控制流语句（包括但不限于 if、三目运算符、switch 分支）将联合类型收敛为更具体的类型
  {

    type Goods = 'pen' | 'pencil' | 'ruler';

    const getPenCost = (item: 'pen') => 2;

    const getPencilCost = (item: 'pencil') => 4;

    const getRulerCost = (item: 'ruler') => 6;

    const getCost = (item: Goods) => {

      if (item === 'pen') {

        return getPenCost(item); // item => 'pen'

      } else if (item === 'pencil') {

        return getPencilCost(item); // item => 'pencil'

      } else {

        return getRulerCost(item); // item => 'ruler'

      }

    }

  }

  // 事实上，编译器也可以推断出瘦脸后的类型
  {
    type Goods = 'pen' | 'pencil' | 'ruler';

    const getCost = (item: Goods) => {

      if (item === 'pen') {

        item; // item => 'pen'

      } else {

        item; // => 'pencil' | 'ruler'

      }

    }
  }


}