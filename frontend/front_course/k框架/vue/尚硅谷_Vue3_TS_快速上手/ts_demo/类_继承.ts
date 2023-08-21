/* 
类的继承
*/

// 父类，超类，基类
// 子类，派生类



(() => {
  class Animal {
    run(distance: number) {
      console.log(`Animal run ${distance}m`)
    }
  }

  class Dog extends Animal {
    cry() {
      console.log('wang! wang!')
    }
  }

  const dog = new Dog()
  dog.cry()
  dog.run(100) // 可以调用从父中继承得到的方法
});