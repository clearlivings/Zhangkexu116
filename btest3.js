"use strict";

var arr = [32, 56, 98, 68, 69, 36, 24, 3, 1];
var res = arr.filter(function (item) {
  return item % 2;
}); // 过滤掉偶数
alert(res); // 69,3,1
