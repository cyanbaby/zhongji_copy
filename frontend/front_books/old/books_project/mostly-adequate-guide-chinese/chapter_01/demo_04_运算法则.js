var flock_a = 4;
var flock_b = 2;
var flock_c = 0;

var add = function(x, y) { return x + y };
var multiply = function(x, y) { return x * y };

/*

// 结合律（assosiative）
add(add(x, y), z) == add(x, add(y, z));

// 交换律（commutative）
add(x, y) == add(y, x);

// 同一律（identity）
add(x, 0) == x;

// 分配律（distributive）
multiply(x, add(y,z)) == add(multiply(x, y), multiply(x, z));

*/


// 原有代码
add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));

// 应用同一律，去掉多余的加法操作（add(flock_a, flock_c) == flock_a）
add(multiply(flock_b, flock_a), multiply(flock_a, flock_b));

// 再应用分配律
multiply(flock_b, add(flock_a, flock_a));


// 本书后面还会穿插一些范畴学（category theory）、集合论（set theory）以及 lambda 运算的知识，
// 教你写更加复杂的代码，而且一点也不输本章这个海鸥程序的简洁性和准确性。
// 你也不需要成为一个数学家，本书要教给你的编程范式实践起来就像是使用一个普通的框架或者 api 一样。