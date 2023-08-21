// 泛型：在定义 函数、接口、类 的时候不能预先确定要使用的数据类型，而是在使用 函数、接口、类 的时候才能确定数据的类型，就会用到泛型

// 泛型接口
// 在定义接口时, 为接口中的属性或方法定义泛型类型
// 在使用接口时, 再指定具体的泛型类型


// 需求1： 定义一个类，存储用户相关信息(ID,姓名，年龄)
// 通过类的实例调用add的方法可以添加多个用户信息对象，
// 调用getUserId可以根据ID获取用户信息

// 定义一个用户信息类
// class User {
//   id?: number  // id主键自增
//   name: string // 姓名
//   age: number  // 年龄
// }

// 定义一个类，可以针对用户的信息进行CRUD的操作
// class UserCRUD {
//   data: Array<User> = [] // 保存多个User用户
//   add(user:User){}  // 存储用户信息对象
//   getUserId(id:number){}  // 根据id查询指定的用户信息对象
// }
// 这样就写死了，意味着UserCRUD实例化后，调用add给data添加用户的时候只能是User类型
// 将来希望通过add方法添加一个动物类型的对象


// 定义一个泛型接口解决，IBaseCRUD
interface IBaseCRUD<T> {
  data: Array<T>
  add: (t: T) => T
  getUserId: (id: number) => T | undefined
}

class User {
  id?: number  // id主键自增
  name: string // 姓名
  age: number  // 年龄
}
class UserCRUD implements IBaseCRUD<User> {
  // 保存多个User用户
  data: Array<User> = []

  // 存储用户信息对象
  add(user: User): User {
    user.id = Date.now() + Math.random()
    this.data.push(user)
    return user
  }

  // 根据id查询指定的用户信息对象
  getUserId(id: number): User | undefined {
    return this.data.find(user => user.id === id)
  }
}

// tsc index.ts --watch --lib es2015
console.log(1111)
// tsc --help

// xxx.d.ts 声明无效
// declare var console: {
// 	log(message: any): void
// }
// https://blog.csdn.net/qq_40963664/article/details/124604167



// 10: 25
// https://www.youtube.com/watch?v=V-9ulTxXNH0&list=PLmOn9nNkQxJEfr-CKr9KoHWFoWj_7glnx&index=36