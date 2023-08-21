// 我们从一个愚蠢的例子开始。
// 下面是一个海鸥程序，鸟群合并则变成了一个更大的鸟群，繁殖则增加了鸟群的数量，增加的数量就是它们繁殖出来的海鸥的数量。
// 注意这个程序并不是面向对象的良好实践，它只是强调当前这种变量赋值方式的一些弊端。

// 群
var Flock = function (n, name) {
  // 海鸥数量
  this.seagulls = n;
  this.name = name;
};

/**
 * @param {Object} other 海鸥群
 * conjoin - 结合
 * 结群: 自己的海投数量 += 其他海鸥群的数量
 * @returns 自己的海鸥群
 */
Flock.prototype.conjoin = function (other) {
  console.log("结群", other.name);
  this.seagulls += other.seagulls;
  return this;
};

/**
 * @param {Object} other 海鸥群
 * breed - 品种
 * 繁殖: 自己的海投数量 = 自己的海投数量 * 其他海鸥群的数量
 * @returns 自己的海鸥群
 */
Flock.prototype.breed = function (other) {
  console.log("繁殖", other.name);
  this.seagulls = this.seagulls * other.seagulls;
  return this;
};

// a群
var flock_a = new Flock(4, "a群");
// b群
var flock_b = new Flock(2, "b群");
// c群
var flock_c = new Flock(0, "b群");

var result = flock_a
  .conjoin(flock_c)
  .breed(flock_b)
  .conjoin(flock_a.breed(flock_b)).seagulls;

//=> 32

/*

  通过 breed和conjoin输出可以得出:
    结群
    繁殖
    繁殖
    结群
  为什么是这个顺序？

    var result = flock_a
                    .conjoin(flock_c)                               => 1 结群
                    .breed(flock_b)                                 => 2 繁殖
                    .conjoin(flock_a.breed(flock_b)).seagulls;      => 3 繁殖   因为执行 conjoin 之前要先执行里面的 flock_a.breed(flock_b)
                                                                    => 4 结群
    1: 4 => a
    2: 8 => a
    3: 16 => a
    4: 32 => a
*/

console.log(result);

// 我相信没人会写这样糟糕透顶的程序。代码的内部可变状态非常难以追踪，而且，最终的答案还是错的！正确答案是 16，但是因为 flock_a 在运算过程中永久地改变了，所以得出了错误的结果。这是 IT 部门混乱的表现，非常粗暴的计算方式。

// 如果你看不懂这个程序，没关系，我也看不懂。重点是状态和可变值非常难以追踪，即便是在这么小的一个程序中也不例外。
