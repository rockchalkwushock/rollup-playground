/* eslint-disable no-console */

const addArray = require('./package/lib').addArray;
const sum = require('./package/lib').sum;
const divide = require('./package/lib').divide;

const result1 = addArray([1, 2, 3]);
const result2 = sum(10, 33);
const result3 = divide(9, 3);

console.log(result1);
console.log(result2);
console.log(result3);
