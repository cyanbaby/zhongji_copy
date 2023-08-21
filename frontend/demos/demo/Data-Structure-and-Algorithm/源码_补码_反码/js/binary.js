(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toFixed(d, length, symbol) {
    if (d === void 0) { d = ''; }
    if (length === void 0) { length = 32; }
    if (symbol === void 0) { symbol = 0; }
    if (d.length < length) {
        return symbol + '0'.repeat(length - 1 - d.length) + d;
    }
    return d;
}
var Binary = (function () {
    function Binary(_a) {
        var _b = (_a === void 0 ? {} : _a).length, length = _b === void 0 ? 32 : _b;
        this.length = length;
    }
    Binary.prototype.getBinary = function (d) {
        return Math.abs(d).toString(2);
    };
    Binary.prototype.trueForm = function (d) {
        var two = this.getBinary(d);
        if (d >= 0) {
            return toFixed(two, this.length, 0);
        }
        return toFixed(two, this.length, 1);
    };
    Binary.prototype.inverse = function (d) {
        var trueForm = this.trueForm(d);
        if (d >= 0) {
            return trueForm;
        }
        var data = '';
        for (var index = 0; index < this.length; index++) {
            var item = trueForm[index];
            if (index === 0) {
                data += item;
            }
            else {
                data += Math.abs(+item - 1);
            }
        }
        return data;
    };
    Binary.prototype.complement = function (d) {
        var trueForm = this.trueForm(d);
        var inverse = this.inverse(d);
        if (d >= 0) {
            return trueForm;
        }
        var valid = inverse.slice(1);
        var validTenComplete = parseInt(valid, 2) + 1;
        var validTwoComplete = toFixed(validTenComplete.toString(2), this.length, 1);
        return validTwoComplete;
    };
    return Binary;
}());
exports.default = new Binary();

},{}]},{},[1]);
