var add = function(x, y) { return x + y };
var multiply = function(x, y) { return x * y };

var flock_a = 4;
var flock_b = 2;
var flock_c = 0;

var result = add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));

//=>16


/*
var result = add(
  multiply(flock_b, add(flock_a, flock_c)),
  multiply(flock_a, flock_b)
);
*/