var curry = require("lodash").curry;

var match = curry(function (what, str) {
  return str.match(what);
});

var replace = curry(function (what, replacement, str) {
  return str.replace(what, replacement);
});

var filter = curry(function (f, ary) {
  return ary.filter(f);
});

var map = curry(function (f, ary) {
  return ary.map(f);
});

/**
 *  https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/js/14%20%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html#match
 */


/**
 * 传2个参数
 */
console.log(match(/\s+/g, "hello world"))
// [ ' ' ]

/**
 * 连续传递参数
 */
console.log(match(/\s+/g)("hello world"))
// [ ' ' ]

/**
 * 传递一个参数，获取一个函数
 */
var hasSpaces = match(/\s+/g)
// function(x) { return x.match(/\s+/g) }

/**
 * 根据获取的函数，传递一个参数
 */
console.log(hasSpaces("hello world"))
// [ ' ' ]

/**
 * 根据获取的函数，传递一个参数
 */
console.log(hasSpaces("spaceless"))
// null

/**
 * 传2个参数
 */
console.log(filter(hasSpaces, ["tori_spelling", "tori amos"]))
// ["tori amos"]


/**
 * 传递一个参数，获取一个函数
 */
var findSpaces = filter(hasSpaces);
// function(xs) { return xs.filter(function(x) { return x.match(/\s+/g) }) }

/**
 * 根据获取的函数，传递一个参数
 */
console.log(findSpaces(["tori_spelling", "tori amos"]))
// ["tori amos"]


/**
 * 传递一个参数，获取一个函数
 */
var noVowels = replace(/[aeiou]/ig);
// function(replacement, x) { return x.replace(/[aeiou]/ig, replacement) }

/**
 * 传递一个参数，获取一个函数
 */
var censored = noVowels("*");
// function(x) { return x.replace(/[aeiou]/ig, "*") }

/**
 * 根据获取的函数，传递一个参数
 */
console.log(censored("Chocolate Rain"))
// 'Ch*c*l*t* R**n'