/* @flow */

/**
 * A function for finding the sum
 * of the values within an array.
 *
 * @param {Array} arr an array of numbers.
 * @returns {Number}
 */
const addArray = (arr: Array<number>): number => arr.reduce((a, b) => a + b, 0);

export default addArray;
