var conjoin = function (flock_x, flock_y) {
  return flock_x + flock_y;
};
var breed = function (flock_x, flock_y) {
  return flock_x * flock_y;
};

var flock_a = 4;
var flock_b = 2;
var flock_c = 0;

var result = conjoin(
  breed(flock_b, conjoin(flock_a, flock_c)),
  breed(flock_a, flock_b)
);
/*

a c 结群  => Conjoin_ac

b ac 繁殖 Breed_b_ac

a b  繁殖 Breed_a_b

Breed_b_ac Breed_a_b 结群
*/
//=>16
