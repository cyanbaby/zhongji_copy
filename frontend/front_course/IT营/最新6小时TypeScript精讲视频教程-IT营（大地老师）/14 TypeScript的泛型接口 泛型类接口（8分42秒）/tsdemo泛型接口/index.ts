/*
1、vscode配置自动编译

    1.第一步   tsc --inti 生成tsconfig.json   改 "outDir": "./js",  


    2、第二步 任务 - 运行任务  监视tsconfig.json


2、typeScript中的数据类型

    typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型


        布尔类型（boolean）
        数字类型（number）
        字符串类型(string)
        数组类型（array）
        元组类型（tuple）
        枚举类型（enum）
        
        任意类型（any）
        null 和 undefined
        void类型
        never类型

3、typeScript中的函数

    3.1、函数的定义
    3.2、可选参数
    3.3、默认参数
    3.4、剩余参数
    3.5、函数重载
    3.6、箭头函数  es6
4、typeScript中的类

    4.1 类的定义
    4.2 继承
    4.3 类里面的修饰符
    4.4 静态属性 静态方法
    4.5 抽象类 多态
5、typeScript中的接口

    5.1 属性类接口
    5.2 函数类型接口
    5.3 可索引接口
    5.4 类类型接口
    5.5 接口扩展

6、typeScript中的泛型

    6.1 泛型的定义
    6.2 泛型函数
    6.3 泛型类
    6.4 泛型接口
   
*/


//函数类型接口
/*
interface ConfigFn {
  (value1: string, value2: string): string;
}


var setData: ConfigFn = function (value1: string, value2: string): string {
  return value1 + value2;
}


setData('name', '张三');
//*/




// 1、泛型接口
/*
interface ConfigFn{
  <T>(value:T):T;
}

var getData:ConfigFn=function<T>(value:T):T{
    return value;
}

getData<string>('张三');
getData<string>(1243);  // 错误
//*/



// 2、泛型接口
//*
interface ConfigFn<T> {
  (value: T): T;
}


function getData<T>(value: T): T {
  return value;
}


var myGetData: ConfigFn<string> = getData;


myGetData('20');  // 正确
// myGetData(20)  // 错误

//*/


