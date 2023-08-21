/* ------------------------- 函数类型接口 结束 ------------------------- */

(() => {

  interface ConfigFn {
    (value1: string, value2: string): string;
  }


  var setData: ConfigFn = function (value1: string, value2: string): string {
    return value1 + value2;
  }


  setData('name', '张三');

})();

/* ------------------------- 函数类型接口 结束 ------------------------- */





/* ------------------------- 泛型接口 1 结束 ------------------------- */

(() => {

  interface ConfigFn2 {
    <T>(value: T): T;
  }

  var getData2: ConfigFn2 = function <T>(value: T): T {
    return value;
  }

  getData2<string>('张三');
  // getData2<string>(1243);  // 错误 vscode 飘红，tsc编译报错



  // 函数另外一种规定类型的写法
  function tmpFunc_22<T>(value: T): T {
    return value;
  }

  var getData_22: ConfigFn2 =tmpFunc_22

  const res_22 = getData_22<string>('张三');
  console.log(res_22)
  // getData_22<string>(1243);  // 错误 vscode 飘红，tsc编译报错


  // 还可以继续拆
  function tmpFunc_33<T>(value: T): T {
    return value;
  }
  var getData_33: ConfigFn2
  getData_33 = tmpFunc_33

  const res_33 = getData_33<string>('张三');
  console.log(res_33)

})();

/* ------------------------- 泛型接口 1 结束 ------------------------- */




/* ------------------------- 泛型接口 2 结束 ------------------------- */

(() => {
  interface ConfigFn3<T> {
    (value: T): T;
  }


  function getData3<T>(value: T): T {
    return value;
  }


  var myGetData3: ConfigFn3<string> = getData3;


  myGetData3('20');  // 正确
  // myGetData3(20)  // 错误 vscode 飘红，tsc编译报错
})();

/* ------------------------- 泛型接口 2 结束 ------------------------- */