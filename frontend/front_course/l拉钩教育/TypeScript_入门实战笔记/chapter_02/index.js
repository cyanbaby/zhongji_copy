// TODO 初始化的时候不会报错的，但是后续在赋值其他类型就会报错。
// 这得益于基于上下文的类型推导
{
    let num = 1;
}
// string
{
    let firstname = 'Captain'; // 字符串字面量
    let familyname = String('S'); // 显式类型转换
    let fullname = `my name is ${firstname}.${familyname}`; // 模板字符串
}
// number
{
    /** 十进制整数 */
    let integer = 6;
    /** 十进制整数 */
    let integer2 = Number(42);
    /** 十进制浮点数 */
    let decimal = 3.14;
    /** 二进制整数 */
    let binary = 0b1010;
    /** 八进制整数 */
    let octal = 0o744;
    /** 十六进制整数 */
    let hex = 0xf00d;
    // 如果使用较少的大整数，那么我们可以使用bigint类型
    let big = 100n;
    // npx tsc index.ts --target es2020 --strict --alwaysStrict false --watch
}
// boolean
{
    /** TypeScript 真香 为 真 */
    let TypeScriptIsGreat = true;
    /** TypeScript 太糟糕了 为 否 */
    let TypeScriptIsBad = false;
}
// symbol  settings.json 新增 "target": "es6" 不然会飘红
{
    let sym1 = Symbol();
    let sym2 = Symbol('42');
    // https://doc.houdunren.com/js/5%20Symbol.html#对象属性
}
// Number、String、Boolean、Symbol 等类型
{
    let sym = Symbol('a');
    let sym2 = Symbol('b');
    // sym = sym2 // 不能将类型“Symbol”分配给类型“symbol”
    sym2 = sym; // ok or fail?
    let str = new String('a');
    let str2 = 'a';
    str = str2; // ok or fail?
    // str2 = str; // 不能将类型“String”分配给类型“string”
    // 反向证明
    let sym_test = Symbol('a');
    sym = sym_test;
}
