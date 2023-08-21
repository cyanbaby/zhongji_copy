// 抽象类：包含抽象方法(抽象方法一般没有任何具体实现) 也可以包含实例方法，抽象类不能被实例化，为了让子类进行实例化及实现内部的抽象方法

/* 
抽象类
  不能创建实例对象, 只有实现类才能创建实例
  可以包含未实现的抽象方法
*/
abstract class Animal {

  // abstract name: string = '小黄1'  // 个人感觉没有意义
  abstract name: string // 抽象属性，几乎没有必要

  // abstract eat () {
  //   console.log(抽象方法不能有具体实现)
  // }

  abstract eat()

  // 实例方法
  sayHi() {
    console.log(this.name + '你好')
  }

  // constructor(name) {
  //   this.name = name
  // }
}

class Dog extends Animal {

  name: string

  constructor(name: string = '小黄2') {
    super()
    this.name = name
  }
  eat() {
    console.log('吃狗粮')
  }
}

const dog = new Dog()
dog.eat()
dog.sayHi()