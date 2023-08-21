
// Array
{
  /** 子元素是数字类型的数组 */

  let arrayOfNumber: number[] = [1, 2, 3];

  /** 子元素是字符串类型的数组 */

  let arrayOfString: string[] = ['x', 'y', 'z'];

}
// Array 泛型
{
  /** 子元素是数字类型的数组 */

  let arrayOfNumber: Array<number> = [1, 2, 3];

  /** 子元素是字符串类型的数组 */

  let arrayOfString: Array<string> = ['x', 'y', 'z'];

  // 但是我更推荐使用 [] 这种形式来定义。一方面可以避免与 JSX 的语法冲突，另一方面可以减少不少代码量。
}

// 如果我们明确指定了数组元素的类型，以下所有操作都将因为不符合类型约定而提示错误
{
  let arrayOfNumber: number[] = ['x', 'y', 'z']; // 提示 ts(2322)

  arrayOfNumber[3] = 'a'; // 提示 ts(2322)

  arrayOfNumber.push('b'); // 提示 ts(2345)

  let arrayOfString: string[] = [1, 2, 3]; // 提示 ts(2322)

  arrayOfString[3] = 1; // 提示 ts(2322)

  arrayOfString.push(2); // 提示 ts(2345)

}


// tuple
{
  // 元祖 在 JavaScript 中并没有元组的概念，作为一门动态类型语言，它的优势是天然支持多类型元素数组。
  // [state, setState]
  // [setState, state]
  // 注意：这里我们用全小写表示值，首字母大写表示（TypeScript）类型
  // 对于 JavaScript 而言，上面的数组其实长的都一样，并没有一个有效的途径可以区分彼此。
  // 不过，出于较好的扩展性、可读性和稳定性考虑，我们往往会更偏向于把不同类型的值通过键值对的形式塞到一个对象中，
  // 再返回这个对象（尽管这样会增加代码量），而不是使用没有任何限制的数组。比如我们可能会使用如下的对象结构来替换数组：
  // {
  //   state,
  //   setState
  // }
  // 而 TypeScript 的元组类型正好弥补了这个不足，使得定义包含固定个数元素、每个元素类型未必相同的数组成为可能。
  // const x: [State, SetState] = [state, setState];
  // const y: [SetState, State] = [setState, state];
  // 这里需要注意：数组类型的值只有显示添加了元组类型注解后（或者使用 as const，声明为只读元组），TypeScript 才会把它当作元组，否则推荐出来的类型就是普通的数组类型（第 4 讲会介绍类型推断）。

}

// any
{
  // Any is Hell（Any 是地狱）
  // 如果我们不想花费过高的成本为复杂的数据添加类型注解
  // 或者已经引入了缺少类型注解的第三方组件库
  let anything: any = {};

  anything.doAnything(); // 不会提示错误

  anything = 1; // 不会提示错误

  anything = 'x'; // 不会提示错误

  let num: number = anything; // 不会提示错误

  let str: string = anything; // 不会提示错误

  // any 类型会在对象的调用链中进行传导，即所有 any 类型的任意属性的类型都是 any
  {
    let anything: any = {};
    let z = anything.x.y.z; // z 类型是 any，不会提示错误
    z(); // 不会提示错误
  }
}





// unknown 以前只能用any
{
  {
    let result: unknown;

    if (x) {

      result = x();

    } else if (y) {

      result = y();

    }

  }


  // 与 any 不同的是，unknown 在类型上更安全
  {
    let result: unknown;

    let num: number = result; // 提示 ts(2322)

    let anything: any = result; // 不会提示错误

  }

  // 使用 unknown 如果不缩小类型,对 unknown 执行的任何操作都会出现如下所示错误：
  {
    let result: unknown;

    result.toFixed(); // 提示 ts(2571)

  }

  // 而所有的类型缩小手段对 unknown 都有效，如下代码所示：
  {
    let result: unknown;

    if (typeof result === 'number') {

      result.toFixed(); // 此处 hover result 提示类型是 number，不会提示错误

    }

  }
}


// void、undefined、null
{
  // 不能把 void 类型的变量值再赋值给除了 any 和 unkown 之外的任何类型变量
  {
    // undefined 的最大价值主要体现在接口类型（第 7 讲会涉及）上，它表示一个可缺省、未定义的属性。
    let undeclared: undefined = undefined; // 鸡肋
    // 而 null 的价值我认为主要体现在接口制定上，它表明对象或属性可能是空值。
    let nullable: null = null; // 鸡肋
  }

  // 我们可以把 undefined 值或类型是 undefined 的变量赋值给 void 类型变量，
  // 反过来，类型是 void 但值是 undefined 的变量不能赋值给 undefined 类型
  {
    const userInfo: {

      id?: number;

    } = {};

    let undeclared: undefined = undefined;

    let unusable: void = undefined;

    unusable = undeclared; // ok

    undeclared = unusable; // ts(2322)

  }

  // 类型守卫（Type Guard)
  {
    const userInfo: {

      id?: number;

    } = {};

    let undeclared: undefined = undefined;

    let unusable: void = undefined;

    unusable = undeclared; // ok

    undeclared = unusable; // ts(2322)

  }

  // null 的价值我认为主要体现在接口制定上
  {
    const userInfo: {

      name: null | string

    } = { name: null };

  }

  // 类型守卫（Type Guard)
  {
    const userInfo: {

      id?: number;

      name?: null | string

    } = { id: 1, name: 'Captain' };

    if (userInfo.id !== undefined) { // Type Guard

      userInfo.id.toFixed(); // id 的类型缩小成 number

    }

    // 不建议随意使用非空断言
    {
      userInfo.id!.toFixed(); // ok，但不建议
      userInfo.name!.toLowerCase() // ok，但不建议
    }

    // 我们不建议随意使用非空断言
    {
      userInfo.id?.toFixed(); // Optional Chain
      const myName = userInfo.name ?? `my name is ${info.name}`; // 空值合并
    }
  }



}








// never
{
  // never 表示永远不会发生值的类型，这里我们举一个实际的场景进行说明。
  {
    function ThrowError(msg: string): never {

      throw Error(msg);

    }

    function InfiniteLoop(): never {

      while (true) { }

    }

  }


  // never 是所有类型的子类型，它可以给所有类型赋值，如下代码所示。
  // 但是反过来，除了 never 自身以外，其他类型（包括 any 在内的类型）都不能为 never 类型赋值。
  {
    let Unreachable: never = 1; // ts(2322)

    Unreachable = 'string'; // ts(2322)

    Unreachable = true; // ts(2322)

    let num: number = Unreachable; // ok

    let str: string = Unreachable; // ok

    let bool: boolean = Unreachable; // ok

  }

  // Dead Code 检测机制
  {
    const str: string = 'string';

    if (typeof str === 'number') {

      str.toLowerCase(); // Property 'toLowerCase' does not exist on type 'never'.ts(2339)

    }

  }


  // 用来禁止写接口下特定的属性
  {
    const props: {

      id: number,

      name?: never

    } = {

      id: 1

    }

    props.name = null; // ts(2322))

    props.name = 'str'; // ts(2322)

    props.name = 1; // ts(2322)
  }

}


// object
// object 类型表示非原始类型的类型，即非 number、string、boolean、bigint、symbol、null、undefined 的类型。
// 然而，它也是个没有什么用武之地的类型，如下所示的一个应用场景是用来表示 Object.create 的类型。
declare function create(o: object | null): any;

create({}); // ok

create(() => null); // ok

create(2); // ts(2345)

create('string'); // ts(2345)



// 类型断言（Type Assertion）
{
  // TypeScript 类型检测无法做到绝对智能
  {
    const arrayNumber: number[] = [1, 2, 3, 4];

    const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)

  }

  // as 语法
  {
    const arrayNumber: number[] = [1, 2, 3, 4];

    const greaterThan2: number = arrayNumber.find(num => num > 2) as number;

  }

  // 尖括号+类型
  {
    const arrayNumber: number[] = [1, 2, 3, 4];

    const greaterThan2: number = arrayNumber.find(num => num > 2) as number;

  }

  /*
    注意：这个结论完全适用于复杂类型，但是对于 number、string、boolean 原始类型来说，不仅父子类型可以相互断言，父类型相同的类型也可以相互断言，
    比如 1 as 2、'a' as 'b'、true as false（这里的 2、'b'、false 被称之为字面量类型，在第 4 讲里会详细介绍），
    反过来 2 as 1、'b' as 'a'、false as true 也是被允许的（这里的 1、'a'、true 是字面量类型），
    尽管这样的断言没有任何意义。


    另外，any 和 unknown 这两个特殊类型属于万金油，
    因为它们既可以被断言成任何类型，反过来任何类型也都可以被断言成 any 或 unknown。
  */


  // 还可以使用“字面量值 + as const”语法结构进行常量断言
  {
    /** str 类型是 '"str"' */

    let str = 'str' as const;

    /** readOnlyArr 类型是 'readonly [0, 1]' */

    const readOnlyArr = [0, 1] as const;

  }

  // 还有一种特殊非空断言，即在值（变量、属性）的后边添加 '!' 断言操作符，
  // 它可以用来排除值为 null、undefined 的情况
  {
    let mayNullOrUndefinedOrString: null | undefined | string;

    mayNullOrUndefinedOrString!.toString(); // ok

    mayNullOrUndefinedOrString.toString(); // ts(2531)

  }

  // 建议使用类型守卫
  {
    let mayNullOrUndefinedOrString: null | undefined | string;

    if (typeof mayNullOrUndefinedOrString === 'string') {
    
      mayNullOrUndefinedOrString.toString(); // ok
    
    }
    
  }

}