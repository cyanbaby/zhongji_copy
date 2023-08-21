## 测试自定义全局属性

## event模块

## console.group
```js
console.log("这是最外层 Start");

  console.group();

    console.log("这是第2层 Start");

      console.group();
      
        console.log("这是内层 Start");
        console.log("这是内层 End");

      console.groupEnd();

    console.log("这是第2层 End");

  console.groupEnd();

console.log("这是最外层 End");
```

## Todo 
* 模块执行和导入顺序
  * 解析模块依赖和模块缓存机制
* 同一个模块，被多个模块引入会执行几次？
* 测试Demo要写清除 测试问题和测试问题解答


