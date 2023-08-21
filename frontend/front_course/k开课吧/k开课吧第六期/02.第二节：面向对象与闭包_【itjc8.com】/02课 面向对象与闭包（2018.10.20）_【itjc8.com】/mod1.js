let a=12;
let b=5;
let c=99;

import d from "./m";

alert(d);

export {a, b, c};

export function sum(n1, n2){
  return n1+n2;
}

export class Person{
  constructor(name){
    this.name=name;
  }

  show(){
    alert(this.name);
  }
}

export default 'aaa';
