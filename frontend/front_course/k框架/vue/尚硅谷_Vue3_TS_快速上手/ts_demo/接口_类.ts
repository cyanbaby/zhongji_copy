/* 
类类型: 实现接口
      1. 一个类可以实现多个接口
      2. 一个接口可以继承多个接口
*/

(() => {


  // interface Alarm {
  //   alert()
  // }

  // // 类型 "Car" 中缺少属性 "alert"，但类型 "Alarm" 中需要该属性。
  // class Car implements Alarm {

  // }
  // const car = new Car()

})();


(() => {

  // interface Alarm {
  //   alert()
  // }

  // class Car implements Alarm {
  //   alert() {}
  // }

  // const car = new Car()

})();



(() => {

  // interface Alarm {
  //   alert(): any;
  // }

  // interface Light {
  //   lightOn(): void;
  //   lightOff(): void;
  // }

  // class Car implements Alarm,Light {
  //   alert() {}
  //   lightOn() {}
  //   lightOff() {}
  // }

  // const car = new Car()

})();



(() => {

  interface Alarm {
    alert(): any;
  }

  interface Light {
    lightOn(): void;
    lightOff(): void;
  }

  interface LightableAlarm extends Alarm, Light {
    haha()
  }

  class Car implements LightableAlarm {
    alert() { }
    lightOn() { }
    lightOff() { }

    haha() {}
  }

  const car = new Car()

})();