# 02 | 简单基础类型：TypeScript 与 JavaScript 有何不同？

搜索记录
[w3cschool](https://www.w3cschool.cn/typescript/typescript-tsconfig-json.html)
[TypeScript 编译选项之tsconfig.json](https://blog.csdn.net/liuqiao0327/article/details/124457844)
[--target 命令 - 存疑](https://www.likecs.com/ask-1535498.html)


项目初始化
```shell
npm init -y

pnpm i typescript@3.9.2

# 增加 settings.json & index.ts

# 设置当前项目的 TypeScript 版本 3.9.2

# 绕过了tsconfig了 所以会确实很多是东西比如 Array.find ...
npx tsc index.ts --strict --alwaysStrict false --watch
# 或
npx tsc --strict --alwaysStrict false --watch

```

原始类型
  TypeScript 拥有了同名的 JavaScript 原始类型定义: number、string、boolean、null、undefined、symbol 等
  此处的 JavaScript 的 null 是一个伪原始类型
  本专栏我们把以上原始类型拆分为基础类型和特殊类型这两部分

字符串
```typescript
// string
{
  let firstname: string = 'Captain'; // 字符串字面量

  let familyname: string = String('S'); // 显式类型转换

  let fullname: string = `my name is ${firstname}.${familyname}`; // 模板字符串

}
```

数字
```ts
// number
{
  /** 十进制整数 */

  let integer: number = 6;

  /** 十进制整数 */

  let integer2: number = Number(42);

  /** 十进制浮点数 */

  let decimal: number = 3.14;

  /** 二进制整数 */

  let binary: number = 0b1010;

  /** 八进制整数 */

  let octal: number = 0o744;

  /** 十六进制整数 */

  let hex: number = 0xf00d;


  // 如果使用较少的大整数，那么我们可以使用bigint类型
  let big: bigint = 100n;
  // npx tsc index.ts --target es2020 --strict --alwaysStrict false --watch

}
```

布尔值
```ts
// boolean
{
  /** TypeScript 真香 为 真 */
  let TypeScriptIsGreat: boolean = true;
  /** TypeScript 太糟糕了 为 否 */
  let TypeScriptIsBad: boolean = false;
}

```


唯一字符串对象 Symbol
```ts
// symbol  settings.json 新增 "target": "es" 不然会飘红, 但是要改成es2020哦  bigint才支持
let sym1: symbol = Symbol();
let sym2: symbol = Symbol('42');
// https://doc.houdunren.com/js/5%20Symbol.html#对象属性
```


TypeScript 还包含 Number、String、Boolean、Symbol 等类型（注意区分大小写）和小写不等价
```ts
// symbol  settings.json 新增 "target": "es6" 不然会飘红
// Number、String、Boolean、Symbol 等类型
{
  let sym: symbol = Symbol('a');
  let sym2: Symbol = Symbol('b');
  // sym = sym2 // 不能将类型“Symbol”分配给类型“symbol”
  sym2 = sym // ok or fail?
  let str: String = new String('a');
  let str2: string = 'a';
  str = str2; // ok or fail?
  // str2 = str; // 不能将类型“String”分配给类型“string”
  
  // 反向证明
  let sym_test: symbol = Symbol('a');
  sym = sym_test  
}
// 我们压根使用不到 Number、String、Boolean、Symbol 类型，因为它们并没有什么特殊的用途。这就像我们不必使用 JavaScript Number、String、Boolean 等构造函数 new 一个相应的实例一样。
```

TypeScript 其实就是添加了类型注解的 JavaScript，它并没有任何颠覆性的变动。
  ts(2322)是一个静态类型检查的错误，在注解的类型和赋值的类型不同的时候就会抛出这个错误