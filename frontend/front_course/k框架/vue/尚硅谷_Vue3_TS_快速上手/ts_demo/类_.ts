(() => {
  /* 
  类的继承
  */
  interface Dog {
    className: string
  }

  class Animal {
    // 实例方法
    testFn1 = function () { console.log('testFn1') }
    // 原型方法
    run(distance: number) {
      console.log(`Animal run ${distance}m`)
    }
  }

  class Dog extends Animal {
    // 实例方法
    testFn2 = function () { console.log('testFn2') }
    // 原型方法
    cry() {
      console.log('wang! wang!')
    }
    // 实例属性
    testProp = 100
  }

  // 原型扩展属性数据
  Dog.prototype.className = '.btn'

  const dog = new Dog()

  dog.cry()
  dog.run(100) // 可以调用从父中继承得到的方法


  // 逆向探索，很简单！

  console.log(dog)  // Dog { testFn1: [Function (anonymous)], testFn2: [Function (anonymous)] }

  // 当前类的原型上没有 run 方法
  // console.log(dog.__proto__) // constructor & cry

  // 父类的原型方法
  // console.log(dog.__proto__.__proto__)  // { run: [Function (anonymous)] }


  // const a1 = new Animal()
  // console.log(a1)  // Animal { testFn1: [Function (anonymous)] }


  // dog.testFn1() // testFn1，输出了, 这就很奇怪了！！！ 
  // 并不奇怪通过对象冒充类似方法，把所有继承类的实例方法放到父类实例方法上了
})();

