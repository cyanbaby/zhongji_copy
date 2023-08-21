(() => {

  // function getLength(x: number | string) {
  //   // return x.length // error
  //   if (x.length) { // error
  //     return x.length
  //   } else {
  //     return x.toString().length
  //   }
  // }

});

  // 类型断言(Type Assertion): 可以用来手动指定一个值的类型
  // 语法:
  //     方式一: <类型>值
  //     方式二: 值 as 类型  tsx中只能用这种方式

// 方式一: <类型>值
(() => {
  function getLength(x: number | string) {
    if ((<string>x).length) {
      return (<string>x).length
    } else {
      return x.toString().length
    }
  }

})();


// 方式二: 值 as 类型  tsx中只能用这种方式
(() => {
  function getLength(x: number | string) {
    if ((x as string).length) {
      return (x as string).length
    } else {
      return x.toString().length
    }
  }

})();


// 可以混合使用