(() => {

  /* 
  接口可以描述函数类型(参数的类型与返回的类型)
  */
  interface SearchFunc {
    (source: string, subString: string): boolean
  }
  interface SearchFunc {
    (source: string, subString: string): boolean
  }

  const mySearch: SearchFunc = function (source: string, sub: string): boolean {
    return source.search(sub) > -1
  }

  console.log(mySearch('abcd', 'bc'))
})();

