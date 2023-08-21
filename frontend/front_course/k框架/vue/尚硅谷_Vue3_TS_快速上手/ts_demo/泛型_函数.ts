// 泛型：在定义 函数、接口、类 的时候不能预先确定要使用的数据类型，而是在使用 函数、接口、类 的时候才能确定数据的类型，就会用到泛型

// 需求1：定义一个函数，传入2个参数，第1个参数是数据，第2个数据是数量，函数的作用：根据数量产生对应个数的数据，存放在一个数组中
(function () {

  function getArr(value: number, count: number): number[] {
    // 根据数据和数量产生一个数组
    const arr: number[] = []
    for (let i = 0; i < count; i++) {
      arr.push(value)
    }
    return arr
  }

  const arr1 = getArr(100.123, 3)
  console.log(arr1)


  // 需求2：定义一个函数，同需求1，只不过传入的是字符串类
  // const arr2 = getArr('abc', 3) // 报错


  function getArr2(value: string, count: number): string[] {
    // 根据数据和数量产生一个数组
    const arr: string[] = []
    for (let i = 0; i < count; i++) {
      arr.push(value)
    }
    return arr
  }

  const arr2 = getArr2('abc', 3)
  console.log(arr2)
});


(() => {
  // 需求3：同上，只不过传入的是任意类型
  function getArr3(value: any, count: number): any[] {
    const arr: any[] = []
    for (let index = 0; index < count; index++) {
      arr.push(value)
    }
    return arr
  }

  const arr1 = getArr3(11, 3)
  const arr2 = getArr3('aa', 3)

  // console.log(arr1[0].toFixed(), arr2[0].split(''))

  // 需求4：arr1存放的是数值类型的数组，arr2存放的是字符串类型的数组
  // arr1[0].toFixed(2)  没有任何只能提示信息(要么有方法提示，要么有错误提示)
  // arr2[0].split('')   没有任何只能提示信息(要么有方法提示，要么有错误提示)
});

(() => {
  // 需求3：同上，只不过传入的是任意类型
  function getArr4<T>(value: T, count: number): T[] {
    // const arr: T[] = []
    // 或者
    const arr: Array<T> = []

    for (let index = 0; index < count; index++) {
      arr.push(value)
    }
    return arr
  }

  const arr1 = getArr4<number>(11, 5)
  console.log(arr1)

  const arr2 = getArr4<string>('aa', 5)
  console.log(arr2)
});


(() => {


  function getMsg<K, V>(value1: K, value2: V): [K, V] {
    return [value1, value2]
  }
  const arr1 = getMsg<string, number>('jack', 800)
  console.log(arr1)
  console.log(arr1[0].split(''))    // 会提示了
  console.log(arr1[1].toFixed(2))   // 会提示了
})();